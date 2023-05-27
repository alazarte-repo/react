import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-bootstrap';
import CardBasicInfo from '../shared/CardBasicInfo';
import CardBasicInfoAlert from '../shared/CardBasicInfoAlert';
import CardAdditionalInfo from '../shared/CardAdditionalInfo';
import ExpandedSegment from './ExpandedSegment';
import './Flex.scss';


function obtainLevelDescription(level) {
  if (level <= 20) return 'baja';
  if (level === 0) return 'crítica';
  return 'OK';
}
class Flex extends React.Component {
  renderBasicInfo = () => {
    const Component = this.props.hasAlert ? CardBasicInfoAlert : CardBasicInfo;
    return (
      <Component
        id={this.props.cardProps.id}
        location={this.props.cardProps.location}
        name={this.props.cardProps.name}
        agents={this.props.agents}
        expanded={this.props.expanded}
        lastUpdate={this.props.cardProps.lastUpdated}
        icon="service-flex"
      />
    );
  };
  render() {
    const levelDescription = obtainLevelDescription(this.props.cardProps.batteryLevel);
    const batteryDescription = `Batería ${levelDescription}`;
    const batteryLevel = `${this.props.cardProps.batteryLevel}%`;
    const cardClass = this.props.selected ? 'active-thing-card' : 'inactive-thing-card';
    const safeZoneAgent = this.props.agents
      .find(agent => agent.type === 'mrn:agent_type:geofence');
    const safeZone = safeZoneAgent ? safeZoneAgent.label : 'Ninguna';
    return (
      <div className="flex-card-container">
        <div className={cardClass} onClick={this.props.selectCard}>
          {this.renderBasicInfo()}
          <CardAdditionalInfo
            style={{ cursor: 'default' }}
            rightData={batteryDescription}
            rightTitle={batteryLevel}
            leftData="Zona segura"
            leftTitle={safeZone}
            id={this.props.cardProps.id}
            showAllGeofences={this.props.showAllGeofences}
            leftIcon="safe-place"
            rightIcon="battery-full"
          />
        </div>
        <Collapse in={this.props.expanded}>
          <div>
            <ExpandedSegment
              selectedLocationId={this.props.selectedLocationId}
              locationHistoryProps={this.props.cardProps.locationHistory}
              selectLocationId={this.props.selectLocationId}
              dateRange={this.props.dateRange}
              locations={this.props.locations}
              thingId={this.props.cardProps.id}
            />
          </div>
        </Collapse>
      </div>
    );
  }
}


Flex.propTypes = {
  selectedLocationId: PropTypes.string,
  selectLocationId: PropTypes.func,
  dateRange: PropTypes.shape({
    rangeStart: PropTypes.string,
    rangeEnd: PropTypes.string,
  }),
  cardProps: PropTypes.shape({
    id: PropTypes.string,
    location: PropTypes.string,
    locationHistory: PropTypes.string,
    name: PropTypes.string,
    lastUpdated: PropTypes.string,
    batteryLevel: PropTypes.number,
  }),
  selectCard: PropTypes.func,
  selected: PropTypes.bool,
  expanded: PropTypes.bool,
  id: PropTypes.string,
  showAllGeofences: PropTypes.func,
  hasAlert: PropTypes.bool,
  agents: PropTypes.array,
  locations: PropTypes.array,
};

export default Flex;
