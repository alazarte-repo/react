import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import LocationItem from './LocationItem';
import './LocationHistory.scss';


class LocationHistory extends React.Component {
  constructor() {
    super();
    this.set = {};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.locationHistoryProps !== this.props.locationHistoryProps) {
      this.set = _.mapValues(_.groupBy(nextProps.locationHistoryProps, 'date'),
        list => list.map(location => _.omit(location, 'date')));
    }
  }

  createListItems = locations => locations.map(itemProps => (
    <LocationItem
      key={itemProps.timestamp}
      selected={this.props.selectedLocationId === itemProps.timestamp}
      selectLocationId={() => { this.props.selectLocationId(itemProps.timestamp); }}
      segmentProps={itemProps}
      thingId={this.props.thingId}
    />
  ));

  render() {
    return (
      <div className="flex-list-container">
        {this.props.locationHistoryProps &&
          Object.entries(this.set).map(entry => (
            <div key={entry[0]}>
              <h4>{entry[0]}</h4>
              {
                this.createListItems(entry[1])
              }
            </div>
          ))}
      </div>
    );
  }
}

LocationHistory.propTypes = {
  locationHistoryProps: PropTypes.array,
  selectedLocationId: PropTypes.string,
  selectLocationId: PropTypes.func,
  thingId: PropTypes.string,
};

export default LocationHistory;
