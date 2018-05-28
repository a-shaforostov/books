import React, { Component, Fragment } from "react";
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';
import injectSheet from 'react-jss';

import { CSSTransition } from 'react-transition-group';
import { pageTransitionDelay } from '../app/constants';

import { Segment, Button } from 'semantic-ui-react';

import Header from './Header';
import Libraries from './Libraries';
import LibraryInfo from './LibraryInfo';
import back from '../assets/wood-bg.jpg';

const styles = {
  page: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  contentWrapper: {
    flexGrow: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    height: '100%',
    flexGrow: 1,
    backgroundColor: 'transparent!important',
    border: 'none!important',
    display: 'flex',
  },
  '@global body': {
    backgroundImage: `url(${back})!important`,
  }
};

class AdminPage extends Component {
  render() {
    const { classes } = this.props;
    console.log(back);
    return (
      <CSSTransition
        in={this.props.currentPage === 'admin'}
        timeout={pageTransitionDelay}
        classNames="page"
        unmountOnExit
      >
        <div className={classes.page}>
          <Header />
          <main className={classes.contentWrapper}>
            <Segment className={classes.content}>
              <Libraries />
              <LibraryInfo />
            </Segment>
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
  injectSheet(styles)(AdminPage),
);
