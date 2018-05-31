import { Module } from "cerebral";
import * as sequences from "./publicSequences";
import FormsProvider from '@cerebral/forms';
import { state } from 'cerebral/tags';

export default Module({
  state: {
    currentStep: null,
    currentStepId: null,
    steps: ['start', 'stop', 'greet', 'startNearest', 'startLibrary', 'startBook', 'nearest', 'library', 'book'],
    dialog: [
      // {
      //   id: '2',
      //   author: 'guest',
      //   time: '12:37',
      //   content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
      // },
      // {
      //   id: '3',
      //   author: 'bot',
      //   time: '12:38',
      //   content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
      //   type: 'startBook',
      // },
      // {
      //   id: '4',
      //   author: 'bot',
      //   time: '12:38',
      //   content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
      //   type: 'startBook',
      // },
      // {
      //   id: '5',
      //   author: 'guest',
      //   time: '12:37',
      //   content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
      // },
    ],
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
  },
  providers: {},
  modules: {},
});
