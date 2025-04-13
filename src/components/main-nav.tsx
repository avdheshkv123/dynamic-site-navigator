
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export function MainNav() {
  const { user, logout } = useAuth();

  const handleSignOut = async () => {
    await logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl">
              <span className="text-primary">Inven</span>Flow
            </span>
          </Link>
        </div>

        <div className="flex justify-between flex-1 items-center">
          {/* Right side navigation items */}
          <div className="flex-1"></div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            
            {!user ? (
              <Button variant="green" className="flex items-center" asChild>
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  {user.avatar || user.name.charAt(0)}
                </div>
                <Button variant="ghost" size="sm" onClick={handleSignOut} className="flex items-center gap-1">
                  <LogOut className="h-4 w-4" />
                  Sign out
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
