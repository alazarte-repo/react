import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SolidMationLogo from 'images/solidmation-logo.png';
import ServiceStatus from '../../constants/thirdPartyServiceStatus';
import ThirdPartyLogin from '../../components/ThirdPartyLogin';
import WorkingScreen from '../../components/WorkingScreen';
import { HomePairing, HomePairingScreens, AccountOptions } from '../../components/SolidMation';
import './HomeControlConfig.scss';

const HomeControlScreens = Object.freeze({
  Main: 'main',
  Pair: 'pair',
});

class HomeControlConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: HomeControlScreens.Main,
      homePairingScreen: HomePairingScreens.Tutorial,
      workingMessage: null,
    };

    this.unlinkSodlimationAccount = this.unlinkSodlimationAccount.bind(this);
    this.solidmationSyncHomes = this.solidmationSyncHomes.bind(this);
    this.solidmationPairHomes = this.solidmationPairHomes.bind(this);
    this.setHomePairingScreen = this.setHomePairingScreen.bind(this);
    this.finishedPairingNext = this.finishedPairingNext.bind(this);
    this.skipTutorial = this.skipTutorial.bind(this);
  }

  componentWillMount() {
    this.props.solidmationGetStatus();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.status !== ServiceStatus.RecentLogin &&
        nextProps.status === ServiceStatus.RecentLogin) {
      this.setScreen(HomeControlScreens.Pair);
      this.setHomePairingScreen(HomePairingScreens.Tutorial);
    }
  }

  setHomePairingScreen(screen) {
    this.setState({ homePairingScreen: screen });
  }

  setScreen(screen) {
    this.setState({ screen });
  }

  solidmationSyncHomes() {
    this.setState({
      workingMessage: 'Sincronizando casas...',
    }, () => {
      this.props.solidmationSyncHomes();
    });
  }

  solidmationPairHomes(magentaId, solidmationId) {
    this.setState({
      workingMessage: 'Aguarde unos minutos mientras se vinculan las casas',
    }, () => {
      this.props.solidmationPairHomes(magentaId, solidmationId);
      this.setHomePairingScreen(HomePairingScreens.Details);
    });
  }

  unlinkSodlimationAccount() {
    this.setState({
      workingMessage: 'Desvinculando la cuenta...',
    }, this.props.solidmationUnlinkAccount);
  }

  finishedPairingNext() {
    const strixHomesSize = this.props.homeList.magenta_homes.length;
    const solidmationHomesSize = this.props.homeList.solidmation_homes.length;
    if (strixHomesSize > 0 && solidmationHomesSize > 0) {
      this.setHomePairingScreen(HomePairingScreens.Pair);
    } else {
      this.setScreen(HomeControlScreens.Main);
    }
  }

  skipTutorial() {
    this.setHomePairingScreen(HomePairingScreens.Pair);
  }

  render() {
    const homeDetail = this.props.homeDetail == null ? {} : this.props.homeDetail;
    return (
      <div className="things-config-container home-control-config-container">
        <div className="title-container" >
          <a onClick={this.props.history.goBack} className="back-arrow">
            <i className="icon icon-arrow" />
          </a>
          <h1 className="title-right-panel"> Control del hogar </h1>
        </div>
        {
          this.props.status === ServiceStatus.Unknown &&
          <WorkingScreen message="Cargando..." />
        }
        {
          (this.props.status === ServiceStatus.NotLogged ||
           this.props.status === ServiceStatus.LoggingIn) &&
           <ThirdPartyLogin
             errorMessage={this.props.errorMessage}
             helpText="Completá los datos de la cuenta de Solidmation para
                       unir tus casas con la cuenta de Strix."
             logo={SolidMationLogo}
             login={this.props.solidmationLogin}
             loggingIn={this.props.status === ServiceStatus.LoggingIn}
           />
        }
        {
          (this.props.status === ServiceStatus.RecentLogin ||
          (this.props.status === ServiceStatus.Logged &&
           this.state.screen === HomeControlScreens.Pair)) &&
           <HomePairing
             homeList={this.props.homeList}
             homeDetail={homeDetail}
             screen={this.state.homePairingScreen}
             pairHomes={this.solidmationPairHomes}
             setScreen={this.setHomePairingScreen}
             onClickNext={this.finishedPairingNext}
             skipTutorial={this.skipTutorial}
           />
        }
        {
          this.props.status === ServiceStatus.Logged &&
          this.state.screen === HomeControlScreens.Main &&
          <AccountOptions
            username={this.props.username}
            unlinkAccount={this.unlinkSodlimationAccount}
            sync={this.solidmationSyncHomes}
          />
        }
        {
          this.props.status === ServiceStatus.Working &&
          <WorkingScreen message={this.state.workingMessage || 'Cargando...'} />
        }
      </div>
    );
  }
}

HomeControlConfig.propTypes = {
  solidmationGetStatus: PropTypes.func,
  solidmationUnlinkAccount: PropTypes.func,
  solidmationSyncHomes: PropTypes.func,
  solidmationPairHomes: PropTypes.func,
  solidmationLogin: PropTypes.func,
  status: PropTypes.string,
  errorMessage: PropTypes.string,
  username: PropTypes.string,
  homeList: PropTypes.object,
  homeDetail: PropTypes.object,
  history: PropTypes.object,
};

export default HomeControlConfig;

