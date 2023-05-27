import { fromJS } from 'immutable';
import {
  GET_REMINDERS_SUCCESSFUL,
  ADD_REMINDERS_SUCCESSFUL,
  MARK_SERVICE_DONE,
  MARK_SERVICE_DONE_SUCCESS,
  DELETE_REMINDER_SUCCESS,
  REMINDERS_LOADING,
  REMINDERS_LOADING_ERROR,
  REMINDERS_RESET,
  REMINDERS_GET_HISTORY_ITEMS,
  REMINDERS_GET_HISTORY_ITEMS_SUCCESS,
} from '../constants';

const initialState = fromJS({
  firstLoad: true,
  loading: false,
  list: [],
  types: [],
  registerWorking: false,
  history: [],
  historyPage: 1,
  historyLoading: false,
  historyNoMorePages: false,
  recentlyDone: new Set(),
});

function markServicesDone(state, servicesDone, historyItems) {
  const recentlyDone = state.get('recentlyDone');
  servicesDone.forEach(x => recentlyDone.add(x));
  return state.set('recentlyDone', recentlyDone)
    .set('registerWorking', false)
    .set('history', fromJS(historyItems))
    .set('page', 1);
}

function getMoreHistoryItemsSuccess(state, historyItems, pageSize) {
  const currentHistoryItems = state.get('history');
  let newState = state;
  newState = state.set('history', currentHistoryItems.concat(fromJS(historyItems)))
    .set('historyLoading', false)
    .set('historyPage', state.get('historyPage') + 1);

  // If we get less results than pageSize, then there are no more items left
  if (historyItems.length < pageSize) {
    newState = newState.set('historyNoMorePages', true);
  }

  return newState;
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_REMINDERS_SUCCESSFUL:
      return state.set('list', fromJS(action.remindersData))
        .set('types', fromJS(action.reminderTypesData))
        .set('loading', false)
        .set('firstLoad', false);
    case ADD_REMINDERS_SUCCESSFUL:
      return state.update('list', v => v.concat(fromJS(action.remindersCreated)));
    case MARK_SERVICE_DONE:
      return state.set('registerWorking', true);
    case MARK_SERVICE_DONE_SUCCESS:
      return markServicesDone(state, action.servicesDone, action.historyItems);
    case DELETE_REMINDER_SUCCESS:
      return state
        .update('list', list =>
          list.filter(v => v.get('id') !== action.reminderId),
        );
    case REMINDERS_LOADING:
      return state.get('firstLoad')
        ? state.set('loading', true)
        : state;
    case REMINDERS_LOADING_ERROR:
      return state.set('loading', false);
    case REMINDERS_RESET:
      return initialState.set('recentlyDone', new Set());
    case REMINDERS_GET_HISTORY_ITEMS:
      return state.get('historyPage') === 1 ? state : state.set('historyLoading', true);
    case REMINDERS_GET_HISTORY_ITEMS_SUCCESS:
      return getMoreHistoryItemsSuccess(state, action.historyItems, action.pageSize);
    default:
      return state;
  }
}
