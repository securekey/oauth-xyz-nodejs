/*
Copyright SecureKey Technologies Inc. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import TxEntryList from './TxEntryList';
import './App.css';
import * as axios from 'axios';

class TxComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: props.txObject
    };
  }
  async poll() {
    let currentComponent = this;
    axios
      .get(
        'http://localhost:3001/poll/' +
          encodeURIComponent(this.state.transaction._id)
      )
      .then(res => {
        currentComponent.setState({
          transaction: res.data
        });
      });
  }
  render() {
    return (
      <div className="card">
        <button
          className="button"
          onClick={() => {
            this.poll();
          }}
        >
          Poll
        </button>
        <div className="entryList">
          <TxEntryList transaction={this.state.transaction} />
        </div>
      </div>
    );
  }
}

export default TxComponent;
