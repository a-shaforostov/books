/**
 * Actions for public part
 * @module ActionsPublic
 */

import { timeFormatHM } from './utils';
import { reservationTime } from './constants';
import { removeDashes, isApproxEqual } from './utils';
import { downloadFile } from './actions';
import html2canvas from 'html2canvas';

/**
 * Step of chat
 * @param state
 * @param props
 */
export const startStep = ({ state, props }) => {
  const value = {
    id: Math.random(),
    author: 'bot',
    time: timeFormatHM(new Date()),
    type: 'start',
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

/**
 * Step of chat
 * @param state
 * @param props
 */
export const greetStep = ({ state, props }) => {
  const value = {
    id: Math.random(),
    author: 'bot',
    time: timeFormatHM(new Date()),
    type: 'greet',
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

/**
 * Step of chat
 * @param state
 * @param props
 */
export const geolocationDenied = ({ state, props }) => {
  const value = {
    id: Math.random(),
    author: 'bot',
    time: timeFormatHM(new Date()),
    type: 'geolocationDenied',
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

/**
 * Step of chat
 * @param state
 * @param props
 */
export const startBookStep = ({ state, props }) => {
  const value = {
    id: Math.random(),
    author: 'bot',
    time: timeFormatHM(new Date()),
    type: 'startBook',
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

/**
 * Step of chat
 * @param state
 * @param props
 */
export const justTextStep = ({ state, props }) => {
  const value = {
    id: Math.random(),
    author: 'guest',
    time: timeFormatHM(new Date()),
    content: props.value,
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

/**
 * Step of chat
 * @param state
 * @param props
 */
export const showAllLibs = ({ state, props }) => {
  const value = {
    id: Math.random(),
    author: 'guest',
    time: timeFormatHM(new Date()),
    content: 'Покажи всі бібліотеки поблизу від мене',
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

/**
 * Step of chat
 * @param state
 * @param props
 */
export const showRegLibs = ({ state, props }) => {
  const value = {
    id: Math.random(),
    author: 'guest',
    time: timeFormatHM(new Date()),
    content: 'Покажи всі бібліотеки поблизу від мене де я можу зарезервувати книгу',
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

/**
 * Step of chat
 * @param state
 * @param props
 */
export const allLibsWasShown = ({ state, props }) => {
  const value = {
    id: Math.random(),
    author: 'bot',
    time: timeFormatHM(new Date()),
    type: 'allLibsWasShown',
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

/**
 * Step of chat
 * @param state
 * @param props
 */
export const regLibsWasShown = ({ state, props }) => {
  const value = {
    id: Math.random(),
    author: 'bot',
    time: timeFormatHM(new Date()),
    type: 'regLibsWasShown',
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

/**
 * Step of chat
 * @param state
 * @param props
 */
export const unknownStep = ({ state, props }) => {
  const value = {
    id: Math.random(),
    author: 'bot',
    time: timeFormatHM(new Date()),
    type: 'unknown',
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

/**
 * Step of chat
 * @param state
 * @param props
 */
export const startSearchBook = ({ state, props }) => {
  const value = {
    id: Math.random(),
    author: 'guest',
    time: timeFormatHM(new Date()),
    content: `Шукаємо книги за текстом: ${props.criteria}`,
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

/**
 * Step of chat
 * @param state
 * @param props
 */
export const bookNotFound = ({ state, props }) => {
  const value = {
    id: Math.random(),
    author: 'bot',
    time: timeFormatHM(new Date()),
    type: 'bookNotFound',
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

/**
 * Step of chat
 * @param state
 * @param props
 */
export const foundBooks = ({ state, props }) => {
  const value = {
    id: Math.random(),
    author: 'bot',
    time: timeFormatHM(new Date()),
    type: 'foundBooks',
    data: props.result,
  };
  state.push('publicModule.dialog', value);
  props.stepId = value.id;
};

/**
 * Step of chat
 * @param state
 * @param props
 * @param path
 */
export const findBooks = ({ state, props, path }) => {
  const books = state.get('data.books');
  const published = state.get('data.published');
  const libraries = state.get('data.libraries');

  // find relevant
  const { criteria } = props;
  const publishedBooks = published.filter(book => {
    const isbn = removeDashes(String(book.id).toLowerCase()).indexOf(removeDashes(criteria.toLowerCase())) !== -1;
    const name = isApproxEqual(book.name, criteria);
    const author = isApproxEqual(book.author, criteria);
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

  // update libraries with data and books number
  Object.keys(groupedBooks).forEach(item => {
    const libNode = groupedBooks[item];
    const lib = libraries.find(lib => lib.id === item);
    libNode.count = libNode.books.length;
    libNode.library = lib;
  });

  // calc distance in place it in object
  if (window.google) {
    const myPosition = state.get('publicModule.myPosition');
    const updateDistance = libs => {
      const geom = window.google.maps.geometry.spherical;
      for (let lib in libs) {
        const from = new window.google.maps.LatLng(myPosition);
        const to = new window.google.maps.LatLng({
          lat: +libs[lib].library.lat,
          lng: +libs[lib].library.lng,
        });
        libs[lib].dist = geom.computeDistanceBetween(from, to);
      }
    };
    updateDistance(groupedBooks);
  }

  // build array that ordered by distance (or by name if geolocation is disabled)
  const arrBooks = Object.keys(groupedBooks).map(key => groupedBooks[key]);
  if (window.google) {
    arrBooks.sort((a, b) => a.dist - b.dist);
  } else {
    arrBooks.sort((a, b) => a.library.name.toLowerCase() > b.library.name.toLowerCase() ? 1 : -1);
  }

  state.set('foundBooks', arrBooks);
  props.result = arrBooks;

  if (arrBooks.length) {
    return path.success();
  } else {
    return path.fail();
  }
};

/**
 * Approve reservation
 * @param state
 */
export const reserveBookApprove = ({ state }) => {
  const books = state.get('data.books');
  const id = state.get('publicModule.reserve.id');
  const now = new Date();
  const time = new Date(now.getTime() + reservationTime*60*1000);
  const updated = books.map(book => book.id === id ? { ...book, reserved: time } : book);
  state.set('data.books', updated);
};

/**
 * Save dialog in file
 * @param context
 */
export const saveDialog = async (context) => {
  const { props } = context;
  const dialog = document.getElementById('dialogContent');
  const canvas = await html2canvas(dialog);
  props.data = canvas.toDataURL('image/png');
  props.filename = 'dialog.png';
  downloadFile(context);
};
