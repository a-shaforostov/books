import { set, when, wait } from "cerebral/operators";
import { redirect } from '@cerebral/router/operators'
import { state } from 'cerebral/tags';
import { pageTransitionDelay } from './constants';
import * as sequences from "./sequences";

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

export const authenticate = (continueSequence = []) => {
  return [
    sequences.autologin,
    when(state`user`, user => !!user),
    {
      true: [],
      false: [
        // Якщо користувач не аутентифікований - чекати на проміс з результатами аутентифікації
        ({ longPromise }) => longPromise.createPromise(),
      ],
    },
    when(state`user`, user => !!user),
    {
      true: [
        continueSequence
      ],
      false: [redirect('/')],
    },
  ]
};
