
import { useAuth } from "@/contexts/auth-context";
import { Package, DollarSign, PackageOpen, BarChartHorizontal } from "lucide-react";

const DashboardCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon 
}: { 
  title: string; 
  value: string | number; 
  description: string;
  icon: React.ElementType;
}) => (
  <div className="rounded-lg border bg-card text-card-foreground shadow">
    <div className="p-6 flex justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold mt-2">{value}</h3>
        <p className="text-xs text-muted-foreground mt-2">{description}</p>
      </div>
      <div className="bg-primary/10 p-3 rounded-full">
        <Icon className="h-6 w-6 text-primary" />
      </div>
    </div>
  </div>
);

const StockMovementRow = ({ 
  product, 
  type, 
  quantity, 
  date 
}: { 
  product: string; 
  type: "Stock In" | "Stock Out"; 
  quantity: number; 
  date: string;
}) => (
  <tr>
    <td className="py-3">{product}</td>
    <td className="py-3">
      <span className={`px-2 py-1 text-xs rounded-full ${type === "Stock In" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
        {type}
      </span>
    </td>
    <td className="py-3">{quantity}</td>
    <td className="py-3">{date}</td>
  </tr>
);

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <span className="text-sm text-muted-foreground">Welcome to your inventory dashboard</span>
      </div>
      
      {/* Dashboard Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard 
          title="Total Products" 
          value="8" 
          description="Across all categories" 
          icon={Package}
        />
        <DashboardCard 
          title="Inventory Value" 
          value="$26679.68" 
          description="↑ 4.5% Total cost value" 
          icon={DollarSign}
        />
        <DashboardCard 
          title="Low Stock Items" 
          value="0" 
          description="Products to reorder" 
          icon={PackageOpen}
        />
        <DashboardCard 
          title="Categories" 
          value="7" 
          description="Product categories" 
          icon={BarChartHorizontal}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 rounded-lg border bg-card text-card-foreground shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium">Recent Stock Movements</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm font-medium text-muted-foreground">
                    <th className="pb-2">Product</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Quantity</th>
                    <th className="pb-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <StockMovementRow product="Desk Lamp" type="Stock Out" quantity={3} date="20/06/2023" />
                  <StockMovementRow product="Wireless Mouse" type="Stock In" quantity={25} date="19/06/2023" />
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border bg-card text-card-foreground shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium">Low Stock Products</h3>
            <div className="flex flex-col items-center justify-center h-40">
              <p className="text-muted-foreground">No low stock products</p>
              <button className="mt-4 text-sm text-primary hover:underline">View All Products</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
