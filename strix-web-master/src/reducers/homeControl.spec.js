/* eslint-env jasmine */

import { fromJS, is } from 'immutable';
import homeControlReducer from './homeControl';
import {
  HOME_CONTROL_SWITCH,
  HOME_CONTROL_SWITCH_SUCCESS,
  UPDATE_HOME_CONTROL_THINGS,
  UPDATE_HOME_CONTROL_THINGS_SUCCESS,
  HOME_CONTROL_SET_FIRSTLOAD,
  HOME_CONTROL_SWITCH_ERROR,
} from '../constants';

const homeControlsMock = {
  'mrn:thing:home:45647291-8e55-4930-9572-c1d736f4a6e0': [
    {
      label: 'Mocked Light 1',
      type: 'mrn:things:light',
      id: 'mrn:thing:light:8dd42c92-55d4-4e47-bc78-e77ab39a585a',
      parent_id: 'mrn:thing:home:45647291-8e55-4930-9572-c1d736f4a6e0',
      online: 'online',
      on: false,
      switching: false,
    },
    {
      label: 'Mocked SmartSocket 1',
      type: 'mrn:things:smart_socket',
      id: 'mrn:thing:smart_socket:d33cee96-4b40-405e-a553-cadaa68ed043',
      parent_id: 'mrn:thing:home:45647291-8e55-4930-9572-c1d736f4a6e0',
      online: 'online',
      on: true,
      switching: false,
    },
  ],
  'mrn:thing:home:0e3347aa-df22-4a9b-87fc-0cf67757793e': [
    {
      label: 'Mocked SmartSocket 1',
      type: 'mrn:things:smart_socket',
      id: 'mrn:thing:smart_socket:d6467981-2a7f-44cb-adf5-7d701de11f3f',
      parent_id: 'mrn:thing:home:0e3347aa-df22-4a9b-87fc-0cf67757793e',
      online: 'offline',
      on: false,
      switching: false,
    },
    {
      label: 'Mocked Light 2',
      type: 'mrn:things:light',
      id: 'mrn:thing:light:475f9034-953e-493a-bdf0-444cfca65fbc',
      parent_id: 'mrn:thing:home:0e3347aa-df22-4a9b-87fc-0cf67757793e',
      online: 'online',
      on: false,
      switching: false,
    },
  ],
};

const newThingsMock = [
  {
    parent_id: 'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2',
    thingIds: [
      'mrn:thing:light:75aaeebf-8f74-4fc5-b8e8-d99b3623aa72',
      'mrn:thing:light:46094c8d-a850-4c92-b8ec-e25906c7c79c',
      'mrn:thing:smart_socket:1167d76c-9325-45f7-9c7a-1129bcbba5fd',
      'mrn:thing:smart_socket:9953d2ac-37e3-4f43-bda5-d0c902fbefdc',
    ],
  },
];

const newThingsPlaceholdersMock = {
  'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2': [
    {
      label: 'Cargando...',
      type: null,
      id: 'mrn:thing:light:75aaeebf-8f74-4fc5-b8e8-d99b3623aa72',
      parent_id: 'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2',
      online: 'loading',
      on: false,
      switching: false,
    },
    {
      label: 'Cargando...',
      type: null,
      id: 'mrn:thing:light:46094c8d-a850-4c92-b8ec-e25906c7c79c',
      parent_id: 'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2',
      online: 'loading',
      on: false,
      switching: false,
    },
    {
      label: 'Cargando...',
      type: null,
      id: 'mrn:thing:smart_socket:1167d76c-9325-45f7-9c7a-1129bcbba5fd',
      parent_id: 'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2',
      online: 'loading',
      on: false,
      switching: false,
    },
    {
      label: 'Cargando...',
      type: null,
      id: 'mrn:thing:smart_socket:9953d2ac-37e3-4f43-bda5-d0c902fbefdc',
      parent_id: 'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2',
      online: 'loading',
      on: false,
      switching: false,
    },
  ],
};


