import React, { Component, Fragment } from "react";
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';
import { CSSTransition } from 'react-transition-group';
import { pageTransitionDelay } from '../app/constants';

class AdminPage extends Component {
  render() {
    return (
      <CSSTransition
        in={this.props.currentPage === 'admin'}
        timeout={pageTransitionDelay}
        classNames="page"
        unmountOnExit
      >
        <div {...this.props}>AdminPage</div>
      </CSSTransition>
    )
  }
}

export default connect(
  {
    currentPage: state`currentPage`,
  },
  AdminPage,
);
