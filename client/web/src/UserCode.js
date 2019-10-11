import React, { Component } from 'react';

class UserCode extends Component {
  render() {
    if (this.props.userCode) {
      return <p>{this.props.userCode}</p>;
    } else {
      return null;
    }
  }
}

export default UserCode;
