import firebase from "firebase";

export const config = {
    apiKey: process.env.REACT_APP_Firebase,
    authDomain: "firechat-879f4.firebaseapp.com",
    projectId: "firechat-879f4",
    storageBucket: "firechat-879f4.appspot.com",
    messagingSenderId: "599746692412",
    appId: "1:599746692412:web:50bd0dbe423639ad74ca39",
    measurementId: "G-SC69KZR5QS"
};

if (!firebase.apps.length) {

    firebase.initializeApp(config);

}
const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth }