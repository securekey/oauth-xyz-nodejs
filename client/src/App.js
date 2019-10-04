import React, { Component } from "react";
import { render } from "react-dom";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gotIURL: false
    };
  }

  // function signup() {
  // return axios.post("/api/user/signup", { data })
  //   .then(res => {
  //     if (res.status === 200) {
  //       this.setState({ gotIURL: true }); // after signing up, set the state to true. This will trigger a re-render
  //     }
  //   }
  // }

  render() {
    //use axios for http requests
    const axios = require("axios");

    var newTransaction = true;

    var txObject = {
      client: {
        name: "My Client Display Name",
        uri: "https://example.net/client"
      },
      interact: {
        type: "redirect",
        callback: "https://client.example.net/return/123455",
        nonce: "LKLTI25DK82FX4T4QFZC"
      },
      user: {
        assertion:
          "eyJraWQiOiIxZTlnZGs3IiwiYWxnIjoiUlMyNTYifQ.ewogImlzcyI6ICJodHRwOi8vc2VydmVyLmV4YW1wbGUuY29tIiwKICJzdWIiOiAiMjQ4Mjg5NzYxMDAxIiwKICJhdWQiOiAiczZCaGRSa3F0MyIsCiAibm9uY2UiOiAibi0wUzZfV3pBMk1qIiwKICJleHAiOiAxMzExMjgxOTcwLAogImlhdCI6IDEzMTEyODA5NzAsCiAibmFtZSI6ICJKYW5lIERvZSIsCiAiZ2l2ZW5fbmFtZSI6ICJKYW5lIiwKICJmYW1pbHlfbmFtZSI6ICJEb2UiLAogImdlbmRlciI6ICJmZW1hbGUiLAogImJpcnRoZGF0ZSI6ICIwMDAwLTEwLTMxIiwKICJlbWFpbCI6ICJqYW5lZG9lQGV4YW1wbGUuY29tIiwKICJwaWN0dXJlIjogImh0dHA6Ly9leGFtcGxlLmNvbS9qYW5lZG9lL21lLmpwZyIKfQ.rHQjEmBqn9Jre0OLykYNnspA10Qql2rvx4FsD00jwlB0Sym4NzpgvPKsDjn_wMkHxcp6CilPcoKrWHcipR2iAjzLvDNAReF97zoJqq880ZD1bwY82JDauCXELVR9O6_B0w3K-E7yM2macAAgNCUwtik6SjoSUZRcf-O5lygIyLENx882p6MtmwaL1hd6qn5RZOQ0TLrOYu0532g9Exxcm-ChymrB4xLykpDj3lUivJt63eEGGN6DH5K6o33TcxkIjNrCD4XB1CKKumZvCedgHHF3IAK4dVEDSUoGlH9z4pP_eWYNXvqQOjGs-rDaQzUHl6cQQWNiDpWOl_lxXjQEvQ",
        type: "oidc_id_token"
      },
      resources: [
        {
          actions: ["read", "write", "dolphin"],
          locations: [
            "https://server.example.net/",
            "https://resource.local/other"
          ],
          data: ["metadata"]
        }
      ],
      key: {
        jwks: {
          keys: [
            {
              kty: "RSA",
              e: "AQAB",
              kid: "xyz-1",
              alg: "RS256",
              n:
                "kOB5rR4Jv0GMeLaY6_It_r3ORwdf8ci_JtffXyaSx8xYJCCNaOKNJn_Oz0YhdHbXTeWO5AoyspDWJbN5w_7bdWDxgpD-y6jnD1u9YhBOCWObNPFvpkTM8LC7SdXGRKx2k8Me2r_GssYlyRpqvpBlY5-ejCywKRBfctRcnhTTGNztbbDBUyDSWmFMVCHe5mXT4cL0BwrZC6S-uu-LAx06aKwQOPwYOGOslK8WPm1yGdkaA1uF_FpS6LS63WYPHi_Ap2B7_8Wbw4ttzbMS_doJvuDagW8A1Ip3fXFAHtRAcKw7rdI4_Xln66hJxFekpdfWdiPQddQ6Y1cK2U3obvUg7w"
            }
          ]
        }
      }
    };

    var TxResponse = new Object();

    // First time Client interacts with AS. Send the full transaction details
    if (newTransaction) {
      axios
        .post("http://localhost:3000/transaction", txObject)
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
        <p>Hello World!</p>
      </div>
    );
  }
}

export default App;
