import React, { Component, Fragment } from 'react';
import injectSheet from 'react-jss';
import classnames from 'classnames';
import flow from 'lodash/flow';

import { Segment, Icon, Popup } from 'semantic-ui-react';

import styles from './PublishedBook.styles';
import { DragSource } from 'react-dnd';


class PublishedBook extends Component {
  componentDidMount() {
    const img = new Image();
    img.height = 64;
    img.onload = () =>
      this.props.connectDragPreview && this.props.connectDragPreview(img);
    img.alt = 'dragged book';
    img.src = 'data:image/png;base64,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';
  };

  render() {
    const { classes, selected, stats, book, connectDragSource, isDragging } = this.props;
    return (connectDragSource(

      <div key={book.id} id={book.id}>
        <Segment
          key={book.id}
          className={classnames([classes.book, { [classes.bookSel]: selected === book.id, [classes.draggingBook]: isDragging }])}
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
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging(),
    })
  ),
  injectSheet(styles),
)(PublishedBook);
