import type { ShipSparkCrooInput } from "./types";

export function parseRequirements(value: unknown): ShipSparkCrooInput {
  let parsed: unknown = value;

  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch {
      throw new Error("CROO requirements must contain valid JSON.");
    }
  }

  if (!parsed || typeof parsed !== "object") {
    throw new Error("CROO requirements must be an object.");
  }

  const input = parsed as Record<string, unknown>;

  const result: ShipSparkCrooInput = {
    appStoreUrl:
      typeof input.appStoreUrl === "string" ? input.appStoreUrl.trim() : undefined,
    playStoreUrl:
      typeof input.playStoreUrl === "string"
        ? input.playStoreUrl.trim()
        : undefined,
    githubUrl:
      typeof input.githubUrl === "string" ? input.githubUrl.trim() : undefined,
  };

  if (!result.appStoreUrl && !result.playStoreUrl && !result.githubUrl) {
    throw new Error(
      "Provide at least one of appStoreUrl, playStoreUrl, or githubUrl.",
    );
  }

  return result;
}
