import React, { Component, Fragment } from "react";
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';

import {create as createJss} from 'jss';
import {JssProvider} from 'react-jss';
import jssNested from 'jss-nested';
import jssCamelCase from 'jss-camel-case';
import jssGlobal from 'jss-global';

import MainPage from '../MainPage';
import AdminPage from '../AdminPage';

import 'semantic-ui-css/semantic.css';

const jss = createJss();
jss.use(jssNested(), jssCamelCase(), jssGlobal());

const pages = {
  root: MainPage,
  admin: AdminPage,
};

class Application extends Component {
  componentDidMount() {
    this.props.applicationLoaded();
  };

  render() {
    const Page = pages[this.props.currentPage];

    return (
      <JssProvider jss={jss}>
        <Fragment>
          <a href="/">root</a>
          <a href="/admin">admin</a>
          <div>Application</div>
          <Page />
        </Fragment>
      </JssProvider>
    )
  }
}

export default connect(
  {
    currentPage: state`currentPage`,
    applicationLoaded: signal`applicationLoaded`,
  },
  Application,
);
