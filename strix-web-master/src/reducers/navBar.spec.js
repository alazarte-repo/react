/* eslint-env jasmine */

import { fromJS } from 'immutable';
import notificationsReducer from './navBar';
import { GET_NOTIFICATIONS_SUCCESSFUL } from '../constants';

describe('Notifications reducer', () => {
  it('should update the notifications list', () => {
    const action = { type: GET_NOTIFICATIONS_SUCCESSFUL, newNotifications: [{ id: 1 }] };
    const newState = notificationsReducer(undefined, action);
    const expectedState = fromJS({
      list: [],
      unreadList: [],
      unreadNumber: 0,
      notificationModalIsOpened: false,
      notificationScreenIsOpened: false,
      loading: false,
      page: 2,
    });
    expect(newState).toEqual(expectedState);
  });
});
