import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const getThings = state => state.get('things');

export const getSharedLocationCard = createSelector(
  state => state.get('sharedLocations'),
  state => state.getIn(['userData', 'user', 'id']),
  (sharedLocations, id) => {
    const filteredList = sharedLocations.get('list').filter(member => member.get('user_id') !== id);
    return sharedLocations.set('id', id).set('list', filteredList);
  },
);
export const getFamilyMembers = createSelector(
  state => state.getIn(['userData', 'users']),
  members => members,
);
export const getThingsList = createSelector(
  getThings,
  things => things.get('list'),
);
const getLeftPanel = state => state.get('leftPanel');
export const getSelectedCardId = createSelector(
  getLeftPanel,
  leftPanel => leftPanel.get('selectedCardId'),
);
export const getExpandedCardId = createSelector(
  getLeftPanel,
  leftPanel => leftPanel.get('expandedCardId'),
);
const getAgents = state => state.get('agents');
export const getAgentsList = createSelector(
  getAgents,
  agents => agents.get('list'),
);
export const getThingAgents = createSelector(
  getAgentsList,
  agents => memoize(thingId => agents.filter(agent => agent.get('thing_id') === thingId)),
);
export const isLoading = createSelector(
  getThings,
  things => things.get('isLoading'),
);
const getMenuPanelState = state => state.get('menuPanel');
export const leftPanelRender = createSelector(
  getMenuPanelState,
  menuPanel => menuPanel.get('showingPanel'),
);
export const getThingConfig = createSelector(
  getLeftPanel,
  leftPanel => leftPanel.get('showThingConfig'),
);
export const getAgentGeofence = createSelector(
  getAgentsList,
  agents => agents.filter(agent => agent.get('type') === 'mrn:agent_type:geofence'),
);
export const getRefreshingTokenState = state => state.getIn(['login', 'isRefreshing']);
