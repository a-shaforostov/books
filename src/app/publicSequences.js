/**
 * Sequences for public part
 * @module SequencesPublic
 */

/**
 * Sequences for public part
 */

import { set, when } from "cerebral/operators";
import { props, state } from "cerebral/tags";
import * as actions from "./publicActions";

/**
 * chat step action
 * @type *
 */
export const startStep = [
  actions.startStep,
  set(state`publicModule.currentStep`, 'start'),
  set(state`publicModule.currentStepId`, props`stepId`),
];

/**
 * chat step action
 * @type *
 */
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

/**
 * chat step action
 * @type *
 */
export const justTextStep = [
  actions.justTextStep,
  actions.unknownStep,
  greetStep,
];

/**
 * chat step action
 * @type *
 */
export const startBookStep = [
  actions.startBookStep,
  set(state`publicModule.currentStep`, 'startBook'),
  set(state`publicModule.currentStepId`, props`stepId`),
];

/**
 * chat step action
 * @type *
 */
export const stopStep = [
  actions.saveDialog,
  set(state`publicModule.dialog`, []),
  startStep,
];

/**
 * chat step action
 * @type *
 */
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

/**
 * chat step action
 * @type *
 */
export const reserveBookRequest = [
  set(state`publicModule.reserve.id`, props`id`),
  set(state`publicModule.reserve.name`, props`name`),
  set(state`publicModule.reserve.libName`, props`libName`),
];

/**
 * chat step action
 * @type *
 */
export const reserveBookCancel = [
  set(state`publicModule.reserve.id`, null),
  set(state`publicModule.reserve.name`, null),
  set(state`publicModule.reserve.libName`, null),
];

/**
 * chat step action
 * @type *
 */
export const reserveBookApprove = [
  actions.reserveBookApprove,
  set(state`publicModule.reserve.id`, null),
  set(state`publicModule.reserve.name`, null),
  set(state`publicModule.reserve.libName`, null),
];

/**
 * chat step action
 * @type *
 */
export const showAllLibsStep = [
  actions.showAllLibs,
  actions.allLibsWasShown,
  set(state`publicModule.currentStep`, 'allLibsWasShown'),
  set(state`publicModule.currentStepId`, props`stepId`),
  set(state`publicModule.mapStyle`, `allLibsMapStyle`),
];

/**
 * chat step action
 * @type *
 */
export const showRegLibsStep = [
  actions.showRegLibs,
  actions.regLibsWasShown,
  set(state`publicModule.currentStep`, 'regLibsWasShown'),
  set(state`publicModule.currentStepId`, props`stepId`),
  set(state`publicModule.mapStyle`, `regLibsMapStyle`),
];

/**
 * Show lib on map
 * @type *
 */
export const showOneLib = [
  set(state`publicModule.mapLib`, props`lib`),
  set(state`publicModule.mapStyle`, `oneLibMapStyle`),
];

/**
 * Set geolocation position
 * @type *
 */
export const setMyPosition = [
  when(props`position`, loc => !!loc),
  {
    true: set(state`publicModule.myPosition`, props`position`),
    false: set(state`publicModule.myPosition`, null),
  },
];
