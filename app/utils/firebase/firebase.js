const firebase = require('firebase/app')
require('firebase/auth')
require('firebase/database')

try {
  const config = {
    apiKey: 'AIzaSyCxaKoxPO-9GxYt6ZbAWjokWzG5Z_SKMAU',
    authDomain: 'movies-43b68.firebaseapp.com',
    databaseURL: 'https://movies-43b68.firebaseio.com',
    storageBucket: 'movies-43b68.appspot.com',
    messagingSenderId: '281252254150'
  }

  firebase.initializeApp(config)
} catch (e) {

}

export const gitHubProvider = new firebase.auth.GitHubProvider();
export const firebaseRef = firebase.database().ref()
export default firebase

