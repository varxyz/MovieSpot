/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_REPOS, LOAD_POPULAR } from 'containers/App/constants';
import { reposLoaded, repoLoadingError, popularLoaded } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
  const requestURL = `http://www.omdbapi.com/?t=${username}`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}


export function* getPopular() {
  // Select username from store
  // const username = yield select(makeSelectUsername());
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
  const requestURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=c36cf7044bfcaa7f2afb3867f22e8e20';

  try {
    // Call our request helper (see 'utils/request')
    const result = yield call(request, requestURL);
    yield put(popularLoaded(result));
  } catch (err) {
    console.log(err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_REPOS, getRepos);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
export function* popularData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_POPULAR, getPopular);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  githubData,
  popularData,
];
