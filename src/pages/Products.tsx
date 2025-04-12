import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, 
  Search, 
  SlidersHorizontal,
  ArrowUpDown,
  MoreHorizontal,
  Filter,
  ShoppingCart,
  Heart,
  ArrowUpLeft
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const products = [
  {
    id: "PROD-1234",
    name: "Organic Green Tea",
    sku: "TEA-001",
    category: "Beverages",
    stock: 150,
    price: 12.99,
    status: "In Stock",
    supplier: "Green Leaf Organics",
    image: "https://images.unsplash.com/photo-1523920290228-4f321a939b02?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3JlZW4lMjB0ZWF8ZW58MHx8MHx8fDA%3D",
    description: "Premium organic green tea leaves. Rich in antioxidants with a delicate flavor profile."
  },
  {
    id: "PROD-2345",
    name: "Coffee Beans (Dark Roast)",
    sku: "COF-101",
    category: "Beverages",
    stock: 30,
    price: 18.50,
    status: "Low Stock",
    supplier: "Mountain Coffee Co.",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwYmVhbnN8ZW58MHx8MHx8fDA%3D",
    description: "Dark roast coffee beans with rich, bold flavor. Sourced from sustainable farms in Colombia."
  },
  {
    id: "PROD-3456",
    name: "Whole Grain Pasta",
    sku: "PASTA-201",
    category: "Dry Goods",
    stock: 245,
    price: 3.99,
    status: "In Stock",
    supplier: "Italiano Foods",
    image: "https://images.unsplash.com/photo-1603729362753-f8162ac6c3df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFzdGF8ZW58MHx8MHx8fDA%3D",
    description: "Whole grain pasta made from durum wheat. High in fiber and protein."
  },
  {
    id: "PROD-4567",
    name: "Extra Virgin Olive Oil",
    sku: "OIL-301",
    category: "Oils & Vinegars",
    stock: 75,
    price: 15.75,
    status: "In Stock",
    supplier: "Mediterranean Imports",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2xpdmUlMjBvaWx8ZW58MHx8MHx8fDA%3D",
    description: "Premium cold-pressed extra virgin olive oil from Greece. Perfect for cooking and salad dressings."
  },
  {
    id: "PROD-5678",
    name: "Artisan Honey",
    sku: "HONEY-401",
    category: "Sweeteners",
    stock: 0,
    price: 9.99,
    status: "Out of Stock",
    supplier: "Beekeepers Collective",
    image: "https://images.unsplash.com/photo-1558642891-54be180ea339?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9uZXl8ZW58MHx8MHx8fDA%3D",
    description: "Raw, unfiltered wildflower honey. Locally sourced from sustainable apiaries."
  }
];

const categories = ["All", "Beverages", "Dry Goods", "Oils & Vinegars", "Sweeteners"];

const Products = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("table");
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const viewProduct = (product) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  const addToCart = (product) => {
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      // Increase quantity if already in cart
      const updatedCart = cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      // Add new item to cart
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const addToWishlist = (product) => {
    if (!wishlist.some(item => item.id === product.id)) {
      setWishlist([...wishlist, product]);
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been saved to your wishlist.`,
      });
    } else {
      toast({
        title: "Already in Wishlist",
        description: `${product.name} is already in your wishlist.`,
      });
    }
  };

  const CustomerProducts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant={viewMode === "table" ? "default" : "outline"} size="sm" onClick={() => setViewMode("table")}>
            Table
          </Button>
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            Grid
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <ShoppingCart className="h-4 w-4 mr-1" />
            Cart ({cart.length})
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <Heart className="h-4 w-4 mr-1" />
            Wishlist ({wishlist.length})
          </Button>
        </div>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-2">
        {categories.map(category => (
          <Button 
            key={category} 
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {viewMode === "table" ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Product <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
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
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
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
                          <DropdownMenuItem onClick={() => viewProduct(product)}>View Details</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => addToCart(product)} disabled={product.status === "Out of Stock"}>
                            Add to Cart
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => addToWishlist(product)}>
                            Save to Wishlist
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <Badge 
                    variant={product.status === "In Stock" ? "default" : 
                           product.status === "Low Stock" ? "outline" : "destructive"}
                  >
                    {product.status}
                  </Badge>
                </div>
                <CardDescription>{product.category}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
                <p className="line-clamp-2 text-sm text-muted-foreground mt-2">{product.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => viewProduct(product)}>
                  View Details
                </Button>
                <Button size="sm" onClick={() => addToCart(product)} disabled={product.status === "Out of Stock"}>
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const SupplierProducts = () => (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-0">
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
                  <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
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
                        <DropdownMenuItem onClick={() => viewProduct(product)}>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Update Stock</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const AdminProducts = () => (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="all">All Products</TabsTrigger>
        <TabsTrigger value="in-stock">In Stock</TabsTrigger>
        <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
        <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
        <TabsTrigger value="pending">Pending Approval</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-0">
        <Card>
          <CardContent className="p-0">
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
                  <TableHead>Supplier</TableHead>
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
                    <TableCell>{product.supplier}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">{product.stock}</TableCell>
                    <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
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
                          <DropdownMenuItem onClick={() => viewProduct(product)}>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Update Stock</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Other tabs would have similar content with filtered products */}
    </Tabs>
  );

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        {(user?.role === "administrator" || user?.role === "supplier") && (
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        )}
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
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {user?.role === "customer" && <CustomerProducts />}
      {user?.role === "supplier" && <SupplierProducts />}
      {user?.role === "administrator" && <AdminProducts />}
      
      {/* Product Details Dialog */}
      <Dialog open={showProductDetails} onOpenChange={setShowProductDetails}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
            <DialogDescription>
              {selectedProduct?.sku}
            </DialogDescription>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="grid gap-6">
              <div className="aspect-video w-full overflow-hidden rounded-md">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold">{selectedProduct.name}</h2>
                  <Badge 
                    variant={selectedProduct.status === "In Stock" ? "default" : 
                           selectedProduct.status === "Low Stock" ? "outline" : "destructive"}
                  >
                    {selectedProduct.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{selectedProduct.category}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium">Price</p>
                    <p className="text-2xl font-bold">${selectedProduct.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Stock</p>
                    <p className="text-xl">{selectedProduct.stock} units</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium mb-1">Description</p>
                  <p className="text-sm">{selectedProduct.description}</p>
                </div>
                
                {(user?.role === "administrator" || user?.role === "supplier") && (
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-1">Supplier</p>
                    <p className="text-sm">{selectedProduct.supplier}</p>
                  </div>
                )}
              </div>
              
              <DialogFooter className="flex flex-row justify-between items-center sm:justify-between">
                <Button variant="outline" onClick={() => setShowProductDetails(false)}>
                  Close
                </Button>
                
                {user?.role === "customer" && (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => addToWishlist(selectedProduct)}>
                      <Heart className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button onClick={() => {
                      addToCart(selectedProduct);
                      setShowProductDetails(false);
                    }} disabled={selectedProduct.status === "Out of Stock"}>
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                )}
                
                {(user?.role === "administrator" || user?.role === "supplier") && (
                  <div className="flex gap-2">
                    <Button variant="outline">
                      Edit
                    </Button>
                    <Button>
                      Update Stock
                    </Button>
                  </div>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
