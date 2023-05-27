import moment from 'moment';

const days = {
  monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6, sunday: 0,
};

const toDays = {
  1: 'monday', 2: 'tuesday', 3: 'wednesday', 4: 'thursday', 5: 'friday', 6: 'saturday', 0: 'sunday',
};

const dateTimeUtils = {
  timeToUtc: (timeForm, repeatDays) => {
    const time = timeForm.split(':');
    const hour = time[0];
    const minutes = time[1];

    const date = moment().minute(minutes).hour(hour).utc();
    const newDays = repeatDays.map((day) => {
      let dateUtc = moment().day(days[day]).hour(hour).minutes(minutes);
      dateUtc = dateUtc.utc();
      return toDays[dateUtc.day()];
    });

    return {
      minutes: date.minutes().toString(),
      hours: date.hours().toString(),
      repeatDays: newDays,
    };
  },
  timeUtcToLocal: (minutes, hour, repeatDays) => {
    const timeUtc = moment().minute(minutes).hour(hour).format('YYYY-MM-DD HH:mm:ss');
    let timeLocal = moment.utc(timeUtc).toDate();
    timeLocal = moment(timeLocal);

    const updatedDays = repeatDays.map((day) => {
      const now = moment().utc();
      const dayUtc = days[day];
      now.hour(hour).minute(minutes).day(dayUtc);
      const local = moment(now.toDate());

      return toDays[local.day()];
    });

    return {
      minutes: timeLocal.minutes().toString(),
      hours: timeLocal.hours().toString(),
      days: updatedDays,
    };
  },
};


export default dateTimeUtils;
