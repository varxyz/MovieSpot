// import { call, fork, put, take, takeLatest } from 'redux-saga/effects';
// import { firebaseAuth } from '../firebase';
// import { HANDLE_TOGGLE } from './constants';
// import { firebaseDb } from '../firebase/';
// import { LOCATION_CHANGE } from 'react-router-redux';


// function* toggleMovie() {
//   const movieRef = firebaseDb.ref().child(`movies/${id}`)
//   const updates = {
//       active
//     }
//   return movieRef.update(updates)
// }

// function* watchToggle() {
//     const watcher = yield takeLatest(HANDLE_TOGGLE, toggleMovie);
// yield take(LOCATION_CHANGE);
//   yield cancel(watcher);
// }
// export default [
//   watchToggle,
// ]
