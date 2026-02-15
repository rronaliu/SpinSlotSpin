import { State } from "../State";
import { GAME, gameConfig } from "../../GAME";
import { GameState } from "./StateDefinitions";
import GameUI from "../../dom/gameUI";
import GameControlArea from "../../dom/gameControlArea";
import { CleanUpGame } from "../blocks/game-over/CleanUpGame";
import { SetSymbolsToReel } from "../blocks/game-ready/SetSymbolsToReel";
import { AnimateWinlines } from "../blocks/game-over/AnimateWinLines";
import { getActiveWinMultipliers } from "../../models/ReelModel";
import { WinAmountModal } from "../blocks/game-over/WinAmountModal";
import { Ticker } from "pixi.js";

export class GameOverState extends State {

    private _currentBet: number = 0;
    private _insufficientFunds: boolean = false;
    private _landedWinLines: string[] = [];
    private boundUpdateInfo?: () => void;
    
    setupEvents(): void {

        console.log("💀---------------------GameOverState----------------------💀");
        this.boundUpdateInfo = this._updateGameInfo.bind(this);
        GAME.events.gameInfo.add(this.boundUpdateInfo);
    }

    modelChanges(): void {

        this._resetWin();
        this._trimReelDisplay();
        this._checkWinLines();
        this._deductNextBet();
        this._awardPayout();
        this._checkInsufficientFunds();
    }

    setupBlocks(): void {

        this.blocks = [
            new CleanUpGame("Clean up reel overflow"),
            new SetSymbolsToReel("Set symbols to reel"),
            new AnimateWinlines("Animate Winlines"),
            new WinAmountModal("Win amount modal"),
        ];
    }

    removeEvents(): void {
        
        if (this.boundUpdateInfo) {
            GAME.events.gameInfo.remove(this.boundUpdateInfo);
        }
    }

    exitState(): void {

        if (this._insufficientFunds) {

            GameUI.getInstance()?.showPopup(true);
            this.models.progress.isPaused = true;
            const ticker = Ticker.shared;
            ticker.stop();
        }

        GAME.states[GameState.GAME_READY].enterState();
    }

    // -------------------------------------------------------------------------//

    private _resetWin() :void {

        this.models.result.isWin = false;
    }

    private _trimReelDisplay(): void {

        this.models.reel.reelDisplay = this.models.result.spinResult;
    }

    private _checkInsufficientFunds(): void {

        const { bet, result } = this.models;

        if(bet.bankBalance === 0 && bet.betAmount === 0 && !result.isWin) {
            this._insufficientFunds = true;
        }
    }

    private _deductNextBet(): void {

        const { bet } = this.models;

        // Store the original bet amount before any adjustments
        this._currentBet = bet.betAmount;

        if (bet.bankBalance < this._currentBet) {

            if (bet.bankBalance >= gameConfig.betChangeAmount) {

                bet.betAmount = gameConfig.betChangeAmount;
            } else {

                bet.betAmount = 0;
            }
        }

        // Deduct the bet amount
        if (bet.bankBalance >= bet.betAmount) {

            bet.bankBalance -= bet.betAmount;
        }
  
    }
    private _awardPayout(): void {

        const { bet, result } = this.models;
        const winMultipliers = getActiveWinMultipliers();

        if (result.isWin) {
            let totalWin = 0;
            
            for (const winLineKey of this._landedWinLines) {
                const pattern = result.winLines[winLineKey];
                let symbol: string | null = null;
                for (let row = 0; row < pattern.length; row++) {
                    for (let col = 0; col < pattern[row].length; col++) {
                        if (pattern[row][col] === "X") {
                            symbol = result.spinResult[row][col];
                            break;
                        }
                    }
                    if (symbol) break;
                }
                if (symbol && winMultipliers[symbol as keyof typeof winMultipliers]) {
                    const multiplier = winMultipliers[symbol as keyof typeof winMultipliers];
                    // Use this._currentBet for win calculations to handle insufficient funds case
                    const winForLine = this._currentBet * multiplier;
                    console.log(`💵 Win line ${winLineKey}: Symbol ${symbol}, Multiplier ${multiplier}, Win ${winForLine}`);
                    totalWin += winForLine;
                }
            }

            bet.bankBalance += totalWin;
            result.lastWinAmount = totalWin;
        }
    }

    private _checkWinLines(): void {

        const { result } = this.models;
        const { spinResult } = result;

        if (!spinResult || spinResult.length < 4) return;

        // Reset lines to animate and landed win lines
        result.linesToAnimate = [];
        this._landedWinLines = [];

        // Check each predefined win line
        Object.entries(result.winLines).forEach(([winLineKey, winLinePattern]) => {
            if (this._checkWinLinePattern(spinResult, winLinePattern)) {
                result.isWin = true;
                this._landedWinLines.push(winLineKey);

                // Add positions to animate based on win line type
                const positions = this._getPositionsForWinLine(winLineKey);
                result.linesToAnimate.push(...positions);
            }
        });
    }

    private _checkWinLinePattern(spinResult: string[][], pattern: string[][]): boolean {
        // Get all X positions from the pattern
        const xPositions: Array<{ row: number, col: number }> = [];

        for (let row = 0; row < pattern.length; row++) {
            for (let col = 0; col < pattern[row].length; col++) {
                if (pattern[row][col] === "X") {
                    xPositions.push({ row, col });
                }
            }
        }

        // Check if all X positions have the same symbol
        if (xPositions.length === 0) return false;

        const firstSymbol = spinResult[xPositions[0].row][xPositions[0].col];

        return xPositions.every(pos => spinResult[pos.row][pos.col] === firstSymbol);
    }

    private _getPositionsForWinLine(winLineKey: string): Array<{ reelIndex: number, symbolIndex: number }> {

        const positions: Array<{ reelIndex: number, symbolIndex: number }> = [];
        const pattern = this.models.result.winLines[winLineKey];

        // Find all X positions and convert to reel/symbol positions
        for (let row = 0; row < pattern.length; row++) {

            for (let col = 0; col < pattern[row].length; col++) {

                if (pattern[row][col] === "X") {
                    positions.push({ reelIndex: col, symbolIndex: row });
                }
            }
        }

        return positions;
    }

    private _updateGameInfo(): void {

        const { bet } = this.models;

        const gameControlArea = GameControlArea.getInstance();
    
        if (gameControlArea) {

            gameControlArea.setBankInfo(bet.betAmount, bet.bankBalance);
        }
    }

}
