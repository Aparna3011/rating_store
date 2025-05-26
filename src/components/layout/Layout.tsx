import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50/50" data-id="6aqwghiap" data-path="src/components/layout/Layout.tsx">
      <Header data-id="8uvrimy5o" data-path="src/components/layout/Layout.tsx" />
      <div className="flex" data-id="xvdtzho8i" data-path="src/components/layout/Layout.tsx">
        <aside className="hidden md:block border-r bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60" data-id="vy0u21jf0" data-path="src/components/layout/Layout.tsx">
          <Sidebar data-id="n748uwqd8" data-path="src/components/layout/Layout.tsx" />
        </aside>
        <main className="flex-1 p-6" data-id="ycg2w13tk" data-path="src/components/layout/Layout.tsx">
          <div className="max-w-7xl mx-auto" data-id="h2sbzt5zs" data-path="src/components/layout/Layout.tsx">
            {children}
          </div>
        </main>
      </div>
    </div>);

};

export default Layout;