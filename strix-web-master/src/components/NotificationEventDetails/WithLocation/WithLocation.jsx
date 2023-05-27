import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-google-maps';
import VehicleNotificationMap from '../../Maps/VehicleNotificationMap';
import { reverseGeocode } from '../../../utils/geocoding';
import { makeCancelable } from '../../../utils/promise';
import './WithLocation.scss';

const LOADING_MESSAGE = 'Cargando...';
class WithLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressFromLocationStreet: LOADING_MESSAGE,
      addressFromLocationNeightbourhood: '',
    };
    this.map = null;
    this.geocodingPromise = null;
  }

  componentWillMount() {
    this.geocodeAddress();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.lat !== this.props.location.lat &&
      nextProps.location.lat !== this.props.location.lat) {
      this.setState({
        addressFromLocationStreet: LOADING_MESSAGE,
        addressFromLocationNeightbourhood: '',
      }, () => this.geocodeAddress());
    }
  }


  componentWillUnmount() {
    if (this.geocodingPromise != null) {
      this.geocodingPromise.cancel();
    }
  }

  geocodeAddress() {
    this.geocodingPromise = makeCancelable(reverseGeocode(this.props.location));
    this.geocodingPromise.promise
      .then((response) => {
        const street = `${response.address_components[1].long_name} ${response.address_components[0].long_name}`;
        const neightbour = response.address_components[3].long_name;
        this.setState({
          addressFromLocationStreet: street,
          addressFromLocationNeightbourhood: neightbour,
        });
      })
      .catch((error) => {
        if (!error.isCanceled) {
          this.setState({
            addressFromLocationStreet: 'Ocurrió un error cargando la dirección',
            addressFromLocationNeightbourhood: '',
          });
        }
      });
  }

  render() {
    return (
      <div className="with-location-notification-detail">
        <div className="information">
          <div className="address">
            <span> { this.state.addressFromLocationStreet } </span>
            <span> { this.state.addressFromLocationNeightbourhood } </span>
          </div>
          <div className="speed">
            <span className="speed-number">{this.props.speed || '0'} km/h</span>
            <span> Velocidad </span>
          </div>
        </div>
        <div className="map">
          <VehicleNotificationMap
            ref={(node) => { this.map = node; }}
            defaultOptions={{ maxZoom: 14 }}
            location={this.props.location}
          >
            <Marker
              position={this.props.location}
              icon={{
                url: this.props.markerIcon,
                scaledSize: new window.google.maps.Size(40, 50),
              }}
            />
          </VehicleNotificationMap>
        </div>
      </div>
    );
  }
}

WithLocation.propTypes = {
  speed: PropTypes.string,
  markerIcon: PropTypes.string,
  location: PropTypes.object,
};

export default WithLocation;
