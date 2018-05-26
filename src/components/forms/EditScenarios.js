import React, { Component } from 'react';
import { state, signal } from 'cerebral/tags';
import { connect } from '@cerebral/react';
import { form } from '@cerebral/forms';

import { Button, Modal, Form } from 'semantic-ui-react';

const styles = {
  subtitle: {
    color: 'gray',
    fontSize: '80%',
  }
};

class EditScenarios extends Component {
  handleClose = () => {
    this.props.showModal({ name: 'scenarios', id: null });
  };

  handleSubmit = () => {
    this.props.postScenario({ entity: 'scenarios' });
  };

  handleChange = (e, { name, value }) => {
    this.props.updateField({ form: 'scenarios', name, value });
  };

  handleOpen = id => {
    const { scenarios, resetEditForm, selectedFeature } = this.props;
    if (!id) return;
    if (id === -1) {
      resetEditForm({ form: 'forms.scenarios' });
    } else {
      const scenario = scenarios.find(scenario => scenario.id === id);
      this.props.updateField({ form: 'scenarios', name: 'id', value: scenario.id });
      this.props.updateField({ form: 'scenarios', name: 'name', value: scenario.name });
    }
    this.props.updateField({ form: 'scenarios', name: 'featureId', value: selectedFeature });
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
          <div>{`${id === -1 ? 'Creating' : 'Editing'} Scenarios`}</div>
          {subtitle && <div style={styles.subtitle}>{subtitle}</div>}
        </Modal.Header>
        <Modal.Content>
          <Form id="scenariosForm" onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Name</label>
              <Form.Input name="name" value={form.name.value} onChange={this.handleChange} />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.handleClose}>Close</Button>
          <Button type="submit" form="scenariosForm" positive icon='checkmark' labelPosition='right' content='Confirm' />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default connect(
  {
    form: form(state`forms.scenarios`),
    scenarios: state`scenarios`,
    selectedFeature: state`edit.selectedFeature`,
    id: state`modals.scenarios`,
    showModal: signal`showModal`,
    postScenario: signal`postScenario`,
    updateField: signal`updateField`,
    resetEditForm: signal`resetEditForm`,
  },
  EditScenarios,
)
