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

// Enter the setup state
GAME.states[GameState.SETUP].enterState();
