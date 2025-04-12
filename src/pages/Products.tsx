
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, 
  Search, 
  SlidersHorizontal,
  ArrowUpDown,
  MoreHorizontal
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const products = [
  {
    id: "PROD-1234",
    name: "Organic Green Tea",
    sku: "TEA-001",
    category: "Beverages",
    stock: 150,
    price: 12.99,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1523920290228-4f321a939b02?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3JlZW4lMjB0ZWF8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: "PROD-2345",
    name: "Coffee Beans (Dark Roast)",
    sku: "COF-101",
    category: "Beverages",
    stock: 30,
    price: 18.50,
    status: "Low Stock",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwYmVhbnN8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: "PROD-3456",
    name: "Whole Grain Pasta",
    sku: "PASTA-201",
    category: "Dry Goods",
    stock: 245,
    price: 3.99,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1603729362753-f8162ac6c3df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFzdGF8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: "PROD-4567",
    name: "Extra Virgin Olive Oil",
    sku: "OIL-301",
    category: "Oils & Vinegars",
    stock: 75,
    price: 15.75,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2xpdmUlMjBvaWx8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: "PROD-5678",
    name: "Artisan Honey",
    sku: "HONEY-401",
    category: "Sweeteners",
    stock: 0,
    price: 9.99,
    status: "Out of Stock",
    image: "https://images.unsplash.com/photo-1558642891-54be180ea339?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9uZXl8ZW58MHx8MHx8fDA%3D"
  }
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search products..."
            className="pl-8 pr-4 py-2 w-full sm:w-[300px] rounded-md border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="rounded-lg border bg-card text-card-foreground shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>
                <div className="flex items-center">
                  Product <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="h-10 w-10 rounded-md overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
                <TableCell className="text-right">${product.price}</TableCell>
                <TableCell>
                  <Badge 
                    variant={product.status === "In Stock" ? "default" : 
                           product.status === "Low Stock" ? "outline" : "destructive"}
                  >
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Products;
