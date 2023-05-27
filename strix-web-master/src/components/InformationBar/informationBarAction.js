class InformationBarAction {
  constructor(icon, action) {
    if (typeof icon !== 'string') {
      throw new Error(`InformationBarAction::Argument "icon" must be a string, received ${typeof icon}`);
    }
    if (typeof action !== 'function') {
      throw new Error(`InformationBarAction::Argument "action" must be a function, received ${typeof action}`);
    }
    this.icon = icon;
    this.action = action;
  }
}

export default InformationBarAction;
