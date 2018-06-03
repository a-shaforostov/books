import React, { Component } from "react";
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';
import injectSheet from 'react-jss';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';

import { CSSTransition } from 'react-transition-group';
import { pageTransitionDelay } from '../../app/constants';

import { Segment } from 'semantic-ui-react';

import Header from '../Header';
import Libraries from './Libraries';
import LibraryInfo from './LibraryInfo';
import Published from './Published';
import DeleteConfirmation from '../forms/DeleteConfirmation';
import EditLibrary from '../forms/EditLibrary';
import EditPublished from '../forms/EditPublished';
import back from '../../assets/wood-bg.jpg';

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
    justifyContent: 'space-between',
  },
  librarySide: {
    width: '60%',
    display: 'flex',
    marginBottom: '1%',
    marginLeft: '2%',
  },
  bookSide: {
    display: 'flex',
    width: '30%',
    marginBottom: '1%',
    marginRight: '3%',
  },
  '@global body': {
    backgroundImage: `url(${back})!important`,
  },
  '@global .ui.modal.visible.active': {
    marginTop: '0!important',
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
            <DragDropContextProvider backend={HTML5Backend}>
              <Segment className={classes.content}>
                <div className={classes.librarySide}>
                  <Libraries
                    onEdit={this.handleEdit}
                  />
                  <LibraryInfo
                    onDelete={this.handleDelete}
                    onEdit={this.handleEdit}
                  />
                </div>
                <div className={classes.bookSide}>
                  <Published
                    onDelete={this.handleDelete}
                    onEdit={this.handleEdit}
                  />
                </div>
              </Segment>
            </DragDropContextProvider>
          </main>
          <DeleteConfirmation
            item={deleteObj.name}
            open={!!deleteObj.id}
            onDelete={this.handleDeleteConfirm}
          />
          <EditLibrary
            onEdit={this.handleEdit}
          />
          <EditPublished
            onEdit={this.handleEdit}
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
