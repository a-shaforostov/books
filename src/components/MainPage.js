import React, { Component } from "react";
import { connect } from "@cerebral/react";
import { state } from 'cerebral/tags';
import { CSSTransition } from 'react-transition-group';
import { pageTransitionDelay } from '../app/constants';
import injectSheet from 'react-jss';

import { Segment } from 'semantic-ui-react';

import Header from './Header';
import Chat from './Chat';
import MapPortal from './MapPortal';
import pencil from '../assets/pencil.png';

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
  pencil: {
    backgroundImage: `url(${pencil})`,
    position: 'absolute',
    width: '30px',
    height: '642px',
    top: '0',
    right: '30px',
    transform: 'scale(0.75, 0.75) rotateZ(2deg)',
  },
};

class MainPage extends Component {
  portalRef = React.createRef();

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
                <Chat mapPortal={this.portalRef} />
              </div>
              <MapPortal ref={this.portalRef} />
              <div className={classes.pencil} />
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
