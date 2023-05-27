import { fromJS } from 'immutable';
import {
  UPDATE_THINGS,
  UPDATE_THINGS_SUCCESSFUL,
  REFRESH_THING_SUCCESS,
} from '../constants';

const initialState = fromJS({
  firstLoad: true,
  isLoading: true,
  list: [],
});

function updateThings(state, mappedThings) {
  let newState = state.set('isLoading', false);
  newState = newState.set('firstLoad', false);
  newState = newState.set('list', fromJS(mappedThings));
  return newState;
}

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_THINGS:
      return state.set('isLoading', !state.get('list').size);
    case UPDATE_THINGS_SUCCESSFUL:
      return updateThings(state, action.mappedThings);
    case REFRESH_THING_SUCCESS:
      return state.update('list', list =>
        list.set(
          list.findIndex(v => v.get('id') === action.mappedThing.id),
          fromJS(action.mappedThing),
        ),
      );
    default:
      return state;
  }
}
