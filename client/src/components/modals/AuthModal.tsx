import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/AuthProvider";
import { signInWithGoogle, signInWithDemo } from "@/lib/firebase";

// Form schemas
const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
  userType: z.enum(["startup", "investor", "partner"], {
    message: "Please select a role",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

interface AuthModalProps {
  defaultTab?: "login" | "register";
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AuthModal = ({ 
  defaultTab = "login", 
  trigger,
  open: controlledOpen,
  onOpenChange: setControlledOpen 
}: AuthModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);
  const { toast } = useToast();
  const { login, register } = useAuth();

  const open = controlledOpen !== undefined ? controlledOpen : isOpen;
  const setOpen = setControlledOpen || setIsOpen;

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      userType: "startup",
    },
  });

  const formatAuthError = (error: any) => {
    const errorCode = error?.code || "";
    
    // Common Firebase auth error messages
    const errorMap: Record<string, string> = {
      "auth/email-already-in-use": "This email is already registered. Please login instead.",
      "auth/invalid-email": "Invalid email address format.",
      "auth/user-disabled": "This account has been disabled. Please contact support.",
      "auth/user-not-found": "No account found with this email. Please register first.",
      "auth/wrong-password": "Incorrect password. Please try again.",
      "auth/weak-password": "Password is too weak. Please use at least 6 characters.",
      "auth/operation-not-allowed": "This operation is not allowed.",
      "auth/unauthorized-domain": "Sign-in with Google is not configured for this domain. Please use email/password login instead.",
      "auth/popup-blocked": "Sign-in popup was blocked by your browser. Please allow popups for this site.",
      "auth/popup-closed-by-user": "Sign-in was canceled. Please try again.",
      "auth/network-request-failed": "Network error. Please check your internet connection."
    };
    
    return errorMap[errorCode] || error.message || "An error occurred during authentication";
  };

  const onLoginSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });

      setOpen(false);
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: formatAuthError(error),
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    try {
      const { confirmPassword, ...registerData } = data;
      await register(registerData.email, registerData.password, registerData.userType);

      toast({
        title: "Registration successful",
        description: "Your account has been created",
      });

      setOpen(false);
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: formatAuthError(error),
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      
      toast({
        title: "Login successful",
        description: "You're now signed in with Google!",
      });
      
      setOpen(false);
    } catch (error: any) {
      if (error.code === "auth/unauthorized-domain") {
        toast({
          title: "Google login not available",
          description: "Google login is not configured for development. Please use email/password login instead, or add this domain in Firebase console.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Google login failed",
          description: formatAuthError(error),
          variant: "destructive",
        });
      }
      console.error(error);
    }
  };

  const handleMicrosoftLogin = () => {
    toast({
      title: "Coming soon",
      description: "Microsoft login is not yet available",
    });
  };
  
  const handleDemoLogin = async () => {
    try {
      await signInWithDemo();
      
      toast({
        title: "Demo login successful",
        description: "You're now signed in with a demo account!",
      });
      
      setOpen(false);
    } catch (error: any) {
      toast({
        title: "Demo login failed",
        description: formatAuthError(error),
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent 
        className="sm:max-w-[425px]"
        aria-describedby="auth-dialog-description"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold mb-2">
            {activeTab === "login" ? "Welcome Back" : "Create Account"}
          </DialogTitle>
          <DialogDescription id="auth-dialog-description" className="text-center mb-4">
            {activeTab === "login" 
              ? "Log in to access your account and continue your journey."
              : "Register to start your free trial and explore all features."}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit"
                  className="w-full bg-primary mt-4"
                >
                  Login
                </Button>
              </form>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <Button 
                variant="default" 
                type="button" 
                onClick={handleDemoLogin}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Continue with Demo
              </Button>
              <Button 
                variant="outline" 
                type="button" 
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-2"
                title="Note: Google Sign-In requires domain configuration in Firebase console"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  <path fill="none" d="M1 1h22v22H1z" />
                </svg>
                Continue with Google
              </Button>
              <Button 
                variant="outline" 
                type="button" 
                onClick={handleMicrosoftLogin}
                className="flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" width="23" height="23" className="w-5 h-5">
                  <path fill="#f25022" d="M1 1h10v10H1z"></path>
                  <path fill="#00a4ef" d="M1 12h10v10H1z"></path>
                  <path fill="#7fba00" d="M12 1h10v10H12z"></path>
                  <path fill="#ffb900" d="M12 12h10v10H12z"></path>
                </svg>
                Continue with Microsoft
              </Button>
            </div>
          </Form>
          </TabsContent>

          <TabsContent value="register">
            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                <FormField
                  control={registerForm.control}
                  name="userType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <select {...field} className="w-full px-4 py-2 mb-4 border rounded">
                          <option value="startup">Startup</option>
                          <option value="investor">Investor</option>
                          <option value="partner">Partner</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Create a password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirm your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary">
                  Create Account
                </Button>
              </form>
            </Form>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <Button 
                variant="default" 
                type="button" 
                onClick={handleDemoLogin}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Continue with Demo
              </Button>
              <Button 
                variant="outline" 
                type="button" 
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 text-center text-sm text-gray-500">
          {activeTab === "login" ? (
            <p>Don't have an account? <Button variant="link" className="p-0 h-auto" onClick={() => setActiveTab("register")}>Register</Button></p>
          ) : (
            <p>Already have an account? <Button variant="link" className="p-0 h-auto" onClick={() => setActiveTab("login")}>Log in</Button></p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;