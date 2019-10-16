/*
Copyright SecureKey Technologies Inc. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import React, { Component } from 'react';

class UserCode extends Component {
  render() {
    if (this.props.userCode) {
      return <>{this.props.userCode}</>;
    } else {
      return null;
    }
  }
}

export default UserCode;
