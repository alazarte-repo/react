/* eslint-disable max-len */
import { fromJS, Map } from 'immutable';
import HomeControlStatus from '../constants/homeControlStatus';
import {
  HOME_CONTROL_SWITCH,
  HOME_CONTROL_SWITCH_SUCCESS,
  HOME_CONTROL_SWITCH_ERROR,
  HOME_CONTROL_SET_FIRSTLOAD,
  UPDATE_HOME_CONTROL_THINGS,
  UPDATE_HOME_CONTROL_THINGS_SUCCESS,
} from '../constants';

const initialState = fromJS({
  things: new Map(),
  firstLoad: true,
});

function getHomeControlPlaceholder(homeControlId, parentId) {
  return {
    label: 'Cargando...',
    type: null,
    id: homeControlId,
    parent_id: parentId,
    online: HomeControlStatus.Loading,
    on: false,
    switching: false,
  };
}

function updateHomeControlThings(state, things) {
  if (state.get('firstLoad') && things.length > 0) {
    const thingsPlaceholders = {};
    for (let i = 0; i < things.length; i += 1) {
      const parentId = things[i].parent_id;
      thingsPlaceholders[parentId] = things[i].thingIds.map(h => getHomeControlPlaceholder(h, parentId));
    }
    return state.set('things', fromJS(thingsPlaceholders));
  }
  return state;
}

function updateHomeControlThingsSuccess(state, homeControls) {
  let newState = state.set('things', fromJS(homeControls));
  newState = newState.set('firstLoad', false);
  return newState;
}

function homeControlSwitchSuccess(state, thingId, parentId, updatedThing) {
  const parentChildren = state.getIn(['things', parentId]);
  const childIndex = parentChildren.findIndex(x => x.get('id') === thingId);
  return state.setIn(['things', parentId, childIndex], fromJS(updatedThing));
}

function homeControlSwitch(state, thingId, parentId) {
  const parentChildren = state.getIn(['things', parentId]);
  const childIndex = parentChildren.findIndex(x => x.get('id') === thingId);
  return state.setIn(['things', parentId, childIndex, 'switching'], true);
}

function homeControlError(state, thingId, parentId) {
  const parentChildren = state.getIn(['things', parentId]);
  const childIndex = parentChildren.findIndex(x => x.get('id') === thingId);
  return state.setIn(['things', parentId, childIndex, 'switching'], false);
}

export default function (state = initialState, action) {
  switch (action.type) {
    case HOME_CONTROL_SWITCH:
      return homeControlSwitch(state, action.thingId, action.parentId);
    case HOME_CONTROL_SWITCH_SUCCESS:
      return homeControlSwitchSuccess(state, action.thingId, action.parentId, action.updatedThing);
    case HOME_CONTROL_SWITCH_ERROR:
      return homeControlError(state, action.thingId, action.parentId);
    case UPDATE_HOME_CONTROL_THINGS:
      return updateHomeControlThings(state, action.things);
    case UPDATE_HOME_CONTROL_THINGS_SUCCESS:
      return updateHomeControlThingsSuccess(state, action.homeControls);
    case HOME_CONTROL_SET_FIRSTLOAD:
      return state.set('firstLoad', true);
    default:
      return state;
  }
}
