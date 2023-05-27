/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SwitchButton from 'react-ios-switch';
import { Link } from 'react-router-dom';
import EmptyGeofence from '../EmptyGeofences';
import Map from '../Maps/Implementations';
import Panel from '../Panel';
import { Grey, ActiveGeofenceColor } from '../../constants/colors';
import { ExitConfirmation } from '../../components/Modals';
import { Geofence } from '../Maps/Objects';
import { history } from '../../store';
import Spinner from '../Spinner';
import AssignGeofenceHOC from './AssignGeofenceHOC';
import './AssignGeofence.scss';

class AssignOneGeofence extends Component {
  get configurationHasChanged() {
    return this.state.wasChecked !== this.state.checked
      || this.state.selectedGeofenceId !== this.state.previousSelectedGeofenceId;
  }

  get saveButtonDisabled() {
    return !this.configurationHasChanged
      || this.props.assingGeofenceLoading
      || (this.state.checked && this.state.selectedGeofenceId == null);
  }

  constructor(props) {
    super(props);
    this.state = {
      displayExitConfirmation: false,
      markers: [],
      geofences: [],
      bounds: [],
      selectedGeofenceId: null,
      previousSelectedGeofenceId: null,
      editing: false,
    };

    // Bindings
    this.handleToggleChange = this.handleToggleChange.bind(this);
    this.handleGeofenceClick = this.handleGeofenceClick.bind(this);
    this.hideConfirmationPopup = this.hideConfirmationPopup.bind(this);
    this.exit = this.exit.bind(this);
    this.save = this.save.bind(this);
  }

