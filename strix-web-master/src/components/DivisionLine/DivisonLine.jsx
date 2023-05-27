import React from 'react';
import PropTypes from 'prop-types';
import { ItemSeparator } from '../../constants/colors';

const DivisionLine = ({ color }) => (
  <hr
    style={{
      borderColor: color,
      margin: 0,
    }}
  />
);

DivisionLine.propTypes = {
  color: PropTypes.string,
};

DivisionLine.defaultProps = {
  color: ItemSeparator,
};

export default DivisionLine;
