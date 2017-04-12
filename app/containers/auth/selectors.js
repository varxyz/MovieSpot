import { createSelector } from 'reselect';


export function isAuthenticated(state) {
  console.log(state);
  return state.auth.authenticated;
}


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getAuth = createSelector(
  state => state.auth,
  auth => auth.toJS()
);
