import type {
  LoadedRuntimeTheme,
  RuntimeThemeConfig,
  ThemeManifest
} from "./types";

const THEME_ROOT = "/themes/SpinSlotSpin";
const MANIFEST_PATH = `${THEME_ROOT}/manifest.json`;
const ASSET_CACHE_KEY = "theme-assets-cache:SpinSlotSpin";

let runtimeManifest: ThemeManifest | null = null;
let runtimeConfig: RuntimeThemeConfig | null = null;

const normalizeAssetRef = (value: string): string =>
  value.replace(/\\/g, "/").trim();

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

const loadPersistedAssets = (): Record<string, string> => {
  try {
    const serialized = window.localStorage.getItem(ASSET_CACHE_KEY);
    if (!serialized) return {};
    const parsed: unknown = JSON.parse(serialized);
    if (!isObject(parsed)) return {};

    return Object.entries(parsed).reduce<Record<string, string>>((acc, [key, value]) => {
      if (typeof value === "string") {
        acc[key] = value;
      }
      return acc;
    }, {});
  } catch {
    return {};
  }
};

const persistAssets = (assets: Record<string, string>): void => {
  try {
    window.localStorage.setItem(ASSET_CACHE_KEY, JSON.stringify(assets));
  } catch {
    // no-op
  }
};

const resolveFromManifest = (pathOrUrl: string): string =>
  new URL(
    normalizeAssetRef(pathOrUrl),
    window.location.origin + THEME_ROOT + "/"
  ).toString();

const resolveAssetByFilename = (fallbackPath: string): string | undefined => {
  if (!runtimeManifest?.assets) return undefined;

  const fallbackName = normalizeAssetRef(fallbackPath).split("/").pop();
  if (!fallbackName) return undefined;

  const found = Object.entries(runtimeManifest.assets).find(
    ([manifestKey, manifestPath]) => {
      const normalizedKey = normalizeAssetRef(manifestKey).split("/").pop();
      const normalizedPath = normalizeAssetRef(manifestPath).split("/").pop();
      return normalizedKey === fallbackName || normalizedPath === fallbackName;
    }
  );

  if (!found) return undefined;
  return appendVersion(
    resolveFromManifest(found[1]),
    runtimeManifest.version
  );
};

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

    const mergedAssets = {
      ...loadPersistedAssets(),
      ...manifestJson.assets
    };
    runtimeManifest = {
      ...manifestJson,
      assets: mergedAssets
    };
    persistAssets(mergedAssets);

    const configUrl = appendVersion(
      resolveFromManifest(runtimeManifest.configPath),
      runtimeManifest.version
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
          `[ThemeLoader] Runtime config in ${runtimeManifest.configPath} is invalid. Falling back to hardcoded defaults.`
        );
      }
    } catch (error) {
      runtimeConfig = null;
      console.warn(
        `[ThemeLoader] Failed to load runtime config from ${runtimeManifest.configPath}. Falling back to hardcoded defaults.`,
        error
      );
    }

    return {
      manifest: runtimeManifest,
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
    const normalizedKey = normalizeAssetRef(key);
    const assetPath =
      runtimeManifest.assets[key] ?? runtimeManifest.assets[normalizedKey];
    if (assetPath) {
      return appendVersion(resolveFromManifest(assetPath), runtimeManifest.version);
    }
  }

  return undefined;
};

export const resolveThemeAssetUrl = (
  keys: string[],
  fallbackPath: string
): string | undefined => getThemeAssetUrl(...keys) ?? resolveAssetByFilename(fallbackPath);
