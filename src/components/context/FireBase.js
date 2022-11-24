// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBz4ew-AmtQGL0h6DNYJKhniipIK7eFBUM',
  authDomain: 'scc-proto.firebaseapp.com',
  projectId: 'scc-proto',
  storageBucket: 'scc-proto.appspot.com',
  messagingSenderId: '254746155478',
  appId: '1:254746155478:web:703ef003cd09fa621bec77',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore();
export const storage = getStorage();
export const images = ref(storage, 'images');
export const imageref = ref(storage, 'images/BattleOfTheDitch-1-1-1024x598.jpeg');
