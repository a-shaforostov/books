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
  when(state`publicModule.myPosition`, pos => !!pos),
  {
    true: [],
    false: [
      actions.geolocationDenied,
      set(state`publicModule.myPosition`, { lat: 50.45466, lng: 30.5238 }),
    ],
  },
  actions.greetStep,
  set(state`publicModule.currentStep`, 'greet'),
  set(state`publicModule.currentStepId`, props`stepId`),
  set(state`publicModule.mapStyle`, null),
];

export const justTextStep = [
  actions.justTextStep,
  actions.unknownStep,
  greetStep,
];

export const startBookStep = [
  actions.startBookStep,
  set(state`publicModule.currentStep`, 'startBook'),
  set(state`publicModule.currentStepId`, props`stepId`),
];

export const stopStep = [
  actions.saveDialog,
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
    ],
    fail: [
      actions.bookNotFound,
      set(state`publicModule.currentStep`, 'bookNotFound'),
    ],
  },
  set(state`publicModule.currentStepId`, props`stepId`),
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

export const showAllLibsStep = [
  actions.showAllLibs,
  actions.allLibsWasShown,
  set(state`publicModule.currentStep`, 'allLibsWasShown'),
  set(state`publicModule.currentStepId`, props`stepId`),
  set(state`publicModule.mapStyle`, `allLibsMapStyle`),
];

export const showRegLibsStep = [
  actions.showRegLibs,
  actions.regLibsWasShown,
  set(state`publicModule.currentStep`, 'regLibsWasShown'),
  set(state`publicModule.currentStepId`, props`stepId`),
  set(state`publicModule.mapStyle`, `regLibsMapStyle`),
];

export const showOneLib = [
  set(state`publicModule.mapLib`, props`lib`),
  set(state`publicModule.mapStyle`, `oneLibMapStyle`),
];

export const setMyPosition = [
  ({ props }) => console.log(props),
  when(props`position`, loc => !!loc),
  {
    true: set(state`publicModule.myPosition`, props`position`),
    false: set(state`publicModule.myPosition`, null),
  },
];
