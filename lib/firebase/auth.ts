import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  setPersistence,
  browserLocalPersistence,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';
import { auth } from '../firebase';
import { createUser, getUser, User } from './db';

// Firebase Auth wrapper functions
export async function signUp(email: string, password: string, name: string, role: string = 'teacher'): Promise<FirebaseUser> {
  try {
    // Set persistence
    await setPersistence(auth, browserLocalPersistence);
    
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Create user document in Firestore
    await createUser(userCredential.user.uid, {
      email,
      name,
      role,
      createdAt: new Date() as any,
      updatedAt: new Date() as any,
    });
    
    return userCredential.user;
  } catch (error: any) {
    console.error('Sign up error:', error);
    throw new Error(error.message || 'Failed to sign up');
  }
}

export async function login(email: string, password: string): Promise<FirebaseUser> {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error.message || 'Failed to login');
  }
}

export async function logout(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('Logout error:', error);
    throw new Error(error.message || 'Failed to logout');
  }
}

export async function signInWithGoogle(): Promise<FirebaseUser> {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    // Create user if doesn't exist
    const existingUser = await getUser(result.user.uid);
    if (!existingUser) {
      await createUser(result.user.uid, {
        email: result.user.email || '',
        name: result.user.displayName || 'Unknown User',
        role: 'teacher',
        photoURL: result.user.photoURL || undefined,
        createdAt: new Date() as any,
        updatedAt: new Date() as any,
      });
    }
    
    return result.user;
  } catch (error: any) {
    console.error('Google sign-in error:', error);
    throw new Error(error.message || 'Failed to sign in with Google');
  }
}

export async function signInWithGithub(): Promise<FirebaseUser> {
  try {
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    // Create user if doesn't exist
    const existingUser = await getUser(result.user.uid);
    if (!existingUser) {
      await createUser(result.user.uid, {
        email: result.user.email || '',
        name: result.user.displayName || 'Unknown User',
        role: 'teacher',
        photoURL: result.user.photoURL || undefined,
        createdAt: new Date() as any,
        updatedAt: new Date() as any,
      });
    }
    
    return result.user;
  } catch (error: any) {
    console.error('GitHub sign-in error:', error);
    throw new Error(error.message || 'Failed to sign in with GitHub');
  }
}

export function onAuthChange(callback: (user: FirebaseUser | null) => void): () => void {
  return onAuthStateChanged(auth, callback);
}

export function getCurrentUser(): FirebaseUser | null {
  return auth.currentUser;
}

export async function getCurrentUserData(): Promise<User | null> {
  const firebaseUser = getCurrentUser();
  if (!firebaseUser) return null;
  
  return await getUser(firebaseUser.uid);
}
