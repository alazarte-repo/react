import React from 'react';
import PropTypes from 'prop-types';
// import { Collapse } from 'react-bootstrap';
import './Segment.scss';
// import BatteryIndicator from '../../shared/BatteryIndicator';


class Segment extends React.Component {
  state = {
    expanded: false,
  }

  expandMember = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  }

  selectMember = () => {
    this.props.selectMember();
    this.expandMember();
  }

  render() {
    return (
      <div className={this.props.selected ? 'active-thing-card' : 'inactive-thing-card'}>
        <div className="card-segment-container" onClick={this.selectMember}>
          <div className="card-segment" >
            <div className="card-segment-info">
              <span className="card-segment-info-name"> { this.props.name } </span>
              <span className="card-segment-info-timeago"> {this.props.parsedTime} </span>
            </div>
            <div className="card-segment-location">
              <span>{this.props.parsedAddress}</span>
            </div>
          </div>
          {/*
          <div className="link-icon" onClick={this.selectMember}>
            <i className={this.state.expanded ? 'icon icon-multiply' : 'icon icon-arrow'} />
          </div>
          */}
        </div>
        {/*
        <Collapse in={this.state.expanded}>
          <div>
            <BatteryIndicator />
          </div>
        </Collapse>
        */}

      </div>
    );
  }
}

Segment.propTypes = {
  parsedTime: PropTypes.string,
  parsedAddress: PropTypes.string,
  name: PropTypes.string,
  selectMember: PropTypes.func,
  selected: PropTypes.bool,
};

export default Segment;
