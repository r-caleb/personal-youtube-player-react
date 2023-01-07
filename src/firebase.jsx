import firebase from "firebase/compat/app";

import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_YT_API_KEY,
  authDomain: "rctube0.firebaseapp.com",
  projectId: "rctube0",
  storageBucket: "rctube0.appspot.com",
  messagingSenderId: "978531329662",
  appId: "1:978531329662:web:e6ea37041861de165c9a2f"
};
firebase.initializeApp(firebaseConfig);

export default firebase.auth();
