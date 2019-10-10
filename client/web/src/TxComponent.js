/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import { render } from "react-dom";
import logo from "./logo.svg";
import "./App.css";
import * as axios from "axios";
import * as constants from "./Constants.js";
import queryString from "query-string";

class TxComponent extends Component {
  render() {
    return (
      <div>
        <p>Tx Component</p>
      </div>
    );
  }
}

export default TxComponent;
