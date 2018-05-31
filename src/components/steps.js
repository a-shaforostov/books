import React from 'react';
import { Segment, Button } from 'semantic-ui-react';
import LibraryInfo from "./LibraryInfo";

const styles = {
  wrapper: {
    textAlign: 'center',
  },
  row: {
    margin: '3px 0',
  },
  button: {
    width: '220px',
    padding: '4px 5px',
  },
  library: {
    fontSize: '90%',
  },
  book: {
    fontSize: '90%',
    marginLeft: '20px',
  },
} ;

export const stepInitialEl = ({ signals, isActive }) => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.row}><Button disabled={!isActive} onClick={() => signals.greetStep()}>Розпочати бесіду</Button></div>
    </div>
  )
};

export const stepStartEl = ({ signals, isActive }) => {
  return (
    <div style={styles.wrapper}>
      <div>Оберіть розділ</div>
      <div style={styles.row}><Button positive style={styles.button} disabled={!isActive}>Бібліотеки поблизу</Button></div>
      <div style={styles.row}><Button positive style={styles.button} disabled={!isActive}>Знайти бібліотеку</Button></div>
      <div style={styles.row}><Button positive style={styles.button} disabled={!isActive} onClick={() => signals.startBookStep()}>Знайти книгу</Button></div>
      <div style={styles.row}><Button negative style={styles.button} disabled={!isActive} onClick={() => signals.stopStep()}>Завершити бесіду</Button></div>
    </div>
  )
};

export const stepStartLibraryEl = () => {
  return (
    <div>
      <div>Введіть фрагмент назви бібліотеки</div>
    </div>
  )
};

export const stepStartBookEl = () => {
  return (
    <div>
      <div>Введіть текст для пошуку. Це може бути фрагмент назви, автора або ISBN</div>
    </div>
  )
};

export const unknownEl = () => {
  return (
    <div>
      <div>Я Вас не розумію. Керуйтеся настановами.</div>
    </div>
  )
};

export const bookNotFoundEl = ({ signals, isActive }) => {
  return (
    <div>
      <div>Книг за Вашим запитом не знайдено :(</div>
      <div style={{...styles.row, ...styles.wrapper}}>
        <Button positive style={styles.button} disabled={!isActive} onClick={() => signals.greetStep()}>Продовжити</Button>
      </div>
    </div>
  )
};

export const stepResultEl = ({ libraries, books }) => {
  return (
    <div>
      <div>Результат пошуку:</div>
      <div>
        {
          libraries &&
          libraries.map(library => (
            <div key={library.id}>
              {library.name}
            </div>
          ))
        }
        {
          books &&
          books.map(book => (
            <div key={book.id}>
              {book.name}
            </div>
          ))
        }
      </div>
    </div>
  )
};

export const foundBooksEl = ({ signals, isActive, data }) => {
  return (
    <div>
      <div>Результат пошуку:</div>
      <div>
        {
          data &&
          Object.keys(data).map(key => (
            <div key={key}>
              <div  style={styles.library}>
                {data[key].library.name} ({data[key].count})
              </div>
              <div>
                {
                  data[key].books.map(book => {
                    return (
                      <div key={book.id}  style={styles.book}>
                        {book.name}&nbsp;
                        [{
                          book.reserved
                          ? book.reserved
                          : isActive ? <a href="#">Замовити</a> : <span>Замовити</span>
                        }]
                      </div>
                    )
                  })
                }
              </div>
            </div>
          ))
        }
      </div>
      <div style={{...styles.row, ...styles.wrapper}}>
        <Button positive style={styles.button} disabled={!isActive} onClick={() => signals.greetStep()}>Продовжити</Button>
      </div>
    </div>
  )
};

export default {
  start: stepInitialEl,
  greet: stepStartEl,
  startLibrary: stepStartLibraryEl,
  startBook: stepStartBookEl,
  result: stepResultEl,
  bookNotFound: bookNotFoundEl,
  foundBooks: foundBooksEl,
  unknown: unknownEl,
};
