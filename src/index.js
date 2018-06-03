import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import Loader from './components/Loader';
import Application from './components/Application/Loadable';

import registerServiceWorker from './registerServiceWorker';

// to avoid arror in google.maps library in offline mode
var google;

ReactDOM.render(
  <Fragment>
    <Loader/>
    <Application />
  </Fragment>,
  document.getElementById('root'),
);

registerServiceWorker();
