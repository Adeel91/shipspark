"use client";

import {
  Canvas,
  useFrame,
} from "@react-three/fiber";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  CircleAlert,
  Copy,
  Megaphone,
  MessageSquareText,
  PencilLine,
  RadioTower,
  Send,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";
import {
  useRef,
  useState,
} from "react";
import * as THREE from "three";

type Analysis = {
  decision:
    | "PROMOTE"
    | "WAIT"
    | "SKIP";

  confidence: number;
  opportunityScore: number;

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
    matchedNeeds: string[];
    unresolvedProblems: string[];
  };

  releaseIntelligence: {
    matchedReviewNeeds: string[];
    positioningGaps: string[];
    userFacingChanges: string[];
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
};

type Props = {
  analysis: Analysis;
  appName?: string;

  socialDraft: string;
  discordDraft: string;

  onSocialDraftChange: (
    value: string,
  ) => void;

  onDiscordDraftChange: (
    value: string,
  ) => void;

  onContinue: () => void;
};

function clamp(
  value: number,
) {
  return Math.max(
    0,
    Math.min(
      100,
      value,
    ),
  );
}

function SignalOrb({
  value,
  position,
}: {
  value: number;
  position: [
    number,
    number,
    number,
  ];
}) {
  const ref =
    useRef<THREE.Mesh>(
      null,
    );

  useFrame((state) => {
    if (!ref.current) {
      return;
    }

    const t =
      state.clock
        .elapsedTime;

    ref.current.position.y =
      position[1] +
      Math.sin(
        t * 1.05 +
          position[0],
      ) *
        0.06;

    const scale =
      0.8 +
      clamp(value) /
        280;

    const pulse =
      1 +
      Math.sin(
        t * 1.7 +
          position[1],
      ) *
        0.035;

    ref.current.scale.setScalar(
      scale * pulse,
    );
  });

  return (
    <mesh
      ref={ref}
      position={position}
    >
      <sphereGeometry
        args={[
          0.16,
          32,
          32,
        ]}
      />

      <meshPhysicalMaterial
        color="#17200e"
        emissive="#c5ff0a"
        emissiveIntensity={
          0.5 +
          clamp(value) /
            130
        }
        roughness={0.22}
        metalness={0.4}
        clearcoat={1}
      />
    </mesh>
  );
}

function CampaignSignalScene({
  demand,
  value,
  timing,
}: {
  demand: number;
  value: number;
  timing: number;
}) {
  const group =
    useRef<THREE.Group>(
      null,
    );

  useFrame(
    (
      state,
      delta,
    ) => {
      if (!group.current) {
        return;
      }

      group.current.rotation.y +=
        delta * 0.08;

      group.current.rotation.x =
        Math.sin(
          state.clock
            .elapsedTime *
            0.3,
        ) * 0.055;
    },
  );

  return (
    <group
      ref={group}
      scale={0.82}
    >
      <mesh>
        <icosahedronGeometry
          args={[
            0.66,
            3,
          ]}
        />

        <meshPhysicalMaterial
          color="#111b0d"
          emissive="#53ff72"
          emissiveIntensity={
            0.62
          }
          roughness={0.2}
          metalness={0.48}
          clearcoat={1}
        />
      </mesh>

      <mesh scale={1.18}>
        <icosahedronGeometry
          args={[
            0.66,
            2,
          ]}
        />

        <meshBasicMaterial
          color="#c5ff0a"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      <mesh
        rotation={[
          Math.PI / 2.8,
          0,
          0.4,
        ]}
      >
        <torusGeometry
          args={[
            1.16,
            0.007,
            12,
            96,
          ]}
        />

        <meshBasicMaterial
          color="#c5ff0a"
          transparent
          opacity={0.22}
        />
      </mesh>

      <mesh
        rotation={[
          -0.45,
          0.7,
          0.1,
        ]}
      >
        <torusGeometry
          args={[
            1.48,
            0.006,
            12,
            96,
          ]}
        />

        <meshBasicMaterial
          color="#53ff72"
          transparent
          opacity={0.14}
        />
      </mesh>

      <SignalOrb
        value={demand}
        position={[
          -1.12,
          0.55,
          0.2,
        ]}
      />

      <SignalOrb
        value={value}
        position={[
          1.18,
          0.3,
          0.15,
        ]}
      />

      <SignalOrb
        value={timing}
        position={[
          0.18,
          -1.1,
          0.35,
        ]}
      />

      <pointLight
        position={[
          2,
          2,
          4,
        ]}
        intensity={8}
        color="#c5ff0a"
      />

      <pointLight
        position={[
          -3,
          -1,
          2,
        ]}
        intensity={5}
        color="#53ff72"
      />
    </group>
  );
}

