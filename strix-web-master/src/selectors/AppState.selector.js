export const isAppOffline = state => state.getIn(['appStatus', 'offline']);

export default {
  isAppOffline,
};
