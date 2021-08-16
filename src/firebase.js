import firebase from 'firebase';
import 'firebase/storage';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAIMdo1Ebsw8bml1rlGc2ZoG46R_0mcrmo",
    authDomain: "janicephotography-31831.firebaseapp.com",
    projectId: "janicephotography-31831",
    storageBucket: "janicephotography-31831.appspot.com",
    messagingSenderId: "34903375311",
    appId: "1:34903375311:web:58912fe011646d4a3ce6ba"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();
const db = firebase.firestore();
const storage = firebase.storage()
export { auth, storage };
export default db;