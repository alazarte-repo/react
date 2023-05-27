/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CameraStatus from '../../../../../constants/cameraStatus';
import CameraStreamModal from '../../../../../components/Modals/CameraStream';
import CameraThumbnail from './CameraThumbnail'
import './styles.scss';

class ThumnailsSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      loadingStream: false,
      playing: false,
      cameraLabel: '',
      cameraStreamLink: '',
      cameraId: '',
    }
  }

  componentWillMount() {
    this.props.getCameras(this.props.cameras);
  }

  handleClick = (camera) => {
    if (camera.status === CameraStatus.Offline ||
        camera.status === CameraStatus.Loading) {
      this.props.notifyError('La cámara no está disponible');
      return;
    }

    this.props.onOpenStream();
    const label = camera.label;
    const hlsUrl = camera.urls.live_stream_hls_url;
    this.setState({
      show: true,
      loadingStream: true,
      cameraLabel: label,
      cameraId: camera.id,
    },
      () => axios.get(hlsUrl)
        .then(response => this.setState({
          cameraStreamLink: response.request.responseURL,
          loadingStream: false,
          playing: true,
        })
      )
    );
  }

  handleHide = () => {
    this.setState({
      show: false,
      playing: false,
      cameraLabel: '',
      cameraStreamLink: ''
    });
  }

  render() {
    return (
        <div className="camera-segment">
          {
            this.props.expanded &&
            <div className="header">
              <p className="title">Cámaras</p>
            </div>
          }
          <div className="thumbnails-container">
          {
            this.props.camerasInfo.map(camera => (
              <CameraThumbnail
                onClick={() => this.handleClick(camera)}
                key={camera.id}
                camera={camera}
              />
            ))
          }
        </div>
        <CameraStreamModal
          cameraId={this.state.cameraId}
          show={this.state.show}
          onHide={this.handleHide}
          title={this.state.cameraLabel}
          loading={this.state.loadingStream}
          streamLink={this.state.cameraStreamLink}
          playing={this.state.playing}
        />
      </div>
    );
  }
}

ThumnailsSection.propTypes = {
  cameras: PropTypes.array,
  camerasInfo: PropTypes.array,
  expanded: PropTypes.bool,
  getCameras: PropTypes.func,
  onOpenStream: PropTypes.func,
  notifyError: PropTypes.func,
};

export default ThumnailsSection;

