import things from './things';
import leftPanel from './leftPanel';
import locationHistory from './locationHistory';
import login from './login';
import geofences from './geofences';
import notifications from './navBar';
import userData from './userData';
import agents from './agents';
import reminders from './reminders';
import trips from './trips';
import thingsActions from './thingsActions';
import menuPanel from './menuPanel';
import forgotPassword from './forgotPassword';
import registration from './registration';
import actionStatus from './actionStatus';
import tasks from './tasks';
import signals from './signals';
import cameras from './cameras';
import preferences from './preferences';
import sharedLocations from './sharedLocations';
import thirdPartyServices from './thirdPartyServices';
import homeControl from './homeControl';
import appStatus from './appStatus';
import account from './account';

const rootReducer = {
  things,
  leftPanel,
  locationHistory,
  geofences,
  login,
  notifications,
  userData,
  agents,
  trips,
  thingsActions,
  reminders,
  menuPanel,
  forgotPassword,
  registration,
  actionStatus,
  tasks,
  signals,
  cameras,
  preferences,
  sharedLocations,
  thirdPartyServices,
  homeControl,
  appStatus,
  account,
};

export default rootReducer;
