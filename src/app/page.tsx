import {
  LandingExperience,
} from "@/components/LandingExperience";
import {
  SiteHeader,
} from "@/components/SiteHeader";

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-[#070a10] text-[#eef4fb]">
      <SiteHeader />
      <LandingExperience />

      <footer className="border-t border-white/[0.05] bg-[#070a10] px-5 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between">
          <span className="text-[13px] font-medium text-white">
            ShipSpark
          </span>

          <span className="font-[var(--font-main)] text-[8px] uppercase tracking-[0.16em] text-[#4f5c70]">
            Release intelligence
          </span>
        </div>
      </footer>
    </main>
  );
}
