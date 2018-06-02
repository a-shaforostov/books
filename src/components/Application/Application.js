import React from 'react';
import { connect } from "@cerebral/react";
import { state } from 'cerebral/tags';
import injectSheet from 'react-jss';
import { pageTransitionDelay } from '../../app/constants';

import MainPage from '../MainPage';
import AdminPage from '../AdminPage';

import LoginForm from '../LoginForm';

const styles = {
  '@global body': {
    margin: 0,
    padding: 0,
    backgroundColor: '#974315',
  },

  '@global .page-enter, .page-appear': {
    opacity: 0.01,
  },

  '@global .page-appear-active, .page-enter-active': {
    opacity: 1,
    transition: `opacity ${pageTransitionDelay}ms ease-out`,
  },

  '@global .page-exit': {
    opacity: 1,
  },

  '@global .page-exit-active': {
    opacity: 0.01,
    transition: `opacity ${pageTransitionDelay}ms ease-out`,
  },

  '@global .ui.page.modals.transition.visible': {
    display: 'flex !important',
  },

  container: {
    padding: '0',
    height: '100vh',
  },
};

function Application(props) {
  return (
    <div className={props.classes.container}>
      <MainPage />
      <AdminPage />
      <LoginForm open={props.visibleLogin} />
    </div>
  )
}

export default connect(
  {
    visibleLogin: state`env.login.edit`,
  },
  injectSheet(styles)(Application),
);
