import React, { Component } from 'react';
import { GAME } from '../GAME';

interface GameControlAreaState {
    showControls: boolean;
    betAmount: number;
    bankBalance: number;
}

interface GameControlAreaProps {
    showControls: boolean;
    betAmount: number;
    bankBalance: number;
}

export default class GameControlArea extends Component<GameControlAreaProps, GameControlAreaState> {

    private static instance: GameControlArea | null = null;

    constructor(props: GameControlAreaProps) {
        super(props);
        this.state = {
            showControls: props.showControls ?? false,
            betAmount: props.betAmount,
            bankBalance: props.bankBalance
        };
        GameControlArea.instance = this;
    }

    public static getInstance(): GameControlArea | null {
        return GameControlArea.instance;
    }

    public setBankInfo(betAmount: number, bankBalance: number): void {
        this.setState({
            betAmount,
            bankBalance
        });
    }

    componentDidUpdate(prevProps: GameControlAreaProps): void {
        // Update state when showControls prop changes
        if (prevProps.showControls !== this.props.showControls) {
            this.setState({
                showControls: this.props.showControls
            });
        }
    }

    render() {
        return <>
            <div className="game-controls__container">
                <div className="game-controls__button-container">
                    <div className="game-controls__display-container">
                        <div className="game-controls__bank-container">
                            <div className="game-controls__bet-display">${this.state.betAmount}</div>
                            <div className="game-controls__horizontal"></div>
                            <div className="game-controls__bank-display">${this.state.bankBalance}</div>
                        </div>
                    </div>
                    {this.state.showControls &&

                        <>
                            <div className="game-controls__display-container">
                                <div className="game-controls__spin-button" onClick={() => GAME.events.spinButton.dispatch()}>
                                    $
                                </div>
                            </div>
                            <div className="game-controls__display-container">
                                <div className="game-controls__bet-button-container">
                                    <div className="game-controls__bet-button --plus" onClick={() =>
                                        GAME.events.changeBet.dispatch(1)
                                    }>+</div>
                                    <div className="game-controls__bet-button --minus" onClick={() =>
                                        GAME.events.changeBet.dispatch(-1)}
                                    >-</div>
                                </div>
                            </div>
                        </>
                    }

                </div>

            </div>
        </>;
    }
}