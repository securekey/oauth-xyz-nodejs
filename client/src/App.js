/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import { render } from "react-dom";
import logo from "./logo.svg";
import "./App.css";
import * as axios from "axios";
import * as constants from "./Constants.js";

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
    axios
      .post("http://localhost:3000/transaction", constants.txObjectDevice)
      .then(function(response) {
        let TxResponse = response;
        console.log(TxResponse);
        var IURL = TxResponse.data.interaction_url;
        console.log(IURL);
        window.location = IURL;
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
            this.redirectButton();
          }}
        >
          New Device Transaction
        </button>
      </div>
    );
  }
}

export default App;
