
import { Ticker } from "pixi.js";
import { Block } from "../../Block";
import { gameConfig, GAME, getReelSize } from "../../../GAME";
import { XContainer } from "../../../pixi/XContainer";

export class AnimateReels extends Block {

    private reelTickers: Ticker[] = [];
    private completedReels: number = 0;
    private totalReels: number = 4;

    constructor(name: string) {
        super(name);
    }

    start() {

        this._setupReelAnimationSpeeds();
        // end in last animation complete
    }

    private _setupReelAnimationSpeeds(): void {
        const { reelAContainer, reelBContainer, reelCContainer, reelDContainer } = GAME.containers;

        // Configuration for reel timing and speeds (randomized)
        const reelConfig = [
            { container: reelAContainer, delay: 0, speed: 0.8 + Math.random() * 0.6 },
            { container: reelBContainer, delay: 100 + Math.random() * 300, speed: 0.8 + Math.random() * 0.6 },
            { container: reelCContainer, delay: 200 + Math.random() * 400, speed: 0.8 + Math.random() * 0.6 },
            { container: reelDContainer, delay: 300 + Math.random() * 500, speed: 0.8 + Math.random() * 0.6 }
        ];

        // Start each reel with its configuration
        reelConfig.forEach(config => {

            setTimeout(() => {

                this._startAnimation(config.container, config.speed);
            }, config.delay);
        });
    }

    private _startAnimation(individualReelContainer: XContainer, speedMultiplier: number = 1.0): void {

        const endPos = (individualReelContainer.y + individualReelContainer.height) - getReelSize();
        const ticker = new Ticker();
        this.reelTickers.push(ticker);
        ticker.add(() => this._moveReel(endPos, individualReelContainer, ticker, speedMultiplier));

        ticker.start();
    }

    private _moveReel(stopPos: number, reelToMove: XContainer, ticker: Ticker, speedMultiplier: number = 1.0): void {

        if (reelToMove.position.y < stopPos) {
            reelToMove.position.y += gameConfig.reelSpinSpeed * speedMultiplier * ticker.deltaTime;
        }
        if (reelToMove.position.y >= stopPos) {
            reelToMove.position.y = stopPos;

            GAME.sound?.volume('reel-thud', 0.1 + Math.random() * 0.8);
            GAME.sound?.play('reel-thud');
            ticker.stop();
            ticker.destroy();

            // Track completion and end when all reels are done
            this.completedReels++;

            if (this.completedReels >= this.totalReels) {

                this.end();
            }
        }
    }

}
