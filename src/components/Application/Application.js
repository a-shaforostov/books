/**
 * Component. Application
 * @file
 */

import React, { Component } from 'react';
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';
import injectSheet from 'react-jss';
import { pageTransitionDelay } from '../../app/constants';

import MainPage from '../Public/MainPage';
import AdminPage from '../Admin/AdminPage';

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

class Application extends Component {
  componentDidMount() {
    this.props.applicationLoaded();
  }

  render() {
    const { classes, visibleLogin } = this.props;
    return (
      <div className={classes.container}>
        <MainPage />
        <AdminPage />
        <LoginForm open={visibleLogin} />
      </div>
    )
  }
}

export default connect(
  {
    visibleLogin: state`env.login.edit`,
    applicationLoaded: signal`applicationLoaded`,
  },
  injectSheet(styles)(Application),
);
