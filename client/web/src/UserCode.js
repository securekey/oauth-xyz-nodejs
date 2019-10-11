import React, { Component } from 'react';

class UserCode extends Component {
  render() {
    if (this.props.userCode) {
      return (
        <p>
          {this.props.userCode.slice(0, 4)} - {this.props.userCode.slice(4)}
        </p>
      );
    } else {
      return null;
    }
  }
}

export default UserCode;
