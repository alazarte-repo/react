/* eslint-env jasmine */
import { testSaga } from 'redux-saga-test-plan';
import { agentsService } from '../services';
import { notifySuccess } from '../actions/actionStatus';
import AgentType from '../constants/agentType';
import {
  getAgents,
  createAgent,
  deleteAgent,
  createAgentSpeedLimit,
  updateAgentSpeedLimit,
  updateGeofenceLocation,
  createGeofenceAgent,
  removeAgentSeedLimit,
  setParkingMode,
  unsetParkingMode,
  deactivateGeofence,
} from './agents';
import {
  GET_AGENTS,
  GET_AGENTS_SUCCESSFUL,
  ADD_AGENT_SUCCESS,
  DELETE_AGENT_SUCCESS,
  CREATE_AGENT_SL,
  UPDATE_AGENT_SL,
  UPDATE_AGENT_SUCCESS,
  UPDATE_GEOFENCE_LOCATION,
  ASSIGN_GEOFENCE,
  ASSIGN_GEOFENCE_SUCCESS,
  CREATE_AGENT_SL_SUCCESS,
  REMOVE_AGENT_SL,
  REMOVE_AGENT_SL_SUCCESS,
  SET_PARKING_MODE,
  UNSET_PARKING_MODE,
  SET_PARKING_MODE_SUCCESS,
  UNSET_PARKING_MODE_SUCCESS,
  DEACTIVATE_GEOFENCE,
  DEACTIVATE_GEOFENCE_SUCCESS,
  SUCCESS,
  UPDATE_GEOFENCE_LOCATION_SUCCESS,
  ASSIGN_GEOFENCE_ERROR,
  UPDATE_GEOFENCE_LOCATION_ERROR,
} from '../constants';

const THING_ID = 'mrn:thing:vehicle:f0c01e3c-5265-4ae6-971e-3db5c6bbf14c';
const AGENT_ID = 'mrn:agent:104f69e7-00d3-47a8-9bc8-a5334df583b9';
const GEOFENCE_ID = 'mrn:geofence:c00dfac6-ad64-48b6-ac56-e1e4bc940fe4';
const SPEED_LIMIT = '100';

const agentsReponses = [
  {
    account_id: 'mrn:account:13ab2493-adbe-484d-9cb5-8d4d9af1f5c5',
    configuration: {
      speed_limit: 100,
    },
    created_by: 'mrn:user:974e79c0-9eb7-449a-a4dd-8729bf860751',
    created_timestamp: 1527707783934,
    current_status: {
      details: 'Agent Created Correctly',
      normal: true,
    },
    description: 'Speed Limit Agent',
    enabled: true,
    id: 'mrn:agent:2c29d7b9-7051-4018-aaeb-285861cffa49',
    label: 'Speed Limit',
    last_modified_by: 'mrn:user:974e79c0-9eb7-449a-a4dd-8729bf860751',
    last_modified_timestamp: 1527707783934,
    thing_id: 'mrn:thing:vehicle:f0c01e3c-5265-4ae6-971e-3db5c6bbf14c',
    type: 'mrn:agent_type:speed_limit',
    user_id: 'mrn:user:974e79c0-9eb7-449a-a4dd-8729bf860751',
  },
  {
    account_id: 'mrn:account:13ab2493-adbe-484d-9cb5-8d4d9af1f5c5',
    configuration: {
      low_battery_threshold: 15,
    },
    created_by: 'mrn:user:974e79c0-9eb7-449a-a4dd-8729bf860751',
    created_timestamp: 1528210473380,
    current_status: {
      details: 'Agent Created Correctly',
      normal: true,
    },
    description: 'Low Battery Agent',
    enabled: true,
    id: 'mrn:agent:43f52e51-2190-45b4-90cf-8f40227914fc',
    label: 'Low Battery',
    last_modified_by: 'mrn:user:974e79c0-9eb7-449a-a4dd-8729bf860751',
    last_modified_timestamp: 1528210473380,
    thing_id: 'mrn:thing:flex:0b84181f-90d6-444d-b464-41d0772c2b95',
    type: 'mrn:agent_type:low_battery',
    user_id: 'mrn:user:974e79c0-9eb7-449a-a4dd-8729bf860751',
  },
];

