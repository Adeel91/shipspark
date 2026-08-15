"use client";

import {
  Line,
  Sparkles,
} from "@react-three/drei";
import {
  Canvas,
  useFrame,
} from "@react-three/fiber";
import {
  ArrowRight,
  CircleAlert,
  GitBranch,
  Megaphone,
  MessageSquareText,
  Radar,
  Send,
  Sparkles as SparklesIcon,
  Target,
  Users,
  Zap,
} from "lucide-react";
import {
  useMemo,
  useRef,
} from "react";
import * as THREE from "three";

type Scores = {
  changeNovelty?: number;
  userValue?: number;
  reviewDemandMatch?: number;
  positioningGap?: number;
  timing?: number;
  evidenceQuality?: number;
};

type Analysis = {
  decision?: string;
  confidence?: number;
  opportunityScore?: number;
  oneLineVerdict?: string;

  scores?: Scores;

  releaseState?: {
    status?: string;
    explanation?: string;
  };

  strategicInsight?: {
    whatChanged?: string;
    whoCares?: string;
    whyUsersCare?: string;
    whyNow?: string;
    strongestReason?: string;
    counterArgument?: string;
    recommendation?: string;
  };

  reviewIntelligence?: {
    reviewsAnalyzed?: number;
    summary?: string;
    matchedNeeds?: string[];
    unresolvedProblems?: string[];
  };

  releaseIntelligence?: {
    userFacingChanges?: string[];
    maintenanceChanges?: string[];
    matchedReviewNeeds?: string[];
    positioningGaps?: string[];
    versionRisk?: string;
  };

  campaign?: {
    enabled?: boolean;
  };
};

type WorkspaceTab =
  | "reviews"
  | "campaign"
  | "publish";

type Props = {
  analysis: Analysis;
  onNavigate: (
    tab: WorkspaceTab,
  ) => void;
};

type GraphNode = {
  label: string;
  value: number;
  position: [
    number,
    number,
    number,
  ];
};

function clamp(
  value?: number,
) {
  return Math.max(
    0,
    Math.min(
      100,
      value ?? 0,
    ),
  );
}

function themeFor(
  decision?: string,
) {
  if (
    decision === "WAIT"
  ) {
    return {
      primary:
        "#ffd84d",
      secondary:
        "#ff9f43",
      glow:
        "rgba(255,216,77,0.12)",
      subtle:
        "rgba(255,216,77,0.055)",
    };
  }

  if (
    decision === "SKIP"
  ) {
    return {
      primary:
        "#ff7474",
      secondary:
        "#ff9a68",
      glow:
        "rgba(255,116,116,0.11)",
      subtle:
        "rgba(255,116,116,0.05)",
    };
  }

  return {
    primary:
      "#c5ff0a",
    secondary:
      "#53ff72",
    glow:
      "rgba(83,255,114,0.12)",
    subtle:
      "rgba(83,255,114,0.055)",
  };
}

function Core({
  decision,
}: {
  decision?: string;
}) {
  const group =
    useRef<THREE.Group>(
      null,
    );

  const elapsed =
    useRef(0);

  const theme =
    themeFor(
      decision,
    );

  useFrame(
    (
      _state,
      delta,
    ) => {
      elapsed.current +=
        delta;

      if (
        !group.current
      ) {
        return;
      }

      group.current.rotation.y +=
        delta * 0.18;

      group.current.rotation.x =
        Math.sin(
          elapsed.current *
            0.42,
        ) * 0.12;

      group.current.rotation.z =
        Math.sin(
          elapsed.current *
            0.24,
        ) * 0.045;

      const pulse =
        1 +
        Math.sin(
          elapsed.current *
            1.8,
        ) * 0.035;

      group.current.scale.setScalar(
        pulse,
      );
    },
  );

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry
          args={[
            0.92,
            3,
          ]}
        />

        <meshPhysicalMaterial
          color="#0d170f"
          emissive={
            theme.secondary
          }
          emissiveIntensity={
            0.75
          }
          metalness={0.48}
          roughness={0.18}
          clearcoat={0.9}
        />
      </mesh>

      <mesh scale={1.2}>
        <icosahedronGeometry
          args={[
            0.92,
            2,
          ]}
        />

        <meshBasicMaterial
          color={
            theme.primary
          }
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>

      <mesh
        rotation={[
          1.15,
          0.2,
          0,
        ]}
      >
        <torusGeometry
          args={[
            1.35,
            0.012,
            8,
            160,
          ]}
        />

        <meshBasicMaterial
          color={
            theme.primary
          }
          transparent
          opacity={0.48}
        />
      </mesh>

      <mesh
        rotation={[
          0.35,
          1,
          0.4,
        ]}
      >
        <torusGeometry
          args={[
            1.62,
            0.008,
            8,
            160,
          ]}
        />

        <meshBasicMaterial
          color={
            theme.secondary
          }
          transparent
          opacity={0.24}
        />
      </mesh>

      <mesh
        rotation={[
          0.85,
          -0.6,
          0.8,
        ]}
      >
        <torusGeometry
          args={[
            1.9,
            0.005,
            8,
            160,
          ]}
        />

        <meshBasicMaterial
          color={
            theme.primary
          }
          transparent
          opacity={0.1}
        />
      </mesh>

      <pointLight
        color={
          theme.secondary
        }
        intensity={12}
        distance={5}
      />
    </group>
  );
}

