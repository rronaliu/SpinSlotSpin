import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import faviconUrl from './assets/images/samurai-game-logo.png';
import { applyRuntimeGameConfig, startGame } from './GAME';
import {
  getRuntimeThemeConfig,
  resolveThemeAssetUrl,
  loadRuntimeTheme
} from './theme/runtimeTheme';

if (import.meta.hot) {
  import.meta.hot.on('vite:afterUpdate', () => {
    window.location.reload();
  });
}

const setFavicon = (): void => {
  const resolvedFavicon =
    resolveThemeAssetUrl(
      ['game-logo', 'favicon', 'game_logo', 'samurai-game-logo.png'],
      'images/samurai-game-logo.png'
    ) ?? faviconUrl;

  const existingFavicon = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
  if (existingFavicon) {
    existingFavicon.href = resolvedFavicon;
  } else {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = resolvedFavicon;
    document.head.appendChild(link);
  }
};

const bootstrap = async (): Promise<void> => {
  await loadRuntimeTheme();
  applyRuntimeGameConfig(getRuntimeThemeConfig());

  const rootElement = document.getElementById('root');
  if (!rootElement) {
    return;
  }

  setFavicon();

  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);

  startGame();
};

bootstrap();
