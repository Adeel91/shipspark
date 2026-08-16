"use client";

import {
  WorkspacePrimaryTabs,
  type WorkspacePrimaryTab,
} from "./WorkspacePrimaryTabs";


import {
  IntelligenceExperienceV2,
} from "./IntelligenceExperienceV2";

import {
  PromoteExperience,
} from "./PromoteExperience";

import {
  PublishExperience,
} from "./PublishExperience";


import {
  AnalysisProgress,
} from "./AnalysisProgress";

import {
  AlertCircle,
  AppWindow,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  GitBranch,
  LoaderCircle,
  MessageSquareText,
  ShieldAlert,
  Store,
  Target,
} from "lucide-react";
import {
  FormEvent,
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
    history,
    setHistory,
  ] =
    useState<
      HistoryItem[]
    >(() => {
      if (
        typeof window ===
        "undefined"
      ) {
        return [];
      }

      try {
        const raw =
          window.localStorage.getItem(
            historyKey,
          );

        return raw
          ? JSON.parse(raw)
          : [];
      } catch {
        return [];
      }
    });

  const [
    currentHistoryId,
    setCurrentHistoryId,
  ] =
    useState<
      string | null
    >(null);

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

  function markCurrentPublished() {
    if (!currentHistoryId) {
      return;
    }

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

  const analysis =
    result?.analysis;

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-white/[0.075] bg-[#0a0f18]/90 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
        <div className="flex flex-col gap-3 border-b border-white/[0.055] pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="font-[var(--font-main)] text-[10px] uppercase tracking-[0.18em] text-[#c5ff0a]">
              Intelligence sources
            </div>

            <div className="mt-3 text-[18px] font-normal text-[#f2f5f7]">
              Start with whatever you have.
            </div>
          </div>

          <p className="max-w-[570px] text-[14px] font-semibold leading-6 text-[#a7b0bd]">
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
            <label className="rounded-2xl border border-white/[0.075] bg-[#070b12] px-4 py-3.5 transition focus-within:border-[#c5ff0a]/35">
              <span className="mb-2 flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 font-[var(--font-main)] text-[10px] uppercase tracking-[0.11em] text-[#98a3b2]">
                  <AppWindow size={11} />
                  App Store
                </span>

                <span className="font-[var(--font-main)] text-[10px] uppercase tracking-[0.09em] text-[#9aa6b4]">
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
                className="w-full bg-transparent text-[15px] font-semibold text-[#f1f4f7] outline-none placeholder:text-[#536176]"
              />
            </label>

            <label className="rounded-2xl border border-white/[0.075] bg-[#070b12] px-4 py-3.5 transition focus-within:border-[#c5ff0a]/35">
              <span className="mb-2 flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 font-[var(--font-main)] text-[10px] uppercase tracking-[0.11em] text-[#98a3b2]">
                  <Store size={11} />
                  Google Play
                </span>

                <span className="font-[var(--font-main)] text-[10px] uppercase tracking-[0.09em] text-[#9aa6b4]">
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
                className="w-full bg-transparent text-[15px] font-semibold text-[#f1f4f7] outline-none placeholder:text-[#536176]"
              />
            </label>

            <label className="rounded-2xl border border-white/[0.075] bg-[#070b12] px-4 py-3.5 transition focus-within:border-[#c5ff0a]/35">
              <span className="mb-2 flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 font-[var(--font-main)] text-[10px] uppercase tracking-[0.11em] text-[#98a3b2]">
                  <GitBranch size={11} />
                  GitHub
                </span>

                <span className="font-[var(--font-main)] text-[10px] uppercase tracking-[0.09em] text-[#9aa6b4]">
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
                className="w-full bg-transparent text-[15px] font-semibold text-[#f1f4f7] outline-none placeholder:text-[#536176]"
              />
            </label>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.055] bg-white/[0.018] p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-x-5 gap-y-2 font-[var(--font-main)] text-[10px] uppercase tracking-[0.09em] text-[#a5b0bd]">
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
              className="flex min-h-[48px] min-w-[190px] shrink-0 items-center justify-center gap-3 rounded-xl bg-[linear-gradient(110deg,#c5ff0a_0%,#53ff72_100%)] px-6 text-[13px] font-bold text-[#071006] shadow-[0_12px_34px_rgba(83,255,114,0.14)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
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

      <WorkspacePrimaryTabs
        activeTab={
          activeTab
        }
        onChange={(
          tab,
        ) =>
          setActiveTab(
            tab as WorkspacePrimaryTab,
          )
        }
        campaignReady={
          Boolean(
            result
              ?.analysis
              ?.campaign
              ?.enabled,
          )
        }
      />

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
                        className="text-[#c5ff0a]"
                      />

                      <span className="font-[var(--font-main)] text-[10px] text-[#53647b]">
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
          <IntelligenceExperienceV2
            analysis={
              analysis
            }
            onNavigate={(
              tab,
            ) =>
              setActiveTab(
                tab,
              )
            }
          />
        )}

      {!loading &&
        result &&
        analysis &&
        activeTab ===
          "reviews" && (
          <div className="space-y-12">
            <section className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <div className="font-[var(--font-main)] text-[10px] uppercase tracking-[0.17em] text-[#c5ff0a]">
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
              <div className="font-[var(--font-main)] text-[10px] uppercase tracking-[0.17em] text-[#acb6c2]">
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

                        <span className="font-[var(--font-main)] text-[10px] uppercase tracking-[0.12em] text-[#7f91aa]">
                          {
                            theme.strength
                          }
                        </span>
                      </div>

                      <div className="mt-3 font-[var(--font-main)] text-[10px] uppercase tracking-[0.12em] text-[#c5ff0a]">
                        {
                          theme.sentiment
                        }
                      </div>

                      <p className="mt-4 text-[14px] font-semibold leading-6 text-[#9eafc3]">
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
                <div className="font-[var(--font-main)] text-[10px] uppercase tracking-[0.17em] text-[#8b99ff]">
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
          <PromoteExperience
            analysis={
              analysis
            }
            appName={
              result.stores
                .ios
                ?.name ??
              result.stores
                .android
                ?.name ??
              result.github
                ?.repository
            }
            socialDraft={
              socialDraft
            }
            discordDraft={
              discordDraft
            }
            onSocialDraftChange={
              setSocialDraft
            }
            onDiscordDraftChange={
              setDiscordDraft
            }
            onContinue={() =>
              setActiveTab(
                "publish",
              )
            }
          />
        )}

      {!loading &&
        result &&
        analysis &&
        activeTab ===
          "publish" && (
          <PublishExperience
            analysis={
              analysis
            }
            appName={
              result.stores
                .ios
                ?.name ??
              result.stores
                .android
                ?.name ??
              result.github
                ?.repository
            }
            socialDraft={
              socialDraft
            }
            discordDraft={
              discordDraft
            }
            webhook={
              webhook
            }
            onWebhookChange={
              setWebhook
            }
            onDiscordPublished={
              markCurrentPublished
            }
            onBack={() =>
              setActiveTab(
                "campaign",
              )
            }
          />
        )}

      {!loading &&
        activeTab ===
          "history" && (
          <div>
            <div className="border-b border-white/[0.065] pb-7">
              <div className="font-[var(--font-main)] text-[10px] uppercase tracking-[0.17em] text-[#c5ff0a]">
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

                        <div className="mt-1 font-[var(--font-main)] text-[10px] text-[#64758c]">
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

                      <span className="font-[var(--font-main)] text-[11px] text-[#c5ff0a]">
                        {
                          item.decision
                        }{" "}
                        ·{" "}
                        {
                          item.score
                        }
                      </span>

                      <span className="font-[var(--font-main)] text-[10px] uppercase text-[#acb6c2]">
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
