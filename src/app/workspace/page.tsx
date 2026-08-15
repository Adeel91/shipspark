import Link from "next/link";
import {
  ArrowLeft,
  RadioTower,
} from "lucide-react";

import {
  ReleaseWorkspace,
} from "@/components/ReleaseWorkspace";
import {
  SiteHeader,
} from "@/components/SiteHeader";

export default function WorkspacePage() {
  return (
    <div className="min-h-screen bg-[#070a0f] text-white">
      <SiteHeader />

      <main className="mx-auto max-w-[1320px] px-6 pb-24 pt-10 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-[#7f8997] transition hover:text-[#c5ff0a]"
        >
          <ArrowLeft
            size={13}
          />
          Back home
        </Link>

        <div className="mt-9 flex flex-col gap-6 border-b border-white/[0.06] pb-9 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c5ff0a]/20 bg-[#c5ff0a]/[0.055] px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#c5ff0a]">
              <RadioTower
                size={12}
              />
              Release intelligence
            </div>

            <h1 className="mt-5 text-[38px] font-extrabold leading-[1.02] tracking-[-0.045em] text-white sm:text-[48px]">
              Should this release
              <span className="ml-2 text-[#c5ff0a]">
                get attention?
              </span>
            </h1>
          </div>

          <p className="max-w-[520px] text-[14px] font-semibold leading-7 text-[#bac3cd]">
            Add whatever evidence you have. ShipSpark reads it, finds the strongest signals, and decides what deserves promotion.
          </p>
        </div>

        <div className="mt-8">
          <ReleaseWorkspace />
        </div>
      </main>
    </div>
  );
}
