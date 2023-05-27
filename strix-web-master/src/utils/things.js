import HomeControlStatus from '../constants/homeControlStatus';
import CardType from '../constants/cardType';
import { ThingType, VehicleSubtype } from '../constants/thingType';
import { thingsService } from '../services';
import ThingActionState from '../constants/thingActionState';

export function getVehicleIcon(subtype) {
  switch (subtype) {
    case VehicleSubtype.Motorcycle:
      return 'service-moto';
    case VehicleSubtype.Car:
      return 'service-car';
    default:
      return 'service-car';
  }
}

export function getVehicleIconClass(subtype) {
  switch (subtype) {
    case VehicleSubtype.Motorcycle:
      return 'icon-service-moto';
    case VehicleSubtype.Car:
      return 'icon-service-car';
    default:
      return 'icon-service-car';
  }
}

export function getIconClass(type, subtype) {
  switch (type) {
    case CardType.Home:
      return 'icon-service-home';
    case CardType.Flex:
      return 'icon-service-flex';
    case CardType.Location:
      return 'icon-service-location';
    case CardType.Vehicle:
      return getVehicleIconClass(subtype);
    default:
      return null;
  }
}

function getHomeControlRepresentation(homeControl) {
  let onlineState = HomeControlStatus.Loading;
  let onState = false;

  if (homeControl.state) {
    onlineState = homeControl.state.online ? HomeControlStatus.Online : HomeControlStatus.Offline;
    onState = homeControl.state.on;
  }

  return {
    label: homeControl.info ? homeControl.info.label : 'No disponible',
    type: homeControl.type,
    id: homeControl.id,
    parent_id: homeControl.parent_id,
    online: onlineState,
    on: onState,
    switching: false,
  };
}

export function getThingRepresentation(thing) {
  switch (thing.type) {
    case ThingType.SmartSocket:
    case ThingType.Light:
      return getHomeControlRepresentation(thing);
    default:
      return thing;
  }
}

/**
 * Waits for an action execution to be finished
 * @param {string} thingId Identifies the thing where action is beign applied
 * @param {string} executionId Action's execution identifier
 * @param {number} waitTime Initial time to wait for re-check the action's state
 * @param {number} maxWait Maximum time before cancel the action's waiting
 */
export async function waitForAction(thingId, execution, waitTime = 500, maxWait = 30000) {
  return new Promise(async (resolve, reject) => {
    try {
      if (execution != null) {
        if (execution.state === ThingActionState.Finished) {
          resolve(execution);
          return;
        }
      } else {
        reject(new Error(`The action execution for ${thingId} is invalid (null).`));
        return;
      }
      if (waitTime > maxWait) {
        reject(new Error(`Maximum wait time reached for action ${execution.id} (${thingId})`));
        return;
      }

      const actionExecution = await thingsService.pollAction(thingId, execution.id);

      switch (actionExecution.state) {
        case ThingActionState.Pending:
        case ThingActionState.Running:
          setTimeout(() => waitForAction(thingId, execution, waitTime * 1.5)
            .then(response => resolve(response))
            .catch(error => reject(error)), waitTime);
          break;
        case ThingActionState.Finished:
          resolve(actionExecution);
          break;
        case ThingActionState.Canceled:
        case ThingActionState.Error:
          reject(actionExecution);
          break;
        default:
          reject(new Error(`Unknown thing action state ${actionExecution.state} for action ${execution.id} (${thingId})`));
          break;
      }
    } catch (error) {
      reject(error);
    }
  });
}


/**
 * Sorting function for things cards to be used in _.sortBy function (lodash library)
 */
const cardSort = [CardType.Location, CardType.Vehicle, CardType.Home, CardType.Flex];
export function sortCardsFunction(thing) {
  return cardSort.indexOf(thing.type);
}

export default {
  getIconClass,
  getVehicleIconClass,
  getVehicleIcon,
  getThingRepresentation,
  waitForAction,
  sortCardsFunction,
};
