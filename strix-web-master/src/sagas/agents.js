import { call, takeLatest, put, takeEvery, all } from 'redux-saga/effects';
import { agentsService } from '../services';
import { handleHttpErrors } from './handleErrors';
import { notifySuccess } from '../actions/actionStatus';
import AgentType from '../constants/agentType';
import {
  GET_AGENTS,
  GET_AGENTS_SUCCESSFUL,
  ADD_AGENT,
  ADD_AGENT_SUCCESS,
  DELETE_AGENT,
  DELETE_AGENT_SUCCESS,
  ASSIGN_GEOFENCE,
  ASSIGN_GEOFENCE_SUCCESS,
  ASSIGN_GEOFENCE_ERROR,
  UPDATE_GEOFENCE_LOCATION,
  UPDATE_GEOFENCE_LOCATION_ERROR,
  UPDATE_GEOFENCE_LOCATION_SUCCESS,
  UPDATE_AGENT_SUCCESS,
  DEACTIVATE_GEOFENCE,
  DEACTIVATE_GEOFENCE_SUCCESS,
  CREATE_AGENT_SL,
  CREATE_AGENT_SL_SUCCESS,
  REMOVE_AGENT_SL,
  REMOVE_AGENT_SL_SUCCESS,
  UPDATE_AGENT_SL,
  SET_PARKING_MODE,
  UNSET_PARKING_MODE,
  SUCCESS,
  SET_PARKING_MODE_SUCCESS,
  UNSET_PARKING_MODE_SUCCESS,
} from '../constants';

export function* getAgents() {
  const agentsData = yield call(agentsService.get);
  yield put({ type: GET_AGENTS_SUCCESSFUL, agentsData });
}

export function* createAgent({ agentType, thingId }) {
  const newAgent = yield call(agentsService.create, agentType, thingId);
  yield put({ type: ADD_AGENT_SUCCESS, agent: newAgent });
  yield put({
    type: SUCCESS,
    state: {
      status: true,
      message: 'Se ha creado con éxito tu agente',
    },
  });
}

export function* deleteAgent({ agentId }) {
  yield call(agentsService.remove, agentId);
  yield put({ type: DELETE_AGENT_SUCCESS, agentId });
  yield put({
    type: SUCCESS,
    state: {
      status: true,
      message: 'Se ha eliminado con éxito tu agente',
    },
  });
}

export function* createGeofenceAgent({ thingId, geofences }) {
  // If geofences array is empty, the backend assigns all the zones created
  // by the user
  try {
    const agentLabel = geofences.length === 1 ? geofences[0].label : 'Varias zonas';
    const body = {
      type: AgentType.Geofence,
      thing_id: thingId,
      label: agentLabel,
      description: '',
      configuration: {
        mode: 'inclusive',
        geofences: geofences.map(g => g.id),
      },
    };
    const newGeofence = yield call(agentsService.assignGeofence, body, thingId);
    yield put({ type: ASSIGN_GEOFENCE_SUCCESS, newGeofence });
    yield put(notifySuccess('Se ha assignado tu zona segura con éxito'));
  } catch (error) {
    yield put({ type: ASSIGN_GEOFENCE_ERROR });
    throw error;
  }
}

export function* deactivateGeofence({ agentId }) {
  yield call(agentsService.remove, agentId);
  yield put({ type: DELETE_AGENT_SUCCESS, agentId });
  yield put({ type: DEACTIVATE_GEOFENCE_SUCCESS });
  yield put(notifySuccess('Se han desactivado tu zonas seguras con éxito'));
}

export function* updateGeofenceLocation({ agentId, geofenceId, geofenceLabel }) {
  try {
    const body = [
      {
        action: 'update',
        path: '/configuration/geofences',
        value: [geofenceId],
      },
      {
        action: 'update',
        path: '/label',
        value: geofenceLabel,
      },
    ];
    const updatedAgent = yield call(agentsService.updateGeofence, agentId, body);
    yield put({ type: UPDATE_AGENT_SUCCESS, updatedAgent, agentId });
    yield put({ type: UPDATE_GEOFENCE_LOCATION_SUCCESS });
    yield put(notifySuccess('Tus zonas seguras se han modificado con éxito'));
  } catch (error) {
    yield put({ type: UPDATE_GEOFENCE_LOCATION_ERROR });
    throw error;
  }
}

