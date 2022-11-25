import * as firebase from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(firebaseConfig);

export const authService = getAuth();

export const createUser = async (email, password, errorfunc) => await createUserWithEmailAndPassword(authService, email, password).catch(error => {
  errorfunc( error.message.replace("Firebase: ", ""))
})

export const signUser = async (email, password, errorfunc) => await signInWithEmailAndPassword(authService, email, password).catch(error => {
  errorfunc( error.message.replace("Firebase: ", ""))
});

export const authOnchange = (sus, fail, init) => onAuthStateChanged(authService, (user) => {
  if (user) {
    sus();
  } else {
    fail();
  }
  init();
});