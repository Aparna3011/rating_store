import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator } from
'@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Still navigate to login even if logout fails
      navigate('/login');
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin':
        return 'System Administrator';
      case 'store_owner':
        return 'Store Owner';
      case 'user':
        return 'Normal User';
      default:
        return role;
    }
  };

  const getInitials = (name: string) => {
    return name.
    split(' ').
    map((word) => word[0]).
    join('').
    toUpperCase().
    substring(0, 2);
  };

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60" data-id="1ut5u8ie8" data-path="src/components/layout/Header.tsx">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between" data-id="a8pir6hub" data-path="src/components/layout/Header.tsx">
        <div className="flex items-center space-x-4" data-id="3wj3agr3y" data-path="src/components/layout/Header.tsx">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-id="75cyv7t1r" data-path="src/components/layout/Header.tsx">
            Store Rating Platform
          </h1>
        </div>

        {user &&
        <div className="flex items-center space-x-4" data-id="xq4p316vw" data-path="src/components/layout/Header.tsx">
            <div className="hidden md:block text-sm" data-id="iqiwn3gnf" data-path="src/components/layout/Header.tsx">
              <p className="font-medium" data-id="fghqg2qun" data-path="src/components/layout/Header.tsx">{user.name}</p>
              <p className="text-muted-foreground" data-id="0xfmnoix0" data-path="src/components/layout/Header.tsx">{getRoleDisplayName(user.role)}</p>
            </div>

            <DropdownMenu data-id="zijz0o3dt" data-path="src/components/layout/Header.tsx">
              <DropdownMenuTrigger asChild data-id="lldr76ai0" data-path="src/components/layout/Header.tsx">
                <Button variant="ghost" className="relative h-10 w-10 rounded-full" data-id="b2dvkcvh7" data-path="src/components/layout/Header.tsx">
                  <Avatar className="h-10 w-10" data-id="lhihq99vd" data-path="src/components/layout/Header.tsx">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white" data-id="hpach3sul" data-path="src/components/layout/Header.tsx">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount data-id="5zr0bwe61" data-path="src/components/layout/Header.tsx">
                <DropdownMenuItem className="flex-col items-start" data-id="rpu7hffrm" data-path="src/components/layout/Header.tsx">
                  <div className="font-medium" data-id="1jlsgj14b" data-path="src/components/layout/Header.tsx">{user.name}</div>
                  <div className="text-sm text-muted-foreground" data-id="tcyiesf1g" data-path="src/components/layout/Header.tsx">{user.email}</div>
                  <div className="text-xs text-muted-foreground" data-id="oqn1ysiz5" data-path="src/components/layout/Header.tsx">{getRoleDisplayName(user.role)}</div>
                </DropdownMenuItem>
                <DropdownMenuSeparator data-id="tenbsicfv" data-path="src/components/layout/Header.tsx" />
                <DropdownMenuItem onClick={() => navigate('/profile')} data-id="ra2tvqd5a" data-path="src/components/layout/Header.tsx">
                  <User className="mr-2 h-4 w-4" data-id="svk4ixya7" data-path="src/components/layout/Header.tsx" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/change-password')} data-id="y9ytxae2n" data-path="src/components/layout/Header.tsx">
                  <Settings className="mr-2 h-4 w-4" data-id="wd6uym3ub" data-path="src/components/layout/Header.tsx" />
                  Change Password
                </DropdownMenuItem>
                <DropdownMenuSeparator data-id="rtruvttet" data-path="src/components/layout/Header.tsx" />
                <DropdownMenuItem onClick={handleLogout} data-id="0erdsvbpd" data-path="src/components/layout/Header.tsx">
                  <LogOut className="mr-2 h-4 w-4" data-id="wd85o57hc" data-path="src/components/layout/Header.tsx" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        }
      </div>
    </header>);

};

export default Header;