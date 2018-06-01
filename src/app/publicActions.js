import { timeFormatHM, timeFormatHMS } from './utils';
import { reservationTime } from './constants';

export const startStep = ({ state, props }) => {
  const value = {
    id: Date.now(),
    author: 'bot',
    time: timeFormatHM(new Date()),
    type: 'start',
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

export const greetStep = ({ state, props }) => {
  const value = {
    id: Date.now(),
    author: 'bot',
    time: timeFormatHM(new Date()),
    type: 'greet',
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

export const startBookStep = ({ state, props }) => {
  const value = {
    id: Date.now(),
    author: 'bot',
    time: timeFormatHM(new Date()),
    type: 'startBook',
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

export const justTextStep = ({ state, props }) => {
  const value = {
    id: Date.now(),
    author: 'guest',
    time: timeFormatHM(new Date()),
    content: props.value,
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

export const unknownStep = ({ state, props }) => {
  const value = {
    id: Date.now(),
    author: 'bot',
    time: timeFormatHM(new Date()),
    type: 'unknown',
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

export const startSearchBook = ({ state, props }) => {
  const value = {
    id: Date.now(),
    author: 'guest',
    time: timeFormatHM(new Date()),
    content: `Шукаємо книги за текстом: ${props.criteria}`,
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

export const bookNotFound = ({ state, props }) => {
  const value = {
    id: Date.now(),
    author: 'bot',
    time: timeFormatHM(new Date()),
    type: 'bookNotFound',
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

export const foundBooks = ({ state, props }) => {
  const value = {
    id: Date.now(),
    author: 'bot',
    time: timeFormatHM(new Date()),
    type: 'foundBooks',
    data: props.result,
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

export const findBooks = ({ state, props, path }) => {
  const books = state.get('data.books');
  const published = state.get('data.published');
  const libraries = state.get('data.libraries');

  // find relevant
  const { criteria } = props;
  const publishedBooks = published.filter(book => {
    const isbn = String(book.id).toLowerCase().indexOf(criteria.toLowerCase()) !== -1;
    const name = String(book.name).toLowerCase().indexOf(criteria.toLowerCase()) !== -1;
    const author = String(book.author).toLowerCase().indexOf(criteria.toLowerCase()) !== -1;
    return isbn || name || author;
  });

  // books in libraries that fit criteria
  const rawBooks = books.filter(book => publishedBooks.some(pb => pb.id === book.isbn));

  // fill names and authors
  rawBooks.forEach(book => {
    const pb = publishedBooks.find(pb => pb.id === book.isbn);
    book.name = pb.name;
    book.author = pb.author;
  });

  // order
  rawBooks.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);

  // group by libraries
  const groupedBooks = rawBooks.reduce((acc, book) => {
    const lib = acc[book.library] ? acc[book.library] : {};
    const libBooks = lib.books ? lib.books : [];
    return {
      ...acc,
      [book.library]: {
        books: [ ...libBooks, book ],
      },
    }
  }, {});

  // const groupedBooks = {};
  // rawBooks.forEach(book => {
  //   if (groupedBooks[book.library]) {
  //     if (groupedBooks[book.library].books) {
  //       groupedBooks[book.library].books.push(book);
  //     } else {
  //       groupedBooks[book.library].books = [book];
  //     }
  //   } else {
  //     groupedBooks[book.library] = { books: [] }
  //   }
  // });

  // update libraries with data and books number
  Object.keys(groupedBooks).forEach(item => {
    const libNode = groupedBooks[item];
    const lib = libraries.find(lib => lib.id === item);
    libNode.count = libNode.books.length;
    libNode.library = lib;
  });

  state.set('foundBooks', groupedBooks);
  props.result = groupedBooks;

  if (Object.keys(groupedBooks).length) {
    return path.success();
  } else {
    return path.fail();
  }
};

export const reserveBookApprove = ({ state, props }) => {
  const books = state.get('data.books');
  const id = state.get('publicModule.reserve.id');
  const name = state.get('publicModule.reserve.name');
  const now = new Date();
  const time = new Date(now.getTime() + reservationTime*60*1000);
  const updated = books.map(book => book.id === id ? { ...book, reserved: time } : book);
  state.set('data.books', updated);

  // const value = {
  //   id: Date.now(),
  //   author: 'bot',
  //   time: timeFormatHM(new Date()),
  //   type: 'bookReserved',
  //   data: name,
  // };
  // state.push('publicModule.dialog', value);
  // props.stepId = value.id;
};



// export const updateFoundBooks = ({ state }) => {
//   const found = state.get('foundBooks');
//   const books = state.get('data.books');
//   Object.keys(found).forEach(key => {
//     const src = books.find(srcBook => srcBook.id === found[key].id);
//     debugger;
//     found[key].reserved = src.reserved;
//   })
// };
