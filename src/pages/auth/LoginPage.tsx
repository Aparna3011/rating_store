import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Eye, EyeOff, User, Store, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userType, setUserType] = useState('user');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { error } = await window.ezsite.apis.login({ email, password });
      if (error) throw new Error(error);

      // Get user info after successful login
      const { data: userInfo, error: userError } = await window.ezsite.apis.getUserInfo();
      if (userError) throw new Error(userError);

      toast({
        title: "Welcome back!",
        description: `Logged in as ${userInfo.Name}`
      });

      // Navigate based on user role
      if (userInfo.Role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user-stores');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getUserTypeDescription = (type: string) => {
    switch (type) {
      case 'user':
        return 'Access your account to rate and review stores';
      case 'store_owner':
        return 'Manage your store and view customer ratings';
      case 'admin':
        return 'Access administrative dashboard and manage platform';
      default:
        return '';
    }
  };

  const getUserTypeTitle = (type: string) => {
    switch (type) {
      case 'user':
        return 'User Login';
      case 'store_owner':
        return 'Store Owner Login';
      case 'admin':
        return 'Admin Login';
      default:
        return 'Login';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4" data-id="1qkq48ig5" data-path="src/pages/auth/LoginPage.tsx">
      <div className="w-full max-w-md" data-id="gwc4yu9ru" data-path="src/pages/auth/LoginPage.tsx">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm" data-id="908mshtq7" data-path="src/pages/auth/LoginPage.tsx">
          <CardHeader className="space-y-1 text-center" data-id="qaflqb5zu" data-path="src/pages/auth/LoginPage.tsx">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-id="orfhor1h6" data-path="src/pages/auth/LoginPage.tsx">
              Store Rating Platform
            </CardTitle>
            <CardDescription data-id="zub1va95a" data-path="src/pages/auth/LoginPage.tsx">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent data-id="ci8tcpgmi" data-path="src/pages/auth/LoginPage.tsx">
            <Tabs value={userType} onValueChange={setUserType} className="w-full" data-id="x8j2nqz2f" data-path="src/pages/auth/LoginPage.tsx">
              <TabsList className="grid w-full grid-cols-3 mb-6" data-id="t9wv7o78s" data-path="src/pages/auth/LoginPage.tsx">
                <TabsTrigger value="user" className="flex items-center gap-2" data-id="vieo61kj8" data-path="src/pages/auth/LoginPage.tsx">
                  <User className="h-4 w-4" data-id="a7a0yen12" data-path="src/pages/auth/LoginPage.tsx" />
                  User
                </TabsTrigger>
                <TabsTrigger value="store_owner" className="flex items-center gap-2" data-id="zqrm66ln8" data-path="src/pages/auth/LoginPage.tsx">
                  <Store className="h-4 w-4" data-id="j1ztdk25f" data-path="src/pages/auth/LoginPage.tsx" />
                  Store Owner
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2" data-id="5oe185hba" data-path="src/pages/auth/LoginPage.tsx">
                  <Shield className="h-4 w-4" data-id="aymbejd2w" data-path="src/pages/auth/LoginPage.tsx" />
                  Admin
                </TabsTrigger>
              </TabsList>
              
              <div className="text-center mb-6" data-id="9y9apcar0" data-path="src/pages/auth/LoginPage.tsx">
                <h3 className="text-lg font-semibold text-gray-900" data-id="h6rcqwaue" data-path="src/pages/auth/LoginPage.tsx">{getUserTypeTitle(userType)}</h3>
                <p className="text-sm text-gray-600" data-id="fehcd5jz7" data-path="src/pages/auth/LoginPage.tsx">{getUserTypeDescription(userType)}</p>
              </div>
            </Tabs>
            
            <form onSubmit={handleSubmit} className="space-y-4" data-id="oyxpqb7di" data-path="src/pages/auth/LoginPage.tsx">
              {error &&
              <Alert variant="destructive" data-id="y5rp2ypwo" data-path="src/pages/auth/LoginPage.tsx">
                  <AlertDescription data-id="agyrnr601" data-path="src/pages/auth/LoginPage.tsx">{error}</AlertDescription>
                </Alert>
              }
              
              <div className="space-y-2" data-id="978iruaa7" data-path="src/pages/auth/LoginPage.tsx">
                <Label htmlFor="email" data-id="w1a3rjgwa" data-path="src/pages/auth/LoginPage.tsx">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={`Enter your ${userType === 'store_owner' ? 'store owner ' : userType + ' '}email`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading} data-id="niuf9fqpf" data-path="src/pages/auth/LoginPage.tsx" />

              </div>
              
              <div className="space-y-2" data-id="un11g9bgy" data-path="src/pages/auth/LoginPage.tsx">
                <Label htmlFor="password" data-id="i5jbw5p17" data-path="src/pages/auth/LoginPage.tsx">Password</Label>
                <div className="relative" data-id="ir0ogtreb" data-path="src/pages/auth/LoginPage.tsx">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading} data-id="b7s42ru9y" data-path="src/pages/auth/LoginPage.tsx" />

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading} data-id="2p5hzbcwj" data-path="src/pages/auth/LoginPage.tsx">

                    {showPassword ?
                    <EyeOff className="h-4 w-4" data-id="qaj5cok9b" data-path="src/pages/auth/LoginPage.tsx" /> :

                    <Eye className="h-4 w-4" data-id="xzltg5p94" data-path="src/pages/auth/LoginPage.tsx" />
                    }
                  </Button>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isLoading} data-id="ue2mr3ora" data-path="src/pages/auth/LoginPage.tsx">

                {isLoading ?
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" data-id="7ibeco69p" data-path="src/pages/auth/LoginPage.tsx" />
                    Signing in...
                  </> :

                `Sign In as ${userType === 'store_owner' ? 'Store Owner' : userType.charAt(0).toUpperCase() + userType.slice(1)}`
                }
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm" data-id="6ibjv6bad" data-path="src/pages/auth/LoginPage.tsx">
              <span className="text-muted-foreground" data-id="5t8phsjn3" data-path="src/pages/auth/LoginPage.tsx">Don't have an account? </span>
              <Link
                to="/signup"
                className="text-primary hover:underline font-medium" data-id="0f39go2ox" data-path="src/pages/auth/LoginPage.tsx">

                Sign up
              </Link>
            </div>
            
          </CardContent>
        </Card>
      </div>
    </div>);

};

export default LoginPage;