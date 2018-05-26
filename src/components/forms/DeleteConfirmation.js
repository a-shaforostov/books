import React, { Component } from 'react';

import { Button, Modal } from 'semantic-ui-react';

const styles = {
  modal: {
    fontSize: '24px',
  },
  subtitle: {
    color: 'gray',
    fontSize: '80%',
  }
};

class DeleteConfirmation extends Component {
  handleClose = e => {
    this.props.onDelete(false);
  };

  handleConfirm = e => {
    this.props.onDelete(true);
  };

  render() {
    const { open, item } = this.props;
    return (
      <Modal size="tiny" open={open} onClose={this.handleClose} style={styles.modal}>
        <Modal.Content>
          <div>Delete</div>
          {item && <div style={styles.subtitle}>{item}?</div>}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClose}>Cancel</Button>
          <Button color="red" content='Confirm' onClick={this.handleConfirm} />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default DeleteConfirmation;
