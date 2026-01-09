import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';

export function Navigation() {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = {
    az: [
      { path: '/home', label: 'Ana Səhifə', enPath: '/home' },
      { path: '/about', label: 'Haqqımızda', enPath: '/about' },
      { path: '/services', label: 'Xidmətlər', enPath: '/services' },
      { path: '/blog', label: 'Blog', enPath: '/blog' },
      { path: '/portfolio', label: 'Portfel', enPath: '/portfolio' },
      { path: '/contact', label: 'Əlaqə', enPath: '/contact' },
    ],
    en: [
      { path: '/home', label: 'Home', enPath: '/home' },
      { path: '/about', label: 'About', enPath: '/about' },
      { path: '/services', label: 'Services', enPath: '/services' },
      { path: '/blog', label: 'Blog', enPath: '/blog' },
      { path: '/portfolio', label: 'Portfolio', enPath: '/portfolio' },
      { path: '/contact', label: 'Contact', enPath: '/contact' },
    ],
  };

  const handleLanguageChange = (lang: 'az' | 'en') => {
    setLanguage(lang);
    const currentPath = location.pathname;
    const pathParts = currentPath.split('/');
    const pagePath = pathParts[1] || 'home';
    navigate(`/${pagePath}/${lang}`);
  };

  const getCurrentPath = () => {
    const pathParts = location.pathname.split('/');
    return pathParts[1] || 'home';
  };

  const currentPath = getCurrentPath();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with Split Design */}
          <Link to={`/home/${language}`} className="flex items-center gap-1 group">
            <span className="text-2xl font-medium text-gray-100 transition-all duration-300 group-hover:tracking-wider">
              pro
            </span>
            
            {/* Animated Dot Between */}
            <motion.div
              className="relative w-2 h-2"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 blur-sm"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
            </motion.div>
            
            <span className="text-2xl font-medium bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent transition-all duration-300 group-hover:tracking-wider">
              ep
            </span>
            
            <span className="ml-2 text-xs text-gray-500 font-light">.az</span>
          </Link>

          {/* Menu Items */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems[language].map((item) => {
              const isActive = currentPath === item.path.replace('/', '');
              return (
                <Link
                  key={item.path}
                  to={`${item.path}/${language}`}
                  className={`text-sm font-light transition-all duration-200 relative ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-blue-400 to-cyan-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Language Switcher */}
            <div className="flex gap-1 ml-4 bg-white/5 rounded-lg p-1">
              <button
                onClick={() => handleLanguageChange('az')}
                className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
                  language === 'az'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                AZ
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
                  language === 'en'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
