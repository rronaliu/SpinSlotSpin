import React, { Component } from 'react';

interface DigitalClockState {
    time: string;
}

class Clock extends Component<{}, DigitalClockState> {
    private intervalId: ReturnType<typeof setInterval> | undefined;

    constructor(props: {}) {
        super(props);
        this.state = {
            time: new Date().toLocaleTimeString(),
        };
    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState({ time: new Date().toLocaleTimeString() });
        }, 1000);
    }

    componentWillUnmount() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    render() {
        return (
            <div className="compliance-bar__container">
                <div className='compliance-bar__clock'>{this.state.time}</div>
            </div>
        )
    }
}

export default Clock;
