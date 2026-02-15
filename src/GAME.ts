import { Application } from "pixi.js";
import { Models } from "./models/Models";
import { PIXI_CONFIG } from "./PIXI_CONFIG";
import { XContainer } from "./pixi/XContainer";
import { GameState } from "./structure/states/StateDefinitions";
import { SetupState } from "./structure/states/SetupState";
import { IntroState } from "./structure/states/IntroState";
import { GameReadyState } from "./structure/states/GameReadyState";
import { SpinResultState } from "./structure/states/SpinResultState";
import { GameOverState } from "./structure/states/GameOverState";
import { CustomEvent } from "./events/CustomEvent";
import { sound } from "@pixi/sound";
import { getHeightReelScaleMultiplier, getLayoutModel } from "./layout";
import {
  type SymbolDefinition,
  setActiveSymbolDefinitions,
  getDefaultReelDisplay
} from "./models/ReelModel";
import { getActivePaylines, setActivePaylines, type PaylineMap } from "./models/ResultModel";
import type {
  RuntimeThemeConfig,
  SymbolDefinitionInput,
  SymbolTierKey,
  SymbolTiersInput
} from "./theme/types";

type GameConfig = {
  gameWidth: number;
  gameHeight: number;
  reelScale: number;
  reelSpinSpeed: number;
  defaultBet: number;
  betChangeAmount: number;
  bankBalance: number;
  useForcedResult: boolean;
  useForcedResultIndex: number | undefined;
  probabilityFRChosen: number;
  showBlockConsole: boolean;
  showEventConsole: boolean;
  masksEnabled: boolean;
};

const DEFAULT_PAYOUT_BY_TIER: Record<SymbolTierKey, number> = {
  H: 10,
  M: 5,
  L: 3
};

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const isSymbolTier = (value: unknown): value is SymbolTierKey =>
  value === "H" || value === "M" || value === "L";

const normalizePaylineCell = (value: unknown): "X" | "0" =>
  value === "X" || value === 1 || value === "1" ? "X" : "0";

const normalizePaylineMatrix = (matrix: unknown): string[][] | null => {
  if (!Array.isArray(matrix) || matrix.length === 0) {
    return null;
  }

  const rows = matrix.map((row) => {
    if (!Array.isArray(row)) return null;
    return row.map((cell) => normalizePaylineCell(cell));
  });

  if (rows.some((row) => row === null)) {
    return null;
  }

  return rows as string[][];
};

const normalizePaylines = (
  paylines: RuntimeThemeConfig["paylines"]
): PaylineMap | null => {
  if (!paylines) return null;

  const normalized: PaylineMap = {};

  if (Array.isArray(paylines)) {
    paylines.forEach((line, index) => {
      const matrix = normalizePaylineMatrix(line);
      if (matrix) {
        normalized[String(index + 1)] = matrix;
      }
    });
  } else {
    Object.entries(paylines).forEach(([lineKey, line]) => {
      const matrix = normalizePaylineMatrix(line);
      if (matrix) {
        normalized[lineKey] = matrix;
      }
    });
  }

  return Object.keys(normalized).length > 0 ? normalized : null;
};

const normalizeSymbolsFromTierMap = (
  tierMap: SymbolTiersInput,
  payouts?: Record<string, number>
): SymbolDefinition[] => {
  const normalized: SymbolDefinition[] = [];

  (["H", "M", "L"] as SymbolTierKey[]).forEach((tier) => {
    const tierSymbols = tierMap[tier] ?? [];

    tierSymbols.forEach((entry) => {
      if (typeof entry === "string" && entry.trim()) {
        normalized.push({
          id: entry,
          tier,
          payout: payouts?.[entry] ?? DEFAULT_PAYOUT_BY_TIER[tier]
        });
        return;
      }

      if (typeof entry !== "object" || !entry || typeof entry.id !== "string") {
        return;
      }

      const resolvedTier = isSymbolTier(entry.tier) ? entry.tier : tier;
      const payout = isFiniteNumber(entry.payout)
        ? entry.payout
        : payouts?.[entry.id] ?? DEFAULT_PAYOUT_BY_TIER[resolvedTier];

      normalized.push({
        id: entry.id,
        tier: resolvedTier,
        payout
      });
    });
  });

  return normalized;
};

