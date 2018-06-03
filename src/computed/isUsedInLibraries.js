/**
 * Check if book is stored in libraries
 * @module computed/isUsedInLibraries
 */

import { Compute } from "cerebral";
import { state } from "cerebral/tags";

export default Compute(
  state`data.books`,
  state`env.published.selected`,
  (books, selected, get) => {
    if (!selected) return false;

    return books.some(book => book.isbn === selected);
  }
);
