import React from 'react';
import PropTypes from 'prop-types';
import types from './types';

const ThingCard = (props) => {
  const { type } = props.cardProps;
  const Card = types[type];
  return (
    <div className="thing-card">
      <Card {...props} />
    </div>
  );
};

ThingCard.propTypes = {
  cardProps: PropTypes.object,
};

export default ThingCard;
