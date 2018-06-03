import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';

import { Segment, Button } from 'semantic-ui-react';

import User from './User';
import bookStat from '../computed/bookStat';

import logo from '../assets/logo.png';
import title from '../assets/title.png';
import back from '../assets/back2.jpg';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundImage: `url(${back})!important`,
    flexShrink: 0,
    backgroundPositionY: 'center',
    backgroundRepeatX: 'no-repeat',
    backgroundSize: 'cover',
    border: 'none',
    borderRadius: 0,
    margin: '10px!important',
    padding: '10px!important',
    boxShadow: '1px 1px 1px 1px #00000059',
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
  stats: {
    display: 'flex',
    fontSize: '90%',
    lineHeight: '17px',
    margin: '3px',
    left: '50%',
    transform: 'translateX(-50%) rotateZ(-2deg)',
    position: 'absolute',
    width: '250px',
    justifyContent: 'space-between',
    top: '53px',
    backgroundColor: 'white',
    padding: '5px 10px',
    zIndex: '-1',
    paddingTop: '11px',
    boxShadow: '1px 1px 1px 1px #00000063',
  },
  statLabel: {
    fontWeight: '700',
  },
  statValue: {

  },
  '@global .page-header .button': {
    border: '2px solid black',
    backgroundColor: 'transparent',
  },
  '@global .page-header .button:hover': {
    backgroundColor: '#CACBCD',
    background: 'linear-gradient(to bottom, rgba(242,246,248,1) 0%, rgba(216,225,231,1) 47%, rgba(181,198,208,1) 93%, rgba(224,239,249,1) 100%)',
  },
};

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
    const { classes, bookStat } = this.props;
    return (
      <Segment className={`${classes.header} page-header`}>
        <div className={classes.group}>
          <a href="/" className={classes.logo}>
            <img src={logo} alt="logo"/>&nbsp;&nbsp;&nbsp;
            <img src={title} alt="title"/>
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
              <Button as="span" tabIndex="0">Відкрити</Button>
            </label>
            <Button onClick={this.handleSaveData}>Зберегти</Button>
          </div>
        </div>
        <User />
        <div className={classes.stats}>
          <div><span className={classes.statLabel}>Книг:</span> <span className={classes.statValue}>{bookStat.books}</span></div>
          <div><span className={classes.statLabel}>Бібліотек:</span> <span className={classes.statValue}>{bookStat.libraries}</span></div>
          <div><span className={classes.statLabel}>Видань:</span> <span className={classes.statValue}>{bookStat.published}</span></div>
        </div>

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
    bookStat,
  },
  injectSheet(styles)(Header),
);
