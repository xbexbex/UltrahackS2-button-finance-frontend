import React, { Component } from 'react';
import '../styles/fund.scss'
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';
import axios from 'axios';
import { serverUrl } from '../utils/config';

export default class Fund extends Component {

    constructor(props: {}) {
        super(props)
        this.state = {
            chartData: null
        }
    }

    async fetchChartData() {
        try {
            const response = await axios.get(serverUrl + '/funds/' + this.props.data.isinCode);
            const data = response.data.payload
            for (let i in data) {
                data[i].x = data[i].date,
                data[i].y = parseInt(data[i].value)
            }
            this.setState({
                chartData: data
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
            <div className="fund">
                <h4>{this.props.data.name.en}</h4>
                <p>Risk Class: {this.props.data.riskClass}</p>
                <p>Isin Code: {this.props.data.isinCode}</p>
                {this.state.chartData && (
                    <div className="chart-container">
                        <VictoryChart
                            theme={VictoryTheme.material}
                        >
                            <VictoryLine
                                style={{
                                    data: { stroke: "#c43a31" },
                                    parent: { border: "1px solid #ccc" }
                                }}
                                data={this.state.chartData}>
                            </VictoryLine>
                        </VictoryChart>
                    </div>
                )}
            </div>
        )
    }
}
