import { Layout } from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Bot, Code, Cloud, Zap, Database, Shield, LineChart, Workflow, CheckCircle, ArrowRight } from 'lucide-react';

export function Services() {
    const { t } = useLanguage();

    const services = [
        { icon: Bot, color: 'primary' },
        { icon: Code, color: 'teal' },
        { icon: Cloud, color: 'coral' },
        { icon: Zap, color: 'primary' },
        { icon: Database, color: 'teal' },
        { icon: Shield, color: 'coral' },
        { icon: LineChart, color: 'primary' },
        { icon: Workflow, color: 'teal' },
    ];

    const features = [
        { en: 'Custom Development', az: 'Xüsusi Development' },
        { en: 'AI & Machine Learning', az: 'AI & Maşın Öyrənməsi' },
        { en: 'Cloud Infrastructure', az: 'Cloud İnfrastruktur' },
        { en: 'API Development', az: 'API Development' },
        { en: '24/7 Support', az: '24/7 Dəstək' },
        { en: 'Security First', az: 'Təhlükəsizlik Birinci' },
    ];

    return (
        <Layout>
            {/* Hero */}
            <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-inter text-sm font-medium rounded-full mb-6">
                            {t.nav.services.toUpperCase()}
                        </span>
                        <h1 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-6">
                            {t.services.title}
                        </h1>
                        <p className="font-inter text-lg text-gray-600 max-w-3xl mx-auto">
                            {t.services.subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.slice(0, 4).map((service, index) => {
                            const Icon = service.icon;
                            const item = t.services.items[index] || { title: 'Service', description: 'Description' };
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all"
                                >
                                    <div className={`w-14 h-14 bg-${service.color}/10 rounded-xl flex items-center justify-center mb-6`}>
                                        <Icon className={`w-7 h-7 text-${service.color}`} />
                                    </div>
                                    <h3 className="font-poppins text-xl font-bold text-dark mb-3">{item.title}</h3>
                                    <p className="font-inter text-gray-600">{item.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-dark mb-6">
                                {t.intro.title}
                            </h2>
                            <p className="font-inter text-gray-600 mb-8 leading-relaxed">
                                {t.intro.description}
                            </p>
                            <ul className="space-y-4">
                                {features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-teal flex-shrink-0" />
                                        <span className="font-inter text-dark">
                                            {t.nav.home === 'Home' ? feature.en : feature.az}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-primary/10 to-teal/10 rounded-3xl p-12 flex items-center justify-center"
                        >
                            <div className="text-center">
                                <Code className="w-24 h-24 text-primary/40 mx-auto mb-4" />
                                <p className="font-poppins text-2xl font-bold text-dark">Enterprise Grade</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 bg-primary">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-poppins text-3xl md:text-4xl font-bold text-white mb-6">
                        {t.contact.title}
                    </h2>
                    <p className="font-inter text-lg text-white/80 mb-8">
                        {t.contact.subtitle}
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 bg-white text-primary px-10 py-4 rounded-lg font-inter font-semibold hover:bg-gray-100 transition-colors"
                    >
                        {t.hero.cta}
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </Layout>
    );
}
