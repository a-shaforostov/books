import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';

import { Segment, Button } from 'semantic-ui-react';

import User from './User';

import logo from '../assets/logo.png';
import title from '../assets/title.png';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: 'inherit',
  },
  group: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  menu: {
    marginLeft: '30px!important',
  },
  inputFile: {

  },
};

const options = [
  { key: 1, text: 'Відкрити файл', value: 'open' },
  { key: 2, text: 'Зберегти файл', value: 'save' },
];

class Header extends Component {
  handleLoadData = (e) => {
    e.preventDefault();
    e.target.files[0] &&
    this.props.loadFile({ filename: e.target.files[0] });
    e.target.value = null;
  };

  handleSaveData = (e) => {
    e.preventDefault();
    const { data } = this.props;
    if (data) {
      const uri = "data:application/json,"+encodeURIComponent(JSON.stringify(data));
      this.props.downloadFile({ data: uri, filename: 'data.json' });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Segment className={classes.header}>
        <div className={classes.group}>
          <a href="/" className={classes.logo}>
            <img src={logo} alt=""/>&nbsp;&nbsp;&nbsp;
            <img src={title} alt=""/>
          </a>
          <div className={classes.menu}>
            <input
              accept="application/json"
              className={classes.inputFile}
              id="button-data-load"
              type="file"
              onChange={this.handleLoadData}
              hidden
            />
            <label htmlFor="button-data-load">
              <Button as="span" tabIndex="2">Відкрити</Button>
            </label>
            <Button onClick={this.handleSaveData}>Зберегти</Button>
          </div>
        </div>
        <User />
      </Segment>
    )
  }
}

export default connect(
  {
    data: state`data`,
    rootRouted: signal`rootRouted`,
    adminRouted: signal`adminRouted`,
    loadFile: signal`loadFile`,
    downloadFile: signal`downloadFile`,
  },
  injectSheet(styles)(Header),
);
