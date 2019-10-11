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

  loadPendingTransactions() {
    let currentComponent = this;
    axios.get('http://localhost:3001/pending').then(function(response) {
      // console.log(
      //   "pending transaction response is: " + JSON.stringify(response.data)
      // );
      currentComponent.setState({ transactions: response.data });
    });
  }

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
    const pending = this.state.transactions
      .map(transaction => (
        <TxComponent key={transaction.id} txObject={transaction} />
      ))
      .reverse(); // newest first

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
        <button
          onClick={() => {
            this.loadPendingTransactions();
          }}
        >
          Get Transactions
        </button>
        {pending}
      </div>
    );
  }
}

export default App;
