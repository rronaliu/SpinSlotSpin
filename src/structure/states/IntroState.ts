import { State } from "../State";
import { GAME } from "../../GAME";
import { GameState } from "./StateDefinitions";
import GameUI from "../../dom/gameUI";
import { DrawSplashContainer } from "../blocks/intro/DrawSplashContainer";
import { DrawMainGameContainer } from "../blocks/intro/DrawMainGameContainer";
import { DrawGameFrame } from "../blocks/intro/DrawGameFrame";
import { DrawGameLogo } from "../blocks/intro/DrawGameLogo";
import { DrawReelBackboard } from "../blocks/intro/DrawReelBackboard";
import { DrawReelContainers } from "../blocks/intro/DrawReelContainers";

export class IntroState extends State {
  private boundToggleAudio?: () => void;
  private boundVolumeUp?: () => void;
  private boundVolumeDown?: () => void;

  setupEvents(): void {
    console.log("🌟-----------------------IntroState-----------------------🌟");
    this.boundToggleAudio = this._toggleAudio.bind(this);
    this.boundVolumeUp = this._volumeUp.bind(this);
    this.boundVolumeDown = this._volumeDown.bind(this);
    GAME.events.audioToggle.add(this.boundToggleAudio);
    GAME.events.volumeUp.add(this.boundVolumeUp);
    GAME.events.volumeDown.add(this.boundVolumeDown);
  }

  modelChanges(): void {
    //
  }

  setupBlocks(): void {
    this.blocks = [
      new DrawSplashContainer("Draw Splash Container"),
      new DrawMainGameContainer("Draw Main Game Container"),
      new DrawGameLogo("Draw game logo"),
      // new DrawGameFrame("Draw game frame"),
      new DrawReelBackboard("Draw reel backboard"),
      new DrawReelContainers("Draw reel containers")
    ];
  }

  removeEvents(): void {
    if (this.boundToggleAudio) {
      GAME.events.audioToggle.remove(this.boundToggleAudio);
    }
    if (this.boundVolumeUp) {
      GAME.events.volumeUp.remove(this.boundVolumeUp);
    }
    if (this.boundVolumeDown) {
      GAME.events.volumeDown.remove(this.boundVolumeDown);
    }
  }

  exitState(): void {
    GameUI.getInstance()?.showMenuAudio(true);
    GAME.states[GameState.GAME_READY].enterState();
  }
  // -------------------------------------------------------------------------//

  private _toggleAudio(): void {
    console.log(
      "🔊-----------------------Audio Toggled-----------------------🔊"
    );
    if (GAME.sound) {
      GAME.sound.toggleMuteAll();
    }
  }

  private _volumeUp(): void {
    console.log("🔊-----------------------Volume Up-----------------------🔊");
    if (GAME.sound) {
      GAME.sound.volumeAll += 0.5;
    }
  }

  private _volumeDown(): void {
    console.log(
      "🔊-----------------------Volume Down-----------------------🔊"
    );
    if (GAME.sound) {
      GAME.sound.volumeAll -= 0.5;
    }
  }
}
