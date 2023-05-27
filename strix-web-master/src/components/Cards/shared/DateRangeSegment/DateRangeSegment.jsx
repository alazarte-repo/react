import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from '../../../DatePicker';
import './DateRangeSegment.scss';


class DateRangeSegment extends React.Component {
  updateTrips = (event) => {
    const newRange = (
      this.props.range === 'start' ?
        { ...this.props.data, rangeStart: event } :
        { ...this.props.data, rangeEnd: event }
    );

    this.props.onChange(newRange);
  };

  render() {
    return (
      <div className="period-container">
        <h4>{this.props.title}</h4>
        <form className="form-inline search-form">
          <div className="form-group">
            <label htmlFor="fromField">Desde</label>
            <DatePicker
              pickerValue={this.props.data.rangeStart}
              changePicker={this.updateTrips}
              className="form-control"
              id="rangeStart"
            />
          </div>
          <div className="form-group">
            <label htmlFor="toField">Hasta</label>
            <DatePicker
              pickerValue={this.props.data.rangeEnd}
              changePicker={this.updateTrips}
              className="form-control"
              id="rangeEnd"
            />
          </div>
        </form>
      </div>
    );
  }
}

DateRangeSegment.propTypes = {
  title: PropTypes.string,
  data: PropTypes.object,
  range: PropTypes.string,
  onChange: PropTypes.func,
};

export default DateRangeSegment;
