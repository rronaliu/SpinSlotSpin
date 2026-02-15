import React, { Component } from "react";
import WinLine from "./WinLine";
import { getThemeAssetUrl } from "../theme/runtimeTheme";

const uiImage = (fileName: string): string =>
  new URL(`../assets/images/UI/${fileName}`, import.meta.url).href;

const menuSymbolImage = (themeKey: string, fallbackFileName: string): string =>
  getThemeAssetUrl(themeKey) ?? uiImage(fallbackFileName);

export default class MenuContent extends Component {
  render() {
    const high1 = menuSymbolImage("high-tier-symbol-1", "dragon.png");
    const high2 = menuSymbolImage("high-tier-symbol-2", "geisha.png");
    const high3 = menuSymbolImage("high-tier-symbol-3", "helmet.png");
    const mid1 = menuSymbolImage("mid-tier-symbol-1", "katana.png");
    const mid2 = menuSymbolImage("mid-tier-symbol-2", "koi.png");
    const mid3 = menuSymbolImage("mid-tier-symbol-3", "kunai.png");
    const low1 = menuSymbolImage("low-tier-symbol-1", "sakura.png");
    const low2 = menuSymbolImage("low-tier-symbol-2", "coins.png");
    const low3 = menuSymbolImage("low-tier-symbol-3", "lantern.png");

    return (
      <>
        <h2 className="burger-menu__content">HIGH VALUE</h2>
        <p>Multiplies your bet by 10x</p>
        <img src={high1} />
        <img src={high2} />
        <img src={high3} />
        <h2 className="burger-menu__content">MID VALUE</h2>
        <p>Multiplies your bet by 5x</p>
        <img src={mid1} />
        <img src={mid2} />
        <img src={mid3} />
        <h2 className="burger-menu__content">LOW VALUE</h2>
        <p>Multiplies your bet by 3x</p>
        <img src={low1} />
        <img src={low2} />
        <img src={low3} />
        <h2 className="burger-menu__content">WIN LINES</h2>
        <p>Land 4 identical symbols in any of the configurations below</p>
        <div className="win-line__container">
          <WinLine
            winLines={[
              [1, 1, 1, 1],
              [0, 0, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0]
            ]}
          />
          <WinLine
            winLines={[
              [0, 0, 0, 0],
              [1, 1, 1, 1],
              [0, 0, 0, 0],
              [0, 0, 0, 0]
            ]}
          />
          <WinLine
            winLines={[
              [0, 0, 0, 0],
              [0, 0, 0, 0],
              [1, 1, 1, 1],
              [0, 0, 0, 0]
            ]}
          />
          <WinLine
            winLines={[
              [0, 0, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0],
              [1, 1, 1, 1]
            ]}
          />
          <WinLine
            winLines={[
              [1, 0, 0, 0],
              [1, 0, 0, 0],
              [1, 0, 0, 0],
              [1, 0, 0, 0]
            ]}
          />
          <WinLine
            winLines={[
              [0, 1, 0, 0],
              [0, 1, 0, 0],
              [0, 1, 0, 0],
              [0, 1, 0, 0]
            ]}
          />
          <WinLine
            winLines={[
              [0, 0, 1, 0],
              [0, 0, 1, 0],
              [0, 0, 1, 0],
              [0, 0, 1, 0]
            ]}
          />
          <WinLine
            winLines={[
              [0, 0, 0, 1],
              [0, 0, 0, 1],
              [0, 0, 0, 1],
              [0, 0, 0, 1]
            ]}
          />
          <WinLine
            winLines={[
              [1, 0, 0, 0],
              [0, 1, 0, 0],
              [0, 0, 1, 0],
              [0, 0, 0, 1]
            ]}
          />
          <WinLine
            winLines={[
              [0, 0, 0, 1],
              [0, 0, 1, 0],
              [0, 1, 0, 0],
              [1, 0, 0, 0]
            ]}
          />
        </div>
      </>
    );
  }
}
