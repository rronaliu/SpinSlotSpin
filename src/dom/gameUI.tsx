import React, { Component } from 'react';
import { GAME } from '../GAME';
import MenuContent from './menuContent';
import Clock from './clock';
import { Models } from '../models/Models';
import GameControlArea from './gameControlArea';
import AudioToggle from './AudioToggle';
import InsufficientFundsModal from './modals/InsufficientFundsModal';
import AudioModal from './modals/AudioModal';

// Deep readonly utility type for React components
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

interface GameUIState {
  showPopup: boolean;
  menuIsOpen: boolean;
  gameControlAreaVisible: boolean;
  gameControlsVisible: boolean;
  menuAudioVisible: boolean;
  audioPopupVisible: boolean;
}

interface GameUIProps {
  models: DeepReadonly<Models>; // Read-only models
}

export default class GameUI extends Component<GameUIProps, GameUIState> {

  private static instance: GameUI | null = null;

  constructor(props: GameUIProps) {
    super(props);
    this.state = {
      showPopup: false,
      menuIsOpen: false,
      gameControlAreaVisible: false,
      gameControlsVisible: true,
      menuAudioVisible: false,
      audioPopupVisible: false
    };
    GameUI.instance = this;
  }

  public static getInstance(): GameUI | null {
    return GameUI.instance;
  }

  public showPopup(isVisible: boolean): void {
    this.setState({
      showPopup: isVisible
    })
  }

  public showGameControlArea(isVisible: boolean): void {
    this.setState({
      gameControlAreaVisible: isVisible
    })
  }

  public showGameControls(isVisible: boolean): void {
    this.setState({
      gameControlsVisible: isVisible
    })
  }

  public showMenuAudio(isVisible: boolean): void {
    this.setState({
      menuAudioVisible: isVisible
    })
  }

  public showAudioPopup(isVisible: boolean): void {
    this.setState({
      audioPopupVisible: isVisible
    })
  }

  private handleAudioPopupClose = (): void => {
    this.setState({ audioPopupVisible: false });
  }

  private handleMenuToggle = (): void => {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen
    });
    // Instead of directly modifying models, dispatch an event
    // The appropriate State class should handle this
    GAME.events.gameInfo.dispatch();
  }

  private handlePopupClose = (): void => {
    this.setState({ showPopup: false });
  }

  render() {
    const { models } = this.props;
    const { bet } = models;

    return <>
    <div className="GAME-UI">
      <Clock />
      {this.state.menuAudioVisible &&
        <>
          <div className="burger-menu__burger" onClick={this.handleMenuToggle}>
            MENU
          </div>
          <AudioToggle models={this.props.models} />
        </>}

      {this.state.gameControlAreaVisible &&
        <>
          <GameControlArea showControls={this.state.gameControlsVisible} betAmount={bet.betAmount} bankBalance={bet.bankBalance} />
        </>}
      
      <div className={this.state.menuIsOpen ? "burger-menu__panel --show" : "burger-menu__panel --hide"}>
        <div className="burger-menu__panel-inner">
          <MenuContent />
        </div>
      </div>
      
      <InsufficientFundsModal 
        isVisible={this.state.showPopup} 
        onClose={this.handlePopupClose} 
      />
      
      <AudioModal 
        isVisible={this.state.audioPopupVisible} 
        onClose={this.handleAudioPopupClose} 
      />
    </div>
    </>;
  }
}