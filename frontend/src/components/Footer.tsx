import { useLanguage } from '../contexts/LanguageContext';
import { Linkedin, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const { language } = useLanguage();

  const content = {
    az: {
      description: 'Süni intellekt və rəqəmsal həllər üzrə professional endpoint xidmətləri',
      quickLinks: 'Sürətli Keçidlər',
      contact: 'Əlaqə',
      email: 'E-poçt',
      phone: 'Telefon',
      address: 'Ünvan',
      addressText: 'Bakı şəhəri, Nizami küç. 203B',
      rights: '© 2026 proep.az — Pro End Point',
      menuItems: [
        { path: '/home', label: 'Ana Səhifə' },
        { path: '/about', label: 'Haqqımızda' },
        { path: '/services', label: 'Xidmətlər' },
        { path: '/blog', label: 'Blog' },
        { path: '/portfolio', label: 'Portfel' },
        { path: '/contact', label: 'Əlaqə' },
      ],
    },
    en: {
      description: 'Professional endpoint services for AI and digital solutions',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      addressText: 'Baku, Nizami Street 203B',
      rights: '© 2026 proep.az — Pro End Point',
      menuItems: [
        { path: '/home', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/services', label: 'Services' },
        { path: '/blog', label: 'Blog' },
        { path: '/portfolio', label: 'Portfolio' },
        { path: '/contact', label: 'Contact' },
      ],
    },
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            {/* Logo */}
            <Link to={`/home/${language}`} className="flex items-center gap-1 mb-4 group inline-flex">
              <span className="text-2xl font-medium text-gray-100">pro</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"></span>
              <span className="text-2xl font-medium bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                ep
              </span>
              <span className="ml-1 text-xs text-gray-500 font-light">.az</span>
            </Link>
            
            <p className="text-gray-400 text-sm mb-6 max-w-md font-light leading-relaxed">
              {content[language].description}
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/5"
              >
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/5"
              >
                <Github className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/5"
              >
                <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-4">{content[language].quickLinks}</h4>
            <ul className="space-y-3">
              {content[language].menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={`${item.path}/${language}`}
                    className="text-gray-400 hover:text-white text-sm transition-colors font-light"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium mb-4">{content[language].contact}</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-light">
              <li>
                <span className="text-white">{content[language].email}:</span>
                <br />
                <a href="mailto:hello@proep.az" className="hover:text-blue-400 transition-colors">
                  hello@proep.az
                </a>
              </li>
              <li>
                <span className="text-white">{content[language].phone}:</span>
                <br />
                <a href="tel:+994501234567" className="hover:text-blue-400 transition-colors">
                  +994 50 123 45 67
                </a>
              </li>
              <li>
                <span className="text-white">{content[language].address}:</span>
                <br />
                {content[language].addressText}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 font-light">{content[language].rights}</p>
            <div className="flex gap-6 text-sm text-gray-500 font-light">
              <a href="#" className="hover:text-white transition-colors">
                {language === 'az' ? 'Məxfilik Siyasəti' : 'Privacy Policy'}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {language === 'az' ? 'İstifadə Şərtləri' : 'Terms of Use'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
