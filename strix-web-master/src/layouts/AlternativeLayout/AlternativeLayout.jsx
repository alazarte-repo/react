import React from 'react';
import PropTypes from 'prop-types';
import TopBar from '../../components/TopBar';
import Footer from '../../components/Footer';
import Spinner from '../../components/Spinner';
import './AlternativeLayout.scss';

function AlternativeLayout(props) {
  return (
    <div className="main-layout-container">
      <TopBar />
      <div className="main-layout-inner-container">
        <div className="main-layout-content-container">
          <div className="main-layout-content">
            <div className=" landing-image-bg" />
            <div className="alternative-layout-content-column grey-container">
              { props.isLoading ? <Spinner /> : props.children }
            </div>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

AlternativeLayout.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]),
};

export default AlternativeLayout;