function SignalNode({
  node,
  index,
  decision,
}: {
  node: GraphNode;
  index: number;
  decision?: string;
}) {
  const mesh =
    useRef<THREE.Mesh>(
      null,
    );

  const elapsed =
    useRef(
      index * 0.65,
    );

  const theme =
    themeFor(
      decision,
    );

  const strength =
    Math.max(
      0.17,
      node.value / 100,
    );

  const color =
    index % 2 === 0
      ? theme.primary
      : theme.secondary;

  useFrame(
    (
      _state,
      delta,
    ) => {
      elapsed.current +=
        delta;

      if (
        !mesh.current
      ) {
        return;
      }

      mesh.current.scale.setScalar(
        1 +
          Math.sin(
            elapsed.current *
              1.8,
          ) *
            0.16,
      );
    },
  );

  return (
    <>
      <Line
        points={[
          [
            0,
            0,
            0,
          ],
          node.position,
        ]}
        color={color}
        transparent
        opacity={
          0.08 +
          strength * 0.4
        }
        lineWidth={
          0.7 +
          strength * 1.6
        }
      />

      <mesh
        ref={mesh}
        position={
          node.position
        }
      >
        <sphereGeometry
          args={[
            0.065 +
              strength * 0.08,
            24,
            24,
          ]}
        />

        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={
            1.5 +
            strength * 2.5
          }
        />
      </mesh>

      <mesh
        position={
          node.position
        }
        scale={2.4}
      >
        <sphereGeometry
          args={[
            0.045,
            18,
            18,
          ]}
        />

        <meshBasicMaterial
          color={color}
          transparent
          opacity={
            0.06 +
            strength * 0.1
          }
        />
      </mesh>
    </>
  );
}

function EvidenceGraph({
  analysis,
}: {
  analysis: Analysis;
}) {
  const group =
    useRef<THREE.Group>(
      null,
    );

  const elapsed =
    useRef(0);

  const theme =
    themeFor(
      analysis.decision,
    );

  const nodes =
    useMemo<
      GraphNode[]
    >(
      () => [
        {
          label:
            "Novelty",
          value:
            clamp(
              analysis
                .scores
                ?.changeNovelty,
            ),
          position: [
            -2.5,
            1.55,
            0,
          ],
        },
        {
          label:
            "Value",
          value:
            clamp(
              analysis
                .scores
                ?.userValue,
            ),
          position: [
            2.5,
            1.55,
            0,
          ],
        },
        {
          label:
            "Demand",
          value:
            clamp(
              analysis
                .scores
                ?.reviewDemandMatch,
            ),
          position: [
            -2.88,
            -0.08,
            0,
          ],
        },
        {
          label:
            "Positioning",
          value:
            clamp(
              analysis
                .scores
                ?.positioningGap,
            ),
          position: [
            2.88,
            -0.08,
            0,
          ],
        },
        {
          label:
            "Timing",
          value:
            clamp(
              analysis
                .scores
                ?.timing,
            ),
          position: [
            -1.72,
            -1.72,
            0,
          ],
        },
        {
          label:
            "Evidence",
          value:
            clamp(
              analysis
                .scores
                ?.evidenceQuality,
            ),
          position: [
            1.72,
            -1.72,
            0,
          ],
        },
      ],
      [
        analysis,
      ],
    );

  useFrame(
    (
      _state,
      delta,
    ) => {
      elapsed.current +=
        delta;

      if (
        !group.current
      ) {
        return;
      }

      group.current.rotation.z =
        Math.sin(
          elapsed.current *
            0.18,
        ) * 0.018;
    },
  );

  return (
    <>
      <ambientLight
        intensity={0.7}
      />

      <directionalLight
        position={[
          4,
          5,
          6,
        ]}
        intensity={1.9}
        color="#ffffff"
      />

      <group ref={group}>
        {nodes.map(
          (
            node,
            index,
          ) => (
            <SignalNode
              key={
                node.label
              }
              node={node}
              index={index}
              decision={
                analysis.decision
              }
            />
          ),
        )}

        <Core
          decision={
            analysis.decision
          }
        />
      </group>

      <Sparkles
        count={85}
        scale={[
          8,
          5.4,
          3,
        ]}
        size={0.75}
        speed={0.15}
        opacity={0.23}
        color={
          theme.primary
        }
      />
    </>
  );
}

