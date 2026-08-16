"use client";

import {
  ArrowLeft,
  Check,
  CheckCircle2,
  CircleAlert,
  Copy,
  ExternalLink,
  LoaderCircle,
  LockKeyhole,
  MessageSquareText,
  RadioTower,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  useState,
} from "react";

type Analysis = {
  decision:
    | "PROMOTE"
    | "WAIT"
    | "SKIP";

  confidence: number;
  opportunityScore: number;

  campaign: {
    enabled: boolean;
    angle: string;
    headline: string;
    hook: string;
    audience: string;
    cta: string;
    socialPost: string;
    discordPost: string;
    nextStep: string;
  };
};

type Props = {
  analysis: Analysis;
  appName?: string;

  socialDraft: string;
  discordDraft: string;

  webhook: string;

  publishing: boolean;
  publishError: string;
  published: boolean;

  onWebhookChange: (
    value: string,
  ) => void;

  onPublish: () => void;

  onBack: () => void;
};

function CopyButton({
  value,
  label = "Copy",
}: {
  value: string;
  label?: string;
}) {
  const [
    copied,
    setCopied,
  ] =
    useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(
      value,
    );

    setCopied(true);

    window.setTimeout(
      () =>
        setCopied(false),
      1400,
    );
  }

  return (
    <button
      type="button"
      onClick={
        handleCopy
      }
      className="inline-flex h-9 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.035] px-3 text-[10px] font-extrabold text-[#9ba7b5] transition hover:border-white/[0.14] hover:bg-white/[0.055] hover:text-white"
    >
      {copied ? (
        <>
          <Check
            size={11}
            className="text-[#53ff72]"
          />
          Copied
        </>
      ) : (
        <>
          <Copy
            size={11}
          />
          {label}
        </>
      )}
    </button>
  );
}

