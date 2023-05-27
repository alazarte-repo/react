import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { history } from '../../store';
import { dashboardUrl } from '../../utils/url';
import MainLayout from '../MainLayout';
import TwoColumnsLayout from '../TwoColumnsLayout';
import NotificationList from '../../containers/NotificationList';
import NotificationDetails from '../../containers/NotificationDetails';


class NotificationsLayout extends Component {
  componentWillMount() {
    if (this.props.list && this.props.list.length === 0) {
      history.push(dashboardUrl);
    } else {
      this.props.notificationScreenOpened();
      this.props.notificationModalClosed();
    }
  }

  componentWillUnmount() {
    if (this.props.list && this.props.list.length !== 0) {
      this.props.markNotificationAsRead(this.props.unreadList);
    }
    this.props.notificationScreenClosed();
  }

  leftPanel = () => (
    <Switch>
      <Route path="/notifications" exact component={NotificationList} />
      <Route path="/notifications/:notificationId" exact component={NotificationList} />
    </Switch>
  );

  rightPanel = () => (
    <Switch>
      <Route path="/notifications/:notificationId" exact component={NotificationDetails} />
    </Switch>
  );

  render() {
    if (this.props.list && this.props.list.length === 0) {
      return null;
    }
    return (
      <MainLayout>
        <TwoColumnsLayout
          leftPanel={this.leftPanel}
          rightPanel={this.rightPanel}
        />
      </MainLayout>
    );
  }
}

NotificationsLayout.propTypes = {
  list: PropTypes.array,
  unreadList: PropTypes.array,
  notificationScreenOpened: PropTypes.func,
  notificationModalClosed: PropTypes.func,
  notificationScreenClosed: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
};

export default NotificationsLayout;
