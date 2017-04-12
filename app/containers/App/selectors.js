/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');
const selectAuth = (state) => state.get('auth');

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectRepos = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'repositories'])
);

const makeSelectPopular = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['popularData', 'popular'])
);
const makeSelectPeople = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['popularPeople', 'people'])
);
const makeSelectIsLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('isLoading')
);
const makeSelectQueryname = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('queryname')
);
const makeSelectNameQ = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('name')
);
const makeSelectFavs = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('favorites')
);
const makeSelectDbFavs = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('dbmov')
);
const makeSelectAuth = () => createSelector(
  selectAuth,
  (authState) => authState.toJS()
);
const makeSelectMovieQ = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['movie', 'singleMovie'])
);


const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  makeSelectAuth,
  makeSelectDbFavs,
  makeSelectFavs,
  selectGlobal,
  selectAuth,
  makeSelectNameQ,
  makeSelectQueryname,
  makeSelectPeople,
  makeSelectMovieQ,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocationState,
  makeSelectPopular,
  makeSelectIsLoading,
};
