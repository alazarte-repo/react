
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { SAVED_CAMERA_THUMBNAILS } from '../../constants/localStorageKeys';
import './CameraStream.scss';

class CameraStreamModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbBackgroundStyle: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cameraId === this.props.cameraId) {
      return;
    }

    let savedThumbs = localStorage.getItem(SAVED_CAMERA_THUMBNAILS);
    savedThumbs = savedThumbs == null ? {} : JSON.parse(savedThumbs);

    let thumbBackgroundStyle;
    if (nextProps.cameraId in savedThumbs) {
      thumbBackgroundStyle = {
        backgroundImage: `url(${savedThumbs[nextProps.cameraId]})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
      };
    } else {
      thumbBackgroundStyle = {};
    }

    this.setState({ thumbBackgroundStyle });
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} className="motion-sensor-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            { this.props.title }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-sensor-body" style={this.state.thumbBackgroundStyle}>
          {
            this.props.loading &&
            <div className="icon-container">
              <i className="icon icon-spinner icon-spin loading-icon" />
            </div>
          }
          {
            !this.props.loading &&
            <ReactPlayer
              style={{ backgroundColor: '#000' }}
              width="100%"
              height="100%"
              url={this.props.streamLink}
              playing={this.props.playing}
              config={{
                file: { forceHLS: true },
              }}
            />
          }

        </Modal.Body>
      </Modal>
    );
  }
}

CameraStreamModal.propTypes = {
  show: PropTypes.bool,
  loading: PropTypes.bool,
  playing: PropTypes.bool,
  onHide: PropTypes.func,
  title: PropTypes.string,
  cameraId: PropTypes.string,
  streamLink: PropTypes.string,
};


export default CameraStreamModal;
