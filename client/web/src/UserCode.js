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
