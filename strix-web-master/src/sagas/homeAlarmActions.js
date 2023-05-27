import { all, takeEvery } from 'redux-saga/effects';
import * as ThingsActions from './thingActions';
import AlarmActions from '../constants/alarmActions';
import { handleHttpErrors } from './handleErrors';
import { actionCategories } from '../reducers/thingsActions';
import {
  ALARM_CHECK_RUNNING_ACTION,
  ALARM_EXECUTE_ACTION,
} from '../constants';

const successMessage = action => `La alarma se ha ${action === AlarmActions.Arm ? 'armado' : 'desarmado'} con éxito.`;

const errorMessage = (action, error) => `Ha ocurrido un error al ${action === AlarmActions.Arm ? 'armar' : 'desarmar'} la alarma. ${error.result.details || ''}`;

function processError(error) {
  if (error != null && error.result != null) {
    if (error.result.error === 'open_zones') {
      const openedZones = error.result.zones.map((sensor, index) => (sensor === 'opened' ? index + 1 : -1)).filter(position => position > 0);
      const values = openedZones.join(', ');
      return openedZones.length > 1
        ? `La alarma no se pudo armar porque las zonas ${values} están abiertas.`
        : `La alarma no se pudo armar porque la zona ${values} está abierta.`;
    }
  }
  return 'No se ha podido enviar el comando. Revise el código ingresado e intente nuevamente.';
}

export const query = ThingsActions.getRunningActionQuery([
  AlarmActions.Arm,
  AlarmActions.Disarm,
]);

export const waitExecutionToConclude = ThingsActions.waitExecutionToConcludeFactory(
  successMessage,
  errorMessage,
  processError,
  actionCategories.HomeAlarm,
);

export const pollRunningAction = ThingsActions.pollRunningActionFactory(
  query,
  waitExecutionToConclude,
  actionCategories.HomeAlarm,
);

export const executeAction = ThingsActions.executeActionFactory(
  query,
  waitExecutionToConclude,
  actionCategories.HomeAlarm,
);

export default function* rootHomeAlarmActions() {
  yield all([
    takeEvery(ALARM_CHECK_RUNNING_ACTION, handleHttpErrors(pollRunningAction)),
    takeEvery(ALARM_EXECUTE_ACTION, handleHttpErrors(executeAction, 'Ha ocurrido un error armando/desarmando la alarma.')),
  ]);
}
