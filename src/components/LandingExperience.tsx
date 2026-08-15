"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  GitBranch,
  MessageSquareText,
  Search,
  Sparkles,
  Store,
} from "lucide-react";
import { motion } from "motion/react";

import {
  AnimatedHeroBackdrop,
} from "./AnimatedHeroBackdrop";
import {
  PhoneStory,
} from "./PhoneStory";

const evidence = [
  {
    icon: Store,
    title: "Read the market",
    text: "Store listings, ratings, release notes, and recent customer reviews become live product evidence.",
  },
  {
    icon: GitBranch,
    title: "Understand the release",
    text: "Connect GitHub when available to separate meaningful user value from maintenance and internal work.",
  },
  {
    icon: Search,
    title: "Find the opportunity",
    text: "ShipSpark matches what shipped against what customers actually praise, request, and complain about.",
  },
];

const decisions = [
  {
    label: "PROMOTE",
    text: "The release solves something customers care about and has a strong story worth pushing.",
  },
  {
    label: "WAIT",
    text: "The opportunity is real, but the evidence or release timing is not strong enough yet.",
  },
  {
    label: "SKIP",
    text: "Do not manufacture a campaign for a release that does not deserve customer attention.",
  },
];

export function LandingExperience() {
  return (
    <main className="overflow-hidden bg-[#070a0f] text-[#f7f8fa]">
      <section className="relative flex min-h-[calc(100svh-72px)] items-center justify-center overflow-hidden border-b border-white/[0.06]">
        <AnimatedHeroBackdrop />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_43%,rgba(197,255,10,0.075),transparent_24%),radial-gradient(circle_at_67%_42%,rgba(83,255,114,0.055),transparent_30%)]" />

        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#070a0f] to-transparent" />

        <div className="relative z-10 mx-auto flex w-full max-w-[1120px] flex-col items-center px-6 pb-20 pt-24 text-center sm:px-8">
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
              duration: 0.5,
            }}
            className="inline-flex items-center gap-2 rounded-full border border-[#c5ff0a]/20 bg-[#c5ff0a]/[0.065] px-4 py-2 text-[11px] font-extrabold tracking-[0.04em] text-[#c5ff0a]"
          >
            <Sparkles size={13} />
            AI release intelligence is live
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 22,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.08,
            }}
            className="mt-8 max-w-[980px] text-[54px] font-extrabold leading-[0.98] tracking-[-0.055em] text-white sm:text-[72px] lg:text-[88px]"
          >
            Know when a release
            <span className="mt-1 block bg-[linear-gradient(100deg,#c5ff0a_0%,#53ff72_75%)] bg-clip-text text-transparent">
              deserves attention.
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
              duration: 0.55,
              delay: 0.16,
            }}
            className="mt-7 max-w-[760px] text-[17px] font-semibold leading-8 text-[#aeb7c3] sm:text-[19px]"
          >
            ShipSpark reads app stores, customer reviews, release notes, and source activity to decide whether you should promote, wait, or skip before generating a campaign.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.55,
              delay: 0.24,
            }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Link
              href="/workspace"
              className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-xl bg-[linear-gradient(105deg,#c5ff0a_0%,#53ff72_100%)] px-7 text-[14px] font-extrabold text-[#071006] shadow-[0_16px_48px_rgba(83,255,114,0.16)] transition hover:scale-[1.02] hover:brightness-110"
            >
              Analyze a release
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex min-h-[54px] items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.035] px-7 text-[14px] font-bold text-[#c7ced7] backdrop-blur-xl transition hover:border-white/[0.18] hover:bg-white/[0.06] hover:text-white"
            >
              See how it works
            </a>
          </motion.div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[12px] font-bold text-[#7f8b9a]">
            <span>App Store</span>
            <span className="size-1 rounded-full bg-[#c5ff0a]" />
            <span>Google Play</span>
            <span className="size-1 rounded-full bg-[#53ff72]" />
            <span>GitHub</span>
            <span className="size-1 rounded-full bg-[#c5ff0a]" />
            <span>Customer reviews</span>
          </div>
        </div>
      </section>

      <PhoneStory />

      <section
        id="how-it-works"
        className="relative border-y border-white/[0.055] bg-[#090d14] py-28 sm:py-36"
      >
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#53ff72]/[0.025] blur-[120px]" />

        <div className="relative mx-auto max-w-[1220px] px-6 sm:px-8">
          <div className="max-w-[760px]">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#c5ff0a]">
              Evidence before marketing
            </div>

            <h2 className="mt-5 text-[43px] font-extrabold leading-[1.03] tracking-[-0.045em] text-white sm:text-[58px]">
              Stop promoting every release
              <span className="block text-[#8e99a8]">
                like it matters equally.
              </span>
            </h2>

            <p className="mt-6 max-w-[650px] text-[17px] font-semibold leading-8 text-[#9ca7b5]">
              ShipSpark starts with evidence. Marketing is the result of the decision, not the starting point.
            </p>
          </div>

          <div className="mt-16 grid gap-4 lg:grid-cols-3">
            {evidence.map(
              (
                item,
                index,
              ) => {
                const Icon =
                  item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{
                      opacity: 0,
                      y: 24,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.3,
                    }}
                    transition={{
                      duration: 0.45,
                      delay:
                        index *
                        0.07,
                    }}
                    className="group rounded-[26px] border border-white/[0.07] bg-[#0c1119] p-7 transition hover:border-[#c5ff0a]/20 hover:bg-[#0e141d]"
                  >
                    <div className="flex size-11 items-center justify-center rounded-xl border border-[#c5ff0a]/15 bg-[#c5ff0a]/[0.06] text-[#c5ff0a]">
                      <Icon size={19} />
                    </div>

                    <div className="mt-8 text-[11px] font-extrabold tracking-[0.15em] text-[#596576]">
                      0{index + 1}
                    </div>

                    <h3 className="mt-3 text-[22px] font-extrabold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-[14px] font-semibold leading-7 text-[#8f9aaa]">
                      {item.text}
                    </p>
                  </motion.div>
                );
              },
            )}
          </div>
        </div>
      </section>

      <section
        id="decision"
        className="relative py-28 sm:py-36"
      >
        <div className="mx-auto max-w-[1220px] px-6 sm:px-8">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#53ff72]">
                The decision layer
              </div>

              <h2 className="mt-5 text-[44px] font-extrabold leading-[1.02] tracking-[-0.045em] text-white sm:text-[58px]">
                Not another
                <span className="block bg-[linear-gradient(100deg,#c5ff0a,#53ff72)] bg-clip-text text-transparent">
                  AI copy generator.
                </span>
              </h2>

              <p className="mt-6 max-w-[500px] text-[17px] font-semibold leading-8 text-[#929dac]">
                ShipSpark decides whether a campaign should exist before writing one.
              </p>
            </div>

            <div className="space-y-3">
              {decisions.map(
                (
                  decision,
                  index,
                ) => (
                  <motion.div
                    key={
                      decision.label
                    }
                    initial={{
                      opacity: 0,
                      x: 22,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.45,
                      delay:
                        index *
                        0.07,
                    }}
                    className="flex gap-5 rounded-[24px] border border-white/[0.07] bg-[#0b1018] p-6 sm:items-center"
                  >
                    <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full bg-[#c5ff0a]/[0.08] text-[#c5ff0a] sm:mt-0">
                      <CheckCircle2
                        size={18}
                      />
                    </div>

                    <div>
                      <div className="text-[15px] font-extrabold text-[#c5ff0a]">
                        {
                          decision.label
                        }
                      </div>

                      <p className="mt-1.5 text-[14px] font-semibold leading-7 text-[#929dac]">
                        {
                          decision.text
                        }
                      </p>
                    </div>
                  </motion.div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        id="action"
        className="px-6 pb-28 sm:px-8 sm:pb-36"
      >
        <div className="relative mx-auto max-w-[1220px] overflow-hidden rounded-[34px] border border-[#c5ff0a]/15 bg-[#0b1118] px-7 py-16 text-center sm:px-12 sm:py-20">
          <div className="absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-[#53ff72]/[0.07] blur-[100px]" />

          <div className="relative">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-[#c5ff0a]/20 bg-[#c5ff0a]/[0.07] text-[#c5ff0a]">
              <MessageSquareText
                size={21}
              />
            </div>

            <h2 className="mx-auto mt-7 max-w-[760px] text-[42px] font-extrabold leading-[1.04] tracking-[-0.045em] text-white sm:text-[58px]">
              Find the release
              <span className="block text-[#c5ff0a]">
                worth talking about.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-[610px] text-[16px] font-semibold leading-8 text-[#9ba6b4]">
              Start with one source or combine all of them for the strongest evidence.
            </p>

            <Link
              href="/workspace"
              className="group mt-8 inline-flex min-h-[54px] items-center justify-center gap-3 rounded-xl bg-[linear-gradient(105deg,#c5ff0a_0%,#53ff72_100%)] px-8 text-[14px] font-extrabold text-[#071006] shadow-[0_18px_50px_rgba(83,255,114,0.15)] transition hover:scale-[1.02] hover:brightness-110"
            >
              Open ShipSpark
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LandingExperience;
