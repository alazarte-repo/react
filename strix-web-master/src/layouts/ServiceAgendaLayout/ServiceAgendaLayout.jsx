import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Switch, Route, Link } from 'react-router-dom';
import Panel from '../../components/Panel';
import Tabs from '../../containers/ServiceAgenda';
import WorkingScreen from '../../components/WorkingScreen';
import './styles.scss';

class ServiceAgenda extends React.Component {
  componentWillMount() {
    this.props.getReminders(this.props.thingId);
  }

  componentWillUnmount() {
    this.props.remidersReset();
  }

  linkPath = () => {
    const leftRender = this.props.path.split('/')[1];
    return (`/${leftRender}/things/${this.props.thingId}`);
  }

  render() {
    const leftRender = this.props.path.split('/')[1];
    return (
      <Panel>
        <div className="service-agenda-header">
          <div className="service-agenda-title">
            <Link
              to={`/${leftRender}/things/${this.props.thingId}`}
            >
              <i className="icon icon-arrow" />
            </Link>
            <h2>Agenda de servicios</h2>
          </div>
        </div>
        <Panel.Body>
          <div className="acum-mileage-container">
            <h4>Kilometraje Acumulado</h4>
            <span> {this.props.mileage.toLocaleString('es-AR')} km</span>
          </div>
          <div className="tabs-container">
            <NavLink
              to={`/${leftRender}/things/${this.props.thingId}/services`}
              exact
              className="tablinks"
              activeClassName="active"
            >
                Servicios
            </NavLink>
            <NavLink
              to={`/${leftRender}/things/${this.props.thingId}/services/register`}
              className="tablinks"
              onClick={this.linkPath}
              activeClassName="active"
            >
              Registro
            </NavLink>
            <NavLink
              to={`/${leftRender}/things/${this.props.thingId}/services/history`}
              className="tablinks"
              activeClassName="active"
            >
                Historial
            </NavLink>
          </div>
          <div className="selected-container">
            {
              this.props.loading &&
              <div className="loading">
                <WorkingScreen message="Cargando servicios..." />
              </div>
            }
            {
              !this.props.loading &&
              <Switch>
                <Route
                  exact
                  path={`/${leftRender}/things/:thingId/services`}
                  component={Tabs.ServicesTab}
                />
                <Route
                  path={`/${leftRender}/things/:thingId/services/history`}
                  component={Tabs.HistoryTab}
                />
                <Route
                  path={`/${leftRender}/things/:thingId/services/register`}
                  component={Tabs.RegisterTab}
                />
              </Switch>
            }
          </div>
        </Panel.Body>
      </Panel>
    );
  }
}

ServiceAgenda.propTypes = {
  path: PropTypes.string,
  thingId: PropTypes.string,
  mileage: PropTypes.number,
  loading: PropTypes.bool,
  getReminders: PropTypes.func,
  remidersReset: PropTypes.func,
};

export default ServiceAgenda;
