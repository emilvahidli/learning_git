import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    const isEnglish = t.nav.home === 'Home';

    const solutionLinks = [
        { path: '/services', label: isEnglish ? 'AI Integration' : 'Süni İntellekt' },
        { path: '/services', label: isEnglish ? 'Backend Development' : 'Backend İnkişafı' },
        { path: '/services', label: isEnglish ? 'Cloud Solutions' : 'Bulud Həlləri' },
        { path: '/services', label: isEnglish ? 'Automation' : 'Avtomatlaşdırma' },
    ];

    const companyLinks = [
        { path: '/', label: t.nav.home },
        { path: '/portfolio', label: t.nav.portfolio },
        { path: '/blog', label: t.nav.blog },
        { path: '/contact', label: t.nav.contact },
    ];

    return (
        <footer className="bg-[#212529] text-gray-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-primary flex items-center justify-center">
                                <span className="font-poppins font-bold text-white text-xl">P</span>
                            </div>
                            <h3 className="font-poppins font-bold text-2xl text-white">Proep.az</h3>
                        </Link>
                        <p className="font-inter text-sm leading-relaxed mb-6 max-w-sm">
                            {t.footer.description}
                        </p>
                        <div className="flex gap-4">
                            {['LinkedIn', 'Instagram', 'GitHub'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-12 h-12 bg-[#2d3236] flex items-center justify-center hover:bg-primary transition-colors"
                                    aria-label={social}
                                >
                                    <span className="text-white text-xs">{social[0]}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Solutions */}
                    <div>
                        <h4 className="font-poppins font-bold text-white text-sm uppercase tracking-wider mb-4">
                            {t.footer.solutions}
                        </h4>
                        <ul className="space-y-3">
                            {solutionLinks.map((link, i) => (
                                <li key={i}>
                                    <Link
                                        to={link.path}
                                        className="font-inter text-sm text-gray-400 hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-poppins font-bold text-white text-sm uppercase tracking-wider mb-4">
                            {t.footer.company}
                        </h4>
                        <ul className="space-y-3">
                            {companyLinks.map((link, i) => (
                                <li key={i}>
                                    <Link
                                        to={link.path}
                                        className="font-inter text-sm text-gray-400 hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="font-inter text-sm text-gray-400">
                            © {currentYear} Proep.az. {t.footer.copyright}
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-primary"></div>
                            <div className="w-6 h-6 bg-teal"></div>
                            <div className="w-6 h-6 bg-coral"></div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
