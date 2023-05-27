import { ThingTypeSingular } from '../constants/thingType';
import { AnalyticVariable } from '../constants/analyticEvents';

const admittedTypes = {
  [ThingTypeSingular.Home]: AnalyticVariable.HasHome,
  [ThingTypeSingular.Vehicle]: AnalyticVariable.HasCar,
  [ThingTypeSingular.Flex]: AnalyticVariable.HasFlex,
  [ThingTypeSingular.Camera]: AnalyticVariable.HasCamera,
  [ThingTypeSingular.Light]: AnalyticVariable.HasLight,
  [ThingTypeSingular.SmartSocket]: AnalyticVariable.HasLight,
};

const thingsUserData = {
  [AnalyticVariable.HasHome]: false,
  [AnalyticVariable.HasCar]: false,
  [AnalyticVariable.HasFlex]: false,
  [AnalyticVariable.HasCamera]: false,
  [AnalyticVariable.HasLight]: false,
  [AnalyticVariable.Products]: [],
};

function getTypePrefix(thingId) {
  const splittedThingId = thingId.split(':');
  return `${splittedThingId[0]}:${splittedThingId[1]}:${splittedThingId[2]}`;
}

function checkUserHasThing(thingId, result) {
  /* eslint-disable no-param-reassign */
  const thingTypePrefix = getTypePrefix(thingId);
  if (thingTypePrefix in admittedTypes) {
    result[admittedTypes[thingTypePrefix]] = true;
    result.products.push(thingId);
  }
}

function recollectUserThingsData(things) {
  const result = Object.assign({}, thingsUserData);
  things.forEach((thing) => {
    checkUserHasThing(thing.id, result);
    thing.things.forEach(childThing => checkUserHasThing(childThing, result));
  });

  result.products = result.products.join(';');
  return result;
}

export { recollectUserThingsData };
export default recollectUserThingsData;