function scoreLevel(
  value: number,
) {
  if (value >= 75) {
    return "Strong";
  }

  if (value >= 45) {
    return "Moderate";
  }

  return "Weak";
}

function ScoreCard({
  label,
  value,
  reason,
  analysis,
}: {
  label: string;
  value: number;
  reason: string;
  analysis: Analysis;
}) {
  const theme =
    themeFor(
      analysis.decision,
    );

  const level =
    scoreLevel(
      value,
    );

  return (
    <div className="group rounded-[22px] border border-white/[0.07] bg-[#0b1118] p-5 transition hover:border-white/[0.12] hover:bg-[#0d131b]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#738090]">
            {label}
          </div>

          <div
            className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.1em]"
            style={{
              color:
                theme.primary,
            }}
          >
            {level} signal
          </div>
        </div>

        <div className="text-right">
          <div className="text-[26px] font-extrabold leading-none text-white">
            {value}
          </div>

          <div className="mt-1 text-[10px] font-bold text-[#b2bbc6]">
            /100
          </div>
        </div>
      </div>

      <div className="mt-4 h-[5px] overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width:
              `${value}%`,
            background:
              `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`,
            boxShadow:
              `0 0 16px ${theme.primary}40`,
          }}
        />
      </div>

      <div className="mt-5 border-t border-white/[0.055] pt-4">
        <div
          className="text-[11px] font-extrabold uppercase tracking-[0.11em]"
          style={{
            color:
              theme.primary,
          }}
        >
          Why {value}?
        </div>

        <p className="mt-2 line-clamp-4 text-[14px] font-semibold leading-7 text-[#bec7d1]">
          {reason}
        </p>
      </div>
    </div>
  );
}

function ActionCard({
  icon:
    Icon,
  label,
  title,
  body,
  accent,
}: {
  icon:
    typeof Target;
  label: string;
  title: string;
  body?: string;
  accent: string;
}) {
  return (
    <article className="rounded-[22px] border border-white/[0.07] bg-[#0a0f16] p-5">
      <div
        className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.13em]"
        style={{
          color:
            accent,
        }}
      >
        <Icon size={12} />
        {label}
      </div>

      <h3 className="mt-3 text-[18px] font-extrabold leading-6 text-white">
        {title}
      </h3>

      {body && (
        <p className="mt-3 text-[14px] font-semibold leading-7 text-[#b4bdc8]">
          {body}
        </p>
      )}
    </article>
  );
}

