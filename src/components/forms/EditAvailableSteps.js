import React, { Component } from 'react';
import { state, signal } from 'cerebral/tags';
import { connect } from '@cerebral/react';
import { form } from '@cerebral/forms';

import { Button, Modal, Form } from 'semantic-ui-react';

import { TAGS } from '../../app/constants';

const tagsOpt = [''].concat(TAGS).map(tag => ({ key: tag, text: tag, value: tag }));

class EditAvailableSteps extends Component {
  handleClose = () => {
    this.props.showModal({ name: 'availableSteps', id: null });
  };

  handleSubmit = () => {
    this.props.postEntity({ entity: 'availableSteps' });
  };

  handleChange = (e, { name, value }) => {
    this.props.updateField({ form: 'availableSteps', name, value });
  };

  handleOpen = id => {
    const { availableSteps, resetEditForm } = this.props;
    if (!id) return;
    if (id === -1) {
      resetEditForm({ form: 'forms.availableSteps' });
    } else {
      const availableStep = availableSteps.find(availableStep => availableStep.id === id);
      this.props.updateField({ form: 'availableSteps', name: 'id', value: availableStep.id });
      this.props.updateField({ form: 'availableSteps', name: 'tag', value: availableStep.tag });
      this.props.updateField({ form: 'availableSteps', name: 'message', value: availableStep.message });
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
          {`${id === -1 ? 'Creating' : 'Editing'} Available Steps`}
        </Modal.Header>
        <Modal.Content>
          <Form id="availableStepsForm" onSubmit={this.handleSubmit}>
            <Form.Field>
              <Form.Select fluid name="tag" label='Tag' options={tagsOpt} value={form.tag.value} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Message</label>
              <Form.Input name="message" value={form.message.value} onChange={this.handleChange} />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.handleClose}>Close</Button>
          <Button type="submit" form="availableStepsForm" positive icon='checkmark' labelPosition='right' content='Confirm' />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default connect(
  {
    form: form(state`forms.availableSteps`),
    availableSteps: state`availableSteps`,
    id: state`modals.availableSteps`,
    showModal: signal`showModal`,
    postEntity: signal`postEntity`,
    updateField: signal`updateField`,
    resetEditForm: signal`resetEditForm`,
  },
  EditAvailableSteps,
)
