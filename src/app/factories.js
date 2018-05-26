import { set, when, wait } from "cerebral/operators";
import { state } from 'cerebral/tags';
import { pageTransitionDelay } from './constants';

export const openRoute = route => [
  when(state`isApplicationLoaded`),
  {
    true: [
      set(state`currentPage`, null),
      wait(pageTransitionDelay),
      set(state`currentPage`, route),
    ],
    false: [
      set(state`initialPage`, route),
    ],
  },
];
