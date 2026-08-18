import type { ShipSparkCrooInput, ShipSparkCrooOutput } from "./types";

const DEFAULT_BASE_URL =
  process.env.SHIPSPARK_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

export async function runShipSparkAnalysis(
  input: ShipSparkCrooInput,
): Promise<ShipSparkCrooOutput> {
  const response = await fetch(`${DEFAULT_BASE_URL}/api/analyze`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(
      `ShipSpark analysis failed with ${response.status}: ${text.slice(0, 1000)}`,
    );
  }

  let data: unknown;

  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("ShipSpark analysis returned invalid JSON.");
  }

  const result = data as Record<string, unknown>;
  const decision = result.decision;

  if (
    decision !== "PROMOTE" &&
    decision !== "WAIT" &&
    decision !== "SKIP"
  ) {
    throw new Error("ShipSpark analysis returned an invalid decision.");
  }

  return {
    decision,
    confidence:
      typeof result.confidence === "number" ? result.confidence : undefined,
    opportunityScore:
      typeof result.opportunityScore === "number"
        ? result.opportunityScore
        : undefined,
    summary:
      typeof result.summary === "string"
        ? result.summary
        : typeof result.recommendation === "string"
          ? result.recommendation
          : undefined,
    evidence: result.evidence,
    campaign: decision === "PROMOTE" ? result.campaign : undefined,
    raw: data,
  };
}
