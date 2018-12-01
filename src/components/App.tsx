import React, { Component } from 'react';
import FundContainer from './FundContainer';
import InstrumentContainer from './InstrumentContainer';
import '../styles/App.scss'

export default class App extends Component {

  constructor(props: {}) {
    super(props)
  }

  render() {
    return (
      <div className='main-container'>
        <FundContainer></FundContainer>
        <InstrumentContainer></InstrumentContainer>
      </div>
    );
  }
}
