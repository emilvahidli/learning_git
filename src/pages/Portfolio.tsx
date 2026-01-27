import { Layout } from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import { Code, ExternalLink, CheckCircle } from 'lucide-react';

export function Portfolio() {
    const { t } = useLanguage();

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
                            {t.nav.portfolio.toUpperCase()}
                        </span>
                        <h1 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-6">
                            {t.projects.title}
                        </h1>
                        <p className="font-inter text-lg text-gray-600 max-w-3xl mx-auto">
                            {t.projects.subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Projects */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto space-y-12">
                    {t.projects.items.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                                {/* Visual */}
                                <div className="lg:col-span-2 bg-gradient-to-br from-primary/10 to-teal/10 p-12 flex items-center justify-center">
                                    <div className="text-center">
                                        <Code className="w-20 h-20 text-primary/40 mx-auto mb-4" />
                                        <p className="font-poppins text-xl font-bold text-dark">{project.title}</p>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="lg:col-span-3 p-8">
                                    <h2 className="font-poppins text-2xl font-bold text-dark mb-4">{project.title}</h2>
                                    <p className="font-inter text-gray-600 mb-6">{project.description}</p>

                                    {/* Technologies */}
                                    <div className="mb-6">
                                        <h4 className="font-poppins font-semibold text-dark mb-3">
                                            {t.nav.home === 'Home' ? 'Technologies' : 'Texnologiyalar'}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, i) => (
                                                <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-inter">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="mb-6">
                                        <h4 className="font-poppins font-semibold text-dark mb-3">
                                            {t.nav.home === 'Home' ? 'Key Features' : 'Əsas Xüsusiyyətlər'}
                                        </h4>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {project.features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-2">
                                                    <CheckCircle className="w-4 h-4 text-teal flex-shrink-0" />
                                                    <span className="font-inter text-sm text-gray-600">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-primary/90 transition-colors"
                                    >
                                        {t.projects.viewProject}
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </Layout>
    );
}
