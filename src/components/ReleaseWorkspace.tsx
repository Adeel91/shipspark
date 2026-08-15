"use client";

import {
  AnalysisProgress,
} from "./AnalysisProgress";

import {
  Activity,
  AlertCircle,
  AppWindow,
  ArrowRight,
  BrainCircuit,
  Check,
  CheckCircle2,
  Copy,
  GitBranch,
  History,
  LoaderCircle,
  MessageSquareText,
  RadioTower,
  Send,
  ShieldAlert,
  Sparkles,
  Store,
  Target,
  Users,
} from "lucide-react";
import {
  FormEvent,
  useEffect,
  useState,
} from "react";

type Analysis = {
  decision:
    | "PROMOTE"
    | "WAIT"
    | "SKIP";

  confidence: number;
  opportunityScore: number;
  oneLineVerdict: string;

  releaseState: {
    status: string;
    explanation: string;
  };

  scores: {
    changeNovelty: number;
    userValue: number;
    reviewDemandMatch: number;
    positioningGap: number;
    timing: number;
    evidenceQuality: number;
  };

  strategicInsight: {
    whatChanged: string;
    whoCares: string;
    whyUsersCare: string;
    whyNow: string;
    strongestReason: string;
    counterArgument: string;
    recommendation: string;
  };

  reviewIntelligence: {
    reviewsAnalyzed: number;
    summary: string;

    topThemes: Array<{
      theme: string;
      sentiment:
        | "positive"
        | "negative"
        | "mixed";
      strength:
        | "weak"
        | "moderate"
        | "strong";
      releaseRelevance: string;
    }>;

    matchedNeeds: string[];
    unresolvedProblems: string[];
    crossPlatformDifferences: string[];
  };

  releaseIntelligence: {
    userFacingChanges: string[];
    maintenanceChanges: string[];
    matchedReviewNeeds: string[];
    positioningGaps: string[];
    versionRisk: string;
  };

  campaign: {
    enabled: boolean;
    angle: string;
    headline: string;
    hook: string;
    audience: string;
    cta: string;
    socialPost: string;
    discordPost: string;
    nextStep: string;
  };

  evidence: string[];
  risks: string[];
};

type Result = {
  stores: {
    ios?: {
      name?: string;
      category?: string;
      version?: string;
      rating?: number;
      ratingCount?: number;
      artwork?: string;
      url?: string;
      reviewsAnalyzed?: number;
    };

    android?: {
      name?: string;
      category?: string;
      version?: string;
      rating?: number;
      ratingCount?: number;
      artwork?: string;
      url?: string;
      reviewsAnalyzed?: number;
    };
  };

  github?: {
    repository?: string;
    description?: string;
    language?: string;
    stars?: number;
    release?: {
      name?: string;
      tag?: string;
      body?: string;
      publishedAt?: string;
      url?: string;
    };
  };

  analysis: Analysis;
  generatedAt: string;
};

type Tab =
  | "intelligence"
  | "reviews"
  | "campaign"
  | "publish"
  | "history";

type HistoryItem = {
  id: string;
  appName: string;
  repository: string;
  decision: string;
  score: number;
  verdict: string;
  createdAt: string;
  status:
    | "ready"
    | "published";
};

const historyKey =
  "shipspark_release_history_v2";

function DecisionTone({
  decision,
}: {
  decision:
    | "PROMOTE"
    | "WAIT"
    | "SKIP";
}) {
  if (
    decision ===
    "PROMOTE"
  ) {
    return (
      <span className="text-[#76e7ff]">
        PROMOTE
      </span>
    );
  }

  if (
    decision ===
    "WAIT"
  ) {
    return (
      <span className="text-amber-300">
        WAIT
      </span>
    );
  }

  return (
    <span className="text-[#aeb9c9]">
      SKIP
    </span>
  );
}

function ScoreBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-5">
        <span className="text-[13px] font-normal text-[#afbdd0]">
          {label}
        </span>

        <span className="font-[var(--font-mono)] text-[9px] text-[#7f91aa]">
          {value}
        </span>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.055]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#637bff] to-[#67def9]"
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
}