describe('Home control reducer', () => {
  let state;

  beforeEach(() => {
    const action = { type: UPDATE_HOME_CONTROL_THINGS_SUCCESS, homeControls: homeControlsMock };
    state = homeControlReducer(undefined, action);
  });

  it('should return the initial state', () => {
    expect(is(homeControlReducer(undefined, {}), fromJS(
      {
        things: {},
        firstLoad: true,
      },
    ))).toEqual(true);
  });

  it('should load placeholders for loading new controls', () => {
    const action = { type: UPDATE_HOME_CONTROL_THINGS, things: newThingsMock };

    const newState = homeControlReducer(undefined, action);

    expect(is(newState.get('things'), fromJS(newThingsPlaceholdersMock))).toBe(true);
  });

  it('should ignore placeholders if its not the first load', () => {
    const action = { type: UPDATE_HOME_CONTROL_THINGS, things: newThingsMock };

    const newState = homeControlReducer(state, action);

    expect(newState).toBe(state);
  });

  it('should load new controls', () => {
    const action = { type: UPDATE_HOME_CONTROL_THINGS_SUCCESS, homeControls: homeControlsMock };
    const newState = homeControlReducer(undefined, action);
    const expectedState = fromJS({
      things: homeControlsMock,
      firstLoad: false,
    });
    expect(newState).toEqual(expectedState);
  });

  it('should be set switching to true', () => {
    const parentId = 'mrn:thing:home:45647291-8e55-4930-9572-c1d736f4a6e0';
    const thingId = 'mrn:thing:smart_socket:d33cee96-4b40-405e-a553-cadaa68ed043';
    const action = { type: HOME_CONTROL_SWITCH, thingId, parentId };

    const newState = homeControlReducer(state, action);

    const parentChildren = newState.getIn(['things', parentId]);
    const childIndex = parentChildren.findIndex(x => x.get('id') === thingId);
    expect(newState.getIn(['things', parentId, childIndex, 'switching'])).toEqual(true);
  });

  it('should set the new state on the control', () => {
    const parentId = 'mrn:thing:home:45647291-8e55-4930-9572-c1d736f4a6e0';
    const thingId = 'mrn:thing:smart_socket:d33cee96-4b40-405e-a553-cadaa68ed043';
    const newHomeControlState = {
      label: 'Mocked SmartSocket 1',
      type: 'mrn:things:smart_socket',
      id: 'mrn:thing:smart_socket:d33cee96-4b40-405e-a553-cadaa68ed043',
      parent_id: 'mrn:thing:home:45647291-8e55-4930-9572-c1d736f4a6e0',
      online: 'online',
      on: true,
      switching: false,
    };
    const action = {
      type: HOME_CONTROL_SWITCH_SUCCESS,
      parentId,
      thingId,
      updatedThing: newHomeControlState,
    };

    const newState = homeControlReducer(state, action);

    const parentChildren = newState.getIn(['things', parentId]);
    const childIndex = parentChildren.findIndex(x => x.get('id') === thingId);
    expect(is(newState.getIn(['things', parentId, childIndex]), fromJS(newHomeControlState))).toEqual(true);
  });

  it('should set first load true', () => {
    const action = { type: HOME_CONTROL_SET_FIRSTLOAD };

    const newState = homeControlReducer(state, action);

    expect(newState.get('firstLoad')).toBe(true);
  });

  it('should ignore other actions', () => {
    const action = { type: 'NON_EXISTANT_ACTION' };

    const newState = homeControlReducer(state, action);

    expect(is(newState, state)).toBe(true);
  });

  it('should set switching to false if an error corrus', () => {
    const parentId = 'mrn:thing:home:45647291-8e55-4930-9572-c1d736f4a6e0';
    const thingId = 'mrn:thing:smart_socket:d33cee96-4b40-405e-a553-cadaa68ed043';
    const prevAction = { type: HOME_CONTROL_SWITCH, thingId, parentId };
    const actualState = homeControlReducer(state, prevAction);
    const action = { type: HOME_CONTROL_SWITCH_ERROR, thingId, parentId };

    const newState = homeControlReducer(actualState, action);

    const parentChildren = actualState.getIn(['things', parentId]);
    const childIndex = parentChildren.findIndex(x => x.get('id') === thingId);
    expect(newState.getIn(['things', parentId, childIndex, 'switching'])).toEqual(false);
  });
});
