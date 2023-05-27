import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import ConfigItem from '../../ConfigItem/index';
import '../ThingSettings.scss';

class VehicleConfiguration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modified: false,
      productName: this.props.name,
      accumKilometers: this.props.accumKilometers,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.thingId !== this.props.thingId) {
      this.setState({
        productName: nextProps.name,
        accumKilometers: this.props.accumKilometers,
        modified: false,
      });
    }
  }

  handleFormChange = (event) => {
    event.persist();
    this.setState(state => ({
      ...state,
      [event.target.id]: event.target.value,
      modified: true,
    }));
  }

  handleSubmit = () => {
    if (this.state.productName || this.state.accumKilometers) {
      const arr = [];
      if (this.state.productName) {
        arr.push({ action: 'update', path: '/label', value: this.state.productName });
      }
      if (this.state.accumKilometers) {
        arr.push({ action: 'update', path: '/mileage_reading', value: Number(this.state.accumKilometers) });
      }
      this.props.updateThingsConfiguration(this.props.thingId, arr);
    }
  }

  render() {
    return (
      <div className="things-config-container">
        <div className="title-container">
          <h1 className="title-right-panel">{`Configuracion de ${this.props.name}`}</h1>
          <Button
            disabled={!this.state.modified}
            onClick={this.handleSubmit}
            bsStyle="primary"
            className="btn btn-lg btn-block btn-save"
          >
            Guardar
          </Button>
        </div>
        <div className="config-item-container">
          <ConfigItem
            label={'Zona segura'}
            valuesLabel={this.props.geofenceLabel ? this.props.geofenceLabel : 'No configurado'}
            link={`/configuration/things/${this.props.thingId}/assign-geofence`}
          />
          <ConfigItem
            label="Velocidad máxima"
            valuesLabel={this.props.maxSpeed ?
              `${this.props.maxSpeed.configuration.speed_limit} Km/h` : 'No configurado'}
            link={`/configuration/speed/${this.props.thingId}`}
          />
          <ConfigItem
            formType="number"
            type="input"
            label="Kilometraje acumulado"
            value={this.state.accumKilometers}
            callbackParent={event => this.handleFormChange(event)}
            id="accumKilometers"
          />
          <ConfigItem
            label="Notificaciones"
            valuesLabel
            link={`/configuration/notifications/${this.props.thingId}`}
          />
          <ConfigItem
            type="input"
            label="Nombre del producto"
            value={this.state.productName}
            callbackParent={event => this.handleFormChange(event)}
            id="productName"
          />
          <ConfigItem
            label="Agenda de servicios"
            valuesLabel
            link={`/configuration/things/${this.props.thingId}/services`}
          />
        </div>
      </div>
    );
  }
}

VehicleConfiguration.propTypes = {
  name: PropTypes.string,
  thingId: PropTypes.string,
  accumKilometers: PropTypes.number,
  geofenceLabel: PropTypes.string,
  updateThingsConfiguration: PropTypes.func,
  maxSpeed: PropTypes.object,
};

export default VehicleConfiguration;
