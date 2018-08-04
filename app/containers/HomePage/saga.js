/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_USER_LIST } from 'containers/App/constants';
import {
  userListLoaded,
  userListLoadingError,
} from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';

/**
 * Github user list request/response handler
 */
export function* getUserList() {
  // Select username from store
  let username = yield select(makeSelectUsername());
  username = username.trim().replace(' ', '');
  const requestURL = `https://api.github.com/search/users?q=${username}`;

  try {
    // Call our request helper (see 'utils/request')
    const users = yield call(request, requestURL);
    yield put(userListLoaded(users, username));
  } catch (err) {
    yield put(userListLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_USER_LIST, getUserList);
}
