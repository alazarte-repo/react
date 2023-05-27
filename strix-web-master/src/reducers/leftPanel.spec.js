/* eslint-env jasmine */

import { fromJS } from 'immutable';
import { SELECT_CARD, EXPAND_CARD } from '../constants';
import leftPanelReducer from './leftPanel';

const DEFAULT_LOADING_MESSAGE = 'Cargando...';

describe('leftPanel reducer', () => {
  it('should select card', () => {
    const action = { type: SELECT_CARD, id: 'someId' };
    const newState = leftPanelReducer(undefined, action);
    const expectedState = fromJS({
      selectedCardId: 'someId',
      expandedCardId: '-1',
      showAllGeofences: false,
      highlightedGeofences: '',
      selectedServiceNotification: false,
      showThingConfig: '',
      renderRightPanel: '',
      loading: false,
      loadingMessage: DEFAULT_LOADING_MESSAGE,
    });
    expect(newState).toEqual(expectedState);
  });

  describe('expand card', () => {
    it('should set expanded card to given id', () => {
      const action = { type: EXPAND_CARD, id: 'someId' };
      const newState = leftPanelReducer(undefined, action);
      const expectedState = fromJS({
        selectedCardId: '-1',
        expandedCardId: 'someId',
        showAllGeofences: false,
        highlightedGeofences: '',
        selectedServiceNotification: false,
        showThingConfig: '',
        renderRightPanel: '',
        loading: false,
        loadingMessage: DEFAULT_LOADING_MESSAGE,
      });
      expect(newState).toEqual(expectedState);
    });

    it('should set expanded card to -1 if given id is the same as already expanded', () => {
      const action = { type: EXPAND_CARD, id: 'someId' };
      const actualState = fromJS({ selectedCardId: '-1', expandedCardId: 'someId' });
      const newState = leftPanelReducer(actualState, action);
      const expectedState = fromJS({ selectedCardId: '-1', expandedCardId: '-1' });
      expect(newState).toEqual(expectedState);
    });
  });
});
