import React from 'react';
import AppStore from 'images/appstore.png';
import GooglePlay from 'images/googleplay.png';
import VersionWeb from 'images/versionweb.png';
import { Link } from 'react-router-dom';

import './RegisterSuccessful.scss';


function RegisterSuccessful() {
  return (
    <div className="register-container-successful">
      <p>¡Ya podes comenzar a usar Strix!</p>
      <div className="apps-container">
        <a href="https://itunes.apple.com/us/app/strix/id1326932279?mt=8" className="app-store" target="_blank" rel="noopener noreferrer">
          <img src={AppStore} alt="App Store" />
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.lojack.strix.free.release" className="play-store" target="_blank" rel="noopener noreferrer">
          <img src={GooglePlay} alt="Google Play" />
        </a>
        <Link to="/dashboard" href="#" className="web-version"><img src={VersionWeb} alt="Version Web" /></Link>
      </div>
    </div>
  );
}

export default RegisterSuccessful;
