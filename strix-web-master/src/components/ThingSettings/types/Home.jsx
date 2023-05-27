import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import ConfigItem from '../../ConfigItem';
import ConfigurationLink from '../../../constants/configurationLink';
import '../ThingSettings.scss';

class HomeConfiguration extends React.Component {
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

  handleFormChange = (event) => {
    event.persist();
    this.setState(state => ({
      ...state,
      [event.target.id]: event.target.value,
      modified: true,
    }));
  }
  handleSubmit = () => {
    if (this.state.productName) {
      const arr = [{ action: 'update', path: '/label', value: this.state.productName }];
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
            label="Camara"
            valuesLabel
            link={`/configuration/camera/${this.props.thingId}`}
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
            label="Agenda de activaciones"
            valuesLabel
            link={`/configuration/things/${this.props.thingId}/alarms`}
          />
          <ConfigItem
            label="Control de hogar"
            valuesLabel
            link={ConfigurationLink.getHomeControl(this.props.thingId)}
          />
        </div>
      </div>
    );
  }
}

HomeConfiguration.propTypes = {
  name: PropTypes.string,
  thingId: PropTypes.string,
  updateThingsConfiguration: PropTypes.func,
};

export default HomeConfiguration;
