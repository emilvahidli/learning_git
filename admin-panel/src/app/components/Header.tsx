import { Bell, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onLogout?: () => void;
}

export function Header({ onLogout }: HeaderProps) {
  const { admin, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    if (onLogout) onLogout();
  };

  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-gradient-to-r from-[#0a0a0a] to-black border-b border-white/10 flex items-center justify-end px-6 gap-4 z-10">
      {/* Notifications */}
      <button className="relative p-2 rounded-xl hover:bg-white/5 transition-colors">
        <Bell size={20} className="text-gray-400" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-purple-600 rounded-full"></span>
      </button>

      {/* User Profile */}
      <div className="flex items-center gap-3 pl-4 border-l border-white/10">
        <div className="text-right">
          <div className="text-sm text-gray-200">{admin?.fullName || 'Admin'}</div>
          <div className="text-xs text-gray-500">{admin?.email || 'admin@proep.az'}</div>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white font-medium">
          {admin?.fullName?.split(' ').map(n => n[0]).join('') || 'A'}
        </div>
      </div>

      {/* Logout */}
      <button 
        onClick={handleLogout}
        className="p-2 rounded-xl hover:bg-red-500/10 transition-colors group"
      >
        <LogOut size={20} className="text-gray-400 group-hover:text-red-400" />
      </button>
    </header>
  );
}