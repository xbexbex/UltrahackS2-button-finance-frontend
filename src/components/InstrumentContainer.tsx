import React, { Component } from 'react';
import Instrument from './Instrument';
import '../styles/InstrumentContainer.scss';
import axios from 'axios';
import { serverUrl } from '../utils/config';

export default class InstrumentContainer extends Component {

    constructor(props: {}) {
        super(props)
        this.state = {
            instruments: null
        }
        this.fetchInstruments();
    }

    async fetchInstruments() {
        try {
            const response = await axios.get(serverUrl + '/inst');
            this.setState({
                instruments: response.data.instruments,
            });
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        let view;
        if (this.state.instruments) {
            view = (
                <div className="instrument-container">
                    {Object.keys(this.state.instruments).map((item, i) => {
                        return (<Instrument
                            key={i}
                            data={this.state.instruments[item]}
                        />);
                    })}
                </div>
            )
        } else {
            view = (<p></p>)
        }
        return (
            view
        )
    }
}
