import {
  ANALYTICS_SEND_EVENT,
} from '../constants';

export const sendEvent = (action, category, label, value) => ({
  type: ANALYTICS_SEND_EVENT,
  action,
  category,
  label,
  value,
});

export default {
  sendEvent,
};
