import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../components/Spinner';
import { PrimaryColor } from '../../constants/colors';
import './styles.scss';


function TwoColumnsLayout(props) {
  return (
    <div className="main-layout-content padded-container">
      <div className="main-layout-content-column grey-container margin-r-10">
        { props.isLoading ? <Spinner color={PrimaryColor} /> : props.leftPanel() }
      </div>
      <div className="main-layout-content-column grey-container">
        { props.isLoading ? <Spinner color={PrimaryColor} /> : props.rightPanel() }
      </div>
    </div>
  );
}

TwoColumnsLayout.propTypes = {
  isLoading: PropTypes.bool,
  leftPanel: PropTypes.func,
  rightPanel: PropTypes.func,
};
export default TwoColumnsLayout;

