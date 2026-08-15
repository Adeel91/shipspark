export const runtime = "nodejs";

function validateWebhook(value: string) {
  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new Error("Enter a valid Discord webhook URL.");
  }

  const validHost =
    url.hostname === "discord.com" ||
    url.hostname === "discordapp.com";

  const validPath =
    url.pathname.startsWith("/api/webhooks/");

  if (!validHost || !validPath) {
    throw new Error("Enter a valid Discord webhook URL.");
  }

  return url;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      webhookUrl?: string;
      content?: string;
      appName?: string;
    };

    const webhookUrl = body.webhookUrl?.trim();
    const content = body.content?.trim();
    const appName = body.appName?.trim();

    if (!webhookUrl) {
      return Response.json(
        {
          error: "Discord webhook URL is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (!content) {
      return Response.json(
        {
          error: "Campaign content is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (content.length > 2000) {
      return Response.json(
        {
          error:
            "Discord messages must be 2000 characters or fewer.",
        },
        {
          status: 400,
        },
      );
    }

    const url = validateWebhook(webhookUrl);

    url.searchParams.set("wait", "true");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "ShipSpark",
        content,
        allowed_mentions: {
          parse: [],
        },
        embeds: appName
          ? [
              {
                title: `${appName} release campaign`,
                description:
                  "Campaign generated and published with ShipSpark.",
                color: 16744448,
              },
            ]
          : undefined,
      }),
    });

    const responseText = await response.text();

    if (!response.ok) {
      let message = "Discord rejected the campaign.";

      try {
        const parsed = JSON.parse(responseText) as {
          message?: string;
        };

        if (parsed.message) {
          message = parsed.message;
        }
      } catch {
        // Keep generic error.
      }

      throw new Error(message);
    }

    let publishedMessage:
      | {
          id?: string;
          channel_id?: string;
        }
      | undefined;

    try {
      publishedMessage = JSON.parse(responseText);
    } catch {
      publishedMessage = undefined;
    }

    return Response.json({
      published: true,
      messageId: publishedMessage?.id,
      channelId: publishedMessage?.channel_id,
      publishedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error(
      "ShipSpark Discord publishing failed:",
      error,
    );

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Publishing failed.",
      },
      {
        status: 500,
      },
    );
  }
}
