import React from 'react';
import PropTypes from 'prop-types';
import InformationBarTypes from './informationBarTypes';
import InformationBarAction from './informationBarAction';
import './InformationBar.scss';

function getTypeStyle(type) {
  switch (type) {
    case InformationBarTypes.Error:
      return 'error';
    case InformationBarTypes.Success:
      return 'success';
    case InformationBarTypes.Information:
    default:
      return 'information';
  }
}

const InformationBar = (props) => {
  const styleClass = ['information-bar'];
  styleClass.push(getTypeStyle(props.type));
  const iconClass = props.icon != null ? `icon ${props.icon}` : '';
  return (
    <div
      className={styleClass.join(' ')}
      style={{ minHeight: props.height, maxHeight: props.height, fontSize: props.fontSize }}
    >
      <i
        className={iconClass}
        style={{ fontSize: props.iconSize }}
      />
      { props.text }
      <div className="action-bar">
        {
          props.actions &&
          props.actions.map(action => (
            <i
              key={action.icon}
              className={`action icon ${action.icon}`}
              style={{ fontSize: props.actionIconsSize }}
              onClick={action.action}
            />
          ))
        }
      </div>
    </div>
  );
};

InformationBar.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  fontSize: PropTypes.string,
  iconSize: PropTypes.string,
  actionIconsSize: PropTypes.string,
  icon: PropTypes.string,
  height: PropTypes.string,
  actions: PropTypes.arrayOf(InformationBarAction),
};

InformationBar.defaultProps = {
  height: '40px',
  type: InformationBarTypes.Information,
  fontSize: '11pt',
  iconSize: '16pt',
  actionIconsSize: '14pt',
};

export default InformationBar;