function CopyAction({
  value,
}: {
  value: string;
}) {
  const [
    copied,
    setCopied,
  ] =
    useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(
      value,
    );

    setCopied(true);

    window.setTimeout(
      () =>
        setCopied(false),
      1400,
    );
  }

  return (
    <button
      type="button"
      onClick={
        handleCopy
      }
      className="inline-flex h-9 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.035] px-3 text-[10px] font-extrabold text-[#9ba7b5] transition hover:border-[#c5ff0a]/25 hover:bg-white/[0.055] hover:text-white"
    >
      {copied ? (
        <>
          <Check
            size={11}
            className="text-[#c5ff0a]"
          />
          Copied
        </>
      ) : (
        <>
          <Copy
            size={11}
          />
          Copy
        </>
      )}
    </button>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#7e8a98]">
          {label}
        </span>

        <span className="text-[12px] font-extrabold text-white">
          {clamp(
            value,
          )}
        </span>
      </div>

      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.055]">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#c5ff0a,#53ff72)]"
          style={{
            width: `${clamp(
              value,
            )}%`,
          }}
        />
      </div>
    </div>
  );
}

function SocialPreview({
  appName,
  value,
}: {
  appName: string;
  value: string;
}) {
  return (
    <div className="rounded-[24px] bg-[#11161d] p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#c5ff0a,#53ff72)] text-[#071006]">
          <Sparkles
            size={16}
            strokeWidth={2.5}
          />
        </div>

        <div>
          <div className="text-[13px] font-extrabold text-white">
            {appName}
          </div>

          <div className="mt-0.5 text-[11px] font-semibold text-[#6f7b89]">
            Product update
          </div>
        </div>
      </div>

      <p className="mt-5 whitespace-pre-wrap text-[15px] font-semibold leading-7 text-[#e3e8ee]">
        {value}
      </p>

      <div className="mt-6 flex items-center gap-6 border-t border-white/[0.06] pt-4 text-[10px] font-bold text-[#687482]">
        <span>Reply</span>
        <span>Share</span>
        <span>Save</span>
      </div>
    </div>
  );
}

