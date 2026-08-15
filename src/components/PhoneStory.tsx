"use client";

import type {
  ReactNode,
} from "react";
import {
  GitCommitHorizontal,
  MessageSquareText,
  RadioTower,
  Sparkles,
} from "lucide-react";
import {
  motion,
} from "motion/react";
import {
  HeroScene,
} from "./HeroScene";

function FloatingSignal({
  className,
  icon,
  label,
  value,
  delay,
}: {
  className: string;
  icon: ReactNode;
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -9, 0],
      }}
      transition={{
        duration: 4.5 + delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`absolute z-20 ${className}`}
    >
      <div className="min-w-[210px] rounded-2xl border border-white/[0.08] bg-[#0d131e]/88 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
        <div className="flex items-center gap-2 font-[var(--font-mono)] text-[8px] uppercase tracking-[0.17em] text-[#657287]">
          {icon}
          {label}
        </div>

        <div className="mt-3 max-w-[200px] text-[14px] font-normal leading-5 text-[#e4ebf5]">
          {value}
        </div>
      </div>
    </motion.div>
  );
}

function TravelingLine({
  className,
  reverse = false,
  delay = 0,
}: {
  className: string;
  reverse?: boolean;
  delay?: number;
}) {
  return (
    <div
      className={`absolute overflow-hidden bg-white/[0.055] ${className}`}
    >
      <motion.div
        animate={
          reverse
            ? {
                x: ["500%", "-120%"],
              }
            : {
                x: ["-120%", "500%"],
              }
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          delay,
        }}
        className="h-full w-14 bg-gradient-to-r from-transparent via-[#5ee1ff] to-transparent"
      />
    </div>
  );
}

export function PhoneStory() {
  return (
    <section
      id="release"
      className="relative overflow-hidden border-t border-white/[0.05] bg-[#080c13] px-5 py-24 sm:px-8 lg:px-10"
    >
      <div className="pointer-events-none absolute left-1/2 top-[54%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#536eff]/[0.09] blur-[145px]" />

      <div className="relative mx-auto max-w-[1320px]">
        <div className="mx-auto max-w-[780px] text-center">
          <div className="font-[var(--font-mono)] text-[9px] uppercase tracking-[0.19em] text-[#65dcfa]">
            Release intelligence
          </div>

          <h2 className="mt-5 text-[44px] font-normal leading-[1.04] tracking-[-0.035em] text-white sm:text-[58px]">
            See what ShipSpark sees before
            <span className="text-[#78869a]">
              {" "}
              it makes the decision.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-[610px] text-[16px] font-normal leading-7 text-[#7e8a9d]">
            The latest GitHub release and live App Store context are analyzed together so the campaign is grounded in what actually shipped.
          </p>
        </div>

        <div className="relative mx-auto mt-5 h-[760px] max-w-[1180px]">
          <div className="absolute inset-[3%_22%]">
            <HeroScene />
          </div>

          <TravelingLine
            className="left-[12%] top-[35%] h-px w-[25%]"
          />

          <TravelingLine
            className="right-[12%] top-[35%] h-px w-[25%]"
            reverse
            delay={0.7}
          />

          <TravelingLine
            className="bottom-[28%] left-[12%] h-px w-[25%]"
            delay={1.2}
          />

          <TravelingLine
            className="bottom-[28%] right-[12%] h-px w-[25%]"
            reverse
            delay={1.7}
          />

          <FloatingSignal
            className="left-[1%] top-[19%]"
            icon={
              <GitCommitHorizontal size={11} />
            }
            label="Product change"
            value="Offline workflows landed in the latest release."
            delay={0}
          />

          <FloatingSignal
            className="bottom-[14%] left-[3%]"
            icon={
              <MessageSquareText size={11} />
            }
            label="Review demand"
            value="Recent store reviews reveal the problems and benefits customers care about now."
            delay={0.7}
          />

          <FloatingSignal
            className="right-[1%] top-[19%]"
            icon={
              <Sparkles size={11} />
            }
            label="Decision"
            value="The release creates a clear benefit worth promoting."
            delay={1.2}
          />

          <FloatingSignal
            className="bottom-[14%] right-[2%]"
            icon={
              <RadioTower size={11} />
            }
            label="Action"
            value="The winning angle is ready for distribution."
            delay={1.8}
          />
        </div>
      </div>
    </section>
  );
}
