import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const days = [
  {
    value: 'monday',
    ref: 'Lun',
  },
  {
    value: 'tuesday',
    ref: 'Mar',
  },
  {
    value: 'wednesday',
    ref: 'Mie',
  },
  {
    value: 'thursday',
    ref: 'Jue',
  },
  {
    value: 'friday',
    ref: 'Vie',
  },
  {
    value: 'saturday',
    ref: 'Sab',
  },
  {
    value: 'sunday',
    ref: 'Dom',
  },
];

class RepeatDays extends PureComponent {
  constructor(props) {
    super(props);
    this.selectedDays = new Set();
    props.selectedDays.forEach(v => this.selectedDays.add(v));
  }

  handleCheckBoxChange = ({ target }) => {
    if (this.selectedDays.has(target.value)) {
      this.selectedDays.delete(target.value);
    } else {
      this.selectedDays.add(target.value);
    }
  }

  updateParent = () => {
    const selectedDays = Array.from(this.selectedDays);
    this.props.updateParentState(selectedDays, 'repeatDays');
  }

  render() {
    return (
      <div className="repeat-days-container" onMouseLeave={() => this.updateParent()}>
        <div className="days-selector-container">
          {days.map(day =>
            (<div className="ck-button" key={day.value}>
              <label>
                <input
                  onClick={event => this.handleCheckBoxChange(event)}
                  defaultChecked={!!this.selectedDays.has(day.value)}
                  type="checkbox"
                  value={day.value}
                />
                <span>{day.ref}</span>
              </label>
            </div>))}
        </div>
      </div>
    );
  }
}


RepeatDays.propTypes = {
  updateParentState: PropTypes.func,
  selectedDays: PropTypes.array,
};

export default RepeatDays;