const speedLimitAgentResponse = {
  account_id: 'mrn:account:13ab2493-adbe-484d-9cb5-8d4d9af1f5c5',
  agent_type: 'platform',
  configuration: {
    speed_limit: 100,
  },
  created_by: 'mrn:user:974e79c0-9eb7-449a-a4dd-8729bf860751',
  created_timestamp: 1534538308055,
  current_status: {
    details: 'Agent Created Correctly',
    normal: true,
  },
  description: 'Speed Limit Agent',
  enabled: true,
  id: 'mrn:agent:104f69e7-00d3-47a8-9bc8-a5334df583b9',
  label: 'Speed Limit',
  last_modified_by: 'mrn:user:974e79c0-9eb7-449a-a4dd-8729bf860751',
  last_modified_timestamp: 1534538308055,
  thing_id: 'mrn:thing:vehicle:f0c01e3c-5265-4ae6-971e-3db5c6bbf14c',
  type: 'mrn:agent_type:speed_limit',
  user_id: 'mrn:user:974e79c0-9eb7-449a-a4dd-8729bf860751',
};

const updateSpeedLimitAgentResponse = {
  account_id: 'mrn:account:13ab2493-adbe-484d-9cb5-8d4d9af1f5c5',
  agent_type: 'platform',
  configuration: {
    speed_limit: 100,
  },
  created_by: 'mrn:user:974e79c0-9eb7-449a-a4dd-8729bf860751',
  created_timestamp: 1534538308055,
  current_status: {
    details: 'Agent Created Correctly',
    normal: true,
  },
  description: 'Speed Limit Agent',
  enabled: true,
  id: 'mrn:agent:104f69e7-00d3-47a8-9bc8-a5334df583b9',
  label: '100 Km/h',
  last_modified_by: 'mrn:user:974e79c0-9eb7-449a-a4dd-8729bf860751',
  last_modified_timestamp: 1534539247111,
  thing_id: 'mrn:thing:vehicle:f0c01e3c-5265-4ae6-971e-3db5c6bbf14c',
  type: 'mrn:agent_type:speed_limit',
  user_id: 'mrn:user:974e79c0-9eb7-449a-a4dd-8729bf860751',
};

const updtedGeofenceAgentResponse = {
  account_id: 'mrn:account:116a7903-aa0d-4249-9d86-8efec9d1edd6',
  agent_type: 'platform',
  configuration: {
    geofences: [
      'mrn:geofence:c00dfac6-ad64-48b6-ac56-e1e4bc940fe4',
    ],
  },
  created_by: 'mrn:user:4e0e211e-d7ae-4bf7-a346-1f7689f5eea5',
  created_timestamp: 1534854305736,
  current_status: {
    details: 'Agent Created Correctly',
    normal: true,
  },
  description: 'some description',
  enabled: true,
  id: 'mrn:agent:104f69e7-00d3-47a8-9bc8-a5334df583b9',
  in_progress: false,
  label: 'Test',
  last_modified_by: 'mrn:user:4e0e211e-d7ae-4bf7-a346-1f7689f5eea5',
  last_modified_timestamp: 1534854796877,
  thing_id: 'mrn:thing:vehicle:85a9e67c-0251-4440-8eac-d16b8b0c4e05',
  type: 'mrn:agent_type:geofence',
  user_id: 'mrn:user:4e0e211e-d7ae-4bf7-a346-1f7689f5eea5',
};

