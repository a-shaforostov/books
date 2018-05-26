import React, { Component, Fragment } from "react";
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';
import { CSSTransition } from 'react-transition-group';
import { pageTransitionDelay } from '../app/constants';

class MainPage extends Component {
  render() {
    return (
      <CSSTransition
        in={this.props.currentPage === 'root'}
        timeout={pageTransitionDelay}
        classNames="page"
        unmountOnExit
      >
        <div {...this.props}>MainPage</div>
      </CSSTransition>

    )
  }
}

export default connect(
  {
    currentPage: state`currentPage`,
  },
  MainPage,
);
