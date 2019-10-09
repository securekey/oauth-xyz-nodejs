/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import { render } from "react-dom";
import logo from "./logo.svg";
import "./App.css";
import * as axios from "axios";
import "./Constants.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gotIURL: false
    };
  }

  redirectButton() {
    axios
      .post("http://localhost:3000/transaction", this.txObject)
      .then(function(response) {
        TxResponse = response;
        console.log(TxResponse);
        var IURL = TxResponse.data.interaction_url;
        console.log(IURL);
        //    if (this.state.gotIURL == false) {
        window.location = IURL;
        //    this.setState({ gotIURL: true });
        //      }
        console.log("the redirect button was clicked");
      });
  }

  render() {
    //use axios for http requests

    var TxResponse = new Object();

    // First time Client interacts with AS. Send the full transaction details
    if (newTransaction) {
      axios
        .post("http://localhost:3000/transaction", this.txObject)
        .then(function(response) {
          TxResponse = response;
          console.log(TxResponse);
          var IURL = TxResponse.data.interaction_url;
          console.log(IURL);
          //    if (this.state.gotIURL == false) {
          window.location = IURL;
          //    this.setState({ gotIURL: true });
          //      }
        });
      // .catch(function(error) {
      //   console.log(error);
      // });
      // .then(function(IURL) {
      //   axios.get(IURL.toString());
      // });
    }
    // Continuing an existing transaction with AS. Send only the transaction handle
    else {
      axios
        .post("http://localhost:3000/transaction", {
          handle: "CyZasHAsKKpZ4wCoIep7twzotlRYHA"
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    return (
      <div>
        <p>OAuthXYZ Client</p>
        <button onClick={this.redirectButton()}>New Transaction</button>
      </div>
    );
  }
}

export default App;
