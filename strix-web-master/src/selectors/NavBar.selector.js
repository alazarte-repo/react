import { createSelector } from 'reselect';
/* Notifications Selector */
const getNotifications = state => state.get('notifications');
export const getNotificationList = createSelector(
  getNotifications,
  notifications => notifications.get('list'),
);
const getLogin = state => state.get('login');
export const isLogged = createSelector(
  getLogin,
  login => login.get('loggedIn'),
);
const getThings = state => state.get('things');
export const thingsList = createSelector(
  getThings,
  things => things.get('list'),
);
/* UserData Selector */
const firstName = state => state.getIn(['userData', 'user', 'firstName']);
const lastName = state => state.getIn(['userData', 'user', 'lastName']);
const userData = state => state.get('userData');
export const getUser = createSelector(
  userData,
  data => data.get('user'),
);

export const getUsers = createSelector(
  userData,
  data => data.get('users'),
);

export const getFullName = createSelector(
  firstName,
  lastName,
  (fName, lName) => {
    if (fName) return (`${fName} ${lName}`);
    return ('');
  },
);
