
import {GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from "react";
import { Map, Marker } from "google-maps-react";

const style = {
  width: '100%',
  height: '100%'
}

export class MapContainer extends Component {
  render() {
        let locations = this.props.images.map(image => {
          return { 
            'lng': image.longitude,
            'lat': image.latitude
          }
        });

        let bounds = new this.props.google.maps.LatLngBounds();
        
        locations.map( location => {
          if (!isNaN(location.lat)) {
            bounds.extend(location);
          }
        })

    return (<Map google={this.props.google} style={style} bounds={bounds} initialCenter={{ lat: 52.2566371, lng: 20.984122345 }} zoom={11}>
      {this.props.images.map(image => <Marker key={image.image} onClick={this.onMarkerClick} id={image.image} title="Obrazek" position={{ lat:image.latitude, lng: image.longitude}} />)}      
    </Map>)
  }

}
 
export default GoogleApiWrapper({
  apiKey: ('')
})(MapContainer)