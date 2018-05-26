import React, { Component, Fragment } from "react";
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';

class MainPage extends Component {
  render() {
    return (
      <div>MainPage</div>
    )
  }
}

export default connect(
  {
  },
  MainPage,
);
