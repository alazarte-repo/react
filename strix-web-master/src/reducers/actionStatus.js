import { fromJS } from 'immutable';
import { ERROR, SUCCESS, RESET_ACTION_STATUS } from '../constants';

const initialState = fromJS({
  error: {
    status: false,
    message: '',
  },
  success: {
    status: false,
    message: '',
  },
});

export default function (state = initialState, action) {
  switch (action.type) {
    case ERROR:
      return state.set('error', fromJS(action.state));
    case SUCCESS:
      return state.set('success', fromJS(action.state));
    case RESET_ACTION_STATUS:
      return initialState;
    default:
      return state;
  }
}
