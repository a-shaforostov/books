// import { redirect } from "@cerebral/router/operators";
import { set, toggle, unset, when, wait } from "cerebral/operators";
import { resetForm } from '@cerebral/forms/operators';
import { redirect } from '@cerebral/router/operators';
import { props, state } from "cerebral/tags";
import * as factories from "./factories";
import * as actions from "./actions";
import { pageTransitionDelay } from './constants';

// export const redirectToAll = redirect("/all");

export const rootRouted = factories.openRoute('root');
export const adminRouted = factories.openRoute('admin');

export const applicationLoaded = [
  set(state`isApplicationLoaded`, true),
  wait(pageTransitionDelay),
  when(state`initialPage`),
  {
    true: set(state`currentPage`, state`initialPage`),
    false: redirect('/'),
  },
];

export const showModal = set(state`visibleForms.${props`name`}`, props`show`);
export const updateField = set(state`forms.${props`form`}.${props`name`}.value`, props`value`);
export const submitLogin = actions.submitLogin;
export const openLogin = [
  set(state`visibleForms.login`, true),
  resetForm(state`forms.login`),
];
export const closeLogin = [
  set(state`visibleForms.login`, false),
  set(state`loginError`, false),
];
export const logout = set(state`user`, null);
