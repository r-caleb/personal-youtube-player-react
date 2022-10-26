import firebase from "firebase/compat/app";

import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAT2eZrM63jvSsUzClnXQ_ZTFOfvIeXB1Q",
  authDomain: "rctube1.firebaseapp.com",
  projectId: "rctube1",
  storageBucket: "rctube1.appspot.com",
  messagingSenderId: "150616097225",
  appId: "1:150616097225:web:8a900b318412a15d196818"
};
firebase.initializeApp(firebaseConfig);

export default firebase.auth();
