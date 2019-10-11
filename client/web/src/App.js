/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import './App.css';
import * as axios from 'axios';
import * as constants from './Constants.js';
import TxComponent from './TxComponent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
  }

  componentDidMount() {
    this.loadPendingTransactions();
  }

  loadPendingTransactions() {}

  newRedirectTransaction() {
    axios.post('http://localhost:3001/redirect').then(resp => {
      this.loadPendingTransactions();
    });
  }

  newDeviceTransaction() {
    axios.post('http://localhost:3001/device').then(resp => {
      this.loadPendingTransactions();
    });
  }

  render() {
    return (
      <div>
        <p>OAuthXYZ Client</p>
        <button
          onClick={() => {
            this.newRedirectTransaction();
          }}
        >
          New Redirect Transaction
        </button>
        <button
          onClick={() => {
            this.newDeviceTransaction();
          }}
        >
          New Device Transaction
        </button>
        <TxComponent txObject="testObj" />
      </div>
    );
  }
}

export default App;
