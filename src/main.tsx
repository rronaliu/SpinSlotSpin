import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import faviconUrl from './assets/images/samurai-game-logo.png';

if (import.meta.hot) {
  import.meta.hot.on('vite:afterUpdate', () => {
    window.location.reload();
  });
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const existingFavicon = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
  if (existingFavicon) {
    existingFavicon.href = faviconUrl;
  } else {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = faviconUrl;
    document.head.appendChild(link);
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
