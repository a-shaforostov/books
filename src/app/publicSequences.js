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

export const justTextStep = [
  actions.justTextStep,
  set(state`publicModule.currentStep`, 'justText'),
  set(state`publicModule.currentStepId`, props`stepId`),
  actions.unknownStep,
  set(state`publicModule.currentStep`, 'unknown'),
  set(state`publicModule.currentStepId`, props`stepId`),
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

export const reserveBookRequest = [
  set(state`publicModule.reserve.id`, props`id`),
  set(state`publicModule.reserve.name`, props`name`),
  set(state`publicModule.reserve.libName`, props`libName`),
];

export const reserveBookCancel = [
  set(state`publicModule.reserve.id`, null),
  set(state`publicModule.reserve.name`, null),
  set(state`publicModule.reserve.libName`, null),
];

export const reserveBookApprove = [
  actions.reserveBookApprove,
  set(state`publicModule.reserve.id`, null),
  set(state`publicModule.reserve.name`, null),
  set(state`publicModule.reserve.libName`, null),
  // set(state`publicModule.currentStep`, 'bookReserved'),
  // set(state`publicModule.currentStepId`, props`stepId`),
];
