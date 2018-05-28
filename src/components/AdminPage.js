import React, { Component, Fragment } from "react";
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';
import injectSheet from 'react-jss';

import { CSSTransition } from 'react-transition-group';
import { pageTransitionDelay } from '../app/constants';

import { Segment, Button } from 'semantic-ui-react';

import Header from './Header';
import Libraries from './Libraries';
import LibraryInfo from './LibraryInfo';
import DeleteConfirmation from './forms/DeleteConfirmation';
import EditLibrary from './forms/EditLibrary';
import back from '../assets/wood-bg.jpg';

const styles = {
  page: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  contentWrapper: {
    flexGrow: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    height: '100%',
    flexGrow: 1,
    backgroundColor: 'transparent!important',
    border: 'none!important',
    display: 'flex',
    overflowY: 'hidden',
  },
  '@global body': {
    backgroundImage: `url(${back})!important`,
  }
};

class AdminPage extends Component {
  handleDelete = ({entity, id, name}) => {
    this.props.deleteEntity({entity, id, name});
  };

  handleDeleteConfirm = confirm => {
    this.props.deleteEntityConfirm({ confirm });
  };

  handleEdit = ({entity, id}) => {
    this.props.editEntity({entity, id});
  };

  render() {
    const { classes, deleteObj = {} } = this.props;
    return (
      <CSSTransition
        in={this.props.currentPage === 'admin'}
        timeout={pageTransitionDelay}
        classNames="page"
        unmountOnExit
      >
        <div className={classes.page}>
          <Header />
          <main className={classes.contentWrapper}>
            <Segment className={classes.content}>
              <Libraries
                onEdit={this.handleEdit}
              />
              <LibraryInfo
                onDelete={this.handleDelete}
                onEdit={this.handleEdit}
              />
            </Segment>
          </main>
          <DeleteConfirmation
            item={deleteObj.name}
            open={!!deleteObj.id}
            onDelete={this.handleDeleteConfirm}
          />
          <EditLibrary
          />
        </div>
      </CSSTransition>
    )
  }
}

export default connect(
  {
    currentPage: state`currentPage`,
    deleteObj: state`delete`,
    deleteEntity: signal`deleteEntity`,
    deleteEntityConfirm: signal`deleteEntityConfirm`,
    editEntity: signal`editEntity`,
  },
  injectSheet(styles)(AdminPage),
);
