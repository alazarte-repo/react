import React from 'react';
import PropTypes from 'prop-types';
import './ExpandedSegment.scss';
import LocationHistory from './LocationHistory';
// import DateRangeSegment from '../../shared/DateRangeSegment';


function ExpandedSegment(props) {
  // const rangeTitle = 'Registro de posiciones';

  return (
    <div>
      {/*
        <DateRangeSegment title={rangeTitle} data={props.dateRange} />
      */}      
      <LocationHistory
        selectedLocationId={props.selectedLocationId}
        locationHistoryProps={props.locations}
        selectLocationId={props.selectLocationId}
        thingId={props.thingId}
      />
    </div>
  );
}

ExpandedSegment.propTypes = {
  selectedLocationId: PropTypes.string,
  // dateRange: PropTypes.object,
  selectLocationId: PropTypes.func,
  locations: PropTypes.array,
  thingId: PropTypes.string,
};

export default ExpandedSegment;
