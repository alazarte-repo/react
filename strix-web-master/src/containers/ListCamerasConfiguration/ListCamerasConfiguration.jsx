import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Panel from '../../components/Panel';
import ConfigItem from '../../components/ConfigItem';


class ListCamerasConfiguration extends Component {
  componentWillMount() {
    this.props.getCameras(this.props.cameraIds);
  }

  render() {
    return (
      <Panel>
        <Panel.Header title="Cámaras activas" />
        <Panel.Body
          className="things-config-container"
          style={{ flexGrow: 1, backgroundColor: 'white' }}
        >
          <div className="config-item-container" >
            {
              this.props.camerasInfo &&
              this.props.camerasInfo.map(camera => (
                <ConfigItem
                  key={camera.id}
                  label={camera.label}
                  valuesLabel
                  link={`/configuration/camera/${this.props.match.params.thingId}/${camera.id}`}
                />
              ))
            }
          </div>
        </Panel.Body>
      </Panel>
    );
  }
}

ListCamerasConfiguration.propTypes = {
  getCameras: PropTypes.func,
  cameraIds: PropTypes.array,
  camerasInfo: PropTypes.array,
  match: PropTypes.object,
};

export default ListCamerasConfiguration;
