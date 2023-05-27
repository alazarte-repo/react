import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { serviceAgendaUtils } from 'utils';
import { NewService, ConfigService } from '../../Modals';
import ReminderItem from './ReminderItem';
import EmptyReminderList from '../../EmptyReminderList';
import './ServicesTab.scss';

class ServicesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewService: false,
      showConfigService: false,
      selectedReminder: null,
      availableReminderTypes: [],
    };

    this.serviceTooltip = (
      <Tooltip id="tooltip">
        Ya se han agregado todos los servicios disponibles.
      </Tooltip>
    );

    // Bindings
    this.getAddButton = this.getAddButton.bind(this);
    this.handleModals = this.handleModals.bind(this);
    this.handleNewServices = this.handleNewServices.bind(this);
  }

  getAddButton(disabled) {
    return (
      <div className="pull-right">
        <button
          className="add-service-button"
          disabled={disabled}
          onClick={() => this.handleModals('new_service')}
        >
          <i className="icon icon-add-sign" />
        </button>
      </div>
    );
  }

  handleModals(type, reminder) {
    if (type === 'new_service') {
      return (this.setState(state =>
        ({
          ...state,
          showNewService: !this.state.showNewService,
          availableReminderTypes: serviceAgendaUtils
            .availableReminderTypes(this.props.reminders, this.props.reminderTypes),
        })));
    }
    return (this.setState(state =>
      ({
        ...state,
        showConfigService: !this.state.showConfigService,
        selectedReminder: reminder,
      })));
  }

  handleNewServices(selectedServices) {
    this.props.addReminders(this.props.thingId, selectedServices);
    this.setState(state => ({
      ...state,
      availableReminderTypes: [],
    }));
  }

  render() {
    const noMoreReminders = this.props.reminders.length === this.props.reminderTypes.length;
    return (
      <div className="services-tab-container">
        {
          this.props.reminders.length > 0 &&
          <div className="reminders-header">
            <h4>Agregar nuevo servicio</h4>
            {
              noMoreReminders &&
              <OverlayTrigger placement="left" overlay={this.serviceTooltip}>
                { this.getAddButton(noMoreReminders) }
              </OverlayTrigger>
            }
            { !noMoreReminders && this.getAddButton(noMoreReminders) }
          </div>
        }
        <Scrollbars
          renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{ display: 'none' }} />}
          renderThumbHorizontal={props => <div {...props} className="thumb-horizontal" style={{ display: 'none' }} />}
          style={{ height: '100%', width: '100%' }}
        >
          {
            this.props.reminders.length === 0 ?
              <EmptyReminderList
                handleModal={this.handleModals}
                vehicleSubtype={this.props.thingSubtype}
              /> :
              this.props.reminders.map(reminder => (
                <ReminderItem
                  key={reminder.id}
                  reminder={reminder}
                  mileage={this.props.mileage}
                  handleModal={this.handleModals}
                />))
          }
        </Scrollbars>
        <NewService
          show={this.state.showNewService}
          availableReminderTypes={this.state.availableReminderTypes}
          hide={this.handleModals}
          handleNewServiceSubmit={this.handleNewServices}
        />
        <ConfigService
          show={this.state.showConfigService}
          thingId={this.props.thingId}
          hide={this.handleModals}
          title={this.state.selectedReminder && this.state.selectedReminder.name}
          reminder={this.state.selectedReminder}
          deleteReminder={this.props.deleteReminder}
          changeReminderConfig={this.props.changeReminderConfig}
        />
      </div>
    );
  }
}

ServicesTab.propTypes = {
  mileage: PropTypes.number,
  reminderTypes: PropTypes.array,
  reminders: PropTypes.array,
  thingId: PropTypes.string,
  thingSubtype: PropTypes.string,
  addReminders: PropTypes.func,
  deleteReminder: PropTypes.func,
  changeReminderConfig: PropTypes.func,
};

export default ServicesTab;
