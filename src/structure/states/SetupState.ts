import { State } from "../State";
import { GAME } from "../../GAME";
import { GameState } from "./StateDefinitions";
import { AssetLoad } from "../blocks/setup/AssetLoad";
import { EnableAudioModal } from "../blocks/setup/EnableAudioModal";
import { SetupSounds } from "../blocks/setup/SetupSounds";

export class SetupState extends State {

    private boundEnableSound?: (enableSound: boolean) => void;

    setupEvents(): void {

        console.log("🎛️-----------------------SetupState-----------------------🎛️");
        this.boundEnableSound = this._enableAudioProperty.bind(this);
        GAME.events.enableSound.add(this.boundEnableSound);
    }

    modelChanges(): void {
        //
    }

    setupBlocks(): void {

        this.blocks = [
            new AssetLoad("asset load step"),
            new EnableAudioModal("Enable Audio Modal"),
            new SetupSounds("Setup Sounds")
        ];
    }

    removeEvents(): void {

        if (this.boundEnableSound) {
            GAME.events.enableSound.remove(this.boundEnableSound);
        }
    }

    exitState(): void {

        GAME.states[GameState.INTRO].enterState();
    }

    // -------------------------------------------------------------------------//
    private _enableAudioProperty(enableSound: boolean): void {

        this.models.progress.playWithSound = enableSound;
        // GAME.sound will be set in SetupSounds block when sound library is loaded
    }
}
