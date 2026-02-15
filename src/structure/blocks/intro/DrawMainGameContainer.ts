import { GAME } from "../../../GAME";
import { Block } from "../../Block";
import { Assets } from "pixi.js";
import { TGraphics } from "../../../pixi/TGraphics";
import { VSprite } from "../../../pixi/VSprite";
import { XContainer } from "../../../pixi/XContainer";

export class DrawMainGameContainer extends Block {
  constructor(name: string) {
    super(name);
  }

  start() {
    this._organiseContainers();
    this._appendGameBackground();
    //this._appendConsistentBackboard();
    this.end();
  }

  private _organiseContainers(): void {
    const config = GAME.config.getConfig();
    const { main_game_container } = config;
    GAME.containers.mainGameContainer = new XContainer(main_game_container);
    GAME.containers.mainGameContainer.sortableChildren = true;
    GAME.app.stage.addChild(GAME.containers.mainGameContainer);
  }

  private _appendGameBackground(): void {
    const image = Assets.get("dungeon_BG");
    const originalWidth = image.orig.width;
    const originalHeight = image.orig.height;

    const imageAspectRatio = originalWidth / originalHeight;

    const getScaleFactor = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const windowAspectRatio = windowWidth / windowHeight;
      const isMobile = windowWidth <= 768;
      const desktopZoomOut = 0.97;
      const baseScale =
        windowAspectRatio < imageAspectRatio
          ? windowHeight / originalHeight
          : windowWidth / originalWidth;

      return baseScale * (isMobile ? 1 : desktopZoomOut);
    };

    const { dungeon_BG } = GAME.config.getConfig();
    dungeon_BG.w = () => originalWidth * getScaleFactor();
    dungeon_BG.h = () => originalHeight * getScaleFactor();

    const maingBackgroundImage = new VSprite(dungeon_BG);
    maingBackgroundImage.sprite.anchor.set(0.5, 0);
  }

  //debug tool
  private _appendConsistentBackboard(): void {
    const { main_game_backboard } = GAME.config.getConfig();
    const mainGameBackboard = new TGraphics(main_game_backboard);
    mainGameBackboard.graphics.alpha = 0.5;
  }
}
