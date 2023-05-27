import React from 'react';
import PropTypes from 'prop-types';
import { history } from '../../store';
import ConfigItem from '../../components/ConfigItem';
import WorkingScreen from '../../components/WorkingScreen';
import { ExitConfirmation } from '../../components/Modals';
import Panel from '../../components/Panel';
import '../AddFamilyAcc/styles.scss';

class ModifyFamilyAcc extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      firstname: this.props.firstname,
      lastname: this.props.lastname,
      message: '',
      working: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePopup = this.handlePopup.bind(this);
    this.handleModify = this.handleModify.bind(this);
  }

  goBack = () => setTimeout(() => history.goBack(), 2500);

  handleChange({ target }) {
    this.setState({ [target.id]: target.value });
  }

  handlePopup() {
    this.setState({ show: !this.state.show });
  }

  handleModify() {
    if (this.state.firstname && this.state.lastname) {
      return this.setState({
        show: !this.state.show,
        message: '¿Estás seguro que deseas modificar los datos de este usuario?',
      });
    }

    return this.setState({
      show: !this.state.show,
      message: 'Debes completar los campos Nombre y Apellido para guardar tus cambios',
    });
  }

  handleSubmit = () => {
    const { firstname, lastname } = this.state;
    if (firstname && lastname) {
      this.props.modifyFamilyUser(firstname, lastname, this.props.id);
      this.setState({
        working: true,
      }, () => this.goBack());
    }
    return this.handlePopup();
  }

  render() {
    if (this.state.working) {
      return (
        <Panel className="things-config-container">
          <Panel.Header title="Modificar datos" />
          <Panel.Body style={{ height: '100%' }}>
            <WorkingScreen message="Modificando usuario..." />
          </Panel.Body>
        </Panel>
      );
    }
    return (
      <Panel className="things-config-container">
        <Panel.Header
          title="Modificar datos"
          backArrow
        >
          <button className="btn btn-primary" onClick={this.handleModify}>
            Guardar
          </button>
        </Panel.Header>
        <Panel.Body style={{ height: '100%' }} className="config-item-container">
          <div className="config-item">
            <span
              className="label-container-config"
              style={{ color: '#1f2848', marginRight: 'auto', fontWeight: '500' }}
            >
              Datos personales
            </span>
          </div>
          <ConfigItem
            callbackParent={this.handleChange}
            id="firstname"
            formType="text"
            label={'Nombre'}
            type="input"
            value={this.state.firstname}
          />
          <ConfigItem
            callbackParent={this.handleChange}
            id="lastname"
            formType="text"
            label={'Apellido'}
            type="input"
            value={this.state.lastname}
          />
          <ConfigItem
            callbackParent={this.handleChange}
            id="username"
            formType="text"
            label={'Mail'}
            type="input"
            value={this.props.username}
            disabled
          />
        </Panel.Body>
        <ExitConfirmation
          show={this.state.show}
          hide={this.handlePopup}
          accept={this.handleSubmit}
          componentName="Modificar datos"
        >
          <p>{this.state.message}</p>
        </ExitConfirmation>
      </Panel>
    );
  }
}

ModifyFamilyAcc.propTypes = {
  modifyFamilyUser: PropTypes.func,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  username: PropTypes.string,
  id: PropTypes.string,
};

export default ModifyFamilyAcc;
