import React, { Component } from 'react';
import { serverUrl } from '../utils/config'
import axios from 'axios';
import Main from './Main';
import '../styles/App.scss';

export default class App extends Component {

  constructor(props: {}) {
    super(props)
    this.state = {
      instruments: null
    }
  }

  componentDidMount() {
    this.fetchInstruments()
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
      view = (<Main
        instruments={this.state.instruments}
      ></Main>)
    } else {
      view = (<p>Loading</p>)
    }
    return (
      view
    );
  }
}
