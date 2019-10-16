/*
Copyright SecureKey Technologies Inc. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import React, { Component } from 'react';
import AccessToken from './AccessToken';
import UserCode from './UserCode';
import './App.css';

class TxEntry extends Component {
  render() {
    const elements = [];

    if (this.props.entry.response.access_token) {
      elements.push(
        ...[
          <dt>Access Token</dt>,
          <dd>
            <AccessToken token={this.props.entry.response.access_token} />
          </dd>
        ]
      );
    }

    if (this.props.entry.response.handle) {
      elements.push(
        ...[
          <dt>Transaction Handle</dt>,
          <dd>{this.props.entry.response.handle.value}</dd>
        ]
      );
    }

    if (this.props.entry.response.user_code) {
      elements.push(
        ...[
          <dt>User Code URL</dt>,
          <dd>
            <a href={this.props.entry.response.user_code_url}>
              {this.props.entry.response.user_code_url}
            </a>
          </dd>,
          <dt>User Code</dt>,
          <dd>
            <UserCode userCode={this.props.entry.response.user_code} />
          </dd>
        ]
      );
    }
    if (this.props.entry.response.interaction_url) {
      elements.push(
        ...[
          <dt>Interaction URL</dt>,
          <dd>
            <a href={this.props.entry.response.interaction_url}>
              {this.props.entry.response.interaction_url}
            </a>
          </dd>
        ]
      );
    }

    if (this.props.entry.response.message) {
      elements.push(
        ...[<dt>Message</dt>, <dd>{this.props.entry.response.message}</dd>]
      );
    }

    return (
      <div className="card">
        <dl className="row">{elements}</dl>
      </div>
    );
  }
}

export default TxEntry;
