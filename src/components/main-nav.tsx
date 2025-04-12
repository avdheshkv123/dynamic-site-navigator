
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronDown, Bell, Search, Globe } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";

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
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { user } = useAuth();

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
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.title)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <div className="flex items-center gap-1 cursor-pointer">
                  <span>{item.title}</span>
                  {item.subItems && <ChevronDown className="h-4 w-4" />}
                </div>
                
                {item.subItems && openMenu === item.title && (
                  <div className="absolute left-0 top-full mt-2 w-48 rounded-md bg-popover p-2 shadow-md">
                    {item.subItems.map((subItem, idx) => (
                      <Link
                        key={idx}
                        to={subItem.href}
                        className="block px-3 py-2 text-sm rounded-md hover:bg-accent"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
            </Button>
            
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
            </Button>
            
            {!user ? (
              <Button variant="green" asChild>
                <Link to="/login">Let's talk</Link>
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
