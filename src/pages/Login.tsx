
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, UserRole } from "@/contexts/auth-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState<UserRole>("customer");
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password.",
        variant: "destructive"
      });
      return;
    }

    if (isSignup && !name) {
      toast({
        title: "Error",
        description: "Please enter your name.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      if (isSignup) {
        await signup(email, password, name, role);
        toast({
          title: "Success",
          description: `Account created successfully.`,
        });
      } else {
        await login(email, password, role);
        toast({
          title: "Success",
          description: `Logged in as ${role}.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: isSignup 
          ? "Failed to create account. Please try again." 
          : "Failed to log in. Please check your credentials.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container relative flex-col items-center justify-center min-h-screen grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-brand-dark">
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
            alt="Inventory Management" 
            className="object-cover w-full h-full opacity-20"
          />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <span className="text-primary text-2xl font-bold">Inven</span>Flow
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "InvenFlow has revolutionized our inventory management process, making it efficient and error-free."
            </p>
            <footer className="text-sm">Sarah Johnson, Supply Chain Director</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {isSignup ? "Create an Account" : "Sign In to InvenFlow"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isSignup 
                ? "Enter your details to create your account" 
                : "Enter your credentials to access your account"}
            </p>
          </div>

          <Tabs defaultValue="customer" className="w-full" onValueChange={(v) => setRole(v as UserRole)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="administrator">Admin</TabsTrigger>
              <TabsTrigger value="supplier">Supplier</TabsTrigger>
            </TabsList>
            <TabsContent value={role} className="mt-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignup && (
                  <div className="space-y-1">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      type="text" 
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                )}
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder={`${role.toLowerCase()}@invenflow.com`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" variant="green" disabled={isLoading}>
                  {isLoading 
                    ? (isSignup ? "Creating Account..." : "Signing In...") 
                    : (isSignup ? `Sign Up as ${role}` : `Sign In as ${role}`)}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="text-center text-sm text-muted-foreground">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <Button 
              variant="link" 
              className="p-0 h-auto text-primary underline-offset-4 hover:underline"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
