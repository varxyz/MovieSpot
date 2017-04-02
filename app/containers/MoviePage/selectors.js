/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectMovie = (state) => state.get('movie');
const makeSelectMovie = () => createSelector(
  selectMovie,
  (homeState) => homeState.get('movieForeverAlone')
);

export {
  selectMovie,
  makeSelectMovie,
};
