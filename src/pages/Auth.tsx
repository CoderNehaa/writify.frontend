import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Eye, EyeOff, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

const SocialButton = ({ provider, icon }: { provider: string; icon: React.ReactNode }) => {
  const handleSocialLogin = () => {
    // TODO: Implement OAuth via Lovable Cloud
    toast.info(`${provider} login will be implemented with Lovable Cloud`);
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={handleSocialLogin}
    >
      {icon}
      Continue with {provider}
    </Button>
  );
};

// Mock username availability check - replace with actual API call
const checkUsernameAvailability = async (username: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const takenUsernames = ["admin", "user", "test", "demo"];
  return !takenUsernames.includes(username.toLowerCase());
};

const signInSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(8, "Password must not exceed 8 characters")
    .required("Password is required"),
});

const signUpSchema = Yup.object({
  name: Yup.string()
    .required("Full name is required"),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(8, "Username must not exceed 8 characters")
    .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(8, "Password must not exceed 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const defaultMode = searchParams.get("mode") === "signup" ? "signup" : "signin";
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  const signInFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: (values) => {
      // TODO: Implement actual authentication
      toast.success("Signed in successfully!");
      navigate("/");
    },
  });

  const signUpFormik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      if (!usernameAvailable) {
        toast.error("Please choose an available username");
        return;
      }
      // TODO: Implement actual authentication
      toast.success("Account created successfully!");
      navigate("/");
    },
  });

  // Check username availability
  useEffect(() => {
    const checkUsername = async () => {
      if (signUpFormik.values.username.length >= 3 && signUpFormik.values.username.length <= 8) {
        setCheckingUsername(true);
        const available = await checkUsernameAvailability(signUpFormik.values.username);
        setUsernameAvailable(available);
        setCheckingUsername(false);
      } else {
        setUsernameAvailable(null);
      }
    };

    const timeoutId = setTimeout(checkUsername, 500);
    return () => clearTimeout(timeoutId);
  }, [signUpFormik.values.username]);

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome to Writify</h1>
            <p className="text-muted-foreground">Join our community of writers and readers</p>
          </div>

          <Tabs defaultValue={defaultMode} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <Card>
                <CardHeader>
                  <CardTitle>Sign In</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={signInFormik.handleSubmit} className="space-y-4">
                    <div className="space-y-3">
                      <SocialButton 
                        provider="Google" 
                        icon={
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                        }
                      />
                      <SocialButton 
                        provider="Facebook" 
                        icon={
                          <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        }
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Or continue with email
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="name@example.com"
                        {...signInFormik.getFieldProps("email")}
                      />
                      {signInFormik.touched.email && signInFormik.errors.email && (
                        <p className="text-sm text-destructive">{signInFormik.errors.email}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="signin-password"
                          type={showSignInPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pr-10"
                          {...signInFormik.getFieldProps("password")}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowSignInPassword(!showSignInPassword)}
                        >
                          {showSignInPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      {signInFormik.touched.password && signInFormik.errors.password && (
                        <p className="text-sm text-destructive">{signInFormik.errors.password}</p>
                      )}
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      variant="hero"
                      disabled={!signInFormik.isValid || !signInFormik.dirty}
                    >
                      Sign In
                    </Button>
                    <div className="text-center">
                      <Button type="button" variant="link" size="sm">
                        Forgot password?
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>
                    Start your writing journey today
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={signUpFormik.handleSubmit} className="space-y-4">
                    <div className="space-y-3">
                      <SocialButton 
                        provider="Google" 
                        icon={
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                        }
                      />
                      <SocialButton 
                        provider="Facebook" 
                        icon={
                          <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        }
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Or continue with email
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input
                        id="signup-name"
                        placeholder="John Doe"
                        {...signUpFormik.getFieldProps("name")}
                      />
                      {signUpFormik.touched.name && signUpFormik.errors.name && (
                        <p className="text-sm text-destructive">{signUpFormik.errors.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-username">Username</Label>
                      <div className="relative">
                        <Input
                          id="signup-username"
                          placeholder="johndoe"
                          className="pr-10"
                          {...signUpFormik.getFieldProps("username")}
                        />
                        <div className="absolute right-0 top-0 h-full px-3 flex items-center">
                          {checkingUsername && (
                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                          )}
                          {!checkingUsername && usernameAvailable === true && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          {!checkingUsername && usernameAvailable === false && (
                            <XCircle className="h-4 w-4 text-destructive" />
                          )}
                        </div>
                      </div>
                      {signUpFormik.touched.username && signUpFormik.errors.username && (
                        <p className="text-sm text-destructive">{signUpFormik.errors.username}</p>
                      )}
                      {usernameAvailable === false && !signUpFormik.errors.username && (
                        <p className="text-sm text-destructive">Username is already taken</p>
                      )}
                      {usernameAvailable === true && !signUpFormik.errors.username && (
                        <p className="text-sm text-green-600">Username is available</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="name@example.com"
                        {...signUpFormik.getFieldProps("email")}
                      />
                      {signUpFormik.touched.email && signUpFormik.errors.email && (
                        <p className="text-sm text-destructive">{signUpFormik.errors.email}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pr-10"
                          {...signUpFormik.getFieldProps("password")}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      {signUpFormik.touched.password && signUpFormik.errors.password && (
                        <p className="text-sm text-destructive">{signUpFormik.errors.password}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Input
                          id="signup-confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          className="pr-10"
                          {...signUpFormik.getFieldProps("confirmPassword")}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      {signUpFormik.touched.confirmPassword && signUpFormik.errors.confirmPassword && (
                        <p className="text-sm text-destructive">{signUpFormik.errors.confirmPassword}</p>
                      )}
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      variant="hero"
                      disabled={!signUpFormik.isValid || !signUpFormik.dirty || usernameAvailable !== true}
                    >
                      Create Account
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;
