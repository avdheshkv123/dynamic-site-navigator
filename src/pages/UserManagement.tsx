
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { 
  Search, 
  SlidersHorizontal, 
  MoreHorizontal, 
  PlusCircle,
  UserPlus,
  UserCog,
  ShieldCheck,
  CheckCircle,
  XCircle,
  AlertCircle
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const usersList = [
  { 
    id: "USR-1001", 
    name: "John Smith", 
    email: "john.smith@example.com", 
    role: "customer", 
    status: "active", 
    lastLogin: "2025-04-12", 
    createdAt: "2024-09-05" 
  },
  { 
    id: "USR-1002", 
    name: "Emily Johnson", 
    email: "emily.j@example.com", 
    role: "customer", 
    status: "active", 
    lastLogin: "2025-04-10", 
    createdAt: "2024-10-18" 
  },
  { 
    id: "USR-1003", 
    name: "Mountain Coffee Co.", 
    email: "support@mountaincoffee.com", 
    role: "supplier", 
    status: "active", 
    lastLogin: "2025-04-11", 
    createdAt: "2024-08-22" 
  },
  { 
    id: "USR-1004", 
    name: "Mediterranean Imports", 
    email: "info@mediterranean-imports.com", 
    role: "supplier", 
    status: "pending", 
    lastLogin: "Never", 
    createdAt: "2025-04-09" 
  },
  { 
    id: "USR-1005", 
    name: "Robert Davis", 
    email: "robert.d@example.com", 
    role: "administrator", 
    status: "active", 
    lastLogin: "2025-04-12", 
    createdAt: "2024-06-15" 
  },
  { 
    id: "USR-1006", 
    name: "Sarah Wilson", 
    email: "swilson@example.com", 
    role: "customer", 
    status: "inactive", 
    lastLogin: "2025-03-25", 
    createdAt: "2024-11-30" 
  },
];

const UserManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  
  // Form states
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "customer",
    status: "active"
  });
  
  const [editUserData, setEditUserData] = useState({
    name: "",
    email: "",
    role: "",
    status: ""
  });
  
  const filteredUsers = usersList.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter based on active tab
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "customers") return matchesSearch && user.role === "customer";
    if (activeTab === "suppliers") return matchesSearch && user.role === "supplier";
    if (activeTab === "admins") return matchesSearch && user.role === "administrator";
    if (activeTab === "pending") return matchesSearch && user.status === "pending";
    
    return matchesSearch;
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    
    toast({
      title: "User Added",
      description: `${newUser.name} has been added successfully.`,
    });
    
    setShowAddUser(false);
    setNewUser({
      name: "",
      email: "",
      role: "customer",
      status: "active"
    });
    
    // In a real application, you would add the user to your database
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    
    toast({
      title: "User Updated",
      description: `${editUserData.name}'s information has been updated.`,
    });
    
    setShowEditUser(false);
    
    // In a real application, you would update the user in your database
  };

  const openUserDetails = (user) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const openEditUser = (user) => {
    setSelectedUser(user);
    setEditUserData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setShowEditUser(true);
  };

  const handleApproveUser = (user) => {
    toast({
      title: "User Approved",
      description: `${user.name}'s account has been approved.`,
    });
    
    // In a real application, you would update the user status in your database
  };

  const handleStatusChange = (userId, status) => {
    const user = usersList.find(u => u.id === userId);
    if (!user) return;

    toast({
      title: "Status Updated",
      description: `${user.name}'s status has been set to ${status}.`,
    });
    
    // In a real application, you would update the user status in your database
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "administrator":
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">Administrator</Badge>;
      case "supplier":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Supplier</Badge>;
      case "customer":
        return <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Customer</Badge>;
      default:
        return <Badge variant="secondary">{role}</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Active</Badge>;
      case "inactive":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">Inactive</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">Pending</Badge>;
      case "suspended":
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button onClick={() => setShowAddUser(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="admins">Administrators</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
        </TabsList>
        
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-4">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search users..."
              className="pl-8 pr-4 py-2 w-full sm:w-[300px] rounded-md border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                  <TableHead>User ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openUserDetails(user)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditUser(user)}>Edit User</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {user.status === "pending" ? (
                              <DropdownMenuItem onClick={() => handleApproveUser(user)} className="text-green-600">
                                Approve Account
                              </DropdownMenuItem>
                            ) : (
                              <>
                                {user.status === "active" ? (
                                  <DropdownMenuItem onClick={() => handleStatusChange(user.id, "inactive")}>
                                    Deactivate Account
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem onClick={() => handleStatusChange(user.id, "active")}>
                                    Activate Account
                                  </DropdownMenuItem>
                                )}
                              </>
                            )}
                            <DropdownMenuItem className="text-destructive">
                              Delete Account
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10">
                      No users found matching your search criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Tabs>
      
      {/* User Details Dialog */}
      <Dialog open={showUserDetails} onOpenChange={setShowUserDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              {selectedUser?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-sm text-muted-foreground">Name</Label>
                  <p className="font-medium">{selectedUser.name}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Email</Label>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-sm text-muted-foreground">Role</Label>
                  <p>{getRoleBadge(selectedUser.role)}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Status</Label>
                  <p>{getStatusBadge(selectedUser.status)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-sm text-muted-foreground">Last Login</Label>
                  <p className="font-medium">{selectedUser.lastLogin}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Created</Label>
                  <p className="font-medium">{selectedUser.createdAt}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center gap-4">
                  <Button variant="outline" onClick={() => {
                    setShowUserDetails(false);
                    openEditUser(selectedUser);
                  }}>
                    <UserCog className="h-4 w-4 mr-2" />
                    Edit User
                  </Button>
                  
                  {selectedUser.status === "pending" ? (
                    <Button className="bg-green-600 hover:bg-green-700" onClick={() => {
                      handleApproveUser(selectedUser);
                      setShowUserDetails(false);
                    }}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Account
                    </Button>
                  ) : selectedUser.status === "active" ? (
                    <Button variant="secondary" onClick={() => {
                      handleStatusChange(selectedUser.id, "inactive");
                      setShowUserDetails(false);
                    }}>
                      <XCircle className="h-4 w-4 mr-2" />
                      Deactivate Account
                    </Button>
                  ) : (
                    <Button variant="secondary" onClick={() => {
                      handleStatusChange(selectedUser.id, "active");
                      setShowUserDetails(false);
                    }}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Activate Account
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUserDetails(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add User Dialog */}
      <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account in the system.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAddUser}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value) => setNewUser({...newUser, role: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="supplier">Supplier</SelectItem>
                    <SelectItem value="administrator">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={newUser.status}
                  onValueChange={(value) => setNewUser({...newUser, status: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="send-email" className="text-right">
                  Send Welcome Email
                </Label>
                <div className="flex items-center space-x-2">
                  <Switch id="send-email" />
                  <Label htmlFor="send-email">Send email with login details</Label>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowAddUser(false)}>
                Cancel
              </Button>
              <Button type="submit">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Edit User Dialog */}
      <Dialog open={showEditUser} onOpenChange={setShowEditUser}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              {selectedUser?.id}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleEditUser}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={editUserData.name}
                  onChange={(e) => setEditUserData({...editUserData, name: e.target.value})}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editUserData.email}
                  onChange={(e) => setEditUserData({...editUserData, email: e.target.value})}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">
                  Role
                </Label>
                <Select
                  value={editUserData.role}
                  onValueChange={(value) => setEditUserData({...editUserData, role: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="supplier">Supplier</SelectItem>
                    <SelectItem value="administrator">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select
                  value={editUserData.status}
                  onValueChange={(value) => setEditUserData({...editUserData, status: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reset-password" className="text-right">
                  Password
                </Label>
                <div className="col-span-3">
                  <Button type="button" variant="outline" className="w-full">
                    Reset Password
                  </Button>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowEditUser(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
