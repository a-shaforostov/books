/**
 * Component. Login form
 * @file
 */

import React, { Component } from 'react';
import { state, signal } from 'cerebral/tags';
import { connect } from '@cerebral/react';
import { form } from '@cerebral/forms';

import { Button, Modal, Form } from 'semantic-ui-react';

class LoginForm extends Component {
  handleClose = () => {
    this.props.closeLogin();
  };

  handleSubmit = () => {
    this.props.submitLogin();
  };

  handleChange = (e, { name, value }) => {
    this.props.updateField({ form: 'login', name, value });
  };

  // handleOpen = id => {
  //   const { features, resetEditForm } = this.props;
  //   if (!id) return;
  //   if (id === -1) {
  //     resetEditForm({ form: 'forms.features' });
  //   } else {
  //     const feature = features.find(feature => feature.id === id);
  //     this.props.updateField({ form: 'features', name: 'id', value: feature.id });
  //     this.props.updateField({ form: 'features', name: 'name', value: feature.name });
  //   }
  // };

  // componentWillReceiveProps(props) {
  //   if (this.props.id === null && props.id !== null) {
  //     this.handleOpen(props.id);
  //   }
  // }
  //
  render() {
    const { open, form, loginError } = this.props;
    return (
      <Modal size="tiny" open={open} onClose={this.handleClose} style={{display: 'flex!important'}}>
        <Modal.Header>
          Вхід в систему
        </Modal.Header>
        <Modal.Content>
          <Form id="loginForm" onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Ім'я</label>
              <Form.Input name="name" value={form.name.value} onChange={this.handleChange} autoComplete="username"  />
            </Form.Field>
            <Form.Field>
              <label>Пароль</label>
              <Form.Input type="password" name="pass" value={form.pass.value} onChange={this.handleChange} autoComplete="new-password"  />
            </Form.Field>
          </Form>
          {
            loginError &&
            <div style={{color: 'red', marginTop: '10px'}}>Логін та/або пароль введені невірно!</div>
          }
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.handleClose}>Відміна</Button>
          <Button type="submit" form="loginForm" positive icon='checkmark' labelPosition='right' content='Вхід' />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default connect(
  {
    form: form(state`forms.login`),
    user: state`user`,
    loginError: state`loginError`,
    closeLogin: signal`closeLogin`,
    updateField: signal`updateField`,
    submitLogin: signal`submitLogin`,
  },
  LoginForm,
)
