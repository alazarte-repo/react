/* eslint-env jasmine */

import { fromJS } from 'immutable';
import agentsReducer from './agents';
import {
  GET_AGENTS_SUCCESSFUL,
  ADD_AGENT_SUCCESS,
  DELETE_AGENT_SUCCESS,
  DELETE_AGENT_ERROR,
  ASSIGN_GEOFENCE_SUCCESS,
  UPDATE_AGENT_SUCCESS,
  ADD_AGENT_ERROR,
  ASSIGN_GEOFENCE,
  UPDATE_GEOFENCE_LOCATION,
  DEACTIVATE_GEOFENCE,
  ASSIGN_GEOFENCE_ERROR,
  DEACTIVATE_GEOFENCE_SUCCESS,
  UPDATE_GEOFENCE_LOCATION_ERROR,
  UPDATE_GEOFENCE_LOCATION_SUCCESS,
} from '../constants';


const GEOFENCE_ID = 'mrn:geofence:c00dfac6-ad64-48b6-ac56-e1e4bc940fe4';
const newGeofence = {
  marker: {
    type: 'Geofence',
    key: GEOFENCE_ID,
    position: {
      lat: -13.114877,
      lng: -5.458107850000033,
    },
  },
  coordinates: {
    lat: -13.114877,
    lng: -5.458107850000033,
  },
  radius: 1000,
  label: 'Test',
  radiusUnits: 'm',
};


