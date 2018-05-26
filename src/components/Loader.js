import React, { Component } from "react";
import { connect } from "@cerebral/react";
import { state } from "cerebral/tags";

class Loader extends Component {
  render() {
    return (
      !this.props.isApplicationLoaded &&
      <div>Loader</div>
    );
  }
}

export default connect(
  {
    isApplicationLoaded: state`isApplicationLoaded`,
  },
  Loader,
);
