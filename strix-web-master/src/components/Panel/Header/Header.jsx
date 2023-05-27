import React from 'react';
import PropTypes from 'prop-types';
import { history } from '../../../store';
import './styles.scss';

function Header(props) {
  return (
    <div className="custom-panel-header">
      {
        props.backArrow &&
        <a
          className="back-arrow"
          onClick={props.onClickBack ? props.onClickBack : history.goBack}
        >
          <i className="icon icon-arrow" />
        </a>
      }
      <h2>{ props.title }</h2>
      <div>
        { props.children }
      </div>

    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  onClickBack: PropTypes.func,
  backArrow: PropTypes.bool,
};

export default Header;
