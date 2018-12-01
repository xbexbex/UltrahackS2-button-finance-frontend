import React, { Component } from 'react';
import Instrument from './Instrument';
import '../styles/Main.scss';

export default class Main extends Component {

    constructor(props: {}) {
        super(props)
    }

    render() {
        return (
            <div className="main-container">
                <div className="instrument-container">
                    {Object.keys(this.props.instruments).map((item, i) => {
                        return (<Instrument
                            key={i}
                            data={this.props.instruments[item]}
                        />);
                    })}
                </div>
            </div>
        )
    }
}
