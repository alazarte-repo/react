import { fromJS } from 'immutable';
import {
  GET_ALARMS_SUCCESS,
  CREATE_ALARM_SUCCESS,
  DELETE_ALARM_SUCCESS,
  EDIT_ALARM_SUCCESS,
} from '../constants';

const initialState = fromJS({
  list: [],
});

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALARMS_SUCCESS:
      return state.set('list', fromJS(action.list));
    case CREATE_ALARM_SUCCESS:
      return state.update('list', list => list.push(fromJS(action.alarm)));
    case DELETE_ALARM_SUCCESS:
      return state.update('list', list =>
        list.filter(alarm => alarm.get('id') !== action.id),
      );
    case EDIT_ALARM_SUCCESS:
      return state.update('list', (list) => {
        const index = list.findIndex(
          alarm => alarm.get('id') === action.alarm.id,
        );
        return list.set(index, fromJS(action.alarm));
      });
    default:
      return state;
  }
}
