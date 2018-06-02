import React, { Component } from "react";
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';
import { CSSTransition } from 'react-transition-group';
import { pageTransitionDelay } from '../app/constants';
import injectSheet from 'react-jss';

import { Segment, Button } from 'semantic-ui-react';

import GMap from "./GMap";

const styles = {
  portal: {
    position: 'absolute',
    height: 'calc(100% - 80px)',
    backgroundColor: 'white',
    width: '50%',
    bottom: '5%',
    right: '6%',
  }
};

class MapPortal extends Component {
  state = {
    coords: {
      latitude: null,
      longitude: null,
    },
    markers: [],
  };

  mapRef = React.createRef();

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(location => {
      this.setState({
        coords: location.coords,
      });
    });
    // const PlacesService = window.google.maps.places.PlacesService;
    // const map = findDOMNode();
  }

  returnMarkers = markers => {
    this.setState({
      markers: markers.map(marker => ({
        lat: marker.geometry.location.lat(),
        lng: marker.geometry.location.lng(),
        name: marker.name,
      }))
    })
  };

  showAllLibs = () => this.mapRef.current && this.mapRef.current.showAllLibs();

  render() {
    const { classes, mapStyle } = this.props;
    const { latitude, longitude } = this.state.coords;

    return (
      <CSSTransition
        in={this.props.currentPage === 'root'}
        timeout={pageTransitionDelay}
        classNames="page"
        unmountOnExit
      >
        <div className={classes.portal}>
          {
            latitude && longitude &&
            <GMap
              defaultCenter={{lat: latitude, lng: longitude}}
              returnMarkers={this.returnMarkers}
              markers={this.state.markers}
              mapStyle={mapStyle}
              // ref={this.mapRef}
            />
          }
        </div>
      </CSSTransition>
    )
  }
}

export default connect(
  {
    currentPage: state`currentPage`,
    mapStyle: state`publicModule.mapStyle`,
  },
  injectSheet(styles)(MapPortal),
);
