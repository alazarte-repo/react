import React from 'react';
import PropTypes from 'prop-types';
import SolidMationLogo from 'images/solidmation-logo.png';
import ConfigItem from '../../../components/ConfigItem';
import './AccountOptions.scss';

const AccountOptions = ({ unlinkAccount, sync, username }) => (
  <div className="account-options">
    <img src={SolidMationLogo} alt="Solidmation" />

    <div className="username-box">
      <p className="help-text">
        Completá los datos de la cuenta de Solidmation para
        unir tus casas con la cuenta de Strix
      </p>

      <div className="username-text">
        <span> { username } </span>
      </div>
    </div>
    <div className="config-item-container">
      <ConfigItem
        label={'Volver a sincronizar dispositivos'}
        onClick={sync}
        type="function"
      />
      <ConfigItem
        label={'Desvincular cuenta'}
        onClick={unlinkAccount}
        type="function"
      />
    </div>
  </div>
);

AccountOptions.propTypes = {
  unlinkAccount: PropTypes.func.isRequired,
  sync: PropTypes.func.isRequired,
  username: PropTypes.string,
};

export default AccountOptions;
