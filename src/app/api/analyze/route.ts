import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

type AppStoreResult = {
  trackName?: string;
  description?: string;
  primaryGenreName?: string;
  averageUserRating?: number;
  userRatingCount?: number;
  version?: string;
  releaseNotes?: string;
  artworkUrl512?: string;
  trackViewUrl?: string;
};

type GitHubRepository = {
  full_name?: string;
  description?: string;
  html_url?: string;
  language?: string;
  stargazers_count?: number;
  topics?: string[];
};

type GitHubRelease = {
  tag_name?: string;
  name?: string;
  body?: string;
  published_at?: string;
  html_url?: string;
};

const campaignSchema = {
  type: "object",
  properties: {
    decision: {
      type: "string",
      enum: ["PROMOTE", "SKIP"],
    },
    confidence: {
      type: "integer",
    },
    launchAngle: {
      type: "string",
    },
    whyNow: {
      type: "string",
    },
    audience: {
      type: "string",
    },
    headline: {
      type: "string",
    },
    socialPost: {
      type: "string",
    },
    discordPost: {
      type: "string",
    },
    campaignHook: {
      type: "string",
    },
    cta: {
      type: "string",
    },
    evidence: {
      type: "array",
      items: {
        type: "string",
      },
    },
    risks: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
  required: [
    "decision",
    "confidence",
    "launchAngle",
    "whyNow",
    "audience",
    "headline",
    "socialPost",
    "discordPost",
    "campaignHook",
    "cta",
    "evidence",
    "risks",
  ],
} as const;

function parseAppStoreUrl(value: string) {
  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new Error("Enter a valid App Store URL.");
  }

  if (!url.hostname.endsWith("apps.apple.com")) {
    throw new Error("Enter an Apple App Store URL.");
  }

  const match = url.pathname.match(/id(\d+)/);

  if (!match) {
    throw new Error("Could not find the App Store app ID.");
  }

  const firstPart = url.pathname.split("/").filter(Boolean)[0];

  const country =
    firstPart && /^[a-z]{2}$/i.test(firstPart)
      ? firstPart.toLowerCase()
      : "us";

  return {
    appId: match[1],
    country,
  };
}

function parseGitHubUrl(value: string) {
  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new Error("Enter a valid GitHub URL.");
  }

  if (url.hostname !== "github.com") {
    throw new Error("Enter a github.com repository URL.");
  }

  const parts = url.pathname.split("/").filter(Boolean);

  if (parts.length < 2) {
    throw new Error("GitHub URL must contain an owner and repository.");
  }

  return {
    owner: parts[0],
    repo: parts[1].replace(/\.git$/, ""),
  };
}

