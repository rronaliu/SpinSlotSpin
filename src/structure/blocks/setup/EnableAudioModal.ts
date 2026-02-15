import GameUI from "../../../dom/gameUI";
import { GAME } from "../../../GAME";
import { Block } from "../../Block";

export class EnableAudioModal extends Block {

    private boundClose?: () => void;

    constructor(name: string) {
        super(name);
    }

    start() {

        GameUI.getInstance()?.showAudioPopup(true);
        this._progressAfterAudioModal();
    }

    private _progressAfterAudioModal(): void {
      
        this.boundClose = this._onModalClose.bind(this);
        GAME.events.enableSound.add(this.boundClose);
    }

    private _onModalClose(): void {
        
        console.log("🎛️-----------------------EnableAudioModal-----------------------🎛️");
        if (this.boundClose) {
            GAME.events.enableSound.remove(this.boundClose);
        }
        this.end();
    }
}
