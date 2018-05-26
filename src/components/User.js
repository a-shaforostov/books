import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';

import { Segment, Button, List, Image } from 'semantic-ui-react';

const styles = {
};


class User extends Component {
  handleLogin = () => {
    this.props.openLogin();
  };

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        {
          this.props.user &&
          <List horizontal relaxed>
            <List.Item>
              <Image src={user.avatar} />
              <List.Content>
                <List.Header>{user.name}</List.Header>
              </List.Content>
            </List.Item>
            <Button onClick={this.handleLogout}>Картотека</Button>
            <Button onClick={this.handleLogout}>Вихід</Button>
          </List>
        }
        {
          !this.props.user &&
          <Button onClick={this.handleLogin}>Вхід</Button>
        }
      </div>
    )
  }
}

export default connect(
  {
    user: state`user`,
    openLogin: signal`openLogin`,
    logout: signal`logout`,
  },
  injectSheet(styles)(User),
);
