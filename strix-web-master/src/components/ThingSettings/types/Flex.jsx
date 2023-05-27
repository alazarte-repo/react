import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import ConfigItem from '../../ConfigItem/index';
import '../ThingSettings.scss';

const arrValues = [5, 10, 15, 20, 25, 30, 35, 40, 50, 60];

class FlexConfiguration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modified: false,
      productName: this.props.name,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.thingId !== this.props.thingId) {
      this.setState({ productName: nextProps.name, modified: false });
    }
  }

  handleSubmit = () => {
    if (this.state.productName) {
      const arr = [{ action: 'update', path: '/label', value: this.state.productName }];
      this.props.updateThingsConfiguration(this.props.thingId, arr);
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
            type="select"
            label="Tiempo de reporte"
            values={arrValues}
            valuesLabel={arrValues.map(value => `${value} Min`)}
            link={`/configuration/speed/${this.props.thingId}`}
            show={false}
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
        </div>
      </div>
    );
  }
}

FlexConfiguration.propTypes = {
  name: PropTypes.string,
  thingId: PropTypes.string,
  updateThingsConfiguration: PropTypes.func,
  geofenceLabel: PropTypes.string,
};

export default FlexConfiguration;
