import { Block } from "../../Block";
import { GAME } from "../../../GAME";

const assetUrl = (path: string): string =>
    new URL(`../../../assets/${path}`, import.meta.url).href;

export class SetupSounds extends Block {

    constructor(name: string) {
        super(name);
    }

    start() {

        if (this.models.progress.playWithSound) {
            this.setupSounds();
        }
        this.end();
    }

    private setupSounds(): void {
        // Load sound library dynamically after user interaction
        import('@pixi/sound').then(({ sound }) => {
            // Assign the sound library to GAME.sound so it can be accessed elsewhere
            GAME.sound = sound;
            
            // BUTTON SFX
            sound.add('UI-pick', assetUrl('audio/SFX/BUTTON_12.wav'));
            sound.volume('UI-pick', 0.01);

            //MUSIC
            sound.add('music-1', assetUrl('audio/music/trap-music-med.mp3'));
            sound.volume('music-1', 0.1);

            //REEL SFX
            sound.add('reel-thud', assetUrl('audio/SFX/light-thud-super-low.mp3'));
            sound.volume('reel-thud', 0.6);

            // GAME EVENTS
            sound.add('coin-count-loop', assetUrl('audio/SFX/coin-loop-detuned.wav'));
            sound.volume('coin-count-loop', 0.05);

            sound.add('coin-flung', assetUrl('audio/SFX/coin-flung-med.mp3'));
            sound.volume('coin-flung', 0.2);

            sound.play('music-1', {
                loop: true,
            });
        });
    }
}
