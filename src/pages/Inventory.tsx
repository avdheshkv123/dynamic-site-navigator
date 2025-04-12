
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, 
  Search, 
  SlidersHorizontal,
  ArrowUpDown,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Download,
  Upload
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const inventoryItems = [
  {
    id: "PROD-1234",
    name: "Organic Green Tea",
    sku: "TEA-001",
    category: "Beverages",
    inStock: 150,
    reorderPoint: 50,
    price: 12.99,
    status: "In Stock",
    recentMovement: "+25",
    movementTrend: "up",
    supplier: "Green Leaf Organics",
    image: "https://images.unsplash.com/photo-1523920290228-4f321a939b02?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3JlZW4lMjB0ZWF8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: "PROD-2345",
    name: "Coffee Beans (Dark Roast)",
    sku: "COF-101",
    category: "Beverages",
    inStock: 30,
    reorderPoint: 50,
    price: 18.50,
    status: "Low Stock",
    recentMovement: "-12",
    movementTrend: "down",
    supplier: "Mountain Coffee Co.",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwYmVhbnN8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: "PROD-3456",
    name: "Whole Grain Pasta",
    sku: "PASTA-201",
    category: "Dry Goods",
    inStock: 245,
    reorderPoint: 75,
    price: 3.99,
    status: "In Stock",
    recentMovement: "+50",
    movementTrend: "up",
    supplier: "Italiano Foods",
    image: "https://images.unsplash.com/photo-1603729362753-f8162ac6c3df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFzdGF8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: "PROD-4567",
    name: "Extra Virgin Olive Oil",
    sku: "OIL-301",
    category: "Oils & Vinegars",
    inStock: 75,
    reorderPoint: 100,
    price: 15.75,
    status: "Low Stock",
    recentMovement: "-15",
    movementTrend: "down",
    supplier: "Mediterranean Imports",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2xpdmUlMjBvaWx8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: "PROD-5678",
    name: "Artisan Honey",
    sku: "HONEY-401",
    category: "Sweeteners",
    inStock: 0,
    reorderPoint: 25,
    price: 9.99,
    status: "Out of Stock",
    recentMovement: "-25",
    movementTrend: "down",
    supplier: "Beekeepers Collective",
    image: "https://images.unsplash.com/photo-1558642891-54be180ea339?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9uZXl8ZW58MHx8MHx8fDA%3D"
  }
];

const Inventory = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAdjustStock, setShowAdjustStock] = useState(false);
  const [stockAdjustment, setStockAdjustment] = useState({ amount: "", reason: "" });
  const [filteredItems, setFilteredItems] = useState(inventoryItems);
  const [activeTab, setActiveTab] = useState("all");

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterItems(term, activeTab);
  };

  const filterItems = (term, tab) => {
    let filtered = inventoryItems.filter(item => 
      item.name.toLowerCase().includes(term.toLowerCase()) ||
      item.sku.toLowerCase().includes(term.toLowerCase()) ||
      item.category.toLowerCase().includes(term.toLowerCase()) ||
      item.supplier.toLowerCase().includes(term.toLowerCase())
    );
    
    if (tab === "low-stock") {
      filtered = filtered.filter(item => item.status === "Low Stock");
    } else if (tab === "out-of-stock") {
      filtered = filtered.filter(item => item.status === "Out of Stock");
    } else if (tab === "to-reorder") {
      filtered = filtered.filter(item => item.inStock <= item.reorderPoint);
    }
    
    setFilteredItems(filtered);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    filterItems(searchTerm, tab);
  };

  const openStockAdjustment = (item) => {
    setSelectedItem(item);
    setStockAdjustment({ amount: "", reason: "" });
    setShowAdjustStock(true);
  };

  const handleStockAdjustment = () => {
    const amount = parseInt(stockAdjustment.amount);
    if (!amount) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid quantity.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Stock Updated",
      description: `${selectedItem.name} stock has been updated.`,
    });
    
    setShowAdjustStock(false);
    
    // In a real application, you would update the inventory in your database
  };

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          {user?.role === "administrator" && (
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
          <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
          <TabsTrigger value="to-reorder">To Reorder</TabsTrigger>
        </TabsList>
        
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-4">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search inventory..."
              className="pl-8 pr-4 py-2 w-full sm:w-[300px] rounded-md border"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
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
                  <TableHead className="text-center">In Stock</TableHead>
                  <TableHead className="text-center">Reorder Point</TableHead>
                  <TableHead className="text-center">Recent Movement</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="h-10 w-10 rounded-md overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-center">{item.inStock}</TableCell>
                    <TableCell className="text-center">{item.reorderPoint}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        {item.movementTrend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        {item.recentMovement}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={item.status === "In Stock" ? "default" : 
                              item.status === "Low Stock" ? "outline" : "destructive"}
                      >
                        {item.status}
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
                          <DropdownMenuItem onClick={() => openStockAdjustment(item)}>
                            Adjust Stock
                          </DropdownMenuItem>
                          <DropdownMenuItem>View Movement History</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Edit Details</DropdownMenuItem>
                          {item.status === "Low Stock" || item.status === "Out of Stock" ? (
                            <DropdownMenuItem className="text-amber-600">
                              Place Reorder
                            </DropdownMenuItem>
                          ) : null}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Tabs>
      
      {/* Stock Adjustment Dialog */}
      <Dialog open={showAdjustStock} onOpenChange={setShowAdjustStock}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Stock</DialogTitle>
            <DialogDescription>
              {selectedItem?.name} - Current Stock: {selectedItem?.inStock}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="adjustment-type" className="text-right">
                Adjustment Type
              </Label>
              <div className="col-span-3 flex gap-2">
                <Button 
                  variant={stockAdjustment.amount?.startsWith("+") ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStockAdjustment({...stockAdjustment, amount: stockAdjustment.amount.replace(/^[+-]?/, "+") })}
                >
                  Add
                </Button>
                <Button 
                  variant={stockAdjustment.amount?.startsWith("-") ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStockAdjustment({...stockAdjustment, amount: stockAdjustment.amount.replace(/^[+-]?/, "-") })}
                >
                  Remove
                </Button>
                <Button 
                  variant={!stockAdjustment.amount?.startsWith("+") && !stockAdjustment.amount?.startsWith("-") ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStockAdjustment({...stockAdjustment, amount: stockAdjustment.amount.replace(/^[+-]?/, "") })}
                >
                  Set Exact
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                value={stockAdjustment.amount}
                onChange={(e) => setStockAdjustment({...stockAdjustment, amount: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason" className="text-right">
                Reason
              </Label>
              <Input
                id="reason"
                value={stockAdjustment.reason}
                onChange={(e) => setStockAdjustment({...stockAdjustment, reason: e.target.value})}
                className="col-span-3"
                placeholder="e.g., New delivery, Damaged goods, etc."
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdjustStock(false)}>
              Cancel
            </Button>
            <Button onClick={handleStockAdjustment}>
              Apply Adjustment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Inventory;
