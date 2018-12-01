import React, { Component } from 'react';
import '../styles/instrument.scss'

export default class Instrument extends Component {

    constructor(props: {}) {
        super(props)
    }

    render() {
        return (
            <div className="instrument">
                <h4>{this.props.data.name}</h4>
                <p>Value: {this.props.data.value}</p>
            </div>
        )
    }
}
