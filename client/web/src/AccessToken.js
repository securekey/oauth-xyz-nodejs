/*
Copyright SecureKey Technologies Inc. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import React, { Component } from 'react';

class AccessToken extends Component {
  render() {
    if (this.props.token) {
      return <p>{this.props.token.value}</p>;
    } else {
      return null;
    }
  }
}

export default AccessToken;
