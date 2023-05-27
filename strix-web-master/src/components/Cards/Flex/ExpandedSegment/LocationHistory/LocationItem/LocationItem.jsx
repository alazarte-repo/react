import React from 'react';
import PropTypes from 'prop-types';
import Timeline from '../../../../../Timeline';
import { history } from '../../../../../../store';
import './LocationItem.scss';


function LocationItem(props) {
  const locationItemClass = props.selected ?
    'location-item-active' : 'location-item-inactive';
  let time = props.segmentProps.parsedTime;
  time = time.length < 5 ? `0${time}` : time;

  const handlerClick = () => {
    props.selectLocationId();
    history.push(`/dashboard/things/${props.thingId}/locations/${props.segmentProps.dateUrl}`);
  };

  return (
    <div
      className={`flex-item-container ${locationItemClass}`}
    >
      <div className="from-data-container">
        <span className="time">{time}</span>
        <Timeline type="end" />
        <span className="address">{props.segmentProps.parsedAddress}</span>
      </div>
      <div className="link-container">
        <a href="#" onClick={handlerClick}>
          <i className="icon icon-ontrip" />
        </a>
      </div>
    </div>
  );
}

LocationItem.propTypes = {
  segmentProps: PropTypes.object,
  selectLocationId: PropTypes.func,
  selected: PropTypes.bool,
  thingId: PropTypes.string,
};

export default LocationItem;
