import { waitUntil } from "@vercel/functions";

import {
  AgentClient,
  DeliverableType,
  EventType,
} from "@croo-network/sdk";

import {
  runShipSparkAnalysis,
} from "@/croo/analyze";

import {
  parseRequirements,
} from "@/croo/parse-requirements";

import type {
  ShipSparkCrooResult,
} from "@/croo/types";

export const runtime = "nodejs";
export const maxDuration = 300;

const KEEPALIVE_MS = 285_000;

declare global {
  var crooProviderPromise:
    | Promise<void>
    | undefined;
}

function temporaryIssueResult(
  error: unknown,
): ShipSparkCrooResult {
  return {
    ok: false,
    status: "temporary_issue",
    code: "PROVIDER_TEMPORARY_ISSUE",
    message:
      "ShipSpark could not complete this request right now. Please try again shortly.",
    retryable: true,
    details:
      error instanceof Error
        ? error.message
        : String(error),
  };
}

function needsInputResult(
  error: unknown,
): ShipSparkCrooResult {
  return {
    ok: false,
    status: "needs_input",
    code: "INVALID_REQUIREMENTS",
    message:
      error instanceof Error
        ? error.message
        : "The CROO order does not contain valid ShipSpark input.",
    retryable: false,
  };
}

async function runProviderWindow() {
  const sdkKey =
    process.env.CROO_SDK_KEY;

  if (!sdkKey) {
    throw new Error(
      "Missing CROO_SDK_KEY.",
    );
  }

  const client =
    new AgentClient(
      {
        baseURL:
          process.env.CROO_API_URL ||
          "https://api.croo.network",
        wsURL:
          process.env.CROO_WS_URL ||
          "wss://api.croo.network/ws",
        ...(process.env.CROO_RPC_URL
          ? {
              rpcURL:
                process.env.CROO_RPC_URL,
            }
          : {}),
      },
      sdkKey,
    );

  const stream =
    await client.connectWebSocket();

  stream.on(
    EventType.NegotiationCreated,
    async (
      event: unknown,
    ) => {
      try {
        const payload =
          event as {
            negotiationId?: string;
            id?: string;
            data?: {
              negotiationId?: string;
              id?: string;
            };
          };

        const negotiationId =
          payload.negotiationId ||
          payload.id ||
          payload.data?.negotiationId ||
          payload.data?.id;

        if (!negotiationId) {
          return;
        }

        await client.acceptNegotiation(
          negotiationId,
        );
      } catch (error) {
        console.error(
          "CROO negotiation error:",
          error,
        );
      }
    },
  );

  stream.on(
    EventType.OrderPaid,
    async (
      event: unknown,
    ) => {
      const payload =
        event as {
          orderId?: string;
          id?: string;
          data?: {
            orderId?: string;
            id?: string;
          };
        };

      const orderId =
        payload.orderId ||
        payload.id ||
        payload.data?.orderId ||
        payload.data?.id;

      if (!orderId) {
        return;
      }

      let result:
        ShipSparkCrooResult;

      try {
        const order =
          await client.getOrder(
            orderId,
          );

        const requirements =
          (
            order as {
              requirements?: unknown;
            }
          ).requirements;

        try {
          const input =
            parseRequirements(
              requirements,
            );

          result =
            await runShipSparkAnalysis(
              input,
            );
        } catch (error) {
          result =
            needsInputResult(
              error,
            );
        }
      } catch (error) {
        result =
          temporaryIssueResult(
            error,
          );
      }

      try {
        await client.deliverOrder(
          orderId,
          {
            deliverableType:
              DeliverableType.Schema,
            deliverableSchema:
              JSON.stringify(
                result,
              ),
          },
        );

        console.log(
          `[CROO] Delivered ${orderId}: ${result.status}`,
        );
      } catch (error) {
        console.error(
          `[CROO] Delivery failed for ${orderId}:`,
          error,
        );
      }
    },
  );

  await new Promise<void>(
    (resolve) => {
      setTimeout(
        resolve,
        KEEPALIVE_MS,
      );
    },
  );

  stream.close();
}

export async function GET(
  request: Request,
) {
  const secret =
    process.env.CROO_KEEPALIVE_SECRET;

  if (secret) {
    const auth =
      request.headers.get(
        "authorization",
      );

    if (
      auth !==
      `Bearer ${secret}`
    ) {
      return Response.json(
        {
          ok: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }
  }

  if (!globalThis.crooProviderPromise) {
    globalThis.crooProviderPromise =
      runProviderWindow()
        .catch(
          (error) => {
            console.error(
              "CROO keepalive provider failed:",
              error,
            );
          },
        )
        .finally(
          () => {
            globalThis.crooProviderPromise =
              undefined;

            console.log(
              "[CROO] Provider window ended and is ready to restart.",
            );
          },
        );

    waitUntil(
      globalThis.crooProviderPromise,
    );

    return Response.json({
      ok: true,
      status: "started",
      windowSeconds: KEEPALIVE_MS / 1000,
    });
  }

  return Response.json({
    ok: true,
    status: "already_running",
    windowSeconds: KEEPALIVE_MS / 1000,
  });
}
