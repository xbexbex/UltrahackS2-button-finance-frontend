import React, { Component } from 'react';
import Fund from './Fund';
import '../styles/FundContainer.scss';
import axios from 'axios';
import { serverUrl } from '../utils/config';

export default class FundContainer extends Component {

    constructor(props: {}) {
        super(props)
        this.state = {
            funds: null
        }
    }

    componentDidMount() {
        this.fetchFunds();
    }

    async fetchFunds() {
        try {
            const response = await axios.get(serverUrl + '/funds');
            this.setState({
                funds: response.data,
            });
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div>
                {this.state.funds ? (
                    <div className="fund-container">
                        {Object.keys(this.state.funds).map((item, i) => {
                            return (<Fund
                                key={i}
                                data={this.state.funds[item]}
                            />);
                        })}
                    </div>
                ) : (
                        <img
                            className="loading-image"
                            src="../src/assets/loading.svg"></img>
                    )
                }
            </div>
        )
    }
}
