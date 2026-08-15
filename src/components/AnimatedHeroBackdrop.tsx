"use client";

import {
  motion,
} from "motion/react";

const particles = [
  ["8%", "21%", 0],
  ["15%", "72%", 1.2],
  ["24%", "38%", 2.1],
  ["31%", "82%", 0.6],
  ["42%", "18%", 1.6],
  ["48%", "70%", 2.7],
  ["58%", "28%", 0.9],
  ["65%", "78%", 1.9],
  ["72%", "15%", 2.4],
  ["80%", "61%", 1.1],
  ["88%", "30%", 0.3],
  ["93%", "73%", 2],
];

export function AnimatedHeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          x: [
            "-8%",
            "11%",
            "-8%",
          ],
          y: [
            "-5%",
            "9%",
            "-5%",
          ],
          scale: [
            1,
            1.12,
            1,
          ],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[8%] top-[5%] h-[560px] w-[560px] rounded-full bg-[#526dff]/[0.12] blur-[150px]"
      />

      <motion.div
        animate={{
          x: [
            "8%",
            "-12%",
            "8%",
          ],
          y: [
            "8%",
            "-7%",
            "8%",
          ],
          scale: [
            0.92,
            1.1,
            0.92,
          ],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[6%] top-[13%] h-[500px] w-[500px] rounded-full bg-[#45d8ff]/[0.08] blur-[150px]"
      />

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 44,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-1/2 size-[690px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]"
      >
        <div className="absolute left-1/2 top-[-3px] size-1.5 -translate-x-1/2 rounded-full bg-[#67def9] shadow-[0_0_20px_rgba(103,222,249,0.9)]" />
      </motion.div>

      <motion.div
        animate={{
          rotate: [
            360,
            0,
          ],
        }}
        transition={{
          duration: 62,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-1/2 size-[940px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.022]"
      />

      <motion.div
        animate={{
          y: [
            "-20%",
            "120%",
          ],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-x-[8%] h-px bg-gradient-to-r from-transparent via-[#69e2ff]/20 to-transparent"
      />

      <motion.div
        animate={{
          x: [
            "-30%",
            "130%",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
          delay: 1.5,
        }}
        className="absolute bottom-[29%] h-px w-[40%] bg-gradient-to-r from-transparent via-[#667cff]/25 to-transparent"
      />

      {particles.map(
        (
          particle,
          index,
        ) => (
          <motion.div
            key={index}
            style={{
              left: particle[0],
              top: particle[1],
            }}
            animate={{
              opacity: [
                0.12,
                0.85,
                0.12,
              ],
              scale: [
                0.6,
                1.4,
                0.6,
              ],
            }}
            transition={{
              duration: 3.4,
              repeat: Infinity,
              delay: Number(
                particle[2],
              ),
            }}
            className="absolute size-1 rounded-full bg-[#72e5ff] shadow-[0_0_16px_rgba(114,229,255,0.8)]"
          />
        ),
      )}

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:88px_88px] [mask-image:radial-gradient(circle_at_center,black,transparent_74%)]" />

      <div className="absolute inset-x-0 bottom-0 h-[260px] bg-gradient-to-t from-[#070a10] to-transparent" />
    </div>
  );
}
