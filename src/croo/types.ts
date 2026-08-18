export type ShipSparkCrooInput = {
  appStoreUrl?: string;
  playStoreUrl?: string;
  githubUrl?: string;
};

export type ShipSparkCrooSuccess = {
  ok: true;
  status: "success";
  message: string;
  decision: "PROMOTE" | "WAIT" | "SKIP";
  confidence?: number;
  opportunityScore?: number;
  oneLineVerdict?: string;
  analysis: unknown;
  stores?: unknown;
  github?: unknown;
  modelUsed?: string;
  generatedAt?: string;
};

export type ShipSparkCrooNeedsInput = {
  ok: false;
  status: "needs_input";
  code: string;
  message: string;
  retryable: false;
  details?: unknown;
};

export type ShipSparkCrooTemporaryIssue = {
  ok: false;
  status: "temporary_issue";
  code: string;
  message: string;
  retryable: true;
  details?: unknown;
};

export type ShipSparkCrooResult =
  | ShipSparkCrooSuccess
  | ShipSparkCrooNeedsInput
  | ShipSparkCrooTemporaryIssue;
