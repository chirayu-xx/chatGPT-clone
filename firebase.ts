import {getApp, getApps, initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyC8-wbrJoWMhLc1YJ7BO8y25DbPQEKqs_M",
  authDomain: "gpt-clone-397c7.firebaseapp.com",
  projectId: "gpt-clone-397c7",
  storageBucket: "gpt-clone-397c7.appspot.com",
  messagingSenderId: "1081920483420",
  appId: "1:1081920483420:web:4f70b861ce04ab611f3699"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};