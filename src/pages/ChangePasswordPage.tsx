import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Eye, EyeOff, CheckCircle, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockApi } from '@/services/mockApi';
import { toast } from '@/hooks/use-toast';
import { validatePassword } from '@/utils/validation';

const ChangePasswordPage: React.FC = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { user } = useAuth();

  const passwordErrors = validatePassword(formData.newPassword);
  const passwordsMatch = formData.newPassword === formData.confirmPassword;
  const isFormValid =
  formData.currentPassword.length > 0 &&
  passwordErrors.length === 0 &&
  passwordsMatch &&
  formData.confirmPassword.length > 0;

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
    setSuccess(false);
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      setError('Please fix all validation errors before submitting');
      return;
    }

    if (!user) {
      setError('User not authenticated');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await mockApi.updatePassword(user.id, formData.newPassword);
      setSuccess(true);
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      toast({
        title: "Password updated successfully",
        description: "Your password has been changed."
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update password');
      toast({
        title: "Password update failed",
        description: err instanceof Error ? err.message : 'Failed to update password',
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const PasswordInput: React.FC<{
    id: string;
    label: string;
    value: string;
    showPassword: boolean;
    onChange: (value: string) => void;
    onToggleVisibility: () => void;
    placeholder: string;
    disabled?: boolean;
  }> = ({ id, label, value, showPassword, onChange, onToggleVisibility, placeholder, disabled }) =>
  <div className="space-y-2" data-id="2hrv8sjh3" data-path="src/pages/ChangePasswordPage.tsx">
      <Label htmlFor={id} data-id="i20p8hnbz" data-path="src/pages/ChangePasswordPage.tsx">{label}</Label>
      <div className="relative" data-id="zjwfcorft" data-path="src/pages/ChangePasswordPage.tsx">
        <Input
        id={id}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        disabled={disabled}
        className="pr-10" data-id="xpjo6ufc3" data-path="src/pages/ChangePasswordPage.tsx" />

        <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={onToggleVisibility}
        disabled={disabled} data-id="ied6pom9b" data-path="src/pages/ChangePasswordPage.tsx">

          {showPassword ?
        <EyeOff className="h-4 w-4" data-id="03q1q8c7h" data-path="src/pages/ChangePasswordPage.tsx" /> :

        <Eye className="h-4 w-4" data-id="hfxno33jd" data-path="src/pages/ChangePasswordPage.tsx" />
        }
        </Button>
      </div>
    </div>;


  return (
    <div className="max-w-md mx-auto space-y-6" data-id="ovz38brfn" data-path="src/pages/ChangePasswordPage.tsx">
      <div className="text-center" data-id="xqhuw2g62" data-path="src/pages/ChangePasswordPage.tsx">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-id="2t2e6wo5l" data-path="src/pages/ChangePasswordPage.tsx">
          Change Password
        </h1>
        <p className="text-muted-foreground mt-2" data-id="8a1ztxmg3" data-path="src/pages/ChangePasswordPage.tsx">
          Update your account password
        </p>
      </div>

      <Card data-id="kxzqvq7x8" data-path="src/pages/ChangePasswordPage.tsx">
        <CardHeader data-id="gbucu5fgu" data-path="src/pages/ChangePasswordPage.tsx">
          <CardTitle className="flex items-center gap-2" data-id="geahd09wn" data-path="src/pages/ChangePasswordPage.tsx">
            <Lock className="h-5 w-5" data-id="hekj66uzt" data-path="src/pages/ChangePasswordPage.tsx" />
            Password Settings
          </CardTitle>
          <CardDescription data-id="mpt0ch6dk" data-path="src/pages/ChangePasswordPage.tsx">
            Enter your current password and choose a new secure password
          </CardDescription>
        </CardHeader>
        <CardContent data-id="4fya5t4di" data-path="src/pages/ChangePasswordPage.tsx">
          <form onSubmit={handleSubmit} className="space-y-4" data-id="fwupx1jt5" data-path="src/pages/ChangePasswordPage.tsx">
            {error &&
            <Alert variant="destructive" data-id="duxs4dzjy" data-path="src/pages/ChangePasswordPage.tsx">
                <AlertDescription data-id="qm29yq6hy" data-path="src/pages/ChangePasswordPage.tsx">{error}</AlertDescription>
              </Alert>
            }

            {success &&
            <Alert className="border-green-200 bg-green-50" data-id="23x5xtxr1" data-path="src/pages/ChangePasswordPage.tsx">
                <CheckCircle className="h-4 w-4 text-green-600" data-id="do9xxsu2p" data-path="src/pages/ChangePasswordPage.tsx" />
                <AlertDescription className="text-green-800" data-id="hv1nkkv5q" data-path="src/pages/ChangePasswordPage.tsx">
                  Password updated successfully!
                </AlertDescription>
              </Alert>
            }

            <PasswordInput
              id="currentPassword"
              label="Current Password"
              value={formData.currentPassword}
              showPassword={showPasswords.current}
              onChange={(value) => handleInputChange('currentPassword', value)}
              onToggleVisibility={() => togglePasswordVisibility('current')}
              placeholder="Enter your current password"
              disabled={isLoading} data-id="uh20cp6s4" data-path="src/pages/ChangePasswordPage.tsx" />


            <PasswordInput
              id="newPassword"
              label="New Password"
              value={formData.newPassword}
              showPassword={showPasswords.new}
              onChange={(value) => handleInputChange('newPassword', value)}
              onToggleVisibility={() => togglePasswordVisibility('new')}
              placeholder="Enter your new password"
              disabled={isLoading} data-id="6fbhmt6be" data-path="src/pages/ChangePasswordPage.tsx" />


            {formData.newPassword.length > 0 &&
            <div className="text-xs space-y-1" data-id="icoemi4ck" data-path="src/pages/ChangePasswordPage.tsx">
                <p className="font-medium" data-id="mitn0jrxg" data-path="src/pages/ChangePasswordPage.tsx">Password requirements:</p>
                <ul className="list-disc list-inside space-y-0.5 ml-2" data-id="7x3tyw6or" data-path="src/pages/ChangePasswordPage.tsx">
                  <li className={formData.newPassword.length >= 8 && formData.newPassword.length <= 16 ? 'text-green-600' : 'text-red-500'} data-id="kni9ewjf2" data-path="src/pages/ChangePasswordPage.tsx">
                    8-16 characters long
                  </li>
                  <li className={/[A-Z]/.test(formData.newPassword) ? 'text-green-600' : 'text-red-500'} data-id="8r1jmfvtk" data-path="src/pages/ChangePasswordPage.tsx">
                    At least one uppercase letter
                  </li>
                  <li className={/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.newPassword) ? 'text-green-600' : 'text-red-500'} data-id="twhlfevf9" data-path="src/pages/ChangePasswordPage.tsx">
                    At least one special character
                  </li>
                </ul>
              </div>
            }

            <PasswordInput
              id="confirmPassword"
              label="Confirm New Password"
              value={formData.confirmPassword}
              showPassword={showPasswords.confirm}
              onChange={(value) => handleInputChange('confirmPassword', value)}
              onToggleVisibility={() => togglePasswordVisibility('confirm')}
              placeholder="Confirm your new password"
              disabled={isLoading} data-id="5x8zgojt1" data-path="src/pages/ChangePasswordPage.tsx" />


            {formData.confirmPassword.length > 0 &&
            <div className="text-xs" data-id="dactyatb6" data-path="src/pages/ChangePasswordPage.tsx">
                {passwordsMatch ?
              <p className="text-green-600 flex items-center gap-1" data-id="dcsxmyj6x" data-path="src/pages/ChangePasswordPage.tsx">
                    <CheckCircle className="h-3 w-3" data-id="o5fvmc4a3" data-path="src/pages/ChangePasswordPage.tsx" />
                    Passwords match
                  </p> :

              <p className="text-red-500" data-id="wxkt7u79u" data-path="src/pages/ChangePasswordPage.tsx">Passwords do not match</p>
              }
              </div>
            }

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isLoading || !isFormValid} data-id="wd4etnic2" data-path="src/pages/ChangePasswordPage.tsx">

              {isLoading ?
              <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" data-id="l9qd7pkca" data-path="src/pages/ChangePasswordPage.tsx" />
                  Updating password...
                </> :

              'Update Password'
              }
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>);

};

export default ChangePasswordPage;