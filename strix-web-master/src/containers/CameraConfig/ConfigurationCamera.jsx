import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { history } from '../../store';
import { ExitConfirmation } from '../../components/Modals';
import ConfigItem from '../../components/ConfigItem';
import Panel from '../../components/Panel';
import './styles.scss';

class ConfigurationCamera extends Component {
  state = {
    show: false,
    showExit: false,
    showDelete: false,
    label: this.props.label,
    message: '',
  }

  handleChange = ({ target }) => {
    this.setState({ [target.id]: target.value });
  }

  handleSave = () => {
    if (this.state.label !== '') {
      return this.setState(state => ({ ...state,
        message: '¿Estás seguro que deseas guardar los cambios?',
        show: !this.state.show }));
    }
    return this.setState(state => ({ ...state,
      message: 'Debes completar el campo Nombre de la cámara para guardar tus cambios',
      show: !this.state.show,
    }));
  }

  handleDelete = () => {
    this.setState({
      message: '¿Está seguro que desea eliminar y perder la configuración de la cámara?',
      showDelete: !this.state.showDelete,
    });
  }

  handleSubmitDelete = () => {
    const { thingId, cameraId } = this.props.match.params;
    this.props.deleteCamera(thingId, cameraId);
    history.goBack();
  }

  handlePopup = () => {
    this.setState({ show: !this.state.show });
  }

  handleToggle = () => {
    this.setState({ checked: !this.state.checked });
  }

  handleSubmit = () => {
    if (this.state.label) {
      this.props.modifyCamera(this.state.label, this.props.match.params.cameraId);
      return history.goBack();
    }
    return this.handlePopup();
  }

  goBack = () => {
    if (this.props.label !== this.state.label) {
      return this.setState(state => ({ ...state,
        message: '¿Está seguro que desea salir sin guardar los cambios?',
        showExit: !this.state.showExit,
      }));
    }
    return history.goBack();
  }

  render() {
    return (
      <Panel>
        <Panel.Header
          title="Configuración de camara"
          onClickBack={this.goBack}
          backArrow
        >
          <button
            className="btn btn-primary btn-save"
            onClick={this.handleSave}
          >
            Guardar
          </button>
        </Panel.Header>
        <Panel.Body
          className="things-config-container"
          style={{ flexGrow: 1, backgroundColor: 'white' }}
        >
          <div className="config-item-container">
            <ConfigItem
              callbackParent={event => this.handleChange(event)}
              id="label"
              formType="text"
              label={'Nombre de la cámara'}
              type="input"
              value={this.state.label}
            />
          </div>
        </Panel.Body>
        <Panel.Footer>
          <div className="config-item-delete" onClick={this.handleDelete}>
            Eliminar
          </div>
        </Panel.Footer>
        <ExitConfirmation show={this.state.show} hide={this.handlePopup} accept={this.handleSubmit} componentName="Modificar datos">
          <p>{this.state.message}</p>
        </ExitConfirmation>
        <ExitConfirmation show={this.state.showExit} hide={() => { this.setState({ showExit: !this.state.showExit }); }} accept={() => { history.goBack(); }} componentName="Salir">
          <p>{this.state.message}</p>
        </ExitConfirmation>
        <ExitConfirmation show={this.state.showDelete} hide={() => { this.setState({ showDelete: !this.state.showDelete }); }} accept={this.handleSubmitDelete} componentName="Eliminar camara">
          <p>{this.state.message}</p>
        </ExitConfirmation>
      </Panel>
    );
  }
}

ConfigurationCamera.propTypes = {
  label: PropTypes.string,
  deleteCamera: PropTypes.func,
  modifyCamera: PropTypes.func,
  match: PropTypes.object,
};

export default ConfigurationCamera;
