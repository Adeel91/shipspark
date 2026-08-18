import "dotenv/config";

import { runShipSparkAnalysis } from "../src/croo/analyze";

async function run(
  label: string,
  input: {
    appStoreUrl?: string;
    playStoreUrl?: string;
    githubUrl?: string;
  },
) {
  console.log(`\n=== ${label} ===`);

  const result =
    await runShipSparkAnalysis(
      input,
    );

  console.dir(
    result,
    {
      depth: 6,
    },
  );
}

async function main() {
  await run(
    "VALID SINGLE SOURCE",
    {
      githubUrl:
        "https://github.com/Anuken/Mindustry",
    },
  );

  await run(
    "MISMATCHED SOURCES",
    {
      appStoreUrl:
        "https://apps.apple.com/us/app/mindustry/id1385258906",
      githubUrl:
        "https://github.com/Adeel91/shipspark",
    },
  );

  await run(
    "INVALID URL",
    {
      appStoreUrl:
        "https://example.com/not-an-app",
    },
  );
}

main().catch(
  (error) => {
    console.error(error);
    process.exit(1);
  },
);
