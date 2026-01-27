import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Navigation() {
    const { language, setLanguage, t } = useLanguage();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { path: '/', label: t.nav.home },
        { path: '/services', label: t.nav.services },
        { path: '/portfolio', label: t.nav.portfolio },
        { path: '/blog', label: t.nav.blog },
        { path: '/contact', label: t.nav.contact },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary flex items-center justify-center">
                            <span className="font-poppins font-bold text-white text-xl">P</span>
                        </div>
                        <span className="font-poppins font-bold text-xl text-dark">Proep.az</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`font-inter text-sm transition-colors ${isActive(link.path)
                                    ? 'text-primary font-semibold'
                                    : 'text-gray-600 hover:text-primary'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Language Toggle */}
                    <div className="hidden md:flex items-center gap-2 border border-gray-200 rounded-lg p-1">
                        <button
                            onClick={() => setLanguage('en')}
                            className={`px-3 py-1 text-sm font-inter rounded transition-all ${language === 'en'
                                ? 'bg-primary text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            EN
                        </button>
                        <button
                            onClick={() => setLanguage('az')}
                            className={`px-3 py-1 text-sm font-inter rounded transition-all ${language === 'az'
                                ? 'bg-primary text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            AZ
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 py-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block px-4 py-3 font-inter ${isActive(link.path) ? 'text-primary font-semibold' : 'text-gray-600'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="flex gap-2 px-4 pt-4 mt-4 border-t border-gray-100">
                            <button
                                onClick={() => setLanguage('en')}
                                className={`px-4 py-2 text-sm rounded ${language === 'en' ? 'bg-primary text-white' : 'bg-gray-100'
                                    }`}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => setLanguage('az')}
                                className={`px-4 py-2 text-sm rounded ${language === 'az' ? 'bg-primary text-white' : 'bg-gray-100'
                                    }`}
                            >
                                AZ
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
