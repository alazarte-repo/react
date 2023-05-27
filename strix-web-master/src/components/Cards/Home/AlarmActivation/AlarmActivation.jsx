import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import CardSwitchButton from '../../shared/CardSwitchButton';
import Indicator from '../../shared/CardAdditionalInfo/Indicator';
import { actionCategories } from '../../../../reducers/thingsActions';
import { PinConfirmation, ArmedAlarm } from '../../../Modals';

const ModalToShow = Object.freeze({
  PinConfirmation: 'pin-confirmation',
});

class AlarmActivation extends Component {
  constructor() {
    super();
    this.state = {
      show: null,
    };

    this.getTitle = this.getTitle.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleError = this.handleError.bind(this);
    this.showPinModal = this.showPinModal.bind(this);
    this.changeStateAlarm = this.changeStateAlarm.bind(this);
  }

  componentDidMount() {
    this.props.checkRunning(this.props.thingId);
  }

  getTitle() {
    if (this.props.loading) {
      return this.props.armed ? 'Desarmando' : 'Armando';
    }
    return this.props.armed ? 'Armada' : 'Desarmada';
  }

  hideModal() {
    this.setState({ show: null });
  }

  handleError() {
    this.props.handleError(this.props.thingId, actionCategories.HomeAlarm);
  }

  showPinModal() {
    this.setState({ show: ModalToShow.PinConfirmation });
  }

  changeStateAlarm(code) {
    if (code.length > 0) {
      this.props.toggleAlarm(
        this.props.thingId,
        this.props.armed,
        { code, zones: [] },
      );
    }
  }

  render() {
    const armedIcon = this.props.armed ? 'icon-alarm-on' : 'icon-alarm-off';
    return (
      <Fragment>
        <PinConfirmation
          show={this.state.show === ModalToShow.PinConfirmation}
          hide={this.hideModal}
          save={this.changeStateAlarm}
          title="Configuración de alarma"
          text={`Ingresá el código de la alarma de ${this.props.name}`}
        />

        <ArmedAlarm
          hide={this.handleError}
          accept={this.handleError}
          show={this.props.error != null}
          errorMessage={this.props.error}
        />

        <CardSwitchButton
          checked={this.props.armed}
          onChange={this.showPinModal}
          icon={armedIcon}
          isLoading={this.props.loading}
          disabled={this.props.loading}
        >
          <Indicator data={this.props.lastUpdated} title={this.getTitle()} />
        </CardSwitchButton>
      </Fragment>
    );
  }
}

AlarmActivation.propTypes = {
  toggleAlarm: PropTypes.func.isRequired,
  checkRunning: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  armed: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  thingId: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
};

export default AlarmActivation;
