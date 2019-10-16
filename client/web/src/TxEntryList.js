/*
Copyright SecureKey Technologies Inc. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import React, { Component } from 'react';
import TxEntry from './TxEntry';
import './App.css';
class TxEntryList extends Component {
  render() {
    return this.props.transaction.entries.map((entry, idx, arr) => (
      <>
        <p className="log">
          <strong>Log Item #{idx}</strong>
        </p>
        <TxEntry key={entry._id} entry={entry} />
        <br />
        <br />
        <br />
        <br />
        <hr />
      </>
    ));
  }
}

export default TxEntryList;
