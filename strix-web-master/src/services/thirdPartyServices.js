import axios from 'axios';
import { baseUrl, getHeaders } from '../config';

const requestPath = '/services';
const resourceUrl = `${baseUrl}${requestPath}`;

export default {
  solidmationLogin: (username, password) => (
    axios
      .post(`${resourceUrl}/solidmation/account`, { username, password }, { headers: getHeaders() })
      .then(response => response.data)
  ),

  solidmationGetStatus: () => (
    axios
      .get(`${resourceUrl}/solidmation/account`, { headers: getHeaders() })
      .then(response => response.data)
  ),

  getSolidmationListHome: () => (
    axios
      .get(`${resourceUrl}/solidmation/list_homes`, { headers: getHeaders() })
      .then(response => response.data)
  ),

  solidmationUnlinkAccount: () => (
    axios
      .delete(`${resourceUrl}/solidmation/account`, { headers: getHeaders() })
      .then(response => response.data)
  ),

  solidmationSyncHomes: () => (
    axios
      .post(`${resourceUrl}/solidmation/sync_homes`, {}, { headers: getHeaders() })
      .then(response => response.data)
  ),

  solidmationPairHomes: (magentaId, solidmationId) => (
    axios
      .post(`${resourceUrl}/solidmation/pair_homes`, {
        magenta_home: magentaId,
        solidmation_home: solidmationId,
      }, { headers: getHeaders() })
      .then(response => response.data)
  ),
};
