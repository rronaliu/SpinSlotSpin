import { Block } from "../../Block";
import { GAME } from "../../../GAME";
import { Text, Ticker } from "pixi.js";
import { TGraphics } from "../../../pixi/TGraphics";

export class WinAmountModal extends Block {
  private _skipAnimation: boolean = false;

  constructor(name: string) {
    super(name);
  }

  start() {
    const { isWin, lastWinAmount } = this.models.result;
    // either draw the bank panel on a win...
    if (isWin && lastWinAmount > 0) {
      this._drawBankPanel();
    } else {
      //... or just continue
      GAME.events.gameInfo.dispatch();
      this.end();
    }
  }

  private _drawBankPanel(): void {
    const { lastWinAmount } = this.models.result;

    var countValue = 0;
    var frequency = 0;
    const { win_text_panel } = GAME.config.getConfig();

    const basicText = new Text({
      text: `BANK\n$${countValue.toString()}`,
      style: {
        fontFamily: "NicoPaint",
        fontSize: 24,
        stroke: 0x000000,
        strokeThickness: 4,
        fill: 0xffffff,
        align: "center"
      }
    });

    const bankPanel = new TGraphics(win_text_panel);
    bankPanel.graphics.cursor = "pointer";
    bankPanel.graphics.zIndex = 20;

    const skipAnimation = () => {
      this._skipAnimation = true;
      window.removeEventListener("click", skipAnimation);
      window.addEventListener("click", handleClick);
    };

    // Add click event handler
    const handleClick = () => {
      GAME.sound?.stop("coin-count-loop");
      GAME.sound?.play("coin-flung");
      countUpTicker.stop();
      countUpTicker.destroy();
      GAME.containers.winPanelContainer.children.forEach(child =>
        child.destroy()
      );
      GAME.containers.winPanelContainer.removeChildren();
      window.removeEventListener("click", handleClick);
      GAME.events.gameInfo.dispatch();
      this.end();
    };

    window.addEventListener("click", skipAnimation);

    // Add both the background panel and the text
    GAME.containers.winPanelContainer.addChild(bankPanel.graphics);
    GAME.containers.winPanelContainer.addChild(basicText);

    // Position the text in the center of the panel
    basicText.position.y = bankPanel.graphics.height / 2;
    basicText.position.x = bankPanel.graphics.width / 2;
    basicText.anchor.set(0.5);

    // Scale Animation configuration
    const minScale = 2.5; // smallest we want the scale
    const maxScale = 3.2; // largest we want it
    const frequencyChange = 0.05; // How fast the animation progresses

    var countUpTicker = new Ticker();

    countUpTicker.add(() => {
      const normalizedSine = (Math.sin(frequency) + 1) / 2; // Convert from [-1,1] to [0,1]
      const scale = minScale + (maxScale - minScale) * normalizedSine;

      if (countValue < lastWinAmount && !this._skipAnimation) {
        countValue++;
        frequency += frequencyChange;
        basicText.scale.set(scale);
        basicText.text = `WIN\n$${countValue.toString()}`;
      } else {
        window.removeEventListener("click", skipAnimation);
        window.addEventListener("click", handleClick);
        basicText.scale.set(maxScale);
        basicText.text = `WIN\n$${lastWinAmount}`;
        GAME.sound?.stop("coin-count-loop");
        countUpTicker.stop();
      }
    });

    GAME.sound?.play("coin-count-loop", {
      loop: true
    });

    countUpTicker.start();
  }
}
