/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, fork, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_REPOS, LOAD_POPULAR, LOAD_WATCH, FETCH_MOVIE_DB, FETCH_MOVIE_DB_SUCCESS } from 'containers/App/constants';
import { reposLoaded, repoLoadingError, popularLoaded, retrFav, fetchMovieDbSuccess } from 'containers/App/actions';
import { movieFetched } from '../MoviePage/actions';
import { FETCH_MOVIE } from '../MoviePage/constants';
import { nameFetched } from '../NamePage/actions';
import { FETCH_NAME } from '../NamePage/constants';
import request from 'utils/request';
import { makeSelectQueryname, makeSelectAuth, makeSelectFavs } from 'containers/App/selectors';
import { makeSelectMovie } from 'containers/MoviePage/selectors';
import { makeSelectName } from 'containers/NamePage/selectors';
import { firebaseAuth } from 'containers/firebase';
import { authActions } from 'containers/auth/actions';
import { firebaseDb } from '../firebase/';
import { HANDLE_TOGGLE } from '../MoviePage/constants';

export function* toggleMovie(id, active) {
  const uid = yield select(makeSelectAuth());
  if (active) {
    const movieRef = firebaseDb.ref().child(`users/${uid.user.authUser.uid}/movies/${id}`);
    const updates = {
      active,
    };
    return movieRef.update(updates);
  } else {
    const movieRef = firebaseDb.ref().child(`users/${uid.user.authUser.uid}/movies`);
    return movieRef.child(id).remove();
  }
}

export function* loadWatchlist(id) {
  const movieRef = firebaseDb.ref().child(`users/${id.uid}/movies`);
  const arr = yield movieRef.once('value').then((snapshot) => {
    const movies = snapshot.val() || {};
    const parsedMovies = [];

    Object.keys(movies).map((movieId) => {
      parsedMovies.push({
        id: movieId,
        ...movies[movieId],
      });
    });
    return parsedMovies;
  });
  // console.log(arr);
  yield put(retrFav(arr));
}

export function* signIn(authProvider) {
  try {
    const authData = yield call(
      [firebaseAuth, firebaseAuth.signInWithPopup],
      authProvider
    );

    yield put(authActions.signInFulfilled(authData.user));
    yield history.push('/');
  } catch (error) {
    yield put(authActions.signInFailed(error));
  }
}
export function* getName() {
  // Select username from store
  const url = yield select(makeSelectName());
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
  // const requestURL = `http://www.omdbapi.com/?t=${username}`;
  const requestURL = `https://api.themoviedb.org/3/person/${url}?api_key=c36cf7044bfcaa7f2afb3867f22e8e20&append_to_response=combined_credits,images`;

  try {
    // Call our request helper (see 'utils/request')
    const searchResults = yield call(request, requestURL);
    yield put(nameFetched(searchResults, url));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export function* getMovie() {
  // Select username from store
  const url = yield select(makeSelectMovie());
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
  // const requestURL = `http://www.omdbapi.com/?t=${username}`;
  const requestURL = `https://api.themoviedb.org/3/movie/${url}?api_key=c36cf7044bfcaa7f2afb3867f22e8e20&append_to_response=credits,videos,images,recommendations,lists,reviews`;

  try {
    // Call our request helper (see 'utils/request')
    const searchResults = yield call(request, requestURL);
    yield put(movieFetched(searchResults, url));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}
export function* getMoviesDB() {
  // Select username from store
  const url = yield select(makeSelectFavs());
  // console.log('mumum', url);
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
  // const requestURL = `http://www.omdbapi.com/?t=${username}`;
  // const requestURL = `https://api.themoviedb.org/3/movie/${url}?api_key=c36cf7044bfcaa7f2afb3867f22e8e20&append_to_response=credits,videos,images,recommendations,lists,reviews`;

  try {
    const responses = yield url.map((item) => call(request, `https://api.themoviedb.org/3/movie/${item.id}?api_key=c36cf7044bfcaa7f2afb3867f22e8e20&append_to_response=credits,videos,images,recommendations,lists,reviews`));
    // yield put(fetchMovieDbSuccess(responses[0]));
    yield put({ type: FETCH_MOVIE_DB_SUCCESS, responses });
      // Call our request helper (see 'utils/request')
      // const searchResults = yield call(request, requestURL);
  } catch (err) {
    put(fetchMovieDbSuccess(err));
  }
}

export function* getSearch() {
  // Select username from store
  const query = yield select(makeSelectQueryname());
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
  // const requestURL = `http://www.omdbapi.com/?t=${username}`;
  const requestURL = `https://api.themoviedb.org/3/search/multi?api_key=c36cf7044bfcaa7f2afb3867f22e8e20&language=en-US&query=${query}&page=1`;

  try {
    // Call our request helper (see 'utils/request')
    const searchResults = yield call(request, requestURL);
    yield put(reposLoaded(searchResults, query));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export function* getPopular() {
  // Select username from store
  // const username = yield select(makeSelectUsername());
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
  const requestURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=c36cf7044bfcaa7f2afb3867f22e8e20';
  const url = 'https://api.themoviedb.org/3/person/popular?api_key=c36cf7044bfcaa7f2afb3867f22e8e20';
  try {
    // Call our request helper (see 'utils/request')
    const nameResult = yield call(request, url);
    const result = yield call(request, requestURL);
    // yield put(namesLoaded(namesResult));

    yield put(popularLoaded(result, nameResult));
  } catch (err) {
    // console.log(err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* watchlistData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_WATCH, loadWatchlist);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
export function* nameData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(FETCH_NAME, getName);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
export function* searchData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_REPOS, getSearch);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
export function* movieData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(FETCH_MOVIE, getMovie);

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
export function* watchSignIn() {
  const watcher = yield takeLatest(authActions.SIGN_IN, signIn);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* watchMovieDB() {
  const watcher = yield takeLatest(FETCH_MOVIE_DB, getMoviesDB);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
export function* watchToggle() {
  while (true) {
    const { payload } = yield take(HANDLE_TOGGLE);
    // console.log(payload);
    // const watcher = yield takeLatest(HANDLE_TOGGLE, toggleMovie);
    yield fork(toggleMovie, payload.id, payload.active);
  // yield take(LOCATION_CHANGE);
  // yield cancel(watcher);
  }
}

// Bootstrap sagas
export default [
  watchlistData,
  watchMovieDB,
  watchToggle,
  watchSignIn,
  nameData,
  searchData,
  popularData,
  movieData,
];
