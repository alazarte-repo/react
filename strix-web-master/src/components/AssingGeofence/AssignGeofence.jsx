import React from 'react';
import PropTypes from 'prop-types';
import AssignAllGeofence from './AssignAllGeofence';
import AssignOneGeofence from './AssignOneGeofence';
import CardType from '../../constants/cardType';

const AssignGeofence = (props) => {
  if (props.thing == null) {
    return null;
  }

  switch (props.thing.type) {
    case CardType.Flex:
      return <AssignOneGeofence {...props} />;
    case CardType.Vehicle:
    default:
      return <AssignAllGeofence {...props} />;
  }
};

AssignGeofence.propTypes = {
  thing: PropTypes.object,
};

export default (AssignGeofence);
