import React from 'react';
import PropTypes from 'prop-types';
import SwitchButton from 'react-ios-switch';
import { history } from '../../store';
import { ExitConfirmation } from '../../components/Modals';
import ConfigItem from '../../components/ConfigItem';

class MaxSpeedConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: !!props.agentId,
      speed_limit: this.props.agent && this.props.agent.configuration.speed_limit,
      displayConfirmation: false,
    };
  }

  toggleConfirmationPopup = () => {
    this.setState(state => ({ ...state, displayConfirmation: !state.displayConfirmation }));
  };

  handleToggle = () => {
    this.setState(state => ({
      ...state,
      checked: !this.state.checked,
    }));
  };

  handleChange = ({ target }) => {
    this.setState(state => ({
      ...state,
      speed_limit: target.value,
    }));
  };

  goBackWithoutSaving = () => {
    this.toggleConfirmationPopup();
    history.goBack();
  };

  handleSubmit = () => {
    const { thingId } = this.props.match.params;
    if (this.props.agentId && this.state.speed_limit && this.state.checked) {
      this.props.updateSpeedLimitAgent(thingId, this.props.agentId, this.state.speed_limit);
    } else if (!this.props.agentId && this.state.speed_limit) {
      this.props.createAgentSpeedLimit(thingId, this.state.speed_limit);
    } else {
      this.props.removeAgentSeedLimit(this.props.agentId);
    }
    history.goBack();
  };

  render() {
    return (
      <div className="things-config-container">
        <div className="title-container" >
          <a
            onClick={() => this.toggleConfirmationPopup()}
            style={{
              transform: 'rotate(180deg)',
              textDecoration: 'none',
              fontSize: '18px',
              color: 'inherit',
              marginRight: '20px',
              cursor: 'pointer',
            }}
          >
            <i className="icon icon-arrow" />
          </a>
          <h1 className="title-right-panel"> Velocidad Maxima </h1>
          <button
            className="btn btn-lg btn-primary btn-save"
            disabled={this.state.speed_limit === ''}
            onClick={this.handleSubmit}
          >
            Guardar
          </button>
        </div>
        <div className="config-item-container">
          <div className="config-item">
            <span
              className="label-container-config"
              style={{ marginRight: 'auto' }}
            >
              Alerta velocidad maxima
            </span>
            <SwitchButton
              checked={this.state.checked}
              onChange={this.handleToggle}
            />
          </div>
          {
            this.state.checked &&
            <ConfigItem
              formType="number"
              label={'Velocidad Maxima (Km/h)'}
              content="Km/h"
              type="input"
              value={this.state.speed_limit}
              typeOfValue="Km/h"
              callbackParent={event => this.handleChange(event)}
            />
          }
        </div>
        <ExitConfirmation
          show={this.state.displayConfirmation}
          accept={this.goBackWithoutSaving}
          hide={this.toggleConfirmationPopup}
          componentName={'Velocidad Maxima'}
        />
      </div>
    );
  }
}
MaxSpeedConfig.propTypes = {
  match: PropTypes.object,
  agent: PropTypes.object,
  updateSpeedLimitAgent: PropTypes.func,
  createAgentSpeedLimit: PropTypes.func,
  removeAgentSeedLimit: PropTypes.func,
  agentId: PropTypes.string,
};

export default MaxSpeedConfig;
