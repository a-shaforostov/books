import React, { Component, Fragment } from "react";
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';
import { CSSTransition } from 'react-transition-group';
import { pageTransitionDelay } from '../app/constants';

import Header from './Header';

class AdminPage extends Component {
  render() {
    return (
      <CSSTransition
        in={this.props.currentPage === 'admin'}
        timeout={pageTransitionDelay}
        classNames="page"
        unmountOnExit
      >
        <div>
          <Header />
          <main>
            Admin Page
          </main>
        </div>
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
