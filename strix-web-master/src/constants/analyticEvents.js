const AnalyticEvent = Object.freeze({
  /* User */
  LOGIN: 'LOGIN',
  LOGIN_SHOWN: 'LOGIN_SHOWN',

  /* Vehicle */
  VEHICLE_REMINDER_ADD: 'VEHICLE_REMINDER_ADD',
  VEHICLE_TRIP_VIEW: 'VEHICLE_TRIP_VIEW',
  VEHICLE_GEOFENCE_ON: 'VEHICLE_GEOFENCE_ON',
  VEHICLE_GEOFENCE_OFF: 'VEHICLE_GEOFENCE_OFF',
  VEHICLE_SPEED_LIMIT_ON: 'VEHICLE_SPEED_LIMIT_ON',
  VEHICLE_SPEED_LIMIT_OFF: 'VEHICLE_SPEED_LIMIT_OFF',
  VEHICLE_PARKING_MODE_ON: 'VEHICLE_PARKING_MODE_ON',
  VEHICLE_PARKING_MODE_OFF: 'VEHICLE_PARKING_MODE_OFF',

  /* Alarm */
  ALARM_ARM: 'ALARM_ARM',
  ALARM_DISARM: 'ALARM_DISARM',
  ALARM_TASK_SET: 'ALARM_TASK_SET',
  CAMERA_STREAM_VIEW: 'CAMERA_STREAM_VIEW',

  /* Family */
  FAMILY_USER_INVITE: 'FAMILY_USER_INVITE',
  FAMILY_USER_INVITE_FAIL: 'FAMILY_USER_INVITE_FAIL',

  /* View */
  LOYALITY_VIEW: 'LOYALITY_VIEW',

  /* Home */
  LIGHT_TURN_ON: 'LIGHT_TURN_ON',
  LIGHT_TURN_OFF: 'LIGHT_TURN_OFF',
});

export const AnalyticCategories = Object.freeze({
  User: 'User',
  Vehicle: 'Vehicle',
  Alarm: 'Alarm',
  Family: 'Family',
  View: 'View',
  Home: 'Home',
});

export const AnalyticVariable = Object.freeze({
  /* User Data */
  UserId: 'userId',
  UserIdentificationNumber: 'DNI',
  UserCountry: 'country',
  UserEmail: 'email',

  /* Products */
  HasHome: 'has_home',
  HasCar: 'has_car',
  HasFlex: 'has_flex',
  HasCamera: 'has_camera',
  HasLight: 'has_light',
  Products: 'products',
});

export default AnalyticEvent;
