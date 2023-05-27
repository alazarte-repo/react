/* eslint-env jasmine */

import { fromJS, is } from 'immutable';
import menuPanelReducer from './menuPanel';
import {
  SHOW_CONFIGURATION_PANEL,
  SHOW_SERVICE_PANEL,
  SHOW_PROFILE_PANEL,
} from '../constants';

describe('forgotPassword reducer', () => {
  let state;

  beforeEach(() => {
    state = menuPanelReducer(undefined, {});
  });


  it('should initialize', () => {
    const expectedState = fromJS({
      showingPanel: 'servicePanel',
    });

    const newState = menuPanelReducer(undefined, {});

    expect(is(newState, expectedState)).toEqual(true);
  });

  it('should show service panel', () => {
    const action = { type: SHOW_SERVICE_PANEL };

    const newState = menuPanelReducer(state, action);

    expect(newState.get('showingPanel')).toEqual('servicePanel');
  });

  it('should show configuration panel', () => {
    const action = { type: SHOW_CONFIGURATION_PANEL };

    const newState = menuPanelReducer(state, action);

    expect(newState.get('showingPanel')).toEqual('configurationPanel');
  });

  it('should show profile panel', () => {
    const action = { type: SHOW_PROFILE_PANEL };

    const newState = menuPanelReducer(state, action);

    expect(newState.get('showingPanel')).toEqual('profilePanel');
  });

  it('should ignore other actions', () => {
    const action = { type: 'NON_EXISTANT_ACTION' };

    const newState = menuPanelReducer(state, action);

    expect(is(newState, state)).toBe(true);
  });
});
