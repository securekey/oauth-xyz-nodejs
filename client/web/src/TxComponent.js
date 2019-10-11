/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import { render } from "react-dom";
import logo from "./logo.svg";
import "./App.css";
import * as axios from "axios";
import * as constants from "./Constants.js";
import queryString from "query-string";

class TxComponent extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.txObject);
    this.state = {
      transaction: props.txObject
    };
    this.forceUpdate();
  }
  polling() {
    console.log("hi polling");
  }
  render() {
    return (
      <div>
        <p>Tx Component</p>
        <button
          onClick={() => {
            this.polling();
          }}
        >
          Poll
        </button>
      </div>
    );
  }
}

export default TxComponent;
