import firebase from "firebase/compat/app";

import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_YT_API_KEY,
  authDomain: "rc--clone-yt.firebaseapp.com",
  projectId: "rc--clone-yt",
  storageBucket: "rc--clone-yt.appspot.com",
  messagingSenderId: "576685436975",
  appId: "1:576685436975:web:fcc0ca96a1b956883cd6da",
};
firebase.initializeApp(firebaseConfig);

export default firebase.auth();
