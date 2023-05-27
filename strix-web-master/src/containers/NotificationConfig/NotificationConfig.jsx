import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ConfigItem from '../../components/ConfigItem';
import { history } from '../../store';
import CardType from '../../constants/cardType';


const GEOFENCE_BREACHED = 'com.magenta.events.geofence_breached';
const VELOCITY_BREACHED = 'com.magenta.events.speed_limit_breached';
const VEHICLE_MOTION = 'com.magenta.events.vehicle_motion';
const ALARM_SET_OFF = 'com.magenta.events.alarm_set_off';
const LOW_BATTERY = 'com.magenta.events.low_battery';

const events = [GEOFENCE_BREACHED, VELOCITY_BREACHED, VEHICLE_MOTION, ALARM_SET_OFF, LOW_BATTERY];
const labels = ['Salida de zona segura', 'Velocidad maxima', 'Modo estacionado', 'Activación de alarma', 'Bateria baja'];
const arrayValues = ['alert', 'push'];
const arrayLabel = ['Alerta', 'Push'];

class NotificationConfig extends React.Component {
  constructor(props) {
    super(props);
    const keys = this.getKeys();
    const config = {};
    keys.forEach((key) => {
      config[key] = this.props.thingPreferences[key];
    });
    this.state = {
      config,
      keys,
    };
  }

  getKeys = () =>
    Object.keys(this.props.thingPreferences)
      .filter(key => events.includes(key))
      .filter((key) => {
        switch (this.props.thingtype) {
          case CardType.Flex: return key === GEOFENCE_BREACHED || key === LOW_BATTERY;
          case CardType.Home: return key === ALARM_SET_OFF;
          default: // vehicle
            return key === GEOFENCE_BREACHED || key === VEHICLE_MOTION || key === VELOCITY_BREACHED;
        }
      })

  getPreferences = () => {
    const preferences = [];

    this.state.keys.forEach((key) => {
      const indexLabel = events.findIndex(event => event === key);
      const indexOption = arrayValues.findIndex(v => v === this.props.thingPreferences[key]);

      preferences.push({
        label: labels[indexLabel],
        path: key,
        initialValue: arrayLabel[indexOption],
      });
    });
    return preferences;
  }

  modifyConfiguration = (path, value) => {
    this.setState((state) => {
      const config = { ...state.config };
      config[path] = value;

      return {
        ...state,
        config,
      };
    }
      ,
    );
  };

  handlerChanges = () => {
    this.props.updatePreferences(this.props.thingId, this.state.config);
    history.goBack();
  };

  render() {
    const preferences = this.getPreferences();
    return (
      <div className="things-config-container">
        <div className="title-container">
          <Link
            to={`/configuration/things/${this.props.match.params.thingId}`}
            style={{
              transform: 'rotate(180deg)',
              textDecoration: 'none',
              color: 'inherit',
              marginRight: '20px',
            }}
          >
            <i className="icon icon-arrow" />
          </Link>
          <h1 className="title-right-panel">Notificaciones</h1>
          <Button className="btn btn-lg btn-primary btn-block btn-save" onClick={this.handlerChanges}> Guardar </Button>
        </div>
        <div className="config-item-container">
          {preferences.map(p => (
            <ConfigItem
              label={p.label}
              type="select"
              values={arrayValues}
              valuesLabel={arrayLabel}
              key={p.path}
              initialValue={p.initialValue}
              typeOfValue=""
              callbackParent={(event) => { this.modifyConfiguration(p.path, event.target.value); }}
            />
          ))}
        </div>
      </div>
    );
  }
}
NotificationConfig.propTypes = {
  match: PropTypes.object,
  thingPreferences: PropTypes.object,
  updatePreferences: PropTypes.func,
  thingId: PropTypes.string,
  thingtype: PropTypes.string,
};

export default NotificationConfig;
