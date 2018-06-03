import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';
import classnames from 'classnames';

import { Segment, Header, Icon } from 'semantic-ui-react';

import paper from '../assets/white-paper.jpg';

const styles = {
  list: {
    width: '50%',
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
    height: 'calc(100% - 25px)',
    borderRadius: '0!important',
  },
  addLibrary: {
    backgroundColor: 'transparent!important',
    cursor: 'pointer',
    fontWeight: 700,
    transition: 'all 500ms',
    '&:hover': {
      backgroundColor: '#d4a16387!important',
      transition: 'all 500ms',
    },
  },
  library: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'transparent!important',
    cursor: 'pointer',
    paddingTop: '6px!important',
    paddingBottom: '6px!important',
    '&:hover': {
      backgroundColor: '#d4a16387!important',
      transition: 'all 500ms',
    }
  },
  librarySel: {
    backgroundColor: '#d4a16387!important',
    fontWeight: '700',
  },
  name: {
    width: '95%',
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
};

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
