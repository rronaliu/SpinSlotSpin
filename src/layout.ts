const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, value));

export type HeightBandName =
  | "short"
  | "normal"
  | "tall"
  | "veryTall"
  | "ultraTall";

type YAdjustments = {
  reelY: number;
  logoY: number;
  reelScaleMultiplier: number;
};

export type LayoutModel = {
  reelScaleMultiplier: number;
  topReserved: number;
  bottomReserved: number;
  reelCenterYFactor: number;
  reelBackgroundOffsetY: number;
  logoY: number;
  logoWidth: number;
  logoHeight: number;
  winTextOffsetY: number;
  yAdjustByHeight: Record<HeightBandName, YAdjustments>;
};

// Height tiers: primary responsiveness control.
export const HEIGHT_BREAKPOINTS = {
  shortMax: 760,
  normalMax: 860,
  tallMax: 940,
  veryTallMax: 1040
} as const;

// Single source of truth.
// Width is intentionally not used for reel/logo sizing or positioning.
export const LAYOUT_MODEL: LayoutModel = {
  reelScaleMultiplier: 1,
  topReserved: 138,
  bottomReserved: 150,
  reelCenterYFactor: 0.55,
  reelBackgroundOffsetY: 10,
  logoY: 128,
  logoWidth: 280,
  logoHeight: 232,
  winTextOffsetY: 24,
  yAdjustByHeight: {
    short: { reelY: -12, logoY: -8, reelScaleMultiplier: 0.8 },
    normal: { reelY: -30, logoY: 0, reelScaleMultiplier: 0.8 },
    tall: { reelY: -45, logoY: 5, reelScaleMultiplier: 0.9 },
    veryTall: { reelY: 50, logoY: 8, reelScaleMultiplier: 1.12 },
    ultraTall: { reelY: 100, logoY: 12, reelScaleMultiplier: 1.5 }
  }
};

export const getHeightBandName = (
  viewportHeight = window.innerHeight
): HeightBandName => {
  if (viewportHeight <= HEIGHT_BREAKPOINTS.shortMax) return "short";
  if (viewportHeight <= HEIGHT_BREAKPOINTS.normalMax) return "normal";
  if (viewportHeight <= HEIGHT_BREAKPOINTS.tallMax) return "tall";
  if (viewportHeight <= HEIGHT_BREAKPOINTS.veryTallMax) return "veryTall";
  return "ultraTall";
};

export const getLayoutModel = (): LayoutModel => LAYOUT_MODEL;

export const getHeightReelScaleMultiplier = (
  viewportHeight = window.innerHeight
): number => {
  const model = getLayoutModel();
  const heightBand = getHeightBandName(viewportHeight);
  return model.yAdjustByHeight[heightBand].reelScaleMultiplier;
};

export const isMobileViewport = (): boolean => window.innerWidth <= 430;

export type GameLayout = {
  centerX: number;
  logoY: number;
  reelCenterY: number;
  reelTopY: number;
  winTextOffsetY: number;
};

export const getGameLayout = (reelSize: number): GameLayout => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const model = getLayoutModel();
  const yAdjust = model.yAdjustByHeight[getHeightBandName(viewportHeight)];

  const minReelCenterY = model.topReserved + reelSize / 2;
  const maxReelCenterY = viewportHeight - model.bottomReserved - reelSize / 2;
  const preferredReelCenterY = viewportHeight * model.reelCenterYFactor;
  const reelCenterY =
    clamp(preferredReelCenterY, minReelCenterY, maxReelCenterY) + yAdjust.reelY;

  return {
    centerX: viewportWidth / 2,
    logoY: model.logoY + yAdjust.logoY,
    reelCenterY,
    reelTopY: reelCenterY - reelSize / 2,
    winTextOffsetY: model.winTextOffsetY
  };
};
