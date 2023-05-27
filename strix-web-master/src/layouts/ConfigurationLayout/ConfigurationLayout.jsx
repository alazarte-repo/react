import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import ConfigurationPanel from '../../containers/ConfigurationPanel';
import ThingConfigurationPanel from '../../containers/ThingConfigurationPanel';
import AssignGeofence from '../../containers/AssignGeofence';
import GeofenceSettings from '../../containers/GeofenceSettings';
import NewGeofence from '../../containers/NewGeofence';
import ServiceAgendaLayout from '../ServiceAgendaLayout';
import AlarmConfig from '../../containers/AlarmConfig';
import NotificationConfig from '../../containers/NotificationConfig';
import MaxSpeedConfig from '../../containers/MaxSpeedConfig';
import FamilyAccountConfig from '../../containers/FamilyAccountConfig';
import AddFamilyAcc from '../../containers/AddFamilyAcc';
import ModifyFamilyAcc from '../../containers/ModifyFamilyAcc';
import ListCamerasConfiguration from '../../containers/ListCamerasConfiguration';
import ConfigurationCamera from '../../containers/CameraConfig';
import HomeControlConfig from '../../containers/HomeControlConfig';
import MainLayout from '../MainLayout';
import TwoColumnsLayout from '../TwoColumnsLayout';
import ConfigurationLink from '../../constants/configurationLink';


class ConfigurationLayout extends React.Component {
  componentWillMount() {
    this.props.updateThings();
    this.props.updateGeofences();
    this.props.getAgents();
  }

  leftPanel= () => (
    <Switch>
      <Route path="/configuration" component={ConfigurationPanel} />
    </Switch>
  );

  rightPanel= () => (
    <Switch>
      <Route path="/configuration/things/:thingId" exact component={ThingConfigurationPanel} />
      <Route path="/configuration/things/:thingId/assign-geofence" component={AssignGeofence} />
      <Route path="/configuration/things/:thingId/services" component={ServiceAgendaLayout} />
      <Route path="/configuration/things/:thingId/alarms" component={AlarmConfig} />
      <Route path="/configuration/notifications/:thingId" component={NotificationConfig} />
      <Route path="/configuration/camera/:thingId" exact component={ListCamerasConfiguration} />
      <Route path="/configuration/camera/:thingId/:cameraId" component={ConfigurationCamera} />
      <Route path="/configuration/speed/:thingId" component={MaxSpeedConfig} />
      <Route path="/configuration/geofences-config" exact component={GeofenceSettings} />
      <Route path="/configuration/geofences-config/newgeofence" exact component={NewGeofence} />
      <Route path="/configuration/things/:thingId/newgeofence" component={NewGeofence} />
      <Route path="/configuration/family-account" exact component={FamilyAccountConfig} />
      <Route path="/configuration/family-account/add" exact component={AddFamilyAcc} />
      <Route path="/configuration/family-account/modify/:familyMemberId" exact component={ModifyFamilyAcc} />
      <Route path={ConfigurationLink.homeControlTemplate} exact component={HomeControlConfig} />
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

ConfigurationLayout.propTypes = {
  updateThings: PropTypes.func,
  updateGeofences: PropTypes.func,
  getAgents: PropTypes.func,
};


export default ConfigurationLayout;
