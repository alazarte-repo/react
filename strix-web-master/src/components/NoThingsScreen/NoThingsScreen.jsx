import React, { Fragment } from 'react';
import { Carousel as BsCarousel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import BannerIconOne from 'images/empty-state/web/icon_banner_1.png';
import BannerIconTwo from 'images/empty-state/web/icon_banner_2.png';
import AppStore from 'images/appstore@2x.png';
import GooglePlay from 'images/googleplay@2x.png';
import AdvertisingBanner from '../../components/AdvertisingBanner';
import './NoThingsScreen.scss';

const NoThingsScreen = () => (
  <Fragment>
    <div className="no-things-screen">
      <BsCarousel
        className="no-things-carousel"
        interval={null}
      >
        <BsCarousel.Item className="carousel-item" >
          <div className="empty-screen-item">
            <h4> Disfruta de nuestros servicios gratuitos </h4>
            <div className="icon">
              <img src={BannerIconOne} alt="escolta" />
              <span>Escolta virtual</span>
            </div>
            <p>
              Te va a permitir sentirte seguro al momento de ingresar a tu casa y
              notificar a algún miembro de tu cuenta familiar en caso de necesitar
              asistencia
            </p>
          </div>
        </BsCarousel.Item>
        <BsCarousel.Item className="carousel-item" >
          <div className="empty-screen-item">
            <h4> Disfruta de nuestros servicios gratuitos </h4>
            <div className="icon">
              <img src={BannerIconTwo} alt="escolta" />
              <span>Seguimiento</span>
            </div>
            <p>
              Te va a permitir compartir tu ubicación en tiempo real con todos los
              miembros de tu cuenta familiar.
            </p>
          </div>
        </BsCarousel.Item>
      </BsCarousel>
      <div className="apps-link-containers">
        <a href="https://play.google.com/store/apps/details?id=com.lojack.strix.free.release" className="play-store" target="_blank" rel="noopener noreferrer">
          <img src={GooglePlay} alt="Google Play" width="200px" />
        </a>
        <a href="https://itunes.apple.com/us/app/strix/id1326932279?mt=8" className="app-store" target="_blank" rel="noopener noreferrer">
          <img src={AppStore} alt="App Store" width="200px" />
        </a>
      </div>
    </div>
    <AdvertisingBanner
      className="bottom-banner"
      image={GooglePlay}
      showCloseButton={false}
      show
    />
  </Fragment>
);

NoThingsScreen.propTypes = {
  link: PropTypes.string,
};

export default NoThingsScreen;
