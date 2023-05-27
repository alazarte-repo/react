import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import MainLayout from '../MainLayout';
import { setUserData } from '../../sagas/analytics';
import TwoColumnsLayout from '../TwoColumnsLayout';
import CardsList from '../../containers/CardsList';
import SingleCard from '../../containers/SingleCard';
import ServiceAgendaLayout from '../ServiceAgendaLayout';
import AssignGeofence from '../../containers/AssignGeofence';
import MaxSpeedConfig from '../../containers/MaxSpeedConfig';
import AlarmConfig from '../../containers/AlarmConfig';
import NewGeofence from '../../containers/NewGeofence';
import { DefaultMap } from '../../containers/Maps';
import TripDetails from '../../containers/TripDetails';
import MotionSensor from '../../containers/MotionSensor';
import LocationDetails from '../../containers/LocationDetails';
import HomeControl from '../../containers/HomeControl';
import DashboardLink from '../../constants/dashboardLink';
import NoThingsScreen from '../../components/NoThingsScreen';

class DashboardLayout extends React.Component {
  componentWillMount() {
    this.props.updateThings();
    this.props.updateGeofences();
    this.props.getAgents();
    this.props.updateSharedLocations();
    this.props.startBackgroundSync();
  }


  componentWillReceiveProps(nextProps) {
    /* eslint-disable eqeqeq */
    if (nextProps.userData != this.props.userData && Object.keys(nextProps.userData).length > 0) {
      setUserData(nextProps.userData);
    }
  }

  get thereAreCards() {
    return (this.props.sharedLocations != null
      && this.props.sharedLocations.list != null
      && this.props.sharedLocations.list.length > 0)
    || this.props.things.length > 0;
  }

  leftPanel = () => (
    <Switch>
      <Route path="/dashboard" exact component={CardsList} />
      <Route path="/dashboard/things/:thingId" component={SingleCard} />
    </Switch>
  );

  rightPanel = () => (
    <Switch>
      <Route path="/dashboard" exact component={DefaultMap} />
      <Route path="/dashboard/things/:thingId" exact component={DefaultMap} />
      <Route path="/dashboard/things/:thingId/assign-geofence" exact component={AssignGeofence} />
      <Route path="/dashboard/things/:thingId/velocity" exact component={MaxSpeedConfig} />
      <Route path="/dashboard/things/:thingId/services" component={ServiceAgendaLayout} />
      <Route path="/dashboard/things/:thingId/alarms" component={AlarmConfig} />
      <Route path={DashboardLink.homeControlTemplate} component={HomeControl} />
      <Route path="/dashboard/things/:thingId/newgeofence" component={NewGeofence} />
      <Route path="/dashboard/things/:thingId/trips/:tripId" component={TripDetails} />
      <Route path="/dashboard/things/:thingId/motion-sensor" component={MotionSensor} />
      <Route path="/dashboard/things/:thingId/locations/:date" component={LocationDetails} />
    </Switch>
  );

  render() {
    if (!this.thereAreCards && (!this.props.firstLoad || !this.props.isLoading)) {
      return (
        <MainLayout>
          <NoThingsScreen />
        </MainLayout>
      );
    }
    return (
      <MainLayout>
        <TwoColumnsLayout
          isLoading={this.props.firstLoad && this.props.isLoading}
          leftPanel={this.leftPanel}
          rightPanel={this.rightPanel}
        />
      </MainLayout>
    );
  }
}

DashboardLayout.propTypes = {
  updateThings: PropTypes.func,
  updateGeofences: PropTypes.func,
  getAgents: PropTypes.func,
  updateSharedLocations: PropTypes.func,
  startBackgroundSync: PropTypes.func,
  userData: PropTypes.object,
  things: PropTypes.array,
  sharedLocations: PropTypes.object,
  firstLoad: PropTypes.bool,
  isLoading: PropTypes.bool,
};


export default DashboardLayout;
