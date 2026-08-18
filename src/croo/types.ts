export type ShipSparkCrooInput = {
  appStoreUrl?: string;
  googlePlayUrl?: string;
  githubUrl?: string;
};

export type ShipSparkCrooOutput = {
  decision: "PROMOTE" | "WAIT" | "SKIP";
  confidence?: number;
  opportunityScore?: number;
  summary?: string;
  evidence?: unknown;
  campaign?: unknown;
  raw?: unknown;
};
