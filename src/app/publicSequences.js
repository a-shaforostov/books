import { set, push, unset, when, wait } from "cerebral/operators";
import { props, state } from "cerebral/tags";
import * as factories from "./factories";
import * as actions from "./publicActions";

export const startStep = [
  actions.startStep,
  set(state`publicModule.currentStep`, 'start'),
  set(state`publicModule.currentStepId`, props`stepId`),
];

export const greetStep = [
  actions.greetStep,
  set(state`publicModule.currentStep`, 'greet'),
  set(state`publicModule.currentStepId`, props`stepId`),
];

export const startBookStep = [
  actions.startBookStep,
  set(state`publicModule.currentStep`, 'startBook'),
  set(state`publicModule.currentStepId`, props`stepId`),
];

export const stopStep = [
  set(state`publicModule.dialog`, []),
  startStep,
];

export const findBooks = [
  actions.startSearchBook,
  actions.findBooks,
  {
    success: [
      actions.foundBooks,
      set(state`publicModule.currentStep`, 'foundBooks'),
      set(state`publicModule.currentStepId`, props`stepId`),
    ],
    fail: [
      actions.bookNotFound,
      set(state`publicModule.currentStep`, 'bookNotFound'),
      set(state`publicModule.currentStepId`, props`stepId`),
    ],
  },
];
