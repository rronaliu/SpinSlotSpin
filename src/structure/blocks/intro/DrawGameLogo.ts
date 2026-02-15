import { GAME } from "../../../GAME";
import { Block } from "../../Block";
import { VSprite } from "../../../pixi/VSprite";

export class DrawGameLogo extends Block {

    constructor(name: string) {
        super(name);
    }

    start() {

        this._appendGameLogo();
        this.end();
    }
 
    private _appendGameLogo(): void {

        const { game_logo } = GAME.config.getConfig();   
        const gameLogoSprite = new VSprite(game_logo);
        gameLogoSprite.sprite.zIndex = 200;
    }

}
