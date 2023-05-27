import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HomeList from './HomeList';
import HomeDetails from './HomeDetails';
import DragTutorial from './DragTutorial';
import OkCancel from '../../Modals/OkCancel';
import './HomePairing.scss';

const HomePairingScreens = Object.freeze({
  Tutorial: 'tutorial',
  Pair: 'pair',
  Details: 'details',
});

class HomePairing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      secondHome: null,
      firstHome: null,
    };

    this.onDrop = this.onDrop.bind(this);
    this.cancelPairing = this.cancelPairing.bind(this);
    this.pairHomes = this.pairHomes.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const strixHomes = this.props.homeList.magenta_homes;
    const solidmationHomes = this.props.homeList.solidmation_homes;
    // If there is only one pair of homes, we pair them
    if (strixHomes.length === 1 &&
        solidmationHomes.length === 1 &&
        this.props.screen !== HomePairingScreens.Pair &&
        nextProps.screen === HomePairingScreens.Pair) {
      this.onDrop(solidmationHomes[0], strixHomes[0]);
    }
  }

  onDrop(secondHome, firstHome) {
    if (secondHome.origin === firstHome.origin) {
      return;
    }

    this.setState({
      showModal: true,
      secondHome,
      firstHome,
    });
  }

  cancelPairing() {
    this.setState({
      showModal: false,
      secondHome: null,
      firstHome: null,
    });
  }

  pairHomes() {
    this.props.pairHomes(this.state.firstHome, this.state.secondHome);
  }

  render() {
    const strixHomes = this.props.homeList.magenta_homes;
    const solidmationHomes = this.props.homeList.solidmation_homes;
    return (
      <div className="home-pairing">
        {
          this.props.screen === HomePairingScreens.Tutorial &&
          <DragTutorial onClickNext={this.props.skipTutorial} />
        }
        {
          this.props.screen === HomePairingScreens.Pair &&
          <HomeList
            firstList={solidmationHomes}
            secondList={strixHomes}
            onDrop={this.onDrop}
          />
        }
        {
          this.props.screen === HomePairingScreens.Details &&
          <HomeDetails
            label={this.props.homeDetail.label}
            list={this.props.homeDetail.children}
            onClickNext={this.props.onClickNext}
          />
        }

        <OkCancel
          show={this.state.showModal}
          accept={this.pairHomes}
          hide={this.cancelPairing}
          title={'Vincular casas'}
        >
          <p>
            ¿Desea vincular <span className="color-primary-color"> {this.state.secondHome ? this.state.secondHome.label : ''} </span>
            con <span className="color-primary-color"> {this.state.firstHome ? this.state.firstHome.label : ''} </span>?
          </p>
        </OkCancel>
      </div>

    );
  }
}

HomePairing.propTypes = {
  pairHomes: PropTypes.func,
  skipTutorial: PropTypes.func,
  onClickNext: PropTypes.func,
  screen: PropTypes.string,
  homeList: PropTypes.object,
  homeDetail: PropTypes.object,
};

export default HomePairing;
export { HomePairingScreens };
