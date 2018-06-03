import React, { Component } from 'react';
import { connect } from '@cerebral/react';
import injectSheet from 'react-jss';

import { Button, Modal, Icon } from 'semantic-ui-react';
import GMap from "../GMap";

const styles = {
  mapButton: {
    marginLeft: '6px!important',
  },
};

class MapModal extends Component {
  state = {
    open: false,
    coords: {},
    marker: null,
    name: '',
  };

  handleOpen = () => {
    if (this.props.coords) {
      this.setState({
        open: true,
        coords: this.props.coords,
        marker: {
          lat: this.props.coords.latitude,
          lng: this.props.coords.longitude,
        },
        name: this.props.name,
      });
    } else {
      navigator.geolocation.getCurrentPosition(location => {
        this.setState({
          open: true,
          coords: location.coords,
          name: this.props.name,
        });
      });
    }
  };

  handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ open: false });
  };

  handleUpdateMarker = ({ lat, lng }) => {
    this.setState(state => {
      return {
        marker: { lat, lng },
      }
    })
  };

  handleApply = () => {
    this.props.onApply(this.state.marker);
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open, marker, name } = this.state;
    const { latitude, longitude } = this.state.coords;
    return (
      <Modal
        size="tiny"
        open={open}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        trigger={<Button type="button" className={classes.mapButton}><Icon name="map outline" size="large" />Карта</Button>}
      >
        <Modal.Header>
          Вкажіть розташування бібліотеки на карті
        </Modal.Header>
        <Modal.Content style={{ height: 'calc(100vh - 200px)' }}>
          <GMap
            defaultCenter={{ lat: latitude, lng: longitude }}
            markers={marker ? [{ ...marker, name }] : []}
            onUpdateMarker={this.handleUpdateMarker}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button type="button" negative onClick={this.handleClose}>Відмінити</Button>
          <Button positive onClick={this.handleApply}>Обрати</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default connect(
  {
  },
  injectSheet(styles)(MapModal),
);
