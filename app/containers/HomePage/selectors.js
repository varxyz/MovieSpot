/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectUsername = () => createSelector(
  selectHome,
  (homeState) => homeState.get('username')
);
const makeSelectQueryname = () => createSelector(
  selectHome,
  (homeState) => homeState.get('queryname')
);

export {
  selectHome,
  makeSelectUsername,
  makeSelectQueryname,
};
