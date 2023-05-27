import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { history } from '../../store';
import { NewGeofenceName, ExitConfirmation } from '../Modals';
import { Geofence, Marker } from '../../components/Maps/Objects';
import Panel from '../../components/Panel';
import { markerColorUrl } from '../../utils/map';
import Map from '../Maps/Implementations';

const Modals = Object.freeze({
  ExitConfirmation: 'exit-confirmation',
  SaveGeofence: 'save-geofence',
});

class NewGeofence extends Component {
  constructor(props) {
    super(props);

    const center = this.props.thingsBounds.getCenter();

    this.state = {
      center: {
        lat: center.lat(),
        lng: center.lng(),
      },
      radius: 1000,
      modalToShow: null,
      name: '',
      charLength: 0,
      markers: [],
      bounds: [],
      geofences: [],
    };

    this.onLoadFinished = this.onLoadFinished.bind(this);
    this.geofenceCenterChange = this.geofenceCenterChange.bind(this);
    this.geofenceRadiusChange = this.geofenceRadiusChange.bind(this);
    this.save = this.save.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.showNamePopup = this.showNamePopup.bind(this);
    this.showConfirmationPopup = this.showConfirmationPopup.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.goBackWithoutSaving = this.goBackWithoutSaving.bind(this);

    this.mapRef = React.createRef();
  }

  componentWillMount() {
    this.setState({
      markers: this.props.markers.map(this._getMarker),
      bounds: this.props.markers.map(x => x.key),
    });
  }

  onLoadFinished() {
    const center = this.mapRef.current.getBoundsCenter();
    const geofence = new Geofence
      .Builder(
        'new-geofence',
        center.latitude,
        center.longitude,
        1000,
      )
      .setEditable(true)
      .setBorderColor('green')
      .setFillColor('green')
      .setOnCenterChanged(this.geofenceCenterChange)
      .setOnRadiusChanged(this.geofenceRadiusChange)
      .build();

    this.setState({ geofences: [geofence] });
  }

  geofenceCenterChange({ center }) {
    this.setState({
      center: {
        lat: center.latitude,
        lng: center.longitude,
      },
    });
  }

  geofenceRadiusChange({ radius }) {
    this.setState({ radius });
  }

  save() {
    this.showNamePopup();
    this.props.createGeofence({
      name: this.state.name,
      center: this.state.center,
      radius: this.state.radius,
    });
  }

  showNamePopup() {
    this.setState({
      name: '',
      modalToShow: Modals.SaveGeofence,
    });
  }

  hideModal() {
    this.setState({
      modalToShow: null,
    });
  }

  showConfirmationPopup() {
    this.setState({
      modalToShow: Modals.ExitConfirmation,
    });
  }

  updateInput(event) {
    event.persist();
    this.setState({
      name: event.target.value,
      charLength: event.target.value.length,
    });
  }

  goBackWithoutSaving() {
    this.showConfirmationPopup();
    history.goBack();
  }

  _getMarker = thing => (
    new Marker
      .Builder(
        thing.key,
        thing.position.lat,
        thing.position.lng,
      )
      .setIcon(markerColorUrl(thing, 'grey-color'))
      .setIconSize(40, 50)
      .build()
  );

  render() {
    return (
      <Fragment>
        <Panel>
          <Panel.Header
            title="Nueva zona segura circular"
            onClickBack={this.showConfirmationPopup}
          >
            { this.props.isLoading
              ? <i className="icon icon-spinner icon-spin" />
              : <button
                className="btn btn-lg btn-primary"
                onClick={this.showNamePopup}
              >
                Guardar
              </button>
            }
          </Panel.Header>
          <Panel.Body>
            <Map
              ref={this.mapRef}
              geofences={this.state.geofences}
              markers={this.state.markers}
              objectsToFit={this.state.bounds}
              onLoadFinished={this.onLoadFinished}
            />
          </Panel.Body>
        </Panel>
        <NewGeofenceName
          show={this.state.modalToShow === Modals.SaveGeofence}
          hide={this.hideModal}
          formHandler={this.updateInput}
          value={this.state.name}
          save={this.save}
          charLength={this.state.charLength}
        />

        <ExitConfirmation
          show={this.state.modalToShow === Modals.ExitConfirmation}
          accept={this.goBackWithoutSaving}
          hide={this.hideModal}
          componentName="Nueva zona segura"
        />
      </Fragment>
    );
  }
}

NewGeofence.propTypes = {
  markers: PropTypes.array,
  thingsBounds: PropTypes.object,
  createGeofence: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default NewGeofence;
