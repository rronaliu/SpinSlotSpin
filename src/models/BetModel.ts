import { gameConfig } from "../GAME";

export class BetModel {
    betAmount: number = gameConfig.defaultBet;
    bankBalance: number = gameConfig.bankBalance - gameConfig.defaultBet; // your bank balance should include the bet amount
}