  componentWillMount() {
    const checked = this.props.agentIsEnabled(this.props.agent)
      && this.props.thingGeofences.length !== 0;

    const selectedGeofenceId = checked
      && this.props.thingGeofences != null
      && this.props.thingGeofences.length >= 0
      ? this.props.thingGeofences[0]
      : null;

    this.setState({
      checked,
      wasChecked: checked,
      geofences: this.props.getGeofencesToDraw(checked, this.getGeofence),
      markers: this.props.things.map(this.props.getMarker),
      bounds: this.props.geofences.map(x => x.marker.key),
      selectedGeofenceId,
      previousSelectedGeofenceId: selectedGeofenceId,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.configurationHasChanged) {
      return;
    }

    if (nextProps.agent == null && this.props.agent != null) {
      this.setState({
        wasChecked: false,
        checked: false,
        selectedGeofenceId: null,
        previousSelectedGeofenceId: null,
        geofences: this.props.geofences.map(g => this.getGeofence(g, false)),
      });
    } else if (nextProps.thingGeofences != null
      && nextProps.thingGeofences.length > 0
      && nextProps.thingGeofences !== this.state.previousSelectedGeofenceId) {
      this.setState({
        wasChecked: true,
        checked: true,
        selectedGeofenceId: nextProps.thingGeofences[0],
        previousSelectedGeofenceId: nextProps.thingGeofences[0],
        geofences: this.props.geofences.map(
          g => this.getGeofence(g, g.marker.key === nextProps.thingGeofences[0]),
        ),
      });
    }
  }

  handleGeofenceClick(id) {
    if (this.state.checked) {
      this.setState({
        selectedGeofenceId: id,
        geofences: this.props.geofences.map(g => this.getGeofence(g, id === g.marker.key)),
      });
    }
  }

  handleToggleChange() {
    let newState;
    if (this.state.checked) {
      newState = {
        checked: false,
        selectedGeofenceId: null,
        geofences: this.props.geofences.map(g => this.getGeofence(g, false)),
      };
    } else {
      newState = {
        checked: true,
        selectedGeofenceId: this.state.previousSelectedGeofenceId,
        geofences: this.props.geofences.map(
          g => this.getGeofence(g, g.marker.key === this.state.previousSelectedGeofenceId),
        ),
      };
    }
    this.setState(newState);
  }

  hideConfirmationPopup() {
    this.setState({ displayExitConfirmation: false });
  }

  exit() {
    if (this.configurationHasChanged) {
      this.setState({ displayExitConfirmation: true });
    } else {
      history.goBack();
    }
  }

  save() {
    if (this.state.checked) {
      if (this.props.agent == null) {
        this.props.assignAgentGeofence(
          this.props.thingId,
          [this.props.geofences.find(g => g.id === this.state.selectedGeofenceId)],
        );
      } else {
        const geofenceLabel = this.props.geofences.find(x =>
          x.marker.key === this.state.selectedGeofenceId,
        ).label;
        this.props.updateGeofence(
          this.props.agent.id,
          this.state.selectedGeofenceId,
          geofenceLabel,
        );
      }
    } else {
      this.props.deactivateGeofence(this.props.thingId, this.props.agent.id);
    }
  }

  getGeofence = (geofence, checked) => (
    new Geofence
      .Builder(
        geofence.marker.key,
        geofence.marker.position.lat,
        geofence.marker.position.lng,
        geofence.radius,
      )
      .setLabel(geofence.label)
      .setBorderColor(checked ? 'green' : 'gray')
      .setFillColor(checked ? ActiveGeofenceColor : 'gray')
      .setOnClick(this.handleGeofenceClick)
      .build()
  );

  render() {
    return (
      <Panel>
        <Panel.Header
          title={`Zona seguras de ${this.props.thing && this.props.thing.name}`}
          onClickBack={this.exit}
        >
          <button
            className="btn btn-primary"
            disabled={this.saveButtonDisabled}
            onClick={this.save}
          >
            Guardar
          </button>
        </Panel.Header>
        <Panel.Body>
          <div className="geofence-configuration-switch">
            <span>Zona Segura</span>
            {
              this.props.assingGeofenceLoading &&
              <Spinner
                fontSize="20pt"
                color={Grey}
                style={{ width: 'auto' }}
              />
            }
            {
              !this.props.assingGeofenceLoading &&
              <SwitchButton
                checked={this.state.checked}
                onChange={this.handleToggleChange}
              />
            }
          </div>
          {
            this.props.geofences.length === 0 &&
              <EmptyGeofence path={this.props.newGeofencelink} />
          }
          {
            <div style={{ heigth: '100%' }}>
              <Link
                to={this.props.newGeofencelink}
                className="geofence-configuration-create-button"
              >
                <i className="icon icon-add-sign" />
              </Link>
              <Map
                geofences={this.state.geofences}
                markers={this.state.markers}
                objectsToFit={this.state.bounds}
              />
            </div>
          }
          <ExitConfirmation
            show={this.state.displayExitConfirmation}
            accept={history.goBack}
            hide={this.hideConfirmationPopup}
            componentName="Nueva zona segura"
          />
        </Panel.Body>
        { this.state.checked &&
          <Panel.Footer>
            <div style={{ textAlign: 'center', padding: '15px', fontWeight: 'bolder' }}>
              Haga click sobre la zona que desea activar
            </div>
          </Panel.Footer>
        }
      </Panel>
    );
  }
}

AssignOneGeofence.propTypes = {
  things: PropTypes.array,
  geofences: PropTypes.array,
  thingGeofences: PropTypes.array,
  thing: PropTypes.object,
  agent: PropTypes.object,
  assignAgentGeofence: PropTypes.func,
  deactivateGeofence: PropTypes.func,
  getGeofencesToDraw: PropTypes.func,
  agentIsEnabled: PropTypes.func,
  getMarker: PropTypes.func,
  updateGeofence: PropTypes.func,
  thingId: PropTypes.string,
  newGeofencelink: PropTypes.string,
  assingGeofenceLoading: PropTypes.bool,
};

AssignOneGeofence.defaultProps = {
  things: [],
  geofences: [],
};

export default AssignGeofenceHOC(AssignOneGeofence);
