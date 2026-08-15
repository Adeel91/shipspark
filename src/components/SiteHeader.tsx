import {
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.055] bg-[#070a10]/75 backdrop-blur-2xl">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="relative flex size-9 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#111827]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#57d8ff]/20 to-[#6c7dff]/20" />

            <Sparkles
              size={16}
              className="relative text-[#dff8ff]"
            />
          </div>

          <span className="text-[17px] font-medium tracking-[-0.025em] text-white">
            ShipSpark
          </span>
        </Link>

        <nav className="hidden items-center gap-9 font-[var(--font-mono)] text-[9px] uppercase tracking-[0.17em] text-[#69768a] md:flex">
          <a
            href="/#release"
            className="transition hover:text-white"
          >
            Release
          </a>

          <a
            href="/#decision"
            className="transition hover:text-white"
          >
            Decision
          </a>

          <a
            href="/#action"
            className="transition hover:text-white"
          >
            Action
          </a>
        </nav>

        <Link
          href="/workspace"
          className="inline-flex h-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white px-5 text-[12px] font-medium text-[#07101b] transition hover:bg-[#dff7ff]"
        >
          Open workspace
        </Link>
      </div>
    </header>
  );
}
