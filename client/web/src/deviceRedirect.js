import React, { Component } from "react";
import { render } from "react-dom";
import * as axios from "axios";
import queryString from "query-string";
import * as constants from "./Constants.js";

class DeviceRedirect extends Component {
  render() {
    console.log(
      "the device code is: SAMPLE CODE. Enter this code at SAMPLE AS DEVICE URL"
    );

    return (
      <div>
        <p>OAuthXYZ Client DEVICE</p>
      </div>
    );
  }
}

export default DeviceRedirect;
