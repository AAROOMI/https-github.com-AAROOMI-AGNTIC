import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase Core
const app = initializeApp(firebaseConfig);

// Initialize Firestore with the exact Database ID supplied in config
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');

// Initialize Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, db, auth, googleProvider, signInWithPopup, signOut };
