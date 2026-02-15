import { gameConfig, GAME, getReelColumnWidth, getReelSize } from "./GAME";
import { Texture } from "pixi.js";
import { getGameLayout, getLayoutModel } from "./layout";

export class PIXI_CONFIG {
  public getConfig() {
    const reelSize = getReelSize();
    const reelColumnWidth = getReelColumnWidth();

    return {
      progress_container: {
        label: "progress-container",
        x: () => window.innerWidth / 2,
        y: () => window.innerHeight / 2
      },
      loading_background_bar: {
        label: "loading-background-bar",
        parent: GAME.containers.progressContainer,
        pivot: 0,
        w: () => 300,
        h: () => 4,
        x: () => -150,
        y: () => -10,
        color: 0x6a6a6a
      },
      progress_bar: {
        label: "progress-bar",
        parent: GAME.containers.progressContainer,
        pivot: 0,
        w: () => 1,
        h: () => 4,
        x: () => -150,
        y: () => -10,
        color: 0xff0000
      },
      progress_text: {
        style: {
          fontFamily: "Lato, sans-serif",
          fontSize: 100,
          fill: 0xffffff,
          align: "center" as const,
          fontWeight: "normal" as const
        },
        scale: 0.2,
        anchor: 0.5,
        position: {
          x: 0,
          y: 30
        }
      },
      splash_container: {
        label: "splash-container",
        x: () => window.innerWidth / 2 - gameConfig.gameWidth / 2,
        y: () => window.innerHeight / 2 - gameConfig.gameHeight / 2
      },
      intro_BG: {
        label: "intro_BG",
        parent: GAME.containers.splashContainer,
        textureKey: "intro_BG",
        anchor: 0,
        w: () => gameConfig.gameWidth,
        h: () => gameConfig.gameHeight,
        x: () => 0,
        y: () => 0,
        click: () => {}
      },
      main_game_container: {
        label: "master-reel-container",
        x: () => 0,
        y: () => 0
      },
      dungeon_BG: {
        label: "dungeon_BG",
        parent: GAME.containers.mainGameContainer,
        textureKey: "dungeon_BG",
        anchor: 0,
        w: () => 1,
        h: () => 1,
        x: () => window.innerWidth / 2 + 10,
        y: () => 0
      },
      main_game_backboard: {
        label: "main-game-backboard",
        parent: GAME.containers.mainGameContainer,
        pivot: 0.5,
        w: () => gameConfig.gameWidth,
        h: () => window.innerHeight,
        x: () => window.innerWidth / 2,
        y: () => window.innerHeight / 2,
        color: 0xff0000
      },
      game_logo: {
        label: "game-logo",
        parent: GAME.containers.mainGameContainer,
        textureKey: "game_logo",
        anchor: 0.5,
        w: () => getLayoutModel().logoWidth,
        h: () => getLayoutModel().logoHeight,
        x: () => getGameLayout(reelSize).centerX,
        y: () => getGameLayout(reelSize).logoY
      },
      game_frame: {
        label: "game-frame",
        parent: GAME.containers.mainGameContainer,
        textureKey: "game_frame",
        anchor: 0.5,
        w: () => 400 * 1.2,
        h: () => 396 * 1.2,
        x: () => window.innerWidth / 2,
        y: () => window.innerHeight / 2
      },
      reel_background: {
        label: "reel-background",
        parent: GAME.containers.mainGameContainer,
        textureKey: "reel_background",
        anchor: 0.5,
        w: () => reelSize * 1.9,
        h: () => reelSize * 1.9,
        x: () => getGameLayout(reelSize).centerX,
        y: () =>
          getGameLayout(reelSize).reelCenterY +
          getLayoutModel().reelBackgroundOffsetY
      },
      reel_backboard: {
        label: "reel-backboard",
        parent: GAME.containers.masterReelContainer,
        pivot: 0,
        w: () => reelSize,
        h: () => reelSize,
        x: () => 0,
        y: () => 0,
        color: 0xff0000
      },
      reel_A_backboard: {
        label: "reel-A-backboard",
        parent: GAME.containers.reelAContainer,
        pivot: 0,
        w: () => reelColumnWidth,
        h: () => reelSize,
        x: () => 0,
        y: () => 0,
        color: 0xff00ff
      },
      master_reel_container: {
        label: "master-reel-container",
        x: () => getGameLayout(reelSize).centerX - reelSize / 2,
        y: () => getGameLayout(reelSize).reelTopY
      },
      master_reel_container_mask: {
        label: "master-reel-container-mask",
        parent: GAME.containers.masterReelContainer,
        pivot: 0,
        w: () => reelSize,
        h: () => reelSize,
        x: () => 0,
        y: () => 0,
        color: 0xf0f0f0
      },
      reel_A_container: {
        label: "reel-A-container",
        x: () => 0,
        y: () => 0
      },
      reel_B_container: {
        label: "reel-B-container",
        x: () => reelColumnWidth,
        y: () => 0
      },
      reel_C_container: {
        label: "reel-C-container",
        x: () => reelColumnWidth * 2,
        y: () => 0
      },
      reel_D_container: {
        label: "reel-D-container",
        x: () => reelColumnWidth * 3,
        y: () => 0
      },
      animation_default: {
        label: "animation-test",
        textures: [] as Texture[],
        x: () => 0,
        y: () => 0,
        width: () => reelColumnWidth,
        height: () => reelColumnWidth,
        animationSpeed: 0.1,
        loop: true,
        altEvent: GAME.events.tempRedraw
      },
      win_text_panel: {
        label: "bank_panel-transparent",
        parent: GAME.containers.winPanelContainer,
        pivot: 0,
        w: () => reelSize,
        h: () => reelSize,
        x: () => 0 - 10,
        y: () => 0,
        click: () => {},
        color: 0x00000000,
        isTransparent: true
      },
      win_text_container: {
        label: "win-text-container",
        x: () => getGameLayout(reelSize).centerX - reelSize / 2,
        y: () =>
          getGameLayout(reelSize).reelTopY +
          getGameLayout(reelSize).winTextOffsetY
      },
      decorative_animation: {
        label: "decorative-animation",
        textures: [] as Texture[],
        x: () => gameConfig.gameWidth + gameConfig.gameWidth / 6,
        y: () => gameConfig.gameHeight / 2 - gameConfig.gameWidth / 3,
        width: () => gameConfig.gameWidth / 3,
        height: () => gameConfig.gameWidth / 3,
        animationSpeed: 0.1,
        loop: true
      }
    };
  }
}
