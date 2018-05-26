import React, { Component, Fragment } from "react";
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';
import { CSSTransition } from 'react-transition-group';
import { pageTransitionDelay } from '../app/constants';

import Header from './Header';

class MainPage extends Component {
  render() {
    return (
      <CSSTransition
        in={this.props.currentPage === 'root'}
        timeout={pageTransitionDelay}
        classNames="page"
        unmountOnExit
      >
        <Header />
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
