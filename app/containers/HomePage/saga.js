/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_REPOS, LOAD_README } from 'containers/App/constants';
import {
  reposLoaded,
  repoLoadingError,
  readmeLoaded,
  readmeLoadingError
} from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectUsername, makeSelectRepo } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
  const options = {
    headers: {
      'Content-Type': 'application/vnd.github.v3.html'
    }
  };

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, [requestURL, options]);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export function* getReadme() {
  // Select repo and username from store
  const username = yield select(makeSelectUsername());
  const repo = yield select(makeSelectRepo());
  const requestURL = `https://api.github.com/repos/${username}/${repo}/readme`;

  try {
    // Call our request helper (see 'utils/request')
    const readme = yield call(request, requestURL);
    yield put(readmeLoaded(readme, username, repo));
  } catch (err) {
    yield put(readmeLoadingError(err));
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
  yield takeLatest(LOAD_REPOS, getRepos);
  yield takeLatest(LOAD_README, getReadme);
}
