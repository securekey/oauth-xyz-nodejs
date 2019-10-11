/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import { render } from "react-dom";
import logo from "./logo.svg";
import "./App.css";
import * as axios from "axios";
import * as constants from "./Constants.js";
import TxComponent from "./TxComponent";

class App extends Component {
  constructor(props) {
    super(props);
  }

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
  }
  getTransactions() {
    axios.get("http://localhost:3001/pending").then(function(response) {
      console.log("pending transaction response is: " + response);
    });
  }

  render() {
    return (
      <div>
        <p>OAuthXYZ Client</p>
        <button
          onClick={() => {
            this.redirectButton();
          }}
        >
          New Transaction
        </button>
        <button
          onClick={() => {
            this.deviceButton();
          }}
        >
          New Device Transaction
        </button>
        <button
          onClick={() => {
            this.getTransactions();
          }}
        >
          Get Transactions
        </button>
        <TxComponent txObject="testObj" />
        //Access DB to pass txObject to the component
      </div>
    );
  }
}

export default App;