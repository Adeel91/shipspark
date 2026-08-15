"use client";

import {
  BrainCircuit,
  Check,
  History,
  Megaphone,
  MessageSquareText,
  RadioTower,
} from "lucide-react";

export type WorkspacePrimaryTab =
  | "intelligence"
  | "reviews"
  | "campaign"
  | "publish"
  | "history";

type Props = {
  activeTab: string;

  onChange: (
    tab: WorkspacePrimaryTab,
  ) => void;

  campaignReady?: boolean;
};

const normalTabs = [
  {
    id:
      "intelligence" as const,
    label:
      "Intelligence",
    icon:
      BrainCircuit,
  },
  {
    id:
      "reviews" as const,
    label:
      "Reviews",
    icon:
      MessageSquareText,
  },
];

export function WorkspacePrimaryTabs({
  activeTab,
  onChange,
  campaignReady = false,
}: Props) {
  return (
    <nav className="mt-7 overflow-x-auto border-b border-white/[0.07] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex min-w-max items-center gap-2 overflow-x-visible pb-3">
        {normalTabs.map(
          (
            tab,
          ) => {
            const Icon =
              tab.icon;

            const active =
              activeTab ===
              tab.id;

            return (
              <button
                key={
                  tab.id
                }
                type="button"
                onClick={() =>
                  onChange(
                    tab.id,
                  )
                }
                className={[
                  "relative flex min-h-[46px] shrink-0 items-center gap-2.5 rounded-xl px-4 text-[14px] font-bold transition",

                  active
                    ? "bg-white/[0.065] text-white"
                    : "text-[#9aa6b4] hover:bg-white/[0.035] hover:text-white",
                ].join(
                  " ",
                )}
              >
                <Icon
                  size={16}
                  strokeWidth={2}
                  className={
                    active
                      ? "text-[#c5ff0a]"
                      : ""
                  }
                />

                {
                  tab.label
                }

                {active && (
                  <span className="absolute inset-x-4 -bottom-[13px] h-[2px] rounded-full bg-[#c5ff0a]" />
                )}
              </button>
            );
          },
        )}

        <div className="mx-2 h-6 w-px shrink-0 bg-white/[0.08]" />

        <button
          type="button"
          onClick={() =>
            onChange(
              "campaign",
            )
          }
          className={[
            "group relative flex min-h-[46px] shrink-0 items-center gap-2.5 rounded-xl border px-5 text-[14px] font-extrabold transition",

            activeTab ===
            "campaign"
              ? "border-[#c5ff0a]/40 bg-[#c5ff0a] text-[#071006] shadow-[0_8px_30px_rgba(197,255,10,0.12)]"
              : "border-[#c5ff0a]/20 bg-[#c5ff0a]/[0.06] text-[#dfff72] hover:border-[#c5ff0a]/35 hover:bg-[#c5ff0a]/[0.1]",
          ].join(
            " ",
          )}
        >
          <Megaphone
            size={16}
            strokeWidth={2.2}
          />

          Promote

          {campaignReady && (
            <span
              className={[
                "ml-1 flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em]",

                activeTab ===
                "campaign"
                  ? "bg-[#071006]/10 text-[#071006]"
                  : "bg-[#c5ff0a]/10 text-[#c5ff0a]",
              ].join(
                " ",
              )}
            >
              <Check
                size={9}
                strokeWidth={3}
              />

              Ready
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() =>
            onChange(
              "publish",
            )
          }
          className={[
            "group flex min-h-[46px] shrink-0 items-center gap-2.5 rounded-xl border px-5 text-[14px] font-extrabold transition",

            activeTab ===
            "publish"
              ? "border-[#53ff72]/45 bg-[#53ff72]/[0.13] text-[#7dff91] shadow-[0_8px_30px_rgba(83,255,114,0.08)]"
              : campaignReady
                ? "border-[#53ff72]/18 bg-[#53ff72]/[0.035] text-[#85ff98] hover:border-[#53ff72]/35 hover:bg-[#53ff72]/[0.08]"
                : "border-white/[0.07] bg-white/[0.02] text-[#98a4b2] hover:bg-white/[0.035] hover:text-[#a4afbd]",
          ].join(
            " ",
          )}
        >
          <RadioTower
            size={16}
            strokeWidth={2.2}
          />

          Publish

          {campaignReady && (
            <span className="ml-1 size-1.5 rounded-full bg-[#53ff72] shadow-[0_0_10px_#53ff72]" />
          )}
        </button>

        <div className="mx-2 h-6 w-px shrink-0 bg-white/[0.08]" />

        <button
          type="button"
          onClick={() =>
            onChange(
              "history",
            )
          }
          className={[
            "relative flex min-h-[46px] shrink-0 items-center gap-2.5 rounded-xl px-4 text-[14px] font-bold transition",

            activeTab ===
            "history"
              ? "bg-white/[0.065] text-white"
              : "text-[#9aa6b4] hover:bg-white/[0.035] hover:text-white",
          ].join(
            " ",
          )}
        >
          <History
            size={16}
            strokeWidth={2}
            className={
              activeTab ===
              "history"
                ? "text-[#c5ff0a]"
                : ""
            }
          />

          History

          {activeTab ===
            "history" && (
            <span className="absolute inset-x-4 -bottom-[13px] h-[2px] rounded-full bg-[#c5ff0a]" />
          )}
        </button>
      </div>
    </nav>
  );
}

export default WorkspacePrimaryTabs;
