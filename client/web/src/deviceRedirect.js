import React, { Component } from "react";
import { render } from "react-dom";
import * as axios from "axios";
import queryString from "query-string";
import * as constants from "./Constants.js";

class DeviceRedirect extends Component {
  redirectToHome() {
    window.location = "http://localhost:5000";
    //add current TX to the list of TX on home page by accessing the DB
  }
  render() {
    console.log(
      "the device code is: SAMPLE CODE. Enter this code at SAMPLE AS DEVICE URL"
    );

    return (
      <div>
        <p>
          the device code is: SAMPLE CODE. Enter this code at SAMPLE AS DEVICE
          URL. Click button to return to Main Page and see what the Client is
          doing in the background
        </p>
        <button
          onClick={() => {
            this.redirectToHome();
          }}
        >
          Return
        </button>
      </div>
    );
  }
}

export default DeviceRedirect;
