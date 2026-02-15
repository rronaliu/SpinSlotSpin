
import { Block } from "../../Block";
import { GAME, getReelSize } from "../../../GAME";

export class PositionStartOfSpin extends Block {
   
    constructor(name: string) {
        super(name);
    }

    start() {

        this._secretlyMoveReels();
        this.end();
    }

    private _secretlyMoveReels(): void {
        const reelSize = getReelSize();
                
        GAME.containers.reelAContainer.y =- GAME.containers.reelAContainer.height;
        GAME.containers.reelAContainer.y += reelSize;

        GAME.containers.reelBContainer.y =- GAME.containers.reelBContainer.height;
        GAME.containers.reelBContainer.y += reelSize;

        GAME.containers.reelCContainer.y =- GAME.containers.reelCContainer.height;
        GAME.containers.reelCContainer.y += reelSize;

        GAME.containers.reelDContainer.y =- GAME.containers.reelDContainer.height;
        GAME.containers.reelDContainer.y += reelSize;
    }
}
