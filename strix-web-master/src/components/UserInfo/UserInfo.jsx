import React from 'react';
import PropTypes from 'prop-types';
import './UserInfo.scss';


class UserInfo extends React.Component {
  componentWillMount() {
    this.props.getUserData();
  }

  render() {
    if (!this.props.name) {
      return (<div className="login-info" />);
    }
    return (
      <div className="login-info">
        <div className="user-circle">
          <i className="icon icon-user" />
        </div>
        <div className="user-info">
          <span className="user">Hola, {this.props.name}!</span>
          <a
            className="logout-link"
            href="#"
            onClick={() => this.props.requestLogout(this.props.device.id)}
          >
            Cerrar sesión
          </a>
        </div>
      </div>
    );
  }
}


UserInfo.propTypes = {
  getUserData: PropTypes.func,
  name: PropTypes.string,
  requestLogout: PropTypes.func,
  device: PropTypes.object,
};

export default UserInfo;
