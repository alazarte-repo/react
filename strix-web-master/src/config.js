/* eslint-disable */
const getCredentials = () => {};
export const googleAnalyticsTrackId = GOOGLE_ANALYTICS_TRACK_ID;
export const baseUrl = BASE_URL;
export const apiCredentials = new Buffer(`${CLIENT_KEY}:${CLIENT_SECRET}`).toString('base64');
export const googleTagManagerId = GOOGLE_TAG_MANAGER_ID;
export function getHeaders(extraStuff = {}) {
  const TOKEN = localStorage.getItem('TOKEN')
  const headers = {
    'Accept-Language': 'es-AR',
    Accept: 'application/json; charset=utf-8',
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: `Bearer ${TOKEN}`,
  };

  return Object.assign({}, headers, extraStuff);
}

export default {
  baseUrl,
  getHeaders,
  apiCredentials,
};
