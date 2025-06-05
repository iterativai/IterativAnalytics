import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SiGoogle } from 'react-icons/si';
import { signInWithGoogle, signInWithDemo } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Users, ArrowRight } from 'lucide-react';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState<{google: boolean, demo: boolean, guest: boolean}>({
    google: false,
    demo: false,
    guest: false
  });
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      setIsLoading(prev => ({...prev, google: true}));
      await signInWithGoogle();
      // Auth state change will be handled by the AuthProvider
    } catch (err: any) {
      console.error('Error signing in with Google:', err);
      
      // Handle specific Firebase error codes
      let errorMessage = 'There was a problem signing in with Google. Please try again.';
      
      if (err.code === 'auth/configuration-not-found') {
        errorMessage = 'Firebase authentication is not properly configured. Please make sure you have added the correct Firebase configuration and authorized domains.';
      } else if (err.code === 'auth/unauthorized-domain') {
        errorMessage = 'This domain is not authorized for Firebase authentication. Please add this domain to your Firebase Console under Authentication > Settings > Authorized Domains.';
      } else if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in was cancelled. Please try again when ready.';
      } else if (err.code === 'auth/popup-blocked') {
        errorMessage = 'Sign-in popup was blocked by your browser. Please allow popups for this site.';
      }
      
      setError(errorMessage);
      
      toast({
        title: 'Sign in failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(prev => ({...prev, google: false}));
    }
  };
  
  const handleDemoSignIn = async () => {
    try {
      setError(null);
      setIsLoading(prev => ({...prev, demo: true}));
      await signInWithDemo();
      
      toast({
        title: 'Demo login successful',
        description: 'Welcome to Iterativ Planner!',
      });
      // Auth state change will be handled by the AuthProvider
    } catch (err: any) {
      console.error('Error signing in with demo account:', err);
      
      const errorMessage = 'There was a problem signing in with the demo account. Please try again.';
      setError(errorMessage);
      
      toast({
        title: 'Demo login failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(prev => ({...prev, demo: false}));
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Sign in to Iterativ Planner</CardTitle>
        <CardDescription className="text-center">
          Get started with AI-powered business plan optimization
        </CardDescription>
        <div className="flex items-center justify-center mt-2">
          <div className="h-1 w-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive" className="mb-4" role="alert">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <AlertDescription className="font-medium">{error}</AlertDescription>
          </Alert>
        )}
        
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 py-6"
          onClick={handleGoogleSignIn}
          disabled={isLoading.google || isLoading.demo || isLoading.guest}
          aria-label="Sign in with Google account"
        >
          {isLoading.google ? (
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" aria-hidden="true" />
          ) : (
            <SiGoogle className="w-5 h-5 text-[#4285F4]" aria-hidden="true" />
          )}
          <span>{isLoading.google ? 'Signing in...' : 'Sign in with Google'}</span>
        </Button>
        
        <Button 
          variant="default" 
          className="w-full flex items-center justify-center gap-2 py-6 bg-gradient-to-r from-blue-600 to-blue-400"
          onClick={handleDemoSignIn}
          disabled={isLoading.google || isLoading.demo || isLoading.guest}
          aria-label="Sign in with demo account"
        >
          {isLoading.demo ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" aria-hidden="true" />
          ) : (
            <Users className="w-5 h-5" aria-hidden="true" />
          )}
          <span>{isLoading.demo ? 'Signing in...' : 'Try Demo Account'}</span>
        </Button>
        
        <div className="relative flex py-3 items-center">
          <div className="flex-grow border-t border-muted"></div>
          <span className="flex-shrink mx-3 text-xs text-muted-foreground">or</span>
          <div className="flex-grow border-t border-muted"></div>
        </div>
        
        <p className="text-sm text-muted-foreground text-center">
          Explore our platform without creating an account
        </p>
        
        <Link to="/app">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-center gap-2"
            onClick={() => {
              setIsLoading(prev => ({...prev, guest: true}));
              localStorage.setItem('guestMode', 'true');
              window.location.href = '/app';
            }}
            disabled={isLoading.guest}
            aria-label="Continue as guest to explore the platform"
          >
            {isLoading.guest ? (
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" aria-hidden="true" />
            ) : (
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            )}
            <span>{isLoading.guest ? 'Redirecting...' : 'Continue as Guest'}</span>
          </Button>
        </Link>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <p className="text-xs text-center text-muted-foreground">
          By signing in, you agree to our{" "}
          <a href="#terms" className="underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary rounded-sm" aria-label="Read Terms of Service">Terms of Service</a>{" "}
          and{" "}
          <a href="#privacy" className="underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary rounded-sm" aria-label="Read Privacy Policy">Privacy Policy</a>.
        </p>
        <p className="text-xs text-center text-muted-foreground">
          We respect your privacy and never share your data with third parties without your consent.
        </p>
      </CardFooter>
    </Card>
  );
}