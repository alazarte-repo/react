import { fromJS } from 'immutable';
import {
  SHOW_CONFIGURATION_PANEL,
  SHOW_SERVICE_PANEL,
  SHOW_PROFILE_PANEL,
} from '../constants';

const initialState = fromJS({
  showingPanel: 'servicePanel',
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_SERVICE_PANEL:
      return state.update('showingPanel', () => 'servicePanel');
    case SHOW_CONFIGURATION_PANEL:
      return state.update('showingPanel', () => 'configurationPanel');
    case SHOW_PROFILE_PANEL:
      return state.update('showingPanel', () => 'profilePanel');
    default:
      return state;
  }
}