const normalizeSymbolsFromList = (
  symbolList: SymbolDefinitionInput[],
  payouts?: Record<string, number>
): SymbolDefinition[] => {
  const normalized: SymbolDefinition[] = [];

  symbolList.forEach((entry) => {
    if (!entry || typeof entry.id !== "string" || !isSymbolTier(entry.tier)) {
      return;
    }

    const payout = isFiniteNumber(entry.payout)
      ? entry.payout
      : payouts?.[entry.id] ?? DEFAULT_PAYOUT_BY_TIER[entry.tier];

    normalized.push({
      id: entry.id,
      tier: entry.tier,
      payout
    });
  });

  return normalized;
};

const normalizeSymbolDefinitions = (
  rawSymbols: RuntimeThemeConfig["symbolDefinitions"] | RuntimeThemeConfig["symbols"],
  payouts?: Record<string, number>
): SymbolDefinition[] => {
  if (!rawSymbols) {
    return [];
  }

  const symbols = Array.isArray(rawSymbols)
    ? normalizeSymbolsFromList(rawSymbols as SymbolDefinitionInput[], payouts)
    : normalizeSymbolsFromTierMap(rawSymbols as SymbolTiersInput, payouts);

  if (!symbols.length) return [];

  const seen = new Set<string>();
  return symbols.filter((entry) => {
    if (seen.has(entry.id)) {
      return false;
    }

    seen.add(entry.id);
    return true;
  });
};

export const gameConfig: GameConfig = {
  gameWidth: 320,
  gameHeight: 500,
  reelScale: 1,
  reelSpinSpeed: 19,
  defaultBet: 5,
  betChangeAmount: 5,
  bankBalance: 500,
  useForcedResult: false,
  useForcedResultIndex: undefined,
  probabilityFRChosen: 9,
  showBlockConsole: false,
  showEventConsole: false,
  masksEnabled: true
};

export const getReelSize = (): number =>
  gameConfig.gameWidth *
  gameConfig.reelScale *
  getLayoutModel().reelScaleMultiplier *
  getHeightReelScaleMultiplier();
export const getReelColumnWidth = (): number => getReelSize() / 4;

type GAME_Type = {
  states: {
    [GameState.SETUP]: SetupState;
    [GameState.INTRO]: IntroState;
    [GameState.GAME_READY]: GameReadyState;
    [GameState.GAME_OVER]: GameOverState;
    [GameState.SPIN_RESULT]: SpinResultState;
  };
  events: {
    audioToggle: CustomEvent<void>;
    volumeUp: CustomEvent<void>;
    volumeDown: CustomEvent<void>;
    blockComplete: CustomEvent<void>;
    redraw: CustomEvent<void>;
    tempRedraw: CustomEvent<void>;
    spinButton: CustomEvent<void>;
    gameInfo: CustomEvent<void>;
    changeBet: CustomEvent<number>;
    enableSound: CustomEvent<boolean>;
  };
  containers: {
    progressContainer: XContainer;
    splashContainer: XContainer;
    mainGameContainer: XContainer;
    masterReelContainer: XContainer;
    reelAContainer: XContainer;
    reelBContainer: XContainer;
    reelCContainer: XContainer;
    reelDContainer: XContainer;
    winPanelContainer: XContainer;
  };
  sound: typeof sound | undefined;
  app: Application;
  config: PIXI_CONFIG;
};

// Create a global models instance
export const GAME_MODELS = new Models();

