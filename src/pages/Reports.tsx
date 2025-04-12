
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from 'react';

const salesData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 2780 },
  { month: 'May', sales: 1890 },
  { month: 'Jun', sales: 2390 },
  { month: 'Jul', sales: 3490 },
];

const categoryData = [
  { name: 'Electronics', value: 400 },
  { name: 'Food', value: 300 },
  { name: 'Clothing', value: 300 },
  { name: 'Home Goods', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Reports = () => {
  const [timeRange, setTimeRange] = useState('week');

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Reports</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Last 24 Hours</SelectItem>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="quarter">Last Quarter</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow p-6">
          <h3 className="text-lg font-medium mb-4">Monthly Sales</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salesData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" name="Sales ($)" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="rounded-lg border bg-card text-card-foreground shadow p-6">
          <h3 className="text-lg font-medium mb-4">Sales by Category</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow col-span-1 md:col-span-2">
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Inventory Status</h3>
            <div className="aspect-video overflow-hidden rounded-md">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                alt="Analytics Dashboard" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border bg-card text-card-foreground shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Recent Activities</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-muted w-2 h-2 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Product #1242 restocked</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-muted w-2 h-2 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">New supplier added</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-muted w-2 h-2 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Monthly report generated</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-muted w-2 h-2 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Stock threshold updated</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
