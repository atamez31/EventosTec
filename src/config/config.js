import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAQWZJW1J6gNi2FSlScMLjQvNzT8dcU7no",
    authDomain: "eventos-tec.firebaseapp.com",
    databaseURL: "https://eventos-tec.firebaseio.com",
    projectId: "eventos-tec",
    storageBucket: "",
    messagingSenderId: "287817533600"
};

const appTokenKey = "appToken";

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const database = firebase.database();
export const firebaseAuth = firebase.auth;

export function validateSession() {
  if (localStorage.getItem(appTokenKey)) {
    return true;
  } else {
    return false;
  }
}