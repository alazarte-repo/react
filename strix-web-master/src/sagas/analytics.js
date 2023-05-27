import { takeEvery, all } from 'redux-saga/effects';
import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module';
import { recollectUserThingsData } from '../utils/analytics';
import AnalyticEvent, {
  AnalyticCategories,
  AnalyticVariable,
} from '../constants/analyticEvents';
import {
  LOGIN_SUCCESSFUL,
  ADD_REMINDERS_SUCCESSFUL,
  ANALYTICS_SEND_EVENT,
  HOME_CONTROL_SWITCH_SUCCESS,
  EDIT_ALARM_SUCCESS,
  CREATE_ALARM_SUCCESS,
  ADD_FAMILY_USER_SUCCESS,
  ADD_FAMILY_USER_ERROR,
  ALARM_ARM_SUCCESS,
  ALARM_DISARM_SUCCESS,
  ASSIGN_GEOFENCE_SUCCESS,
  DEACTIVATE_GEOFENCE_SUCCESS,
  CREATE_AGENT_SL_SUCCESS,
  REMOVE_AGENT_SL_SUCCESS,
  SET_PARKING_MODE_SUCCESS,
  UNSET_PARKING_MODE_SUCCESS,
} from '../constants';

/* Generic */
export function sendEvent({ action, category, label, value }) {
  // console.log(`Analytics: event arrived ${action}`);
  ReactGA.event({
    action,
    category,
    label,
    value,
  });
}

/* User */
export function login({ devicePayload }) {
  sendEvent({
    category: AnalyticCategories.User,
    action: AnalyticEvent.LOGIN,
    label: devicePayload.user_id,
  });
}

/* Vehicle */
export function addReminders() {
  sendEvent({
    category: AnalyticCategories.Vehicle,
    action: AnalyticEvent.VEHICLE_REMINDER_ADD,
  });
}

/* Home */
export function homeControlSwitch({ updatedThing }) {
  if (updatedThing.online) {
    sendEvent({
      category: AnalyticCategories.Home,
      action: updatedThing.on ? AnalyticEvent.LIGHT_TURN_ON : AnalyticEvent.LIGHT_TURN_OFF,
    });
  }
}

/* Family */
export function familyUserInvite() {
  sendEvent({
    category: AnalyticCategories.Family,
    action: AnalyticEvent.FAMILY_USER_INVITE,
  });
}

export function familyUserInviteFail() {
  sendEvent({
    category: AnalyticCategories.Family,
    action: AnalyticEvent.FAMILY_USER_INVITE_FAIL,
  });
}

/* Alarm */
export function alarmTaskSet() {
  sendEvent({
    category: AnalyticCategories.Alarm,
    action: AnalyticEvent.ALARM_TASK_SET,
  });
}

export function alarmArm() {
  sendEvent({
    category: AnalyticCategories.Alarm,
    action: AnalyticEvent.ALARM_ARM,
  });
}

export function alarmDisarm() {
  sendEvent({
    category: AnalyticCategories.Alarm,
    action: AnalyticEvent.ALARM_DISARM,
  });
}

/* Vehicle */
export function vehicleGeofenceOn() {
  sendEvent({
    category: AnalyticCategories.Vehicle,
    action: AnalyticEvent.VEHICLE_GEOFENCE_ON,
  });
}

export function vehicleGeofenceOff() {
  sendEvent({
    category: AnalyticCategories.Vehicle,
    action: AnalyticEvent.VEHICLE_GEOFENCE_OFF,
  });
}

export function vehicleSpeedLimitOn() {
  sendEvent({
    category: AnalyticCategories.Vehicle,
    action: AnalyticEvent.VEHICLE_SPEED_LIMIT_ON,
  });
}

export function vehicleSpeedLimitOff() {
  sendEvent({
    category: AnalyticCategories.Vehicle,
    action: AnalyticEvent.VEHICLE_SPEED_LIMIT_OFF,
  });
}

export function setParkingModeOn() {
  sendEvent({
    category: AnalyticCategories.Vehicle,
    action: AnalyticEvent.VEHICLE_PARKING_MODE_ON,
  });
}

export function setParkingModeOff() {
  sendEvent({
    category: AnalyticCategories.Vehicle,
    action: AnalyticEvent.VEHICLE_PARKING_MODE_OFF,
  });
}

// ==================================================
//                  User variables
// ==================================================

// User Data
export function setUserData(userData) {
  const _userData = {
    [AnalyticVariable.UserId]: userData.id,
    [AnalyticVariable.UserIdentificationNumber]: userData.identificationNumber,
    [AnalyticVariable.UserCountry]: userData.countryId,
    [AnalyticVariable.UserEmail]: userData.username,
  };
  ReactGA.set(_userData);
  TagManager.dataLayer({ dataLayer: _userData });
}

// Products
let alreadyProcessedThings = false;
export function setProductsUserProperties(things) {
  if (!alreadyProcessedThings) {
    const userThingsData = recollectUserThingsData(things);
    ReactGA.set(userThingsData);
    TagManager.dataLayer({ dataLayer: userThingsData });
    alreadyProcessedThings = true;
  }
}

export default function* rootAnalyticsSaga() {
  yield all([
    takeEvery(ANALYTICS_SEND_EVENT, sendEvent),
    takeEvery(LOGIN_SUCCESSFUL, login),
    takeEvery(ADD_REMINDERS_SUCCESSFUL, addReminders),
    takeEvery(HOME_CONTROL_SWITCH_SUCCESS, homeControlSwitch),
    takeEvery(EDIT_ALARM_SUCCESS, alarmTaskSet),
    takeEvery(CREATE_ALARM_SUCCESS, alarmTaskSet),
    takeEvery(ADD_FAMILY_USER_SUCCESS, familyUserInvite),
    takeEvery(ADD_FAMILY_USER_ERROR, familyUserInviteFail),
    takeEvery(ALARM_ARM_SUCCESS, alarmArm),
    takeEvery(ALARM_DISARM_SUCCESS, alarmDisarm),
    takeEvery(ASSIGN_GEOFENCE_SUCCESS, vehicleGeofenceOn),
    takeEvery(DEACTIVATE_GEOFENCE_SUCCESS, vehicleGeofenceOff),
    takeEvery(CREATE_AGENT_SL_SUCCESS, vehicleSpeedLimitOn),
    takeEvery(REMOVE_AGENT_SL_SUCCESS, vehicleSpeedLimitOff),
    takeEvery(SET_PARKING_MODE_SUCCESS, setParkingModeOn),
    takeEvery(UNSET_PARKING_MODE_SUCCESS, setParkingModeOff),
  ]);
}
