import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { history } from '../../store';
import ConfigItem from '../../components/ConfigItem';
import Panel from '../../components/Panel';
import { ExitConfirmation } from '../../components/Modals';
import './styles.scss';

class AddFamilyAcc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      firstname: '',
      lastname: '',
      username: '',
      message: '',
    };

    // Bindings
    this.handleChange = this.handleChange.bind(this);
    this.handlePopup = this.handlePopup.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.id]: target.value });
  }

  handlePopup() {
    this.setState({ show: !this.state.show });
  }

  handleSave() {
    if (this.state.firstname && this.state.lastname && this.state.username) {
      return this.setState(state => ({ ...state,
        show: !this.state.show,
        message: `¿Estás seguro que deseas agregar a ${this.state.firstname}?
        \n recibirá una invitación a su mail ${this.state.username}` }));
    }
    return this.setState({
      show: !this.state.show,
      message: 'Debes completar los campos Nombre y Mail para guardar tus cambios',
    });
  }

  handleSubmit() {
    if (!!this.state.firstname && !!this.state.username) {
      this.props.addOrModifyFamilyUser(
        this.state.username,
        this.state.firstname,
        this.state.lastname,
      );
      return history.goBack();
    }
    return this.handlePopup();
  }

  render() {
    return (
      <Fragment>
        <Panel className="things-config-container">
          <Panel.Header
            title="Agregar datos"
            backArrow
          >
            <button className="btn btn-primary" onClick={this.handleSave}>
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
              label="Nombre"
              value={this.state.firstname}
              type="input"
            />
            <ConfigItem
              callbackParent={this.handleChange}
              id="lastname"
              formType="text"
              label={'Apellido'}
              value={this.state.lastname}
              type="input"
            />
            <ConfigItem
              callbackParent={this.handleChange}
              id="username"
              formType="text"
              label={'Mail'}
              value={this.state.username}
              type="input"
            />
          </Panel.Body>
        </Panel>
        <ExitConfirmation
          show={this.state.show}
          hide={this.handlePopup}
          accept={this.handleSubmit}
          componentName="Agregar datos"
        >
          <p>{ this.state.message }</p>
        </ExitConfirmation>
      </Fragment>
    );
  }
}

AddFamilyAcc.propTypes = {
  addOrModifyFamilyUser: PropTypes.func,
};

export default AddFamilyAcc;