export function* createAgentSpeedLimit({ thingId, speedLimit }) {
  const body = {
    type: 'mrn:agent_type:speed_limit',
    thing_id: thingId,
    configuration: {
      speed_limit: Number(speedLimit),
    },
  };
  const newSpeedLimitAgent = yield call(agentsService.createAgentSpeedLimit, body);
  yield put({ type: ADD_AGENT_SUCCESS, agent: newSpeedLimitAgent });
  yield put({ type: CREATE_AGENT_SL_SUCCESS });
  yield put({
    type: SUCCESS,
    state: {
      status: true,
      message: 'Se ha creado con éxito tu agente velocidad maxima',
    },
  });
}

export function* updateAgentSpeedLimit({ agentId, speedLimit }) {
  const body = [
    {
      action: 'update',
      path: '/configuration/speed_limit',
      value: Number(speedLimit),
    },
    {
      action: 'update',
      path: '/label',
      value: `${speedLimit} Km/h`,
    },
  ];
  const updatedAgent = yield call(agentsService.updateAgentSpeedLimit, agentId, body);
  yield put({ type: UPDATE_AGENT_SUCCESS, updatedAgent, agentId });
  yield put({
    type: SUCCESS,
    state: {
      status: true,
      message: 'Se ha modificado con éxito tu agente velocidad maxima',
    },
  });
}

export function* removeAgentSeedLimit({ agentId }) {
  yield call(agentsService.remove, agentId);
  yield put({ type: DELETE_AGENT_SUCCESS, agentId });
  yield put({ type: REMOVE_AGENT_SL_SUCCESS });
  yield put(notifySuccess('Se ha eliminado con éxito tu agente de velocidad máxima'));
}

export function* setParkingMode({ thingId }) {
  const newAgent = yield call(agentsService.create, AgentType.ParkingMode, thingId);
  yield put({ type: ADD_AGENT_SUCCESS, agent: newAgent });
  yield put({ type: SET_PARKING_MODE_SUCCESS });
  yield put(notifySuccess('Se ha activado con éxito el modo estacionado.'));
}

export function* unsetParkingMode({ agentId }) {
  yield call(agentsService.remove, agentId);
  yield put({ type: DELETE_AGENT_SUCCESS, agentId });
  yield put({ type: UNSET_PARKING_MODE_SUCCESS });
  yield put(notifySuccess('Se ha desactivado con éxito el modo estacionado.'));
}

export default function* rootNavBarSaga() {
  yield all([
    takeEvery(GET_AGENTS, handleHttpErrors(getAgents)),
    takeLatest(ASSIGN_GEOFENCE, handleHttpErrors(createGeofenceAgent)),
    takeLatest(ADD_AGENT, handleHttpErrors(createAgent, 'Ha ocurrido un error al crear tu nuevo agente')),
    takeLatest(DELETE_AGENT, handleHttpErrors(deleteAgent, 'Ha ocurrido un error al borrar tu agente')),
    takeLatest(UPDATE_GEOFENCE_LOCATION, handleHttpErrors(updateGeofenceLocation)),
    takeLatest(CREATE_AGENT_SL, handleHttpErrors(createAgentSpeedLimit, 'Ha ocurrido un error al crear tu agente velocidad maxima')),
    takeLatest(UPDATE_AGENT_SL, handleHttpErrors(updateAgentSpeedLimit, 'Ha ocurrido un error al modificar tu agente velocidad maxima')),
    takeLatest(REMOVE_AGENT_SL, handleHttpErrors(removeAgentSeedLimit, 'Ha ocurrido un error al eliminar tu agente velocidad maxima')),
    takeLatest(DEACTIVATE_GEOFENCE, handleHttpErrors(deactivateGeofence, 'Ha ocurrido un error al desactivar tu zona segura.')),
    takeLatest(SET_PARKING_MODE, handleHttpErrors(setParkingMode, 'Ha ocurrido un error al activar el modo estacionado.')),
    takeLatest(UNSET_PARKING_MODE, handleHttpErrors(unsetParkingMode, 'Ha ocurrido un error al desactivar el modo estacionado.')),
  ]);
}
