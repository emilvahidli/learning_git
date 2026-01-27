import { Layout } from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, ArrowRight, Calendar } from 'lucide-react';

export function Blog() {
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
                            {t.nav.blog.toUpperCase()}
                        </span>
                        <h1 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-6">
                            {t.blog.title}
                        </h1>
                        <p className="font-inter text-lg text-gray-600 max-w-3xl mx-auto">
                            {t.blog.subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Blog Posts */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {t.blog.items.map((post, index) => (
                            <motion.article
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all group"
                            >
                                {/* Image */}
                                <Link to={`/blog/${post.id}`} className="block h-48 bg-gradient-to-br from-primary/10 to-teal/10 flex items-center justify-center">
                                    <BookOpen className="w-16 h-16 text-primary/30 group-hover:text-primary/50 transition-colors" />
                                </Link>

                                {/* Content */}
                                <div className="p-6">
                                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-4">
                                        {post.category}
                                    </span>
                                    <Link to={`/blog/${post.id}`}>
                                        <h2 className="font-poppins text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h2>
                                    </Link>
                                    <p className="font-inter text-gray-600 text-sm mb-4">{post.excerpt}</p>
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar className="w-4 h-4" />
                                            <span className="font-inter">{post.date}</span>
                                        </div>
                                        <Link
                                            to={`/blog/${post.id}`}
                                            className="flex items-center gap-1 text-primary font-inter text-sm font-medium hover:gap-2 transition-all"
                                        >
                                            {t.blog.readMore}
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
