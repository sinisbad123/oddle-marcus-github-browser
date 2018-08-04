/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_USER_LIST_SUCCESS,
  LOAD_USER_LIST,
  LOAD_USER_LIST_ERROR,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  LOAD_README_SUCCESS,
  LOAD_README,
  LOAD_README_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userList: false,
  userData: {
    repositories: false,
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_LIST:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userList'], false)
        .setIn(['userData', 'repositories'], false)
        .setIn(['userData', 'readme'], false);
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userList'], false)
        .setIn(['userData', 'repositories'], false)
        .setIn(['userData', 'readme'], false);
    case LOAD_README:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userList'], false)
        .setIn(['userData', 'repositories'], false)
        .setIn(['userData', 'readme'], false);
    case LOAD_USER_LIST_SUCCESS:
      return state
        .set('loading', false)
        .set('currentUser', action.username)
        .setIn(['userList'], action.userList);
    case LOAD_REPOS_SUCCESS:
      return state
        .set('loading', false)
        .set('currentUser', action.username)
        .setIn(['userData', 'repositories'], action.repos);
    case LOAD_README_SUCCESS:
      return state
        .setIn(['userData', 'readme'], action.readme)
        .set('loading', false)
        .set('currentUser', action.username)
        .set('currentRepo', action.repo);
    case LOAD_USER_LIST_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case LOAD_REPOS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case LOAD_README_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
