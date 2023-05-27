import React, { Component, Fragment } from 'react';
import AlternativeLayout from '../AlternativeLayout';
import Spinner from '../../components/Spinner';
import { MobileClients, getMobileOS, isMobile as checkMobile } from '../../utils/systemUtils';
import './GetApp.scss';

const isMobile = checkMobile();
const mobileOS = getMobileOS();

const acceptedClients = [MobileClients.Android, MobileClients.IOS];

class GetApp extends Component {
  componentDidMount() {
    if (isMobile) {
      switch (mobileOS) {
        case MobileClients.Android:
          window.location.replace('https://play.google.com/store/apps/details?id=com.lojack.strix.free.release');
          break;
        case MobileClients.IOS:
          window.location.replace('https://apps.apple.com/us/app/strix/id1326932279');
          break;
        default:
          break;
      }
    } else {
      // If it is not a mobile device, go to root
      window.location.replace('/');
    }
  }

  render() {
    return (
      <AlternativeLayout>
        <div className="getapp-container">
          {
            isMobile &&
              <Fragment>
                {
                  acceptedClients.includes(mobileOS)
                    ? <Fragment>
                      <h4>Aguarde unos instantes mientras nos dirigimos a la tienda...</h4>
                      <Spinner style={{ height: 'auto', marginTop: '50px' }} />
                    </Fragment>
                    : <Fragment>
                      <h4>Su dispositivo móvil no está soportado.</h4>
                    </Fragment>
                }
              </Fragment>
          }
          {
            !isMobile &&
              <Fragment>
                <p> Haga click <a href="/">aquí</a> para ir a la pantalla de autenticación.</p>
              </Fragment>
          }
        </div>
      </AlternativeLayout>
    );
  }
}

export default GetApp;
