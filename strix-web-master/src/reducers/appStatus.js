import { fromJS } from 'immutable';
import {
  APP_IS_OFFLINE,
  APP_IS_ONLINE,
} from '../constants';

const initialState = fromJS({
  offline: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case APP_IS_OFFLINE:
      return state.set('offline', true);
    case APP_IS_ONLINE:
      return state.set('offline', false);
    default:
      return state;
  }
}
