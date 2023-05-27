import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DashboardLink from '../../../../constants/dashboardLink';
import HomeControlButton from './HomeControlButton';
import toJS from '../../../toJS';
import './HomeControl.scss';

const MAX_CONTROLS = 4;

const HomeControl = ({ homeControlItems, thingId, makeSwitch, expanded }) => {
  const showMoreLink = DashboardLink.getHomeControl(thingId);
  const firstHomeControlItems = homeControlItems.slice(0, MAX_CONTROLS);
  return (
    <div className="home-control">
      {
        expanded &&
        <div className="header">
          <span className="title">Control del hogar</span>
          <Link className="expand-link" to={showMoreLink}>
            Ver todos
          </Link>
        </div>
      }

      <div className="home-list">
        { firstHomeControlItems.map(homeControl =>
          (<HomeControlButton
            {...homeControl}
            key={homeControl.id}
            makeSwitch={makeSwitch}
          />))}
      </div>

    </div>);
};

HomeControl.propTypes = {
  homeControlItems: PropTypes.array,
  thingId: PropTypes.string,
  makeSwitch: PropTypes.func,
  expanded: PropTypes.bool,
};

export default toJS(HomeControl);
