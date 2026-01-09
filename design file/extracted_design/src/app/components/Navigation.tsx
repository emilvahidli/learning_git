import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';

export function Navigation() {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();

  const menuItems = {
    az: [
      { path: '/', label: 'Ana Səhifə' },
      { path: '/about', label: 'Haqqımızda' },
      { path: '/services', label: 'Xidmətlər' },
      { path: '/blog', label: 'Blog' },
      { path: '/portfolio', label: 'Portfel' },
      { path: '/contact', label: 'Əlaqə' },
    ],
    en: [
      { path: '/', label: 'Home' },
      { path: '/about', label: 'About' },
      { path: '/services', label: 'Services' },
      { path: '/blog', label: 'Blog' },
      { path: '/portfolio', label: 'Portfolio' },
      { path: '/contact', label: 'Contact' },
    ],
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with Split Design */}
          <Link to="/" className="flex items-center gap-1 group">
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
          <div className="flex items-center gap-8">
            {menuItems[language].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-light transition-all duration-200 relative ${
                  location.pathname === item.path
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-blue-400 to-cyan-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            {/* Language Switcher */}
            <div className="flex gap-1 ml-4 bg-white/5 rounded-lg p-1">
              <button
                onClick={() => setLanguage('az')}
                className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
                  language === 'az'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                AZ
              </button>
              <button
                onClick={() => setLanguage('en')}
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