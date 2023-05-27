import { all } from 'redux-saga/effects';
import rootLoginSaga from './login';
import rootNavBarSaga from './navBar';
import rootDevicesSaga from './devices';
import rootThingsSaga from './things';
import rootGeofencesSaga from './geofences';
import rootDelayedDispatcherSaga, { rootDispatcherSaga } from './delayedDispatcher';
import rootUserDataSaga from './userData';
import rootAgentsSaga from './agents';
import rootRemindersSaga from './reminders';
import rootTripsSaga from './trips';
import rootHomeAlarmActions from './homeAlarmActions';
import rootRefreshTokenSaga from './refreshToken';
import rootForgotPasswordSaga from './forgotPassword';
import rootRegistrationSaga from './registration';
import rootHomeAlarmSaga from './homeAlarms';
import rootHomeSagas from './homeSaga';
import fammilyAccRootSaga from './familyAcc';
import preferencesRootSaga from './preferences';
import rootFlexSaga from './flex';
import rootSharedLocations from './sharedLocations';
import rootThirdPartyServicesSaga from './thirdPartyServices';
import rootHomeControlSaga from './homeControl';
import rootAnalyticsSaga from './analytics';
import fuelCutRootSaga from './fuelCut';
import rootAccountSaga from './account';

export default function* rootSaga() {
  yield all([
    rootLoginSaga(),
    rootDevicesSaga(),
    rootRefreshTokenSaga(),
    rootNavBarSaga(),
    rootThingsSaga(),
    rootGeofencesSaga(),
    rootDelayedDispatcherSaga(),
    rootDispatcherSaga(),
    rootUserDataSaga(),
    rootAgentsSaga(),
    rootRemindersSaga(),
    rootTripsSaga(),
    rootHomeAlarmActions(),
    rootForgotPasswordSaga(),
    rootRegistrationSaga(),
    rootHomeAlarmSaga(),
    rootHomeSagas(),
    fammilyAccRootSaga(),
    preferencesRootSaga(),
    rootFlexSaga(),
    rootSharedLocations(),
    rootThirdPartyServicesSaga(),
    rootHomeControlSaga(),
    rootAnalyticsSaga(),
    fuelCutRootSaga(),
    rootAccountSaga(),
  ]);
}
