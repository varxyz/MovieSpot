/*
 * Movie Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { SET_MOVIE_ID, FETCH_MOVIE, FETCH_MOVIE_SUCCES, HANDLE_TOGGLE, } from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
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
      active
    }
  };
}

