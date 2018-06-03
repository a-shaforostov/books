/**
 * Component. List of libraries
 * @file
 */

import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';
import classnames from 'classnames';

import { Segment, Header, Icon } from 'semantic-ui-react';

import styles from './Libraries.styles';

class Libraries extends Component {
  handleSelect = id => () => {
    const { selected } = this.props;
    this.props.selectLibrary({ id: selected === id ? null : id });
  };

  handleEdit = e => {
    e.stopPropagation();
    this.props.onEdit({ entity: 'libraries', id: -1 });
  };

  render() {
    const { classes, libraries, selected } = this.props;
    return (
      <div className={classes.list}>
        <Header as="h3" className={classes.header}>Бібліотеки</Header>
        <Segment.Group piled className={classes.group}>
          <Segment
            key={-1}
            className={classes.addLibrary}
            onClick={this.handleEdit}
          >
            <span className={classes.name}><Icon name="add" /> Додати бібліотеку</span>
          </Segment>

          <div className={classes.interior}>
            {
              libraries
                .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
                .map(lib => (
                  <Segment
                    key={lib.id}
                    className={classnames([classes.library, { [classes.librarySel]: selected === lib.id }])}
                    onClick={this.handleSelect(lib.id)}
                  >
                    <span className={classes.name}>{lib.name}</span>
                  </Segment>
                ))
            }
          </div>
        </Segment.Group>
      </div>
    )
  }
}

export default connect(
  {
    selected: state`env.libraries.selected`,
    libraries: state`data.libraries`,
    selectLibrary: signal`selectLibrary`,
  },
  injectSheet(styles)(Libraries),
);
