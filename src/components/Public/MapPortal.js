/**
 * Component. Portal fot map in-place
 * @file
 */

import React, { Component } from "react";
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';
import { CSSTransition } from 'react-transition-group';
import { pageTransitionDelay } from '../../app/constants';
import injectSheet from 'react-jss';

import GMap from "../GMap";

const styles = {
  portal: {
    position: 'absolute',
    height: 'calc(100% - 80px)',
    backgroundColor: 'white',
    width: '55%',
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
    const { setMyPosition } = this.props;
    navigator.geolocation.getCurrentPosition(location => {
      this.setState({
        coords: location.coords,
      });

      setMyPosition({
        position: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
      });
    });
  }

  returnMarkers = markers => {
    this.setState({
      markers: markers.map(marker => ({
        lat: marker.lat || marker.geometry.location.lat(),
        lng: marker.lng || marker.geometry.location.lng(),
        name: marker.name,
        key: Math.random(),
      }))
    })
  };

  render() {
    const { classes, mapStyle, mapLib, libs } = this.props;
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
            // latitude && longitude &&
            <GMap
              defaultCenter={{lat: latitude || 50.45466, lng: longitude || 30.5238}}
              returnMarkers={this.returnMarkers}
              markers={this.state.markers}
              mapStyle={mapStyle}
              mapLib={mapLib}
              libs={libs}
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
    mapLib: state`publicModule.mapLib`,
    libs: state`data.libraries`,
    setMyPosition: signal`publicModule.setMyPosition`,
  },
  injectSheet(styles)(MapPortal),
);
