import { Module } from "cerebral";
import * as sequences from "./sequences";
import FormsProvider from '@cerebral/forms';

import { hashProvider } from "./providers";
import router from './router';

import avatar from '../assets/avatar.png';

export default Module({
  state: {
    currentPage: null,
    isApplicationLoaded: false,
    user: null,
    loginError: false,
    forms: {
      login: {
        name: {
          value: '',
          defaultValue: '',
        },
        pass: {
          value: '',
          defaultValue: '',
        },
      }
    },
    visibleForms: {
      login: false,
    },
    users: {
      'test@gmail.com': {
        name: 'Тарас Бульба',
        pass: 'e42776aa51230617b6ac2d4690d78771d26acd39',
        avatar: avatar,
      }
    }
  },
  signals: {
    rootRouted: sequences.rootRouted,
    adminRouted: sequences.adminRouted,
    applicationLoaded: sequences.applicationLoaded,
    showModal: sequences.showModal,
    updateField: sequences.updateField,
    submitLogin: sequences.submitLogin,
    openLogin: sequences.openLogin,
    closeLogin: sequences.closeLogin,
    logout: sequences.logout,
  },
  providers: {
    hash: hashProvider,
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
