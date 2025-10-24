import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, formatFirebaseUser, handleRedirectResult, handleSignOut } from './firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { sectorThemes } from '@/components/ui/sector-theme-selector';

// Define the User type
export type User = {
  id: number | string;
  name: string;
  username: string;
  userType: string;
  avatarUrl?: string;
};

// Define the AuthContext type
type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, userType: string) => Promise<void>;
  logout: () => Promise<void>;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  login: async () => { throw new Error('AuthContext not initialized') },
  register: async () => { throw new Error('AuthContext not initialized') },
  logout: async () => { throw new Error('AuthContext not initialized') },
});

// Map user types to theme IDs
const userTypeToThemeMap: Record<string, string> = {
  'startup': 'founder',
  'founder': 'founder',
  'investor': 'investor',
  'partner': 'partner',
  'lender': 'lender',
  'enterprise': 'enterprise',
  'analyst': 'analyst',
  'advisor': 'advisor',
  'mentor': 'mentor'
};

// Create a provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Login with email and password
  const login = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Auth state change will be handled by the onAuthStateChanged listener
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Register a new user
  const register = async (email: string, password: string, userType: string): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const displayName = email.split('@')[0]; // Use part of email as display name

      // Update the user profile with display name and custom claims
      await updateProfile(userCredential.user, {
        displayName: displayName
      });

      // Store user type in localStorage for now (ideally would be stored in database)
      localStorage.setItem(`userType_${userCredential.user.uid}`, userType);

      // Auto-select theme based on user type
      const themeId = userTypeToThemeMap[userType.toLowerCase()] || 'founder';
      const selectedTheme = sectorThemes.find(theme => theme.id === themeId);

      if (selectedTheme) {
        localStorage.setItem('preferred-sector-theme', themeId);
        // Dispatch custom event to notify theme selector
        window.dispatchEvent(new CustomEvent('userTypeThemeChange', { detail: { themeId } }));
      }

      // Auth state change will be handled by the onAuthStateChanged listener
    } catch (error: any) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      await handleSignOut();
      // Auth state change will be handled by the onAuthStateChanged listener
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: "Logout Error",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        if (firebaseUser) {
          // Convert Firebase user to our app's user format
          const formattedUser = formatFirebaseUser(firebaseUser);
          setUser(formattedUser);

          // Only show welcome toast when user is new or just logged in
          // To prevent showing on every page refresh
          const lastLoginTime = sessionStorage.getItem('lastLoginTime');
          const currentTime = Date.now();
          if (!lastLoginTime || (currentTime - parseInt(lastLoginTime)) > 300000) { // 5 minutes
            toast({
              title: `Welcome, ${formattedUser?.name}!`,
              description: "You're now signed in to Iterativ Planner.",
            });
            sessionStorage.setItem('lastLoginTime', currentTime.toString());
          }
        } else {
          setUser(null);
        }

        setLoading(false);
      },
      (error: any) => {
        console.error("Auth state change error:", error);

        // Format more user-friendly error messages
        let errorMessage = "Authentication error. Please try again.";
        if (error.code === 'auth/unauthorized-domain') {
          errorMessage = "This domain is not authorized for authentication. Please contact support.";
        } else if (error.code === 'auth/internal-error') {
          errorMessage = "Authentication service is experiencing issues. Please try again later.";
        }

        setError(errorMessage);
        toast({
          title: "Authentication Error",
          description: errorMessage,
          variant: "destructive",
        });

        setLoading(false);
      }
    );

    // Cleanup subscription
    return () => unsubscribe();
  }, [toast]);

  // Return the provider with the current value
  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Create a hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}