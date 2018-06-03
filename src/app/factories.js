/**
 * Factories for creating sequences
 * @module factories
 */

import { set, when, wait } from "cerebral/operators";
import { redirect } from '@cerebral/router/operators'
import { state } from 'cerebral/tags';
import { pageTransitionDelay } from './constants';
import * as sequences from "./sequences";

/**
 * Process transition between routes
 * @param route - text name of route to go on
 * @returns sequence
 */
export const openRoute = route => {
  return [
    // В залежності від стану додатку
    when(state`isApplicationLoaded`),
    {
      true: [
        // Відпрацювати тільки якщо перехід на інший роут
        when(state`currentPage`, currentPage => currentPage !== route),
        {
          true: [
            set(state`currentPage`, null),
            wait(pageTransitionDelay),
            set(state`currentPage`, route),
          ],
          false: [],
        },
      ],
      false: [
        set(state`initialPage`, route),
      ],
    },
  ];
};

/**
 * Process authentication flow
 * @param continueSequence - sequence for continuing
 * @returns sequence
 */
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
