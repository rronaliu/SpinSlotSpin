import { GAME, gameConfig } from "../../../GAME";
import { Block } from "../../Block";
import { TGraphics } from "../../../pixi/TGraphics";
import { XContainer } from "../../../pixi/XContainer";

export class DrawReelContainers extends Block {

    constructor(name: string) {
        super(name);
    }

    start() {

        this._appendReels();
        this._winPanelContainer();

        this.end();
    }

    private _winPanelContainer(): void {

        const { win_text_container } = GAME.config.getConfig();
        GAME.containers.winPanelContainer = new XContainer(win_text_container);

        GAME.app.stage.addChild(GAME.containers.winPanelContainer);
    }

    private _appendReels(): void {

        const { masterReelContainer, mainGameContainer } = GAME.containers;
        const { reel_A_container } = GAME.config.getConfig();
        GAME.containers.reelAContainer = new XContainer(reel_A_container);

        const { reel_B_container } = GAME.config.getConfig();
        GAME.containers.reelBContainer = new XContainer(reel_B_container);

        const { reel_C_container } = GAME.config.getConfig();
        GAME.containers.reelCContainer = new XContainer(reel_C_container);

        const { reel_D_container } = GAME.config.getConfig();
        GAME.containers.reelDContainer = new XContainer(reel_D_container);

        const { master_reel_container_mask } = GAME.config.getConfig();
        const masterReelContainerMask = new TGraphics(master_reel_container_mask);
        
        if(gameConfig.masksEnabled) {
            masterReelContainer.mask = masterReelContainerMask.graphics;
        }

        masterReelContainer.addChild(GAME.containers.reelAContainer);
        masterReelContainer.addChild(GAME.containers.reelBContainer);
        masterReelContainer.addChild(GAME.containers.reelCContainer);
        masterReelContainer.addChild(GAME.containers.reelDContainer);
    }

}
