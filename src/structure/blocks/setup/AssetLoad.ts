import { Assets, Text } from "pixi.js";
import { Block } from "../../Block";
import { GAME } from "../../../GAME";
import { XContainer } from "../../../pixi/XContainer";
import { TGraphics } from "../../../pixi/TGraphics";
import { getThemeAssetUrl, resolveThemeAssetUrl } from "../../../theme/runtimeTheme";

const assetUrl = (path: string): string =>
  new URL(`../../../assets/${path}`, import.meta.url).href;

const resolveAssetUrl = (keys: string[], fallbackPath: string): string =>
  resolveThemeAssetUrl(keys, fallbackPath) ?? assetUrl(fallbackPath);

const resolveThemeOnlyAssetUrl = (keys: string[]): string | undefined =>
  getThemeAssetUrl(...keys);

export class AssetLoad extends Block {
  private progressBar!: TGraphics;
  private randomQuotes = [
    "Time flies over us,\nbut leaves its shadow behind...",
    "Time is what we want most,\nbut what we use worst...",
    "Lost time is never found again...",
    "The two most powerful warriors\nare patience and time..."
  ];

  constructor(name: string) {
    super(name);
  }

  start() {
    this._organiseContainer();
    this._createProgressBar();

    this._loadAssets().then(() => {
      this._destroyProgressBar();
      this.end();
    });
  }

  private async _loadAssets(): Promise<void> {
    const symbolH1 = resolveThemeOnlyAssetUrl(["high-tier-symbol-1"]);
    const symbolH2 = resolveThemeOnlyAssetUrl(["high-tier-symbol-2"]);
    const symbolH3 = resolveThemeOnlyAssetUrl(["high-tier-symbol-3"]);
    const symbolM1 = resolveThemeOnlyAssetUrl(["mid-tier-symbol-1"]);
    const symbolM2 = resolveThemeOnlyAssetUrl(["mid-tier-symbol-2"]);
    const symbolM3 = resolveThemeOnlyAssetUrl(["mid-tier-symbol-3"]);
    const symbolL1 = resolveThemeOnlyAssetUrl(["low-tier-symbol-1"]);
    const symbolL2 = resolveThemeOnlyAssetUrl(["low-tier-symbol-2"]);
    const symbolL3 = resolveThemeOnlyAssetUrl(["low-tier-symbol-3"]);

    const bundle = {
      intro_BG: resolveAssetUrl(
        ["loading-page"],
        "images/samurai-spin-intro-bg.png"
      ),
      dungeon_BG: resolveAssetUrl(
        ["background"],
        "images/samurai_BG.png"
      ),
      game_logo: resolveAssetUrl(
        ["game-logo"],
        "images/samurai-game-logo.png"
      ),
      game_frame: resolveAssetUrl(
        ["reel-container"],
        "images/Reel-Background.png"
      ),
      reel_background: resolveAssetUrl(
        ["reel-container"],
        "images/Reel-Background-620.png"
      ),

      high_symbol_strip: resolveAssetUrl(
        ["spritesheet"],
        "spritesheets/high-symbol/high-symbol-spritesheet.png"
      ),
      mid_symbol_strip: resolveAssetUrl(
        ["spritesheet"],
        "spritesheets/mid-symbol/mid-symbol-spritesheet.png"
      ),
      low_symbol_strip: resolveAssetUrl(
        ["spritesheet"],
        "spritesheets/low-symbol/low-symbol-spritesheet.png"
      ),
      ...(symbolH1 ? { symbol_H1: symbolH1 } : {}),
      ...(symbolH2 ? { symbol_H2: symbolH2 } : {}),
      ...(symbolH3 ? { symbol_H3: symbolH3 } : {}),
      ...(symbolM1 ? { symbol_M1: symbolM1 } : {}),
      ...(symbolM2 ? { symbol_M2: symbolM2 } : {}),
      ...(symbolM3 ? { symbol_M3: symbolM3 } : {}),
      ...(symbolL1 ? { symbol_L1: symbolL1 } : {}),
      ...(symbolL2 ? { symbol_L2: symbolL2 } : {}),
      ...(symbolL3 ? { symbol_L3: symbolL3 } : {})
    };

    const replaceableKeys = [
      "intro_BG",
      "dungeon_BG",
      "game_logo",
      "game_frame",
      "reel_background",
      "high_symbol_strip",
      "mid_symbol_strip",
      "low_symbol_strip",
      "symbol_H1",
      "symbol_H2",
      "symbol_H3",
      "symbol_M1",
      "symbol_M2",
      "symbol_M3",
      "symbol_L1",
      "symbol_L2",
      "symbol_L3"
    ];

    // 1-for-1 replacement: unload previous assets before importing replacements.
    try {
      await Assets.unload(replaceableKeys);
    } catch {
      // no-op, keys may not exist yet
    }

    const assetsApi = Assets as unknown as {
      removeBundle?: (bundleId: string) => void;
    };
    assetsApi.removeBundle?.("all-assets");

    Assets.addBundle("all-assets", bundle);

    // Load assets with progress tracking
    await Assets.loadBundle("all-assets", (progress: number) => {
      const percentage = Math.round(progress * 100);
      this._updateProgressBar(percentage);
    });
  }

  private _organiseContainer(): void {
    const { progress_container } = GAME.config.getConfig();
    GAME.containers.progressContainer = new XContainer(progress_container);
    GAME.app.stage.addChild(GAME.containers.progressContainer);
  }

  private _createProgressBar(): void {
    const { loading_background_bar, progress_bar, progress_text } =
      GAME.config.getConfig();
    new TGraphics(loading_background_bar);

    this.progressBar = new TGraphics(progress_bar);
    const randomQuoteSelected = Math.floor(
      Math.random() * this.randomQuotes.length
    );

    const progressText = new Text({
      text: this.randomQuotes[randomQuoteSelected],
      style: progress_text.style
    });

    progressText.scale.set(progress_text.scale);
    progressText.anchor.set(progress_text.anchor);
    progressText.position.set(
      progress_text.position.x,
      progress_text.position.y
    );

    GAME.containers.progressContainer.addChild(progressText);
  }

  private _updateProgressBar(percentage: number): void {
    const maxWidth = 300;
    const currentWidth = (percentage / 100) * maxWidth;
    this.progressBar.w = () => currentWidth;
    GAME.events.redraw.dispatch();
  }

  private _destroyProgressBar(): void {
    GAME.app.stage.removeChild(GAME.containers.progressContainer);
    this.progressBar.destroy();
    GAME.containers.progressContainer.destroy({ children: true });
  }
}
