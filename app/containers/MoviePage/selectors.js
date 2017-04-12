/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectMovie = (state) => state.get('movie');
const selectMoviee = (state) => state.get('auth');
const makeSelectMovie = () => createSelector(
  selectMovie,
  (homeState) => homeState.get('movieForeverAlone')
);
const makeSelectAuth = () => createSelector(
  selectMoviee,
  (homeState) => homeState.get('authenticated')
);

export {
  selectMovie,
  makeSelectMovie,
  makeSelectAuth,
  selectMoviee,
};
