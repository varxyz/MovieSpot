import {
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
  LOAD_POPULAR,
  LOAD_POPULAR_SUCCESS,
  CHANGE_SEARCH_QUERY,
  LOAD_WATCH,
  RETR_FAV,
  FETCH_MOVIE_DB,
  FETCH_MOVIE_DB_SUCCESS,
} from './constants';

export function fetchMovieDb() {
  return {
    type: FETCH_MOVIE_DB,
  };
}
export function fetchMovieDbSuccess(arr) {
  return {
    type: FETCH_MOVIE_DB_SUCCESS,
    arr,
  };
}

export function loadWatch(uid) {
  return {
    type: LOAD_WATCH,
    uid,
  };
}
export function retrFav(arr) {
  return {
    type: RETR_FAV,
    arr,
  };
}
export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}
export function loadPopular() {
  return {
    type: LOAD_POPULAR,
  };
}
export function fetchName() {
  return {
    type: LOAD_POPULAR,
  };
}

export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

export function popularLoaded(popularResults, nameResults) {
  return {
    type: LOAD_POPULAR_SUCCESS,
    popularResults,
    nameResults,
  };
}
export function changeSearchQuery(name) {
  return {
    type: CHANGE_SEARCH_QUERY,
    name,
  };
}
/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}
