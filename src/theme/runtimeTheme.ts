import type {
  LoadedRuntimeTheme,
  RuntimeThemeConfig,
  ThemeManifest
} from "./types";

const THEME_ROOT = "/themes/samurai-slot";
const MANIFEST_PATH = `${THEME_ROOT}/manifest.json`;

let runtimeManifest: ThemeManifest | null = null;
let runtimeConfig: RuntimeThemeConfig | null = null;

const appendVersion = (url: string, version?: string | number): string => {
  if (version === undefined || version === null || version === "") {
    return url;
  }

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}v=${encodeURIComponent(String(version))}`;
};

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isManifest = (value: unknown): value is ThemeManifest => {
  if (!isObject(value)) return false;
  if (typeof value.configPath !== "string") return false;
  if (!isObject(value.assets)) return false;

  return Object.values(value.assets).every((assetUrl) => typeof assetUrl === "string");
};

const resolveFromManifest = (pathOrUrl: string): string =>
  new URL(pathOrUrl, window.location.origin + THEME_ROOT + "/").toString();

export const loadRuntimeTheme = async (): Promise<LoadedRuntimeTheme | null> => {
  try {
    const manifestResponse = await fetch(MANIFEST_PATH, { cache: "no-store" });
    if (!manifestResponse.ok) {
      throw new Error(`HTTP ${manifestResponse.status}`);
    }

    const manifestJson: unknown = await manifestResponse.json();
    if (!isManifest(manifestJson)) {
      throw new Error("Invalid manifest shape");
    }

    runtimeManifest = manifestJson;

    const configUrl = appendVersion(
      resolveFromManifest(manifestJson.configPath),
      manifestJson.version
    );

    try {
      const configResponse = await fetch(configUrl, { cache: "no-store" });
      if (!configResponse.ok) {
        throw new Error(`HTTP ${configResponse.status}`);
      }

      const configJson: unknown = await configResponse.json();
      runtimeConfig = isObject(configJson)
        ? (configJson as RuntimeThemeConfig)
        : null;

      if (!runtimeConfig) {
        console.warn(
          `[ThemeLoader] Runtime config in ${manifestJson.configPath} is invalid. Falling back to hardcoded defaults.`
        );
      }
    } catch (error) {
      runtimeConfig = null;
      console.warn(
        `[ThemeLoader] Failed to load runtime config from ${manifestJson.configPath}. Falling back to hardcoded defaults.`,
        error
      );
    }

    return {
      manifest: manifestJson,
      config: runtimeConfig
    };
  } catch (error) {
    runtimeManifest = null;
    runtimeConfig = null;
    console.warn(
      `[ThemeLoader] Failed to load theme manifest at ${MANIFEST_PATH}. Falling back to hardcoded defaults.`,
      error
    );
    return null;
  }
};

export const getRuntimeThemeConfig = (): RuntimeThemeConfig | null => runtimeConfig;

export const getThemeAssetUrl = (...keys: string[]): string | undefined => {
  if (!runtimeManifest?.assets) return undefined;

  for (const key of keys) {
    const assetPath = runtimeManifest.assets[key];
    if (assetPath) {
      return appendVersion(resolveFromManifest(assetPath), runtimeManifest.version);
    }
  }

  return undefined;
};
