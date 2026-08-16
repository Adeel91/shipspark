"use client";

import {
  ArrowLeft,
  Check,
  CheckCircle2,
  CircleAlert,
  Copy,
  ExternalLink,
  ImageIcon,
  Link2,
  LoaderCircle,
  LockKeyhole,
  RadioTower,
  Send,
  Share2,
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

type ActionState = {
  loading: boolean;
  success: boolean;
  error: string;
};

const emptyState: ActionState = {
  loading: false,
  success: false,
  error: "",
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
      className="inline-flex h-9 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.035] px-3 text-[10px] font-extrabold text-[#9ba7b5] transition hover:bg-white/[0.055] hover:text-white"
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

function MediaPreview({
  imageUrl,
}: {
  imageUrl: string;
}) {
  if (!imageUrl.trim()) {
    return null;
  }

  return (
    <div className="mt-4 overflow-hidden rounded-[18px] border border-white/[0.06] bg-[#070b10]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={
          imageUrl
        }
        alt="Campaign media"
        className="max-h-[340px] w-full object-cover"
      />
    </div>
  );
}

function SocialPreview({
  appName,
  content,
  destinationUrl,
  imageUrl,
}: {
  appName: string;
  content: string;
  destinationUrl: string;
  imageUrl: string;
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

          <div className="mt-0.5 text-[10px] font-semibold text-[#6f7b89]">
            Product update
          </div>
        </div>
      </div>

      <p className="mt-5 whitespace-pre-wrap text-[14px] font-semibold leading-7 text-[#e3e8ee]">
        {content}
      </p>

      {destinationUrl && (
        <a
          href={
            destinationUrl
          }
          target="_blank"
          rel="noreferrer"
          className="mt-4 flex items-center gap-2 break-all text-[11px] font-semibold text-[#a9ba91]"
        >
          <Link2
            size={12}
            className="shrink-0 text-[#c5ff0a]"
          />

          {
            destinationUrl
          }
        </a>
      )}

      <MediaPreview
        imageUrl={
          imageUrl
        }
      />
    </div>
  );
}

function DiscordPreview({
  appName,
  content,
  destinationUrl,
  imageUrl,
}: {
  appName: string;
  content: string;
  destinationUrl: string;
  imageUrl: string;
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
            {content}
          </p>

          {destinationUrl && (
            <a
              href={
                destinationUrl
              }
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex items-center gap-2 break-all text-[11px] font-semibold text-[#b5b9ff]"
            >
              <Link2
                size={12}
              />

              {
                destinationUrl
              }
            </a>
          )}
        </div>
      </div>

      <MediaPreview
        imageUrl={
          imageUrl
        }
      />
    </div>
  );
}

function StatusMessage({
  state,
  successText,
}: {
  state: ActionState;
  successText: string;
}) {
  if (
    state.error
  ) {
    return (
      <div className="mt-4 flex items-start gap-2 rounded-[16px] border border-red-400/15 bg-red-400/[0.05] p-3 text-[10px] font-semibold leading-5 text-red-200">
        <CircleAlert
          size={12}
          className="mt-0.5 shrink-0"
        />

        {
          state.error
        }
      </div>
    );
  }

  if (
    state.success
  ) {
    return (
      <div className="mt-4 flex items-start gap-2 rounded-[16px] border border-[#53ff72]/15 bg-[#53ff72]/[0.05] p-3 text-[10px] font-semibold leading-5 text-[#9bd8a4]">
        <CheckCircle2
          size={12}
          className="mt-0.5 shrink-0 text-[#53ff72]"
        />

        {
          successText
        }
      </div>
    );
  }

  return null;
}

export function PublishExperience({
  analysis,
  appName,
  socialDraft,
  discordDraft,
  webhook,
  onWebhookChange,
  onBack,
}: Props) {
  const displayName =
    appName ??
    "Current release";

  const [
    destinationUrl,
    setDestinationUrl,
  ] =
    useState("");

  const [
    imageUrl,
    setImageUrl,
  ] =
    useState("");

  const [
    socialState,
    setSocialState,
  ] =
    useState<ActionState>(
      emptyState,
    );

  const [
    discordState,
    setDiscordState,
  ] =
    useState<ActionState>(
      emptyState,
    );

  async function createShareFile() {
    if (
      !imageUrl.trim()
    ) {
      return undefined;
    }

    try {
      const response =
        await fetch(
          imageUrl.trim(),
        );

      if (
        !response.ok
      ) {
        return undefined;
      }

      const blob =
        await response.blob();

      if (
        !blob.type.startsWith(
          "image/",
        )
      ) {
        return undefined;
      }

      const extension =
        blob.type
          .split("/")[1]
          ?.split("+")[0] ||
        "png";

      return new File(
        [
          blob,
        ],
        `shipspark-release.${extension}`,
        {
          type:
            blob.type,
        },
      );
    } catch {
      return undefined;
    }
  }

  async function shareSocial() {
    setSocialState({
      loading: true,
      success: false,
      error: "",
    });

    try {
      if (
        typeof navigator ===
          "undefined" ||
        !navigator.share
      ) {
        throw new Error(
          "Native sharing is not supported by this browser. Use Copy post instead.",
        );
      }

      const file =
        await createShareFile();

      const shareData: ShareData = {
        title:
          analysis.campaign
            .headline,
        text:
          socialDraft,
        ...(destinationUrl.trim()
          ? {
              url:
                destinationUrl.trim(),
            }
          : {}),
      };

      if (
        file &&
        navigator.canShare?.({
          files: [
            file,
          ],
        })
      ) {
        shareData.files = [
          file,
        ];
      }

      await navigator.share(
        shareData,
      );

      setSocialState({
        loading: false,
        success: true,
        error: "",
      });
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name ===
          "AbortError"
      ) {
        setSocialState(
          emptyState,
        );

        return;
      }

      setSocialState({
        loading: false,
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to open the share sheet.",
      });
    }
  }

  async function publishDiscord() {
    setDiscordState({
      loading: true,
      success: false,
      error: "",
    });

    try {
      if (
        !webhook.trim()
      ) {
        throw new Error(
          "Enter a Discord webhook URL first.",
        );
      }

      const response =
        await fetch(
          "/api/publish/discord",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body:
              JSON.stringify({
                webhook:
                  webhook.trim(),
                content:
                  discordDraft,
                destinationUrl:
                  destinationUrl.trim() ||
                  undefined,
                imageUrl:
                  imageUrl.trim() ||
                  undefined,
              }),
          },
        );

      const data =
        (await response
          .json()
          .catch(
            () => ({}),
          )) as {
        error?: string;
      };

      if (
        !response.ok
      ) {
        throw new Error(
          data.error ||
            "Unable to publish to Discord.",
        );
      }

      setDiscordState({
        loading: false,
        success: true,
        error: "",
      });
    } catch (error) {
      setDiscordState({
        loading: false,
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to publish to Discord.",
      });
    }
  }

  if (
    !analysis.campaign
      .enabled
  ) {
    return (
      <section className="grid min-h-[460px] place-items-center rounded-[28px] border border-white/[0.075] bg-[#080d14] px-6 text-center">
        <div className="max-w-[560px]">
          <CircleAlert
            size={26}
            className="mx-auto text-[#7e8996]"
          />

          <h2 className="mt-5 text-[34px] font-extrabold tracking-[-0.04em] text-white">
            Nothing to publish.
          </h2>

          <p className="mt-3 text-[14px] font-semibold leading-7 text-[#8f9ba8]">
            Distribution only opens for releases with a PROMOTE decision.
          </p>

          <button
            type="button"
            onClick={
              onBack
            }
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.08] px-4 text-[11px] font-extrabold text-white"
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
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#53ff72,transparent)]" />

        <div className="flex flex-col gap-7 p-7 sm:p-8 xl:flex-row xl:items-end xl:justify-between xl:p-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#53ff72]/20 bg-[#53ff72]/[0.06] px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.11em] text-[#8aff99]">
              <CheckCircle2
                size={11}
              />
              Assets approved
            </div>

            <div className="mt-8 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#53ff72]">
              Distribution
            </div>

            <h2 className="mt-3 text-[clamp(38px,4.5vw,62px)] font-extrabold leading-none tracking-[-0.055em] text-white">
              Ship the campaign.
            </h2>

            <p className="mt-5 max-w-[800px] text-[14px] font-semibold leading-7 text-[#9eabb8]">
              Add an optional campaign link and image, then share socially or publish directly to Discord.
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

      <section className="rounded-[26px] border border-white/[0.07] bg-[#090e15] p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-[380px]">
            <div className="flex items-center gap-2 text-[#c5ff0a]">
              <Sparkles
                size={13}
              />

              <span className="text-[9px] font-extrabold uppercase tracking-[0.12em]">
                Campaign media
              </span>
            </div>

            <h3 className="mt-3 text-[21px] font-extrabold tracking-[-0.025em] text-white">
              One campaign, shared context.
            </h3>

            <p className="mt-2 text-[11px] font-semibold leading-5 text-[#778492]">
              The link and image are reused in the social share and Discord announcement.
            </p>
          </div>

          <div className="grid flex-1 gap-4 xl:max-w-[950px] xl:grid-cols-2">
            <label>
              <span className="flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#758290]">
                <Link2
                  size={11}
                />
                Destination link
              </span>

              <input
                type="url"
                value={
                  destinationUrl
                }
                onChange={(
                  event,
                ) =>
                  setDestinationUrl(
                    event.target
                      .value,
                  )
                }
                placeholder="https://yourapp.com/release"
                className="mt-2 w-full rounded-[16px] border border-white/[0.07] bg-[#070b10] px-4 py-3.5 text-[12px] font-semibold text-white outline-none transition focus:border-[#c5ff0a]/30"
              />
            </label>

            <label>
              <span className="flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#758290]">
                <ImageIcon
                  size={11}
                />
                Image URL
              </span>

              <input
                type="url"
                value={
                  imageUrl
                }
                onChange={(
                  event,
                ) =>
                  setImageUrl(
                    event.target
                      .value,
                  )
                }
                placeholder="https://cdn.example.com/release-image.png"
                className="mt-2 w-full rounded-[16px] border border-white/[0.07] bg-[#070b10] px-4 py-3.5 text-[12px] font-semibold text-white outline-none transition focus:border-[#c5ff0a]/30"
              />
            </label>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[30px] border border-[#8b7cff]/35 bg-[radial-gradient(circle_at_15%_20%,rgba(139,124,255,0.18),transparent_38%),radial-gradient(circle_at_85%_80%,rgba(92,121,255,0.10),transparent_34%),#090e14]">
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#8b7cff_30%,#667cff_70%,transparent)]" />

        <div className="relative px-7 py-8 sm:px-9 sm:py-9 xl:px-10">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
            <div className="max-w-[900px]">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl border border-[#8b7cff]/30 bg-[#8b7cff]/15 text-[#b6adff] shadow-[0_0_40px_rgba(139,124,255,0.18)]">
                  <Sparkles
                    size={17}
                    strokeWidth={2.5}
                  />
                </div>

                <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#a99fff]">
                  ShipSpark roadmap
                </span>

                <span className="rounded-full border border-[#8b7cff]/30 bg-[#8b7cff]/15 px-3 py-1.5 text-[8px] font-extrabold uppercase tracking-[0.1em] text-[#c7c0ff]">
                  Coming next
                </span>
              </div>

              <h3 className="mt-5 max-w-[820px] text-[30px] font-extrabold leading-[1.05] tracking-[-0.045em] text-white sm:text-[36px]">
                Direct publishing to every major social channel.
              </h3>

              <p className="mt-4 max-w-[900px] text-[13px] font-semibold leading-7 text-[#a0acb8]">
                Direct connections for X, LinkedIn, Facebook, Instagram, Reddit, Bluesky, Threads, TikTok and other major social platforms are planned, turning ShipSpark into a complete release intelligence and distribution workflow.
              </p>

              <p className="mt-2 text-[11px] font-semibold leading-6 text-[#758391]">
                Native Share keeps social distribution available today without requiring account credentials inside ShipSpark.
              </p>
            </div>

            <div className="shrink-0">
              <div className="grid grid-cols-4 gap-2.5">
                {[
                  "X",
                  "in",
                  "f",
                  "IG",
                  "r",
                  "BS",
                  "@",
                  "TT",
                ].map(
                  (
                    channel,
                  ) => (
                    <div
                      key={
                        channel
                      }
                      className="flex size-12 items-center justify-center rounded-2xl border border-white/[0.09] bg-black/25 text-[11px] font-black text-[#c7d0d9] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                    >
                      {
                        channel
                      }
                    </div>
                  ),
                )}
              </div>

              <div className="mt-3 text-center text-[8px] font-extrabold uppercase tracking-[0.13em] text-[#697684]">
                Planned integrations
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5">
          <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#c5ff0a]">
            Distribution channels
          </div>

          <h3 className="mt-2 text-[32px] font-extrabold tracking-[-0.04em] text-white">
            Publish where your users are.
          </h3>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <article className="relative overflow-hidden rounded-[30px] border border-[#c5ff0a]/[0.16] bg-[#090e15]">
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#c5ff0a,transparent)]" />

            <header className="flex flex-col gap-4 border-b border-white/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3.5">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-[#c5ff0a] text-[#071006]">
                  <Share2
                    size={18}
                    strokeWidth={2.4}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-[17px] font-extrabold text-white">
                      Social
                    </h4>

                    <span className="rounded-full border border-[#c5ff0a]/15 bg-[#c5ff0a]/[0.055] px-2.5 py-1 text-[8px] font-extrabold uppercase tracking-[0.08em] text-[#d8ff67]">
                      Native share
                    </span>
                  </div>

                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#687684]">
                    No API key required
                  </p>
                </div>
              </div>

              <CopyButton
                value={
                  socialDraft
                }
                label="Copy post"
              />
            </header>

            <div className="p-6">
              <SocialPreview
                appName={
                  displayName
                }
                content={
                  socialDraft
                }
                destinationUrl={
                  destinationUrl
                }
                imageUrl={
                  imageUrl
                }
              />

              <div className="mt-5 flex items-start gap-3 rounded-[18px] border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#c5ff0a]/10 text-[#c5ff0a]">
                  <Share2
                    size={13}
                  />
                </div>

                <div>
                  <div className="text-[11px] font-extrabold text-white">
                    Share through your device
                  </div>

                  <p className="mt-1 text-[10px] font-semibold leading-5 text-[#788593]">
                    Your browser opens the native share sheet so you can choose an available social app or destination.
                  </p>
                </div>
              </div>

              <StatusMessage
                state={
                  socialState
                }
                successText="The native share flow completed."
              />

              <button
                type="button"
                onClick={
                  shareSocial
                }
                disabled={
                  socialState.loading
                }
                className="mt-5 inline-flex min-h-[50px] w-full items-center justify-center gap-3 rounded-2xl bg-[linear-gradient(110deg,#c5ff0a,#53ff72)] px-6 text-[12px] font-extrabold text-[#071006] transition hover:brightness-110 disabled:opacity-45"
              >
                {socialState.loading ? (
                  <LoaderCircle
                    size={15}
                    className="animate-spin"
                  />
                ) : (
                  <Share2
                    size={15}
                  />
                )}

                Share socially
              </button>
            </div>

            <footer className="flex items-center gap-2 border-t border-white/[0.06] bg-[#070b10]/70 px-6 py-4 text-[10px] font-bold text-[#81909e]">
              <ShieldCheck
                size={12}
                className="text-[#53ff72]"
              />
              No social credentials stored by ShipSpark
            </footer>
          </article>

          <article className="relative overflow-hidden rounded-[30px] border border-[#5865f2]/30 bg-[#090e15]">
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#7180ff,transparent)]" />

            <header className="flex flex-col gap-4 border-b border-white/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between">
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

                    <span className="rounded-full border border-[#7180ff]/20 bg-[#5865f2]/10 px-2.5 py-1 text-[8px] font-extrabold uppercase tracking-[0.08em] text-[#a9afff]">
                      Direct publish
                    </span>
                  </div>

                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#687684]">
                    Webhook delivery
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
              <DiscordPreview
                appName={
                  displayName
                }
                content={
                  discordDraft
                }
                destinationUrl={
                  destinationUrl
                }
                imageUrl={
                  imageUrl
                }
              />

              <div className="mt-5 rounded-[18px] border border-[#5865f2]/15 bg-[#070b10] p-4">
                <div className="flex items-center gap-2">
                  <LockKeyhole
                    size={12}
                    className="text-[#8991ff]"
                  />

                  <span className="text-[10px] font-extrabold text-white">
                    Discord destination
                  </span>
                </div>

                <input
                  type="url"
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
                  className="mt-3 w-full rounded-[14px] border border-white/[0.07] bg-[#05080d] px-3.5 py-3 text-[11px] font-semibold text-white outline-none transition focus:border-[#7180ff]/45"
                />

                <div className="mt-3 flex items-start gap-2 text-[9px] font-semibold leading-5 text-[#6e7b88]">
                  <ShieldCheck
                    size={11}
                    className="mt-0.5 shrink-0 text-[#53ff72]"
                  />

                  Used only for this publishing request.
                </div>
              </div>

              <StatusMessage
                state={
                  discordState
                }
                successText="The approved announcement was delivered to Discord."
              />

              <button
                type="button"
                onClick={
                  publishDiscord
                }
                disabled={
                  discordState.loading ||
                  discordState.success
                }
                className="mt-5 inline-flex min-h-[50px] w-full items-center justify-center gap-3 rounded-2xl bg-[#5865f2] px-6 text-[12px] font-extrabold text-white transition hover:bg-[#6874f4] disabled:opacity-45"
              >
                {discordState.loading ? (
                  <LoaderCircle
                    size={15}
                    className="animate-spin"
                  />
                ) : discordState.success ? (
                  <CheckCircle2
                    size={15}
                  />
                ) : (
                  <Send
                    size={15}
                  />
                )}

                {discordState.success
                  ? "Published"
                  : "Publish to Discord"}
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

      <section className="flex flex-col gap-4 rounded-[24px] border border-white/[0.07] bg-[#090e15] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <ShieldCheck
            size={15}
            className="mt-0.5 text-[#53ff72]"
          />

          <div>
            <div className="text-[11px] font-extrabold text-white">
              Distribution stays under your control
            </div>

            <p className="mt-1 text-[10px] font-semibold leading-5 text-[#74818e]">
              ShipSpark never distributes a campaign automatically. Every channel requires an explicit action.
            </p>
          </div>
        </div>

        {destinationUrl && (
          <a
            href={
              destinationUrl
            }
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[10px] font-extrabold text-[#c5ff0a]"
          >
            Open destination
            <ExternalLink
              size={11}
            />
          </a>
        )}
      </section>
    </div>
  );
}

export default PublishExperience;
