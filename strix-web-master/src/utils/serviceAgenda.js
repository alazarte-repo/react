import moment from 'moment';
import maintenanceImageCar from 'images/maitenance_car.svg';
import maintenanceImageMoto from 'images/maitenance_moto.svg';
import { VehicleSubtype } from '../constants/thingType';

function availableReminderTypes(reminders, allTypes) {
  const availableReminders = allTypes
    .filter(type => reminders
      .map(reminder => reminder.type)
      .indexOf(type.id) < 0);
  return (availableReminders);
}

function getPercentage(reminder, mileage) {
  let progressStyles;

  const mileageDifference = mileage - reminder.done_at.mileage;
  let mileageLeftPercentage = (mileageDifference / reminder.repeat.mileage) * 100;
  const timeLeftDifference = moment().diff(moment(reminder.done_at.date), 'days');
  let timeLeftPercentage = (timeLeftDifference / reminder.repeat.days) * 100;
  if (mileageLeftPercentage > timeLeftPercentage) {
    mileageLeftPercentage = `${mileageLeftPercentage.toString()}%`;
    progressStyles = { width: mileageLeftPercentage };
  } else {
    timeLeftPercentage = `${timeLeftPercentage.toString()}%`;
    progressStyles = { width: timeLeftPercentage };
  }
  return progressStyles;
}

function getServiceImage(subtype) {
  switch (subtype) {
    case VehicleSubtype.Motorcycle:
      return maintenanceImageMoto;
    case VehicleSubtype.Car:
      return maintenanceImageCar;
    default:
      return maintenanceImageCar;
  }
}

function getTimeDifference(notifyAtDate) {
  const monthsDiff = moment(notifyAtDate).diff(new Date(), 'months', false);
  if (monthsDiff === 0) {
    return 'este mes';
  } else if (Math.abs(monthsDiff) === 1) {
    return `${monthsDiff} mes`;
  }

  return `${monthsDiff} meses`;
}

export default {
  availableReminderTypes,
  getPercentage,
  getServiceImage,
  getTimeDifference,
};

export {
  availableReminderTypes,
  getPercentage,
  getServiceImage,
  getTimeDifference,
};