function DiscordPreview({
  appName,
  value,
}: {
  appName: string;
  value: string;
}) {
  return (
    <div className="rounded-[24px] bg-[#313338] p-5 sm:p-6">
      <div className="flex items-start gap-3.5">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#5865f2] text-white">
          <RadioTower
            size={16}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[14px] font-extrabold text-white">
              {appName}
            </span>

            <span className="rounded bg-[#5865f2] px-1.5 py-0.5 text-[8px] font-extrabold uppercase tracking-[0.05em] text-white">
              App
            </span>

            <span className="text-[10px] font-semibold text-[#949ba4]">
              Today at 1:00 AM
            </span>
          </div>

          <p className="mt-2 whitespace-pre-wrap text-[14px] font-medium leading-6 text-[#dbdee1]">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function AssetStatus() {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-[#53ff72]/15 bg-[#53ff72]/[0.06] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.08em] text-[#8aff99]">
      <CheckCircle2
        size={10}
      />
      Ready
    </div>
  );
}

export function PromoteExperience({
  analysis,
  appName,
  socialDraft,
  discordDraft,
  onSocialDraftChange,
  onDiscordDraftChange,
  onContinue,
}: Props) {
  const campaign =
    analysis.campaign;

  const displayName =
    appName ??
    "Current release";

  if (!campaign.enabled) {
    const wait =
      analysis.decision ===
      "WAIT";

    return (
      <section className="relative overflow-hidden rounded-[28px] border border-white/[0.075] bg-[#080d14]">
        <div
          className={[
            "absolute inset-x-0 top-0 h-px",
            wait
              ? "bg-[linear-gradient(90deg,transparent,#ffd84d,transparent)]"
              : "bg-[linear-gradient(90deg,transparent,#ff7474,transparent)]",
          ].join(
            " ",
          )}
        />

        <div className="grid gap-10 p-7 lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
          <div>
            <div
              className={[
                "flex size-11 items-center justify-center rounded-2xl border",
                wait
                  ? "border-[#ffd84d]/20 bg-[#ffd84d]/[0.06] text-[#ffd84d]"
                  : "border-[#ff7474]/20 bg-[#ff7474]/[0.06] text-[#ff8d8d]",
              ].join(
                " ",
              )}
            >
              <CircleAlert
                size={18}
              />
            </div>

            <div className="mt-7 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#8995a3]">
              Promotion gate
            </div>

            <h2 className="mt-3 max-w-[760px] text-[clamp(34px,4vw,54px)] font-extrabold leading-[1] tracking-[-0.045em] text-white">
              This release should{" "}
              <span
                className={
                  wait
                    ? "text-[#ffd84d]"
                    : "text-[#ff8d8d]"
                }
              >
                {wait
                  ? "wait."
                  : "stay quiet."}
              </span>
            </h2>

            <p className="mt-5 max-w-[700px] text-[15px] font-semibold leading-7 text-[#aab5c2]">
              ShipSpark is deliberately not creating campaign assets because the evidence does not justify spending attention on this release yet.
            </p>
          </div>

          <div className="border-l border-white/[0.06] pl-7">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#7f8b98]">
              Current opportunity
            </div>

            <div className="mt-2 text-[42px] font-extrabold tracking-[-0.055em] text-white">
              {
                analysis.opportunityScore
              }
            </div>

            <div className="mt-7 space-y-5">
              <Metric
                label="Customer demand"
                value={
                  analysis
                    .scores
                    .reviewDemandMatch
                }
              />

              <Metric
                label="User value"
                value={
                  analysis
                    .scores
                    .userValue
                }
              />

              <Metric
                label="Timing"
                value={
                  analysis
                    .scores
                    .timing
                }
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const matchedNeed =
    analysis
      .reviewIntelligence
      .matchedNeeds?.[0] ??
    analysis
      .releaseIntelligence
      .matchedReviewNeeds?.[0] ??
    "The release answers a meaningful user need.";

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[28px] border border-[#c5ff0a]/[0.14] bg-[#080d13]">
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#c5ff0a,transparent)] opacity-70" />

        <div className="grid xl:grid-cols-[1.18fr_0.82fr]">
          <div className="p-7 sm:p-8 xl:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#c5ff0a]/20 bg-[#c5ff0a]/[0.065] px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.11em] text-[#dfff72]">
                <Sparkles
                  size={11}
                />
                Campaign ready
              </div>

              <div className="rounded-full border border-white/[0.07] px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#8996a4]">
                {
                  analysis.confidence
                }
                % confidence
              </div>
            </div>

            <div className="mt-8 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#c5ff0a]">
              Winning angle
            </div>

            <h2 className="mt-3 max-w-[980px] text-[clamp(36px,4.2vw,60px)] font-extrabold leading-[1.01] tracking-[-0.052em] text-white">
              {
                campaign.angle
              }
            </h2>

            <p className="mt-5 max-w-[820px] text-[15px] font-semibold leading-7 text-[#aab6c3]">
              {
                campaign.hook
              }
            </p>

            <div className="mt-9 grid gap-x-8 gap-y-5 border-t border-white/[0.06] pt-6 md:grid-cols-3">
              <div>
                <div className="flex items-center gap-2 text-[#c5ff0a]">
                  <Users
                    size={13}
                  />

                  <span className="text-[9px] font-extrabold uppercase tracking-[0.1em]">
                    Audience
                  </span>
                </div>

                <p className="mt-2.5 text-[13px] font-semibold leading-6 text-[#d8dee6]">
                  {
                    campaign.audience
                  }
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-[#53ff72]">
                  <Target
                    size={13}
                  />

                  <span className="text-[9px] font-extrabold uppercase tracking-[0.1em]">
                    CTA
                  </span>
                </div>

                <p className="mt-2.5 text-[13px] font-semibold leading-6 text-[#d8dee6]">
                  {
                    campaign.cta
                  }
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-[#ffd84d]">
                  <Zap
                    size={13}
                  />

                  <span className="text-[9px] font-extrabold uppercase tracking-[0.1em]">
                    Why now
                  </span>
                </div>

                <p className="mt-2.5 line-clamp-3 text-[13px] font-semibold leading-6 text-[#d8dee6]">
                  {
                    analysis
                      .strategicInsight
                      .whyNow
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden border-t border-white/[0.06] bg-[#070b10] xl:border-l xl:border-t-0">
            <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-6">
              <div>
                <div className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#7f8b99]">
                  Promotion signal
                </div>

                <div className="mt-1.5 text-[12px] font-bold text-white">
                  Evidence aligned
                </div>
              </div>

              <div className="text-right">
                <div className="text-[34px] font-extrabold leading-none tracking-[-0.05em] text-[#c5ff0a]">
                  {
                    analysis.opportunityScore
                  }
                </div>

                <div className="mt-1 text-[8px] font-extrabold uppercase tracking-[0.1em] text-[#6e7b89]">
                  Opportunity
                </div>
              </div>
            </div>

            <Canvas
              camera={{
                position: [
                  0,
                  0,
                  5.5,
                ],
                fov: 44,
              }}
              dpr={[
                1,
                1.5,
              ]}
            >
              <ambientLight
                intensity={0.32}
              />

              <CampaignSignalScene
                demand={
                  analysis
                    .scores
                    .reviewDemandMatch
                }
                value={
                  analysis
                    .scores
                    .userValue
                }
                timing={
                  analysis
                    .scores
                    .timing
                }
              />
            </Canvas>

            <div className="pointer-events-none absolute inset-x-6 bottom-5 grid grid-cols-3 gap-6 border-t border-white/[0.06] pt-4">
              <Metric
                label="Demand"
                value={
                  analysis
                    .scores
                    .reviewDemandMatch
                }
              />

              <Metric
                label="Value"
                value={
                  analysis
                    .scores
                    .userValue
                }
              />

              <Metric
                label="Timing"
                value={
                  analysis
                    .scores
                    .timing
                }
              />
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[26px] border border-white/[0.07] bg-[#090e15]">
        <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-[420px]">
            <div className="flex items-center gap-2 text-[#c5ff0a]">
              <Megaphone
                size={14}
              />

              <span className="text-[9px] font-extrabold uppercase tracking-[0.13em]">
                Message strategy
              </span>
            </div>

            <p className="mt-3 text-[21px] font-extrabold leading-[1.18] tracking-[-0.03em] text-white">
              {
                campaign.headline
              }
            </p>
          </div>

          <div className="grid flex-1 gap-5 lg:max-w-[920px] lg:grid-cols-3">
            <div>
              <div className="text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#74808e]">
                Customer proof
              </div>

              <p className="mt-2 text-[12px] font-semibold leading-5 text-[#c5cdd7]">
                {
                  matchedNeed
                }
              </p>
            </div>

            <div>
              <div className="text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#74808e]">
                Strongest reason
              </div>

              <p className="mt-2 text-[12px] font-semibold leading-5 text-[#c5cdd7]">
                {
                  analysis
                    .strategicInsight
                    .strongestReason
                }
              </p>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-[#ffd84d]">
                <CircleAlert
                  size={10}
                />

                <span className="text-[9px] font-extrabold uppercase tracking-[0.1em]">
                  Keep in mind
                </span>
              </div>

              <p className="mt-2 text-[12px] font-semibold leading-5 text-[#aab4c0]">
                {
                  analysis
                    .strategicInsight
                    .counterArgument
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#53ff72]">
              Final campaign assets
            </div>

            <h3 className="mt-2 text-[clamp(28px,3vw,40px)] font-extrabold tracking-[-0.045em] text-white">
              Review and approve what gets published.
            </h3>

            <p className="mt-2 max-w-[760px] text-[13px] font-semibold leading-6 text-[#83909e]">
              These are the final channel drafts. Edit them here, then continue to Publish to execute distribution.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.09em] text-[#82909d]">
            <PencilLine
              size={11}
            />
            Edit here
            <ArrowRight
              size={10}
            />
            Publish there
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <article className="relative overflow-hidden rounded-[28px] border border-[#c5ff0a]/[0.16] bg-[#090e15] shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#c5ff0a,transparent)]" />

            <header className="flex flex-col gap-4 border-b border-white/[0.06] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3.5">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-[#c5ff0a] text-[#071006] shadow-[0_0_24px_rgba(197,255,10,0.08)]">
                  <MessageSquareText
                    size={17}
                    strokeWidth={2.4}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-[16px] font-extrabold text-white">
                      Social post
                    </h4>

                    <AssetStatus />
                  </div>

                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#687684]">
                    Public campaign asset
                  </p>
                </div>
              </div>

              <CopyAction
                value={
                  socialDraft
                }
              />
            </header>

            <div className="p-6">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#7e8b98]">
                    Live preview
                  </div>

                  <div className="text-[9px] font-bold text-[#62707e]">
                    {
                      socialDraft.length
                    }{" "}
                    characters
                  </div>
                </div>

                <SocialPreview
                  appName={
                    displayName
                  }
                  value={
                    socialDraft
                  }
                />
              </div>

              <div className="mt-6 border-t border-white/[0.06] pt-5">
                <div className="mb-3 flex items-center gap-2 text-[#8d99a6]">
                  <PencilLine
                    size={11}
                  />

                  <span className="text-[9px] font-extrabold uppercase tracking-[0.1em]">
                    Edit final copy
                  </span>
                </div>

                <textarea
                  value={
                    socialDraft
                  }
                  onChange={(
                    event,
                  ) =>
                    onSocialDraftChange(
                      event.target
                        .value,
                    )
                  }
                  rows={6}
                  className="w-full resize-none rounded-[18px] border border-white/[0.075] bg-[#070b10] p-4 text-[13px] font-semibold leading-6 text-[#d8dfe7] outline-none transition focus:border-[#c5ff0a]/35 focus:bg-[#090e13]"
                />
              </div>
            </div>

            <footer className="flex items-center justify-between gap-4 border-t border-white/[0.06] bg-[#070b10]/70 px-6 py-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#7e8b98]">
                <CheckCircle2
                  size={12}
                  className="text-[#53ff72]"
                />
                Finalized in Promote
              </div>

              <div className="flex items-center gap-2 text-[10px] font-extrabold text-[#b9c4cf]">
                Continue to Publish
                <ArrowRight
                  size={11}
                  className="text-[#c5ff0a]"
                />
              </div>
            </footer>
          </article>

          <article className="relative overflow-hidden rounded-[28px] border border-[#5865f2]/25 bg-[#090e15] shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#7180ff,transparent)]" />

            <header className="flex flex-col gap-4 border-b border-white/[0.06] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3.5">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-[#5865f2] text-white shadow-[0_0_24px_rgba(88,101,242,0.12)]">
                  <RadioTower
                    size={17}
                    strokeWidth={2.4}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-[16px] font-extrabold text-white">
                      Discord announcement
                    </h4>

                    <AssetStatus />
                  </div>

                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#687684]">
                    Community campaign asset
                  </p>
                </div>
              </div>

              <CopyAction
                value={
                  discordDraft
                }
              />
            </header>

            <div className="p-6">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#7e8b98]">
                    Discord preview
                  </div>

                  <div className="text-[9px] font-bold text-[#62707e]">
                    {
                      discordDraft.length
                    }{" "}
                    characters
                  </div>
                </div>

                <DiscordPreview
                  appName={
                    displayName
                  }
                  value={
                    discordDraft
                  }
                />
              </div>

              <div className="mt-6 border-t border-white/[0.06] pt-5">
                <div className="mb-3 flex items-center gap-2 text-[#8d99a6]">
                  <PencilLine
                    size={11}
                  />

                  <span className="text-[9px] font-extrabold uppercase tracking-[0.1em]">
                    Edit final copy
                  </span>
                </div>

                <textarea
                  value={
                    discordDraft
                  }
                  onChange={(
                    event,
                  ) =>
                    onDiscordDraftChange(
                      event.target
                        .value,
                    )
                  }
                  rows={6}
                  className="w-full resize-none rounded-[18px] border border-[#5865f2]/20 bg-[#070b10] p-4 text-[13px] font-semibold leading-6 text-[#d8dfe7] outline-none transition focus:border-[#7180ff]/45 focus:bg-[#090e13]"
                />
              </div>
            </div>

            <footer className="flex items-center justify-between gap-4 border-t border-white/[0.06] bg-[#070b10]/70 px-6 py-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#7e8b98]">
                <CheckCircle2
                  size={12}
                  className="text-[#53ff72]"
                />
                Ready for webhook delivery
              </div>

              <div className="flex items-center gap-2 text-[10px] font-extrabold text-[#b9c4cf]">
                Send from Publish
                <Send
                  size={11}
                  className="text-[#8991ff]"
                />
              </div>
            </footer>
          </article>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[26px] border border-[#53ff72]/[0.14] bg-[linear-gradient(105deg,#0b140e,#08100b)]">
        <div className="absolute inset-y-0 right-0 w-[38%] bg-[radial-gradient(circle_at_right,rgba(83,255,114,0.08),transparent_68%)]" />

        <div className="relative flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#53ff72]/10 text-[#53ff72]">
              <Send
                size={16}
              />
            </div>

            <div>
              <div className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#75c781]">
                Campaign assets ready
              </div>

              <p className="mt-2 max-w-[880px] text-[14px] font-bold leading-7 text-white">
                Social and Discord copy are ready. Continue to Publish to review destinations and execute distribution.
              </p>

              <p className="mt-1 text-[11px] font-semibold text-[#769080]">
                Discord can be sent directly. Social copy remains ready for final distribution or copy.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={
              onContinue
            }
            className="group inline-flex min-h-[50px] shrink-0 items-center justify-center gap-3 rounded-2xl bg-[linear-gradient(110deg,#c5ff0a,#53ff72)] px-7 text-[12px] font-extrabold text-[#071006] shadow-[0_12px_36px_rgba(83,255,114,0.1)] transition hover:brightness-110"
          >
            Continue to Publish

            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </section>
    </div>
  );
}

export default PromoteExperience;
