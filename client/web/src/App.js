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

  async componentDidMount() {
    document.getElementById('RedirectBody').value = JSON.stringify(
      constants.txObjectRedirect,
      undefined,
      4
    );

    document.getElementById('DeviceBody').value = JSON.stringify(
      constants.txObjectDevice,
      undefined,
      4
    );
  }

  async loadPendingTransactions() {
    let currentComponent = this;
    let res = await axios.get('http://localhost:3001/pending');
    console.log('pending transaction response is: ' + JSON.stringify(res.data));
    currentComponent.setState({ transactions: res.data });
  }

  async newRedirectTransaction() {
    console.log(JSON.parse(document.getElementById('RedirectBody').value));
    const redirectmessage = {
      data: { tx: JSON.parse(document.getElementById('RedirectBody').value) }
    };
    await axios.post('http://localhost:3001/redirect', redirectmessage);
  }

  async newDeviceTransaction() {
    console.log(JSON.parse(document.getElementById('DeviceBody').value));

    const devicemessage = {
      data: { tx: JSON.parse(document.getElementById('DeviceBody').value) }
    };
    await axios.post('http://localhost:3001/device', devicemessage);
  }

  async clearTransactions() {
    await axios.post('http://localhost:3001/clear');
    this.loadPendingTransactions();
  }

  render() {
    const pending = this.state.transactions
      .map(transaction => (
        <TxComponent key={transaction._id} txObject={transaction} />
      ))
      .reverse(); // newest first

    return (
      <div>
        <p>OAuthXYZ Client</p>
        <div class="inline-div">
          <p align="center">Redirect Body</p>
          <textarea
            class="inline-txtarea"
            cols="100"
            id="RedirectBody"
            rows="30"
          />
        </div>
        &nbsp; &nbsp;
        <div class="inline-div">
          <p align="center">Device Body</p>
          <textarea
            class="inline-txtarea"
            cols="100"
            id="DeviceBody"
            rows="30"
          />
        </div>
        <br /> <br /> <br />
        <center>
          <button
            class="txButton"
            onClick={() => {
              this.newRedirectTransaction();
            }}
          >
            New Redirect Transaction
          </button>
          <button
            class="txButton"
            onClick={() => {
              this.newDeviceTransaction();
            }}
          >
            New Device Transaction
          </button>
          <button
            class="txButton"
            onClick={() => {
              this.loadPendingTransactions();
            }}
          >
            Get Transactions
          </button>
          <button
            class="txButton"
            onClick={() => {
              this.clearTransactions();
            }}
          >
            Clear Transactions
          </button>
        </center>
        {pending}
      </div>
    );
  }
}

export default App;
