import React, { Component } from 'react';

interface WinLineProps {
    winLines: (1 | 0)[][];
}

export default class WinLine extends Component<WinLineProps> {

    render() {
        return <>
            
            <div className="win-line">
                {this.props.winLines.map((row, rowIndex) => (
                    <div key={rowIndex} className="win-line__row">
                        {row.map((item, itemIndex) => (
                            <div 
                                key={itemIndex} 
                                className={`win-line__row-item ${item === 1 ? '--on' : ''}`}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>
        </>;
    }
}
