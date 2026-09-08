"use client";

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useAuthStore } from '@/store/useAuthStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // If we have an API key, attempt to fetch extra profile data from Firestore
          if (db.app?.options?.apiKey !== "mock-key") {
             const userDoc = await getDoc(doc(db, 'users', user.uid));
             if (userDoc.exists()) {
                setUser(user, userDoc.data());
             } else {
                setUser(user);
             }
          } else {
             setUser(user);
          }
        } catch (error) {
          console.error("Error fetching user doc:", error);
          setUser(user);
        }
        document.cookie = "user_session=true; path=/";
      } else {
        setUser(null);
        document.cookie = "user_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  return <>{children}</>;
}
