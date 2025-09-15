import { useState, useEffect } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { trackLogout } from '../utils/analytics';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      throw new Error(errorMessage);
    }
  };
  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      // Client-side validation
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }
      
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name in Firebase Auth
      await updateProfile(result.user, { displayName });
      
      // Force refresh the user object to get updated display name
      await result.user.reload();
      const updatedUser = auth.currentUser;
      
      return updatedUser || result.user;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      throw new Error(errorMessage);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Client-side validation
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }
      
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      trackLogout();
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  // Helper function to convert Firebase errors to user-friendly messages
  const getErrorMessage = (error: any): string => {
    const errorCode = error.code || error.message;
    
    switch (errorCode) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Invalid email or password. Please check your credentials and try again.';
      
      case 'auth/email-already-in-use':
        return 'Email address already exists. Please sign in instead or use a different email.';
      
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      
      case 'auth/weak-password':
        return 'Password must be at least 6 characters long.';
      
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact support.';
      
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled. Please contact support.';
      
      case 'auth/requires-recent-login':
        return 'Please sign out and sign in again to complete this action.';
      
      case 'auth/account-exists-with-different-credential':
        return 'An account already exists with this email using a different sign-in method.';
      
      case 'auth/credential-already-in-use':
        return 'This credential is already associated with a different account.';
      
      case 'auth/popup-closed-by-user':
        return 'Sign-in was cancelled. Please try again.';
      
      case 'auth/popup-blocked':
        return 'Pop-up was blocked by your browser. Please allow pop-ups and try again.';
      
      case 'auth/popup-blocked':
        return 'Pop-up was blocked by your browser. Please allow pop-ups for this site and try again.';
      
      case 'auth/cancelled-popup-request':
        return 'Sign-in was cancelled. Please try again.';
      
      case 'auth/missing-email':
        return 'Please enter your email address.';
      
      case 'auth/missing-password':
        return 'Please enter your password.';
      
      case 'auth/internal-error':
        return 'Something went wrong. Please try again later.';
      
      case 'auth/too-many-requests':
        return 'Too many failed sign-in attempts. Please wait a few minutes and try again.';
      
      case 'auth/network-request-failed':
        return 'Network connection error. Please check your internet connection and try again.';
      
      case 'Password must be at least 6 characters long':
        return 'Password must be at least 6 characters long.';
      
      default:
        // Fallback for any other errors
        if (error.message && error.message.includes('Password')) {
          return 'Password must be at least 6 characters long.';
        }
        if (error.message && error.message.includes('email')) {
          return 'Please check your email address and try again.';
        }
        return 'An unexpected error occurred. Please try again or contact support if the problem persists.';
    }
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logout
  };
};