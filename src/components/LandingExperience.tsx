"use client";

import {
  Activity,
  ArrowDown,
  ArrowRight,
  Check,
  MessageCircle,
  RadioTower,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import {
  motion,
} from "motion/react";
import {
  AnimatedHeroBackdrop,
} from "./AnimatedHeroBackdrop";
import {
  PhoneStory,
} from "./PhoneStory";

const decisionSignals = [
  "Meaningful product change",
  "Clear user benefit",
  "Strong audience relevance",
  "A reason to act now",
];

export function LandingExperience() {
  return (
    <>
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-[72px]">
        <AnimatedHeroBackdrop />

        <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 py-20 text-center sm:px-8">
          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="mx-auto flex w-fit items-center gap-2.5 rounded-full border border-[#63ddf9]/15 bg-[#63ddf9]/[0.045] px-3.5 py-2 font-[var(--font-mono)] text-[8px] uppercase tracking-[0.2em] text-[#8ce8fb]"
          >
            <span className="size-1.5 rounded-full bg-[#63ddf9] shadow-[0_0_16px_rgba(99,221,249,0.85)]" />
            Release intelligence is live
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.08,
            }}
            className="mx-auto mt-8 max-w-[1080px] text-[clamp(3.7rem,7.2vw,7.25rem)] font-normal leading-[0.98] tracking-[-0.045em] text-white"
          >
            Every release has
            <span className="block bg-gradient-to-r from-[#93a7ff] via-[#8be8ff] to-[#d9f7ff] bg-clip-text text-transparent">
              a moment worth finding.
            </span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.16,
            }}
            className="mx-auto mt-7 max-w-[720px] text-[17px] font-normal leading-8 text-[#8997aa]"
          >
            ShipSpark reads the live App Store context and latest GitHub release, identifies the user facing value, then decides whether the update is worth promoting.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.24,
            }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/workspace"
              className="group inline-flex h-12 items-center gap-4 rounded-xl bg-white px-6 text-[13px] font-medium text-[#07101b] transition hover:bg-[#dff8ff]"
            >
              Analyze a release

              <ArrowRight
                size={15}
                className="transition group-hover:translate-x-1"
              />
            </Link>

            <a
              href="#release"
              className="inline-flex h-12 items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] px-6 text-[13px] font-normal text-[#a9b5c6] transition hover:bg-white/[0.05] hover:text-white"
            >
              See the release flow

              <ArrowDown size={14} />
            </a>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 1,
              delay: 0.45,
            }}
            className="mx-auto mt-16 grid max-w-[780px] grid-cols-4 gap-2"
          >
            {[
              [
                "01",
                "Read",
              ],
              [
                "02",
                "Understand",
              ],
              [
                "03",
                "Decide",
              ],
              [
                "04",
                "Act",
              ],
            ].map(
              (
                item,
                index,
              ) => (
                <div
                  key={item[0]}
                  className="relative"
                >
                  <div className="font-[var(--font-mono)] text-[8px] text-[#47556a]">
                    {item[0]}
                  </div>

                  <div className="mt-2 text-[12px] font-normal text-[#7d8b9f]">
                    {item[1]}
                  </div>

                  {index < 3 && (
                    <div className="absolute right-[-8px] top-1/2 hidden h-px w-4 bg-white/[0.08] sm:block" />
                  )}
                </div>
              ),
            )}
          </motion.div>
        </div>

        <motion.a
          href="#release"
          animate={{
            y: [
              0,
              7,
              0,
            ],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 font-[var(--font-mono)] text-[7px] uppercase tracking-[0.2em] text-[#445166]"
        >
          Follow the release
          <ArrowDown size={12} />
        </motion.a>
      </section>

      <PhoneStory />

      <section
        id="decision"
        className="relative overflow-hidden border-t border-white/[0.05] bg-[#070a10] px-5 py-28 sm:px-8 lg:px-10"
      >
        <div className="absolute right-[-180px] top-[-100px] size-[500px] rounded-full bg-[#536eff]/[0.07] blur-[150px]" />

        <div className="relative mx-auto max-w-[1280px]">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div className="font-[var(--font-mono)] text-[9px] uppercase tracking-[0.19em] text-[#7b8bff]">
                Decision engine
              </div>

              <h2 className="mt-5 max-w-[520px] text-[46px] font-normal leading-[1.04] tracking-[-0.03em] text-white sm:text-[58px]">
                Promotion starts
                <span className="block text-[#77869b]">
                  with evidence.
                </span>
              </h2>

              <p className="mt-6 max-w-[430px] text-[16px] font-normal leading-7 text-[#788598]">
                ShipSpark evaluates the release before generating campaign copy. If the change is not strong enough, the correct answer is SKIP.
              </p>
            </div>

            <div className="relative min-h-[540px]">
              <div className="absolute left-[40%] top-1/2 size-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#536eff]/[0.08] blur-[100px]" />

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 24,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute left-[40%] top-1/2 size-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#6b82ff]/20"
              >
                <div className="absolute left-1/2 top-[-4px] size-2 -translate-x-1/2 rounded-full bg-[#65dcfa] shadow-[0_0_20px_rgba(101,220,250,0.9)]" />
              </motion.div>

              <div className="absolute left-[40%] top-1/2 flex size-[280px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/[0.08] bg-[#0b1019]/75 backdrop-blur-xl">
                <span className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.18em] text-[#667287]">
                  Decision
                </span>

                <span className="mt-4 text-[42px] font-normal tracking-[-0.025em] text-white">
                  PROMOTE
                </span>

                <span className="mt-2 font-[var(--font-mono)] text-[9px] text-[#65dcfa]">
                  confidence 94
                </span>
              </div>

              <div className="absolute right-0 top-1/2 w-[42%] -translate-y-1/2">
                {decisionSignals.map(
                  (
                    signal,
                    index,
                  ) => (
                    <motion.div
                      key={signal}
                      initial={{
                        opacity: 0,
                        x: 20,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        delay:
                          index *
                          0.12,
                      }}
                      className="flex items-center justify-between border-b border-white/[0.065] py-5"
                    >
                      <span className="text-[15px] font-normal text-[#a7b2c1]">
                        {signal}
                      </span>

                      <div className="flex size-7 items-center justify-center rounded-full bg-[#65dcfa]/10 text-[#65dcfa]">
                        <Check size={12} />
                      </div>
                    </motion.div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="action"
        className="relative overflow-hidden border-t border-white/[0.05] bg-[#090d15] px-5 py-28 sm:px-8 lg:px-10"
      >
        <div className="relative mx-auto max-w-[1280px]">
          <div className="mx-auto max-w-[780px] text-center">
            <div className="font-[var(--font-mono)] text-[9px] uppercase tracking-[0.19em] text-[#65dcfa]">
              Campaign execution
            </div>

            <h2 className="mt-5 text-[46px] font-normal leading-[1.04] tracking-[-0.03em] text-white sm:text-[58px]">
              When the answer is PROMOTE,
              <span className="text-[#758397]">
                {" "}
                the campaign takes shape.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-[620px] text-[16px] font-normal leading-7 text-[#788598]">
              ShipSpark turns the selected benefit into editable campaign messaging and can publish the Discord version directly.
            </p>
          </div>

          <div className="relative mt-16 min-h-[500px]">
            <div className="absolute left-1/2 top-[46%] h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#65dcfa]/20 to-transparent" />

            <motion.div
              animate={{
                y: [
                  0,
                  -8,
                  0,
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute left-1/2 top-[44%] z-20 w-full max-w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-white/[0.08] bg-[#0d131e] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.45)]"
            >
              <div className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.18em] text-[#667287]">
                Winning angle
              </div>

              <div className="mt-5 text-[32px] font-normal leading-[1.06] tracking-[-0.025em] text-white">
                Work anywhere.
                <span className="block text-[#65dcfa]">
                  Even without signal.
                </span>
              </div>

              <div className="mt-7 flex items-center gap-2 font-[var(--font-mono)] text-[8px] uppercase tracking-[0.15em] text-[#667287]">
                <Activity size={11} />
                Ready for execution
              </div>
            </motion.div>

            {[
              {
                icon:
                  MessageCircle,
                label:
                  "Discord",
                position:
                  "left-[4%] top-[32%]",
              },
              {
                icon:
                  Users,
                label:
                  "Social",
                position:
                  "right-[4%] top-[32%]",
              },
              {
                icon:
                  RadioTower,
                label:
                  "Launch messaging",
                position:
                  "bottom-[6%] left-1/2 -translate-x-1/2",
              },
            ].map(
              (
                channel,
                index,
              ) => {
                const Icon =
                  channel.icon;

                return (
                  <motion.div
                    key={
                      channel.label
                    }
                    animate={{
                      y: [
                        0,
                        -7,
                        0,
                      ],
                    }}
                    transition={{
                      duration:
                        4.1 +
                        index *
                          0.35,
                      repeat:
                        Infinity,
                      delay:
                        index *
                        0.35,
                    }}
                    className={`absolute ${channel.position}`}
                  >
                    <div className="flex min-w-[205px] items-center justify-between rounded-2xl border border-white/[0.075] bg-white/[0.03] p-5 backdrop-blur-xl">
                      <div>
                        <div className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.15em] text-[#5e6b7f]">
                          Destination
                        </div>

                        <div className="mt-2 text-[15px] font-normal text-[#e6edf6]">
                          {
                            channel.label
                          }
                        </div>
                      </div>

                      <div className="flex size-9 items-center justify-center rounded-xl bg-[#65dcfa]/10 text-[#65dcfa]">
                        <Icon size={15} />
                      </div>
                    </div>
                  </motion.div>
                );
              },
            )}
          </div>

          <div className="flex justify-center">
            <Link
              href="/workspace"
              className="group inline-flex h-12 items-center gap-4 rounded-xl bg-white px-6 text-[13px] font-medium text-[#08111d] transition hover:bg-[#dff8ff]"
            >
              Open release workspace

              <ArrowRight
                size={15}
                className="transition group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
