import React, { Component } from 'react';
import WinLine from './WinLine';

const uiImage = (fileName: string): string =>
    new URL(`../assets/images/UI/${fileName}`, import.meta.url).href;

export default class MenuContent extends Component {

    render() {
        return <>
            <h2 className="burger-menu__content">HIGH VALUE</h2>
            <p>Multiplies your bet by 10x</p>
            <img src={uiImage("dragon.png")} />
            <img src={uiImage("geisha.png")} />
            <img src={uiImage("helmet.png")} />
            <h2 className="burger-menu__content">MID VALUE</h2>
            <p>Multiplies your bet by 5x</p>
            <img src={uiImage("katana.png")} />
            <img src={uiImage("koi.png")} />
            <img src={uiImage("kunai.png")} />
            <h2 className="burger-menu__content">LOW VALUE</h2>
            <p>Multiplies your bet by 3x</p>
            <img src={uiImage("calligraphy.png")} />
            <img src={uiImage("coins.png")} />
            <img src={uiImage("lantern.png")} />
            <h2 className="burger-menu__content">WIN LINES</h2>
            <p>Land 4 identical symbols in any of the configurations below</p>
            <div className="win-line__container">
                <WinLine winLines={[
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                ]} />
                <WinLine winLines={[
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                ]} />
                <WinLine winLines={[
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                ]} />
                <WinLine winLines={[
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                ]} />
                <WinLine winLines={[
                    [1, 0, 0, 0],
                    [1, 0, 0, 0],
                    [1, 0, 0, 0],
                    [1, 0, 0, 0],
                ]} />
                <WinLine winLines={[
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                ]} />
                <WinLine winLines={[
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                ]} />
                <WinLine winLines={[
                    [0, 0, 0, 1],
                    [0, 0, 0, 1],
                    [0, 0, 0, 1],
                    [0, 0, 0, 1],
                ]} />
                <WinLine winLines={[
                    [1, 0, 0, 0],
                    [0, 1, 0, 0],
                    [0, 0, 1, 0],
                    [0, 0, 0, 1],
                ]} />
                <WinLine winLines={[
                    [0, 0, 0, 1],
                    [0, 0, 1, 0],
                    [0, 1, 0, 0],
                    [1, 0, 0, 0],
                ]} />
            </div>


        </>;
    }
}
