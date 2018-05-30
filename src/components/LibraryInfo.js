import React, { Component, Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import injectSheet from 'react-jss';
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';
import classnames from 'classnames';
import flow from 'lodash/flow';
import { DropTarget } from 'react-dnd';

import libraryCompute from '../computed/library';

import { Segment, Header, Icon, Popup } from 'semantic-ui-react';

import styles from './LibraryInfo.styles';

class LibraryInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      library: props.library,
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.library) {
      this.setState({ library: newProps.library })
    }
  }

  handleSelect = id => () => {
    const { selected } = this.props;
    this.props.selectBook({ id: selected === id ? null : id });
  };

  handleDelete = ({entity, id, name}) => (e) => {
    e.stopPropagation();
    this.props.onDelete({entity, id, name});
  };

  handleEdit = ({entity, id}) => (e) => {
    e.stopPropagation();
    this.props.onEdit({entity, id});
  };

  render() {
    const { classes, selected, selectedLib } = this.props;
    const { isOver, canDrop, connectDropTarget } = this.props;
    const { library } = this.state;
    return (
      <div className={classnames([classes.list, {[classes.hidden]: !selectedLib}])}>
        {
          library &&
          <Fragment>
            <Header as="h3" className={classes.header}>&nbsp;</Header>
            <Segment.Group piled className={classes.group}>
              <div className={classes.libName}>{library.name}</div>
              <div className={classes.libAddr}>{library.address}</div>
              {
                connectDropTarget(
                  <div className={classnames([classes.interior, {[classes.interiorEmpty]: library.books.length === 0}])}>
                    {
                      library.books.map(book => (
                        <Segment
                          key={book.id}
                          className={classnames([classes.book, { [classes.bookSel]: selected === book.id }])}
                          onClick={this.handleSelect(book.id)}
                        >
                      <span className={classnames([classes.bookName, { [classes.bookNameVisible]: selected === book.id }])} title={book.name}>
                        {selected !== book.id && <Icon name="book"/>}
                        {book.name}
                      </span>
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
                                <span className={classes.bookData}>{book.isbn}</span>
                              </div>
                              <div className={classes.row}>
                                <span>Резерв до:&nbsp;</span>
                                <span className={classes.bookData}>
                              {
                                book.reserved ?
                                  <span style={{color: 'red'}}>{book.reserved}</span> :
                                  <span style={{color: 'green'}}>Вільна</span>
                              }
                            </span>
                              </div>
                            </div>
                          </div>
                          <Popup
                            trigger={
                              <Icon
                                className={classes.deleteBookButton}
                                size={selected === book.id ? 'large' : 'small' }
                                name="delete"
                                onClick={this.handleDelete({ entity: 'books', id: book.id, name: book.name })}
                              />
                            }
                            content='Видалення книги з бібліотеки'
                          />
                        </Segment>
                      ))
                    }
                    {
                      library.books.length === 0 &&
                      <div className={classes.dropPlace}>Перетягніть книгу на цей лист. <br/> Так вона потрапить в бібліотеку.</div>
                    }
                  </div>
                )
              }

              <div className={classes.footer}>
                <Popup
                  trigger={
                    <Icon
                      className={classnames([classes.footerButton, 'edit'])}
                      size="big"
                      name="edit"
                      onClick={this.handleEdit({ entity: 'libraries', id: library.id })}
                    />
                  }
                  content='Редагування бібліотеки'
                />
                <Popup
                  trigger={
                    <Icon
                      className={classnames([classes.footerButton, 'delete'])}
                      size="big"
                      name="delete"
                      onClick={this.handleDelete({ entity: 'libraries', id: library.id, name: library.name })}
                    />
                  }
                  content='Видалення бібліотеки'
                />
              </div>
            </Segment.Group>
          </Fragment>
        }
      </div>
    )
  }
}

const libraryTarget = {
  canDrop(props, monitor) {
    // You can disallow drop based on props or item
    const item = monitor.getItem();
    return true;
  },

  hover(props, monitor, component) {
    // This is fired very often and lets you perform side effects
    // in response to the hover. You can't handle enter and leave
    // here—if you need them, put monitor.isOver() into collect() so you
    // can just use componentWillReceiveProps() to handle enter/leave.

    // You can access the coordinates if you need them
    const clientOffset = monitor.getClientOffset();
    const componentRect = findDOMNode(component).getBoundingClientRect();

    // You can check whether we're over a nested drop target
    const isJustOverThisOne = monitor.isOver({ shallow: true });

    // You will receive hover() even for items for which canDrop() is false
    const canDrop = monitor.canDrop();
  },

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    const item = monitor.getItem();

    // // You can do something with it
    // ChessActions.movePiece(item.fromPosition, props.position);

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true };
  }
};

export default connect(
  {
    selectedLib: state`env.libraries.selected`,
    selected: state`env.books.selected`,
    library: libraryCompute,
    selectBook: signal`selectBook`,
    editEntity: signal`editEntity`,
  },
  flow(
    DropTarget('BOOK', libraryTarget, (connect, monitor) => ({
      // Call this function inside render()
      // to let React DnD handle the drag events:
      connectDropTarget: connect.dropTarget(),
      // You can ask the monitor about the current drag state:
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
      itemType: monitor.getItemType()
    })),
    injectSheet(styles),
  )(LibraryInfo),
);
