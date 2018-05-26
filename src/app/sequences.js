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
  }

];
