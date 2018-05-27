import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';

import { Segment, Button, List, Image } from 'semantic-ui-react';

const styles = {
  avatar: {
    height: '28px',
  },
};

class User extends Component {
  handleLogin = () => {
    this.props.autologin();
  };

  handleLogout = () => {
    this.props.logout();
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
            <Button onClick={this.handleLogout}>Картотека</Button>
            <Button onClick={this.handleLogout}>Вихід</Button>
          </List>
        }
        <a href="/admin">Admin</a>
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
  },
  injectSheet(styles)(User),
);
