import React, { Component } from "react";
import { render } from "react-dom";
import * as axios from "axios";
import queryString from "query-string";
import * as constants from "./Constants.js";
import TxComponent from "./TxComponent";

class UserRedirect extends Component {
  redirectToHome() {
    window.location = "http://localhost:5000";
  }
  render() {
    const values = queryString.parse(this.props.location.search);
    console.log("the hash is: " + values.hash);
    console.log("the interact value is: " + values.interact);
    console.log("the interact value is: " + window.Test);

    return (
      <div>
        <p>
          OAuthXYZ Client INTERACT. Thank you "User", the OAuth flow is
          complete. Click button to return to Main Page and see what the Client
          is doing in the background
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

export default UserRedirect;
