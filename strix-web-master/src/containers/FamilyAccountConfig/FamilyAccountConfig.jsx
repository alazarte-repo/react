import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import userIcon from 'images/addUser.svg';
import PropTypes from 'prop-types';
import { history } from '../../store';
import { ExitConfirmation } from '../../components/Modals';
import Panel from '../../components/Panel';
import Spinner from '../../components/Spinner';
import { PrimaryColor } from '../../constants/colors';
import './styles.scss';

const MAX_USERS = 5;

const AddUserButton = disabled => (
  <div className={`circle add-user ${disabled ? 'disabled' : ''}`}>
    <img alt="user-icon" src={userIcon} />
    <span>Agregar familiar</span>
  </div>
);

const UserItem = ({ user, isAdmin, handleDelete }) => (
  <div>
    <div className="user-icon" />
    <Link
      className="user-item"
      to={isAdmin ? `/configuration/family-account/modify/${user.id}` : '#'}
    >
      <span>{`${user.first_name} ${user.last_name}`}</span>
    </Link>
    {
      isAdmin &&
      <i
        onClick={() => handleDelete(user)}
        className="icon icon-multiply"
      />
    }
  </div>
);

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
};

class FamilyAccountConfig extends Component {
  static getDerivedStateFromProps(props) {
    return ({
      familyUsers: Object.keys(props.user).length === 0
        ? []
        : props.familyUsers.filter(user => user.id !== props.user.id),
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      userToDelete: null,
    };

    this.maxUsersTooltip = (
      <Tooltip id="tooltip">
        Has alcanzado el limite de usuarios que puedes añadir
      </Tooltip>
    );

    // Bindings
    this.handleDisable = this.handleDisable.bind(this);
    this.setForDeleting = this.setForDeleting.bind(this);
    this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);

    props.getFamilyUsers('');
  }

  componentWillUnmount() {
    this.props.resetAddUserError();
  }

  setForDeleting(user) {
    this.setState({ userToDelete: user });
  }

  get canAddMoreUsers() {
    return this.state.familyUsers.length < MAX_USERS;
  }

  handleDeleteSubmit(id) {
    this.props.deleteFamilyUser(id);
    this.setForDeleting(null);
  }

  handleDisable() {
    if (this.canAddMoreUsers) {
      history.push('/configuration/family-account/add');
    }
  }

  render() {
    const candAddUsers = this.canAddMoreUsers;
    const overlayedClass = !candAddUsers ? 'overlayed' : '';
    const showDeleteModal = this.state.userToDelete != null;
    const isAdmin = this.props.user.accountType === 'account_admin';
    return (
      <Fragment>
        <Panel>
          <Panel.Header title="Cuenta familiar" />
          <Panel.Body className="family-account">
            {
              isAdmin &&
              <Fragment>
                <span className="title">
                  Invita hasta 5 miembros de tu familia
                </span>
                <p>
                  Podés configurar permisos sobre cada uno
                  de los servicios para compartirla con tu familia
                </p>
                <a
                  onClick={this.handleDisable}
                  className={overlayedClass}
                  disabled={!candAddUsers}
                >
                  {
                    !candAddUsers &&
                    <OverlayTrigger placement="left" overlay={this.maxUsersTooltip}>
                      { AddUserButton(!candAddUsers) }
                    </OverlayTrigger>
                  }
                  { candAddUsers && AddUserButton(!candAddUsers) }
                </a>
              </Fragment>
            }
            {
              this.state.familyUsers
                .map(user => (
                  <UserItem
                    user={user}
                    key={user.id}
                    isAdmin={isAdmin}
                    handleDelete={this.setForDeleting}
                  />
                ))
            }
            {
              this.props.loading &&
              <div style={{ padding: '3px 30px' }}>
                <Spinner style={{ width: 'auto' }} color={PrimaryColor} fontSize="30pt" />
                <span style={{ marginLeft: '25px' }}> Cargando nuevo usuario... </span>
              </div>
            }
          </Panel.Body>
          {
            this.props.error &&
            <Panel.Footer style={{ position: 'relative' }}>
              <span className="close-cross" onClick={this.props.resetAddUserError}>✖</span>
              <div style={{ textAlign: 'center', padding: '15px 30px', fontWeight: 'bolder' }}>
                { this.props.error }
              </div>
            </Panel.Footer>
          }
        </Panel>
        {
          <ExitConfirmation
            show={this.state.userToDelete != null}
            hide={() => this.setForDeleting(null)}
            accept={() => this.handleDeleteSubmit(this.state.userToDelete.id)}
            componentName="Eliminar usuario"
          >
            {
              showDeleteModal &&
              <p>{`¿Estás seguro de que deseas eliminar a ${this.state.userToDelete.first_name}?`}</p>
            }
          </ExitConfirmation>
        }
      </Fragment>
    );
  }
}

FamilyAccountConfig.propTypes = {
  getFamilyUsers: PropTypes.func,
  deleteFamilyUser: PropTypes.func,
  resetAddUserError: PropTypes.func,
  user: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool,
};

FamilyAccountConfig.defaultProps = {
  familyUsers: [],
};

export default FamilyAccountConfig;
