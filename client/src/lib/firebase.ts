import { initializeApp, getApps } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithRedirect, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
// Temporarily disable analytics to avoid API key errors
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project"}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project"}.appspot.com`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "demo-app-id"
};

// Initialize Firebase - prevent duplicate initialization
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Temporarily disable analytics to avoid API key errors in development
// export const analytics = getAnalytics(app);
export const auth = getAuth();

// Demo account credentials
const DEMO_EMAIL = "demo@iterativplanner.com";
const DEMO_PASSWORD = "demo123456";

// Configure Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Authentication functions
export const signInWithGoogle = async () => {
  try {
    // Using popup is more reliable in development environments
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error("Error signing in with Google:", error);
    
    // Handle specific Firebase auth errors
    if (error.code === 'auth/unauthorized-domain') {
      console.error("Unauthorized domain. Please add this domain to your Firebase authorized domains list in the Firebase console.");
      throw new Error("Authentication domain not authorized. Please contact support or try again later.");
    } else if (error.code === 'auth/popup-closed-by-user') {
      throw new Error("Sign-in was cancelled. Please try again.");
    } else if (error.code === 'auth/popup-blocked') {
      // Fall back to redirect if popup is blocked
      console.log("Popup blocked, trying redirect method...");
      await signInWithRedirect(auth, googleProvider);
      return null;
    } else {
      throw error;
    }
  }
};

export const handleRedirectResult = async () => {
  try {
    // For Firebase v11+, accessing redirect result needs to be handled via onAuthStateChanged
    // This function is now just a placeholder; actual redirect handling is in AuthProvider
    console.log("Handling redirect result - check onAuthStateChanged in AuthProvider component");
    return null;
  } catch (error: any) {
    console.error("Error handling redirect result:", error);
    return null;
  }
};

export const handleSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Demo account login function
export const signInWithDemo = async () => {
  try {
    // First try to sign in
    const result = await signInWithEmailAndPassword(auth, DEMO_EMAIL, DEMO_PASSWORD);
    return result.user;
  } catch (error: any) {
    console.error("Error signing in with demo account:", error);
    
    if (error.code === 'auth/user-not-found') {
      // If user doesn't exist, create it
      try {
        const newUser = await createUserWithEmailAndPassword(auth, DEMO_EMAIL, DEMO_PASSWORD);
        return newUser.user;
      } catch (createError: any) {
        console.error("Error creating demo account:", createError);
        if (createError.code === 'auth/email-already-in-use') {
          // Race condition - try signing in again
          const retryResult = await signInWithEmailAndPassword(auth, DEMO_EMAIL, DEMO_PASSWORD);
          return retryResult.user;
        } else if (createError.code === 'auth/operation-not-allowed') {
          throw new Error("Email/password sign-in is not enabled. Please enable it in the Firebase console Authentication section.");
        } else {
          throw createError;
        }
      }
    } else if (error.code === 'auth/operation-not-allowed') {
      throw new Error("Email/password sign-in is not enabled. Please enable it in the Firebase console Authentication section.");
    } else if (error.code === 'auth/wrong-password') {
      throw new Error("Invalid demo credentials. The demo password may have been changed.");
    } else {
      throw error;
    }
  }
};

// Helper function to convert Firebase user to our app's user format
export const formatFirebaseUser = (firebaseUser: any) => {
  if (!firebaseUser) return null;
  
  // For demo account, provide more user-friendly display info
  if (firebaseUser.email === DEMO_EMAIL) {
    return {
      id: firebaseUser.uid,
      name: "Demo User",
      username: firebaseUser.email,
      userType: "startup",
      avatarUrl: null,
    };
  }
  
  // Try to get userType from localStorage, or use default
  const userType = localStorage.getItem(`userType_${firebaseUser.uid}`) || "startup";
  
  return {
    id: firebaseUser.uid,
    name: firebaseUser.displayName || "User",
    username: firebaseUser.email || "",
    userType: userType,
    avatarUrl: firebaseUser.photoURL,
  };
};

export default app;