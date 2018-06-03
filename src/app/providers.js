/**
 * @module providers
 */

import { Provider } from "cerebral";
import sha1 from 'js-sha1';

/**
 * Returns sha1 hash of string
 * @type {Provider}
 */
export const hashProvider = Provider({
  sha1(str) {
    return sha1(str);
  },
});

let ggg;

/**
 * Gives service for long leaving of promise to process delete confirmation.<br>
 * Promise is created when user wants to delete item.<br>
 * Promise is resolved or rejected as result of user confirmation.<br>
 * @type {Provider}
 */
export const longPromise = Provider({
  createPromise() {
    return new Promise((resolve, reject) => ggg = { resolve, reject });
  },

  resolvePromise(arg) {
    ggg && ggg.resolve && ggg.resolve(arg);
  },

  rejectPromise(arg) {
    ggg && ggg.reject && ggg.reject(arg);
  }
});
