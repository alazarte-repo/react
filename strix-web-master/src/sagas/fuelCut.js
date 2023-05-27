import { all, takeEvery } from 'redux-saga/effects';
import * as ThingsActions from './thingActions';
import VehicleAction from '../constants/vehicleAction';
import { handleHttpErrors } from './handleErrors';
import { actionCategories } from '../reducers/thingsActions';
import {
  FUEL_CUT_CHECK_RUNNING_ACTION,
  FUEL_CUT_EXECUTE_ACTION,
} from '../constants';

const successMessage = action => `El combustible se ha ${action === VehicleAction.FuelCutOff ? 'cortado' : 'restaurado'} con éxito.`;

const errorMessage = (action, error) => `Ha ocurrido un error al ${action === VehicleAction.FuelCutOff ? 'cortar' : 'restaurar'} el combustible:\n ${error.result.details}`;

const query = ThingsActions.getRunningActionQuery([
  VehicleAction.FuelRestore,
  VehicleAction.FuelCutOff,
]);

export const waitExecutionToConclude = ThingsActions.waitExecutionToConcludeFactory(
  successMessage,
  errorMessage,
  null,
  actionCategories.FuelCut,
);

export const pollRunningAction = ThingsActions.pollRunningActionFactory(
  query,
  waitExecutionToConclude,
  actionCategories.FuelCut,
);

export const executeAction = ThingsActions.executeActionFactory(
  query,
  waitExecutionToConclude,
  actionCategories.FuelCut,
);

export default function* fuelCutRootSaga() {
  yield all([
    takeEvery(FUEL_CUT_CHECK_RUNNING_ACTION, handleHttpErrors(pollRunningAction)),
    takeEvery(FUEL_CUT_EXECUTE_ACTION, handleHttpErrors(executeAction, 'Ha ocurrido un error cortando/restaurando el combustible.')),
  ]);
}
