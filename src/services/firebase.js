import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc, updateDoc } from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { getDatabase, set, ref } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDsO5tHlomBo8fzN41B0DXRym0hCePKCKM',
  authDomain: 'finances-1f7e1.firebaseapp.com',
  databaseURL: 'https://finances-1f7e1-default-rtdb.firebaseio.com',
  projectId: 'finances-1f7e1',
  storageBucket: 'finances-1f7e1.appspot.com',
  messagingSenderId: '566274233354',
  appId: '1:566274233354:web:96003a2df502b92b50fbf3',
};

initializeApp(firebaseConfig);
const firestore = getFirestore();
const auth = getAuth();
const database = getDatabase();

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
  firestore,
  setDoc,
  doc,
  updateDoc,
  database,
  set,
  ref,
};
