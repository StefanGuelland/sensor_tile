import Rebase from "re-base";
import firebase from "firebase";
const firebaseApp = firebase.initializeApp({ // changed ;-) your values here
    apiKey: "AIzaSyDn1zyWvhol2Knc8PDTK8ZnelNUrXT64Pk",
    authDomain: "sensor-tile-49829.firebaseapp.com",
    databaseURL: "https://sensor-tile-49829.firebaseio.com",
    projectId: "sensor-tile-49829",
    storageBucket: "sensor-tile-49829.appspot.com",
    messagingSenderId: "497759501807"
});
const base = Rebase.createClass(firebaseApp.database());
export {firebaseApp}; // named export
export default base; // default export