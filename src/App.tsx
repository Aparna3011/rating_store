import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';

// Auth pages
import LoginPage from '@/pages/auth/LoginPage';
import SignupPage from '@/pages/auth/SignupPage';
import AuthSuccessPage from '@/pages/auth/AuthSuccessPage';

// Admin pages
import AdminDashboard from '@/pages/admin/AdminDashboard';

// User pages
import UserStores from '@/pages/user/UserStores';

// Shared pages
import ChangePasswordPage from '@/pages/ChangePasswordPage';
import NotFound from '@/pages/NotFound';
import './App.css';

const queryClient = new QueryClient();

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Layout data-id="skzqa6djs" data-path="src/App.tsx">
      <Routes data-id="5z5qmwrgx" data-path="src/App.tsx">
        {/* Public routes */}
        <Route path="/login" element={
        user ? <Navigate to={getDefaultRoute(user.role)} replace data-id="7lshyc77l" data-path="src/App.tsx" /> : <LoginPage data-id="6qfuq8mxo" data-path="src/App.tsx" />
        } data-id="ncddg4ud7" data-path="src/App.tsx" />
        <Route path="/signup" element={
        user ? <Navigate to={getDefaultRoute(user.role)} replace data-id="fwh0odeut" data-path="src/App.tsx" /> : <SignupPage data-id="mfons4jnm" data-path="src/App.tsx" />
        } data-id="8pp1yshbu" data-path="src/App.tsx" />
        <Route path="/onauthsuccess" element={<AuthSuccessPage data-id="3pt11og56" data-path="src/App.tsx" />} data-id="t7o5he3jz" data-path="src/App.tsx" />
        
        {/* Protected shared routes */}
        <Route path="/change-password" element={
        <ProtectedRoute data-id="g5lqiv8mg" data-path="src/App.tsx">
            <ChangePasswordPage data-id="80t1b35o6" data-path="src/App.tsx" />
          </ProtectedRoute>
        } data-id="jh1q7slhz" data-path="src/App.tsx" />
        
        {/* Admin routes */}
        <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']} data-id="li13twp89" data-path="src/App.tsx">
            <AdminDashboard data-id="fjuzfr032" data-path="src/App.tsx" />
          </ProtectedRoute>
        } data-id="o56eodyma" data-path="src/App.tsx" />
        <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRoles={['admin']} data-id="v8xo83yzj" data-path="src/App.tsx">
            <AdminDashboard data-id="4al8bj2wh" data-path="src/App.tsx" />
          </ProtectedRoute>
        } data-id="td3g0m3lc" data-path="src/App.tsx" />
        
        {/* User routes */}
        <Route path="/user-stores" element={
        <ProtectedRoute allowedRoles={['user', 'store_owner']} data-id="ronerrq44" data-path="src/App.tsx">
            <UserStores data-id="2gnmjf222" data-path="src/App.tsx" />
          </ProtectedRoute>
        } data-id="eninn6max" data-path="src/App.tsx" />
        <Route path="/user/stores" element={
        <ProtectedRoute allowedRoles={['user', 'store_owner']} data-id="u3xlyen5m" data-path="src/App.tsx">
            <UserStores data-id="tqykc9c56" data-path="src/App.tsx" />
          </ProtectedRoute>
        } data-id="gjs1lcb5i" data-path="src/App.tsx" />
        
        {/* Store Owner routes */}
        <Route path="/store-owner/dashboard" element={
        <ProtectedRoute allowedRoles={['store_owner']} data-id="r5pew6rjs" data-path="src/App.tsx">
            <UserStores data-id="fxy6u6pjf" data-path="src/App.tsx" />
          </ProtectedRoute>
        } data-id="u4hoea54x" data-path="src/App.tsx" />
        
        {/* Default redirect based on user role */}
        <Route path="/" element={
        user ? <Navigate to={getDefaultRoute(user.role)} replace data-id="hcf01vzh3" data-path="src/App.tsx" /> : <Navigate to="/login" replace data-id="bdwuq9l24" data-path="src/App.tsx" />
        } data-id="l2ev0ttjc" data-path="src/App.tsx" />
        
        {/* 404 page */}
        <Route path="*" element={<NotFound data-id="cg3yfbdas" data-path="src/App.tsx" />} data-id="0pnsy2cnz" data-path="src/App.tsx" />
      </Routes>
    </Layout>);

}

function getDefaultRoute(role: string): string {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'user':
      return '/user-stores';
    case 'store_owner':
      return '/user-stores';
    default:
      return '/login';
  }
}

function App() {
  return (
    <QueryClientProvider client={queryClient} data-id="oowm4m3ka" data-path="src/App.tsx">
      <TooltipProvider data-id="r5gtu11pe" data-path="src/App.tsx">
        <AuthProvider data-id="8zv4v6i3j" data-path="src/App.tsx">
          <Router data-id="a7vwhpqhf" data-path="src/App.tsx">
            <div className="min-h-screen bg-background" data-id="2skf2waz3" data-path="src/App.tsx">
              <AppRoutes data-id="my5a7271k" data-path="src/App.tsx" />
            </div>
            <Toaster data-id="9xhv5ku5l" data-path="src/App.tsx" />
          </Router>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>);

}

export default App;