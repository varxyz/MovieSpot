/*
 * HomeReducer
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
  SET_MOVIE_ID,
  SET_ACTIVE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  // movieForeverAlone: '',
  active: false,
});

function MovieReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MOVIE_ID:
      return state
        .set('movieForeverAlone', action.id);
    case SET_ACTIVE:
      return state
        .set('active', action.active);
    default:
      return state;
  }
}

export default MovieReducer;
