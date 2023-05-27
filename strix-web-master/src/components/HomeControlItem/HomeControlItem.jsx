import React, { Component } from 'react';
import SwitchButton from 'react-ios-switch';
import PropTypes from 'prop-types';
import HomeControlStatus from '../../constants/homeControlStatus';
import './HomeControlItem.scss';

class HomeControlItem extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.props.makeSwitch(this.props.id, this.props.parent_id, !this.props.on);
  }

  render() {
    const status = this.props.online;
    return (
      <div className="home-control-item">
        <span className="label">{this.props.label}</span>
        { status === HomeControlStatus.Offline && <i className="icon icon-blocked status-icon" /> }
        {
          (status === HomeControlStatus.Loading || status == null || this.props.switching) &&
          <i className="icon icon-spinner icon-spin status-icon" />
        }
        {
          (status === HomeControlStatus.Online && !this.props.switching) &&
          <SwitchButton
            checked={this.props.on}
            onChange={this.toggle}
          />
        }
      </div>
    );
  }
}

HomeControlItem.propTypes = {
  label: PropTypes.string,
  online: PropTypes.string,
  id: PropTypes.string,
  parent_id: PropTypes.string,
  on: PropTypes.bool,
  switching: PropTypes.bool,
  makeSwitch: PropTypes.func,
};


export default HomeControlItem;
