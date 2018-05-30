import React, { Component, Fragment } from 'react';
import injectSheet from 'react-jss';
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';
import classnames from 'classnames';

import { Segment, Header, Icon, Popup } from 'semantic-ui-react';

import booksInLibraries from '../computed/booksInLibraries';
import styles from './Published.styles';

class Published extends Component {
  handleDelete = ({entity, id, name}) => (e) => {
    e.stopPropagation();
    this.props.onDelete({entity, id, name});
  };

  handleRemoveFromLibraries = ({ id }) => (e) => {
    e.stopPropagation();
    this.props.removeFromLibraries({ id });
  };

  handleSelect = id => () => {
    const { selected } = this.props;
    this.props.selectPublished({ id: selected === id ? null : id });
  };

  handleSelectLibrary = id => e => {
    e.stopPropagation();
    e.preventDefault();
    this.props.selectLibrary({ id });
  };

  handleEdit = ({entity, id}) => (e) => {
    e.stopPropagation();
    this.props.onEdit({entity, id});
  };

  render() {
    const { classes, selected, published, stats } = this.props;
    return (
      <div className={classes.list}>
        {
          published &&
          <Fragment>
            <Header as="h3" className={classes.header}>Книги</Header>
            <Segment.Group piled className={classes.group}>
              <Segment
                key={-1}
                className={classes.addBook}
                onClick={this.handleEdit({ entity: 'published', id: -1 })}
              >
                <span className={classes.name}><Icon name="add" /> Додати книгу</span>
              </Segment>

              <div className={classes.interior}>
                {
                  published
                    .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
                    .map(book => (
                      <Segment
                        key={book.id}
                        className={classnames([classes.book, { [classes.bookSel]: selected === book.id }])}
                        onClick={this.handleSelect(book.id)}
                      >
                        <span className={classnames([classes.bookName, { [classes.bookNameVisible]: selected === book.id }])} title={book.name}>
                          <Icon name="book"/>
                          {book.name}
                        </span>
                        {
                          selected !== book.id &&
                          <div className={classes.isbn}>{book.id}</div>
                        }
                        <div className={classnames([classes.bookDetails, { [classes.bookDetailsVisible]: selected === book.id }])}>
                          <img className={classes.bookImage} src={book.image} alt="book"/>
                          <div className={classnames([classes.bookInfo, { [classes.bookInfoVisible]: selected === book.id }])}>
                            <div className={classes.row}>
                              <span>Автор:&nbsp;</span>
                              <span className={classes.bookData}>{book.author}</span>
                            </div>
                            <div className={classes.row}>
                              <span>Рік:&nbsp;</span>
                              <span className={classes.bookData}>{book.year}</span>
                            </div>
                            <div className={classes.row}>
                              <span>ISBN:&nbsp;</span>
                              <span className={classes.bookData}>{book.id}</span>
                            </div>
                            <div className={classes.row}>
                              <span>Всього в бібліотеках:&nbsp;</span>
                              <span className={classes.bookData}>{stats && stats.total}</span>
                            </div>
                            <div>
                              <Popup
                                trigger={
                                  <Icon
                                    size="large" name="edit" className={`${classes.bigBookButton} edit`}
                                    onClick={this.handleEdit({ entity: 'published', id: book.id })}
                                  />
                                }
                                content='Редагування книги'
                              />
                              <Popup
                                trigger={
                                  <Icon
                                    size="large" name="remove circle" className={`${classes.bigBookButton} remove`}
                                    onClick={this.handleRemoveFromLibraries({ id: book.id })}
                                  />
                                }
                                content='Видалити з біблиотек'
                              />
                              <Popup
                                trigger={
                                  <Icon
                                    size="large" name="delete" className={`${classes.bigBookButton} delete`}
                                    onClick={this.handleDelete({ entity: 'published', id: book.id, name: book.name })}
                                  />
                                }
                                content='Видалення книги'
                              />
                            </div>
                          </div>
                        </div>
                        {
                          selected !== book.id &&
                          <Fragment>
                            <Popup
                              trigger={
                                <Icon
                                  className={classes.editBookButton} size="small" name="edit"
                                  onClick={this.handleEdit({ entity: 'published', id: book.id })}
                                />
                              }
                              content='Редагування книги'
                            />
                            <Popup
                              trigger={
                                <Icon
                                  className={classes.removeBookButton} size="small" name="remove circle"
                                  onClick={this.handleRemoveFromLibraries({ id: book.id })}
                                />
                              }
                              content='Видалити з біблиотек'
                            />
                            <Popup
                              trigger={
                                <Icon
                                  className={classes.deleteBookButton} size="small" name="delete"
                                  onClick={this.handleDelete({ entity: 'published', id: book.id, name: book.name })}
                                />
                              }
                              content='Видалення книги'
                            />
                          </Fragment>
                        }
                        {
                          stats && selected === book.id &&
                          <Fragment>
                            {
                              Object.keys(stats.byLibraries).length > 0 &&
                              <div key={-1} className={classes.presenceTitle}>Наявність в бібліотеках:</div>
                            }
                            {
                              Object.keys(stats.byLibraries).map(key => {
                                const { id, count, name } = stats.byLibraries[key];
                                return (
                                  <div key={id} className={classes.presence}>
                                    <span className={classes.presenceNumber}>{count}</span>
                                    <a className={classes.presenceLink} onClick={this.handleSelectLibrary(id)}>{name}</a>
                                  </div>
                                )
                              })
                            }
                          </Fragment>
                        }
                      </Segment>
                  ))
                }
              </div>
            </Segment.Group>
          </Fragment>
        }
      </div>
    )
  }
}

export default connect(
  {
    selected: state`env.published.selected`,
    published: state`data.published`,
    stats: booksInLibraries,
    editEntity: signal`editEntity`,
    selectPublished: signal`selectPublished`,
    selectLibrary: signal`selectLibrary`,
    removeFromLibraries: signal`removeFromLibraries`,
  },
  injectSheet(styles)(Published),
);
