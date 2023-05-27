import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TopBar from '../../components/TopBar';
import Menu from '../../containers/MenuPanel';
import Footer from '../../components/Footer';
import Notifications from '../../containers/Notifications';
import UserInfo from '../../containers/UserInfo';
import Toast from '../../components/Toast';
import InformationBar, {
  InformationBarTypes,
  InformationBarAction,
} from '../../components/InformationBar';
import './styles.scss';

class MainLayout extends PureComponent {
  constructor(props) {
    super(props);
    this.offlineFunctions = [
      new InformationBarAction('icon-refresh', props.forceRefresh),
    ];
  }

  render() {
    return (
      <div className="main-layout-container">
        <TopBar>
          <UserInfo />
          <Notifications />
        </TopBar>
        <div className="main-layout-inner-container">
          <div className="main-layout-menu">
            <Menu />
          </div>

          <div className="main-layout-content-container">
            {
              this.props.isAppOffline &&
              <InformationBar
                icon="icon-no-connection"
                text="El dispositivo está desconectado."
                type={InformationBarTypes.Error}
                actions={this.offlineFunctions}
              />
            }
            { this.props.children }
            <div><Footer /></div>
          </div>
        </div>
        <Toast {...this.props} />
      </div>
    );
  }
}

MainLayout.propTypes = {
  isAppOffline: PropTypes.bool,
  children: PropTypes.object,
  forceRefresh: PropTypes.func.isRequired,
};

MainLayout.defaultProps = {
  isAppOffline: false,
};

export default MainLayout;
