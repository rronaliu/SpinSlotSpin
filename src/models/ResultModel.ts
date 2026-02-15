export type PaylineMap = Record<string, string[][]>;

import { getDefaultReelDisplay } from "./ReelModel";

export const DEFAULT_PAYLINES: PaylineMap = {
  "1": [
    ["X", "X", "X", "X"],
    ["0", "0", "0", "0"],
    ["0", "0", "0", "0"],
    ["0", "0", "0", "0"]
  ],
  "2": [
    ["0", "0", "0", "0"],
    ["X", "X", "X", "X"],
    ["0", "0", "0", "0"],
    ["0", "0", "0", "0"]
  ],
  "3": [
    ["0", "0", "0", "0"],
    ["0", "0", "0", "0"],
    ["X", "X", "X", "X"],
    ["0", "0", "0", "0"]
  ],
  "4": [
    ["0", "0", "0", "0"],
    ["0", "0", "0", "0"],
    ["0", "0", "0", "0"],
    ["X", "X", "X", "X"]
  ],
  "5": [
    ["X", "0", "0", "0"],
    ["X", "0", "0", "0"],
    ["X", "0", "0", "0"],
    ["X", "0", "0", "0"]
  ],
  "6": [
    ["0", "X", "0", "0"],
    ["0", "X", "0", "0"],
    ["0", "X", "0", "0"],
    ["0", "X", "0", "0"]
  ],
  "7": [
    ["0", "0", "X", "0"],
    ["0", "0", "X", "0"],
    ["0", "0", "X", "0"],
    ["0", "0", "X", "0"]
  ],
  "8": [
    ["0", "0", "0", "X"],
    ["0", "0", "0", "X"],
    ["0", "0", "0", "X"],
    ["0", "0", "0", "X"]
  ],
  "9": [
    ["X", "0", "0", "0"],
    ["0", "X", "0", "0"],
    ["0", "0", "X", "0"],
    ["0", "0", "0", "X"]
  ],
  "10": [
    ["0", "0", "0", "X"],
    ["0", "0", "X", "0"],
    ["0", "X", "0", "0"],
    ["X", "0", "0", "0"]
  ]
};

let activePaylines: PaylineMap = JSON.parse(JSON.stringify(DEFAULT_PAYLINES));

export const setActivePaylines = (paylines: PaylineMap): void => {
  if (!Object.keys(paylines).length) {
    activePaylines = JSON.parse(JSON.stringify(DEFAULT_PAYLINES));
    return;
  }

  activePaylines = JSON.parse(JSON.stringify(paylines));
};

export const getActivePaylines = (): PaylineMap =>
  JSON.parse(JSON.stringify(activePaylines));

const getDefaultSpinResult = (): string[][] => getDefaultReelDisplay();

export class Resultmodel {
  isWin: boolean = false;
  spinResult: string[][] = getDefaultSpinResult();
  linesToAnimate: Array<{ reelIndex: number; symbolIndex: number }> = [];
  winLines: PaylineMap = getActivePaylines();
  lastWinAmount: number = 0;
}
