import React, { Component } from 'react';
import AccessToken from './AccessToken';
import UserCode from './UserCode';

class TxEntry extends Component {
  render() {
    if (!this.props.last) {
      return null;
    }

    const elements = [];

    if (this.props.entry.response.access_token) {
      elements.push(
        ...[
          <dt className="col-sm-3">Token</dt>,
          <dd className="col-sm-9">
            <AccessToken token={this.props.entry.response.access_token} />
          </dd>
        ]
      );
    }

    if (this.props.entry.response.handle) {
      elements.push(
        ...[
          <dt className="col-sm-3">Transaction Handle</dt>,
          <dd className="col-sm-9">{this.props.entry.response.handle.value}</dd>
        ]
      );
    }

    if (this.props.entry.response.user_code) {
      elements.push(
        ...[
          <dt className="col-sm-3">User Code URL</dt>,
          <dd className="col-sm-9">
            <a href={this.props.entry.response.user_code_url}>
              {this.props.entry.response.user_code_url}
            </a>
          </dd>,
          <dt className="col-sm-3">User Code</dt>,
          <dd className="col-sm-9">
            <UserCode userCode={this.props.entry.response.user_code} />
          </dd>
        ]
      );
    }
    if (this.props.entry.response.interaction_url) {
      elements.push(
        ...[
          <dt className="col-sm-3">Interaction URL</dt>,
          <dd className="col-sm-9">
            <a href={this.props.entry.response.interaction_url}>
              {this.props.entry.response.interaction_url}
            </a>
          </dd>
        ]
      );
    }

    return (
      <div className={this.props.last ? null : 'card'}>
        <dl className="row">{elements}</dl>
      </div>
    );
  }
}

export default TxEntry;
