import { SET_MOVIE_ID, FETCH_MOVIE, FETCH_MOVIE_SUCCES, HANDLE_TOGGLE, SET_ACTIVE } from './constants';

export function fetchMovie(id) {
  return {
    type: FETCH_MOVIE,
    id,
  };
}
export function setMovie(id) {
  return {
    type: SET_MOVIE_ID,
    id,
  };
}

export function movieFetched(name) {
  return {
    type: FETCH_MOVIE_SUCCES,
    name,
  };
}
export function toggle(id, active) {
  return {
    type: HANDLE_TOGGLE,
    payload: {
      id,
      active,
    },
  };
}
export function setActive(active) {
  return {
    type: SET_ACTIVE,
    active,
  };
}
