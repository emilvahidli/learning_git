import { Layout } from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';

export function BlogDetail() {
    const { t } = useLanguage();
    const { id } = useParams<{ id: string }>();

    const articleIndex = parseInt(id || '1') - 1;
    const article = t.blog.items[articleIndex];

    if (!article) {
        return (
            <Layout>
                <section className="pt-32 pb-20 px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="font-poppins text-4xl font-bold text-dark mb-4">
                            {t.nav.home === 'Home' ? 'Article Not Found' : 'Məqalə Tapılmadı'}
                        </h1>
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-primary font-inter font-medium"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            {t.blog.backToBlog}
                        </Link>
                    </div>
                </section>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Article Header */}
            <section className="pt-32 pb-12 px-6 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-primary font-inter font-medium mb-8 hover:gap-3 transition-all"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            {t.blog.backToBlog}
                        </Link>

                        <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-inter text-sm font-medium rounded-full mb-6">
                            {article.category}
                        </span>

                        <h1 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-6 leading-tight">
                            {article.title}
                        </h1>

                        <div className="flex items-center gap-6 text-gray-500 font-inter text-sm">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{article.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Tag className="w-4 h-4" />
                                <span>{article.category}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Article Content */}
            <section className="py-12 px-6">
                <div className="max-w-3xl mx-auto">
                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="prose prose-lg max-w-none"
                    >
                        {article.content.split('\n\n').map((paragraph, index) => (
                            <p key={index} className="font-inter text-gray-700 leading-relaxed mb-6">
                                {paragraph}
                            </p>
                        ))}
                    </motion.article>

                    {/* Related Articles */}
                    <div className="mt-16 pt-12 border-t border-gray-200">
                        <h3 className="font-poppins text-2xl font-bold text-dark mb-8">
                            {t.nav.home === 'Home' ? 'Other Articles' : 'Digər Məqalələr'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {t.blog.items
                                .filter((_, i) => i !== articleIndex)
                                .slice(0, 2)
                                .map((post, index) => (
                                    <Link
                                        key={index}
                                        to={`/blog/${post.id}`}
                                        className="block p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                    >
                                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
                                            {post.category}
                                        </span>
                                        <h4 className="font-poppins font-bold text-dark mb-2">{post.title}</h4>
                                        <p className="font-inter text-sm text-gray-600">{post.excerpt}</p>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
