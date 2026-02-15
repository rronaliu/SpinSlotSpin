import { Assets, Text } from "pixi.js";
import { Block } from "../../Block";
import { GAME } from "../../../GAME";
import { XContainer } from "../../../pixi/XContainer";
import { TGraphics } from "../../../pixi/TGraphics";
import { getThemeAssetUrl } from "../../../theme/runtimeTheme";

const assetUrl = (path: string): string =>
  new URL(`../../../assets/${path}`, import.meta.url).href;

const resolveAssetUrl = (keys: string[], fallbackPath: string): string =>
  getThemeAssetUrl(...keys) ?? assetUrl(fallbackPath);

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
    Assets.addBundle("all-assets", {
      intro_BG: resolveAssetUrl(
        ["intro_BG", "introBg", "samurai-spin-intro-bg.png"],
        "images/samurai-spin-intro-bg.png"
      ),
      dungeon_BG: resolveAssetUrl(
        ["dungeon_BG", "dungeonBg", "samurai_BG.png"],
        "images/samurai_BG.png"
      ),
      game_logo: resolveAssetUrl(
        ["game_logo", "gameLogo", "samurai-game-logo.png"],
        "images/samurai-game-logo.png"
      ),
      game_frame: resolveAssetUrl(
        ["game_frame", "gameFrame", "Reel-Background.png"],
        "images/Reel-Background.png"
      ),
      reel_background: resolveAssetUrl(
        ["reel_background", "reelBackground", "Reel-Background-620.png"],
        "images/Reel-Background-620.png"
      ),

      high_symbol_strip: resolveAssetUrl(
        ["high_symbol_strip", "highSymbolStrip", "high-symbol-spritesheet.png"],
        "spritesheets/high-symbol/high-symbol-spritesheet.png"
      ),
      mid_symbol_strip: resolveAssetUrl(
        ["mid_symbol_strip", "midSymbolStrip", "mid-symbol-spritesheet.png"],
        "spritesheets/mid-symbol/mid-symbol-spritesheet.png"
      ),
      low_symbol_strip: resolveAssetUrl(
        ["low_symbol_strip", "lowSymbolStrip", "low-symbol-spritesheet.png"],
        "spritesheets/low-symbol/low-symbol-spritesheet.png"
      )
    });

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
