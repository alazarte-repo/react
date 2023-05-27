import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-bootstrap';
import CardBasicInfo from '../shared/CardBasicInfo';
import CardBasicInfoAlert from '../shared/CardBasicInfoAlert';
import CardAdditionalInfo from '../shared/CardAdditionalInfo';
import CardSwitchButton from '../shared/CardSwitchButton';
import ExpandedSegment from './ExpandedSegment';
import FuelCut from './ExpandedSegment/FuelCut';
import VehicleAction from '../../../constants/vehicleAction';
import DivisionLine from '../../../components/DivisionLine';
import { getVehicleIcon } from '../../../utils/things';
import './Vehicle.scss';

class Vehicle extends Component {
  constructor(props) {
    super(props);
    this.renderBasicInfo = this.renderBasicInfo.bind(this);
  }

  changeDateRangeSegment = (dateRange) => {
    this.props.changeRangeSegment({
      id: this.props.cardProps.id,
      start: dateRange.rangeStart,
      end: dateRange.rangeEnd,
    });
  };

  toggleParkingMode = (thingId, agent) => () => {
    const agentId = agent && agent.id;
    return this.props.toggleParkingMode(thingId, agentId);
  }

  renderBasicInfo() {
    const CardComponent = this.props.hasAlert ? CardBasicInfoAlert : CardBasicInfo;
    const icon = getVehicleIcon(this.props.cardProps.subtype);
    return (
      <CardComponent
        id={this.props.cardProps.id}
        location={this.props.cardProps.location}
        name={this.props.cardProps.name}
        agents={this.props.agents}
        expanded={this.props.expanded}
        lastUpdate={this.props.cardProps.lastUpdated}
        icon={icon}
      />
    );
  }

  render() {
    const parkingModeAgent = this.props.agents
      .find(agent => agent.type === 'mrn:agent_type:parking_mode');
    const maxSpeedAgent = this.props.agents
      .find(agent => agent.type === 'mrn:agent_type:speed_limit');
    const maxSpeed = maxSpeedAgent ? `Máxima ${maxSpeedAgent.configuration.speed_limit} km/h` : 'Sin vel. máxima';
    let speed = `${this.props.cardProps.speed} km/h`;
    if (!this.props.cardProps.contact_on && this.props.cardProps.speed === 0) {
      speed = 'Estacionado';
    }
    return (
      <div className="vehicle-card-container">
        <div
          className={(this.props.selected ? 'active-thing-card' : 'inactive-thing-card')}
          onClick={this.props.selectCard}
        >
          {this.renderBasicInfo()}
          <CardAdditionalInfo
            rightData={maxSpeed}
            rightTitle={speed}
            leftData="Zona segura"
            leftTitle={this.props.currentSafeZone || 'Ninguna'}
            agents={this.props.agents}
            showAllGeofences={this.props.showAllGeofences}
            id={this.props.cardProps.id}
            leftIcon="safe-place"
            rightIcon="velocity"
          />
          {
            this.props.expanded &&
            this.props.cardProps.actions != null &&
            this.props.cardProps.actions.includes(VehicleAction.FuelCutOff) &&
            this.props.cardProps.actions.includes(VehicleAction.FuelRestore) &&
            <Fragment>
              <DivisionLine />
              <FuelCut
                thingId={this.props.cardProps.id}
                fuelCutCheckRunningAction={this.props.fuelCutCheckRunningAction}
                executeAction={this.props.fuelExecuteAction}
                cut={this.props.cardProps.fuelCutOff}
                polling={this.props.fuelCutPolling}
              />
            </Fragment>
          }
          <CardSwitchButton
            onChange={this.toggleParkingMode(this.props.cardProps.id, parkingModeAgent)}
            checked={!!parkingModeAgent}
          >
            Modo estacionado
          </CardSwitchButton>
        </div>
        <Collapse in={this.props.expanded}>
          <div>
            <ExpandedSegment
              showTripList={this.props.showTripList}
              agents={this.props.agents}
              thingId={this.props.cardProps.id}
              selectedTripId={this.props.selectedTripId}
              tripsSegmentsProps={this.props.cardProps.trips}
              selectedServiceNotification={this.props.selectedServiceNotification}
              resetTripsList={this.props.resetTripsList}
              availableTrips={this.props.availableTrips}
              selectTrip={this.props.selectTrip}
              selectTripDetails={this.props.selectTripDetails}
              selectServiceNotification={this.props.selectServiceNotification}
              dateRange={this.props.dateRange}
              changeDateRangeSegment={this.changeDateRangeSegment}
              mileage={this.props.cardProps.mileage}
            />
          </div>
        </Collapse>
      </div>
    );
  }
}

Vehicle.propTypes = {
  showTripList: PropTypes.func,
  cardProps: PropTypes.object,
  changeRangeSegment: PropTypes.func,
  selectTrip: PropTypes.func,
  selectTripDetails: PropTypes.func,
  selectServiceNotification: PropTypes.func,
  resetTripsList: PropTypes.func,
  fuelCutCheckRunningAction: PropTypes.func,
  fuelExecuteAction: PropTypes.func,
  dateRange: PropTypes.object,
  expanded: PropTypes.bool,
  selectCard: PropTypes.func,
  selected: PropTypes.bool,
  selectedTripId: PropTypes.string,
  toggleParkingMode: PropTypes.func,
  agents: PropTypes.array,
  hasAlert: PropTypes.bool,
  selectedServiceNotification: PropTypes.bool,
  showAllGeofences: PropTypes.func,
  availableTrips: PropTypes.array,
  fuelCutPolling: PropTypes.bool,
  currentSafeZone: PropTypes.string,
};

export default Vehicle;
