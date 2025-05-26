import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Loader2 } from 'lucide-react';

const AuthSuccessPage: React.FC = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4" data-id="a8wnjhlp7" data-path="src/pages/auth/AuthSuccessPage.tsx">
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm max-w-md w-full" data-id="92izsx3pe" data-path="src/pages/auth/AuthSuccessPage.tsx">
        <CardHeader className="text-center space-y-4" data-id="iyau1sqc4" data-path="src/pages/auth/AuthSuccessPage.tsx">
          <div className="flex justify-center" data-id="006708r35" data-path="src/pages/auth/AuthSuccessPage.tsx">
            <div className="relative" data-id="ouzoh526d" data-path="src/pages/auth/AuthSuccessPage.tsx">
              <CheckCircle className="h-16 w-16 text-green-500" data-id="a82w0zmav" data-path="src/pages/auth/AuthSuccessPage.tsx" />
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" data-id="fqpbhg6on" data-path="src/pages/auth/AuthSuccessPage.tsx" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-green-600" data-id="uftbkyyey" data-path="src/pages/auth/AuthSuccessPage.tsx">
            Email Verified Successfully!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4" data-id="25w0eawm2" data-path="src/pages/auth/AuthSuccessPage.tsx">
          <p className="text-gray-600" data-id="u5ijbuk15" data-path="src/pages/auth/AuthSuccessPage.tsx">
            Your email has been verified successfully. You can now log in to your account.
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500" data-id="smww4ozmc" data-path="src/pages/auth/AuthSuccessPage.tsx">
            <Loader2 className="h-4 w-4 animate-spin" data-id="25jwdisrt" data-path="src/pages/auth/AuthSuccessPage.tsx" />
            <span data-id="uqzvjvf91" data-path="src/pages/auth/AuthSuccessPage.tsx">Redirecting to login page in {countdown} seconds...</span>
          </div>
          
          <div className="mt-6" data-id="a9gfrn65f" data-path="src/pages/auth/AuthSuccessPage.tsx">
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:text-blue-800 underline text-sm font-medium" data-id="kaagacxc2" data-path="src/pages/auth/AuthSuccessPage.tsx">

              Go to login page now
            </button>
          </div>
        </CardContent>
      </Card>
    </div>);

};

export default AuthSuccessPage;