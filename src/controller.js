import { Controller } from 'cerebral';
import Devtools from 'cerebral/devtools';

import app from './app';

const controller = Controller(app, {
  devtools: navigator.userAgent.toLowerCase().includes('chrome')
    ? Devtools({ host: 'localhost:8686' })
    : null
});

// try to login silently (w/o login form)
const autologin = controller.getSignal('autologin');
autologin({ silent: true });

export default controller;
