/*
 * Name Actions
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

import {
  SET_NAME,
  FETCH_NAME,
  FETCH_NAME_SUCCESS,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function fetchName(id) {
  return {
    type: FETCH_NAME,
    id,
  };
}
export function setName(id) {
  return {
    type: SET_NAME,
    id,
  };
}

export function nameFetched(name) {
  return {
    type: FETCH_NAME_SUCCESS,
    name,
  };
}

