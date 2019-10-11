import React, { Component } from 'react';
import TxEntry from './TxEntry';
class TxEntryList extends Component {
  render() {
    const entries = this.props.transaction.entries
      .map((entry, idx, arr) => (
        <TxEntry key={entry._id} entry={entry} last={idx === arr.length - 1} />
      ))
      .reverse();

    return <>{entries}</>;
  }
}

export default TxEntryList;
