import "dotenv/config";

import {
  AgentClient,
  DeliverableType,
  EventType,
} from "@croo-network/sdk";

import { runShipSparkAnalysis } from "../src/croo/analyze";
import { parseRequirements } from "../src/croo/parse-requirements";

const baseURL =
  process.env.CROO_API_URL || "https://api.croo.network";

const wsURL =
  process.env.CROO_WS_URL || "wss://api.croo.network/ws";

const rpcURL = process.env.CROO_RPC_URL;
const sdkKey = process.env.CROO_SDK_KEY;

if (!sdkKey) {
  throw new Error("Missing CROO_SDK_KEY.");
}

const client = new AgentClient(
  {
    baseURL,
    wsURL,
    ...(rpcURL ? { rpcURL } : {}),
  },
  sdkKey,
);

async function main() {
  console.log("Starting ShipSpark CROO provider...");
  console.log(`API: ${baseURL}`);
  console.log(`WS: ${wsURL}`);

  const stream = await client.connectWebSocket();

  stream.on(EventType.NegotiationCreated, async (event: unknown) => {
    try {
      const payload = event as {
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
        console.warn(
          "NegotiationCreated without negotiation id:",
          event,
        );
        return;
      }

      console.log(`Accepting negotiation ${negotiationId}`);

      await client.acceptNegotiation(negotiationId);
    } catch (error) {
      console.error("Failed to accept negotiation:", error);
    }
  });

  stream.on(EventType.OrderPaid, async (event: unknown) => {
    const payload = event as {
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
      console.warn("OrderPaid without order id:", event);
      return;
    }

    console.log(`Paid CROO order received: ${orderId}`);

    try {
      const order = await client.getOrder(orderId);

      const requirements = (
        order as {
          requirements?: unknown;
        }
      ).requirements;

      const input = parseRequirements(requirements);

      console.log("Running ShipSpark analysis...", input);

      const result = await runShipSparkAnalysis(input);

      await client.deliverOrder(orderId, {
        deliverableType: DeliverableType.Schema,
        deliverableSchema: JSON.stringify(result),
      });

      console.log(
        `Delivered ${orderId}: ${result.decision} ${result.opportunityScore ?? ""}`,
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : String(error);

      console.error(`Order ${orderId} failed:`, message);

      try {
        await client.rejectOrder(orderId, message);
      } catch (rejectError) {
        console.error(
          "Failed to reject CROO order:",
          rejectError,
        );
      }
    }
  });

  stream.on(EventType.OrderCompleted, (event: unknown) => {
    console.log("CROO order completed:", event);
  });

  stream.on(EventType.OrderRejected, (event: unknown) => {
    console.log("CROO order rejected:", event);
  });

  const shutdown = () => {
    console.log("Stopping CROO provider...");
    stream.close();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  console.log("ShipSpark CROO provider is listening for orders.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
