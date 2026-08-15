"use client";

import {
  GitBranch,
  MessageSquareText,
  RadioTower,
  Sparkles,
} from "lucide-react";
import {
  motion,
} from "motion/react";

import { HeroScene } from "./HeroScene";

const signals = [
  {
    icon: GitBranch,
    label: "Product change",
    text: "User facing changes are separated from maintenance work.",
    position:
      "left-[2%] top-[35%]",
  },
  {
    icon: Sparkles,
    label: "Decision",
    text: "The evidence reveals whether this release deserves attention.",
    position:
      "right-[2%] top-[33%]",
  },
  {
    icon: MessageSquareText,
    label: "Review demand",
    text: "Recent reviews reveal what customers praise, request, and struggle with.",
    position:
      "left-[4%] bottom-[17%]",
  },
  {
    icon: RadioTower,
    label: "Action",
    text: "A campaign is created only when the opportunity is strong enough.",
    position:
      "right-[3%] bottom-[16%]",
  },
];

export function PhoneStory() {
  return (
    <section className="relative overflow-hidden bg-[#070a0f] py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-[48%] h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#53ff72]/[0.045] blur-[140px]" />

      <div className="pointer-events-none absolute left-1/2 top-[52%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c5ff0a]/[0.055]" />

      <div className="relative mx-auto max-w-[1240px] px-6 sm:px-8">
        <div className="mx-auto max-w-[900px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c5ff0a]/20 bg-[#c5ff0a]/[0.06] px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#c5ff0a]">
            <span className="size-1.5 rounded-full bg-[#53ff72] shadow-[0_0_12px_rgba(83,255,114,0.8)]" />
            Release intelligence
          </div>

          <h2 className="mt-7 text-[44px] font-extrabold leading-[1.02] tracking-[-0.045em] text-white sm:text-[58px] lg:text-[66px]">
            See what ShipSpark sees
            <span className="block bg-[linear-gradient(100deg,#c5ff0a_0%,#53ff72_90%)] bg-clip-text text-transparent">
              before it makes the decision.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-[720px] text-[16px] font-semibold leading-8 text-[#a6b0bd] sm:text-[17px]">
            Reviews, store context, release notes, and source activity become one evidence graph before ShipSpark decides what deserves promotion.
          </p>
        </div>

        <div className="relative mx-auto mt-10 min-h-[720px] max-w-[1180px] sm:mt-14 lg:min-h-[760px]">
          <div className="absolute left-1/2 top-1/2 z-10 h-[650px] w-[430px] -translate-x-1/2 -translate-y-1/2 sm:h-[700px] sm:w-[470px]">
            <HeroScene />
          </div>

          <div className="pointer-events-none absolute left-[17%] right-[17%] top-1/2 h-px bg-[linear-gradient(90deg,transparent,rgba(197,255,10,0.26),rgba(83,255,114,0.18),transparent)]" />

          <div className="pointer-events-none absolute bottom-[25%] left-[18%] right-[18%] h-px bg-[linear-gradient(90deg,transparent,rgba(83,255,114,0.18),rgba(197,255,10,0.22),transparent)]" />

          {signals.map(
            (
              signal,
              index,
            ) => {
              const Icon =
                signal.icon;

              return (
                <motion.div
                  key={
                    signal.label
                  }
                  initial={{
                    opacity: 0,
                    y: 18,
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
                      0.08,
                  }}
                  className={`absolute z-20 hidden w-[235px] rounded-[22px] border border-white/[0.09] bg-[#0b1118]/90 p-5 shadow-[0_22px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl lg:block ${signal.position}`}
                >
                  <div className="flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#c5ff0a]">
                    <Icon
                      size={12}
                    />
                    {signal.label}
                  </div>

                  <p className="mt-3 text-[14px] font-semibold leading-6 text-[#d2d8e0]">
                    {signal.text}
                  </p>
                </motion.div>
              );
            },
          )}

          <div className="absolute inset-x-0 bottom-0 z-20 grid gap-3 lg:hidden sm:grid-cols-2">
            {signals.map(
              (
                signal,
              ) => {
                const Icon =
                  signal.icon;

                return (
                  <div
                    key={
                      signal.label
                    }
                    className="rounded-[20px] border border-white/[0.08] bg-[#0b1118]/90 p-4 backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#c5ff0a]">
                      <Icon
                        size={12}
                      />
                      {signal.label}
                    </div>

                    <p className="mt-2 text-[13px] font-semibold leading-6 text-[#b7c0cc]">
                      {signal.text}
                    </p>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PhoneStory;
