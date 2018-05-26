import React, { Fragment } from 'react';
import injectSheet from 'react-jss';
import { pageTransitionDelay } from '../../app/constants';

import { Segment, Button } from 'semantic-ui-react';

import MainPage from '../MainPage';
import AdminPage from '../AdminPage';

const styles = {
  '@global body': {
    margin: 0,
    padding: 0,
  },

  '@global .page-enter, .page-appear': {
    opacity: 0.01,
    // left: '100vw',
  },

  '@global .page-appear-active, .page-enter-active': {
    opacity: 1,
    // left: 0,
    transition: `opacity ${pageTransitionDelay}ms ease-out`,
  },

  '@global .page-exit': {
    opacity: 1,
    // left: 0,
  },

  '@global .page-exit-active': {
    opacity: 0.01,
    // left: '100vw',
    transition: `opacity ${pageTransitionDelay}ms ease-out`,
  },

  container: {
    padding: '10px',
  }
};

function Application(props) {
  return (
    <div className={props.classes.container}>
      <MainPage />
      <AdminPage />
    </div>
  )
}

export default injectSheet(styles)(Application);
