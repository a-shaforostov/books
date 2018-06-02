import React, { Component, Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import { compose, withProps, withStateHandlers, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { InfoBox } from "react-google-maps/lib/components/addons/InfoBox";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

import { Dimmer, Loader } from 'semantic-ui-react';

class GMap extends Component {
  constructor(props) {
    super(props);
    this.mapElement = React.createRef();
  }

  clickHandler = e => {
    const { onUpdateMarker } = this.props;

    onUpdateMarker &&
    onUpdateMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  componentDidMount() {
    // const PlacesService = window.google.maps.places.PlacesService;
    // debugger;
    // const map = new window.google.maps.Map(this.mapElement.current, {
    //   ...this.props,
    //   defaultZoom: 14,
    // });
    //
    // // const map = findDOMNode(this.mapElement.current);
    // console.log(map);
    // this.placesService = new PlacesService(this.mapElement.current.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
    // debugger;
    const PlacesService = window.google.maps.places.PlacesService;
    this.placesService = new PlacesService(this.mapElement.current.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
    const request = {
      location: this.props.defaultCenter,
      radius: '5000',
      types: ['library']
    };
    this.placesService.nearbySearch(request, callback);
    const { returnMarkers } = this.props;
    function callback(results, status) {
      // if (status == window.google.maps.places.PlacesServiceStatus.OK) {
      returnMarkers(results);
        // for (var i = 0; i < results.length; i++) {
        //   var place = results[i];
        //   console.log(results[i]);
        // }
      // }
    }

  }

  render() {
    const { markers } = this.props;
    return (
      <GoogleMap
        { ...this.props }
        defaultZoom={14}
        onClick={this.clickHandler}
        ref={this.mapElement}
      >
        {
          markers && markers.map(marker => (
            <Marker
              title={marker.name}
              key={''+marker.lat+marker.lng}
              position={{ lat: marker.lat, lng: marker.lng }}
            />
          ))
        }
      </GoogleMap>
    )
  }
}

export default compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBZANw9QWCv3-zoqnrzgOwamZp5w1xP1-Q&v=3.exp&language=uk&libraries=geometry,drawing,places",
    loadingElement: <div className="loadingElement" style={{ height: `calc(100vh - 200px)` }} ><Dimmer active><Loader>Завантаження карти</Loader></Dimmer></div>,
    mapElement: <div className="mapElement" style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `calc(100vh - 200px)` }} />,
  }),
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withScriptjs,
  withGoogleMap,
)(GMap);


// const MyMapComponent = compose(
//   withProps({
//     /**
//      * Note: create and replace your own key in the Google console.
//      * https://console.developers.google.com/apis/dashboard
//      * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
//      */
//     googleMapURL:
//       "https://maps.googleapis.com/maps/api/js?key=AIzaSyBZANw9QWCv3-zoqnrzgOwamZp5w1xP1-Q&v=3.exp&libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `100%` }} />
//   }),
//   withScriptjs,
//   withGoogleMap
// )(props => {
//   console.log(props);
//   return (
//     <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
//       {props.isMarkerShown && (
//         <Marker position={{ lat: -34.397, lng: 150.644 }} />
//       )}
//     </GoogleMap>
//   )
// });
//
// export default MyMapComponent;
