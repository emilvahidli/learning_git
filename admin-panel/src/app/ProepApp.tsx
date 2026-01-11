import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { Login } from './screens/ProepLogin';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './screens/Dashboard';
import { Users } from './screens/Users';
import { Blog } from './screens/Blog';
import { Messages } from './screens/Messages';
import { useState } from 'react';

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const [activeMenu, setActiveMenu] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600/30 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Yüklənir...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <Users />;
      case 'blog':
        return <Blog />;
      case 'messages':
        return <Messages />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
      <Header />
      
      {/* Main Content */}
      <main className="ml-64 mt-16 p-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
