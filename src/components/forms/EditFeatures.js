import React, { Component } from 'react';
import { state, signal } from 'cerebral/tags';
import { connect } from '@cerebral/react';
import { form } from '@cerebral/forms';

import { Button, Modal, Form } from 'semantic-ui-react';

class EditFeatures extends Component {
  handleClose = () => {
    this.props.showModal({ name: 'features', id: null });
  };

  handleSubmit = () => {
    this.props.postEntity({ entity: 'features' });
  };

  handleChange = (e, { name, value }) => {
    this.props.updateField({ form: 'features', name, value });
  };

  handleOpen = id => {
    const { features, resetEditForm } = this.props;
    if (!id) return;
    if (id === -1) {
      resetEditForm({ form: 'forms.features' });
    } else {
      const feature = features.find(feature => feature.id === id);
      this.props.updateField({ form: 'features', name: 'id', value: feature.id });
      this.props.updateField({ form: 'features', name: 'name', value: feature.name });
    }
  };

  componentWillReceiveProps(props) {
    if (this.props.id === null && props.id !== null) {
      this.handleOpen(props.id);
    }
  }

  render() {
    const { showModal, id, form } = this.props;
    return (
      <Modal size="tiny" open={!!id} onClose={this.handleClose}>
        <Modal.Header>
          {`${id === -1 ? 'Creating' : 'Editing'} Features`}
        </Modal.Header>
        <Modal.Content>
          <Form id="featuresForm" onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Name</label>
              <Form.Input name="name" value={form.name.value} onChange={this.handleChange} />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.handleClose}>Close</Button>
          <Button type="submit" form="featuresForm" positive icon='checkmark' labelPosition='right' content='Confirm' />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default connect(
  {
    form: form(state`forms.features`),
    features: state`features`,
    id: state`modals.features`,
    showModal: signal`showModal`,
    postEntity: signal`postEntity`,
    updateField: signal`updateField`,
    resetEditForm: signal`resetEditForm`,
  },
  EditFeatures,
)