const createGeofenceAgentResponse = {
  account_id: 'mrn:account:116a7903-aa0d-4249-9d86-8efec9d1edd6',
  agent_type: 'platform',
  configuration: {
    geofences: [
      GEOFENCE_ID,
    ],
  },
  created_by: 'mrn:user:4e0e211e-d7ae-4bf7-a346-1f7689f5eea5',
  created_timestamp: 1534856970567,
  current_status: {
    details: 'Agent Created Correctly',
    normal: true,
  },
  description: 'some description',
  enabled: true,
  id: 'mrn:agent:104f69e7-00d3-47a8-9bc8-a5334df583b9',
  in_progress: false,
  label: 'Test',
  last_modified_by: 'mrn:user:4e0e211e-d7ae-4bf7-a346-1f7689f5eea5',
  last_modified_timestamp: 1534856970567,
  thing_id: 'mrn:thing:vehicle:85a9e67c-0251-4440-8eac-d16b8b0c4e05',
  type: 'mrn:agent_type:geofence',
  user_id: 'mrn:user:4e0e211e-d7ae-4bf7-a346-1f7689f5eea5',
};

const parkingAgentResponse = {
  account_id: 'mrn:account:1eecdae4-08eb-47f0-abc1-21762511273f',
  agent_type: 'platform',
  configuration: {
    location: {
      accuracy: [
        10.01,
        0.02,
      ],
      coordinates: [
        -34.731381,
        -58.479632,
      ],
      type: 'Point',
    },
  },
  created_by: 'mrn:user:190695a5-2202-4ac0-9b1c-7d7155930705',
  created_timestamp: 1537985822560,
  current_status: {
    details: 'Agent Created Correctly',
    normal: true,
  },
  description: 'Parking Mode Agent',
  enabled: true,
  id: 'mrn:agent:84160cc7-e25f-49e4-8d27-56fc6138c485',
  label: 'Parking Mode',
  last_modified_by: 'mrn:user:190695a5-2202-4ac0-9b1c-7d7155930705',
  last_modified_timestamp: 1537985822560,
  thing_id: 'mrn:thing:vehicle:05672ff4-4524-4d6a-897e-3975f3030465',
  type: 'mrn:agent_type:parking_mode',
  user_id: 'mrn:user:190695a5-2202-4ac0-9b1c-7d7155930705',
};

