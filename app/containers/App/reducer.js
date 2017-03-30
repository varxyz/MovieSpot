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
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  LOAD_POPULAR_SUCCESS,
  LOAD_POPULAR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  isLoading: false,
  error: false,
  currentUser: false,
  popularPeople: {
    people: false,
  },
  popularData: {
    popular: false,
  },
  userData: {
    repositories: false,
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_POPULAR:
      return state
        .set('loading', true)
        .setIn(['popularData', 'results'], false);
    case LOAD_POPULAR_SUCCESS:
      return state
        .set('loading', false)
        .setIn(['popularData', 'popular'], action.popularResults)
        .setIn(['popularPeople', 'people'], action.nameResults);
    case LOAD_REPOS:
      return state
        .set('isLoading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('isLoading', false)
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
