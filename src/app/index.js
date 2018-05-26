import { Module } from "cerebral";
import * as sequences from "./sequences";
import FormsProvider from '@cerebral/forms';
import router from './router';

export default Module({
  state: {
    currentPage: null,
    isApplicationLoaded: false,
  },
  signals: {
    rootRouted: sequences.rootRouted,
    adminRouted: sequences.adminRouted,
    applicationLoaded: sequences.applicationLoaded,
  },
  providers: {
    form: FormsProvider({
      // Add additional rules
      rules: {
        myAddedRule(value, arg, get) {
          // value of the field
          value
          // arg passed to the rule
          arg
          // The "get" argument from computed. Use it to grab
          // state or props passed to component. The component
          // will track use of these dependencies for rerender
          get

          return true
        }
      },

      // errorMessage property added to field when invalid with the following rules
      errorMessages: {
        minLength(value, minLength) {
          return `The length is ${
            value.length
            }, should be equal or more than ${minLength}`
        }
      }
    }),
  },
  modules: { router },
});
