import React, { Component } from "react";
import { connect } from "@cerebral/react";
import { state } from "cerebral/tags";

import './Loader.css';
import gif from '../assets/opening-article-book.gif';

const styles = {
  frame: {
    display: 'flex',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '500px',
    height: '200px',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    border: '1px solid, gray',
  },
  image: {
    height: '100px',
  },
  text: {
    paddingTop: '20px',
    fontSize: '120%',
  },
};

class Loader extends Component {
  render() {
    return (
      !this.props.isApplicationLoaded &&
      <div style={styles.frame}>
        <div style={styles.container}>
          <img style={styles.image} src={gif} alt=""/>
          <div style={styles.text}>Додаток завантажується...</div>
        </div>

      </div>
    );
  }
}

export default connect(
  {
    isApplicationLoaded: state`isApplicationLoaded`,
  },
  Loader,
);
