import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Eye, EyeOff, CheckCircle, XCircle, User, Store, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { validateName, validateEmail, validateAddress, validatePassword } from '@/utils/validation';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userType, setUserType] = useState('user');
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    address: false,
    password: false
  });

  const { signup } = useAuth();
  const navigate = useNavigate();

  const getUserTypeDescription = (type: string) => {
    switch (type) {
      case 'user':
        return 'Create account to rate and review stores';
      case 'store_owner':
        return 'Register your store and manage customer ratings';
      case 'admin':
        return 'Create administrative account to manage platform';
      default:
        return '';
    }
  };

  const getUserTypeTitle = (type: string) => {
    switch (type) {
      case 'user':
        return 'User Registration';
      case 'store_owner':
        return 'Store Owner Registration';
      case 'admin':
        return 'Admin Registration';
      default:
        return 'Registration';
    }
  };

  const validationErrors = {
    name: validateName(formData.name),
    email: validateEmail(formData.email),
    address: validateAddress(formData.address),
    password: validatePassword(formData.password)
  };

  const isFormValid = Object.values(validationErrors).every((errors) => errors.length === 0) &&
  Object.values(formData).every((value) => value.trim() !== '');

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      address: true,
      password: true
    });

    if (!isFormValid) {
      setError('Please fix all validation errors before submitting');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await signup(formData);
      toast({
        title: "Account created successfully!",
        description: "Welcome to Store Rating Platform."
      });
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
      toast({
        title: "Signup failed",
        description: err instanceof Error ? err.message : 'Signup failed',
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const ValidationIcon: React.FC<{isValid: boolean;show: boolean;}> = ({ isValid, show }) => {
    if (!show) return null;
    return isValid ?
    <CheckCircle className="h-4 w-4 text-green-500" data-id="atqbk83io" data-path="src/pages/auth/SignupPage.tsx" /> :
    <XCircle className="h-4 w-4 text-red-500" data-id="rf4yu5rjx" data-path="src/pages/auth/SignupPage.tsx" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4" data-id="97k2t50m0" data-path="src/pages/auth/SignupPage.tsx">
      <div className="w-full max-w-md" data-id="xsi5w12cu" data-path="src/pages/auth/SignupPage.tsx">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm" data-id="zn56gtspp" data-path="src/pages/auth/SignupPage.tsx">
          <CardHeader className="space-y-1 text-center" data-id="ryc25bhzv" data-path="src/pages/auth/SignupPage.tsx">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-id="p4ho86eci" data-path="src/pages/auth/SignupPage.tsx">
              Store Rating Platform
            </CardTitle>
            <CardDescription data-id="85twyn7pk" data-path="src/pages/auth/SignupPage.tsx">
              Create your account to get started
            </CardDescription>
          </CardHeader>
          <CardContent data-id="8g1pkqjsl" data-path="src/pages/auth/SignupPage.tsx">
            <Tabs value={userType} onValueChange={setUserType} className="w-full" data-id="l2cget3yr" data-path="src/pages/auth/SignupPage.tsx">
              <TabsList className="grid w-full grid-cols-3 mb-6" data-id="2crkulh3y" data-path="src/pages/auth/SignupPage.tsx">
                <TabsTrigger value="user" className="flex items-center gap-2" data-id="i7kh2eabb" data-path="src/pages/auth/SignupPage.tsx">
                  <User className="h-4 w-4" data-id="dga58zose" data-path="src/pages/auth/SignupPage.tsx" />
                  User
                </TabsTrigger>
                <TabsTrigger value="store_owner" className="flex items-center gap-2" data-id="17z3g361b" data-path="src/pages/auth/SignupPage.tsx">
                  <Store className="h-4 w-4" data-id="fe7wrioco" data-path="src/pages/auth/SignupPage.tsx" />
                  Store Owner
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2" data-id="4fx2nildg" data-path="src/pages/auth/SignupPage.tsx">
                  <Shield className="h-4 w-4" data-id="k1dnnosph" data-path="src/pages/auth/SignupPage.tsx" />
                  Admin
                </TabsTrigger>
              </TabsList>
              
              <div className="text-center mb-6" data-id="x9hb384zw" data-path="src/pages/auth/SignupPage.tsx">
                <h3 className="text-lg font-semibold text-gray-900" data-id="wmjt6jz5s" data-path="src/pages/auth/SignupPage.tsx">{getUserTypeTitle(userType)}</h3>
                <p className="text-sm text-gray-600" data-id="ey1gyf78y" data-path="src/pages/auth/SignupPage.tsx">{getUserTypeDescription(userType)}</p>
              </div>
            </Tabs>
            
            <form onSubmit={handleSubmit} className="space-y-4" data-id="g6uay0o9x" data-path="src/pages/auth/SignupPage.tsx">
              {error &&
              <Alert variant="destructive" data-id="qez9780bs" data-path="src/pages/auth/SignupPage.tsx">
                  <AlertDescription data-id="jitpzpfq9" data-path="src/pages/auth/SignupPage.tsx">{error}</AlertDescription>
                </Alert>
              }
              
              <div className="space-y-2" data-id="v0ksio7p4" data-path="src/pages/auth/SignupPage.tsx">
                <Label htmlFor="name" data-id="1inhcxeqi" data-path="src/pages/auth/SignupPage.tsx">Full Name</Label>
                <div className="relative" data-id="zhjlutmde" data-path="src/pages/auth/SignupPage.tsx">
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name (20-60 characters)"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    disabled={isLoading}
                    className={touched.name && validationErrors.name.length > 0 ? 'border-red-500' : ''} data-id="3twdr9gq5" data-path="src/pages/auth/SignupPage.tsx" />

                  <div className="absolute right-3 top-1/2 -translate-y-1/2" data-id="0xtwmljng" data-path="src/pages/auth/SignupPage.tsx">
                    <ValidationIcon
                      isValid={validationErrors.name.length === 0 && formData.name.length > 0}
                      show={touched.name && formData.name.length > 0} data-id="9w2kr23kd" data-path="src/pages/auth/SignupPage.tsx" />

                  </div>
                </div>
                {touched.name && validationErrors.name.map((error, index) =>
                <p key={index} className="text-xs text-red-500" data-id="ob2a37vgs" data-path="src/pages/auth/SignupPage.tsx">{error}</p>
                )}
              </div>
              
              <div className="space-y-2" data-id="005y83eg4" data-path="src/pages/auth/SignupPage.tsx">
                <Label htmlFor="email" data-id="4k4bepnb6" data-path="src/pages/auth/SignupPage.tsx">Email</Label>
                <div className="relative" data-id="iu2g2we6b" data-path="src/pages/auth/SignupPage.tsx">
                  <Input
                    id="email"
                    type="email"
                    placeholder={`Enter your ${userType === 'store_owner' ? 'store owner ' : userType + ' '}email`}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    disabled={isLoading}
                    className={touched.email && validationErrors.email.length > 0 ? 'border-red-500' : ''} data-id="utbff3vti" data-path="src/pages/auth/SignupPage.tsx" />

                  <div className="absolute right-3 top-1/2 -translate-y-1/2" data-id="khvocb1hv" data-path="src/pages/auth/SignupPage.tsx">
                    <ValidationIcon
                      isValid={validationErrors.email.length === 0 && formData.email.length > 0}
                      show={touched.email && formData.email.length > 0} data-id="cl3sxkkhl" data-path="src/pages/auth/SignupPage.tsx" />

                  </div>
                </div>
                {touched.email && validationErrors.email.map((error, index) =>
                <p key={index} className="text-xs text-red-500" data-id="th3h96uwg" data-path="src/pages/auth/SignupPage.tsx">{error}</p>
                )}
              </div>
              
              <div className="space-y-2" data-id="2jo6bhpbr" data-path="src/pages/auth/SignupPage.tsx">
                <Label htmlFor="address" data-id="k6fdarj6b" data-path="src/pages/auth/SignupPage.tsx">Address</Label>
                <div className="relative" data-id="6mzkoaybb" data-path="src/pages/auth/SignupPage.tsx">
                  <Textarea
                    id="address"
                    placeholder="Enter your address (max 400 characters)"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                    disabled={isLoading}
                    className={`min-h-[80px] ${touched.address && validationErrors.address.length > 0 ? 'border-red-500' : ''}`} data-id="0u1o8yzt5" data-path="src/pages/auth/SignupPage.tsx" />

                  <div className="absolute right-3 top-3" data-id="np1zfq09r" data-path="src/pages/auth/SignupPage.tsx">
                    <ValidationIcon
                      isValid={validationErrors.address.length === 0 && formData.address.length > 0}
                      show={touched.address && formData.address.length > 0} data-id="mis4cofqj" data-path="src/pages/auth/SignupPage.tsx" />

                  </div>
                </div>
                <div className="text-xs text-muted-foreground" data-id="blrpc3hxf" data-path="src/pages/auth/SignupPage.tsx">
                  {formData.address.length}/400 characters
                </div>
                {touched.address && validationErrors.address.map((error, index) =>
                <p key={index} className="text-xs text-red-500" data-id="afwsf9ghq" data-path="src/pages/auth/SignupPage.tsx">{error}</p>
                )}
              </div>
              
              <div className="space-y-2" data-id="llceyun5m" data-path="src/pages/auth/SignupPage.tsx">
                <Label htmlFor="password" data-id="ccxzhnudm" data-path="src/pages/auth/SignupPage.tsx">Password</Label>
                <div className="relative" data-id="xxoouirz3" data-path="src/pages/auth/SignupPage.tsx">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                    disabled={isLoading}
                    className={touched.password && validationErrors.password.length > 0 ? 'border-red-500' : ''} data-id="0ji40ec0b" data-path="src/pages/auth/SignupPage.tsx" />

                  <div className="absolute right-10 top-1/2 -translate-y-1/2" data-id="sctzfcy0k" data-path="src/pages/auth/SignupPage.tsx">
                    <ValidationIcon
                      isValid={validationErrors.password.length === 0 && formData.password.length > 0}
                      show={touched.password && formData.password.length > 0} data-id="u3th9r98d" data-path="src/pages/auth/SignupPage.tsx" />

                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading} data-id="uo44o4noh" data-path="src/pages/auth/SignupPage.tsx">

                    {showPassword ?
                    <EyeOff className="h-4 w-4" data-id="j6vos6fnk" data-path="src/pages/auth/SignupPage.tsx" /> :

                    <Eye className="h-4 w-4" data-id="53zlfmehf" data-path="src/pages/auth/SignupPage.tsx" />
                    }
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground space-y-1" data-id="5r134iudi" data-path="src/pages/auth/SignupPage.tsx">
                  <p data-id="ldf80b37m" data-path="src/pages/auth/SignupPage.tsx">Password must:</p>
                  <ul className="list-disc list-inside space-y-0.5 ml-2" data-id="30fimoccb" data-path="src/pages/auth/SignupPage.tsx">
                    <li className={formData.password.length >= 8 && formData.password.length <= 16 ? 'text-green-600' : ''} data-id="p78nz7vqn" data-path="src/pages/auth/SignupPage.tsx">
                      Be 8-16 characters long
                    </li>
                    <li className={/[A-Z]/.test(formData.password) ? 'text-green-600' : ''} data-id="tkxd4h6rq" data-path="src/pages/auth/SignupPage.tsx">
                      Contain at least one uppercase letter
                    </li>
                    <li className={/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) ? 'text-green-600' : ''} data-id="hyjx3xund" data-path="src/pages/auth/SignupPage.tsx">
                      Contain at least one special character
                    </li>
                  </ul>
                </div>
                {touched.password && validationErrors.password.map((error, index) =>
                <p key={index} className="text-xs text-red-500" data-id="u8yinoxm5" data-path="src/pages/auth/SignupPage.tsx">{error}</p>
                )}
              </div>
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isLoading || !isFormValid} data-id="71nqwhhjg" data-path="src/pages/auth/SignupPage.tsx">

                {isLoading ?
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" data-id="wswhkgelp" data-path="src/pages/auth/SignupPage.tsx" />
                    Creating account...
                  </> :

                `Create ${userType === 'store_owner' ? 'Store Owner' : userType.charAt(0).toUpperCase() + userType.slice(1)} Account`
                }
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm" data-id="qwp592w0r" data-path="src/pages/auth/SignupPage.tsx">
              <span className="text-muted-foreground" data-id="pc8xfofq7" data-path="src/pages/auth/SignupPage.tsx">Already have an account? </span>
              <Link
                to="/login"
                className="text-primary hover:underline font-medium" data-id="iiheq3eyl" data-path="src/pages/auth/SignupPage.tsx">

                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);

};

export default SignupPage;