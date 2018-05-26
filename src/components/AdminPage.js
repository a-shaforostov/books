import React, { Component, Fragment } from "react";
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';

class AdminPage extends Component {
  render() {
    return (
      <div>AdminPage</div>
    )
  }
}

export default connect(
  {
  },
  AdminPage,
);
