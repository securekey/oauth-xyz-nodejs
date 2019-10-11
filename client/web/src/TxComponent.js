/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import TxEntryList from './TxEntryList';
import './App.css';
import * as axios from 'axios';

class TxComponent extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.txObject);
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
      <div class="card">
        <button
          className="button"
          onClick={() => {
            this.poll();
          }}
        >
          Poll
        </button>
        <TxEntryList transaction={this.state.transaction} />
      </div>
    );
  }
}

export default TxComponent;
