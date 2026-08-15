import {
  Activity,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import {
  ReleaseWorkspace,
} from "@/components/ReleaseWorkspace";
import {
  SiteHeader,
} from "@/components/SiteHeader";

export const metadata = {
  title: "Release Workspace",
};

export default function WorkspacePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070a10] text-[#edf4fc]">
      <div className="pointer-events-none absolute left-1/2 top-[90px] h-[520px] w-[940px] -translate-x-1/2 rounded-full bg-[#536eff]/[0.065] blur-[170px]" />

      <div className="pointer-events-none absolute inset-x-0 top-[72px] h-[640px] bg-[linear-gradient(rgba(255,255,255,0.014)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.014)_1px,transparent_1px)] bg-[size:86px_86px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <SiteHeader />

      <section className="relative mx-auto max-w-[1320px] px-5 pb-28 pt-[124px] sm:px-8 lg:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-[var(--font-mono)] text-[8px] uppercase tracking-[0.17em] text-[#708098] transition hover:text-white"
        >
          <ArrowLeft size={11} />
          Back home
        </Link>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-[var(--font-mono)] text-[8px] uppercase tracking-[0.19em] text-[#68def9]">
              <Activity size={10} />
              Release workspace
            </div>

            <h1 className="mt-5 max-w-[650px] text-[48px] font-normal leading-[1.04] tracking-[-0.03em] text-white sm:text-[61px]">
              Does this release
              <span className="block text-[#91a1b7]">
                deserve attention?
              </span>
            </h1>
          </div>

          <div>
            <p className="max-w-[590px] text-[16px] font-normal leading-8 text-[#a6b5c9]">
              Start with any source you have. ShipSpark can analyze an App Store listing, Google Play listing, public GitHub repository, or combine them for deeper evidence. Reviews, positioning, release changes, and source activity are used whenever available.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 font-[var(--font-mono)] text-[8px] uppercase tracking-[0.14em] text-[#718198]">
              <Sparkles size={10} />
              Any source
              <span className="size-1 rounded-full bg-[#48586d]" />
              Evidence
              <span className="size-1 rounded-full bg-[#48586d]" />
              Insight
              <span className="size-1 rounded-full bg-[#48586d]" />
              Decision
              <span className="size-1 rounded-full bg-[#48586d]" />
              Campaign
            </div>
          </div>
        </div>

        <div className="mt-14">
          <ReleaseWorkspace />
        </div>
      </section>
    </main>
  );
}
