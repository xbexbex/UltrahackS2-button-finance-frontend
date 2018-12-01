import React, { Component } from 'react';
import '../styles/Fund.scss'
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';
import axios from 'axios';
import { serverUrl } from '../utils/config';

export default class Fund extends Component {

    private detailedData = {};

    constructor(props: {}) {
        super(props)
        this.state = {
            chartData: null
        }
    }

    async fetchFundData() {
        try {
            const response = await axios.get(serverUrl + '/funds/' + this.props.data.id);
            this.detailedData = response.data
        } catch (error) {
            console.log(error)
        }
    }

    async fetchChartData() {
        try {
            const response = await axios.get(serverUrl + '/charts/'
                + this.detailedData.shares[0].isin);
            const data = response.data.payload
            for (let i in data) {
                data[i].x = data[i].date,
                    data[i].y = parseInt(data[i].value)
            }
            console.log(data)
            this.setState({
                chartData: data
            });
        } catch (error) {
            console.log(error)
        }
    }

    async componentDidMount() {
        await this.fetchFundData();
        this.fetchChartData()
    }

    render() {
        return (
            <div className="fund">
                <h4>{this.props.data.name.en}</h4>
                <p>Risk Class: {this.props.data.riskClass}</p>
                <p>Environmental Index: {this.props.data.envIndex >= 0 && "+"}
                    {this.props.data.envIndex}
                </p>
                {this.state.chartData ? (
                    <div className="chart-container">
                        <VictoryChart>
                            <VictoryLine
                                style={{
                                    data: { stroke: "#c43a31" },
                                    parent: { border: "1px solid #ccc" }
                                }}
                                data={this.state.chartData}>
                            </VictoryLine>
                        </VictoryChart>
                    </div>
                ) : (
                        <img
                            className="loading-image"
                            src="../src/assets/loading.svg"></img>
                    )}
            </div>
        )
    }
}
