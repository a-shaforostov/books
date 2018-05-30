import React, { Component, Fragment } from 'react';
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

import { Dimmer, Loader } from 'semantic-ui-react';

class GMap extends Component {
  clickHandler = e => {
    this.props.onUpdateMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  render() {
    const { markers } = this.props;
    return (
      <GoogleMap
        { ...this.props }
        defaultZoom={14}
        onClick={this.clickHandler}
      >
        {
          markers && markers.map(marker => (
            <Marker key={''+marker.lat+marker.lng} position={{ lat: marker.lat, lng: marker.lng }}>
              <InfoWindow onCloseClick={null}>
                <div>{marker.name}</div>
              </InfoWindow>
            </Marker>
          ))
        }
      </GoogleMap>
    )
  }
}

export default compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBZANw9QWCv3-zoqnrzgOwamZp5w1xP1-Q&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div className="loadingElement" style={{ height: `calc(100vh - 200px)` }} ><Dimmer active><Loader>Завантаження карти</Loader></Dimmer></div>,
    mapElement: <div className="mapElement" style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `calc(100vh - 200px)` }} />,
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
