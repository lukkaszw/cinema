import React, { Component } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

class GMap extends Component {
  containerStyle = {
    width: '100%',
    height: '100%'
  };

  center = {
    lat: 52.225665764,
    lng: 21.003833318
  };

  render() {
    return (
      <LoadScript
        googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={this.containerStyle}
          center={this.center}
          zoom={10}
        >
          <Marker position={{ lat: 52.225665764, lng: 21.003833318 }} />
        </GoogleMap>
      </LoadScript>
    )
  }
}

export default GMap;