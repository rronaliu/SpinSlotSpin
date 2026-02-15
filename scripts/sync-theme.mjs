import { cp, mkdir, rm, stat } from "node:fs/promises";
import path from "node:path";

const DEFAULT_THEME = "SpinSlotSpin";

const parseArgs = (argv) => {
  const args = {
    from: "",
    theme: DEFAULT_THEME
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--from") {
      args.from = argv[i + 1] ?? "";
      i += 1;
      continue;
    }
    if (token === "--theme") {
      args.theme = argv[i + 1] ?? DEFAULT_THEME;
      i += 1;
    }
  }

  return args;
};

const usage = () => {
  console.error(
    "Usage: npm run sync:theme -- --from /absolute/or/relative/backoffice-export [--theme SpinSlotSpin]"
  );
};

const exists = async (targetPath) => {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
};

const main = async () => {
  const { from, theme } = parseArgs(process.argv.slice(2));

  if (!from) {
    usage();
    process.exit(1);
  }

  const projectRoot = process.cwd();
  const sourceRoot = path.resolve(projectRoot, from);
  const targetRoot = path.resolve(projectRoot, "public", "themes", theme);

  const sourceManifest = path.join(sourceRoot, "manifest.json");
  const sourceConfig = path.join(sourceRoot, "game-config.json");
  const sourceAssets = path.join(sourceRoot, "assets");

  if (!(await exists(sourceManifest))) {
    throw new Error(`Missing source manifest: ${sourceManifest}`);
  }

  await mkdir(targetRoot, { recursive: true });

  // Remove old published files first (1-for-1 replacement).
  await rm(path.join(targetRoot, "assets"), { recursive: true, force: true });
  await rm(path.join(targetRoot, "manifest.json"), { force: true });
  await rm(path.join(targetRoot, "game-config.json"), { force: true });

  await cp(sourceManifest, path.join(targetRoot, "manifest.json"));

  if (await exists(sourceConfig)) {
    await cp(sourceConfig, path.join(targetRoot, "game-config.json"));
  } else {
    console.warn(`[sync:theme] Source config not found: ${sourceConfig}`);
  }

  if (await exists(sourceAssets)) {
    await cp(sourceAssets, path.join(targetRoot, "assets"), {
      recursive: true,
      force: true
    });
  } else {
    console.warn(`[sync:theme] Source assets folder not found: ${sourceAssets}`);
  }

  console.log(`[sync:theme] Published ${theme} from ${sourceRoot} -> ${targetRoot}`);
};

main().catch((error) => {
  console.error(`[sync:theme] ${error.message}`);
  process.exit(1);
});

