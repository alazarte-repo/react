import React from 'react';
import AppStore from 'images/appstore.png';
import GooglePlay from 'images/googleplay.png';
import VersionWeb from 'images/versionweb.png';

import './ForgotPasswordSuccessful.scss';


function ForgotPasswordSucessful() {
  return (
    <div className="forgot-password-container-successful">
      <p>Constraseña creada con exito. Ya podes comenzar a usar Strix nuevamente!</p>
      <div className="apps-container">
        <a href="https://itunes.apple.com/us/app/strix/id1326932279?mt=8" className="app-store" target="_blank" rel="noopener noreferrer">
          <img src={AppStore} alt="App Store" />
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.lojack.strix.free.release" className="play-store" target="_blank" rel="noopener noreferrer">
          <img src={GooglePlay} alt="Google Play" />
        </a>
        <a href="/login"><img src={VersionWeb} alt="Version Web" /></a>
      </div>
    </div>
  );
}

export default ForgotPasswordSucessful;
