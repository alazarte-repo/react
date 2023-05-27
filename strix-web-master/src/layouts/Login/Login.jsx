import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import AppStore from 'images/appstore.png';
import GooglePlay from 'images/googleplay.png';
import StrixLogo from 'images/strix-logo-banner.png';
import Carousel from '../../components/Carousel';
import FormLogin from '../../containers/FormLogin';
import ForgotPassSuccess from '../../components/ForgotPassSuccess';
import ForgotPasswordEmailForm from '../../containers/ForgotPasswordEmailForm';
import './Login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lostPassword: this.props.lostPassword,
    };
  }

  componentDidMount() {
    this.props.sendLoginShownAnalyticsEvent();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lostPassword && nextProps.lostPassword !== this.state.lostPassword) {
      this.setState({
        lostPassword: nextProps.lostPassword,
      });
    }
  }

  handleLostPassword = (str) => {
    this.setState({ lostPassword: str });
  }

  elementToRender = (str) => {
    switch (str) {
      case 'emailForm':
        return (<ForgotPasswordEmailForm lostPassword={this.handleLostPassword} />);
      case 'forgotPassEmailSuccess':
        return (<ForgotPassSuccess lostPassword={this.handleLostPassword} />);
      default:
        return (<FormLogin lostPassword={this.handleLostPassword} />);
    }
  }

  render() {
    return (
      <Grid className="full-container app-container" fluid>
        <Row >
          <Col className="landing-image no-padding" xsHidden smHidden md={8} lg={9}>
            <Carousel />
            <div className="apps-link-containers">
              <a href="https://itunes.apple.com/us/app/strix/id1326932279?mt=8" className="app-store" target="_blank" rel="noopener noreferrer">
                <img src={AppStore} alt="App Store" />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.lojack.strix.free.release" className="play-store" target="_blank" rel="noopener noreferrer">
                <img src={GooglePlay} alt="Google Play" />
              </a>
            </div>
          </Col>
          <Col className="landing-login no-padding" sm={12} md={4} lg={3}>
            <div className="banner">
              <Image src={StrixLogo} />
              <span className="welcome-text">Bienvenido a STRIX</span>
            </div>
            <div className="content">
              {this.elementToRender(this.state.lostPassword)}
            </div>
            <div className="know-more">
              <a
                href="https://www.strix.com.ar/integral"
                target="_blank"
                rel="noopener noreferrer"
              >
                Quiero saber más de Strix
              </a>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

Login.propTypes = {
  lostPassword: PropTypes.string,
  sendLoginShownAnalyticsEvent: PropTypes.func,
};

export default Login;

