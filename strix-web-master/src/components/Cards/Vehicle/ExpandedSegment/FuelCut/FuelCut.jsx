import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import SwitchButton from 'react-ios-switch';
import fuelCutOff from 'images/fuel_cut.png';
import fuelOk from 'images/fuel_ok.png';
import VehicleAction from '../../../../../constants/vehicleAction';
import { DisabledColor } from '../../../../../constants/colors';
import Spinner from '../../../../../components/Spinner';
import PinConfirmation from '../../../../../components/Modals/PinConfirmation';
import './FuelCut.scss';

class FuelCut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPinModal: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.showPinModal = this.showPinModal.bind(this);
    this.hidePinModal = this.hidePinModal.bind(this);
    this.executeCutAction = this.executeCutAction.bind(this);
  }

  componentDidMount() {
    this.props.fuelCutCheckRunningAction(this.props.thingId);
  }

  showPinModal() {
    this.setState({ showPinModal: true });
  }

  hidePinModal() {
    this.setState({ showPinModal: false });
  }

  handleChange() {
    this.showPinModal();
  }

  executeCutAction(pin) {
    this.props.executeAction(
      this.props.thingId,
      this.props.cut ? VehicleAction.FuelRestore : VehicleAction.FuelCutOff,
      pin,
    );
  }

  render() {
    return (
      <Fragment>
        <div className="fuel-cut">
          <img
            src={this.props.cut ? fuelCutOff : fuelOk}
            alt="Fuel status"
            width="36px"
            height="36px"
          />
          <span className="cut-label">
            { this.props.cut ? 'Combustible cortado' : 'Combustible activo' }
          </span>

          <div className="right-controls">
            {
              this.props.polling &&
              <Spinner
                fontSize="20pt"
                color={DisabledColor}
              />
            }
            {
              !this.props.polling &&
              <SwitchButton
                onChange={this.handleChange}
                checked={!this.props.cut}
              />
            }
          </div>
        </div>
        <PinConfirmation
          show={this.state.showPinModal}
          hide={this.hidePinModal}
          save={this.executeCutAction}
        />
      </Fragment>
    );
  }
}

FuelCut.propTypes = {
  fuelCutCheckRunningAction: PropTypes.func,
  executeAction: PropTypes.func,
  cut: PropTypes.bool,
  polling: PropTypes.bool,
  thingId: PropTypes.string,
};

export default FuelCut;
