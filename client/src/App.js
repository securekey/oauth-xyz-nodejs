import React, { Component } from "react";
import { render } from "react-dom";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    const axios = require("axios");

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

    return (
      <div>
        <p>Hello World!</p>
      </div>
    );
  }
}

export default App;
