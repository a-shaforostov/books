import React, { Component } from 'react';
import { state, signal } from 'cerebral/tags';
import { connect } from '@cerebral/react';
import { form } from '@cerebral/forms';
import injectSheet from 'react-jss';

import { Button, Modal, Form } from 'semantic-ui-react';

const styles = {
  isbnNotification: {
    marginTop: '-13px',
    display: 'block',
    fontSize: '80%',
    color: '#777',
  },
  fieldError: {
    marginTop: '-13px',
    display: 'block',
    fontSize: '80%',
    color: 'red',
  },
};

class EditPublished extends Component {
  handleClose = () => {
    this.props.showModal({ name: 'published', show: null });
  };

  handleSubmit = () => {
    this.props.postEntity({ entity: 'published' });
  };

  handleChange = (e, { name, value }) => {
    this.props.updateField({ form: 'published', name, value });
  };

  handleOpen = id => {
    const { published, resetEditForm } = this.props;
    if (!id) return;
    if (id === -1) {
      resetEditForm({ form: 'forms.published' });
    } else {
      const book = published.find(book => book.id === id);
      this.props.updateField({ form: 'published', name: 'id', value: book.id });
      this.props.updateField({ form: 'published', name: 'name', value: book.name });
      this.props.updateField({ form: 'published', name: 'author', value: book.author });
      this.props.updateField({ form: 'published', name: 'year', value: book.year });
      this.props.updateField({ form: 'published', name: 'image', value: book.image });
      this.props.updateField({ form: 'published', name: 'isNew', value: false });
    }
  };

  componentWillReceiveProps(props) {
    if (this.props.id === null && props.id !== null) {
      this.handleOpen(props.id);
    }
  }

  render() {
    const { id, form, books, classes } = this.props;
    const isUsedInLibraries = books.some(book => book.isbn === id);
    return (
      <Modal size="tiny" open={!!id} onClose={this.handleClose}>
        <Modal.Header>
          <div>{`${id === -1 ? 'Створення' : 'Редагування'} книги`}</div>
        </Modal.Header>
        <Modal.Content>
          <Form id="publishedForm" onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>ISBN*</label>
              <Form.Input
                name="id"
                value={form.id.value}
                onChange={this.handleChange}
                disabled={isUsedInLibraries}
              />
              {
                isUsedInLibraries &&
                <span className={classes.isbnNotification}>Книга вже в бібліотеках. Зміна ISBN неможлива.</span>
              }
              {
                !form.id.isValid && !form.id.isPristine &&
                <span className={classes.fieldError}>&nbsp;{form.id.errorMessage || 'Поле має бути заповнене'}</span>
              }
            </Form.Field>
            <Form.Field>
              <label>Назва*</label>
              <Form.Input name="name" value={form.name.value} onChange={this.handleChange} />
              {
                !form.name.isValid && !form.name.isPristine &&
                <span className={classes.fieldError}>&nbsp;{form.name.errorMessage || 'Поле має бути заповнене'}</span>
              }
            </Form.Field>
            <Form.Field>
              <label>Автор*</label>
              <Form.Input name="author" value={form.author.value} onChange={this.handleChange} />
              {
                !form.author.isValid && !form.author.isPristine &&
                <span className={classes.fieldError}>&nbsp;{form.author.errorMessage || 'Поле має бути заповнене'}</span>
              }
            </Form.Field>
            <Form.Field>
              <label>Рік</label>
              <Form.Input name="year" value={form.year.value} onChange={this.handleChange} />
              {
                !form.year.isValid && !form.year.isPristine &&
                <span className={classes.fieldError}>&nbsp;{form.year.errorMessage + ' (1500-2029)'}</span>
              }
            </Form.Field>
            <Form.Field>
              <label>Зображення (url)</label>
              <Form.Input name="image" value={form.image.value} onChange={this.handleChange} />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.handleClose}>Відмінити</Button>
          <Button type="submit" form="publishedForm" positive icon='checkmark' labelPosition='right' content='Зберегти' disabled={!form.isValid} />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default connect(
  {
    form: form(state`forms.published`),
    published: state`data.published`,
    books: state`data.books`,
    id: state`env.published.edit`,
    showModal: signal`showModal`,
    postEntity: signal`postEntity`,
    updateField: signal`updateField`,
    resetEditForm: signal`resetEditForm`,
  },
  injectSheet(styles)(EditPublished),
)
