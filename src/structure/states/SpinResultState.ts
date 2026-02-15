import { State } from "../State";
import { gameConfig, GAME } from "../../GAME";
import { GameState } from "./StateDefinitions";
import GameControlArea from "../../dom/gameControlArea";
import { getActiveSymbolIds } from "../../models/ReelModel";
import { AnimateReels } from "../blocks/spin-result/AnimateReels";
import { PositionStartOfSpin } from "../blocks/spin-result/PositionStartOfSpin";
import { SetSymbolsToReel } from "../blocks/game-ready/SetSymbolsToReel";
import { getRandomForcedResult } from "../../utils/ReelHelper";

export class SpinResultState extends State {

    private boundUpdateInfo?: () => void;

    setupEvents(): void {

        console.log("🎲--------------------SpinResultState---------------------🎲");
        this.boundUpdateInfo = this._updateGameInfo.bind(this);
        GAME.events.gameInfo.add(this.boundUpdateInfo);
    }

    modelChanges(): void {

        this._generateSpinResult();
    }

    setupBlocks(): void {

        this.blocks = [
            new SetSymbolsToReel("SetSymbolsToReel"),
            new PositionStartOfSpin("Position Start Of Spin"),
            new AnimateReels("Animate Reels")
        ];
    }

    removeEvents(): void {

        if (this.boundUpdateInfo) {
            GAME.events.gameInfo.remove(this.boundUpdateInfo);
        }
    }

    exitState(): void {

        GAME.states[GameState.GAME_OVER].enterState();
    }
    // ------------------------------------------------------

    private _generateSpinResult(): void {

        if (gameConfig.useForcedResult || this._randomDecideUseForcedResult()) {

            this._generateForcedSpinResult();
        } else {

            this._generateRandomSpinResult();
        }
    }

    private _randomDecideUseForcedResult(): boolean {

        const probability = gameConfig.probabilityFRChosen;
        return Math.floor(Math.random() * probability) + 1 === 1;
    }

    private _generateRandomDisplayRow(): string[] {

        const symbols = getActiveSymbolIds();
        var row = [];
        for (var x = 0; x < 4; x++) {

            row.push(symbols[Math.floor(Math.random() * symbols.length)]);
        }
        return row;
    }

    private _generateRandomSpinResult(): void {

        const { reel, result } = this.models;
        // Add 12 random filler rows
        for (var y = 0; y < 12; y++) {

            const randomRow = this._generateRandomDisplayRow();
            reel.reelDisplay.unshift(randomRow);
        }

        // Add 4 random result rows
        for (var y = 0; y < 4; y++) {

            const randomRow = this._generateRandomDisplayRow();
            reel.reelDisplay.unshift(randomRow);
            result.spinResult.unshift(randomRow);
        }
    }

    private _generateForcedSpinResult(): void {

        const { reel, result } = this.models;

        const randomForcedResult = getRandomForcedResult();
        //const randomForcedResult = FORCED_RESULTS[1].result;

        for (var y = 0; y < 12; y++) {

            const randomRow = this._generateRandomDisplayRow();
            reel.reelDisplay.unshift(randomRow);
        }

        // Add forced result at end (create deep copy to avoid mutating original)
        const resultCopy = randomForcedResult.result.map((row: string[]) => [...row]);
        // Add copy of forced result to reel display
        reel.reelDisplay.unshift(...resultCopy);
        result.spinResult = resultCopy;
    }

    private _updateGameInfo(): void {

        const { bet } = this.models;

        const gameControlArea = GameControlArea.getInstance();
        if (gameControlArea) {

            gameControlArea.setBankInfo(bet.betAmount, bet.bankBalance);
        }
    }
}
