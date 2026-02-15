import { State } from "../State";
import { gameConfig, GAME } from "../../GAME";
import { GameState } from "./StateDefinitions";
import GameControlArea from "../../dom/gameControlArea";
import { PlayerControlButton } from "../blocks/game-ready/PlayerControlButtons";
import { SetSymbolsToReel } from "../blocks/game-ready/SetSymbolsToReel";
import { AnimateOccasional } from "../blocks/game-ready/AnimateOccasional";

export class GameReadyState extends State {

    private boundUpdateBet?: (betChange: number) => void;
    private boundUpdateInfo?: () => void;

    setupEvents(): void {

        console.log("🎮---------------------GameReadyState---------------------🎮");

        const { events } = GAME;
        this.boundUpdateBet = this._updateBet.bind(this);
        this.boundUpdateInfo = this._updateGameInfo.bind(this);
        events.changeBet.add(this.boundUpdateBet);
        events.gameInfo.add(this.boundUpdateInfo);
    }

    modelChanges(): void {

        this._prepareDisplayReel();
        this._resetLastWinAmount();
    }

    setupBlocks(): void {

        this.blocks = [
            new SetSymbolsToReel("Set symbols to reel"),
            new AnimateOccasional("Animate occasional"),
            new PlayerControlButton("Player control button"),
        ];
    }

    removeEvents(): void {

        const { events } = GAME;

        if (this.boundUpdateBet) events.changeBet.remove(this.boundUpdateBet);
        if (this.boundUpdateInfo) events.gameInfo.remove(this.boundUpdateInfo);
    }

    exitState(): void {

        GAME.states[GameState.SPIN_RESULT].enterState();
    }

    //-----------------------------------------------------------------------------------//

    private _prepareDisplayReel(): void {

        const { reel, result } = this.models;

        reel.reelDisplay = [];
        reel.reelDisplay = result.spinResult;
        result.spinResult = [];
    }

    private _resetLastWinAmount(): void {

        this.models.result.lastWinAmount = 0;
    }

    private _updateBet(betChange: number): void {

        const { bet } = this.models;
        const { events } = GAME;
        
        GAME.sound?.play('UI-pick');

        if (betChange === 1) {
            const dynamicChangeAmount = bet.betAmount >= 50 ? 50 : gameConfig.betChangeAmount;
            
            const potentialSpend = ((bet.bankBalance + bet.betAmount) / dynamicChangeAmount) * dynamicChangeAmount;

            var incremementsRemaining = ((potentialSpend - bet.betAmount) / dynamicChangeAmount);
            if (incremementsRemaining >= 1) {

                bet.betAmount += dynamicChangeAmount;
                bet.bankBalance -= dynamicChangeAmount;
            }
        }

        if (betChange === -1) {

            const dynamicChangeAmount = bet.betAmount > 50 ? 50 : gameConfig.betChangeAmount;
            var decremementsRemaining = bet.betAmount / dynamicChangeAmount;
            if (decremementsRemaining > 1) {

                bet.betAmount -= dynamicChangeAmount;
                bet.bankBalance += dynamicChangeAmount;
            }
        }

        events.gameInfo.dispatch();
    }

    private _updateGameInfo(): void {

        const { bet } = this.models;

        const gameControlArea = GameControlArea.getInstance();

        if (gameControlArea) {

            gameControlArea.setBankInfo(bet.betAmount, bet.bankBalance);
        }
    }
}
