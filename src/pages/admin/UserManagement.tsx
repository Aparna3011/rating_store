import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, SortAsc, SortDesc, UserPlus, Mail, MapPin } from 'lucide-react';
import { mockApi } from '@/services/mockApi';
import { User } from '@/types';
import { toast } from '@/hooks/use-toast';

type SortField = 'name' | 'email' | 'address' | 'role';
type SortDirection = 'asc' | 'desc';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await mockApi.getUsers();
        setUsers(usersData);
        setFilteredUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast({
          title: "Error",
          description: "Failed to load users",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||\n        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||\n        user.address.toLowerCase().includes(searchTerm.toLowerCase());\n      \n      const matchesRole = roleFilter === 'all' || user.role === roleFilter;\n      \n      return matchesSearch && matchesRole;\n    });\n\n    // Sort the filtered results\n    filtered.sort((a, b) => {\n      const aValue = a[sortField].toLowerCase();\n      const bValue = b[sortField].toLowerCase();\n      \n      if (sortDirection === 'asc') {\n        return aValue.localeCompare(bValue);\n      } else {\n        return bValue.localeCompare(aValue);\n      }\n    });\n\n    setFilteredUsers(filtered);\n  }, [users, searchTerm, roleFilter, sortField, sortDirection]);\n\n  const handleSort = (field: SortField) => {\n    if (sortField === field) {\n      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');\n    } else {\n      setSortField(field);\n      setSortDirection('asc');\n    }\n  };\n\n  const getRoleColor = (role: string) => {\n    switch (role) {\n      case 'admin':\n        return 'bg-red-100 text-red-800';\n      case 'store_owner':\n        return 'bg-blue-100 text-blue-800';\n      case 'user':\n        return 'bg-green-100 text-green-800';\n      default:\n        return 'bg-gray-100 text-gray-800';\n    }\n  };\n\n  const getRoleDisplayName = (role: string) => {\n    switch (role) {\n      case 'admin':\n        return 'System Admin';\n      case 'store_owner':\n        return 'Store Owner';\n      case 'user':\n        return 'Normal User';\n      default:\n        return role;\n    }\n  };\n\n  const SortButton: React.FC<{ field: SortField; children: React.ReactNode }> = ({ field, children }) => (\n    <Button\n      variant=\"ghost\"\n      size=\"sm\"\n      onClick={() => handleSort(field)}\n      className=\"h-auto p-0 font-semibold hover:bg-transparent\"\n    >\n      <div className=\"flex items-center gap-1\">\n        {children}\n        {sortField === field && (\n          sortDirection === 'asc' ? \n            <SortAsc className=\"h-3 w-3\" /> : \n            <SortDesc className=\"h-3 w-3\" />\n        )}\n      </div>\n    </Button>\n  );\n\n  if (isLoading) {\n    return (\n      <div className=\"space-y-6\">\n        <h1 className=\"text-3xl font-bold\">User Management</h1>\n        <div className=\"animate-pulse space-y-4\">\n          <div className=\"h-10 bg-gray-200 rounded\"></div>\n          <div className=\"h-64 bg-gray-200 rounded\"></div>\n        </div>\n      </div>\n    );\n  }\n\n  return (\n    <div className=\"space-y-6\">\n      <div className=\"flex items-center justify-between\">\n        <h1 className=\"text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent\">\n          User Management\n        </h1>\n        <Button className=\"bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700\">\n          <UserPlus className=\"h-4 w-4 mr-2\" />\n          Add User\n        </Button>\n      </div>\n\n      <Card>\n        <CardHeader>\n          <CardTitle>All Users</CardTitle>\n          <CardDescription>\n            Manage and view all users on the platform\n          </CardDescription>\n        </CardHeader>\n        <CardContent>\n          <div className=\"flex flex-col md:flex-row gap-4 mb-6\">\n            <div className=\"relative flex-1\">\n              <Search className=\"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4\" />\n              <Input\n                placeholder=\"Search by name, email, or address...\"\n                value={searchTerm}\n                onChange={(e) => setSearchTerm(e.target.value)}\n                className=\"pl-10\"\n              />\n            </div>\n            <div className=\"flex items-center gap-2\">\n              <Filter className=\"h-4 w-4 text-gray-500\" />\n              <Select value={roleFilter} onValueChange={setRoleFilter}>\n                <SelectTrigger className=\"w-40\">\n                  <SelectValue placeholder=\"Filter by role\" />\n                </SelectTrigger>\n                <SelectContent>\n                  <SelectItem value=\"all\">All Roles</SelectItem>\n                  <SelectItem value=\"admin\">System Admin</SelectItem>\n                  <SelectItem value=\"store_owner\">Store Owner</SelectItem>\n                  <SelectItem value=\"user\">Normal User</SelectItem>\n                </SelectContent>\n              </Select>\n            </div>\n          </div>\n\n          <div className=\"rounded-md border\">\n            <Table>\n              <TableHeader>\n                <TableRow>\n                  <TableHead>\n                    <SortButton field=\"name\">Name</SortButton>\n                  </TableHead>\n                  <TableHead>\n                    <SortButton field=\"email\">Email</SortButton>\n                  </TableHead>\n                  <TableHead>\n                    <SortButton field=\"address\">Address</SortButton>\n                  </TableHead>\n                  <TableHead>\n                    <SortButton field=\"role\">Role</SortButton>\n                  </TableHead>\n                  <TableHead>Actions</TableHead>\n                </TableRow>\n              </TableHeader>\n              <TableBody>\n                {filteredUsers.map((user) => (\n                  <TableRow key={user.id}>\n                    <TableCell className=\"font-medium\">\n                      {user.name}\n                    </TableCell>\n                    <TableCell>\n                      <div className=\"flex items-center gap-2\">\n                        <Mail className=\"h-4 w-4 text-gray-400\" />\n                        {user.email}\n                      </div>\n                    </TableCell>\n                    <TableCell>\n                      <div className=\"flex items-start gap-2\">\n                        <MapPin className=\"h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0\" />\n                        <span className=\"text-sm\">{user.address}</span>\n                      </div>\n                    </TableCell>\n                    <TableCell>\n                      <Badge className={getRoleColor(user.role)}>\n                        {getRoleDisplayName(user.role)}\n                      </Badge>\n                    </TableCell>\n                    <TableCell>\n                      <div className=\"flex gap-2\">\n                        <Button variant=\"outline\" size=\"sm\">\n                          View Details\n                        </Button>\n                        <Button variant=\"outline\" size=\"sm\">\n                          Edit\n                        </Button>\n                      </div>\n                    </TableCell>\n                  </TableRow>\n                ))}\n              </TableBody>\n            </Table>\n          </div>\n\n          {filteredUsers.length === 0 && (\n            <div className=\"text-center py-12\">\n              <Search className=\"h-12 w-12 text-gray-400 mx-auto mb-4\" />\n              <h3 className=\"text-lg font-medium text-gray-900 mb-2\">No users found</h3>\n              <p className=\"text-gray-500\">\n                {searchTerm || roleFilter !== 'all'\n                  ? \"Try adjusting your search or filter criteria.\"\n                  : \"No users are currently available.\"}\n              </p>\n            </div>\n          )}\n\n          <div className=\"mt-4 text-sm text-muted-foreground\">\n            Showing {filteredUsers.length} of {users.length} users\n          </div>\n        </CardContent>\n      </Card>\n    </div>\n  );\n};\n\nexport default UserManagement;