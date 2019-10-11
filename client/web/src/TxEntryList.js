import React, { Component } from 'react';
import TxEntry from './TxEntry';
import './App.css';
class TxEntryList extends Component {
  render() {
    const entries = this.props.transaction.entries.map((entry, idx, arr) => (
      <>
        <p className="log">
          <strong>Log Item #{idx}</strong>
        </p>
        <TxEntry key={entry._id} entry={entry} />
        <hr></hr>
      </>
    ));
    return <>{entries}</>;
  }
}

export default TxEntryList;
