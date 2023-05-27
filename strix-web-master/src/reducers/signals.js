import { fromJS } from 'immutable';
import { GET_SIGNALS_SUCCESS } from '../constants';

const initialState = fromJS({
  list: [],
});

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SIGNALS_SUCCESS:
      return state.set('list', fromJS(action.signals));
    default:
      return state;
  }
}
