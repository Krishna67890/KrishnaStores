import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  gender?: 'boy' | 'girl';
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (userData: UserProfile) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  setUser: (user: any) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: true,
      login: (userData) => {
        // Use document.cookie as a fallback if js-cookie isn't available
        document.cookie = "user_session=true; path=/; max-age=604800";
        set({ user: userData, isAuthenticated: true, loading: false });
      },
      logout: () => {
        document.cookie = "user_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        set({ user: null, isAuthenticated: false, loading: false });
      },
      updateProfile: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null
        })),
      setUser: (user) => {
        if (user) {
          set({
            user: {
              uid: user.uid,
              email: user.email || '',
              displayName: user.displayName || 'User',
              photoURL: user.photoURL || undefined,
            },
            isAuthenticated: true,
            loading: false
          });
        } else {
          set({ user: null, isAuthenticated: false, loading: false });
        }
      },
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