function SocialPreview({
  appName,
  value,
}: {
  appName: string;
  value: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/[0.055] bg-[#11161d] p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#c5ff0a,#53ff72)] text-[#071006]">
          <Sparkles
            size={16}
            strokeWidth={2.5}
          />
        </div>

        <div>
          <div className="text-[13px] font-extrabold text-white">
            {appName}
          </div>

          <div className="mt-0.5 text-[11px] font-semibold text-[#6f7b89]">
            Product update
          </div>
        </div>
      </div>

      <p className="mt-5 whitespace-pre-wrap text-[15px] font-semibold leading-7 text-[#e3e8ee]">
        {value}
      </p>

      <div className="mt-6 flex items-center gap-6 border-t border-white/[0.06] pt-4 text-[10px] font-bold text-[#687482]">
        <span>Reply</span>
        <span>Share</span>
        <span>Save</span>
      </div>
    </div>
  );
}

function DiscordPreview({
  appName,
  value,
}: {
  appName: string;
  value: string;
}) {
  return (
    <div className="rounded-[24px] bg-[#313338] p-5 sm:p-6">
      <div className="flex items-start gap-3.5">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#5865f2] text-white">
          <RadioTower
            size={16}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[14px] font-extrabold text-white">
              {appName}
            </span>

            <span className="rounded bg-[#5865f2] px-1.5 py-0.5 text-[8px] font-extrabold uppercase tracking-[0.05em] text-white">
              App
            </span>

            <span className="text-[10px] font-semibold text-[#949ba4]">
              Today
            </span>
          </div>

          <p className="mt-2 whitespace-pre-wrap text-[14px] font-medium leading-6 text-[#dbdee1]">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

export function PublishExperience({
  analysis,
  appName,
  socialDraft,
  discordDraft,
  webhook,
  publishing,
  publishError,
  published,
  onWebhookChange,
  onPublish,
  onBack,
}: Props) {
  const displayName =
    appName ??
    "Current release";

  if (
    !analysis.campaign
      .enabled
  ) {
    return (
      <section className="grid min-h-[460px] place-items-center rounded-[28px] border border-white/[0.075] bg-[#080d14] px-6 text-center">
        <div className="max-w-[560px]">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.025] text-[#687788]">
            <RadioTower
              size={19}
            />
          </div>

          <div className="mt-6 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#73808e]">
            Distribution locked
          </div>

          <h2 className="mt-3 text-[36px] font-extrabold tracking-[-0.045em] text-white">
            Nothing to publish.
          </h2>

          <p className="mt-4 text-[14px] font-semibold leading-7 text-[#98a5b3]">
            ShipSpark only opens distribution when the release receives a PROMOTE decision.
          </p>

          <button
            type="button"
            onClick={
              onBack
            }
            className="mt-7 inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 text-[11px] font-extrabold text-white transition hover:bg-white/[0.06]"
          >
            <ArrowLeft
              size={13}
            />
            Back to Promote
          </button>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[28px] border border-[#53ff72]/[0.14] bg-[#080d13]">
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#53ff72,transparent)] opacity-70" />

        <div className="flex flex-col gap-7 p-7 sm:p-8 xl:flex-row xl:items-end xl:justify-between xl:p-10">
          <div className="max-w-[920px]">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#53ff72]/20 bg-[#53ff72]/[0.065] px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.11em] text-[#8aff99]">
                <CheckCircle2
                  size={11}
                />
                Assets approved
              </div>

              <div className="rounded-full border border-white/[0.07] px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#8996a4]">
                {
                  analysis.confidence
                }
                % confidence
              </div>
            </div>

            <div className="mt-8 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#53ff72]">
              Distribution
            </div>

            <h2 className="mt-3 text-[clamp(38px,4.5vw,64px)] font-extrabold leading-[1] tracking-[-0.055em] text-white">
              Ready to ship the campaign.
            </h2>

            <p className="mt-5 max-w-[760px] text-[15px] font-semibold leading-7 text-[#a7b3c0]">
              The campaign assets from Promote are finalized. Choose how each channel leaves ShipSpark.
            </p>
          </div>

          <button
            type="button"
            onClick={
              onBack
            }
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 text-[10px] font-extrabold text-[#9ba7b5] transition hover:bg-white/[0.05] hover:text-white"
          >
            <ArrowLeft
              size={12}
            />
            Edit in Promote
          </button>
        </div>
      </section>

      <section>
        <div className="mb-5">
          <div className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#c5ff0a]">
            Distribution channels
          </div>

          <h3 className="mt-2 text-[clamp(28px,3vw,40px)] font-extrabold tracking-[-0.045em] text-white">
            Two assets. Two delivery paths.
          </h3>

          <p className="mt-2 max-w-[780px] text-[13px] font-semibold leading-6 text-[#83909e]">
            Discord can be published directly from ShipSpark. Social copy is finalized here and ready to copy into your preferred social platform.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <article className="relative overflow-hidden rounded-[30px] border border-[#c5ff0a]/[0.15] bg-[#090e15]">
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#c5ff0a,transparent)]" />

            <header className="flex flex-col gap-4 border-b border-white/[0.06] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3.5">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-[#c5ff0a] text-[#071006]">
                  <MessageSquareText
                    size={18}
                    strokeWidth={2.4}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-[17px] font-extrabold text-white">
                      Social
                    </h4>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c5ff0a]/15 bg-[#c5ff0a]/[0.055] px-2.5 py-1 text-[8px] font-extrabold uppercase tracking-[0.08em] text-[#d8ff67]">
                      Ready to copy
                    </span>
                  </div>

                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#687684]">
                    Manual distribution
                  </p>
                </div>
              </div>

              <CopyButton
                value={
                  socialDraft
                }
                label="Copy final post"
              />
            </header>

            <div className="p-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#7e8b98]">
                  Final preview
                </span>

                <span className="text-[9px] font-bold text-[#62707e]">
                  {
                    socialDraft.length
                  }{" "}
                  characters
                </span>
              </div>

              <SocialPreview
                appName={
                  displayName
                }
                value={
                  socialDraft
                }
              />

              <div className="mt-6 flex items-start gap-3 rounded-[18px] border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-[#a8b3bf]">
                  <ExternalLink
                    size={13}
                  />
                </div>

                <div>
                  <div className="text-[11px] font-extrabold text-white">
                    Ready for your social platform
                  </div>

                  <p className="mt-1 text-[11px] font-semibold leading-5 text-[#7f8c9a]">
                    ShipSpark does not currently post directly to X, LinkedIn, or other social networks. Copy the approved asset and publish it where your audience lives.
                  </p>
                </div>
              </div>
            </div>

            <footer className="flex items-center gap-2 border-t border-white/[0.06] bg-[#070b10]/70 px-6 py-4 text-[10px] font-bold text-[#81909e]">
              <CheckCircle2
                size={12}
                className="text-[#53ff72]"
              />
              Copy is identical to the approved Promote draft
            </footer>
          </article>

          <article className="relative overflow-hidden rounded-[30px] border border-[#5865f2]/30 bg-[#090e15] shadow-[0_24px_90px_rgba(88,101,242,0.045)]">
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#7180ff,transparent)]" />

            <header className="flex flex-col gap-4 border-b border-white/[0.06] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3.5">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-[#5865f2] text-white">
                  <RadioTower
                    size={18}
                    strokeWidth={2.4}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-[17px] font-extrabold text-white">
                      Discord
                    </h4>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#7180ff]/20 bg-[#5865f2]/10 px-2.5 py-1 text-[8px] font-extrabold uppercase tracking-[0.08em] text-[#a9afff]">
                      Live delivery
                    </span>
                  </div>

                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#687684]">
                    Direct webhook publishing
                  </p>
                </div>
              </div>

              <CopyButton
                value={
                  discordDraft
                }
              />
            </header>

            <div className="p-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#7e8b98]">
                  Final Discord preview
                </span>

                <span className="text-[9px] font-bold text-[#62707e]">
                  {
                    discordDraft.length
                  }{" "}
                  characters
                </span>
              </div>

              <DiscordPreview
                appName={
                  displayName
                }
                value={
                  discordDraft
                }
              />

              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <LockKeyhole
                      size={11}
                      className="text-[#8991ff]"
                    />

                    <span className="text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#7e8b98]">
                      Discord webhook
                    </span>
                  </div>

                  <span className="text-[9px] font-bold text-[#657280]">
                    HTTPS only
                  </span>
                </div>

                <input
                  type="password"
                  value={
                    webhook
                  }
                  onChange={(
                    event,
                  ) =>
                    onWebhookChange(
                      event.target
                        .value,
                    )
                  }
                  placeholder="https://discord.com/api/webhooks/..."
                  autoComplete="off"
                  className="w-full rounded-[18px] border border-[#5865f2]/20 bg-[#070b10] px-4 py-4 text-[12px] font-semibold text-white outline-none transition placeholder:text-[#4f5b68] focus:border-[#7180ff]/50"
                />

                <div className="mt-3 flex items-start gap-2 text-[10px] font-semibold leading-5 text-[#697684]">
                  <ShieldCheck
                    size={12}
                    className="mt-0.5 shrink-0 text-[#53ff72]"
                  />

                  The webhook is used only for this publishing request and is not stored by ShipSpark.
                </div>
              </div>

              {publishError && (
                <div className="mt-5 flex items-start gap-3 rounded-[18px] border border-red-400/15 bg-red-400/[0.055] p-4">
                  <CircleAlert
                    size={15}
                    className="mt-0.5 shrink-0 text-red-300"
                  />

                  <div>
                    <div className="text-[11px] font-extrabold text-red-200">
                      Publishing failed
                    </div>

                    <p className="mt-1 text-[11px] font-semibold leading-5 text-red-200/70">
                      {
                        publishError
                      }
                    </p>
                  </div>
                </div>
              )}

              {published && (
                <div className="mt-5 flex items-start gap-3 rounded-[18px] border border-[#53ff72]/15 bg-[#53ff72]/[0.055] p-4">
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-[#53ff72]"
                  />

                  <div>
                    <div className="text-[12px] font-extrabold text-white">
                      Published successfully
                    </div>

                    <p className="mt-1 text-[11px] font-semibold leading-5 text-[#86a28c]">
                      The approved Discord announcement was delivered through the webhook.
                    </p>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={
                  onPublish
                }
                disabled={
                  publishing ||
                  !webhook.trim() ||
                  published
                }
                className="group mt-6 inline-flex min-h-[50px] w-full items-center justify-center gap-3 rounded-2xl bg-[#5865f2] px-6 text-[12px] font-extrabold text-white shadow-[0_14px_42px_rgba(88,101,242,0.14)] transition hover:bg-[#6673f5] disabled:cursor-not-allowed disabled:opacity-45"
              >
                {publishing ? (
                  <>
                    <LoaderCircle
                      size={15}
                      className="animate-spin"
                    />
                    Publishing to Discord
                  </>
                ) : published ? (
                  <>
                    <CheckCircle2
                      size={15}
                    />
                    Published
                  </>
                ) : (
                  <>
                    <Send
                      size={15}
                    />
                    Publish to Discord
                  </>
                )}
              </button>
            </div>

            <footer className="flex items-center gap-2 border-t border-white/[0.06] bg-[#070b10]/70 px-6 py-4 text-[10px] font-bold text-[#81909e]">
              <ShieldCheck
                size={12}
                className="text-[#8991ff]"
              />
              Direct delivery through ShipSpark
            </footer>
          </article>
        </div>
      </section>

      <section className="overflow-hidden rounded-[26px] border border-white/[0.07] bg-[#090e15]">
        <div className="grid md:grid-cols-3">
          <div className="p-5 md:border-r md:border-white/[0.06]">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#71808e]">
              Decision
            </div>

            <div className="mt-2 text-[16px] font-extrabold text-[#c5ff0a]">
              PROMOTE
            </div>
          </div>

          <div className="border-t border-white/[0.06] p-5 md:border-r md:border-t-0 md:border-white/[0.06]">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#71808e]">
              Opportunity
            </div>

            <div className="mt-2 text-[16px] font-extrabold text-white">
              {
                analysis.opportunityScore
              }
              /100
            </div>
          </div>

          <div className="border-t border-white/[0.06] p-5 md:border-t-0">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#71808e]">
              Distribution state
            </div>

            <div className="mt-2 flex items-center gap-2 text-[13px] font-extrabold text-white">
              <span
                className={[
                  "size-1.5 rounded-full",
                  published
                    ? "bg-[#53ff72] shadow-[0_0_10px_#53ff72]"
                    : "bg-[#ffd84d]",
                ].join(
                  " ",
                )}
              />

              {published
                ? "Discord published"
                : "Awaiting delivery"}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PublishExperience;
