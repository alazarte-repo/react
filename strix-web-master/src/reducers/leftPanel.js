import { Map } from 'immutable';
import {
  SELECT_CARD,
  EXPAND_CARD,
  SELECT_SERVICE_NOTIFICATION,
  SHOW_ALL_GEOFENCES,
  SHOW_THING_CONFIGURATION,
  SHOW_GEOFENCE_CONFIGURATION,
  SHOW_SERVICE_PANEL,
  SELECT_TRIP_DETAILS,
  LEFT_PANEL_SET_LOADING,
  LEFT_PANEL_UNSET_LOADING,
} from '../constants';

const DEFAULT_LOADING_MESSAGE = 'Cargando...';

const initialState = new Map({
  selectedCardId: '-1',
  expandedCardId: '-1',
  showAllGeofences: false,
  highlightedGeofences: '',
  selectedServiceNotification: false,
  showThingConfig: '',
  renderRightPanel: '',
  loading: false,
  loadingMessage: 'Cargando...',
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_CARD:
      return state.set('selectedCardId', action.id);
    case SELECT_SERVICE_NOTIFICATION: {
      return state.update('selectedServiceNotification', v => !v)
        .update('renderRightPanel', v => (v === 'notificationService' ? '' : 'notificationService'));
    }
    case EXPAND_CARD:
      if (state.get('selectedServiceNotification')) {
        return state.set('selectedServiceNotification', false).set('expandedCardId', '-1');
      }
      return state.update('expandedCardId', v => (v === action.id ? '-1' : action.id));
    case SHOW_ALL_GEOFENCES:
      if (!state.get('showAllGeofences')) {
        return state.set('showAllGeofences', true)
          .set('highlightedGeofences', action.id);
      }
      if (state.get('highlightedGeofences') !== action.id) {
        return state.update('highlightedGeofences', () => action.id);
      }
      return state.set('showAllGeofences', false).set('highlightedGeofences', '');
    case SHOW_THING_CONFIGURATION:
      if (!state.get('showThingConfig')) {
        return state.set('showThingConfig', action.id)
          .update('renderRightPanel', () => 'thingConfig');
      }
      if (state.get('showThingConfig') !== action.id) {
        return state.update('showThingConfig', () => action.id);
      }
      return state.set('showThingConfig', '')
        .set('renderRightPanel', '');
    case SHOW_GEOFENCE_CONFIGURATION:
      if (state.get('showThingConfig') !== action.id) {
        return state.update('showThingConfig', () => action.id);
      }
      return state.set('showThingConfig', '');
    case SELECT_TRIP_DETAILS:
      return state.update('renderRightPanel', v =>
        (v === 'tripDetails' ? '' : 'tripDetails'),
      );
    case SHOW_SERVICE_PANEL:
      return state.update('selectedCardId', () => '-1');
    case LEFT_PANEL_SET_LOADING:
      return state.set('loading', true)
        .set('loadingMessage', action.message || DEFAULT_LOADING_MESSAGE);
    case LEFT_PANEL_UNSET_LOADING:
      return state.set('loading', false)
        .set('loadingMessage', DEFAULT_LOADING_MESSAGE);
    default:
      return state;
  }
}
