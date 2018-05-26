// import { redirect } from "@cerebral/router/operators";
import { set, toggle, unset, when } from "cerebral/operators";
import { resetForm } from '@cerebral/forms/operators';
import { props, state } from "cerebral/tags";
import * as actions from "./actions";

// export const redirectToAll = redirect("/all");

export const rootRouted = set(state`currentPage`, 'root');
export const adminRouted = set(state`currentPage`, 'admin');

export const applicationLoaded = set(state`isApplicationLoaded`, true);
