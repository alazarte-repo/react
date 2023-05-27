import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ConfigurationListItem from '../../components/ConfigurationListItem';
import { getIconClass } from '../../utils/things';


const staticConfiguration = [
  {
    name: 'Zonas Seguras',
    id: 'geofences-config',
    url: '/configuration/geofences-config',
  },
  {
    name: 'Cuenta familiar',
    id: 'family-account',
    url: '/configuration/family-account',
  },
];

class ConfigurationPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      things: [],
      selectedItem: null,
    };

    this.onItemClick = this.onItemClick.bind(this);
  }

  componentWillMount() {
    this.setState({ things: this._getThingsItems(this.props.thingsProps) });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.thingsProps.length !== nextProps.thingsProps.length) {
      this.setState({ things: this._getThingsItems(nextProps.thingsProps) });
    }
  }

  componentWillUnmount() {
    this.props.resetPreferences();
  }

  onItemClick(item) {
    this.setState({ selectedItem: item.id });
  }

  _getThingsItems = things => (
    things.map((thing) => {
      const item = Object.assign({}, thing);
      item.icon = getIconClass(item.type, item.subtype);
      item.url = `/configuration/things/${item.id}`;
      return item;
    })
  )

  render() {
    return (
      <div className="configuration-panel">
        <ConfigurationListItem
          title="Servicios"
          items={this.state.things}
          selectedItem={this.state.selectedItem}
          onItemClick={this.onItemClick}
        />
        <ConfigurationListItem
          title="Configuración General"
          items={staticConfiguration}
          selectedItem={this.state.selectedItem}
          onItemClick={this.onItemClick}
        />
      </div>
    );
  }
}

ConfigurationPanel.propTypes = {
  thingsProps: PropTypes.array,
  resetPreferences: PropTypes.func,
};

export default ConfigurationPanel;
