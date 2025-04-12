import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { 
  Calendar, 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  MoreHorizontal,
  FileText,
  Truck,
  X,
  CheckCircle
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
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const orders = [
  {
    id: "ORD-1234",
    date: "2025-04-10",
    customer: "John Smith",
    total: 145.99,
    status: "Delivered",
    items: [
      { id: "PROD-1234", name: "Organic Green Tea", quantity: 2, price: 12.99 },
      { id: "PROD-3456", name: "Whole Grain Pasta", quantity: 3, price: 3.99 }
    ]
  },
  {
    id: "ORD-1235",
    date: "2025-04-08",
    customer: "Emily Johnson",
    total: 89.50,
    status: "Shipped",
    items: [
      { id: "PROD-2345", name: "Coffee Beans (Dark Roast)", quantity: 1, price: 18.50 },
      { id: "PROD-4567", name: "Extra Virgin Olive Oil", quantity: 1, price: 15.75 },
      { id: "PROD-3456", name: "Whole Grain Pasta", quantity: 2, price: 3.99 }
    ]
  },
  {
    id: "ORD-1236",
    date: "2025-04-05",
    customer: "Michael Brown",
    total: 215.75,
    status: "Processing",
    items: [
      { id: "PROD-1234", name: "Organic Green Tea", quantity: 5, price: 12.99 },
      { id: "PROD-4567", name: "Extra Virgin Olive Oil", quantity: 3, price: 15.75 },
      { id: "PROD-2345", name: "Coffee Beans (Dark Roast)", quantity: 4, price: 18.50 }
    ]
  },
  {
    id: "ORD-1237",
    date: "2025-04-03",
    customer: "Sarah Wilson",
    total: 56.97,
    status: "Pending",
    items: [
      { id: "PROD-3456", name: "Whole Grain Pasta", quantity: 5, price: 3.99 },
      { id: "PROD-1234", name: "Organic Green Tea", quantity: 3, price: 12.99 }
    ]
  },
  {
    id: "ORD-1238",
    date: "2025-04-01",
    customer: "Robert Davis",
    total: 124.25,
    status: "Delivered",
    items: [
      { id: "PROD-2345", name: "Coffee Beans (Dark Roast)", quantity: 2, price: 18.50 },
      { id: "PROD-4567", name: "Extra Virgin Olive Oil", quantity: 3, price: 15.75 },
      { id: "PROD-1234", name: "Organic Green Tea", quantity: 1, price: 12.99 }
    ]
  },
];

const Orders = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewOrderDetails, setViewOrderDetails] = useState(false);
  const [cancelOrderDialog, setCancelOrderDialog] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [activeTab, setActiveTab] = useState("all");

  const handleSearch = (term) => {
    setSearchTerm(term);
    
    const filtered = orders.filter(order => 
      order.id.toLowerCase().includes(term.toLowerCase()) ||
      order.customer.toLowerCase().includes(term.toLowerCase()) ||
      order.status.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredOrders(filtered);
  };

  const handleFilter = (status) => {
    setActiveTab(status);
    
    if (status === "all") {
      setFilteredOrders(orders.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setFilteredOrders(orders.filter(order => 
        order.status.toLowerCase() === status &&
        (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()))
      ));
    }
  };

  const viewOrder = (order) => {
    setSelectedOrder(order);
    setViewOrderDetails(true);
  };

  const cancelOrder = (order) => {
    setSelectedOrder(order);
    setCancelOrderDialog(true);
  };

  const handleCancelOrder = () => {
    toast({
      title: "Order Cancelled",
      description: `Order ${selectedOrder.id} has been cancelled successfully.`,
    });
    
    setCancelOrderDialog(false);
    
    // In a real application, you would update the order in your database
    const updatedOrders = filteredOrders.map(order => 
      order.id === selectedOrder.id ? { ...order, status: "Cancelled" } : order
    );
    
    setFilteredOrders(updatedOrders);
  };

  const getBadgeVariant = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "default";
      case "shipped":
        return "secondary";
      case "processing":
        return "outline";
      case "pending":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Orders</h1>
        {user?.role === "customer" && (
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export Orders
          </Button>
        )}
        {user?.role === "administrator" && (
          <Button>
            Generate Order Report
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={handleFilter} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          {user?.role === "customer" && (
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          )}
        </TabsList>
        
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-4">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search orders..."
              className="pl-8 pr-4 py-2 w-full sm:w-[300px] rounded-md border"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(order.status)}>
                          {order.status}
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
                            <DropdownMenuItem onClick={() => viewOrder(order)}>
                              View Details
                            </DropdownMenuItem>
                            {user?.role === "administrator" && (
                              <DropdownMenuItem>Update Status</DropdownMenuItem>
                            )}
                            {user?.role === "customer" && order.status !== "Delivered" && order.status !== "Shipped" && order.status !== "Cancelled" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive" onClick={() => cancelOrder(order)}>
                                  Cancel Order
                                </DropdownMenuItem>
                              </>
                            )}
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
        
        {/* Other tabs will have similar content but filtered by status */}
        <TabsContent value="pending" className="mt-0">
          {/* Similar table but filtered for pending orders */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(order.status)}>
                          {order.status}
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
                            <DropdownMenuItem onClick={() => viewOrder(order)}>
                              View Details
                            </DropdownMenuItem>
                            {user?.role === "administrator" && (
                              <DropdownMenuItem>Update Status</DropdownMenuItem>
                            )}
                            {user?.role === "customer" && order.status !== "Delivered" && order.status !== "Shipped" && order.status !== "Cancelled" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive" onClick={() => cancelOrder(order)}>
                                  Cancel Order
                                </DropdownMenuItem>
                              </>
                            )}
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
        
        {/* Repeating for other tabs */}
        <TabsContent value="processing" className="mt-0">
          {/* Similar table structure */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length > 0 ? 
                    filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant={getBadgeVariant(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => viewOrder(order)}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10">
                          No orders found in this category
                        </TableCell>
                      </TableRow>
                    )
                  }
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Repeating for remaining tabs */}
        <TabsContent value="shipped" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length > 0 ? 
                    filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant={getBadgeVariant(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => viewOrder(order)}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10">
                          No orders found in this category
                        </TableCell>
                      </TableRow>
                    )
                  }
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="delivered" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length > 0 ? 
                    filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant={getBadgeVariant(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => viewOrder(order)}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10">
                          No orders found in this category
                        </TableCell>
                      </TableRow>
                    )
                  }
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {user?.role === "customer" && (
          <TabsContent value="cancelled" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.length > 0 ? 
                      filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant={getBadgeVariant(order.status)}>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" onClick={() => viewOrder(order)}>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      )) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-10">
                            No orders found in this category
                          </TableCell>
                        </TableRow>
                      )
                    }
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
      
      {/* Order Details Dialog */}
      <Dialog open={viewOrderDetails} onOpenChange={setViewOrderDetails}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              {selectedOrder?.id} - Placed on {selectedOrder?.date}
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <>
              <div className="grid gap-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Status</p>
                    <Badge variant={getBadgeVariant(selectedOrder.status)} className="mt-1">
                      {selectedOrder.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Customer</p>
                    <p className="text-sm">{selectedOrder.customer}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <p className="font-medium mb-2">Items</p>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-muted rounded-md w-10 h-10 flex items-center justify-center">
                            <Package className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.quantity} x ${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <p className="font-medium">${(item.quantity * item.price).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Subtotal</p>
                    <p>${selectedOrder.total.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="font-medium">Shipping</p>
                    <p>$8.00</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="font-medium">Tax</p>
                    <p>${(selectedOrder.total * 0.07).toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t">
                    <p className="text-lg font-bold">Total</p>
                    <p className="text-lg font-bold">
                      ${(selectedOrder.total + 8 + (selectedOrder.total * 0.07)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex flex-row justify-between items-center sm:justify-between">
                {selectedOrder.status === "Shipped" && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Truck className="h-4 w-4 mr-1" />
                    Estimated delivery: 2025-04-14
                  </div>
                )}
                <Button onClick={() => setViewOrderDetails(false)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Cancel Order Dialog */}
      <Dialog open={cancelOrderDialog} onOpenChange={setCancelOrderDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cancel Order</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this order? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="border rounded-md p-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{selectedOrder.id}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.date}</p>
                </div>
                <p className="font-medium">${selectedOrder.total.toFixed(2)}</p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelOrderDialog(false)}>
              <X className="h-4 w-4 mr-1" />
              Keep Order
            </Button>
            <Button variant="destructive" onClick={handleCancelOrder}>
              <X className="h-4 w-4 mr-1" />
              Cancel Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;
