import { Module } from "cerebral";
import * as sequences from "./publicSequences";
import FormsProvider from '@cerebral/forms';
import { state } from 'cerebral/tags';

export default Module({
  state: {
    currentStep: null,
    currentStepId: null,
    steps: ['start', 'stop', 'greet', 'startNearest', 'startLibrary', 'startBook', 'nearest', 'library', 'book', 'showAllLibs'],
    dialog: [],
    reserve: {
      name: null,
      libName: null,
      id: null,
    },
    reRender: 0,
    mapStyle: null,
  },
  signals: {
    startStep: sequences.startStep,
    stopStep: sequences.stopStep,
    greetStep: sequences.greetStep,
    // startNearestStep: sequences.startNearestStep,
    // startLibraryStep: sequences.startLibraryStep,
    startBookStep: sequences.startBookStep,
    // nearestStep: sequences.nearestStep,
    // libraryStep: sequences.libraryStep,
    // bookStep: sequences.bookStep,
    findBooks: sequences.findBooks,
    justTextStep: sequences.justTextStep,
    showAllLibsStep: sequences.showAllLibsStep,
    reserveBookRequest: sequences.reserveBookRequest,
    reserveBookCancel: sequences.reserveBookCancel,
    reserveBookApprove: sequences.reserveBookApprove,
    showOneLib: sequences.showOneLib,
  },
  providers: {},
  modules: {},
});
