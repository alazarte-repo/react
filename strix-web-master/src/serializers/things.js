import DateTimeUtils from '../utils/DateTimeUtils';
import { ThingTypeSingular, ThingType } from '../constants/thingType';
import CardType from '../constants/cardType';

const HOME_CONTROL_TYPES = [
  ThingTypeSingular.Light,
  ThingTypeSingular.SmartSocket,
];

// -------------------------------
//    Things types serializers
// -------------------------------

// Vehicle

function serializeVehicle(cardInfo, thing) {
  const newCardInfo = {
    lastUpdated: DateTimeUtils.timestampHumanizer(thing.metadata.state.location.timestamp),
    speed: thing.state.speed,
    mileage: thing.state.mileage,
    contact_on: thing.state.contact_on,
    fuelCutOff: thing.state.fuel_cut_off,
    center: {
      lat: thing.state.location.coordinates[0],
      lng: thing.state.location.coordinates[1],
    },
    subtype: thing.info.subtype,
  };
  return Object.assign({}, cardInfo, newCardInfo);
}

// Home

function serializeHome(cardInfo, thing) {
  /* eslint-disable max-len */
  const camera = thing.things.filter(childThing => childThing.indexOf('camera') !== -1);
  const controls = thing.things.filter(t => HOME_CONTROL_TYPES.reduce((x, y) => t.includes(y) || x, false));
  const { state } = thing.metadata;
  const alarmState = Object.assign(thing.state, { loading: false });
  const newCardInfo = {
    lastUpdated: state.alarm_armed ? DateTimeUtils.timestampHumanizer(state.alarm_armed.timestamp) : 'Desconocido',
    center: {
      lat: thing.info.location.coordinates[0],
      lng: thing.info.location.coordinates[1],
    },
    isAlarmArmed: thing.state.alarm_armed,
    home_location: thing.info.address,
    metadata: thing.metadata,
    state: alarmState,
    cameras: camera,
    homeControls: controls,
  };
  return Object.assign({}, cardInfo, newCardInfo);
}

// Flex

function serializeFlex(cardInfo, thing) {
  const newCardInfo = {
    lastUpdated: DateTimeUtils.timestampHumanizer(thing.metadata.state.location.timestamp),
    batteryLevel: thing.state.battery_level,
    center: {
      lat: thing.state.location.coordinates[0],
      lng: thing.state.location.coordinates[1],
    },
  };

  return Object.assign({}, cardInfo, newCardInfo);
}

// -------------------------------
//       Auxiliary functions
// -------------------------------

function serializeByType(cardInfo, thing, type) {
  switch (type) {
    case CardType.Vehicle:
      return serializeVehicle(cardInfo, thing);
    case CardType.Home:
      return serializeHome(cardInfo, thing);
    case CardType.Flex:
      return serializeFlex(cardInfo, thing);
    default:
      return {};
  }
}

function getCardType(thing) {
  switch (thing.type) {
    case ThingType.Vehicle:
      return CardType.Vehicle;
    case ThingType.Home:
      return CardType.Home;
    case ThingType.Flex:
      return CardType.Flex;
    default:
      throw new Error(`Can not get card type for ${thing.type}`);
  }
}


function formatAgent(agent) {
  return agent.split(':').slice(-1)[0];
}

// NOTE: inherited code had the field "type" processed as the CardType
// and it is used everywhere in the project. To prevent bugs the magenta
// type field is called originalType

function getCardInfo(thing) {
  return {
    id: thing.id,
    zoom: 16,
    name: thing.info.label,
    actions: thing.actions,
    type: getCardType(thing),
    originalType: thing.type,
    agents: thing.agents.map(formatAgent),
    createdTimestamp: thing.created_timestamp,
  };
}

// -------------------------------
//           Serializer
// -------------------------------

function serializeThing(thing) {
  const cardInfo = getCardInfo(thing);
  return serializeByType(cardInfo, thing, cardInfo.type);
}

export default serializeThing;
