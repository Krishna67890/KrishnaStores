import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;
const measurementId = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;

const isConfigValid = Boolean(apiKey && authDomain && projectId);

if (!isConfigValid && import.meta.env.DEV) {
  console.warn("⚠️ Firebase configuration is incomplete. Check your .env file for VITE_FIREBASE_* variables.");
}

const firebaseConfig = {
  apiKey: apiKey || "mock-key",
  authDomain: authDomain || "mock-domain.firebaseapp.com",
  projectId: projectId || "mock-project",
  storageBucket: storageBucket || "mock-bucket.appspot.com",
  messagingSenderId: messagingSenderId || "mock-sender",
  appId: appId || "mock-app",
  measurementId: measurementId || "mock-measurement"
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

if (isConfigValid) {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} else {
  // Graceful fallback for mock mode
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
}

export const initAnalytics = async (): Promise<Analytics | null> => {
  try {
    if (typeof window !== "undefined" && measurementId && await isSupported()) {
      return getAnalytics(app);
    }
  } catch (err) {
    console.warn("Firebase Analytics could not be initialized:", err);
  }
  return null;
};

export { app, auth, db, storage };
