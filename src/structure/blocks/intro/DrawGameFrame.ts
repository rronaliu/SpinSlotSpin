import { GAME } from "../../../GAME";
import { Block } from "../../Block";
import { VSprite } from "../../../pixi/VSprite";

export class DrawGameFrame extends Block {

    constructor(name: string) {
        super(name);
    }

    start() {

        this._appendGameFrame();
        this.end();
    }
 
    private _appendGameFrame(): void {

        const { game_frame } = GAME.config.getConfig();
        const gameFrameSprite = new VSprite(game_frame);
    }
}
