import React, { Component, Fragment } from 'react';
import injectSheet from 'react-jss';
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';
import classnames from 'classnames';

import libraryCompute from '../computed/library';

import { Segment, Header } from 'semantic-ui-react';


import paper from '../assets/white-paper.jpg';


const styles = {
  list: {
    width: '30%',
    opacity: 1,
    transition: 'opacity 1s',
  },
  hidden: {
    opacity: 0.01,
    transition: 'opacity 1s',
  },
  header: {
    color: 'white!important',
    textShadow: '3px 3px 3px rgba(0,0,0,0.50)',
    marginBottom: '10px!important',
  },
  group: {
    display: 'flex',
    margin: '1em 0 !important',
    backgroundImage: `url(${paper})`,
    maxHeight: 'calc(100% - 25px)',
    borderRadius: '0!important',
  },
  book: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'transparent!important',
    cursor: 'pointer',
  },
  bookSel: {
    backgroundColor: 'rgba(255,255,255,0.65)!important',
    // backgroundColor: 'white!important',
    fontWeight: '700',
  },
  libName: {
    fontFamily: 'Georgia, Arial, sans-serif',
    fontWeight: 700,
  },
  libAddr: {
    color: '#777',
    margin: '5px 0',
  },
  bookName: {
    transform: 'translateX(0px)',
    fontSize: '100%',
    transition: 'all 500ms ease-out',
  },
  bookNameVisible: {
    position: 'absolute',
    transform: 'translateX(110px)',
    fontSize: '130%',
    transition: 'all 500ms ease-in',
  },
  interior: {
    overflowX: 'hidden',
    overflowY: 'auto',
    flexGrow: 1,
    margin: '10px',
  },
  '@global .ui.segments:not(.horizontal) .segment:first-child': {
    borderTop: 'none',
    marginTop: '0em',
    bottom: 0,
    marginBottom: 0,
    top: 0,
  },
  '@global .ui.segments .segment': {
    top: 0,
    bottom: 0,
    borderRadius: 0,
    margin: 0,
    width: 'auto',
    boxShadow: 'none',
    border: 'none',
    borderTop: '1px solid rgba(34, 36, 38, 0.15)',
  },
  bookDetails: {
    display: 'flex',
    height: 0,
    opacity: 0,
    overflow: 'hidden',
    transition: 'opacity 500ms ease-out',
  },
  bookDetailsVisible: {
    display: 'flex',
    opacity: 1,
    height: 'auto',
    transition: 'opacity 500ms ease-in',
  },
  bookImage: {
    height: '150px',
  },
  bookInfo: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '10px',
    fontWeight: 700,
    marginTop: 0,
    transition: 'all 500ms ease-out',
  },
  bookInfoVisible: {
    marginTop: '30px',
    transition: 'all 500ms ease-in',
  },
  bookData: {
    fontWeight: 400,
    marginBottom: '10px',
  },
  row: {
    marginBottom: '10px',
  },
};

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

  render() {
    const { classes, selected, selectedLib } = this.props;
    const { library } = this.state;
    return (
      <div className={classnames([classes.list, {[classes.hidden]: !selectedLib}])}>
        {
          library &&
          <Fragment>
            <Header as="h3" className={classes.header}>Детальна інформація</Header>
            <Segment.Group piled className={classes.group}>
              <div className={classes.interior}>
                <div className={classes.libName}>{library.name}</div>
                <div className={classes.libAddr}>{library.address}</div>
                {
                  library.books.map(book => (
                    <Segment
                      key={book.id}
                      className={classnames([classes.book, { [classes.bookSel]: selected === book.id }])}
                      onClick={this.handleSelect(book.id)}
                    >
                      <span className={classnames([classes.bookName, { [classes.bookNameVisible]: selected === book.id }])}>{book.name}</span>
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
    selectedLib: state`env.libraries.selected`,
    selected: state`env.books.selected`,
    library: libraryCompute,
    selectBook: signal`selectBook`,
  },
  injectSheet(styles)(LibraryInfo),
);
