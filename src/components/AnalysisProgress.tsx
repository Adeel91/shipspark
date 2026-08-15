"use client";

import {
  Check,
  GitBranch,
  LoaderCircle,
  MessageSquareText,
  ScanSearch,
  Sparkles,
  Store,
  Target,
} from "lucide-react";
import {
  motion,
} from "motion/react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

const stages = [
  {
    label: "Reading store positioning",
    detail: "Listing, ratings, version and release notes",
    icon: Store,
    start: 0,
  },
  {
    label: "Collecting customer reviews",
    detail: "Recent App Store and Google Play feedback",
    icon: MessageSquareText,
    start: 2200,
  },
  {
    label: "Inspecting the GitHub release",
    detail: "Release notes, repository context and recent commits",
    icon: GitBranch,
    start: 5000,
  },
  {
    label: "Matching demand to what shipped",
    detail: "Comparing review themes with release changes",
    icon: ScanSearch,
    start: 7800,
  },
  {
    label: "Checking release alignment",
    detail: "Comparing source state with live store versions",
    icon: Sparkles,
    start: 10800,
  },
  {
    label: "Scoring the opportunity",
    detail: "Building the final PROMOTE, WAIT or SKIP decision",
    icon: Target,
    start: 13800,
  },
];

export function AnalysisProgress() {
  const [
    elapsed,
    setElapsed,
  ] = useState(0);

  useEffect(() => {
    const startedAt =
      Date.now();

    const timer =
      window.setInterval(
        () => {
          setElapsed(
            Date.now() -
              startedAt,
          );
        },
        120,
      );

    return () =>
      window.clearInterval(
        timer,
      );
  }, []);

  const progress =
    useMemo(() => {
      const firstPhase =
        Math.min(
          elapsed / 17000,
          1,
        ) * 82;

      const slowPhase =
        elapsed > 17000
          ? Math.min(
              (elapsed -
                17000) /
                30000,
              1,
            ) * 10
          : 0;

      return Math.min(
        92,
        Math.round(
          firstPhase +
            slowPhase,
        ),
      );
    }, [elapsed]);

  const activeIndex =
    useMemo(() => {
      let current = 0;

      stages.forEach(
        (
          stage,
          index,
        ) => {
          if (
            elapsed >=
            stage.start
          ) {
            current =
              index;
          }
        },
      );

      return current;
    }, [elapsed]);

  return (
    <div className="mx-auto min-h-[620px] max-w-[820px] py-12">
      <div className="relative mx-auto flex size-24 items-center justify-center">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 rounded-full border border-[#68def9]/20"
        >
          <div className="absolute left-1/2 top-[-4px] size-2 -translate-x-1/2 rounded-full bg-[#68def9] shadow-[0_0_20px_rgba(104,222,249,0.9)]" />
        </motion.div>

        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-3 rounded-full border border-[#7588ff]/20"
        >
          <div className="absolute bottom-[-3px] left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-[#8293ff]" />
        </motion.div>

        <motion.div
          animate={{
            scale: [
              0.92,
              1.08,
              0.92,
            ],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex size-12 items-center justify-center rounded-2xl border border-[#68def9]/20 bg-[#68def9]/[0.07] text-[#68def9]"
        >
          <Sparkles size={19} />
        </motion.div>
      </div>

      <div className="mt-8 text-center">
        <div className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.2em] text-[#68def9]">
          Release intelligence
        </div>

        <h2 className="mt-4 text-[32px] font-normal tracking-[-0.025em] text-white">
          Connecting the evidence
        </h2>

        <p className="mx-auto mt-3 max-w-[590px] text-[14px] font-normal leading-7 text-[#99a9bd]">
          ShipSpark is combining store context, customer feedback, release changes and source activity before making the decision.
        </p>
      </div>

      <div className="mt-9">
        <div className="flex items-center justify-between">
          <span className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.16em] text-[#65758c]">
            Estimated progress
          </span>

          <span className="font-[var(--font-mono)] text-[10px] text-[#9aabc0]">
            {progress}%
          </span>
        </div>

        <div className="relative mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.055]">
          <motion.div
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#657aff] via-[#6b9cff] to-[#68def9]"
          />

          <motion.div
            animate={{
              x: [
                "-100%",
                "900%",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        </div>
      </div>

      <div className="mt-10">
        {stages.map(
          (
            stage,
            index,
          ) => {
            const Icon =
              stage.icon;

            const complete =
              index <
              activeIndex;

            const active =
              index ===
              activeIndex;

            return (
              <div
                key={
                  stage.label
                }
                className="relative grid grid-cols-[42px_1fr_auto] items-center gap-4 border-b border-white/[0.06] py-5"
              >
                <div
                  className={`relative z-10 flex size-9 items-center justify-center rounded-xl border transition ${
                    complete
                      ? "border-[#68def9]/20 bg-[#68def9]/[0.08] text-[#68def9]"
                      : active
                        ? "border-[#788cff]/25 bg-[#788cff]/[0.08] text-[#9aa8ff]"
                        : "border-white/[0.065] bg-white/[0.02] text-[#4f5d71]"
                  }`}
                >
                  {complete ? (
                    <Check size={14} />
                  ) : active ? (
                    <LoaderCircle
                      size={14}
                      className="animate-spin"
                    />
                  ) : (
                    <Icon size={14} />
                  )}
                </div>

                <div>
                  <div
                    className={`text-[14px] font-normal transition ${
                      complete
                        ? "text-[#cbd7e5]"
                        : active
                          ? "text-white"
                          : "text-[#65758b]"
                    }`}
                  >
                    {
                      stage.label
                    }
                  </div>

                  <div
                    className={`mt-1 text-[12px] font-normal transition ${
                      active
                        ? "text-[#8192a8]"
                        : "text-[#536176]"
                    }`}
                  >
                    {
                      stage.detail
                    }
                  </div>
                </div>

                <div className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.13em]">
                  {complete && (
                    <span className="text-[#68def9]">
                      passed
                    </span>
                  )}

                  {active && (
                    <span className="text-[#9aa8ff]">
                      analyzing
                    </span>
                  )}

                  {!complete &&
                    !active && (
                      <span className="text-[#465469]">
                        queued
                      </span>
                    )}
                </div>

                {active && (
                  <motion.div
                    animate={{
                      x: [
                        "-100%",
                        "900%",
                      ],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute bottom-0 left-0 h-px w-20 bg-gradient-to-r from-transparent via-[#68def9] to-transparent"
                  />
                )}
              </div>
            );
          },
        )}
      </div>

      {progress >= 90 && (
        <motion.div
          initial={{
            opacity: 0,
            y: 6,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mt-7 flex items-center justify-center gap-3 text-[12px] font-normal text-[#7f90a6]"
        >
          <LoaderCircle
            size={13}
            className="animate-spin text-[#68def9]"
          />

          Finalizing the decision with Gemini
        </motion.div>
      )}
    </div>
  );
}
