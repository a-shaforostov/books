import { Provider } from "cerebral";
import sha1 from 'js-sha1';

export const hashProvider = Provider({
  sha1(str) {
    return sha1(str);
  },
});
