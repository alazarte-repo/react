import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';


class TimeForm extends PureComponent {
  state = {
    time: '',
  }
  handleChange = ({ target }) => {
    this.setState({ time: target.value });
  }

  updateParent = () => {
    this.props.updateParentState(this.state.time, 'timeForm');
  }

  render() {
    return (
      <div className="input-container">
        <span>Hora</span>
        <input
          onBlur={() => this.updateParent()}
          onChange={event => this.handleChange(event)}
          type="time"
          defaultValue={this.props.defaultValue}
        />
      </div>
    );
  }
}

TimeForm.propTypes = {
  updateParentState: PropTypes.func,
  defaultValue: PropTypes.string,
};

export default TimeForm;

