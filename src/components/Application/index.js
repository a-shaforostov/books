import React, { Component } from "react";
import controller from '../../controller';
import { Container } from '@cerebral/react';

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
    const event = new Event('applicationLoaded');
    document.dispatchEvent(event);
  };

  render() {
    return (
      <Container controller={controller}>
        <JssProvider jss={jss}>
          <Application />
        </JssProvider>
      </Container>
    )
  }
}

export default AppWrapper;
