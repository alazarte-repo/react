import React from 'react';
import PropTypes from 'prop-types';
import ThingSettings from '../../components/ThingSettings';


class ThingConfigurationPanel extends React.Component {
  componentWillMount() {
    if (this.props.thingId != null) {
      this.props.getPreferences(this.props.thingId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.thingId !== this.props.thingId && !nextProps.thingPreferences) {
      this.props.getPreferences(nextProps.thingId);
    }
  }

  render() {
    if (this.props.type != null) {
      const SettingsByType = ThingSettings[this.props.type];
      return (
        <div className="configuration-panel">
          <SettingsByType {...this.props} />
        </div>
      );
    }
    return (
      <div className="configuration-panel" />
    );
  }
}

ThingConfigurationPanel.propTypes = {
  type: PropTypes.string,
  getPreferences: PropTypes.func,
  thingId: PropTypes.string,
  thingPreferences: PropTypes.object,
};

export default ThingConfigurationPanel;
