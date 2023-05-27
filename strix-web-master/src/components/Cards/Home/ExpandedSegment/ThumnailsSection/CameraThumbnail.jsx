import React, { Component } from 'react';
import noConnectionImage from 'images/SinConexion_Camaras.png';
import PropTypes from 'prop-types';
import CameraStatus from '../../../../../constants/cameraStatus';
import WorkingIcon from '../../../../../components/WorkingIcon';
import { SAVED_CAMERA_THUMBNAILS } from '../../../../../constants/localStorageKeys';

class CameraThumbnail extends Component {
  constructor(props) {
    super(props);

    this.cachedImage = null;
    this.alreadyCached = false;
    this.saveImageToCache = this.saveImageToCache.bind(this);
    this.getCameraThumbnail = this.getCameraThumbnail.bind(this);

    this.imagesRef = {};
  }

  getCameraThumbnail() {
    if (this.cachedImage == null) {
      let savedThumbs = localStorage.getItem(SAVED_CAMERA_THUMBNAILS);
      savedThumbs = savedThumbs == null ? {} : JSON.parse(savedThumbs);
      this.cachedImage = this.props.camera.id in savedThumbs
        ? savedThumbs[this.props.camera.id]
        : noConnectionImage;
    }

    return this.cachedImage;
  }

  saveImageToCache() {
    if (!this.alreadyCached) {
      const imgCanvas = document.createElement('canvas');
      const imgContext = imgCanvas.getContext('2d');
      const imageRef = this.imagesRef[this.props.camera.id];
      imageRef.setAttribute('crossOrigin', 'anonymous');

      // Make sure canvas is as big as the picture
      imgCanvas.width = imageRef.width;
      imgCanvas.height = imageRef.height;

      // Draw image into canvas element
      imgContext.drawImage(imageRef, 0, 0, imgCanvas.width, imgCanvas.height);

      // Get canvas contents as a data URL
      const imgAsDataURL = imgCanvas.toDataURL('image/png');

      // Save image into localStorage
      try {
        let savedThumbs = localStorage.getItem(SAVED_CAMERA_THUMBNAILS);
        savedThumbs = savedThumbs == null ? {} : JSON.parse(savedThumbs);
        savedThumbs[this.props.camera.id] = imgAsDataURL;
        localStorage.setItem(SAVED_CAMERA_THUMBNAILS, JSON.stringify(savedThumbs));
        this.alreadyCached = true;
      } catch (e) {
        // Nothing to do if it fails
      }
    }
  }

  // TODO Put switch inside <div className="camera-thumbnail"... and use <Fragment
  // when update to ract 16 is complete (prevent repeating code)
  render() {
    switch (this.props.camera.status) {
      case CameraStatus.Loading:
        return (
          <div className="camera-thumbnail" onClick={this.props.onClick}>
            <WorkingIcon
              message=""
              width="196px"
              height="106px"
              textSize="16pt"
              spinnerSize="20pt"
              textSeparation="0px"
              spinnerColor="#565656"
              backgroundColor="#a7a7a7"
            />
            <span>{this.props.camera.label}</span>
          </div>
        );
      case CameraStatus.Online:
        return (
          <div className="camera-thumbnail" onClick={this.props.onClick}>
            <img
              crossOrigin="anonymous"
              ref={(node) => { this.imagesRef[this.props.camera.id] = node; }}
              onLoad={this.saveImageToCache}
              src={this.props.camera.urls.live_preview_url}
              alt={this.props.camera.label}
            />
            <span>{this.props.camera.label}</span>
          </div>
        );
      case CameraStatus.Offline:
      default:
        return (
          <div className="camera-thumbnail" onClick={this.props.onClick}>
            <img
              crossOrigin="anonymous"
              ref={(node) => { this.imagesRef[this.props.camera.id] = node; }}
              src={this.getCameraThumbnail()}
              alt={this.props.camera.label}
              style={{ filter: 'grayscale(100%)', opacity: '0.45' }}
            />

            <i className={'icon icon-blocked'} />
            <span className="no-connection-label"> Sin conexión </span>
            <span>{this.props.camera.label}</span>
          </div>
        );
    }
  }
}

CameraThumbnail.propTypes = {
  camera: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default CameraThumbnail;
