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

  componentDidMount() {
    this.loadPendingTransactions();
  }

  loadPendingTransactions() {
    axios.get("http://localhost:3001/pending").then(function(response) {
      console.log(
        "pending transaction response is: " + JSON.stringify(response.data)
      );
    });
  }

<<<<<<< HEAD
  newRedirectTransaction() {}

  newDeviceTransaction() {}

  redirectButton() {
    axios
      .post("http://localhost:3000/transaction", constants.txObjectRedirect)
      .then(function(response) {
        let TxResponse = response;
        console.log(TxResponse);
        var IURL = TxResponse.data.interaction_url;
        console.log(IURL);
        window.location = IURL;
      });
  }

  deviceButton() {
    var TransactionHandle;
    axios
      .post("http://localhost:3000/transaction", constants.txObjectDevice)
      .then(function(response) {
        let TxResponse = response;
        console.log(TxResponse);
        var userCode = TxResponse.data.user_code;
        console.log("The user code is: " + userCode);
        TransactionHandle = TxResponse.data.handle.value;
        console.log("The transaction handle is: " + TransactionHandle);
        window.location = "http://localhost:5000/device";
        return axios
          .post("http://localhost:3000/transaction", TransactionHandle)
          .then(function(response) {
            let resp = response;
            console.log("the respnse is" + resp);
          });
      });
=======
  newRedirectTransaction() {
    axios.post('http://localhost:3001/redirect').then(resp => {
      this.loadPendingTransactions();
    });
  }

  newDeviceTransaction() {
    axios.post('http://localhost:3001/device').then(resp => {
      this.loadPendingTransactions();
    });
>>>>>>> c0fd6f16ff60addbd891f218f0b92288d34d1a09
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
        <button
          onClick={() => {
            this.loadPendingTransactions();
          }}
        >
          Get Transactions
        </button>
        <TxComponent txObject="testObj" />
      </div>
    );
  }
}

export default App;
