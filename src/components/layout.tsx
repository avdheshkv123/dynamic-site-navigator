
import { MainNav } from "@/components/main-nav";
import { SidebarNav } from "@/components/sidebar-nav";
import { Footer } from "@/components/footer";
import { useAuth } from "@/contexts/auth-context";
import { Navigate, Outlet } from "react-router-dom";

export function Layout() {
  const { user, isLoading } = useAuth();
  
  // If still loading authentication state, show nothing
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex flex-1">
        <SidebarNav className="hidden md:block" />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
