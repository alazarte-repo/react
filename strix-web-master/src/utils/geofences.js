/* eslint-disable no-restricted-syntax */
import { List, Map } from 'immutable';
import AgentType from '../constants/agentType';


export function buildGeofences(geofences, agents) {
  return geofences.map((geofence) => {
    const thingId = agents.find((agent) => {
      if (agent.getIn(['configuration', 'geofences'])) {
        return agent.getIn(['configuration', 'geofences']).first() === geofence.get('id');
      }
      return null;
    });

    return {
      marker: {
        type: 'Geofence',
        key: geofence.get('id'),
        position: {
          lat: geofence.getIn(['data', 'geometry', 'coordinates']).first(),
          lng: geofence.getIn(['data', 'geometry', 'coordinates']).last(),
        },
      },
      coordinates: {
        lat: geofence.getIn(['data', 'geometry', 'coordinates']).first(),
        lng: geofence.getIn(['data', 'geometry', 'coordinates']).last(),
      },
      thingId: thingId && thingId.get('thing_id'),
      radius: geofence.getIn(['data', 'geometry', 'radius']),
      label: geofence.getIn(['data', 'properties', 'name']),
      radiusUnits: geofence.getIn(['data', 'properties', 'radius_units']),
      id: geofence.get('id'),
    };
  });
}


export function returnGeofences(cardId, agents) {
  const agentGeofence = agents.filter(agent =>
    agent.get('thing_id') === cardId && agent.get('type') === AgentType.Geofence,
  );
  if (agentGeofence.size > 0) {
    return agentGeofence
      .reduce((list, agent) =>
        list.concat(agent.getIn(['configuration', 'geofences'])), new List(),
      );
  }
  return null;
}

export function getCurrentSafeZone(thingGeofenceAgent, thingGeofences) {
  if (thingGeofenceAgent == null ||
      !thingGeofenceAgent.get('enabled') ||
      thingGeofenceAgent.get('current_status') == null ||
      thingGeofenceAgent.getIn(['current_status', 'private']) == null ||
      !(thingGeofenceAgent.getIn(['current_status', 'private']) instanceof Map)) {
    return null;
  }

  const activeGeofencesIds = [];
  thingGeofenceAgent.getIn(['current_status', 'private'])
    .entrySeq()
    .forEach(([id, isActive]) => {
      if (isActive) {
        activeGeofencesIds.push(id);
      }
    });

  const activeGeofences = thingGeofences.filter(x => activeGeofencesIds.includes(x.get('id')));

  if (activeGeofences.size === 0) {
    return null;
  }

  let minGeofence = activeGeofences.get(0);
  activeGeofences.forEach((g) => {
    if (g.getIn(['data', 'geometry', 'radius']) < minGeofence.getIn(['data', 'geometry', 'radius'])) {
      minGeofence = g;
    }
  });

  return minGeofence.getIn(['data', 'properties', 'name']);
}
