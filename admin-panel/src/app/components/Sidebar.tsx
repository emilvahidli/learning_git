import { LayoutDashboard, Users, FileText, Mail, Settings, Briefcase } from 'lucide-react';

interface SidebarProps {
  activeMenu: string;
  onMenuChange: (menu: string) => void;
}

export function Sidebar({ activeMenu, onMenuChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'messages', label: 'Mesajlar', icon: Mail },
    { id: 'users', label: 'İstifadəçilər', icon: Users },
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'settings', label: 'Settings', icon: Settings, disabled: true },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-[#0a0a0a] to-black border-r border-white/10 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <div className="flex items-center gap-1">
          <span className="text-xl font-medium text-gray-100">pro</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"></span>
          <span className="text-xl font-medium bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            ep
          </span>
          <span className="ml-1 text-xs text-gray-500 font-light">.az</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-3 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => !item.disabled && onMenuChange(item.id)}
              disabled={item.disabled}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1
                transition-all duration-200
                ${isActive 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-600/30' 
                  : item.disabled
                    ? 'text-gray-600 cursor-not-allowed'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }
              `}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 text-xs text-gray-500">
        © 2026 proep.az
      </div>
    </aside>
  );
}
