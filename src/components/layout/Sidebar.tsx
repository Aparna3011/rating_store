import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  Users,
  Store,
  Star,
  UserPlus,
  Search,
  BarChart3,
  Shield } from
'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getNavigationItems = () => {
    if (!user) return [];

    switch (user.role) {
      case 'admin':
        return [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: Users, label: 'User Management', path: '/admin/users' },
        { icon: Store, label: 'Store Management', path: '/admin/stores' },
        { icon: UserPlus, label: 'Add User', path: '/admin/add-user' },
        { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' }];


      case 'user':
        return [
        { icon: Search, label: 'Browse Stores', path: '/user/stores' },
        { icon: Star, label: 'My Ratings', path: '/user/ratings' }];


      case 'store_owner':
        return [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/store-owner/dashboard' },
        { icon: Star, label: 'Store Ratings', path: '/store-owner/ratings' },
        { icon: BarChart3, label: 'Analytics', path: '/store-owner/analytics' }];


      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={cn("pb-12 w-64", className)} data-id="8kf3zt91o" data-path="src/components/layout/Sidebar.tsx">
      <div className="space-y-4 py-4" data-id="limzd3lgi" data-path="src/components/layout/Sidebar.tsx">
        <div className="px-3 py-2" data-id="21svt9jth" data-path="src/components/layout/Sidebar.tsx">
          <div className="flex items-center mb-4 px-4" data-id="lff0tcagv" data-path="src/components/layout/Sidebar.tsx">
            <Shield className="h-6 w-6 mr-2 text-primary" data-id="6cvtigja5" data-path="src/components/layout/Sidebar.tsx" />
            <h2 className="text-lg font-semibold" data-id="80iv95wxl" data-path="src/components/layout/Sidebar.tsx">
              {user?.role === 'admin' && 'Admin Panel'}
              {user?.role === 'user' && 'User Portal'}
              {user?.role === 'store_owner' && 'Store Owner'}
            </h2>
          </div>
          <ScrollArea className="h-[calc(100vh-8rem)]" data-id="mi88h5ekb" data-path="src/components/layout/Sidebar.tsx">
            <div className="space-y-1" data-id="a3duy03vs" data-path="src/components/layout/Sidebar.tsx">
              {navigationItems.map((item, index) =>
              <Button
                key={index}
                variant={isActivePath(item.path) ? 'secondary' : 'ghost'}
                className={cn(
                  "w-full justify-start",
                  isActivePath(item.path) && "bg-primary/10 text-primary"
                )}
                onClick={() => navigate(item.path)} data-id="t9mdyaltg" data-path="src/components/layout/Sidebar.tsx">

                  <item.icon className="mr-2 h-4 w-4" data-id="xqlfpaish" data-path="src/components/layout/Sidebar.tsx" />
                  {item.label}
                </Button>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>);

};

export default Sidebar;