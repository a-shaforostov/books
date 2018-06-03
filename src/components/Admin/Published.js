import React, { Component, Fragment } from 'react';
import injectSheet from 'react-jss';
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';

import { Segment, Header, Icon } from 'semantic-ui-react';

import booksInLibraries from '../../computed/booksInLibraries';
import PublishedBook from './PublishedBook';
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
                      <PublishedBook
                        key={book.id}
                        selected={selected}
                        stats={stats}
                        book={book}
                        onSelect={this.handleSelect}
                        onEdit={this.handleEdit}
                        onRemoveFromLibraries={this.handleRemoveFromLibraries}
                        onDelete={this.handleDelete}
                        onSelectLibrary={this.handleSelectLibrary}
                      />
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
