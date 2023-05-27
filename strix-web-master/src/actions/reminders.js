import {
  ADD_REMINDERS,
  ADD_REMINDERS_SUCCESSFUL,
  GET_REMINDERS,
  GET_REMINDERS_SUCCESSFUL,
  MARK_SERVICE_DONE,
  CHANGE_REMINDER_CONFIG,
  DELETE_REMINDER,
  REMINDERS_RESET,
  REMINDERS_GET_HISTORY_ITEMS,
} from '../constants';

export const addReminders = (thingId, reminderTypes) => ({
  type: ADD_REMINDERS,
  thingId,
  reminderTypes,
});

export const addRemindersSuccessful = remindersCreated => ({
  type: ADD_REMINDERS_SUCCESSFUL,
  remindersCreated,
});

export const getReminders = thingId => ({
  type: GET_REMINDERS,
  thingId,
});

export const getRemindersSuccessful = (remindersData, reminderTypesData) => ({
  type: GET_REMINDERS_SUCCESSFUL,
  remindersData,
  reminderTypesData,
});

export const markServiceAsDone = (thingId, reminders, doneAt) => ({
  type: MARK_SERVICE_DONE,
  thingId,
  reminders,
  doneAt,
});
export const changeReminderConfig = (config, thingId, reminderId) => ({
  type: CHANGE_REMINDER_CONFIG,
  configurations: config,
  thingId,
  reminderId,
});

export const deleteReminder = (thingId, reminderId) => ({
  type: DELETE_REMINDER,
  thingId,
  reminderId,
});

export const remidersReset = () => ({
  type: REMINDERS_RESET,
});

export const remindersGetHistoryItems = thingId => ({
  type: REMINDERS_GET_HISTORY_ITEMS,
  thingId,
});

export default {
  getReminders,
  getRemindersSuccessful,
  markServiceAsDone,
  changeReminderConfig,
  deleteReminder,
  remindersGetHistoryItems,
};
