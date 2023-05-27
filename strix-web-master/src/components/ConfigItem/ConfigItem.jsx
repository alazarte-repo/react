import React from 'react';
import { FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import GoArrow from '../GoArrow';
import { history } from '../../store';


class ConfigItem extends React.Component {
  constructor(props) {
    super(props);
    this.goToLink = this.goToLink.bind(this);
  }

  onValueChange = (event) => {
    event.persist();
    this.props.callbackParent(event);
  }

  handleFocus = event => event.target.select();

  goToLink() {
    history.push(this.props.link);
  }

  renderValue = () => {
    switch (this.props.type) {
      case 'select':
        return (
          <div className="value-container-config" style={this.props.style}>
            <FormControl
              componentClass="select"
              onChange={this.onValueChange}
            >
              <option hidden>
                {this.props.initialValue ? `${this.props.initialValue} ${this.props.typeOfValue}` : 'No configurado'}
              </option>
              {this.props.values.map((value, index) => (
                <option value={value} key={`key-option-${value}`}>
                  {this.props.valuesLabel[index]}
                </option>
              ))}
            </FormControl>
          </div>
        );
      case 'input':
        return (
          <div className="value-container-config" style={this.props.style}>
            <FormControl
              onFocus={this.handleFocus}
              style={{ content: this.props.content }}
              onChange={this.onValueChange}
              type={this.props.formType}
              id={this.props.id}
              min="0"
              disabled={this.props.disabled}
              value={this.props.value}
            />
          </div>
        );
      case 'password':
        return (
          <div className="value-container-config" style={this.props.style}>
            <FormControl
              id={this.props.id}
              onChange={this.onValueChange}
              type="password"
            />
          </div>
        );
      case 'function':
        return (
          <div className="value-container-config">
            <span className="value-container-config">{this.props.valuesLabel}</span>
            <div onClick={() => this.props.onClick()} style={this.props.style}>
              <i className="icon icon-arrow config-item-icon" />
            </div>
          </div>
        );
      default:
        return (
          <div className="value-container-config">
            {this.props.valuesLabel ?
              <span className="value-container-config">{this.props.valuesLabel}</span> :
              <span className="value-container-config">No configurado</span>
            }
            <GoArrow onClick={this.goToLink} />
          </div>
        );
    }
  };

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="config-item" style={this.props.style}>
        <span className="label-container-config">{this.props.label}</span>
        {this.renderValue()}
      </div>
    );
  }
}

ConfigItem.propTypes = {
  content: PropTypes.string,
  formType: PropTypes.string,
  type: PropTypes.string,
  values: PropTypes.array,
  label: PropTypes.string,
  link: PropTypes.string,
  callbackParent: PropTypes.func,
  onClick: PropTypes.func,
  valuesLabel: PropTypes.any,
  initialValue: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  typeOfValue: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  show: PropTypes.bool,
};

ConfigItem.defaultProps = {
  show: true,
};

export default ConfigItem;
