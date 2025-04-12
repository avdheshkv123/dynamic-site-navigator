
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  PackageOpen, 
  BarChart3, 
  Store, 
  Settings,
  ChevronRight,
  ChevronLeft,
  ShoppingCart,
  ClipboardList,
  Users
} from "lucide-react";
import { buttonVariants } from "./ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  
  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["customer", "administrator", "supplier"]
    },
    {
      title: "Products",
      href: "/products",
      icon: Package,
      roles: ["administrator", "supplier", "customer"]
    },
    {
      title: "Orders",
      href: "/orders",
      icon: ShoppingCart,
      roles: ["administrator", "supplier", "customer"]
    },
    {
      title: "Inventory",
      href: "/inventory",
      icon: ClipboardList,
      roles: ["administrator", "supplier"]
    },
    {
      title: "Stock Movements",
      href: "/stock-movements",
      icon: PackageOpen,
      roles: ["administrator"]
    },
    {
      title: "Reports",
      href: "/reports",
      icon: BarChart3,
      roles: ["administrator", "customer", "supplier"]
    },
    {
      title: "Suppliers",
      href: "/suppliers",
      icon: Store,
      roles: ["administrator"]
    },
    {
      title: "User Management",
      href: "/users",
      icon: Users,
      roles: ["administrator"]
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      roles: ["administrator", "customer", "supplier"]
    },
  ];

  // Filter nav items based on user role
  const filteredNavItems = user 
    ? navItems.filter(item => item.roles.includes(user.role))
    : [];

  return (
    <div className={cn("pb-12 transition-all duration-300", 
                       collapsed ? "w-16" : "w-64",
                       className)} 
         {...props}>
      <div className="flex justify-between items-center py-4 px-4 border-b">
        {!collapsed && (
          <h2 className="text-xl font-semibold tracking-tight">
            <span className="text-primary">Inven</span>Flow
          </h2>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-accent"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
      <div className="space-y-1 py-4">
        {filteredNavItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href
                ? "bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground"
                : "hover:bg-accent hover:text-accent-foreground",
              "justify-start h-10 w-full",
              collapsed ? "px-3" : "px-4"
            )}
          >
            <item.icon className={cn("h-5 w-5", collapsed ? "" : "mr-2")} />
            {!collapsed && <span>{item.title}</span>}
          </Link>
        ))}
      </div>
      {!collapsed && user && (
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <div className="flex items-center space-x-3 rounded-md border px-4 py-3">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              {user.avatar || user.name.charAt(0)}
            </div>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
