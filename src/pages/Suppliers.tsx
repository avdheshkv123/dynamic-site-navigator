
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, MapPin, Phone, Mail, Globe, MoreHorizontal } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const suppliers = [
  {
    id: 1,
    name: "Organic Harvest Co.",
    category: "Organic Produce",
    contact: "Jane Smith",
    email: "jane@organicharvest.com",
    phone: "(555) 123-4567",
    location: "Portland, OR",
    status: "Active",
    logo: "https://images.unsplash.com/photo-1498579809087-ef1e558fd1da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 2,
    name: "Global Spice Traders",
    category: "Spices & Seasonings",
    contact: "Michael Chen",
    email: "michael@globalspice.com",
    phone: "(555) 234-5678",
    location: "San Francisco, CA",
    status: "Active",
    logo: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3BpY2VzfGVufDB8fDB8fHww"
  },
  {
    id: 3,
    name: "Artisan Bakery Supply",
    category: "Bakery Ingredients",
    contact: "Sarah Johnson",
    email: "sarah@artisanbakery.com",
    phone: "(555) 345-6789",
    location: "Chicago, IL",
    status: "Inactive",
    logo: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFrZXJ5fGVufDB8fDB8fHww"
  },
  {
    id: 4,
    name: "Pacific Seafood Co.",
    category: "Seafood",
    contact: "David Kim",
    email: "david@pacificseafood.com",
    phone: "(555) 456-7890",
    location: "Seattle, WA",
    status: "Active",
    logo: "https://images.unsplash.com/photo-1579684947550-22e945225d9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2VhZm9vZHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 5,
    name: "Vineyard Distributors",
    category: "Wines & Spirits",
    contact: "Isabella Garcia",
    email: "isabella@vineyard.com",
    phone: "(555) 567-8901",
    location: "Napa Valley, CA",
    status: "Active",
    logo: "https://images.unsplash.com/photo-1569919659476-f0852f6834b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmlueWFyZHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 6,
    name: "Farm Fresh Dairy",
    category: "Dairy Products",
    contact: "Robert Wilson",
    email: "robert@farmfresh.com",
    phone: "(555) 678-9012",
    location: "Madison, WI",
    status: "Pending",
    logo: "https://images.unsplash.com/photo-1596097635121-14b63b7a0c23?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGFpcnl8ZW58MHx8MHx8fDA%3D"
  }
];

const Suppliers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Suppliers</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Supplier
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search suppliers..."
          className="pl-8 pr-4 py-2 w-full md:w-[300px] rounded-md border"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map((supplier) => (
          <Card key={supplier.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded overflow-hidden">
                    <img 
                      src={supplier.logo} 
                      alt={supplier.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle>{supplier.name}</CardTitle>
                    <CardDescription>{supplier.category}</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Place Order</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                {supplier.location}
              </div>
              <div className="flex items-center text-sm">
                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                {supplier.phone}
              </div>
              <div className="flex items-center text-sm">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                {supplier.email}
              </div>
              <div className="flex items-center text-sm">
                <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-primary">Visit Website</span>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-3 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Contact: {supplier.contact}
              </span>
              <Badge 
                variant={
                  supplier.status === "Active" ? "default" : 
                  supplier.status === "Inactive" ? "secondary" : "outline"
                }
              >
                {supplier.status}
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Suppliers;
