import { Compute } from "cerebral";
import { state } from "cerebral/tags";

export default Compute(
  state`data.libraries`,
  state`data.books`,
  state`data.published`,
  state`env.libraries.selected`,
  (libraries, books, published, selected, get) => {
    if (!selected) return null;

    const library = libraries.find(library => library.id === selected);
    const booksInLibrary = books.filter(book => book.library === library.id).map(book => {
      const publishedData = published.find(item => item.id === book.isbn);
      const { id, ...rest } = publishedData;
      return {
        ...book,
        ...rest,
      }
    });

    return {
      ...library,
      books: booksInLibrary.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1),
    }
  }
);
