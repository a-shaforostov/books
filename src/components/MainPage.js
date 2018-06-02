import React, { Component } from "react";
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';
import { CSSTransition } from 'react-transition-group';
import { pageTransitionDelay } from '../app/constants';
import injectSheet from 'react-jss';

import { Segment, Button } from 'semantic-ui-react';

import Header from './Header';
import Chat from './Chat';
import MapPortal from './MapPortal';

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
    overflowY: 'hidden',
    justifyContent: 'space-between',
  },
  chatContainer: {
    position: 'absolute',
    height: 'calc(100% - 80px)',
    backgroundColor: 'white',
    width: '30%',
    bottom: 0,
    left: '50px',
  },
};

class MainPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <CSSTransition
        in={this.props.currentPage === 'root'}
        timeout={pageTransitionDelay}
        classNames="page"
        unmountOnExit
      >
        <div className={classes.page}>
          <Header />
          <main className={classes.contentWrapper}>
            <Segment className={classes.content}>
              <div className={classes.chatContainer}>
                <Chat />
              </div>
              <MapPortal />
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
  injectSheet(styles)(MainPage),
);
