import { useState } from 'react';
import { Login } from './screens/Login';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './screens/Dashboard';
import { Users } from './screens/Users';
import { Blog } from './screens/Blog';
import { Messages } from './screens/Messages';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveMenu('dashboard');
  };

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

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // Main admin panel
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
      <Header onLogout={handleLogout} />
      
      {/* Main Content */}
      <main className="ml-64 mt-16 p-8">
        {renderContent()}
      </main>
    </div>
  );
}
