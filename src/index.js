import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import controller from './controller';
import { Container } from '@cerebral/react';

import Loader from './components/Loader';
import Application from './components/Application/Loadable';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Container controller={controller}>
    <Fragment>
      <Loader/>
      <Application />
    </Fragment>
  </Container>,
  document.getElementById('root'),
);

registerServiceWorker();