function CopyButton({
  value,
  active,
  label,
  onCopy,
}: {
  value: string;
  active: string;
  label: string;
  onCopy: (
    label: string,
    value: string,
  ) => void;
}) {
  return (
    <button
      type="button"
      onClick={() =>
        onCopy(
          label,
          value,
        )
      }
      className="inline-flex items-center gap-2 rounded-lg border border-white/[0.09] bg-white/[0.035] px-3 py-2 text-[11px] font-normal text-[#a8b6c9] transition hover:border-[#68dff9]/25 hover:text-white"
    >
      {active ===
      label ? (
        <>
          <Check size={12} />
          Copied
        </>
      ) : (
        <>
          <Copy size={12} />
          Copy
        </>
      )}
    </button>
  );
}

export function ReleaseWorkspace() {
  const [
    appStoreUrl,
    setAppStoreUrl,
  ] = useState("");

  const [
    playStoreUrl,
    setPlayStoreUrl,
  ] = useState("");

  const [
    githubUrl,
    setGithubUrl,
  ] = useState("");

  const [
    result,
    setResult,
  ] =
    useState<Result | null>(
      null,
    );

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    activeTab,
    setActiveTab,
  ] =
    useState<Tab>(
      "intelligence",
    );

  const [
    socialDraft,
    setSocialDraft,
  ] = useState("");

  const [
    discordDraft,
    setDiscordDraft,
  ] = useState("");

  const [
    webhook,
    setWebhook,
  ] = useState("");

  const [
    publishing,
    setPublishing,
  ] = useState(false);

  const [
    publishError,
    setPublishError,
  ] = useState("");

  const [
    published,
    setPublished,
  ] = useState(false);

  const [
    copied,
    setCopied,
  ] = useState("");

  const [
    history,
    setHistory,
  ] =
    useState<
      HistoryItem[]
    >([]);

  const [
    currentHistoryId,
    setCurrentHistoryId,
  ] =
    useState<
      string | null
    >(null);

  useEffect(() => {
    try {
      const raw =
        localStorage.getItem(
          historyKey,
        );

      if (raw) {
        setHistory(
          JSON.parse(
            raw,
          ),
        );
      }
    } catch {
      setHistory([]);
    }
  }, []);

  function saveHistory(
    items:
      HistoryItem[],
  ) {
    setHistory(items);

    localStorage.setItem(
      historyKey,
      JSON.stringify(
        items,
      ),
    );
  }

  async function analyze(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (
      !appStoreUrl.trim() &&
      !playStoreUrl.trim() &&
      !githubUrl.trim()
    ) {
      setError(
        "Add at least one source: App Store, Google Play, or GitHub.",
      );
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setPublished(false);
    setPublishError("");
    setActiveTab(
      "intelligence",
    );

    try {
      const response =
        await fetch(
          "/api/analyze",
          {
            method:
              "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body:
              JSON.stringify({
                appStoreUrl:
                  appStoreUrl.trim() ||
                  undefined,

                playStoreUrl:
                  playStoreUrl.trim() ||
                  undefined,

                githubUrl:
                  githubUrl.trim() ||
                  undefined,
              }),
          },
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Analysis failed.",
        );
      }

      const next =
        data as Result;

      setResult(next);

      setSocialDraft(
        next.analysis
          .campaign
          .socialPost,
      );

      setDiscordDraft(
        next.analysis
          .campaign
          .discordPost,
      );

      const store =
        next.stores.ios ??
        next.stores
          .android;

      const item: HistoryItem =
        {
          id:
            crypto.randomUUID(),
          appName:
            store?.name ??
            "Mobile app",
          repository:
            next.github
              ?.repository ??
            "Store intelligence",
          decision:
            next.analysis
              .decision,
          score:
            next.analysis
              .opportunityScore,
          verdict:
            next.analysis
              .oneLineVerdict,
          createdAt:
            new Date().toISOString(),
          status:
            "ready",
        };

      const updated =
        [
          item,
          ...history,
        ].slice(
          0,
          20,
        );

      saveHistory(
        updated,
      );

      setCurrentHistoryId(
        item.id,
      );
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Analysis failed.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function copy(
    label: string,
    value: string,
  ) {
    await navigator.clipboard.writeText(
      value,
    );

    setCopied(label);

    setTimeout(
      () =>
        setCopied(""),
      1400,
    );
  }

  async function publish() {
    if (!result) {
      return;
    }

    setPublishing(true);
    setPublishError("");

    try {
      const response =
        await fetch(
          "/api/publish/discord",
          {
            method:
              "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body:
              JSON.stringify({
                webhookUrl:
                  webhook,
                content:
                  discordDraft,
                appName:
                  result.stores
                    .ios
                    ?.name ??
                  result.stores
                    .android
                    ?.name,
              }),
          },
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Publishing failed.",
        );
      }

      setPublished(true);

      if (
        currentHistoryId
      ) {
        const updated =
          history.map(
            (item) =>
              item.id ===
              currentHistoryId
                ? {
                    ...item,
                    status:
                      "published" as const,
                  }
                : item,
          );

        saveHistory(
          updated,
        );
      }
    } catch (caught) {
      setPublishError(
        caught instanceof Error
          ? caught.message
          : "Publishing failed.",
      );
    } finally {
      setPublishing(false);
    }
  }

  const analysis =
    result?.analysis;

  const tabs:
    Array<{
      id: Tab;
      label: string;
      icon:
        typeof BrainCircuit;
    }> = [
      {
        id:
          "intelligence",
        label:
          "Intelligence",
        icon:
          BrainCircuit,
      },
      {
        id:
          "reviews",
        label:
          "Reviews",
        icon:
          MessageSquareText,
      },
      {
        id:
          "campaign",
        label:
          "Campaign",
        icon:
          Target,
      },
      {
        id:
          "publish",
        label:
          "Publish",
        icon:
          RadioTower,
      },
      {
        id:
          "history",
        label:
          "History",
        icon:
          History,
      },
    ];

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-white/[0.075] bg-[#0a0f18]/90 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
        <div className="flex flex-col gap-3 border-b border-white/[0.055] pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.18em] text-[#68def9]">
              Intelligence sources
            </div>

            <div className="mt-3 text-[18px] font-normal text-[#e2ebf6]">
              Start with whatever you have.
            </div>
          </div>

          <p className="max-w-[570px] text-[13px] font-normal leading-6 text-[#91a2b8]">
            Add any one source or combine all three. More sources give ShipSpark stronger evidence, but none of them is required individually.
          </p>
        </div>

        <form
          onSubmit={
            analyze
          }
          className="mt-5 space-y-3"
        >
          <div className="grid gap-3 xl:grid-cols-3">
            <label className="rounded-2xl border border-white/[0.075] bg-[#070b12] px-4 py-3.5 transition focus-within:border-[#66ddf8]/35">
              <span className="mb-2 flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 font-[var(--font-mono)] text-[8px] uppercase tracking-[0.16em] text-[#8293aa]">
                  <AppWindow size={11} />
                  App Store
                </span>

                <span className="font-[var(--font-mono)] text-[7px] uppercase tracking-[0.13em] text-[#526176]">
                  Optional
                </span>
              </span>

              <input
                value={
                  appStoreUrl
                }
                onChange={(
                  event,
                ) =>
                  setAppStoreUrl(
                    event.target
                      .value,
                  )
                }
                placeholder="https://apps.apple.com/..."
                className="w-full bg-transparent text-[14px] font-normal text-[#edf4fc] outline-none placeholder:text-[#536176]"
              />
            </label>

            <label className="rounded-2xl border border-white/[0.075] bg-[#070b12] px-4 py-3.5 transition focus-within:border-[#66ddf8]/35">
              <span className="mb-2 flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 font-[var(--font-mono)] text-[8px] uppercase tracking-[0.16em] text-[#8293aa]">
                  <Store size={11} />
                  Google Play
                </span>

                <span className="font-[var(--font-mono)] text-[7px] uppercase tracking-[0.13em] text-[#526176]">
                  Optional
                </span>
              </span>

              <input
                value={
                  playStoreUrl
                }
                onChange={(
                  event,
                ) =>
                  setPlayStoreUrl(
                    event.target
                      .value,
                  )
                }
                placeholder="https://play.google.com/store/apps/details?id=..."
                className="w-full bg-transparent text-[14px] font-normal text-[#edf4fc] outline-none placeholder:text-[#536176]"
              />
            </label>

            <label className="rounded-2xl border border-white/[0.075] bg-[#070b12] px-4 py-3.5 transition focus-within:border-[#66ddf8]/35">
              <span className="mb-2 flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 font-[var(--font-mono)] text-[8px] uppercase tracking-[0.16em] text-[#8293aa]">
                  <GitBranch size={11} />
                  GitHub
                </span>

                <span className="font-[var(--font-mono)] text-[7px] uppercase tracking-[0.13em] text-[#526176]">
                  Optional
                </span>
              </span>

              <input
                value={
                  githubUrl
                }
                onChange={(
                  event,
                ) =>
                  setGithubUrl(
                    event.target
                      .value,
                  )
                }
                placeholder="https://github.com/owner/repository"
                className="w-full bg-transparent text-[14px] font-normal text-[#edf4fc] outline-none placeholder:text-[#536176]"
              />
            </label>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.055] bg-white/[0.018] p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-x-5 gap-y-2 font-[var(--font-mono)] text-[7px] uppercase tracking-[0.13em] text-[#65758c]">
              <span>Store positioning</span>
              <span>Reviews</span>
              <span>Ratings</span>
              <span>Release notes</span>
              <span>Source activity</span>
              <span>Demand matching</span>
            </div>

            <button
              type="submit"
              disabled={
                loading
              }
              className="flex min-h-[48px] min-w-[190px] shrink-0 items-center justify-center gap-3 rounded-xl bg-white px-6 text-[13px] font-medium text-[#07101b] transition hover:bg-[#dff8ff] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <LoaderCircle
                    size={16}
                    className="animate-spin"
                  />
                  Analyzing
                </>
              ) : (
                <>
                  Analyze evidence
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </div>
        </form>
      </section>

      <div className="flex gap-1 overflow-x-auto border-b border-white/[0.065]">
        {tabs.map(
          (tab) => {
            const Icon =
              tab.icon;

            return (
              <button
                key={
                  tab.id
                }
                type="button"
                onClick={() =>
                  setActiveTab(
                    tab.id,
                  )
                }
                className={`flex shrink-0 items-center gap-2 border-b px-4 pb-4 pt-2 text-[12px] font-normal transition ${
                  activeTab ===
                  tab.id
                    ? "border-[#68def9] text-white"
                    : "border-transparent text-[#7f90a7] hover:text-[#c6d2e1]"
                }`}
              >
                <Icon size={13} />
                {
                  tab.label
                }
              </button>
            );
          },
        )}
      </div>

      {loading && (
        <AnalysisProgress />
      )}

      {!loading &&
        error && (
          <div className="grid min-h-[480px] place-items-center">
            <div className="max-w-[560px] text-center">
              <AlertCircle
                size={22}
                className="mx-auto text-red-300"
              />

              <h2 className="mt-5 text-[26px] font-normal text-white">
                Analysis could not complete
              </h2>

              <p className="mt-3 text-[14px] font-normal leading-7 text-[#c7a3aa]">
                {error}
              </p>
            </div>
          </div>
        )}

      {!loading &&
        !error &&
        !result &&
        activeTab !==
          "history" && (
          <div className="grid min-h-[450px] gap-8 py-10 lg:grid-cols-3">
            {[
              {
                icon:
                  MessageSquareText,
                number:
                  "01",
                title:
                  "Find real demand",
                text:
                  "Recent store reviews reveal recurring pain, praise, and feature demand.",
              },
              {
                icon:
                  BrainCircuit,
                number:
                  "02",
                title:
                  "Match demand to the release",
                text:
                  "ShipSpark checks whether what shipped actually answers a meaningful customer need.",
              },
              {
                icon:
                  Target,
                number:
                  "03",
                title:
                  "Decide before creating",
                text:
                  "PROMOTE, WAIT, or SKIP comes before campaign generation.",
              },
            ].map(
              (item) => {
                const Icon =
                  item.icon;

                return (
                  <div
                    key={
                      item.number
                    }
                    className="border-t border-white/[0.07] pt-6"
                  >
                    <div className="flex items-center justify-between">
                      <Icon
                        size={17}
                        className="text-[#68def9]"
                      />

                      <span className="font-[var(--font-mono)] text-[8px] text-[#53647b]">
                        {
                          item.number
                        }
                      </span>
                    </div>

                    <h3 className="mt-12 text-[23px] font-normal text-white">
                      {
                        item.title
                      }
                    </h3>

                    <p className="mt-3 max-w-[350px] text-[14px] font-normal leading-7 text-[#9cacbf]">
                      {
                        item.text
                      }
                    </p>
                  </div>
                );
              },
            )}
          </div>
        )}

      {!loading &&
        result &&
        analysis &&
        activeTab ===
          "intelligence" && (
          <div className="space-y-12">
            <section className="grid gap-8 border-b border-white/[0.065] pb-10 lg:grid-cols-[1fr_1.3fr]">
              <div>
                <div className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.17em] text-[#718198]">
                  Growth decision
                </div>

                <div className="mt-4 text-[54px] font-normal tracking-[-0.035em]">
                  <DecisionTone
                    decision={
                      analysis.decision
                    }
                  />
                </div>

                <div className="mt-3 flex items-center gap-4">
                  <span className="font-[var(--font-mono)] text-[9px] text-[#68def9]">
                    {
                      analysis.opportunityScore
                    }
                    /100 opportunity
                  </span>

                  <span className="font-[var(--font-mono)] text-[9px] text-[#718198]">
                    {
                      analysis.confidence
                    }
                    % confidence
                  </span>
                </div>

                <p className="mt-6 max-w-[500px] text-[17px] font-normal leading-8 text-[#c1cede]">
                  {
                    analysis.oneLineVerdict
                  }
                </p>
              </div>

              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <ScoreBar
                  label="Change novelty"
                  value={
                    analysis.scores
                      .changeNovelty
                  }
                />

                <ScoreBar
                  label="User value"
                  value={
                    analysis.scores
                      .userValue
                  }
                />

                <ScoreBar
                  label="Review demand match"
                  value={
                    analysis.scores
                      .reviewDemandMatch
                  }
                />

                <ScoreBar
                  label="Positioning gap"
                  value={
                    analysis.scores
                      .positioningGap
                  }
                />

                <ScoreBar
                  label="Timing"
                  value={
                    analysis.scores
                      .timing
                  }
                />

                <ScoreBar
                  label="Evidence quality"
                  value={
                    analysis.scores
                      .evidenceQuality
                  }
                />
              </div>
            </section>

            <section className="grid gap-10 lg:grid-cols-2">
              <div>
                <div className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.17em] text-[#68def9]">
                  What actually changed
                </div>

                <h2 className="mt-4 text-[29px] font-normal leading-[1.15] tracking-[-0.025em] text-white">
                  {
                    analysis.strategicInsight
                      .whatChanged
                  }
                </h2>

                <div className="mt-8">
                  <div className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.16em] text-[#718198]">
                    Why users care
                  </div>

                  <p className="mt-3 text-[15px] font-normal leading-7 text-[#b1bfd1]">
                    {
                      analysis.strategicInsight
                        .whyUsersCare
                    }
                  </p>
                </div>
              </div>

              <div>
                <div className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.17em] text-[#8b99ff]">
                  Who should care
                </div>

                <h2 className="mt-4 text-[29px] font-normal leading-[1.15] tracking-[-0.025em] text-white">
                  {
                    analysis.strategicInsight
                      .whoCares
                  }
                </h2>

                <div className="mt-8">
                  <div className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.16em] text-[#718198]">
                    Why now
                  </div>

                  <p className="mt-3 text-[15px] font-normal leading-7 text-[#b1bfd1]">
                    {
                      analysis.strategicInsight
                        .whyNow
                    }
                  </p>
                </div>
              </div>
            </section>

            <section className="grid gap-8 border-y border-white/[0.065] py-9 lg:grid-cols-3">
              <div>
                <div className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.16em] text-[#68def9]">
                  Strongest reason
                </div>

                <p className="mt-4 text-[15px] font-normal leading-7 text-[#c0cddd]">
                  {
                    analysis.strategicInsight
                      .strongestReason
                  }
                </p>
              </div>

              <div>
                <div className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.16em] text-amber-300">
                  Best argument against
                </div>

                <p className="mt-4 text-[15px] font-normal leading-7 text-[#c0cddd]">
                  {
                    analysis.strategicInsight
                      .counterArgument
                  }
                </p>
              </div>

              <div>
                <div className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.16em] text-[#8b99ff]">
                  Recommended action
                </div>

                <p className="mt-4 text-[15px] font-normal leading-7 text-[#c0cddd]">
                  {
                    analysis.strategicInsight
                      .recommendation
                  }
                </p>
              </div>
            </section>

            <section>
              <div className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.17em] text-[#718198]">
                Release state
              </div>

              <div className="mt-4 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
                <div className="text-[25px] font-normal tracking-[-0.02em] text-white">
                  {analysis.releaseState.status.replaceAll(
                    "_",
                    " ",
                  )}
                </div>

                <p className="text-[15px] font-normal leading-7 text-[#afbdd0]">
                  {
                    analysis.releaseState
                      .explanation
                  }
                </p>
              </div>
            </section>
          </div>
        )}

      {!loading &&
        result &&
        analysis &&
        activeTab ===
          "reviews" && (
          <div className="space-y-12">
            <section className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <div className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.17em] text-[#68def9]">
                  Review intelligence
                </div>

                <div className="mt-5 text-[58px] font-normal tracking-[-0.04em] text-white">
                  {
                    analysis.reviewIntelligence
                      .reviewsAnalyzed
                  }
                </div>

                <div className="mt-1 text-[13px] font-normal text-[#8697ae]">
                  recent reviews analyzed
                </div>
              </div>

              <p className="text-[22px] font-normal leading-[1.45] tracking-[-0.018em] text-[#c5d1e0]">
                {
                  analysis.reviewIntelligence
                    .summary
                }
              </p>
            </section>

            <section>
              <div className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.17em] text-[#718198]">
                Dominant customer themes
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {analysis.reviewIntelligence.topThemes.map(
                  (
                    theme,
                    index,
                  ) => (
                    <div
                      key={`${theme.theme}${index}`}
                      className="rounded-[22px] border border-white/[0.07] bg-white/[0.025] p-5"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[17px] font-normal text-white">
                          {
                            theme.theme
                          }
                        </span>

                        <span className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.12em] text-[#7f91aa]">
                          {
                            theme.strength
                          }
                        </span>
                      </div>

                      <div className="mt-3 font-[var(--font-mono)] text-[8px] uppercase tracking-[0.12em] text-[#68def9]">
                        {
                          theme.sentiment
                        }
                      </div>

                      <p className="mt-4 text-[13px] font-normal leading-6 text-[#9eafc3]">
                        {
                          theme.releaseRelevance
                        }
                      </p>
                    </div>
                  ),
                )}
              </div>
            </section>

            <section className="grid gap-12 lg:grid-cols-2">
              <div>
                <div className="flex items-center gap-2 text-[12px] font-normal text-emerald-300">
                  <CheckCircle2 size={14} />
                  Needs this release matches
                </div>

                <div className="mt-6 space-y-4">
                  {analysis.reviewIntelligence.matchedNeeds.length ? (
                    analysis.reviewIntelligence.matchedNeeds.map(
                      (
                        item,
                        index,
                      ) => (
                        <div
                          key={`${item}${index}`}
                          className="border-l border-emerald-400/25 pl-4 text-[14px] font-normal leading-7 text-[#afbdd0]"
                        >
                          {
                            item
                          }
                        </div>
                      ),
                    )
                  ) : (
                    <p className="text-[14px] text-[#8192a9]">
                      No strong review need matched this release.
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-[12px] font-normal text-amber-300">
                  <ShieldAlert size={14} />
                  Problems still unresolved
                </div>

                <div className="mt-6 space-y-4">
                  {analysis.reviewIntelligence.unresolvedProblems.map(
                    (
                      item,
                      index,
                    ) => (
                      <div
                        key={`${item}${index}`}
                        className="border-l border-amber-400/25 pl-4 text-[14px] font-normal leading-7 text-[#afbdd0]"
                      >
                        {
                          item
                        }
                      </div>
                    ),
                  )}
                </div>
              </div>
            </section>

            {analysis.reviewIntelligence.crossPlatformDifferences.length >
              0 && (
              <section className="border-t border-white/[0.065] pt-9">
                <div className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.17em] text-[#8b99ff]">
                  Cross platform differences
                </div>

                <div className="mt-5 space-y-4">
                  {analysis.reviewIntelligence.crossPlatformDifferences.map(
                    (
                      item,
                      index,
                    ) => (
                      <p
                        key={`${item}${index}`}
                        className="text-[14px] font-normal leading-7 text-[#afbdd0]"
                      >
                        {
                          item
                        }
                      </p>
                    ),
                  )}
                </div>
              </section>
            )}
          </div>
        )}

      {!loading &&
        result &&
        analysis &&
        activeTab ===
          "campaign" && (
          <div>
            {!analysis.campaign.enabled ? (
              <section className="grid min-h-[430px] place-items-center">
                <div className="max-w-[680px] text-center">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-[#8fa0b7]">
                    <Target size={18} />
                  </div>

                  <h2 className="mt-6 text-[34px] font-normal tracking-[-0.025em] text-white">
                    No campaign generated
                  </h2>

                  <p className="mt-4 text-[16px] font-normal leading-8 text-[#a8b7ca]">
                    ShipSpark decided{" "}
                    {
                      analysis.decision
                    }
                    . Generating campaign copy anyway would defeat the point of the decision engine.
                  </p>

                  <div className="mt-8 border-t border-white/[0.065] pt-6">
                    <div className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.16em] text-[#718198]">
                      Next step
                    </div>

                    <p className="mt-3 text-[15px] font-normal leading-7 text-[#c2cede]">
                      {
                        analysis.campaign
                          .nextStep
                      }
                    </p>
                  </div>
                </div>
              </section>
            ) : (
              <div className="space-y-10">
                <section className="border-b border-white/[0.065] pb-9">
                  <div className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.17em] text-[#68def9]">
                    Winning angle
                  </div>

                  <h2 className="mt-5 max-w-[920px] text-[42px] font-normal leading-[1.06] tracking-[-0.03em] text-white">
                    {
                      analysis.campaign
                        .angle
                    }
                  </h2>

                  <p className="mt-5 max-w-[760px] text-[16px] font-normal leading-7 text-[#a8b7ca]">
                    {
                      analysis.campaign
                        .hook
                    }
                  </p>
                </section>

                <section>
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <div className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.16em] text-[#718198]">
                        Campaign headline
                      </div>

                      <h3 className="mt-4 text-[31px] font-normal tracking-[-0.025em] text-white">
                        {
                          analysis.campaign
                            .headline
                        }
                      </h3>
                    </div>

                    <CopyButton
                      value={
                        analysis.campaign
                          .headline
                      }
                      label="headline"
                      active={
                        copied
                      }
                      onCopy={
                        copy
                      }
                    />
                  </div>
                </section>

                <section className="grid gap-9 lg:grid-cols-2">
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.16em] text-[#718198]">
                        Social
                      </span>

                      <CopyButton
                        value={
                          socialDraft
                        }
                        label="social"
                        active={
                          copied
                        }
                        onCopy={
                          copy
                        }
                      />
                    </div>

                    <textarea
                      value={
                        socialDraft
                      }
                      onChange={(
                        event,
                      ) =>
                        setSocialDraft(
                          event.target
                            .value,
                        )
                      }
                      rows={10}
                      className="w-full resize-none rounded-[22px] border border-white/[0.075] bg-[#080d15] p-5 text-[14px] font-normal leading-7 text-[#d4deeb] outline-none focus:border-[#68def9]/30"
                    />
                  </div>

                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.16em] text-[#718198]">
                        Discord
                      </span>

                      <CopyButton
                        value={
                          discordDraft
                        }
                        label="discord"
                        active={
                          copied
                        }
                        onCopy={
                          copy
                        }
                      />
                    </div>

                    <textarea
                      value={
                        discordDraft
                      }
                      onChange={(
                        event,
                      ) =>
                        setDiscordDraft(
                          event.target
                            .value,
                        )
                      }
                      rows={10}
                      className="w-full resize-none rounded-[22px] border border-white/[0.075] bg-[#080d15] p-5 text-[14px] font-normal leading-7 text-[#d4deeb] outline-none focus:border-[#68def9]/30"
                    />
                  </div>
                </section>

                <button
                  type="button"
                  onClick={() =>
                    setActiveTab(
                      "publish",
                    )
                  }
                  className="inline-flex h-11 items-center gap-3 rounded-xl bg-white px-5 text-[12px] font-medium text-[#07101b]"
                >
                  Continue to publishing
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        )}

      {!loading &&
        result &&
        analysis &&
        activeTab ===
          "publish" && (
          <div>
            {!analysis.campaign.enabled ? (
              <div className="grid min-h-[420px] place-items-center text-center">
                <div>
                  <RadioTower
                    size={21}
                    className="mx-auto text-[#66788f]"
                  />

                  <h2 className="mt-5 text-[28px] font-normal text-white">
                    Nothing to publish
                  </h2>

                  <p className="mt-3 text-[14px] text-[#9cacbf]">
                    Publishing becomes available when ShipSpark returns PROMOTE.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
                <section>
                  <div className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.17em] text-[#68def9]">
                    Discord publishing
                  </div>

                  <h2 className="mt-5 text-[34px] font-normal text-white">
                    Send it for real.
                  </h2>

                  <p className="mt-4 text-[14px] font-normal leading-7 text-[#a7b6c9]">
                    Enter a Discord webhook and ShipSpark will publish the prepared campaign directly.
                  </p>

                  <input
                    type="password"
                    value={
                      webhook
                    }
                    onChange={(
                      event,
                    ) =>
                      setWebhook(
                        event.target
                          .value,
                      )
                    }
                    placeholder="https://discord.com/api/webhooks/..."
                    className="mt-7 w-full rounded-xl border border-white/[0.075] bg-[#080d15] px-4 py-3.5 text-[13px] text-white outline-none focus:border-[#68def9]/30"
                  />

                  {publishError && (
                    <p className="mt-4 text-[13px] text-red-300">
                      {
                        publishError
                      }
                    </p>
                  )}

                  {published && (
                    <div className="mt-5 flex items-center gap-2 text-[13px] text-emerald-300">
                      <CheckCircle2 size={14} />
                      Published successfully
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={
                      publish
                    }
                    disabled={
                      publishing ||
                      !webhook.trim()
                    }
                    className="mt-6 inline-flex h-11 items-center gap-3 rounded-xl bg-[#5865f2] px-5 text-[12px] font-medium text-white disabled:opacity-40"
                  >
                    {publishing ? (
                      <LoaderCircle
                        size={14}
                        className="animate-spin"
                      />
                    ) : (
                      <Send size={14} />
                    )}

                    {publishing
                      ? "Publishing"
                      : "Publish campaign"}
                  </button>
                </section>

                <section className="rounded-[28px] border border-white/[0.075] bg-[#0a1019] p-7">
                  <div className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.16em] text-[#718198]">
                    Preview
                  </div>

                  <div className="mt-7 flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-[#5865f2]">
                      <Sparkles size={15} />
                    </div>

                    <div>
                      <div className="text-[14px] font-medium text-white">
                        ShipSpark
                      </div>

                      <div className="font-[var(--font-mono)] text-[7px] uppercase text-[#718198]">
                        App
                      </div>
                    </div>
                  </div>

                  <p className="mt-6 whitespace-pre-wrap text-[14px] font-normal leading-7 text-[#c3cedd]">
                    {
                      discordDraft
                    }
                  </p>
                </section>
              </div>
            )}
          </div>
        )}

      {!loading &&
        activeTab ===
          "history" && (
          <div>
            <div className="border-b border-white/[0.065] pb-7">
              <div className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.17em] text-[#68def9]">
                Release history
              </div>

              <h2 className="mt-4 text-[32px] font-normal text-white">
                Previous decisions
              </h2>
            </div>

            {history.length ===
            0 ? (
              <div className="grid min-h-[360px] place-items-center text-[14px] text-[#8798af]">
                No releases analyzed yet.
              </div>
            ) : (
              <div className="divide-y divide-white/[0.065]">
                {history.map(
                  (
                    item,
                  ) => (
                    <div
                      key={
                        item.id
                      }
                      className="grid gap-5 py-6 md:grid-cols-[1fr_auto_auto] md:items-center"
                    >
                      <div>
                        <div className="text-[16px] font-normal text-white">
                          {
                            item.appName
                          }
                        </div>

                        <div className="mt-1 font-[var(--font-mono)] text-[8px] text-[#64758c]">
                          {
                            item.repository
                          }
                        </div>

                        <p className="mt-3 text-[13px] font-normal text-[#9eafc3]">
                          {
                            item.verdict
                          }
                        </p>
                      </div>

                      <span className="font-[var(--font-mono)] text-[9px] text-[#68def9]">
                        {
                          item.decision
                        }{" "}
                        ·{" "}
                        {
                          item.score
                        }
                      </span>

                      <span className="font-[var(--font-mono)] text-[8px] uppercase text-[#718198]">
                        {
                          item.status
                        }
                      </span>
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        )}
    </div>
  );
}
