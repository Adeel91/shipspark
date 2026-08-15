import Link from "next/link";
import {
  Sparkles,
} from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.065] bg-[#070a0f]/90 backdrop-blur-2xl">
      <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-6 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="flex size-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#c5ff0a,#53ff72)] text-[#071006] shadow-[0_0_28px_rgba(83,255,114,0.12)]">
            <Sparkles
              size={17}
              strokeWidth={2.5}
            />
          </div>

          <span className="text-[17px] font-extrabold tracking-[-0.025em] text-white">
            ShipSpark
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          <a
            href="/#how-it-works"
            className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#788494] transition hover:text-[#c5ff0a]"
          >
            Evidence
          </a>

          <a
            href="/#decision"
            className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#788494] transition hover:text-[#c5ff0a]"
          >
            Decision
          </a>

          <a
            href="/#action"
            className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#788494] transition hover:text-[#c5ff0a]"
          >
            Action
          </a>
        </nav>

        <Link
          href="/workspace"
          className="rounded-xl bg-[linear-gradient(105deg,#c5ff0a_0%,#53ff72_100%)] px-5 py-3 text-[12px] font-extrabold text-[#071006] transition hover:brightness-110"
        >
          Open workspace
        </Link>
      </div>
    </header>
  );
}

export default SiteHeader;
