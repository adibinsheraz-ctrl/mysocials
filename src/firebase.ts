import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCupit_2IyY_9iQHC-cV5RhPulxBbc3dK4",
  authDomain: "mysocials-f9442.firebaseapp.com",
  projectId: "mysocials-f9442",
  storageBucket: "mysocials-f9442.firebasestorage.app",
  messagingSenderId: "826663924000",
  appId: "1:826663924000:web:41e732ae65677dfe312745",
  measurementId: "G-YSLX1GFW2L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Safely initialize Firebase Analytics (handles SSR / browser compatibility)
export let analytics: Analytics | null = null;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Analytics not supported in this environment
  });
}
