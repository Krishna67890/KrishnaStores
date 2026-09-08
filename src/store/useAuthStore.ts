import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  bio?: string;
  username?: string;
  gender?: 'boy' | 'girl' | string;
  role: 'user' | 'admin';
  accountStatus?: 'active' | 'suspended' | string;
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string;
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (userData: UserProfile) => void;
  logout: () => void;
  updateProfileState: (updates: Partial<UserProfile>) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  setUser: (user: any, additionalData?: any) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: true,
      login: (userData) => {
        set({ user: userData, isAuthenticated: true, loading: false });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false, loading: false });
      },
      updateProfileState: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null
        })),
      updateProfile: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null
        })),
      setUser: (user, additionalData) => {
        if (user) {
          set({
            user: {
              uid: user.uid,
              email: user.email || '',
              displayName: additionalData?.displayName || user.displayName || 'Krishna Member',
              photoURL: additionalData?.photoURL || user.photoURL || undefined,
              bio: additionalData?.bio || '',
              username: additionalData?.username || (user.email ? user.email.split('@')[0] : ''),
              role: additionalData?.role || 'user',
              gender: additionalData?.gender,
              accountStatus: additionalData?.accountStatus || 'active',
              createdAt: additionalData?.createdAt
                ? (typeof additionalData.createdAt === 'string'
                    ? additionalData.createdAt
                    : additionalData.createdAt?.toDate?.()?.toISOString?.() || new Date().toISOString())
                : new Date().toISOString(),
              updatedAt: additionalData?.updatedAt
                ? (typeof additionalData.updatedAt === 'string'
                    ? additionalData.updatedAt
                    : additionalData.updatedAt?.toDate?.()?.toISOString?.() || new Date().toISOString())
                : new Date().toISOString(),
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
