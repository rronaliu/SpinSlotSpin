import React, { Component } from 'react';
import './styles.css';
import GameUI from './dom/gameUI';
import PixiCanvas from './pixi/PixiCanvas';
import { GAME_MODELS } from './GAME';

// Deep readonly utility type for React components
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

class App extends Component {
  render() {
    return(
      <>
        <GameUI models={GAME_MODELS as DeepReadonly<typeof GAME_MODELS>} />
        <PixiCanvas />
      </>
    ) 
  }
}

export default App;