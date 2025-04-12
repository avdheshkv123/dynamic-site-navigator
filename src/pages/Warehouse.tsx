
import { useState, useEffect } from "react";
import { 
  Warehouse as WarehouseIcon, 
  Package, 
  Truck, 
  ArrowUp, 
  ArrowDown, 
  Search, 
  Map,
  BarChart3,
  Users,
  ClipboardCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Mock data for warehouses
const warehouseData = [
  {
    id: 1,
    name: "Main Distribution Center",
    location: "Chicago, IL",
    capacity: 85,
    items: 2543,
    staff: 35,
    pending: 28,
    image: "/placeholder.svg",
    status: "active"
  },
  {
    id: 2,
    name: "West Coast Facility",
    location: "Los Angeles, CA",
    capacity: 67,
    items: 1897,
    staff: 24,
    pending: 15,
    image: "/placeholder.svg",
    status: "active"
  },
  {
    id: 3,
    name: "East Coast Hub",
    location: "New York, NY",
    capacity: 92,
    items: 3102,
    staff: 42,
    pending: 31,
    image: "/placeholder.svg",
    status: "active"
  },
  {
    id: 4,
    name: "Southern Storage",
    location: "Atlanta, GA",
    capacity: 43,
    items: 1254,
    staff: 18,
    pending: 8,
    image: "/placeholder.svg",
    status: "maintenance"
  }
];

// Mock data for inventory movements
const movementData = [
  {
    id: 1,
    type: "incoming",
    source: "Supplier XYZ",
    destination: "Main Distribution Center",
    items: 120,
    date: "2025-04-10",
    status: "completed"
  },
  {
    id: 2,
    type: "outgoing",
    source: "Main Distribution Center",
    destination: "Customer #4582",
    items: 45,
    date: "2025-04-11",
    status: "in-transit"
  },
  {
    id: 3,
    type: "transfer",
    source: "Main Distribution Center",
    destination: "East Coast Hub",
    items: 75,
    date: "2025-04-09",
    status: "completed"
  },
  {
    id: 4,
    type: "incoming",
    source: "Supplier ABC",
    destination: "West Coast Facility",
    items: 200,
    date: "2025-04-12",
    status: "scheduled"
  },
  {
    id: 5,
    type: "outgoing",
    source: "East Coast Hub",
    destination: "Customer #8732",
    items: 30,
    date: "2025-04-11",
    status: "completed"
  }
];

const Warehouse = () => {
  const [warehouses, setWarehouses] = useState(warehouseData);
  const [movements, setMovements] = useState(movementData);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedWarehouse, setSelectedWarehouse] = useState<number | null>(null);
  const { toast } = useToast();

  const filteredWarehouses = warehouses.filter(warehouse => 
    warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    warehouse.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMovements = selectedWarehouse 
    ? movements.filter(movement => 
        movement.source.includes(warehouses.find(w => w.id === selectedWarehouse)?.name || "") || 
        movement.destination.includes(warehouses.find(w => w.id === selectedWarehouse)?.name || "")
      )
    : movements;

  const handleWarehouseSelect = (warehouseId: number) => {
    setSelectedWarehouse(warehouseId === selectedWarehouse ? null : warehouseId);
    if (warehouseId !== selectedWarehouse) {
      setActiveTab("details");
    }
  };

  // Mock function for marking warehouse maintenance
  const handleMaintenanceToggle = (warehouseId: number) => {
    setWarehouses(warehouses.map(warehouse => {
      if (warehouse.id === warehouseId) {
        const newStatus = warehouse.status === 'active' ? 'maintenance' : 'active';
        toast({
          title: `Warehouse ${newStatus === 'maintenance' ? 'under maintenance' : 'activated'}`,
          description: `${warehouse.name} has been ${newStatus === 'maintenance' ? 'set to maintenance mode' : 'activated'}.`,
        });
        return { ...warehouse, status: newStatus };
      }
      return warehouse;
    }));
  };

  // Calculate total inventory across all warehouses
  const totalInventory = warehouses.reduce((sum, warehouse) => sum + warehouse.items, 0);
  const totalCapacity = warehouses.reduce((sum, warehouse) => sum + 100, 0); // Assuming each warehouse has capacity of 100%
  const overallCapacity = Math.round((warehouses.reduce((sum, warehouse) => sum + warehouse.capacity, 0) / warehouses.length));

  return (
    <div className="container py-10">
      <div className="flex items-center gap-2 mb-6">
        <WarehouseIcon className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Warehouse Management</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details" disabled={selectedWarehouse === null}>
            Warehouse Details
          </TabsTrigger>
          <TabsTrigger value="movements">Inventory Movements</TabsTrigger>
        </TabsList>
      
        <TabsContent value="overview" className="space-y-6">
          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Warehouses
                </CardTitle>
                <div className="flex items-center justify-between">
                  <CardDescription className="text-3xl font-bold">{warehouses.length}</CardDescription>
                  <WarehouseIcon className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  {warehouses.filter(w => w.status === 'active').length} active, {
                    warehouses.filter(w => w.status === 'maintenance').length
                  } in maintenance
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Inventory
                </CardTitle>
                <div className="flex items-center justify-between">
                  <CardDescription className="text-3xl font-bold">{totalInventory.toLocaleString()}</CardDescription>
                  <Package className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Items across all warehouses
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Overall Capacity
                </CardTitle>
                <div className="flex items-center justify-between">
                  <CardDescription className="text-3xl font-bold">{overallCapacity}%</CardDescription>
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={overallCapacity} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Average across all facilities
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pending Shipments
                </CardTitle>
                <div className="flex items-center justify-between">
                  <CardDescription className="text-3xl font-bold">
                    {warehouses.reduce((sum, w) => sum + w.pending, 0)}
                  </CardDescription>
                  <Truck className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Awaiting processing across all warehouses
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Search and warehouse list */}
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search warehouses..." 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                Add Warehouse
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWarehouses.length > 0 ? (
                filteredWarehouses.map(warehouse => (
                  <Card 
                    key={warehouse.id} 
                    className={`cursor-pointer hover:border-primary transition-all ${selectedWarehouse === warehouse.id ? 'border-primary' : ''} ${warehouse.status === 'maintenance' ? 'opacity-70' : ''}`}
                    onClick={() => handleWarehouseSelect(warehouse.id)}
                  >
                    <div className="h-48 relative">
                      <img 
                        src={warehouse.image} 
                        alt={warehouse.name} 
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                      {warehouse.status === 'maintenance' && (
                        <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 text-xs rounded">
                          Under Maintenance
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{warehouse.name}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Map className="h-3 w-3" /> {warehouse.location}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Capacity</span>
                          <span className={warehouse.capacity > 90 ? "text-red-500" : warehouse.capacity > 75 ? "text-amber-500" : "text-green-500"}>
                            {warehouse.capacity}%
                          </span>
                        </div>
                        <Progress value={warehouse.capacity} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 pt-2">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Items</p>
                          <p className="font-medium">{warehouse.items.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Staff</p>
                          <p className="font-medium">{warehouse.staff}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Pending</p>
                          <p className="font-medium">{warehouse.pending}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <WarehouseIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No warehouses found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search parameters
                  </p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="details">
          {selectedWarehouse && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>
                          {warehouses.find(w => w.id === selectedWarehouse)?.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <Map className="h-3 w-3" /> 
                          {warehouses.find(w => w.id === selectedWarehouse)?.location}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button 
                          variant={warehouses.find(w => w.id === selectedWarehouse)?.status === 'active' ? 'destructive' : 'default'} 
                          size="sm"
                          onClick={() => handleMaintenanceToggle(selectedWarehouse)}
                        >
                          {warehouses.find(w => w.id === selectedWarehouse)?.status === 'active' ? 'Set Maintenance' : 'Activate'}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Capacity Usage</h3>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm">
                            {warehouses.find(w => w.id === selectedWarehouse)?.capacity}% used
                          </span>
                          <span className="ml-auto text-sm text-muted-foreground">
                            {100 - (warehouses.find(w => w.id === selectedWarehouse)?.capacity || 0)}% free
                          </span>
                        </div>
                        <Progress value={warehouses.find(w => w.id === selectedWarehouse)?.capacity} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Inventory</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold">
                                {warehouses.find(w => w.id === selectedWarehouse)?.items.toLocaleString()}
                              </span>
                              <Package className="h-5 w-5 text-primary" />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Items in storage
                            </p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Staff</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold">
                                {warehouses.find(w => w.id === selectedWarehouse)?.staff}
                              </span>
                              <Users className="h-5 w-5 text-primary" />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Active personnel
                            </p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Pending</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold">
                                {warehouses.find(w => w.id === selectedWarehouse)?.pending}
                              </span>
                              <ClipboardCheck className="h-5 w-5 text-primary" />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Shipments to process
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                          {filteredMovements.slice(0, 3).map(movement => (
                            <div key={movement.id} className="flex items-start gap-3 p-3 border rounded-md">
                              {movement.type === 'incoming' ? (
                                <ArrowDown className="h-5 w-5 text-green-500 mt-1" />
                              ) : movement.type === 'outgoing' ? (
                                <ArrowUp className="h-5 w-5 text-blue-500 mt-1" />
                              ) : (
                                <Truck className="h-5 w-5 text-amber-500 mt-1" />
                              )}
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <p className="font-medium">
                                    {movement.type === 'incoming' ? 'Received from' : movement.type === 'outgoing' ? 'Shipped to' : 'Transferred to'} {movement.type === 'incoming' ? movement.source : movement.destination}
                                  </p>
                                  <span className={`text-xs px-2 py-1 rounded ${
                                    movement.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                    movement.status === 'in-transit' ? 'bg-blue-100 text-blue-800' :
                                    'bg-amber-100 text-amber-800'
                                  }`}>
                                    {movement.status === 'completed' ? 'Completed' : 
                                     movement.status === 'in-transit' ? 'In Transit' : 
                                     'Scheduled'}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {movement.items} items • {movement.date}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {filteredMovements.length === 0 && (
                          <div className="text-center py-6 border rounded-lg">
                            <p className="text-muted-foreground">No recent activity for this warehouse</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Warehouse Map</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                      <Map className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div className="mt-4 space-y-3">
                      <div>
                        <h4 className="text-sm font-medium">Address</h4>
                        <p className="text-sm text-muted-foreground">
                          123 Warehouse Dr.<br />
                          {warehouses.find(w => w.id === selectedWarehouse)?.location}
                        </p>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="text-sm font-medium">Contact</h4>
                        <p className="text-sm text-muted-foreground">
                          warehouse{selectedWarehouse}@invenflow.com<br />
                          (555) 123-456{selectedWarehouse}
                        </p>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="text-sm font-medium">Operating Hours</h4>
                        <p className="text-sm text-muted-foreground">
                          Monday - Friday: 8AM - 6PM<br />
                          Saturday: 9AM - 3PM<br />
                          Sunday: Closed
                        </p>
                      </div>
                      
                      <Button className="w-full mt-2" variant="outline">
                        View Detailed Information
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="movements">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Inventory Movements</CardTitle>
                  <CardDescription>Track incoming, outgoing, and transfer shipments</CardDescription>
                </div>
                <Button variant="outline">
                  New Movement
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <ArrowDown className="h-4 w-4 text-green-500" /> Incoming
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <ArrowUp className="h-4 w-4 text-blue-500" /> Outgoing
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Truck className="h-4 w-4 text-amber-500" /> Transfers
                  </Button>
                  <div className="ml-auto">
                    <Button variant="ghost" size="sm">
                      Export
                    </Button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left px-4 py-3 text-sm font-medium">ID</th>
                        <th className="text-left px-4 py-3 text-sm font-medium">Type</th>
                        <th className="text-left px-4 py-3 text-sm font-medium">Source</th>
                        <th className="text-left px-4 py-3 text-sm font-medium">Destination</th>
                        <th className="text-left px-4 py-3 text-sm font-medium">Items</th>
                        <th className="text-left px-4 py-3 text-sm font-medium">Date</th>
                        <th className="text-left px-4 py-3 text-sm font-medium">Status</th>
                        <th className="text-left px-4 py-3 text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {movements.map(movement => (
                        <tr key={movement.id} className="border-b hover:bg-muted/50">
                          <td className="px-4 py-3">{movement.id}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              {movement.type === 'incoming' ? (
                                <ArrowDown className="h-4 w-4 text-green-500" />
                              ) : movement.type === 'outgoing' ? (
                                <ArrowUp className="h-4 w-4 text-blue-500" />
                              ) : (
                                <Truck className="h-4 w-4 text-amber-500" />
                              )}
                              <span className="capitalize">{movement.type}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">{movement.source}</td>
                          <td className="px-4 py-3">{movement.destination}</td>
                          <td className="px-4 py-3">{movement.items}</td>
                          <td className="px-4 py-3">{movement.date}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-1 rounded ${
                              movement.status === 'completed' ? 'bg-green-100 text-green-800' : 
                              movement.status === 'in-transit' ? 'bg-blue-100 text-blue-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {movement.status === 'completed' ? 'Completed' : 
                               movement.status === 'in-transit' ? 'In Transit' : 
                               'Scheduled'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Warehouse;
