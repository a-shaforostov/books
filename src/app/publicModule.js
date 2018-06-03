/**
 * Module of public part
 * @module ModulePublic
 */

import { Module } from "cerebral";
import * as sequences from "./publicSequences";

/*
Available steps is:
start
greet
startLibrary
startBook
bookNotFound
foundBooks
unknown
allLibsWasShown
regLibsWasShown
geolocationDenied
*/

export default Module({
  state: {
    currentStep: null,
    currentStepId: null,
    dialog: [],
    reserve: {
      name: null,
      libName: null,
      id: null,
    },
    reRender: 0,
    mapStyle: null,
    myPosition: null,
  },
  signals: {
    startStep: sequences.startStep,
    stopStep: sequences.stopStep,
    greetStep: sequences.greetStep,
    startBookStep: sequences.startBookStep,
    findBooks: sequences.findBooks,
    justTextStep: sequences.justTextStep,
    showAllLibsStep: sequences.showAllLibsStep,
    showRegLibsStep: sequences.showRegLibsStep,
    reserveBookRequest: sequences.reserveBookRequest,
    reserveBookCancel: sequences.reserveBookCancel,
    reserveBookApprove: sequences.reserveBookApprove,
    showOneLib: sequences.showOneLib,
    setMyPosition: sequences.setMyPosition,
  },
  providers: {},
  modules: {},
});
