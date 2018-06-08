import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import Loader from './components/Loader';
import Application from './components/Application/Loadable';

import registerServiceWorker from './registerServiceWorker';

// to avoid error in google.maps library in offline mode
// eslint-disable-next-line no-unused-vars
var google;

ReactDOM.render(
  <Fragment>
    <Loader/>
    <Application />
  </Fragment>,
  document.getElementById('root'),
);

registerServiceWorker();

if (module.hot) {
    module.hot.accept();
}
