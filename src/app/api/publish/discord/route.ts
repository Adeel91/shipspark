import { NextResponse } from "next/server";

type PublishBody = {
  webhook?: string;
  content?: string;
  destinationUrl?: string;
  imageUrl?: string;
};

function parseOptionalHttpsUrl(
  value?: string,
): string | undefined {
  const trimmed = value?.trim();

  if (!trimmed) {
    return undefined;
  }

  let url: URL;

  try {
    url = new URL(trimmed);
  } catch {
    throw new Error(
      "Enter a valid HTTPS URL.",
    );
  }

  if (url.protocol !== "https:") {
    throw new Error(
      "Only HTTPS URLs are supported.",
    );
  }

  return url.toString();
}

export async function POST(
  request: Request,
) {
  try {
    const body =
      (await request.json()) as PublishBody;

    const webhook =
      body.webhook?.trim();

    const content =
      body.content?.trim();

    if (!webhook || !content) {
      return NextResponse.json(
        {
          error:
            "Webhook and message are required.",
        },
        {
          status: 400,
        },
      );
    }

    let webhookUrl: URL;

    try {
      webhookUrl =
        new URL(webhook);
    } catch {
      return NextResponse.json(
        {
          error:
            "Enter a valid Discord webhook URL.",
        },
        {
          status: 400,
        },
      );
    }

    const validProtocol =
      webhookUrl.protocol ===
      "https:";

    const validHost =
      webhookUrl.hostname ===
        "discord.com" ||
      webhookUrl.hostname ===
        "discordapp.com";

    const validPath =
      webhookUrl.pathname.startsWith(
        "/api/webhooks/",
      );

    if (
      !validProtocol ||
      !validHost ||
      !validPath
    ) {
      return NextResponse.json(
        {
          error:
            "Enter a valid Discord webhook URL.",
        },
        {
          status: 400,
        },
      );
    }

    const destinationUrl =
      parseOptionalHttpsUrl(
        body.destinationUrl,
      );

    const imageUrl =
      parseOptionalHttpsUrl(
        body.imageUrl,
      );

    const embeds: Array<
      Record<string, unknown>
    > = [];

    if (
      destinationUrl ||
      imageUrl
    ) {
      const embed: Record<
        string,
        unknown
      > = {};

      if (destinationUrl) {
        embed.title =
          "Open release";

        embed.url =
          destinationUrl;
      }

      if (imageUrl) {
        embed.image = {
          url: imageUrl,
        };
      }

      embeds.push(embed);
    }

    const payload: Record<
      string,
      unknown
    > = {
      content,
      allowed_mentions: {
        parse: [],
      },
    };

    if (embeds.length > 0) {
      payload.embeds =
        embeds;
    }

    const response =
      await fetch(
        webhookUrl.toString(),
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body:
            JSON.stringify(
              payload,
            ),
        },
      );

    if (!response.ok) {
      const detail =
        await response
          .text()
          .catch(() => "");

      return NextResponse.json(
        {
          error:
            detail ||
            "Discord publishing failed.",
        },
        {
          status: 502,
        },
      );
    }

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to publish to Discord.",
      },
      {
        status: 500,
      },
    );
  }
}
