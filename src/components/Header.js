import React from 'react';
import injectSheet from 'react-jss';
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';

import { Segment, Button } from 'semantic-ui-react';

import logo from '../assets/logo.png';
import title from '../assets/title.png';
import * as sequences from "../app/sequences";

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
};

function Header(props) {
  return (
    <Segment className={props.classes.header}>
      <a href="/" className={props.classes.logo}>
        <img src={logo} alt=""/>&nbsp;&nbsp;&nbsp;
        <img src={title} alt=""/>
        {/*<span>Book Hunter</span>*/}
      </a>
      <Button onClick={props.adminRouted}>Login</Button>
    </Segment>
  )
}

export default connect(
  {
    rootRouted: signal`rootRouted`,
    adminRouted: signal`adminRouted`,
  },
  injectSheet(styles)(Header),
);