export function IntelligenceExperienceV2({
  analysis,
  onNavigate,
}: Props) {
  const theme =
    themeFor(
      analysis.decision,
    );

  const opportunity =
    clamp(
      analysis.opportunityScore,
    );

  const confidence =
    clamp(
      analysis.confidence,
    );

  const scoreCards = [
    {
      label:
        "Change novelty",
      shortLabel:
        "Novelty",
      value:
        clamp(
          analysis.scores
            ?.changeNovelty,
        ),
      reason:
        analysis
          .strategicInsight
          ?.whatChanged ??
        analysis
          .releaseIntelligence
          ?.userFacingChanges
          ?.join(" ") ??
        "ShipSpark could not verify a meaningful new product change.",
    },
    {
      label:
        "User value",
      shortLabel:
        "Value",
      value:
        clamp(
          analysis.scores
            ?.userValue,
        ),
      reason:
        analysis
          .strategicInsight
          ?.whyUsersCare ??
        "The available evidence does not establish a strong direct user benefit.",
    },
    {
      label:
        "Customer demand",
      shortLabel:
        "Demand",
      value:
        clamp(
          analysis.scores
            ?.reviewDemandMatch,
        ),
      reason:
        analysis
          .reviewIntelligence
          ?.summary ??
        analysis
          .releaseIntelligence
          ?.matchedReviewNeeds
          ?.join(" ") ??
        "No strong customer demand signal could be verified from the available reviews.",
    },
    {
      label:
        "Positioning opportunity",
      shortLabel:
        "Positioning",
      value:
        clamp(
          analysis.scores
            ?.positioningGap,
        ),
      reason:
        analysis
          .releaseIntelligence
          ?.positioningGaps
          ?.[0] ??
        "ShipSpark did not identify a major gap between the release and current product positioning.",
    },
    {
      label:
        "Timing",
      shortLabel:
        "Timing",
      value:
        clamp(
          analysis.scores
            ?.timing,
        ),
      reason:
        analysis
          .strategicInsight
          ?.whyNow ??
        "The available evidence does not provide a strong reason to promote this release right now.",
    },
    {
      label:
        "Evidence quality",
      shortLabel:
        "Evidence",
      value:
        clamp(
          analysis.scores
            ?.evidenceQuality,
        ),
      reason:
        analysis
          .releaseState
          ?.explanation ??
        "This score reflects how much verifiable store, review, release and source evidence ShipSpark could collect.",
    },
  ];

  const promotionReady =
    analysis.decision ===
      "PROMOTE" &&
    Boolean(
      analysis.campaign
        ?.enabled,
    );

  const graphLabels = [
    {
      label:
        scoreCards[0]
          .shortLabel,
      value:
        scoreCards[0].value,
      className:
        "left-[5%] top-[13%]",
    },
    {
      label:
        scoreCards[1]
          .shortLabel,
      value:
        scoreCards[1].value,
      className:
        "right-[5%] top-[13%]",
    },
    {
      label:
        scoreCards[2]
          .shortLabel,
      value:
        scoreCards[2].value,
      className:
        "left-[2%] top-[46%]",
    },
    {
      label:
        scoreCards[3]
          .shortLabel,
      value:
        scoreCards[3].value,
      className:
        "right-[2%] top-[46%]",
    },
    {
      label:
        scoreCards[4]
          .shortLabel,
      value:
        scoreCards[4].value,
      className:
        "left-[13%] bottom-[8%]",
    },
    {
      label:
        scoreCards[5]
          .shortLabel,
      value:
        scoreCards[5].value,
      className:
        "right-[13%] bottom-[8%]",
    },
  ];

  const reviewsAnalyzed =
    analysis
      .reviewIntelligence
      ?.reviewsAnalyzed ??
    0;

  return (
    <div className="space-y-5 pt-6">
      <section className="overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#090e15] shadow-[0_30px_110px_rgba(0,0,0,0.3)]">
        <div className="flex flex-col gap-4 border-b border-white/[0.06] px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#c5ff0a]">
              <Radar size={13} />
              Live release intelligence
            </div>

            <h2 className="mt-2 text-[23px] font-extrabold tracking-[-0.025em] text-white sm:text-[24px]">
              See the evidence behind the decision
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-[10px] font-bold text-[#aab4c0]">
              {reviewsAnalyzed} reviews
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-[10px] font-bold text-[#aab4c0]">
              <span
                className="size-2 rounded-full"
                style={{
                  background:
                    theme.primary,
                  boxShadow:
                    `0 0 16px ${theme.primary}`,
                }}
              />
              Live map
            </div>
          </div>
        </div>

        <div className="grid min-w-0 xl:grid-cols-[minmax(0,1.16fr)_minmax(360px,0.84fr)]">
          <div className="relative min-h-[360px] min-w-0 overflow-hidden border-b border-white/[0.06] sm:min-h-[430px] md:min-h-[480px] xl:min-h-[560px] xl:border-b-0 xl:border-r">
            <div
              className="absolute inset-0"
              style={{
                background:
                  `radial-gradient(circle at 50% 50%, ${theme.glow}, transparent 40%)`,
              }}
            />

            <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:44px_44px]" />

            <Canvas
              camera={{
                position: [
                  0,
                  0,
                  8.4,
                ],
                fov: 48,
              }}
              dpr={[
                1,
                1.5,
              ]}
              gl={{
                alpha: true,
                antialias: true,
                powerPreference:
                  "high-performance",
              }}
            >
              <EvidenceGraph
                analysis={
                  analysis
                }
              />
            </Canvas>

            <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
              <div
                className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0d310b]"
                
              >
                {
                  analysis.decision ??
                  "ANALYSIS"
                }
              </div>

              <div className="mt-1 text-[40px] font-extrabold leading-none tracking-[-0.055em] text-[#0d310b] sm:text-[48px] xl:text-[54px]">
                {opportunity}
              </div>

              <div className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#0d310b]">
                opportunity
              </div>

              <div className="mt-2 text-[10px] font-bold text-[#0d310b]">
                {confidence}% confidence
              </div>
            </div>

            {graphLabels.map(
              (
                item,
              ) => (
                <div
                  key={
                    item.label
                  }
                  className={`pointer-events-none absolute z-10 hidden min-w-[94px] rounded-xl border border-white/[0.08] bg-[#080d13]/85 px-3 py-2.5 backdrop-blur-xl xl:block ${item.className}`}
                >
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#939fad]">
                    {
                      item.label
                    }
                  </div>

                  <div
                    className="mt-1 text-[17px] font-extrabold"
                    style={{
                      color:
                        theme.primary,
                    }}
                  >
                    {
                      item.value
                    }
                  </div>
                </div>
              ),
            )}
          </div>

          <aside className="flex min-w-0 flex-col">
            <div
              className="border-b border-white/[0.06] p-6"
              style={{
                background:
                  theme.subtle,
              }}
            >
              <div className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#9eaab8]">
                Final decision
              </div>

              <div
                className="mt-3 text-[46px] font-extrabold tracking-[-0.05em]"
                style={{
                  color:
                    theme.primary,
                }}
              >
                {
                  analysis.decision ??
                  "ANALYSIS"
                }
              </div>

              <p className="mt-4 text-[15px] font-semibold leading-7 text-[#e3e7ec]">
                {
                  analysis.oneLineVerdict ??
                  "Analysis complete."
                }
              </p>
            </div>

            <div className="grid flex-1 sm:grid-cols-2 xl:grid-cols-2">
              <div className="border-b border-white/[0.055] p-5 sm:border-r">
                <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#c5ff0a]">
                  <ArrowRight
                    size={12}
                  />
                  Do next
                </div>

                <p className="mt-3 text-[14px] font-semibold leading-7 text-white">
                  {
                    analysis
                      .strategicInsight
                      ?.recommendation ??
                    "Review the evidence."
                  }
                </p>
              </div>

              <div className="border-b border-white/[0.055] p-5">
                <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#53ff72]">
                  <Target
                    size={12}
                  />
                  Strongest
                </div>

                <p className="mt-3 text-[14px] font-semibold leading-7 text-[#c8d0d9]">
                  {
                    analysis
                      .strategicInsight
                      ?.strongestReason ??
                    "No dominant signal."
                  }
                </p>
              </div>

              <div className="border-b border-white/[0.055] p-5 sm:border-b-0 sm:border-r">
                <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#ffd84d]">
                  <CircleAlert
                    size={12}
                  />
                  Risk
                </div>

                <p className="mt-3 text-[14px] font-semibold leading-7 text-[#c8d0d9]">
                  {
                    analysis
                      .strategicInsight
                      ?.counterArgument ??
                    "No major risk."
                  }
                </p>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#b4bdc8]">
                  <GitBranch
                    size={12}
                  />
                  Release
                </div>

                <div className="mt-3 text-[15px] font-extrabold capitalize text-white">
                  {
                    analysis
                      .releaseState
                      ?.status ??
                    "unclear"
                  }
                </div>

                <p className="mt-2 line-clamp-3 text-[14px] font-semibold leading-7 text-[#aab4c0]">
                  {
                    analysis
                      .releaseState
                      ?.explanation ??
                    "Release state unavailable."
                  }
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="overflow-hidden rounded-[26px] border border-white/[0.075] bg-[#090e15]">
        <div className="flex flex-col gap-3 border-b border-white/[0.06] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#c5ff0a]">
              Score reasoning
            </div>

            <h2 className="mt-2 text-[21px] font-extrabold text-white">
              Why did ShipSpark give these scores?
            </h2>
          </div>

          <p className="max-w-[430px] text-[11px] font-semibold leading-5 text-[#a3afbc]">
            Every score is tied back to the release, customer reviews, positioning, timing or evidence ShipSpark actually analyzed.
          </p>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">
          {scoreCards.map(
            (
              item,
            ) => (
              <ScoreCard
                key={
                  item.label
                }
                label={
                  item.label
                }
                value={
                  item.value
                }
                reason={
                  item.reason
                }
                analysis={
                  analysis
                }
              />
            ),
          )}
        </div>
      </section>

      <section
        className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0a1016]"
      >
        <div
          className="pointer-events-none absolute right-[-120px] top-[-180px] h-[420px] w-[420px] rounded-full blur-[120px]"
          style={{
            background:
              promotionReady
                ? "rgba(83,255,114,0.11)"
                : "rgba(255,255,255,0.025)",
          }}
        />

        <div className="relative grid lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="p-6 sm:p-7">
            <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#c5ff0a]">
              <Megaphone
                size={13}
              />

              Growth workflow
            </div>

            <h2 className="mt-3 max-w-[720px] text-[25px] font-extrabold leading-tight tracking-[-0.025em] text-white">
              {promotionReady
                ? "This release is ready to promote."
                : analysis.decision === "WAIT"
                  ? "The campaign should wait."
                  : "ShipSpark does not recommend promotion yet."}
            </h2>

            <p className="mt-3 max-w-[720px] text-[14px] font-semibold leading-7 text-[#b4bdc8]">
              {promotionReady
                ? "ShipSpark has already converted the strongest evidence into a campaign angle, audience, hook, CTA and ready to publish copy."
                : "Open the promotion view to understand what is blocking campaign readiness and what needs to change before spending attention on this release."}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  onNavigate(
                    "campaign",
                  )
                }
                className="group inline-flex min-h-[52px] items-center gap-3 rounded-xl bg-[linear-gradient(105deg,#c5ff0a,#53ff72)] px-6 text-[12px] font-extrabold text-[#071006] shadow-[0_14px_40px_rgba(83,255,114,0.13)] transition hover:brightness-110"
              >
                <Megaphone
                  size={16}
                />

                {promotionReady
                  ? "Promote this release"
                  : "Open promotion decision"}

                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <button
                type="button"
                disabled={
                  !promotionReady
                }
                onClick={() =>
                  promotionReady &&
                  onNavigate(
                    "publish",
                  )
                }
                className="group inline-flex min-h-[52px] items-center gap-3 rounded-xl border border-white/[0.1] bg-white/[0.035] px-6 text-[12px] font-extrabold text-white transition hover:bg-white/[0.065] disabled:cursor-not-allowed disabled:opacity-35"
              >
                <Send
                  size={15}
                />

                Publish campaign

                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>

          <div className="border-t border-white/[0.06] p-6 lg:w-[300px] lg:border-l lg:border-t-0">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#939fad]">
              Promotion state
            </div>

            <div className="mt-3 flex items-center gap-3">
              <span
                className="size-2.5 rounded-full"
                style={{
                  background:
                    promotionReady
                      ? "#53ff72"
                      : theme.primary,
                  boxShadow:
                    promotionReady
                      ? "0 0 16px #53ff72"
                      : `0 0 16px ${theme.primary}`,
                }}
              />

              <span
                className="text-[17px] font-extrabold"
                style={{
                  color:
                    promotionReady
                      ? "#53ff72"
                      : theme.primary,
                }}
              >
                {promotionReady
                  ? "Campaign ready"
                  : analysis.decision === "WAIT"
                    ? "Not ready yet"
                    : "Promotion blocked"}
              </span>
            </div>

            <p className="mt-3 text-[11px] font-semibold leading-5 text-[#a3afbc]">
              {promotionReady
                ? "The next step is to review the generated promotion and publish it."
                : "ShipSpark is intentionally preventing weak marketing from being pushed out."}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <ActionCard
          icon={Zap}
          label="What shipped"
          title={
            analysis
              .strategicInsight
              ?.whatChanged ??
            "No clear user facing change detected."
          }
          body={
            analysis
              .strategicInsight
              ?.whyUsersCare
          }
          accent="#c5ff0a"
        />

        <ActionCard
          icon={Users}
          label="Who cares"
          title={
            analysis
              .strategicInsight
              ?.whoCares ??
            "No clear audience identified."
          }
          body={
            analysis
              .strategicInsight
              ?.whyNow
          }
          accent="#53ff72"
        />

        <ActionCard
          icon={SparklesIcon}
          label="Customer signal"
          title={
            analysis
              .reviewIntelligence
              ?.summary ??
            "Customer signal unavailable."
          }
          body={
            reviewsAnalyzed > 0
              ? `${reviewsAnalyzed} recent reviews were included in this decision.`
              : "Connect a store source to strengthen customer evidence."
          }
          accent="#c5ff0a"
        />
      </section>

      <section className="overflow-hidden rounded-[26px] border border-white/[0.075] bg-[#0a0f16]">
        <div className="border-b border-white/[0.06] px-6 py-5">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#c5ff0a]">
            What can you do now?
          </div>

          <h2 className="mt-2 text-[21px] font-extrabold text-white">
            Move from intelligence to action
          </h2>
        </div>

        <div className="grid md:grid-cols-3">
          <button
            type="button"
            onClick={() =>
              onNavigate(
                "reviews",
              )
            }
            className="group border-b border-white/[0.055] p-6 text-left transition hover:bg-white/[0.025] lg:border-b-0 lg:border-r"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#c5ff0a]/[0.07] text-[#c5ff0a]">
              <MessageSquareText
                size={17}
              />
            </div>

            <div className="mt-5 text-[17px] font-extrabold text-white">
              Understand customers
            </div>

            <p className="mt-2 text-[14px] font-semibold leading-7 text-[#aab4c0]">
              See repeated complaints, praise, feature requests and needs that match this release.
            </p>

            <div className="mt-5 flex items-center gap-2 text-[10px] font-extrabold text-[#c5ff0a]">
              Open reviews
              <ArrowRight
                size={13}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </button>

          <button
            type="button"
            onClick={() =>
              onNavigate(
                "campaign",
              )
            }
            className="group border-b border-white/[0.055] p-6 text-left transition hover:bg-white/[0.025] lg:border-b-0 lg:border-r"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#53ff72]/[0.07] text-[#53ff72]">
              <Megaphone
                size={17}
              />
            </div>

            <div className="mt-5 text-[17px] font-extrabold text-white">
              Check campaign readiness
            </div>

            <p className="mt-2 text-[14px] font-semibold leading-7 text-[#aab4c0]">
              See whether the evidence justifies marketing and inspect the generated growth angle when it does.
            </p>

            <div className="mt-5 flex items-center gap-2 text-[10px] font-extrabold text-[#53ff72]">
              Open campaign
              <ArrowRight
                size={13}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </button>

          <button
            type="button"
            onClick={() =>
              onNavigate(
                "publish",
              )
            }
            className="group p-6 text-left transition hover:bg-white/[0.025]"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-white/[0.05] text-white">
              <Send
                size={17}
              />
            </div>

            <div className="mt-5 text-[17px] font-extrabold text-white">
              Take action
            </div>

            <p className="mt-2 text-[14px] font-semibold leading-7 text-[#aab4c0]">
              When the campaign is ready, review the final message and publish it directly to Discord.
            </p>

            <div className="mt-5 flex items-center gap-2 text-[10px] font-extrabold text-white">
              Open publish
              <ArrowRight
                size={13}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </button>
        </div>
      </section>
    </div>
  );
}

export default IntelligenceExperienceV2;
