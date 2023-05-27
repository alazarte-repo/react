import ReminderType from '../constants/reminderType';

const remindersTypes = {};

function getReminderName(reminderTypeId) {
  return remindersTypes[reminderTypeId] ? remindersTypes[reminderTypeId].name : 'Servicio';
}

function getReminderIcon(reminderType) {
  switch (reminderType) {
    case ReminderType.SuspensionChange:
      return 'suspension_change';
    case ReminderType.OilChange:
      return 'oil_change';
    case ReminderType.TireRotation:
      return 'tire_rotation';
    case ReminderType.BrakesControl:
      return 'brakes_control';
    case ReminderType.TechnicalVerification:
      return 'technical_verification';
    case ReminderType.OfficialService:
      return 'official_service';
    case ReminderType.DriversLicenseRenewal:
      return 'drivers_license_renewal';
    case ReminderType.TyreRotation:
      return 'tire_rotation';
    case ReminderType.PolenFilterChange:
      return 'polen_filter_change';
    case ReminderType.WheelAlignmentBalancing:
      return 'official_service';
    default:
      return 'official_service';
  }
}

export function setRemindersTypes(types) {
  types.forEach((t) => { remindersTypes[t.id] = t; });
}

export function serializeReminderHistoryItem(item) {
  return {
    id: item.id,
    type: item.reminder_type_id,
    icon: getReminderIcon(item.reminder_type_id),
    name: getReminderName(item.reminder_type_id),
    date: (new Date(item.date)).toLocaleDateString('es-AR'),
    mileage: `${item.mileage.toLocaleString('es-AR')} km`,
  };
}


export function serializeReminder(reminder) {
  return {
    id: reminder.id,
    name: getReminderName(reminder.reminder_type_id),
    icon: getReminderIcon(reminder.reminder_type_id),
    type: reminder.reminder_type_id,
    repeat: reminder.repeat,
    notify_at: reminder.notify_at,
    done_at: reminder.done_at,
  };
}

export default serializeReminder;
