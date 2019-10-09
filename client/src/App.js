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
      .post("http://localhost:3000/transaction", constants.txObject)
      .then(function(response) {
        let TxResponse = response;
        console.log(TxResponse);
        var IURL = TxResponse.data.interaction_url;
        console.log(IURL);
        window.location = IURL;
      });
  }

  render() {
    //First time Client interacts with AS. Send the full transaction details
    // if (constants.newTransaction) {
    //   axios
    //     .post("http://localhost:3000/transaction", constants.txObject)
    //     .then(function(response) {
    //       let TxResponse = response;
    //       console.log(TxResponse);
    //       var IURL = TxResponse.data.interaction_url;
    //       console.log(IURL);
    //       window.location = IURL;
    //     });
    // }
    // // Continuing an existing transaction with AS. Send only the transaction handle
    // else {
    //   axios
    //     .post("http://localhost:3000/transaction", {
    //       handle: "CyZasHAsKKpZ4wCoIep7twzotlRYHA"
    //     })
    //     .then(function(response) {
    //       console.log(response);
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // }

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
      </div>
    );
  }
}

export default App;
