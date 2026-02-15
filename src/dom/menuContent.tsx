import React, { Component } from "react";
import WinLine from "./WinLine";
import { getThemeAssetUrl } from "../theme/runtimeTheme";

const uiImage = (fileName: string): string =>
  `/themes/SpinSlotSpin/assets/${fileName}`;

const resolveTierMenuImages = (
  themeKeys: [string, string, string],
  fallbackFileNames: [string, string, string]
): [string, string, string] => {
  const used = new Set<string>();

  const resolveAt = (index: number): string => {
    const themeUrl = getThemeAssetUrl(themeKeys[index]);
    if (themeUrl) {
      used.add(themeUrl);
      return themeUrl;
    }

    for (const fileName of fallbackFileNames) {
      const fallbackUrl = uiImage(fileName);
      if (!used.has(fallbackUrl)) {
        used.add(fallbackUrl);
        return fallbackUrl;
      }
    }

    return uiImage(fallbackFileNames[index]);
  };

  return [resolveAt(0), resolveAt(1), resolveAt(2)];
};

export default class MenuContent extends Component {
  render() {
    const [high1, high2, high3] = resolveTierMenuImages(
      ["high-tier-symbol-1", "high-tier-symbol-2", "high-tier-symbol-3"],
      ["high-tier-symbol-1.png", "high-tier-symbol-2.png", "high-tier-symbol-3.png"]
    );
    const [mid1, mid2, mid3] = resolveTierMenuImages(
      ["mid-tier-symbol-1", "mid-tier-symbol-2", "mid-tier-symbol-3"],
      ["mid-tier-symbol-1.png", "mid-tier-symbol-2.png", "mid-tier-symbol-3.png"]
    );
    const [low1, low2, low3] = resolveTierMenuImages(
      ["low-tier-symbol-1", "low-tier-symbol-2", "low-tier-symbol-3"],
      ["low-tier-symbol-1.png", "low-tier-symbol-2.png", "low-tier-symbol-3.png"]
    );

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
