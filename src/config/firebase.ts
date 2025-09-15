import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, initializeFirestore, FirestoreSettings } from 'firebase/firestore';
// Removed analytics import to avoid initialization issues
// import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDxsSRpmQUt41Q_JmPEcbAPgQzUrUNXV6Q",
  authDomain: "profootballnetwork-8e365.firebaseapp.com",
  projectId: "profootballnetwork-8e365",
  storageBucket: "profootballnetwork-8e365.appspot.com",
  messagingSenderId: "317914786543",
  appId: "1:317914786543:web:e93f8a514cbbc1e761491a",
  measurementId: "G-HZWEW0N3E8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with specific database
const firestoreSettings: FirestoreSettings = {
  ignoreUndefinedProperties: true
};

export const db = initializeFirestore(app, firestoreSettings, 'leaderboards');
export const nhlDb = initializeFirestore(app, firestoreSettings, 'nhl-leaderboards');
export const auth = getAuth(app);

// Only connect to emulators in development and if not already connected
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  try {
    // Check if already connected to avoid multiple connection attempts
    if (!auth._delegate._config.emulator) {
      connectAuthEmulator(auth, 'http://localhost:9099');
    }
  } catch (error) {
    // Emulator connection failed or already connected, continue with production
    console.log('Auth emulator connection skipped:', error.message);
  }
  
  try {
    // Only connect to emulator if we're not already connected to the named database
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      connectFirestoreEmulator(db, 'localhost', 8080);
    }
  } catch (error) {
    // Emulator connection failed or already connected, continue with production
    console.log('Firestore emulator connection skipped:', error.message);
  }
}

// Analytics disabled to avoid initialization issues
// export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const analytics = null;

export default app;