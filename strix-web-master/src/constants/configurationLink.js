class ConfigurationLink {
  static homeControlTemplate = '/configuration/home-control/:thingId';

  static getHomeControl(thingId) {
    return `/configuration/home-control/${thingId}`;
  }
}

export default ConfigurationLink;