describe('Agents reducer', () => {
  let state;

  beforeEach(() => {
    state = agentsReducer(undefined, {});
  });

  it('should initialize', () => {
    const expectedState = fromJS({
      assingGeofenceLoading: false,
      list: [],
    });

    const newState = agentsReducer(undefined, {});

    expect(newState).toEqual(expectedState);
  });

  it('should take the agents list', () => {
    const action = { type: GET_AGENTS_SUCCESSFUL, agentsData: [{ id: 1 }, { id: 2 }] };
    const newState = agentsReducer(state, action);
    const expectedState = fromJS({
      assingGeofenceLoading: false,
      list: [{ id: 1 }, { id: 2 }],
    });
    expect(newState).toEqual(expectedState);
  });

  it('should add an agent to list', () => {
    const action = { type: ADD_AGENT_SUCCESS, agent: { id: 'agent' } };
    const newState = agentsReducer(state, action);
    const expectedState = fromJS({
      assingGeofenceLoading: false,
      list: [{ id: 'agent' }],
    });
    expect(newState).toEqual(expectedState);
  });

  it('should take add an agent error', () => {
    const action = { type: ADD_AGENT_ERROR, agentsData: [] };
    const newState = agentsReducer(state, action);
    const expectedState = fromJS({
      assingGeofenceLoading: false,
      list: [],
    });
    expect(newState).toEqual(expectedState);
  });

  it('should delete an agent from list', () => {
    const action = { type: DELETE_AGENT_SUCCESS, agentId: 'agent' };
    const actualState = fromJS({ list: [{ id: 'agent' }] });
    const newState = agentsReducer(actualState, action);
    const expectedState = fromJS({ list: [] });
    expect(newState).toEqual(expectedState);
  });

  it('should take delete agent error ', () => {
    const action = { type: DELETE_AGENT_ERROR, agentsData: [] };
    const newState = agentsReducer(state, action);
    const expectedState = fromJS({
      assingGeofenceLoading: false,
      list: [],
    });
    expect(newState).toEqual(expectedState);
  });

  it('should add a new geofence', () => {
    const action = { type: ASSIGN_GEOFENCE_SUCCESS, newGeofence };

    const newState = agentsReducer(state, action);
    const expectedState = fromJS({
      assingGeofenceLoading: false,
      list: [newGeofence],
    });

    expect(newState).toEqual(expectedState);
  });

  it('should update a geofence', () => {
    const updatedGeofence = Object.assign({}, newGeofence);
    updatedGeofence.label = 'Updated Label';
    const action = {
      type: UPDATE_AGENT_SUCCESS,
      agentId: GEOFENCE_ID,
      updatedAgent: updatedGeofence,
    };
    const actualState = fromJS({
      assingGeofenceLoading: false,
      list: [newGeofence],
    });

    const newState = agentsReducer(actualState, action);
    const expectedState = fromJS({
      assingGeofenceLoading: false,
      list: [updatedGeofence],
    });

    expect(newState).toEqual(expectedState);
  });

  it('should set assingGeofenceLoading to true (ASSIGN_GEOFENCE)', () => {
    const action = { type: ASSIGN_GEOFENCE };
    const actualState = fromJS({
      assingGeofenceLoading: false,
      list: [{ id: 'agent' }],
    });
    const newState = agentsReducer(actualState, action);
    const expectedState = fromJS({
      assingGeofenceLoading: true,
      list: [{ id: 'agent' }],
    });
    expect(newState).toEqual(expectedState);
  });

  it('should set assingGeofenceLoading to true (UPDATE_GEOFENCE_LOCATION)', () => {
    const action = { type: UPDATE_GEOFENCE_LOCATION };
    const actualState = fromJS({
      assingGeofenceLoading: false,
      list: [{ id: 'agent' }],
    });
    const newState = agentsReducer(actualState, action);
    const expectedState = fromJS({
      assingGeofenceLoading: true,
      list: [{ id: 'agent' }],
    });
    expect(newState).toEqual(expectedState);
  });

  it('should set assingGeofenceLoading to true (DEACTIVATE_GEOFENCE)', () => {
    const action = { type: DEACTIVATE_GEOFENCE };
    const actualState = fromJS({
      assingGeofenceLoading: false,
      list: [{ id: 'agent' }],
    });
    const newState = agentsReducer(actualState, action);
    const expectedState = fromJS({
      assingGeofenceLoading: true,
      list: [{ id: 'agent' }],
    });
    expect(newState).toEqual(expectedState);
  });

  it('should set assingGeofenceLoading to false (ASSIGN_GEOFENCE_ERROR)', () => {
    const action = { type: ASSIGN_GEOFENCE_ERROR };
    const actualState = fromJS({
      assingGeofenceLoading: true,
      list: [{ id: 'agent' }],
    });
    const newState = agentsReducer(actualState, action);
    const expectedState = fromJS({
      assingGeofenceLoading: false,
      list: [{ id: 'agent' }],
    });
    expect(newState).toEqual(expectedState);
  });

  it('should set assingGeofenceLoading to false (DEACTIVATE_GEOFENCE_SUCCESS)', () => {
    const action = { type: DEACTIVATE_GEOFENCE_SUCCESS };
    const actualState = fromJS({
      assingGeofenceLoading: true,
      list: [{ id: 'agent' }],
    });
    const newState = agentsReducer(actualState, action);
    const expectedState = fromJS({
      assingGeofenceLoading: false,
      list: [{ id: 'agent' }],
    });
    expect(newState).toEqual(expectedState);
  });

  it('should set assingGeofenceLoading to false (UPDATE_GEOFENCE_LOCATION_ERROR)', () => {
    const action = { type: UPDATE_GEOFENCE_LOCATION_ERROR };
    const actualState = fromJS({
      assingGeofenceLoading: true,
      list: [{ id: 'agent' }],
    });
    const newState = agentsReducer(actualState, action);
    const expectedState = fromJS({
      assingGeofenceLoading: false,
      list: [{ id: 'agent' }],
    });
    expect(newState).toEqual(expectedState);
  });

  it('should set assingGeofenceLoading to false (UPDATE_GEOFENCE_LOCATION_SUCCESS)', () => {
    const action = { type: UPDATE_GEOFENCE_LOCATION_SUCCESS };
    const actualState = fromJS({
      assingGeofenceLoading: true,
      list: [{ id: 'agent' }],
    });
    const newState = agentsReducer(actualState, action);
    const expectedState = fromJS({
      assingGeofenceLoading: false,
      list: [{ id: 'agent' }],
    });
    expect(newState).toEqual(expectedState);
  });

  it('should ignore other actions', () => {
    const action = { type: 'NON_EXISTANT_ACTION' };

    const newState = agentsReducer(state, action);

    expect(newState).toBe(state);
  });
});
