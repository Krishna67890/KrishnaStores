import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "mock-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "mock-domain.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "mock-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "mock-bucket.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "mock-sender",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "mock-app",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "mock-measurement"
};

// Initialize Firebase only if API key is provided
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY && process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "mock-key") {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} else {
  // Mock implementations to satisfy TypeScript during build
  app = {} as FirebaseApp;
  auth = { onAuthStateChanged: (cb: any) => cb(null) } as Auth;
  db = {} as Firestore;
  storage = {} as FirebaseStorage;
}

export const initAnalytics = async (): Promise<Analytics | null> => {
  if (typeof window !== "undefined" && await isSupported() && app.options?.apiKey !== "mock-key") {
    return getAnalytics(app);
  }
  return null;
};

export { app, auth, db, storage };
