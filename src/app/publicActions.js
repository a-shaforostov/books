function timeFormat(date) {
  return `${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`;
}

export const startStep = ({ state, props }) => {
  const value = {
    id: Date.now(),
    author: 'bot',
    time: timeFormat(new Date()),
    type: 'start',
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

export const greetStep = ({ state, props }) => {
  const value = {
    id: Date.now(),
    author: 'bot',
    time: timeFormat(new Date()),
    type: 'greet',
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

export const startBookStep = ({ state, props }) => {
  const value = {
    id: Date.now(),
    author: 'bot',
    time: timeFormat(new Date()),
    type: 'startBook',
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

export const justTextStep = ({ state, props }) => {
  const value = {
    id: Date.now(),
    author: 'guest',
    time: timeFormat(new Date()),
    content: props.value,
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

export const unknownStep = ({ state, props }) => {
  const value = {
    id: Date.now(),
    author: 'bot',
    time: timeFormat(new Date()),
    type: 'unknown',
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

export const startSearchBook = ({ state, props }) => {
  const value = {
    id: Date.now(),
    author: 'guest',
    time: timeFormat(new Date()),
    content: `Шукаємо книги за текстом: ${props.criteria}`,
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

export const bookNotFound = ({ state, props }) => {
  const value = {
    id: Date.now(),
    author: 'bot',
    time: timeFormat(new Date()),
    type: 'bookNotFound',
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

export const foundBooks = ({ state, props }) => {
  const value = {
    id: Date.now(),
    author: 'bot',
    time: timeFormat(new Date()),
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

  // fill names
  rawBooks.forEach(book => book.name = publishedBooks.find(pb => pb.id === book.isbn).name);

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
