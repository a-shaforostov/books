/**
 * Component. Modal reservation dialog
 * @file
 */

import React, { Component } from 'react';
import { signal } from 'cerebral/tags';
import { connect } from '@cerebral/react';
import injectSheet from 'react-jss';
import QRCode from 'qrcode.react';

import { Button, Modal } from 'semantic-ui-react';

const styles = {
  subHeader: {
    fontSize: '16px',
    color: 'gray',
  },
  content: {
    textAlign: 'center',
  },
};

class QRModal extends Component {
  qrRef = React.createRef();

  handleClose = () => {
    this.props.reserveBookCancel();
  };

  handleApprove = () => {
    const { name, libName } = this.props;
    this.props.reserveBookApprove();
    this.downloadQR({ name, libName });
  };

  downloadQR = ({ name, libName }) => {
    // serialize svg in string
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(this.qrRef.current);
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
    //convert svg source to URI data scheme.
    const data = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
    this.props.downloadFile({ data, filename: `${name} (${libName}).svg` });
  };

  render() {
    const { id, classes, name, libName } = this.props;
    return (
      <Modal size="tiny" open={!!id} onClose={this.handleClose}>
        <Modal.Header>
          <div>Замовлення книги</div>
          <div className={classes.subHeader}>{libName}</div>
          <div className={classes.subHeader}>{name}</div>
        </Modal.Header>
        <Modal.Content className={classes.content}>
          {
            id &&
            <svg
              width="128"
              height="128"
              xmlns="http://www.w3.org/2000/svg"
              ref={this.qrRef}
            >
              <QRCode value={id} renderAs="svg" />
            </svg>
          }
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.handleClose}>Відмінити</Button>
          <Button positive icon='checkmark' labelPosition='right' content='Резервувати' onClick={this.handleApprove} />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default connect(
  {
    reserveBookCancel: signal`publicModule.reserveBookCancel`,
    reserveBookApprove: signal`publicModule.reserveBookApprove`,
    downloadFile: signal`downloadFile`,
  },
  injectSheet(styles)(QRModal),
);
