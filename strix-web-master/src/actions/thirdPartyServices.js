import {
  SOLIDMATION_LOGIN,
  SOLIDMATION_GET_STATUS,
  SOLIDMATION_UNLINK_ACCOUNT,
  SOLIDMATION_SYNC_HOMES,
  SOLIDMATION_PAIR_HOMES,
} from '../constants';

export const solidmationLogin = (email, password) => ({
  type: SOLIDMATION_LOGIN,
  email,
  password,
});

export const solidmationGetStatus = () => ({
  type: SOLIDMATION_GET_STATUS,
});

export const solidmationUnlinkAccount = () => ({
  type: SOLIDMATION_UNLINK_ACCOUNT,
});

export const solidmationSyncHomes = () => ({
  type: SOLIDMATION_SYNC_HOMES,
});

export const solidmationPairHomes = (magentaHome, solidmationHome) => ({
  type: SOLIDMATION_PAIR_HOMES,
  magentaHome,
  solidmationHome,
});

export default {
  solidmationLogin,
};
