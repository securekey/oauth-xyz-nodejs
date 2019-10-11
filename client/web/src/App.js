/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import "./App.css";
import * as axios from "axios";
import * as constants from "./Constants.js";
import TxComponent from "./TxComponent";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
  }

  async loadPendingTransactions() {
    let currentComponent = this;
    let res = await axios.get("http://localhost:3001/pending");
    console.log("pending transaction response is: " + JSON.stringify(res.data));
    currentComponent.setState({ transactions: res.data });
  }

  async newRedirectTransaction() {
    await axios.post("http://localhost:3001/redirect");
  }

  async newDeviceTransaction() {
    await axios.post("http://localhost:3001/device");
  }

  async clearTransactions() {
    await axios.post("http://localhost:3001/clear");
    this.loadPendingTransactions();
  }
  modifyRedirectBody() {}
  modifyDeviceBody() {}
  render() {
    const pending = this.state.transactions
      .map(transaction => (
        <TxComponent key={transaction._id} txObject={transaction} />
      ))
      .reverse(); // newest first

    return (
      <div>
        <p>OAuthXYZ Client</p>
        <form>
          Redirect Body
          <textarea
            cols="100"
            name="RedirectBody"
            rows="30"
            value={JSON.stringify(constants.txObjectRedirect, undefined, 4)}
            onChange={e => this.modifyRedirectBody(e)}
          />
          <br />
          Device Body
          <textarea
            cols="100"
            name="RedirectBody"
            rows="30"
            value={JSON.stringify(constants.txObjectDevice, undefined, 4)}
            onChange={e => this.modifyDeviceBody(e)}
          />
          <br />
        </form>

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
        <button
          onClick={() => {
            this.clearTransactions();
          }}
        >
          Clear Transactions
        </button>
        {pending}
      </div>
    );
  }
}

export default App;
