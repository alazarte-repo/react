import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-bootstrap';
import CardBasicInfo from '../shared/CardBasicInfo';
import CardBasicInfoAlert from '../shared/CardBasicInfoAlert';
import ExpandedSegment from './ExpandedSegment';
import HomeControl from './HomeControl';
import ThumbnailsSection from './ExpandedSegment/ThumnailsSection';
import AlarmActivation from './AlarmActivation/AlarmActivation';
import './Home.scss';

const Home = (props) => {
  const BasicInfoComponent = props.hasAlert ? CardBasicInfoAlert : CardBasicInfo;
  const hasHomeControls = props.homeControlsInfo && props.homeControlsInfo.length > 0;
  const showMoreControls = !props.cardProps.state.online || props.cardProps.cameras.length === 0;

  return (
    <div className="home-card-container">
      <div
        className={(props.selected ? 'active-thing-card' : 'inactive-thing-card')}
        onClick={props.selectCard}
      >
        <BasicInfoComponent
          id={props.cardProps.id}
          location={props.cardProps.home_location.address_line1}
          name={props.cardProps.name}
          agents={props.agents}
          expanded={props.expanded}
          icon="service-home"
        />
        {
          props.cardProps.state.online &&
          <AlarmActivation
            toggleAlarm={props.toggleAlarm}
            checkRunning={props.alarmCheckRunningAction}
            armed={props.cardProps.isAlarmArmed}
            loading={props.isAlarmLoading}
            thingId={props.cardProps.id}
            lastUpdated={props.cardProps.lastUpdated}
            name={props.cardProps.name}
            error={props.alarmError}
            handleError={props.removeActionExecutionError}
          />
        }
        {
          props.cardProps.cameras.length !== 0 &&
          <ThumbnailsSection
            cameras={props.cardProps.cameras}
            getCameras={props.getCameras}
            camerasInfo={props.camerasInfo}
            link={`/dashboard/things/${props.cardProps.id}/motion-sensor`}
            expanded={props.expanded}
            onOpenStream={props.cameraStreamViewEvent}
            notifyError={props.notifyError}
          />
        }
        {
          (showMoreControls || props.expanded) &&
          <div>
            {
              hasHomeControls &&
              <HomeControl
                homeControlItems={props.homeControlsInfo}
                thingId={props.cardProps.id}
                makeSwitch={props.homeControlSwitch}
                expanded={props.expanded}
              />
            }
          </div>
        }
      </div>
      <Collapse in={props.expanded}>
        <div>
          <ExpandedSegment
            cameras={props.cardProps.cameras}
            alarmState={props.cardProps.state}
            getSignals={props.getSignals}
            thingId={props.cardProps.id}
            alarmItemsProps={props.cardProps.alarmHistory}
            dateRange={props.dateRange}
            signals={props.signals && props.signals}
            getCameras={props.getCameras}
            camerasInfo={props.camerasInfo}
          />
        </div>
      </Collapse>
    </div>
  );
};

Home.propTypes = {
  dateRange: PropTypes.object,
  cardProps: PropTypes.object,
  signals: PropTypes.object,
  selected: PropTypes.bool,
  expanded: PropTypes.bool,
  hasAlert: PropTypes.bool,
  isAlarmLoading: PropTypes.bool,
  agents: PropTypes.array,
  alarmError: PropTypes.string,
  removeActionExecutionError: PropTypes.func,
  selectCard: PropTypes.func,
  toggleAlarm: PropTypes.func,
  alarmCheckRunningAction: PropTypes.func,
  getSignals: PropTypes.func,
  getCameras: PropTypes.func,
  homeControlSwitch: PropTypes.func,
  cameraStreamViewEvent: PropTypes.func,
  notifyError: PropTypes.func,
  camerasInfo: PropTypes.array,
  homeControlsInfo: PropTypes.array,
};

export default Home;
