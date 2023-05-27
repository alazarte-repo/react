const ThingType = Object.freeze({
  Vehicle: 'mrn:things:vehicle',
  Flex: 'mrn:things:flex',
  Home: 'mrn:things:home',
  Gps: 'mrn:things:gps',
  Camera: 'mrn:things:camera',
  AlarmPanel: 'mrn:things:alarm_panel',
  Light: 'mrn:things:light',
  SmartSocket: 'mrn:things:smart_socket',
});

const ThingTypeSingular = Object.freeze({
  Vehicle: 'mrn:thing:vehicle',
  Flex: 'mrn:thing:flex',
  Home: 'mrn:thing:home',
  Gps: 'mrn:thing:gps',
  Camera: 'mrn:thing:camera',
  AlarmPanel: 'mrn:thing:alarm_panel',
  Light: 'mrn:thing:light',
  SmartSocket: 'mrn:thing:smart_socket',
});

const VehicleSubtype = Object.freeze({
  Car: 'car',
  Motorcycle: 'motorcycle',
});

export default {
  ThingType,
  ThingTypeSingular,
  VehicleSubtype,
};

export {
  ThingType,
  ThingTypeSingular,
  VehicleSubtype,
};

