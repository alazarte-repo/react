import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-16-bootstrap-date-picker';
import DateTimeUtils from 'utils/DateTimeUtils';

const dayLabels = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
const monthLabels = [
  'Enero', 'Febrero', 'Marzo',
  'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre',
  'Octubre', 'Noviembre', 'Diciembre',
];
function DatePickerRender(props) {
  return (
    <DatePicker
      id={props.id}
      placeholder={DateTimeUtils.todayDate}
      dateFormat="DD/MM/YYYY"
      cellPadding="3px"
      className="form-control"
      showClearButton={false}
      dayLabels={dayLabels}
      monthLabels={monthLabels}
      value={props.pickerValue}
      onChange={props.changePicker}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
    />
  );
}

DatePickerRender.propTypes = {
  id: PropTypes.string,
  changePicker: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  pickerValue: PropTypes.string,
};

export default DatePickerRender;
