import React, { Component, Fragment } from 'react';
import injectSheet from 'react-jss';
import classnames from 'classnames';
import flow from 'lodash/flow';

import { Segment, Icon, Popup } from 'semantic-ui-react';

import styles from './PublishedBook.styles';
import {DragSource} from "react-dnd/lib/index";

class PublishedBook extends Component {
  render() {
    const { classes, selected, stats, book, connectDragSource } = this.props;
    return (connectDragSource(

      <div key={book.id} id={book.id}>
        <Segment
          key={book.id}
          className={classnames([classes.book, { [classes.bookSel]: selected === book.id }])}
          onClick={this.props.onSelect(book.id)}
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
                      onClick={this.props.onEdit({ entity: 'published', id: book.id })}
                    />
                  }
                  content='Редагування книги'
                />
                <Popup
                  trigger={
                    <Icon
                      size="large" name="remove circle" className={`${classes.bigBookButton} remove`}
                      onClick={this.props.onRemoveFromLibraries({ id: book.id })}
                    />
                  }
                  content='Видалити з біблиотек'
                />
                <Popup
                  trigger={
                    <Icon
                      size="large" name="delete" className={`${classes.bigBookButton} delete`}
                      onClick={this.props.onDelete({ entity: 'published', id: book.id, name: book.name })}
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
                    onClick={this.props.onEdit({ entity: 'published', id: book.id })}
                  />
                }
                content='Редагування книги'
              />
              <Popup
                trigger={
                  <Icon
                    className={classes.removeBookButton} size="small" name="remove circle"
                    onClick={this.props.onRemoveFromLibraries({ id: book.id })}
                  />
                }
                content='Видалити з біблиотек'
              />
              <Popup
                trigger={
                  <Icon
                    className={classes.deleteBookButton} size="small" name="delete"
                    onClick={this.props.onDelete({ entity: 'published', id: book.id, name: book.name })}
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
                      <a className={classes.presenceLink} onClick={this.props.onSelectLibrary(id)}>{name}</a>
                    </div>
                  )
                })
              }
            </Fragment>
          }
        </Segment>
      </div>
    ))
  }
}

const bookSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    const item = { id: props.book.id };
    console.log('start drag with', props.book);
    return item;
  },

  // endDrag(props, monitor, component) {
  //   if (!monitor.didDrop()) {
  //     return;
  //   }
  //
  //   // When dropped on a compatible target, do something
  //   const item = monitor.getItem();
  //   const dropResult = monitor.getDropResult();
  //   CardActions.moveCardToList(item.id, dropResult.listId);
  // }
};

export default flow(
  DragSource(
    'BOOK',
    bookSource,
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    })
  ),
  injectSheet(styles),
)(PublishedBook);
