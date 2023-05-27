import {
  SHOW_CONFIGURATION_PANEL,
  SHOW_SERVICE_PANEL,
  SHOW_PROFILE_PANEL,
} from '../constants';

export const showConfigurationPanel = () => ({
  type: SHOW_CONFIGURATION_PANEL,
});

export const showServicePanel = () => ({
  type: SHOW_SERVICE_PANEL,
});

export const showProfilePanel = () => ({
  type: SHOW_PROFILE_PANEL,
});

