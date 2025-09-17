import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Users, UserCheck, UserX, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id: string;
  email: string;
  created_at: string;
  user_metadata: any;
  profiles?: {
    first_name?: string;
    last_name?: string;
  };
  user_roles?: {
    role: string;
  }[];
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // First get all profiles with user roles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          user_id,
          first_name,
          last_name,
          email,
          created_at,
          user_roles (role)
        `);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        toast({
          title: "Error fetching users",
          description: "Please try again.",
          variant: "destructive"
        });
        return;
      }

      // Transform the data to match our expected format
      const transformedUsers = profiles?.map(profile => ({
        id: profile.user_id,
        email: profile.email || '',
        created_at: profile.created_at,
        user_metadata: {},
        profiles: {
          first_name: profile.first_name,
          last_name: profile.last_name
        },
        user_roles: Array.isArray(profile.user_roles) ? profile.user_roles : []
      })) || [];

      setUsers(transformedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error fetching users",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: 'admin' | 'moderator' | 'user') => {
    try {
      // First, remove any existing roles for this user
      await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      // Then add the new role
      const { error } = await supabase
        .from('user_roles')
        .insert([{ user_id: userId, role: newRole }]);

      if (error) throw error;

      toast({
        title: "Role updated",
        description: `User role has been updated to ${newRole}.`
      });

      // Refresh the users list
      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Error updating role",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  const getUserRole = (user: User): string => {
    if (user.user_roles && user.user_roles.length > 0) {
      return user.user_roles[0].role;
    }
    return 'user';
  };

  const getUserName = (user: User): string => {
    if (user.profiles?.first_name || user.profiles?.last_name) {
      return `${user.profiles.first_name || ''} ${user.profiles.last_name || ''}`.trim();
    }
    return user.email.split('@')[0];
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'default';
      case 'moderator':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading users...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="h-5 w-5" />
          <span>User Management</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {users.length === 0 ? (
          <div className="text-center py-8">
            <UserX className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No users found</h3>
            <p className="text-muted-foreground">
              Users will appear here once they sign up for your platform.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <UserCheck className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{getUserName(user)}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(getUserRole(user))}>
                      <Shield className="h-3 w-3 mr-1" />
                      {getUserRole(user)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={getUserRole(user)}
                      onValueChange={(newRole: 'admin' | 'moderator' | 'user') => 
                        updateUserRole(user.id, newRole)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default UserManagement;