
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { BarChart3, Package, ShoppingCart, Users, TrendingUp, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

// Dashboard components for different user roles
const CustomerDashboard = () => {
  const recentOrders = [
    { id: "ORD-1234", date: "2025-04-10", status: "Delivered", total: 145.99 },
    { id: "ORD-1235", date: "2025-04-08", status: "Shipped", total: 89.50 },
    { id: "ORD-1236", date: "2025-04-05", status: "Processing", total: 215.75 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 shipping, 1 processing</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Items</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Items in your wishlist</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$892.50</div>
            <p className="text-xs text-muted-foreground">+$145.99 from last month</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Track your recent purchases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm font-medium">${order.total.toFixed(2)}</p>
                  <Badge variant={
                    order.status === "Delivered" ? "default" :
                    order.status === "Shipped" ? "secondary" : "outline"
                  }>
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild className="w-full">
            <Link to="/orders">View All Orders</Link>
          </Button>
        </CardFooter>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recommended Products</CardTitle>
            <CardDescription>Based on your previous orders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e" 
                  alt="Coffee Beans"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">Premium Coffee Beans</p>
                <p className="text-sm text-muted-foreground">$18.50</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1603729362753-f8162ac6c3df" 
                  alt="Whole Grain Pasta"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">Whole Grain Pasta</p>
                <p className="text-sm text-muted-foreground">$3.99</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link to="/products">Browse Products</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your profile and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Email:</span>
              <span className="text-sm font-medium">customer@invenflow.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Delivery Address:</span>
              <span className="text-sm font-medium">123 Main St, City</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Payment Method:</span>
              <span className="text-sm font-medium">Visa ending in 4242</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link to="/settings">Edit Profile</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

const SupplierDashboard = () => {
  const lowStockProducts = [
    { id: "PROD-2345", name: "Coffee Beans (Dark Roast)", stock: 30, minStock: 50 },
    { id: "PROD-4567", name: "Extra Virgin Olive Oil", stock: 75, minStock: 100 },
  ];

  const recentOrders = [
    { id: "ORD-1234", date: "2025-04-10", items: 3, status: "Shipped" },
    { id: "ORD-1235", date: "2025-04-08", items: 5, status: "Processing" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Need fulfillment</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,543</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
              Low Stock Alerts
            </CardTitle>
            <CardDescription>Products that need restocking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts.map(product => (
                <div key={product.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{product.stock} units</p>
                    <p className="text-sm text-muted-foreground">Min: {product.minStock}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link to="/inventory">Manage Inventory</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Orders requiring fulfillment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map(order => (
                <div key={order.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-medium">{order.items} items</p>
                    <Badge variant={
                      order.status === "Shipped" ? "default" : "outline"
                    }>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link to="/orders">View All Orders</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Monthly Sales Overview</CardTitle>
          <CardDescription>Performance for the past 30 days</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <div className="h-full w-full flex items-center justify-center bg-muted/20 rounded-md">
            <p className="text-muted-foreground">Sales chart will be displayed here</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild className="w-full">
            <Link to="/reports">View Detailed Reports</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const AdminDashboard = () => {
  const systemStats = [
    { id: 1, label: "Total Users", value: 542, change: "+24", icon: Users },
    { id: 2, label: "Total Products", value: 1284, change: "+122", icon: Package },
    { id: 3, label: "Orders (Today)", value: 38, change: "+5", icon: ShoppingCart },
    { id: 4, label: "Revenue (Month)", value: "$48,294", change: "+12%", icon: TrendingUp }
  ];

  const recentActivity = [
    { id: 1, type: "User", action: "New customer registration", time: "10 minutes ago" },
    { id: 2, type: "Product", action: "Supplier added 5 new products", time: "35 minutes ago" },
    { id: 3, type: "Order", action: "New order #1242 received", time: "1 hour ago" },
    { id: 4, type: "System", action: "Automatic inventory update completed", time: "3 hours ago" }
  ];

  const pendingApprovals = [
    { id: 1, type: "Product", name: "Natural Coconut Water", supplier: "Tropical Foods Inc." },
    { id: 2, type: "Supplier", name: "Green Farms Organics", products: 24 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {systemStats.map(stat => (
          <Card key={stat.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change} from last period</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-start border-b pb-4">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    {activity.type === "User" ? (
                      <Users className="h-4 w-4 text-primary" />
                    ) : activity.type === "Product" ? (
                      <Package className="h-4 w-4 text-primary" />
                    ) : activity.type === "Order" ? (
                      <ShoppingCart className="h-4 w-4 text-primary" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link to="/activity">View All Activity</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Items requiring administrator action</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map(item => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-start">
                    <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full mr-3">
                      {item.type === "Product" ? (
                        <Package className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                      ) : (
                        <Users className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.type === "Product" ? `Supplier: ${item.supplier}` : `Products: ${item.products}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Review</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link to="/approvals">View All Pending</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage system users and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p>Total Customers:</p>
                <p className="font-medium">425</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Total Suppliers:</p>
                <p className="font-medium">84</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Total Administrators:</p>
                <p className="font-medium">12</p>
              </div>
              <div className="flex justify-between items-center">
                <p>New Users (This Week):</p>
                <p className="font-medium">24</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link to="/users">Manage Users</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Current system status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p>Server Status:</p>
                <Badge variant="default" className="bg-green-500">Online</Badge>
              </div>
              <div className="flex justify-between items-center">
                <p>Database Connection:</p>
                <Badge variant="default" className="bg-green-500">Connected</Badge>
              </div>
              <div className="flex justify-between items-center">
                <p>Last Backup:</p>
                <p className="font-medium">2025-04-12 03:00 AM</p>
              </div>
              <div className="flex justify-between items-center">
                <p>System Version:</p>
                <p className="font-medium">v2.4.1</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link to="/system">System Settings</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Welcome, {user.name}
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening in your {
              user.role === "customer" ? "account" : 
              user.role === "supplier" ? "inventory" : "system"
            } today.
          </p>
        </div>
        {user.role === "administrator" && (
          <div className="flex gap-2">
            <Button>Generate Report</Button>
          </div>
        )}
        {user.role === "supplier" && (
          <div className="flex gap-2">
            <Button>Add New Product</Button>
          </div>
        )}
      </div>
      
      {user.role === "customer" && <CustomerDashboard />}
      {user.role === "supplier" && <SupplierDashboard />}
      {user.role === "administrator" && <AdminDashboard />}
    </div>
  );
};

export default Dashboard;