async function getAppStoreData(appUrl: string) {
  const { appId, country } = parseAppStoreUrl(appUrl);

  const response = await fetch(
    `https://itunes.apple.com/lookup?id=${appId}&country=${country}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Could not retrieve App Store data.");
  }

  const data = (await response.json()) as {
    resultCount: number;
    results: AppStoreResult[];
  };

  if (!data.resultCount || !data.results[0]) {
    throw new Error("App Store app was not found.");
  }

  return data.results[0];
}

function githubHeaders() {
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2026-03-10",
    "User-Agent": "ShipSpark",
  };
}

async function getGitHubData(githubUrl: string) {
  const { owner, repo } = parseGitHubUrl(githubUrl);

  const repositoryResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers: githubHeaders(),
      cache: "no-store",
    },
  );

  if (!repositoryResponse.ok) {
    throw new Error("Could not retrieve that GitHub repository.");
  }

  const repository =
    (await repositoryResponse.json()) as GitHubRepository;

  const releaseResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/releases/latest`,
    {
      headers: githubHeaders(),
      cache: "no-store",
    },
  );

  if (releaseResponse.ok) {
    const release =
      (await releaseResponse.json()) as GitHubRelease;

    return {
      repository,
      release,
      source: "release",
    };
  }

  const commitsResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/commits?per_page=5`,
    {
      headers: githubHeaders(),
      cache: "no-store",
    },
  );

  if (!commitsResponse.ok) {
    throw new Error(
      "No published release or recent commits could be loaded.",
    );
  }

  const commits = (await commitsResponse.json()) as Array<{
    sha?: string;
    html_url?: string;
    commit?: {
      message?: string;
      author?: {
        date?: string;
      };
    };
  }>;

  const latest = commits[0];

  return {
    repository,
    source: "commits",
    release: {
      tag_name: latest?.sha?.slice(0, 7) ?? "latest",
      name:
        latest?.commit?.message?.split("\n")[0] ??
        "Latest development update",
      body: commits
        .map((commit) => commit.commit?.message)
        .filter(Boolean)
        .join("\n\n"),
      published_at: latest?.commit?.author?.date,
      html_url: latest?.html_url,
    } satisfies GitHubRelease,
  };
}

export async function POST(request: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        {
          error: "Gemini API key is not configured.",
        },
        {
          status: 500,
        },
      );
    }

    const body = (await request.json()) as {
      appUrl?: string;
      githubUrl?: string;
    };

    const appUrl = body.appUrl?.trim();
    const githubUrl = body.githubUrl?.trim();

    if (!appUrl || !githubUrl) {
      return Response.json(
        {
          error: "App Store URL and GitHub URL are required.",
        },
        {
          status: 400,
        },
      );
    }

    const [app, github] = await Promise.all([
      getAppStoreData(appUrl),
      getGitHubData(githubUrl),
    ]);

    const ai = new GoogleGenAI({});

    const prompt = `
You are ShipSpark, an autonomous growth agent for newly launched mobile apps.

Your task is to decide whether the latest product update deserves active promotion.

Do not behave like a generic copywriting assistant.

First determine what actually changed.

Then determine whether that change gives users a meaningful new benefit.

If the update is trivial, maintenance only, technical only, unclear, or provides no meaningful user benefit, return SKIP.

If there is a compelling user benefit, return PROMOTE.

When promoting, identify the single strongest marketing angle.

Never invent features, reviews, metrics, adoption, customer opinions, or performance claims.

APP

Name:
${app.trackName ?? "Unknown"}

Category:
${app.primaryGenreName ?? "Unknown"}

Current version:
${app.version ?? "Unknown"}

Rating:
${app.averageUserRating ?? "Unknown"}

Rating count:
${app.userRatingCount ?? "Unknown"}

Description:
${app.description ?? "Unavailable"}

Current App Store release notes:
${app.releaseNotes ?? "Unavailable"}

GITHUB

Repository:
${github.repository.full_name ?? "Unknown"}

Repository description:
${github.repository.description ?? "Unavailable"}

Primary language:
${github.repository.language ?? "Unknown"}

Topics:
${github.repository.topics?.join(", ") || "None"}

Development source:
${github.source}

Latest update:
${github.release.name ?? "Unknown"}

Version or commit:
${github.release.tag_name ?? "Unknown"}

Published:
${github.release.published_at ?? "Unknown"}

Release notes or recent development:
${github.release.body ?? "Unavailable"}

Return an honest campaign decision based only on this evidence.

For confidence, use an integer between 0 and 100.

The social post and Discord post must be immediately usable.

The evidence array must contain concrete facts that influenced the decision.

The risks array must identify weaknesses in the campaign or uncertainty in the available evidence.
`.trim();

    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",
      store: false,
      input: prompt,
      response_format: {
        type: "text",
        mime_type: "application/json",
        schema: campaignSchema,
      },
    });

    if (!interaction.output_text) {
      throw new Error("Gemini returned an empty response.");
    }

    const campaign = JSON.parse(interaction.output_text);

    return Response.json({
      app: {
        name: app.trackName,
        category: app.primaryGenreName,
        rating: app.averageUserRating,
        ratingCount: app.userRatingCount,
        version: app.version,
        releaseNotes: app.releaseNotes,
        artwork: app.artworkUrl512,
        url: app.trackViewUrl ?? appUrl,
      },
      github: {
        repository: github.repository.full_name,
        description: github.repository.description,
        language: github.repository.language,
        stars: github.repository.stargazers_count,
        source: github.source,
        release: {
          name: github.release.name,
          version: github.release.tag_name,
          notes: github.release.body,
          publishedAt: github.release.published_at,
          url: github.release.html_url,
        },
      },
      campaign,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("ShipSpark analysis failed:", error);

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "ShipSpark analysis failed.",
      },
      {
        status: 500,
      },
    );
  }
}
