import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import NotificationList from '../../containers/NotificationList/NotificationList';
import './Notifications.scss';


class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };

    this.handleEnter = this.handleEnter.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
  }

  componentWillMount() {
    this.props.getUnreadNotifications();
  }

  togglePopup() {
    this.setState(state => ({ ...state, showModal: !state.showModal }));
  }

  handleExit() {
    this.props.notificationModalClosed();
    this.props.markNotificationAsRead(this.props.unreadList);
  }

  handleEnter() {
    this.props.notificationModalOpened();
    if (this.props.page === 1) {
      this.props.getNotifications(this.props.page);
    }
  }

  render() {
    return (
      <div>
        <div className="notification-area pull-right" onClick={this.togglePopup} >
          <a>
            <i className="icon icon-notification" />
            { (this.props.unreadNotifications > 0) &&
              <span className="notification-number">{this.props.unreadNotifications > 9 ? '+9' : this.props.unreadNotifications}</span>
            }
          </a>
        </div>
        <Modal
          show={this.state.showModal}
          onHide={this.togglePopup}
          className="align-middle"
          onEnter={this.handleEnter}
          onExited={this.handleExit}
        >
          <Modal.Header closeButton>
            <Modal.Title>Listado de notificaciones</Modal.Title>
          </Modal.Header>
          <Modal.Body className="notifications-modal-body">
            <NotificationList
              list={this.props.notifications}
              getNotifications={this.props.getNotifications}
              notificationModalClosed={this.props.notificationModalClosed}
              notificationModalOpened={this.props.notificationModalOpened}
              onClickNotification={this.togglePopup}
              highlightActive={false}
              loading={this.props.loading}
              page={this.props.page}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

Notifications.propTypes = {
  notifications: PropTypes.array,
  unreadList: PropTypes.array,
  getNotifications: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
  getUnreadNotifications: PropTypes.func,
  notificationModalClosed: PropTypes.func,
  notificationModalOpened: PropTypes.func,
  unreadNotifications: PropTypes.number,
  loading: PropTypes.bool,
  page: PropTypes.number,
};

Notifications.defaultProps = {
  notifications: [],
};

export default Notifications;
