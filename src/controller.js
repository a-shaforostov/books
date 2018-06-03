/**
 * Controller for operate application
 * @module controller
 */

// Uncomment lines to attach cerebral debugger
// Commented to avoid console errors in development mode

import { Controller } from 'cerebral';
// import Devtools from 'cerebral/devtools';

import app from './app';

const controller = Controller(app, {
  devtools: null,
  // devtools: navigator.userAgent.toLowerCase().includes('chrome')
  //   ? Devtools({
  //     host: 'localhost:8686',
  //     bigComponentsWarning: 20,
  //   })
  //   : null
});

// try to login silently (w/o login form)
const autologin = controller.getSignal('autologin');
autologin({ silent: true });

// start chat conversation with greeting message
const startConversation = controller.getSignal('publicModule.startStep');
startConversation();

export default controller;
