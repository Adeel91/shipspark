import type {
  ShipSparkCrooInput,
  ShipSparkCrooResult,
} from "./types";

const DEFAULT_BASE_URL =
  process.env.SHIPSPARK_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

function asRecord(
  value: unknown,
): Record<string, unknown> {
  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    return value as Record<string, unknown>;
  }

  return {};
}

function readableMessage(
  payload: Record<string, unknown>,
  fallback: string,
) {
  return typeof payload.error === "string" &&
    payload.error.trim()
    ? payload.error.trim()
    : fallback;
}

export async function runShipSparkAnalysis(
  input: ShipSparkCrooInput,
): Promise<ShipSparkCrooResult> {
  try {
    const response = await fetch(
      `${DEFAULT_BASE_URL}/api/analyze`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(input),
      },
    );

    const rawText =
      await response.text();

    let parsed: unknown = {};

    if (rawText.trim()) {
      try {
        parsed =
          JSON.parse(rawText);
      } catch {
        return {
          ok: false,
          status:
            "temporary_issue",
          code:
            "INVALID_RESPONSE",
          message:
            "ShipSpark returned an unreadable response. Please try again.",
          retryable: true,
        };
      }
    }

    const payload =
      asRecord(parsed);

    if (!response.ok) {
      if (
        response.status >= 400 &&
        response.status < 500
      ) {
        return {
          ok: false,
          status:
            "needs_input",
          code:
            typeof payload.code ===
            "string"
              ? payload.code
              : "INVALID_INPUT",
          message:
            readableMessage(
              payload,
              "ShipSpark could not analyze the provided sources. Check the URLs and make sure they describe the same product.",
            ),
          retryable: false,
          details:
            payload.sources ??
            undefined,
        };
      }

      return {
        ok: false,
        status:
          "temporary_issue",
        code:
          typeof payload.code ===
          "string"
            ? payload.code
            : "ANALYSIS_UNAVAILABLE",
        message:
          "ShipSpark could not complete the analysis right now. Please try again shortly.",
        retryable: true,
        details:
          typeof payload.error ===
          "string"
            ? payload.error
            : undefined,
      };
    }

    const analysis =
      asRecord(
        payload.analysis,
      );

    const decision =
      analysis.decision;

    if (
      decision !== "PROMOTE" &&
      decision !== "WAIT" &&
      decision !== "SKIP"
    ) {
      return {
        ok: false,
        status:
          "temporary_issue",
        code:
          "INVALID_ANALYSIS_RESPONSE",
        message:
          "ShipSpark completed the request but returned an invalid decision. Please try again.",
        retryable: true,
      };
    }

    return {
      ok: true,
      status: "success",
      message:
        `ShipSpark analysis completed with a ${decision} decision.`,
      decision,
      confidence:
        typeof analysis.confidence ===
        "number"
          ? analysis.confidence
          : undefined,
      opportunityScore:
        typeof analysis.opportunityScore ===
        "number"
          ? analysis.opportunityScore
          : undefined,
      oneLineVerdict:
        typeof analysis.oneLineVerdict ===
        "string"
          ? analysis.oneLineVerdict
          : undefined,
      analysis:
        payload.analysis,
      stores:
        payload.stores,
      github:
        payload.github,
      modelUsed:
        typeof payload.modelUsed ===
        "string"
          ? payload.modelUsed
          : undefined,
      generatedAt:
        typeof payload.generatedAt ===
        "string"
          ? payload.generatedAt
          : undefined,
    };
  } catch (error) {
    return {
      ok: false,
      status:
        "temporary_issue",
      code:
        "SHIPSPARK_UNREACHABLE",
      message:
        "ShipSpark is temporarily unavailable. Please try again shortly.",
      retryable: true,
      details:
        error instanceof Error
          ? error.message
          : String(error),
    };
  }
}