// Create the global game instance with proper initialization
export const GAME: GAME_Type = {
  states: {
    [GameState.SETUP]: new SetupState(),
    [GameState.INTRO]: new IntroState(),
    [GameState.GAME_READY]: new GameReadyState(),
    [GameState.SPIN_RESULT]: new SpinResultState(),
    [GameState.GAME_OVER]: new GameOverState()
  },
  events: {
    audioToggle: new CustomEvent<void>("audio-toggle", true), // audio and visuals
    volumeUp: new CustomEvent<void>("volume-up"),
    volumeDown: new CustomEvent<void>("volume-down"),
    blockComplete: new CustomEvent<void>("block-complete"),
    redraw: new CustomEvent<void>("redraw", true),
    tempRedraw: new CustomEvent<void>("temp-redraw", true),
    spinButton: new CustomEvent<void>("spin-button"),
    gameInfo: new CustomEvent<void>("game-info", true),
    changeBet: new CustomEvent<number>("change-bet"),
    enableSound: new CustomEvent<boolean>("sound-enabled", true)
  },
  containers: {
    progressContainer: undefined as unknown as XContainer,
    splashContainer: undefined as unknown as XContainer,
    mainGameContainer: undefined as unknown as XContainer,
    masterReelContainer: undefined as unknown as XContainer,
    reelAContainer: undefined as unknown as XContainer,
    reelBContainer: undefined as unknown as XContainer,
    reelCContainer: undefined as unknown as XContainer,
    reelDContainer: undefined as unknown as XContainer,
    winPanelContainer: undefined as unknown as XContainer
  },
  sound: undefined,
  app: new Application(),
  config: new PIXI_CONFIG()
};

let hasStartedGame = false;

export const applyRuntimeGameConfig = (runtimeConfig: RuntimeThemeConfig | null): void => {
  if (!runtimeConfig) {
    return;
  }

  if (isFiniteNumber(runtimeConfig.gameWidth)) {
    gameConfig.gameWidth = runtimeConfig.gameWidth;
  }

  if (isFiniteNumber(runtimeConfig.gameHeight)) {
    gameConfig.gameHeight = runtimeConfig.gameHeight;
  }

  if (isFiniteNumber(runtimeConfig.reelScale)) {
    gameConfig.reelScale = runtimeConfig.reelScale;
  }

  if (isFiniteNumber(runtimeConfig.reelSpinSpeed)) {
    gameConfig.reelSpinSpeed = runtimeConfig.reelSpinSpeed;
  }

  if (isFiniteNumber(runtimeConfig.defaultBet)) {
    gameConfig.defaultBet = runtimeConfig.defaultBet;
  }

  if (isFiniteNumber(runtimeConfig.betChangeAmount)) {
    gameConfig.betChangeAmount = runtimeConfig.betChangeAmount;
  }

  if (isFiniteNumber(runtimeConfig.bankBalance)) {
    gameConfig.bankBalance = runtimeConfig.bankBalance;
  }

  if (typeof runtimeConfig.useForcedResult === "boolean") {
    gameConfig.useForcedResult = runtimeConfig.useForcedResult;
  }

  if (
    runtimeConfig.useForcedResultIndex === undefined ||
    isFiniteNumber(runtimeConfig.useForcedResultIndex)
  ) {
    gameConfig.useForcedResultIndex = runtimeConfig.useForcedResultIndex;
  }

  if (isFiniteNumber(runtimeConfig.probabilityFRChosen)) {
    gameConfig.probabilityFRChosen = runtimeConfig.probabilityFRChosen;
  }

  const normalizedSymbols = normalizeSymbolDefinitions(
    runtimeConfig.symbolDefinitions ?? runtimeConfig.symbols,
    runtimeConfig.payouts
  );

  if (normalizedSymbols.length) {
    setActiveSymbolDefinitions(normalizedSymbols);
  }

  const normalizedPaylines = normalizePaylines(runtimeConfig.paylines);
  if (normalizedPaylines) {
    setActivePaylines(normalizedPaylines);
  }

  GAME_MODELS.bet.betAmount = gameConfig.defaultBet;
  GAME_MODELS.bet.bankBalance = Math.max(0, gameConfig.bankBalance - gameConfig.defaultBet);
  GAME_MODELS.reel.reelDisplay = getDefaultReelDisplay();
  GAME_MODELS.result.spinResult = getDefaultReelDisplay();
  GAME_MODELS.result.winLines = getActivePaylines();
};

export const startGame = (): void => {
  if (hasStartedGame) {
    return;
  }

  hasStartedGame = true;
  GAME.states[GameState.SETUP].enterState();
};
