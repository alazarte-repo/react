import AgentType from '../constants/agentType';
import {
  GET_AGENTS,
  GET_AGENTS_SUCCESSFUL,
  DELETE_AGENT,
  ASSIGN_GEOFENCE,
  UPDATE_GEOFENCE_LOCATION,
  CREATE_AGENT_SL,
  UPDATE_AGENT_SL,
  REMOVE_AGENT_SL,
  DEACTIVATE_GEOFENCE,
  SET_PARKING_MODE,
  UNSET_PARKING_MODE,
} from '../constants';

export const getAgents = () => ({
  type: GET_AGENTS,
});

export const getAgentsSuccessful = testAgentsData => ({
  type: GET_AGENTS_SUCCESSFUL,
  testAgentsData,
});

export const toggleParkingMode = (thingId, agentId) => {
  if (!agentId) return { type: SET_PARKING_MODE, agentType: AgentType.ParkingMode, thingId };
  return { type: UNSET_PARKING_MODE, thingId, agentId };
};

export const assignAgentGeofence = (thingId, geofences) => ({
  type: ASSIGN_GEOFENCE,
  thingId,
  geofences,
});

export const deactivateGeofence = (thingId, agentId) => ({
  type: DEACTIVATE_GEOFENCE,
  thingId,
  agentId,
});

export const updateGeofence = (agentId, geofenceId, geofenceLabel) => ({
  type: UPDATE_GEOFENCE_LOCATION,
  agentId,
  geofenceId,
  geofenceLabel,
});

export const createAgentSpeedLimit = (thingId, speedLimit) => ({
  type: CREATE_AGENT_SL,
  thingId,
  speedLimit,
});

export const updateSpeedLimitAgent = (thingId, agentId, speedLimit) => {
  if (!speedLimit) return { type: DELETE_AGENT, thingId, agentId };
  return ({
    type: UPDATE_AGENT_SL,
    agentId,
    speedLimit,
  });
};

export const removeAgentSeedLimit = agentId => ({
  type: REMOVE_AGENT_SL,
  agentId,
});

export default {
  getAgents,
  getAgentsSuccessful,
  toggleParkingMode,
};
