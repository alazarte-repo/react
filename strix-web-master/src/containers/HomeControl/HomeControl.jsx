import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { history } from '../../store';
import HomeControlItem from '../../components/HomeControlItem';
import './style.scss';

const arrowStyles = {
  transform: 'rotate(180deg)',
  textDecoration: 'none',
  fontSize: '18px',
  color: 'inherit',
  marginRight: '20px',
  cursor: 'pointer',
};

const HomeControl = ({ homeControlThings, homeControlSwitch }) => (
  <div className="things-config-container alarm-config-container">
    <div className="title-container" >
      <a onClick={history.goBack} style={arrowStyles}>
        <i className="icon icon-arrow" />
      </a>
      <h1 className="title-right-panel"> Control del hogar </h1>
    </div>
    {homeControlThings
      ? homeControlThings.map(homeControl => (
        <HomeControlItem
          id={homeControl.get('id')}
          parent_id={homeControl.get('parent_id')}
          label={homeControl.get('label')}
          on={homeControl.get('on')}
          online={homeControl.get('online')}
          switching={homeControl.get('switching')}
          key={homeControl.get('id')}
          makeSwitch={homeControlSwitch}
        />
      ))
      : null}
  </div>
);

HomeControl.propTypes = {
  homeControlThings: PropTypes.instanceOf(Immutable.List),
  homeControlSwitch: PropTypes.func,
};

export default HomeControl;
