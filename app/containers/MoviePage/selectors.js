/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectMovie = (state) => state.get('movie');
const selectMoviee = (state) => state.get('auth');
const selectActive = (state) => state.get('active');

const makeSelectMovie = () => createSelector(
  selectMovie,
  (homeState) => homeState.get('movieForeverAlone')
);
const makeSelectAuth = () => createSelector(
  selectMoviee,
  (homeState) => homeState.get('authenticated')
);
const makeSelectActive = () => createSelector(
  selectMovie,
  (state) => state.get('active')
)
export {
  selectMovie,
  makeSelectMovie,
  makeSelectAuth,
  selectMoviee,
  makeSelectActive,
};
