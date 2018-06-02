import { Module } from "cerebral";
import * as sequences from "./publicSequences";

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
