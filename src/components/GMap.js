import React, { Component } from 'react';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

import { Dimmer, Loader, Segment } from 'semantic-ui-react';

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

  updateMapStyle = (props) => {
    const { mapStyle, mapLib, returnMarkers, defaultCenter } = props || this.props;

    switch (mapStyle) {
      case 'allLibsMapStyle':
        this.mapElement.current.panTo(defaultCenter);
        this.showAllLibs();
        break;

      case 'regLibsMapStyle':
        this.mapElement.current.panTo(defaultCenter);
        this.showRegLibs();
        break;

      case 'oneLibMapStyle':
        // Pan to marker position
        this.mapElement.current.panTo({lat: +mapLib.lat, lng: +mapLib.lng,});
        // Update markers with specified one
        returnMarkers([{
          lat: +mapLib.lat,
          lng: +mapLib.lng,
          name: mapLib.name,
        }]);
        break;

      default:
        returnMarkers && returnMarkers([]);
    }
  };

  componentDidMount() {
    this.updateMapStyle(null);
  }

  componentWillReceiveProps(props) {
    // update when style was changed or when we select another library
    if (this.props.mapStyle !== props.mapStyle || this.props.mapLib !== props.mapLib) {
      this.updateMapStyle(props);
    }
  }

  showAllLibs = () => {
    const PlacesService = window.google.maps.places.PlacesService;
    this.placesService = new PlacesService(this.mapElement.current.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
    const request = {
      location: this.props.defaultCenter,
      radius: '5000',
      types: ['library']
    };
    const returnMarkers = this.props.returnMarkers;
    this.placesService.nearbySearch(request, callback);
    function callback(results, status) {
      returnMarkers(results);
    }
  };

  showRegLibs = () => {
    // Build markers array for all libraries
    const libMarkers = this.props.libs.map(lib => ({
      lat: +lib.lat,
      lng: +lib.lng,
      name: lib.name,
    }));
    this.props.returnMarkers(libMarkers);

    // fit map to view all markers
    const bounds = new window.google.maps.LatLngBounds();
    libMarkers.forEach(marker => {
      bounds.extend({ lat: marker.lat, lng: marker.lng });
    });
    this.mapElement.current.fitBounds(bounds);
  };

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
              key={marker.key || ''+marker.lat+marker.lng}
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
    loadingElement: <div className="loadingElement" style={{ height: `100%` }} ><Dimmer active><Loader>Завантаження карти</Loader></Dimmer></div>,
    mapElement: <div className="mapElement" style={{ height: `100%` }} />,
    containerElement: <Segment raised piled style={{ height: `100%` }} />,
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
