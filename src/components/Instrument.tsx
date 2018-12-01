import React, { Component } from 'react';
import '../styles/instrument.scss'
import { VictoryLine } from 'victory';
import axios from 'axios';
import { serverUrl } from '../utils/config';

export default class Instrument extends Component {

    constructor(props: {}) {
        super(props)
        this.state = {
            chartData: null
        }
    }

    async fetchChartData() {
        try {
            const response = await axios.get(serverUrl + '/funds/' + 'FI4000029509');
            console.log(response.data)
            this.setState({
                chartData: response.data.payload,
            });
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.fetchChartData();
    }

    render() {
        return (
            <div className="instrument">
                <h4>{this.props.data.name}</h4>
                <p>Value: {this.props.data.value}</p>
                <p>Isin Code: {this.props.data.isinCode}</p>
                {this.state.chartData && (
                    <div className="chart-container">
                        <VictoryLine></VictoryLine>
                    </div>
                )}
            </div>
        )
    }
}
