// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFunctions} from 'firebase/functions';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDkQasdpRRjMJ5TCRudzgXXHUaYL1Wvwew",
  authDomain: "cajcode2.firebaseapp.com",
  projectId: "cajcode2",
  storageBucket: "cajcode2.firebasestorage.app",
  messagingSenderId: "665111293789",
  appId: "1:665111293789:web:fad1aeec03de3cad3642b4",
  measurementId: "G-E2E47FR0ZJ"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Analytics only on client side
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Export functions for use in contact form
export const functions = getFunctions(app, 'us-central1'); // Specify region

// Export other Firebase instances if needed
export { app, analytics };