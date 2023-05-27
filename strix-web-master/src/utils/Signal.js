import moment from 'moment';

/* events */
const EVENT_STATUS = 'status';
// const EVENT_RESPONSE = 'response';
const EVENT_CONNECT = 'connect';
const EVENT_DISCONNECT = 'disconnect';

/* status */
const STATUS_ARMED = 'armed';
// const STATUS_DISARMED = 'disarmed';

/* cmd_status */
// const CMD_STATUS_FINISHED = 'finished';
const CMD_STATUS_ERROR = 'error';

/* icons */
const ICON_BLOCKED = 'blocked';
const ICON_ARMED = 'alarm-on';
const ICON_DISARMED = 'alarm-off';

/* labels */
const CONNECTION = 'Conexión';
const DISCONNECTION = 'Sin conexión';
const ARMED = 'Armado';
const DISARMED = 'Desarmado';
const REMOTE_ARMED = 'Armado remoto';
const REMOTE_DISARMED = 'Desarmado remoto';

const MAX_MINUTES = 5;

function filterError(signals) {
  return signals.filter(signal => signal.cmd_status !== CMD_STATUS_ERROR);
}

function completeData(signals) {
  return signals.map((signal) => {
    if (signal.event === EVENT_DISCONNECT) {
      return { ...signal, label: DISCONNECTION, icon: ICON_BLOCKED };
    } else if (signal.event === EVENT_CONNECT) {
      return {
        ...signal,
        label: CONNECTION,
        icon: signal.status === STATUS_ARMED ? ICON_ARMED : ICON_DISARMED,
      };
    } else if (signal.event === EVENT_STATUS) {
      return {
        ...signal,
        label: signal.status === STATUS_ARMED ? ARMED : DISARMED,
        icon: signal.status === STATUS_ARMED ? ICON_ARMED : ICON_DISARMED,
      };
    }
    // in this case signal.event will be EVENT_RESPONSE
    // and cmd_status will be CMD_STATUS_FINISHED because the errors were previously eliminated
    return signal.status === STATUS_ARMED
      ? { ...signal, label: REMOTE_ARMED, icon: ICON_ARMED }
      : { ...signal, label: REMOTE_DISARMED, icon: ICON_DISARMED };
  });
}

function deleteRecordsLessTime(signals) {
  const result = [];
  let validItem;
  let ignoreNextItem = false;

  signals.forEach((element, index) => {
    if (ignoreNextItem) {
      ignoreNextItem = false;
    } else {
      const nextItem = index + 1 < signals.length ? signals[index + 1] : null;
      validItem = true;
      if (element.label === CONNECTION && nextItem && nextItem.label === DISCONNECTION) {
        validItem = moment(element.event_timestamp).diff(nextItem.event_timestamp, 'minutes') > MAX_MINUTES;
      }
      if (validItem) {
        result.push(element);
      }
      ignoreNextItem = !validItem;
    }
  });

  return result;
}

export default {
  filterError,
  completeData,
  deleteRecordsLessTime,
};
