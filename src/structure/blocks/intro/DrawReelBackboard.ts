import { GAME } from "../../../GAME";
import { Block } from "../../Block";
import { XContainer } from "../../../pixi/XContainer";
import { VSprite } from "../../../pixi/VSprite";

export class DrawReelBackboard extends Block {
  constructor(name: string) {
    super(name);
  }

  start() {
    this._appendReelBackboard();
    this.end();
  }

  private _appendReelBackboard(): void {
    const { master_reel_container } = GAME.config.getConfig();
    GAME.containers.masterReelContainer = new XContainer(master_reel_container);

    const { reel_background } = GAME.config.getConfig();
    const reelBackgroundSprite = new VSprite(reel_background);
    reelBackgroundSprite.sprite.tint = 0xd0d0d0;

    const { mainGameContainer } = GAME.containers;
    mainGameContainer.addChild(GAME.containers.masterReelContainer);
  }
}
