import moment from 'moment';
import 'moment-duration-format';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const DateTimeUtils = {
  timestampHumanizer: (_timestamp) => {
    moment.locale('es');
    const actualMoment = moment();
    const timestampDiff = actualMoment.diff(_timestamp, 'days');
    const formattedDate = moment(_timestamp).format('D/M/YYYY');
    return ((timestampDiff < 5) ? moment(_timestamp).fromNow() : formattedDate);
  },

  timestampToDate: _timestamp => capitalizeFirstLetter(
    moment(_timestamp).format('dddd, D MMMM  YYYY'),
  ),

  timestampToFullDate: _timestamp => capitalizeFirstLetter(
    moment(_timestamp).format('dddd, D [de] MMMM [de] YYYY HH:mm'),
  ),

  timestampToHourMinutes: _timestamp => moment(_timestamp).format('HH:mm', { trim: false }),

  secondsToMinutes: _seconds => moment.duration((_seconds), 'seconds').format('h [h] m [mins]'),

  todayDate: moment().format('l'),

  timestampToBasicDate: timestamp => moment(timestamp).format('D-M-YYYY'),

  addDays: (date, days) => moment(date).add({ day: days }).toISOString(),

  differenceInDays: (date1, date2) => {
    const difference = date1.getTime() - date2.getTime();
    return Math.round(difference / (1000 * 60 * 60 * 24));
  },
};

export default (DateTimeUtils);
