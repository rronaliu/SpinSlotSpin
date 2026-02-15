import { Block } from "../../Block";
import { GAME } from "../../../GAME";
import GameUI from "../../../dom/gameUI";

export class PlayerControlButton extends Block {
    private readonly onSpinButtonPress = this._onSpinButtonPress.bind(this);
    private handledSpin = false;

    constructor(name: string) {

        super(name);
    }

    start() {

       this._gameControlsVisible();
       this._spinButtonEventsOn();

        //end in button control click
    }

    private _gameControlsVisible(): void {

        GameUI.getInstance()?.showGameControlArea(true);
        GameUI.getInstance()?.showGameControls(true);
    }

    private _spinButtonEventsOn(): void {
        
        // spinButton event turned off end of gameReadyState
        GAME.events.spinButton.add(this.onSpinButtonPress);
    }
    
    private _onSpinButtonPress(): void {
        if (this.handledSpin) {
            return;
        }
        this.handledSpin = true;
        GAME.events.spinButton.remove(this.onSpinButtonPress);

        GAME.sound?.play('UI-pick');
        GameUI.getInstance()?.showGameControls(false);
        this.end();
    }

}
