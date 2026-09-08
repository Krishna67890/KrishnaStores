import { useAuthStore } from '@/store/useAuthStore';
import { auth, db } from '@/lib/firebase';
import { signOut, sendPasswordResetEmail } from 'firebase/auth';

export function useAuth() {
  const { user, isAuthenticated, loading, setUser, setLoading, logout: storeLogout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      storeLogout();
    } catch (error) {
      console.error('Logout error:', error);
      storeLogout();
    }
  };

  const handleResetPassword = async (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  return {
    user,
    isAuthenticated,
    loading,
    logout: handleLogout,
    resetPassword: handleResetPassword
  };
}
