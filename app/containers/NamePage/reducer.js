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
  SET_NAME,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  nameOne: '',
});

function nameReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NAME:
      return state
        .set('nameOne', action.id);
    default:
      return state;
  }
}

export default nameReducer;
