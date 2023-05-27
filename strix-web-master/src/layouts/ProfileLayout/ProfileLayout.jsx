import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import MainLayout from '../MainLayout';
import TwoColumnsLayout from '../TwoColumnsLayout';
import ProfilePanel from '../../containers/ProfilePanel';
import ChangePassword from '../../containers/ChangePassword';
import ChangePin from '../../containers/ChangePin';
import Devices from '../../containers/Devices';

class ProfileLayout extends React.Component {
  componentWillMount() {
    this.props.getDevices();
  }
  leftPanel = () => (
    <Switch>
      <Route path="/profile/*" component={ProfilePanel} />
      <Route path="/profile" component={ProfilePanel} />
      <Route path="/mydevices" component={ProfilePanel} />
    </Switch>
  );
  rightPanel = () => (
    <Switch>
      <Route path="/profile/change-password" exact component={ChangePassword} />
      <Route path="/profile/change-pin" exact component={ChangePin} />
      <Route path="/profile/devices" exact component={Devices} />
      <Route path="/mydevices" exact component={Devices} />
    </Switch>
  );

  render() {
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

ProfileLayout.propTypes = {
  getDevices: PropTypes.func,
};


export default ProfileLayout;
