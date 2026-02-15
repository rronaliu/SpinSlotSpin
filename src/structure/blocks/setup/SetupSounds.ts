import { Block } from "../../Block";
import { GAME } from "../../../GAME";
import { resolveThemeAssetUrl } from "../../../theme/runtimeTheme";

const assetUrl = (path: string): string =>
    new URL(`../../../assets/${path}`, import.meta.url).href;

const resolveAssetUrl = (keys: string[], fallbackPath: string): string =>
    resolveThemeAssetUrl(keys, fallbackPath) ?? assetUrl(fallbackPath);

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

            const upsertSound = (alias: string, url: string, volume: number): void => {
                if (sound.exists(alias)) {
                    sound.stop(alias);
                    sound.remove(alias);
                }
                sound.add(alias, url);
                sound.volume(alias, volume);
            };
            
            // BUTTON SFX
            upsertSound('UI-pick', resolveAssetUrl(
                ['UI-pick', 'uiPick', 'BUTTON_12.wav'],
                'audio/SFX/BUTTON_12.wav'
            ), 0.01);

            //MUSIC
            upsertSound('music-1', resolveAssetUrl(
                ['music-1', 'music1', 'trap-music-med.mp3'],
                'audio/music/trap-music-med.mp3'
            ), 0.1);

            //REEL SFX
            upsertSound('reel-thud', resolveAssetUrl(
                ['reel-thud', 'reelThud', 'light-thud-super-low.mp3'],
                'audio/SFX/light-thud-super-low.mp3'
            ), 0.6);

            // GAME EVENTS
            upsertSound('coin-count-loop', resolveAssetUrl(
                ['coin-count-loop', 'coinCountLoop', 'coin-loop-detuned.wav'],
                'audio/SFX/coin-loop-detuned.wav'
            ), 0.05);

            upsertSound('coin-flung', resolveAssetUrl(
                ['coin-flung', 'coinFlung', 'coin-flung-med.mp3'],
                'audio/SFX/coin-flung-med.mp3'
            ), 0.2);

            sound.play('music-1', {
                loop: true,
            });
        });
    }
}
