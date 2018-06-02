import React, { Component } from "react";
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';

import {create as createJss} from 'jss';
import {JssProvider} from 'react-jss';
import jssNested from 'jss-nested';
import jssCamelCase from 'jss-camel-case';
import jssGlobal from 'jss-global';

import Application from './Application';
import 'semantic-ui-css/semantic.css';

const jss = createJss();
jss.use(jssNested(), jssCamelCase(), jssGlobal());

class AppWrapper extends Component {
  componentDidMount() {
    this.props.applicationLoaded();
  };

  render() {
    return (
      <JssProvider jss={jss}>
        <Application />
      </JssProvider>
    )
  }
}

export default connect(
  {
    currentPage: state`currentPage`,
    applicationLoaded: signal`applicationLoaded`,
  },
  AppWrapper,
);
