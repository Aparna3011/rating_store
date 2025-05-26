import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Store, Star, TrendingUp } from 'lucide-react';
import { mockApi } from '@/services/mockApi';
import { DashboardStats } from '@/types';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await mockApi.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6" data-id="ff07t56n6" data-path="src/pages/admin/AdminDashboard.tsx">
        <h1 className="text-3xl font-bold" data-id="a74szoj2f" data-path="src/pages/admin/AdminDashboard.tsx">Admin Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-id="odlkx2n55" data-path="src/pages/admin/AdminDashboard.tsx">
          {[1, 2, 3].map((i) =>
          <Card key={i} data-id="15espu05r" data-path="src/pages/admin/AdminDashboard.tsx">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" data-id="lgf7x56uz" data-path="src/pages/admin/AdminDashboard.tsx">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" data-id="337vvjhjl" data-path="src/pages/admin/AdminDashboard.tsx"></div>
                <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" data-id="xirb13rpg" data-path="src/pages/admin/AdminDashboard.tsx"></div>
              </CardHeader>
              <CardContent data-id="gbpf6g10a" data-path="src/pages/admin/AdminDashboard.tsx">
                <div className="h-8 bg-gray-200 rounded w-16 animate-pulse mb-2" data-id="vsqh6pjj9" data-path="src/pages/admin/AdminDashboard.tsx"></div>
                <div className="h-3 bg-gray-200 rounded w-32 animate-pulse" data-id="ycxrcdp0n" data-path="src/pages/admin/AdminDashboard.tsx"></div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>);

  }

  const statCards = [
  {
    title: 'Total Users',
    value: stats?.totalUsers || 0,
    description: 'Registered normal users on the platform',
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    title: 'Total Stores',
    value: stats?.totalStores || 0,
    description: 'Stores registered on the platform',
    icon: Store,
    color: 'bg-green-500'
  },
  {
    title: 'Total Ratings',
    value: stats?.totalRatings || 0,
    description: 'Ratings submitted by users',
    icon: Star,
    color: 'bg-yellow-500'
  }];


  return (
    <div className="space-y-6" data-id="la31wprm8" data-path="src/pages/admin/AdminDashboard.tsx">
      <div className="flex items-center justify-between" data-id="l4j6a7pjw" data-path="src/pages/admin/AdminDashboard.tsx">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-id="c1vohbeeh" data-path="src/pages/admin/AdminDashboard.tsx">
          Admin Dashboard
        </h1>
        <Badge variant="secondary" className="text-sm" data-id="fzsk6xrfd" data-path="src/pages/admin/AdminDashboard.tsx">
          System Administrator
        </Badge>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-id="g0tz8n08i" data-path="src/pages/admin/AdminDashboard.tsx">
        {statCards.map((stat, index) =>
        <Card key={index} className="hover:shadow-lg transition-shadow" data-id="kia9ope7v" data-path="src/pages/admin/AdminDashboard.tsx">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" data-id="n0kkzzjoo" data-path="src/pages/admin/AdminDashboard.tsx">
              <CardTitle className="text-sm font-medium" data-id="s2m71eiqa" data-path="src/pages/admin/AdminDashboard.tsx">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`} data-id="y32udgbzz" data-path="src/pages/admin/AdminDashboard.tsx">
                <stat.icon className="h-4 w-4 text-white" data-id="0jehsxi2h" data-path="src/pages/admin/AdminDashboard.tsx" />
              </div>
            </CardHeader>
            <CardContent data-id="528zypnqb" data-path="src/pages/admin/AdminDashboard.tsx">
              <div className="text-2xl font-bold" data-id="otmrred34" data-path="src/pages/admin/AdminDashboard.tsx">{stat.value}</div>
              <p className="text-xs text-muted-foreground" data-id="3nb9g9qf3" data-path="src/pages/admin/AdminDashboard.tsx">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2" data-id="ytbdojq2d" data-path="src/pages/admin/AdminDashboard.tsx">
        <Card data-id="39js0q1qc" data-path="src/pages/admin/AdminDashboard.tsx">
          <CardHeader data-id="ji2zjcjk5" data-path="src/pages/admin/AdminDashboard.tsx">
            <CardTitle className="flex items-center gap-2" data-id="2h5m8bssm" data-path="src/pages/admin/AdminDashboard.tsx">
              <TrendingUp className="h-5 w-5 text-green-500" data-id="xamn5w7mh" data-path="src/pages/admin/AdminDashboard.tsx" />
              Quick Actions
            </CardTitle>
            <CardDescription data-id="1v5gjmejx" data-path="src/pages/admin/AdminDashboard.tsx">
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3" data-id="j6misflp9" data-path="src/pages/admin/AdminDashboard.tsx">
            <div className="flex flex-col space-y-2" data-id="o8nwwyz5t" data-path="src/pages/admin/AdminDashboard.tsx">
              <button className="flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors" data-id="wauevq4ie" data-path="src/pages/admin/AdminDashboard.tsx">
                <span className="font-medium" data-id="rmx10cb0j" data-path="src/pages/admin/AdminDashboard.tsx">Add New User</span>
                <Users className="h-4 w-4 text-blue-600" data-id="zx85bht8l" data-path="src/pages/admin/AdminDashboard.tsx" />
              </button>
              <button className="flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors" data-id="b787wfwm9" data-path="src/pages/admin/AdminDashboard.tsx">
                <span className="font-medium" data-id="czodegl72" data-path="src/pages/admin/AdminDashboard.tsx">Manage Stores</span>
                <Store className="h-4 w-4 text-green-600" data-id="gzebdpoxg" data-path="src/pages/admin/AdminDashboard.tsx" />
              </button>
              <button className="flex items-center justify-between p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors" data-id="3cja8au6i" data-path="src/pages/admin/AdminDashboard.tsx">
                <span className="font-medium" data-id="omhu5yrc7" data-path="src/pages/admin/AdminDashboard.tsx">View All Ratings</span>
                <Star className="h-4 w-4 text-yellow-600" data-id="ah5paj1b0" data-path="src/pages/admin/AdminDashboard.tsx" />
              </button>
            </div>
          </CardContent>
        </Card>

        <Card data-id="hxgleqvjw" data-path="src/pages/admin/AdminDashboard.tsx">
          <CardHeader data-id="c6in2kqwj" data-path="src/pages/admin/AdminDashboard.tsx">
            <CardTitle data-id="2ibovgx5i" data-path="src/pages/admin/AdminDashboard.tsx">Recent Activity</CardTitle>
            <CardDescription data-id="asiqx5vau" data-path="src/pages/admin/AdminDashboard.tsx">
              Latest platform activities
            </CardDescription>
          </CardHeader>
          <CardContent data-id="x0ptiwnxs" data-path="src/pages/admin/AdminDashboard.tsx">
            <div className="space-y-3" data-id="h3s0vix7l" data-path="src/pages/admin/AdminDashboard.tsx">
              <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg" data-id="y39h01gpj" data-path="src/pages/admin/AdminDashboard.tsx">
                <div className="w-2 h-2 bg-green-500 rounded-full" data-id="r449ofw7w" data-path="src/pages/admin/AdminDashboard.tsx"></div>
                <div className="flex-1" data-id="efs81r3mx" data-path="src/pages/admin/AdminDashboard.tsx">
                  <p className="text-sm font-medium" data-id="vkyve7nc9" data-path="src/pages/admin/AdminDashboard.tsx">New user registration</p>
                  <p className="text-xs text-muted-foreground" data-id="ydo07zqi1" data-path="src/pages/admin/AdminDashboard.tsx">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg" data-id="3i4g61htv" data-path="src/pages/admin/AdminDashboard.tsx">
                <div className="w-2 h-2 bg-blue-500 rounded-full" data-id="u0r60jfc7" data-path="src/pages/admin/AdminDashboard.tsx"></div>
                <div className="flex-1" data-id="vras100g7" data-path="src/pages/admin/AdminDashboard.tsx">
                  <p className="text-sm font-medium" data-id="n218sx4kd" data-path="src/pages/admin/AdminDashboard.tsx">Store rating submitted</p>
                  <p className="text-xs text-muted-foreground" data-id="wyne3a2xz" data-path="src/pages/admin/AdminDashboard.tsx">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg" data-id="mr7a166jc" data-path="src/pages/admin/AdminDashboard.tsx">
                <div className="w-2 h-2 bg-purple-500 rounded-full" data-id="xr1r0myws" data-path="src/pages/admin/AdminDashboard.tsx"></div>
                <div className="flex-1" data-id="v9lxui96c" data-path="src/pages/admin/AdminDashboard.tsx">
                  <p className="text-sm font-medium" data-id="tl8fha7fh" data-path="src/pages/admin/AdminDashboard.tsx">New store registered</p>
                  <p className="text-xs text-muted-foreground" data-id="ae2k8tkxf" data-path="src/pages/admin/AdminDashboard.tsx">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);

};

export default AdminDashboard;