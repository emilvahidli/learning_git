import { Layout } from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Bot, Code, Cloud, Zap, BookOpen } from 'lucide-react';

export function Home() {
    const { t } = useLanguage();

    return (
        <Layout>
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-6 leading-tight">
                                {t.hero.title}
                            </h1>
                            <p className="font-inter text-lg text-gray-600 mb-8 leading-relaxed">
                                {t.hero.subtitle}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-inter font-semibold hover:bg-primary/90 transition-colors"
                                >
                                    {t.hero.cta}
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    to="/services"
                                    className="inline-flex items-center gap-2 border-2 border-gray-200 text-dark px-8 py-4 rounded-lg font-inter font-semibold hover:border-primary hover:text-primary transition-colors"
                                >
                                    {t.hero.secondary}
                                </Link>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="hidden lg:block"
                        >
                            <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-teal/20 rounded-3xl flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Code className="w-12 h-12 text-primary" />
                                    </div>
                                    <p className="font-poppins text-xl font-semibold text-dark">Enterprise Solutions</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Intro Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-gradient-to-br from-teal/10 to-primary/10 rounded-3xl p-12"
                        >
                            <div className="grid grid-cols-3 gap-6 text-center">
                                <div>
                                    <p className="font-poppins text-3xl font-bold text-primary">50+</p>
                                    <p className="font-inter text-sm text-gray-600">{t.intro.stats.projects.split(' ')[1]}</p>
                                </div>
                                <div>
                                    <p className="font-poppins text-3xl font-bold text-teal">30+</p>
                                    <p className="font-inter text-sm text-gray-600">{t.intro.stats.clients.split(' ')[1]}</p>
                                </div>
                                <div>
                                    <p className="font-poppins text-3xl font-bold text-coral">5+</p>
                                    <p className="font-inter text-sm text-gray-600">{t.intro.stats.years.split(' ')[1]}</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-dark mb-6">
                                {t.intro.title}
                            </h2>
                            <p className="font-inter text-gray-600 leading-relaxed">
                                {t.intro.description}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-poppins text-3xl md:text-4xl font-bold text-dark mb-4">
                            {t.services.title}
                        </h2>
                        <p className="font-inter text-gray-600 max-w-2xl mx-auto">
                            {t.services.subtitle}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[Bot, Code, Cloud, Zap].map((Icon, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all"
                            >
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                                    <Icon className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="font-poppins text-lg font-bold text-dark mb-3">
                                    {t.services.items[index].title}
                                </h3>
                                <p className="font-inter text-sm text-gray-600">
                                    {t.services.items[index].description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link
                            to="/services"
                            className="inline-flex items-center gap-2 text-primary font-inter font-semibold hover:gap-3 transition-all"
                        >
                            {t.hero.secondary}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-poppins text-3xl md:text-4xl font-bold text-dark mb-4">
                            {t.projects.title}
                        </h2>
                        <p className="font-inter text-gray-600 max-w-2xl mx-auto">
                            {t.projects.subtitle}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {t.projects.items.slice(0, 3).map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group"
                            >
                                <Link to="/portfolio" className="block">
                                    <div className="h-48 bg-gradient-to-br from-primary/10 to-teal/10 rounded-2xl mb-6 flex items-center justify-center group-hover:from-primary/20 group-hover:to-teal/20 transition-all">
                                        <Code className="w-16 h-16 text-primary/30 group-hover:text-primary/50 transition-colors" />
                                    </div>
                                    <h3 className="font-poppins text-xl font-bold text-dark mb-2">{project.title}</h3>
                                    <p className="font-inter text-gray-600 text-sm">{project.shortDesc}</p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link
                            to="/portfolio"
                            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-inter font-semibold hover:bg-primary/90 transition-colors"
                        >
                            {t.projects.viewAll}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Blog Section */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-poppins text-3xl md:text-4xl font-bold text-dark mb-4">
                            {t.blog.title}
                        </h2>
                        <p className="font-inter text-gray-600 max-w-2xl mx-auto">
                            {t.blog.subtitle}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {t.blog.items.map((post, index) => (
                            <motion.article
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                <div className="h-40 bg-gradient-to-br from-primary/10 to-coral/10 flex items-center justify-center">
                                    <BookOpen className="w-12 h-12 text-primary/30" />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-poppins text-lg font-bold text-dark mb-2">{post.title}</h3>
                                    <p className="font-inter text-sm text-gray-600 mb-4">{post.excerpt}</p>
                                    <Link
                                        to={`/blog/${index + 1}`}
                                        className="inline-flex items-center gap-1 text-primary font-inter text-sm font-medium hover:gap-2 transition-all"
                                    >
                                        {t.blog.readMore}
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-primary font-inter font-semibold hover:gap-3 transition-all"
                        >
                            {t.blog.viewAll}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Contact CTA Section */}
            <section className="py-20 px-6 bg-primary">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
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
                            {t.contact.form.send}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}
