import React, { Component } from 'react';
import { state, signal } from 'cerebral/tags';
import { connect } from '@cerebral/react';
import injectSheet from 'react-jss';
import QRCode from 'qrcode.react';

import { Button, Modal, Form, Icon } from 'semantic-ui-react';
import libraryCompute from "../../computed/library";
import MapModal from "./MapModal";

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


  // handleOpen = id => {
  //   const { library, resetEditForm } = this.props;
  //   if (!id) return;
  //   if (id === -1) {
  //     resetEditForm({ form: 'forms.libraries' });
  //   } else {
  //     this.props.updateField({ form: 'libraries', name: 'id', value: library.id });
  //     this.props.updateField({ form: 'libraries', name: 'name', value: library.name });
  //     this.props.updateField({ form: 'libraries', name: 'address', value: library.address });
  //     this.props.updateField({ form: 'libraries', name: 'lat', value: library.lat });
  //     this.props.updateField({ form: 'libraries', name: 'lng', value: library.lng });
  //     this.props.updateField({ form: 'libraries', name: 'isNew', value: false });
  //   }
  // };
  //
  // componentWillReceiveProps(props) {
  //   if (this.props.id === null && props.id !== null) {
  //     this.handleOpen(props.id);
  //   }
  // };
  //
  // handleApplyCoords = ({ lat, lng }) => {
  //   this.props.updateField({ form: 'libraries', name: 'lat', value: lat });
  //   this.props.updateField({ form: 'libraries', name: 'lng', value: lng });
  // };

  render() {
    const { showModal, id, form, classes, name, libName } = this.props;
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
    // id: state`env.libraries.edit`,
    // showModal: signal`showModal`,
    // postEntity: signal`postEntity`,
    reserveBookCancel: signal`publicModule.reserveBookCancel`,
    reserveBookApprove: signal`publicModule.reserveBookApprove`,
    downloadFile: signal`downloadFile`,
  },
  injectSheet(styles)(QRModal),
);
