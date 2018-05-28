import React, { Component } from 'react';
import { state, signal } from 'cerebral/tags';
import { connect } from '@cerebral/react';
import { form } from '@cerebral/forms';

import { Button, Modal, Form } from 'semantic-ui-react';
import libraryCompute from "../../computed/library";

const styles = {
  subtitle: {
    color: 'gray',
    fontSize: '80%',
  }
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
    }
  };

  componentWillReceiveProps(props) {
    if (this.props.id === null && props.id !== null) {
      this.handleOpen(props.id);
    }
  }

  render() {
    const { showModal, id, form, subtitle } = this.props;
    return (
      <Modal size="tiny" open={!!id} onClose={this.handleClose}>
        <Modal.Header>
          <div>{`${id === -1 ? 'Створення' : 'Редагування'} бібліотеки`}</div>
          {/*{subtitle && <div style={styles.subtitle}>{subtitle}</div>}*/}
        </Modal.Header>
        <Modal.Content>
          <Form id="libraryForm" onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Назва</label>
              <Form.Input name="name" value={form.name.value} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Адреса</label>
              <Form.Input name="address" value={form.address.value} onChange={this.handleChange} />
            </Form.Field>
            <Form.Group>
              <Form.Field>
                <label>Широта</label>
                <Form.Input name="lat" value={form.lat.value} onChange={this.handleChange} />
              </Form.Field>
              <Form.Field>
                <label>Довгота</label>
                <Form.Input name="lng" value={form.lng.value} onChange={this.handleChange} />
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.handleClose}>Відмінити</Button>
          <Button type="submit" form="libraryForm" positive icon='checkmark' labelPosition='right' content='Зберегти' />
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
  EditLibrary,
)
