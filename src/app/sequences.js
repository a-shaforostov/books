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

export const showModal = set(state`env.${props`name`}.edit`, props`show`);
export const updateField = set(state`forms.${props`form`}.${props`name`}.value`, props`value`);

export const submitLogin = actions.submitLogin;
export const openLogin = [
  set(state`env.login.edit`, true),
  resetForm(state`forms.login`),
];
export const closeLogin = [
  set(state`env.login.edit`, false),
  set(state`loginError`, false),
  ({ longPromise }) => longPromise.rejectPromise(),
];
export const logout = [
  set(state`user`, null),
  actions.logout,
  redirect('/'),
];
export const autologin = [
  actions.autologin,
  when(props`notFound`, props`silent`, (notFound, silent) => notFound && !silent),
  {
    true: openLogin,
    false: [],
  },
];

export const downloadFile = actions.downloadFile;

export const loadFile = [
  // actions.undoClear,
  actions.loadFile,
  // actions.undoPush,
];


export const selectLibrary = [
  set(state`env.libraries.selected`, props`id`),
  set(state`env.books.selected`, null),
];
export const selectBook = set(state`env.books.selected`, props`id`);
export const selectPublished = set(state`env.published.selected`, props`id`);

export const removeFromLibraries = actions.removeFromLibraries;

export const deleteEntity = [
  set(state`delete.entity`, props`entity`),
  set(state`delete.id`, props`id`),
  set(state`delete.name`, props`name`),
];

export const deleteEntityConfirm = actions.deleteEntityConfirm;
export const postEntity = actions.postEntity;

export const editEntity = [
  set(state`env.${props`entity`}.edit`, props`id`),
];

export const resetEditForm = resetForm(state`${props`form`}`);


