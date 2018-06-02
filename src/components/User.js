import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';

import { Button, List, Image } from 'semantic-ui-react';

const styles = {
  avatar: {
    height: '28px',
    borderRadius: '50%',
  },
};

class User extends Component {
  handleLogin = () => {
    this.props.autologin();
  };

  handleLogout = () => {
    this.props.logout();
  };

  handleAdmin = () => {
    this.props.adminRouted();
  };

  render() {
    const { user, classes } = this.props;
    return (
      <div>
        {
          this.props.user &&
          <List horizontal relaxed>
            <List.Item>
              <Image src={user.avatar} className={classes.avatar} />
              <List.Content>
                <List.Header>{user.name}</List.Header>
              </List.Content>
            </List.Item>
            <Button onClick={this.handleAdmin}>Картотека</Button>
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
    autologin: signal`autologin`,
    logout: signal`logout`,
    adminRouted: signal`adminRouted`,
  },
  injectSheet(styles)(User),
);
