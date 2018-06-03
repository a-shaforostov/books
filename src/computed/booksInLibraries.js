/**
 * Split book by libraries and count totals
 * @module computed/booksInLibraries
 */

import { Compute } from "cerebral";
import { state } from "cerebral/tags";

export default Compute(
  state`data.libraries`,
  state`data.books`,
  state`data.published`,
  state`env.published.selected`,
  (libraries, books, published, selected, get) => {
    if (!selected) return null;
    const booksByCode = books.filter(book => book.isbn === selected);

    const totalsByLibraries = booksByCode.reduce(
      (total, current) => ({ ...total, [current.library]: (total[current.library] || 0) + 1 }),
      {},
    );

    const byLibraries = Object.keys(totalsByLibraries).map(lib => {
      const library = libraries.find(library => library.id === lib);
      return {
        id: lib,
        name: library ? library.name : '',
        count: totalsByLibraries[lib],
      }
    });

    return {
      byLibraries,
      total: byLibraries.reduce((sum, item) => sum + item.count, 0),
    };
  }
);
