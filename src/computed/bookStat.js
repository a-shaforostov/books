import { Compute } from "cerebral";
import { state } from "cerebral/tags";

export default Compute(
  state`data.libraries`,
  state`data.books`,
  state`data.published`,
  (libraries, books, published ) => ({
    books: books.length,
    published: published.length,
    libraries: libraries.length,
  }),
);
