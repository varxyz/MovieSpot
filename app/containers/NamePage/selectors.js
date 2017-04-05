/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectName = (state) => state.get('name');
const makeSelectName = () => createSelector(
  selectName,
  (nameState) => nameState.get('nameOne')
);

export {
  selectName,
  makeSelectName,
};
