import React, { Component } from 'react';
import { state, signal } from 'cerebral/tags';
import { connect } from '@cerebral/react';
import { form } from '@cerebral/forms';
import injectSheet from 'react-jss';

import { Button, Modal, Form, Icon } from 'semantic-ui-react';
import libraryCompute from "../../computed/library";
import MapModal from "./MapModal";

const styles = {
  fieldError: {
    marginTop: '-13px',
    display: 'block',
    fontSize: '80%',
    color: 'red',
  },
  mapButton: {
    marginLeft: '6px!important',
  },
};

class EditLibrary extends Component {
  handleClose = () => {
    this.props.showModal({ name: 'libraries', show: null });
  };

  handleSubmit = () => {
    this.props.postEntity({ entity: 'libraries' });
  };

  handleChange = (e, { name, value }) => {
    this.props.updateField({ form: 'libraries', name, value });
  };

  handleOpen = id => {
    const { library, resetEditForm } = this.props;
    if (!id) return;
    if (id === -1) {
      resetEditForm({ form: 'forms.libraries' });
    } else {
      // const scenario = scenarios.find(scenario => scenario.id === id);
      this.props.updateField({ form: 'libraries', name: 'id', value: library.id });
      this.props.updateField({ form: 'libraries', name: 'name', value: library.name });
      this.props.updateField({ form: 'libraries', name: 'address', value: library.address });
      this.props.updateField({ form: 'libraries', name: 'lat', value: library.lat });
      this.props.updateField({ form: 'libraries', name: 'lng', value: library.lng });
      this.props.updateField({ form: 'published', name: 'isNew', value: false });
    }
  };

  componentWillReceiveProps(props) {
    if (this.props.id === null && props.id !== null) {
      this.handleOpen(props.id);
    }
  };

  handleApplyCoords = ({ lat, lng }) => {
    this.props.updateField({ form: 'libraries', name: 'lat', value: lat });
    this.props.updateField({ form: 'libraries', name: 'lng', value: lng });
  };

  render() {
    const { showModal, id, form, classes } = this.props;
    return (
      <Modal size="tiny" open={!!id} closeOnDimmerClick={false} onClose={this.handleClose}>
        <Modal.Header>
          <div>{`${id === -1 ? 'Створення' : 'Редагування'} бібліотеки`}</div>
        </Modal.Header>
        <Modal.Content>
          <Form id="libraryForm" onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Назва</label>
              <Form.Input name="name" value={form.name.value} onChange={this.handleChange} />
              {
                !form.name.isValid && !form.name.isPristine &&
                <span className={classes.fieldError}>&nbsp;{form.name.errorMessage || 'Поле має бути заповнене'}</span>
              }
            </Form.Field>
            <Form.Field>
              <label>Адреса</label>
              <Form.Input name="address" value={form.address.value} onChange={this.handleChange} />
              {
                !form.address.isValid && !form.address.isPristine &&
                <span className={classes.fieldError}>&nbsp;{form.address.errorMessage || 'Поле має бути заповнене'}</span>
              }
            </Form.Field>
            <Form.Group>
              <Form.Field>
                <label>Широта</label>
                <Form.Input name="lat" value={form.lat.value} onChange={this.handleChange} />
                {
                  !form.lat.isValid && !form.lat.isPristine &&
                  <span className={classes.fieldError} style={{marginTop: 0}}>&nbsp;{form.lat.errorMessage}</span>
                }
              </Form.Field>
              <Form.Field>
                <label>Довгота</label>
                <Form.Input name="lng" value={form.lng.value} onChange={this.handleChange} />
                {
                  !form.lng.isValid && !form.lng.isPristine &&
                  <span className={classes.fieldError} style={{marginTop: 0}}>&nbsp;{form.lng.errorMessage}</span>
                }
              </Form.Field>
              {/*<Button type="button" className={classes.mapButton}><Icon name="map outline" size="large" />Карта</Button>*/}
              <MapModal
                coords={form.lat.value && form.lng.value && { latitude: +form.lat.value, longitude: +form.lng.value, name: form.name.value }}
                onApply={this.handleApplyCoords}
              />
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.handleClose}>Відмінити</Button>
          <Button type="submit" form="libraryForm" positive icon='checkmark' labelPosition='right' content='Зберегти' disabled={!form.isValid} />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default connect(
  {
    form: form(state`forms.libraries`),
    library: libraryCompute,
    id: state`env.libraries.edit`,
    showModal: signal`showModal`,
    postEntity: signal`postEntity`,
    updateField: signal`updateField`,
    resetEditForm: signal`resetEditForm`,
  },
  injectSheet(styles)(EditLibrary),
);