const newGeofence = {
  id: GEOFENCE_ID,
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


describe('agents saga test', () => {
  it('should get agents data from server', () => {
    testSaga(getAgents, GET_AGENTS)
      .next()
      .call(agentsService.get)
      .next(agentsReponses)
      .put({ type: GET_AGENTS_SUCCESSFUL, agentsData: agentsReponses })
      .next()
      .isDone();
  });

  it('should create an agent', () => {
    const action = { thingId: 'thingId', agentType: 'speed-limit' };
    const expectedAgent = { id: 'id' };
    testSaga(createAgent, action)
      .next()
      .call(agentsService.create, 'speed-limit', 'thingId')
      .next({ id: 'id' })
      .put({ type: ADD_AGENT_SUCCESS, agent: expectedAgent })
      .next()
      .put({
        type: SUCCESS,
        state: {
          status: true,
          message: 'Se ha creado con éxito tu agente',
        },
      })
      .next()
      .isDone();
  });

  it('should create speed limit agent', () => {
    const action = {
      type: CREATE_AGENT_SL,
      thingId: THING_ID,
      speedLimit: SPEED_LIMIT,
    };

    const requestBody = {
      type: 'mrn:agent_type:speed_limit',
      thing_id: action.thingId,
      configuration: {
        speed_limit: Number(action.speedLimit),
      },
    };

    testSaga(createAgentSpeedLimit, action)
      .next()
      .call(agentsService.createAgentSpeedLimit, requestBody)
      .next(speedLimitAgentResponse)
      .put({ type: ADD_AGENT_SUCCESS, agent: speedLimitAgentResponse })
      .next()
      .put({ type: CREATE_AGENT_SL_SUCCESS })
      .next()
      .put({
        type: SUCCESS,
        state: {
          status: true,
          message: 'Se ha creado con éxito tu agente velocidad maxima',
        },
      })
      .next()
      .isDone();
  });

  it('should remove speed limit agent', () => {
    const action = { type: REMOVE_AGENT_SL, agentId: AGENT_ID };
    testSaga(removeAgentSeedLimit, action)
      .next()
      .call(agentsService.remove, action.agentId)
      .next()
      .put({ type: DELETE_AGENT_SUCCESS, agentId: action.agentId })
      .next()
      .put({ type: REMOVE_AGENT_SL_SUCCESS })
      .next()
      .put({
        type: SUCCESS,
        state: {
          status: true,
          message: 'Se ha eliminado con éxito tu agente de velocidad máxima',
        },
      })
      .next()
      .isDone();
  });

  it('should update speed limit angent', () => {
    const action = {
      type: UPDATE_AGENT_SL,
      agentId: AGENT_ID,
      speedLimit: SPEED_LIMIT,
    };

    const requestBody = [
      {
        action: 'update',
        path: '/configuration/speed_limit',
        value: Number(action.speedLimit),
      },
      {
        action: 'update',
        path: '/label',
        value: `${action.speedLimit} Km/h`,
      },
    ];

    testSaga(updateAgentSpeedLimit, action)
      .next()
      .call(agentsService.updateAgentSpeedLimit, action.agentId, requestBody)
      .next(updateSpeedLimitAgentResponse)
      .put({
        type: UPDATE_AGENT_SUCCESS,
        updatedAgent: updateSpeedLimitAgentResponse,
        agentId: action.agentId,
      })
      .next()
      .put({
        type: SUCCESS,
        state: {
          status: true,
          message: 'Se ha modificado con éxito tu agente velocidad maxima',
        },
      })
      .next()
      .isDone();
  });

  it('should delete an agent', () => {
    const action = { agentId: 'id' };
    testSaga(deleteAgent, action)
      .next()
      .call(agentsService.remove, 'id')
      .next({})
      .put({ type: DELETE_AGENT_SUCCESS, agentId: 'id' })
      .next()
      .put({
        type: SUCCESS,
        state: {
          status: true,
          message: 'Se ha eliminado con éxito tu agente',
        },
      })
      .next()
      .isDone();
  });

  it('should update geofence location', () => {
    const action = {
      type: UPDATE_GEOFENCE_LOCATION,
      agentId: AGENT_ID,
      geofenceId: GEOFENCE_ID,
      geofenceLabel: 'Test',
    };

    const body = [
      {
        action: 'update',
        path: '/configuration/geofences',
        value: [
          action.geofenceId,
        ],
      },
      {
        action: 'update',
        path: '/label',
        value: action.geofenceLabel,
      },
    ];

    testSaga(updateGeofenceLocation, action)
      .next()
      .call(agentsService.updateGeofence, action.agentId, body)
      .next(updtedGeofenceAgentResponse)
      .put({
        type: UPDATE_AGENT_SUCCESS,
        updatedAgent: updtedGeofenceAgentResponse,
        agentId: action.agentId,
      })
      .next()
      .put({ type: UPDATE_GEOFENCE_LOCATION_SUCCESS })
      .next()
      .put(notifySuccess('Tus zonas seguras se han modificado con éxito'))
      .next()
      .isDone();
  });


  it('should notify update geofence location error', () => {
    const action = {
      type: UPDATE_GEOFENCE_LOCATION,
      agentId: AGENT_ID,
      geofenceId: GEOFENCE_ID,
      geofenceLabel: 'Test',
    };

    const body = [
      {
        action: 'update',
        path: '/configuration/geofences',
        value: [
          action.geofenceId,
        ],
      },
      {
        action: 'update',
        path: '/label',
        value: action.geofenceLabel,
      },
    ];

    const error = new Error('error');
    try {
      testSaga(updateGeofenceLocation, action)
        .next()
        .call(agentsService.updateGeofence, action.agentId, body)
        .throw(error)
        .next()
        .put({ type: UPDATE_GEOFENCE_LOCATION_ERROR })
        .isDone();
    } catch (err) {
      expect(err).toEqual(error);
    }
  });

  it('should create new geofence agent (one geofence)', () => {
    const action = {
      type: ASSIGN_GEOFENCE,
      thingId: THING_ID,
      geofences: [newGeofence],
    };

    const body = {
      type: AgentType.Geofence,
      thing_id: action.thingId,
      label: 'Test',
      description: '',
      configuration: {
        mode: 'inclusive',
        geofences: action.geofences.map(x => x.marker.key),
      },
    };

    testSaga(createGeofenceAgent, action)
      .next()
      .call(agentsService.assignGeofence, body, action.thingId)
      .next(createGeofenceAgentResponse)
      .put({
        type: ASSIGN_GEOFENCE_SUCCESS,
        newGeofence: createGeofenceAgentResponse,
      })
      .next()
      .put(notifySuccess('Se ha assignado tu zona segura con éxito'))
      .next()
      .isDone();
  });

  it('should notify new geofence agent error', () => {
    const action = {
      type: ASSIGN_GEOFENCE,
      thingId: THING_ID,
      geofences: [newGeofence],
    };

    const body = {
      type: AgentType.Geofence,
      thing_id: action.thingId,
      label: 'Test',
      description: '',
      configuration: {
        mode: 'inclusive',
        geofences: action.geofences.map(x => x.marker.key),
      },
    };

    const error = new Error('error');
    try {
      testSaga(createGeofenceAgent, action)
        .next()
        .call(agentsService.assignGeofence, body, action.thingId)
        .throw(error)
        .put({ type: ASSIGN_GEOFENCE_ERROR })
        .next()
        .isDone();
    } catch (err) {
      expect(err).toEqual(error);
    }
  });

  it('should create new geofence agent (all geofences)', () => {
    const action = {
      type: ASSIGN_GEOFENCE,
      thingId: THING_ID,
      geofences: [],
    };

    const body = {
      type: 'mrn:agent_type:geofence',
      thing_id: action.thingId,
      label: 'Varias zonas',
      description: '',
      configuration: {
        mode: 'inclusive',
        geofences: action.geofences.map(x => x.marker.key),
      },
    };

    testSaga(createGeofenceAgent, action)
      .next()
      .call(agentsService.assignGeofence, body, action.thingId)
      .next(createGeofenceAgentResponse)
      .put({
        type: ASSIGN_GEOFENCE_SUCCESS,
        newGeofence: createGeofenceAgentResponse,
      })
      .next()
      .put(notifySuccess('Se ha assignado tu zona segura con éxito'))
      .next()
      .isDone();
  });

  it('should deactivate geofence', () => {
    const action = { type: DEACTIVATE_GEOFENCE, agentId: AGENT_ID };
    testSaga(deactivateGeofence, action)
      .next()
      .call(agentsService.remove, action.agentId)
      .next()
      .put({ type: DELETE_AGENT_SUCCESS, agentId: action.agentId })
      .next()
      .put({ type: DEACTIVATE_GEOFENCE_SUCCESS })
      .next()
      .put(notifySuccess('Se han desactivado tu zonas seguras con éxito'))
      .next()
      .isDone();
  });

  it('should set parking mode', () => {
    const action = { type: SET_PARKING_MODE, thingId: THING_ID };
    testSaga(setParkingMode, action)
      .next()
      .call(agentsService.create, AgentType.ParkingMode, action.thingId)
      .next(parkingAgentResponse)
      .put({ type: ADD_AGENT_SUCCESS, agent: parkingAgentResponse })
      .next()
      .put({ type: SET_PARKING_MODE_SUCCESS })
      .next()
      .put({
        type: SUCCESS,
        state: {
          status: true,
          message: 'Se ha activado con éxito el modo estacionado.',
        },
      })
      .next()
      .isDone();
  });

  it('should unset parking mode', () => {
    const action = { type: UNSET_PARKING_MODE, agentId: AGENT_ID };
    testSaga(unsetParkingMode, action)
      .next()
      .call(agentsService.remove, action.agentId)
      .next()
      .put({ type: DELETE_AGENT_SUCCESS, agentId: action.agentId })
      .next()
      .put({ type: UNSET_PARKING_MODE_SUCCESS })
      .next()
      .put({
        type: SUCCESS,
        state: {
          status: true,
          message: 'Se ha desactivado con éxito el modo estacionado.',
        },
      })
      .next()
      .isDone();
  });
});

