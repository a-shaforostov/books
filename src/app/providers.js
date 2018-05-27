import { Provider } from "cerebral";
import sha1 from 'js-sha1';

export const hashProvider = Provider({
  sha1(str) {
    return sha1(str);
  },
});

let ggg;

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
