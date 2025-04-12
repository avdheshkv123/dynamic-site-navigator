
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronDown, Bell, Search, Globe, MessageSquare } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

interface NavItem {
  title: string;
  href?: string;
  subItems?: { title: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    title: "Solutions",
    subItems: [
      { title: "Inventory Management", href: "/solutions/inventory" },
      { title: "Warehouse Management", href: "/solutions/warehouse" },
      { title: "Supply Chain", href: "/solutions/supply-chain" },
    ],
  },
  {
    title: "Industries",
    subItems: [
      { title: "Retail", href: "/industries/retail" },
      { title: "Manufacturing", href: "/industries/manufacturing" },
      { title: "Healthcare", href: "/industries/healthcare" },
      { title: "Logistics", href: "/industries/logistics" },
    ],
  },
  {
    title: "Resources",
    subItems: [
      { title: "Documentation", href: "/resources/documentation" },
      { title: "Guides", href: "/resources/guides" },
      { title: "Blog", href: "/resources/blog" },
      { title: "Support", href: "/resources/support" },
    ],
  },
  {
    title: "Company",
    subItems: [
      { title: "About Us", href: "/company/about" },
      { title: "Careers", href: "/company/careers" },
      { title: "Contact Us", href: "/company/contact" },
    ],
  },
];

export function MainNav() {
  const { user } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">
              <span className="text-primary">Inven</span>Flow
            </span>
          </Link>
        </div>

        <div className="flex justify-between flex-1 items-center">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item, index) => (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger className="flex items-center gap-1 cursor-pointer focus:outline-none">
                  <span>{item.title}</span>
                  {item.subItems && <ChevronDown className="h-4 w-4" />}
                </DropdownMenuTrigger>
                
                {item.subItems && (
                  <DropdownMenuContent align="start" className="w-48">
                    {item.subItems.map((subItem, idx) => (
                      <DropdownMenuItem key={idx} asChild>
                        <Link to={subItem.href} className="w-full">
                          {subItem.title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                )}
              </DropdownMenu>
            ))}
          </nav>
          
          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex sm:items-center">
              <div className="relative mr-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-64 rounded-md bg-background pl-8 pr-3 py-2 text-sm ring-offset-background 
                             file:border-0 file:bg-transparent file:text-sm file:font-medium 
                             placeholder:text-muted-foreground focus-visible:outline-none 
                             focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                             disabled:cursor-not-allowed disabled:opacity-50 h-9 md:w-[200px] lg:w-[250px] border"
                />
              </div>
            </div>

            <ThemeToggle />
            
            {/* Notification Panel */}
            <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Notifications</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <div className="border-l-4 border-primary p-4 bg-muted/50 rounded">
                    <h3 className="font-medium mb-1">New Product Added</h3>
                    <p className="text-sm text-muted-foreground">Organic Green Tea has been added to your inventory.</p>
                    <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
                  </div>
                  <div className="border-l-4 border-blue-500 p-4 bg-muted/50 rounded">
                    <h3 className="font-medium mb-1">Low Stock Alert</h3>
                    <p className="text-sm text-muted-foreground">Coffee Beans (Dark Roast) is running low. Consider reordering.</p>
                    <p className="text-xs text-muted-foreground mt-2">5 hours ago</p>
                  </div>
                  <div className="border-l-4 border-amber-500 p-4 bg-muted/50 rounded">
                    <h3 className="font-medium mb-1">Scheduled Maintenance</h3>
                    <p className="text-sm text-muted-foreground">System maintenance scheduled for April 15, 2025 at 2:00 AM.</p>
                    <p className="text-xs text-muted-foreground mt-2">1 day ago</p>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Button variant="ghost" className="text-primary text-sm">Mark all as read</Button>
                </div>
              </SheetContent>
            </Sheet>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>English (US)</DropdownMenuItem>
                <DropdownMenuItem>French</DropdownMenuItem>
                <DropdownMenuItem>Spanish</DropdownMenuItem>
                <DropdownMenuItem>German</DropdownMenuItem>
                <DropdownMenuItem>Japanese</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {!user ? (
              <Button variant="green" className="flex items-center" asChild>
                <Link to="/login">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Let's talk
                </Link>
              </Button>
            ) : (
              <Link to="/dashboard" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  {user.avatar || user.name.charAt(0)}
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
