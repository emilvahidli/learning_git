import { Layout } from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from 'lucide-react';
import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export function Contact() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch(`${API_URL}/api/appeal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                throw new Error(data.message || 'Submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setStatus('error');
            setErrorMessage(
                t.nav.home === 'Home'
                    ? 'Failed to send message. Please try again.'
                    : 'Mesaj göndərilmədi. Zəhmət olmasa yenidən cəhd edin.'
            );
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

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
                            {t.nav.contact.toUpperCase()}
                        </span>
                        <h1 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-6">
                            {t.contact.title}
                        </h1>
                        <p className="font-inter text-lg text-gray-600 max-w-3xl mx-auto">
                            {t.contact.subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Form & Info */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white border border-gray-200 rounded-2xl p-8"
                        >
                            {status === 'success' && (
                                <div className="mb-6 p-4 bg-teal/10 border border-teal rounded-lg">
                                    <p className="font-inter text-sm text-teal">
                                        {t.contact.success}
                                    </p>
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="font-inter text-sm text-red-600">
                                        {errorMessage || t.contact.error}
                                    </p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block font-inter text-sm font-medium text-dark mb-2">
                                        {t.contact.form.name} *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg font-inter focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        required
                                        disabled={status === 'loading'}
                                    />
                                </div>

                                <div>
                                    <label className="block font-inter text-sm font-medium text-dark mb-2">
                                        {t.contact.form.email} *
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg font-inter focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        required
                                        disabled={status === 'loading'}
                                    />
                                </div>

                                <div>
                                    <label className="block font-inter text-sm font-medium text-dark mb-2">
                                        {t.contact.form.phone}
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg font-inter focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        disabled={status === 'loading'}
                                    />
                                </div>

                                <div>
                                    <label className="block font-inter text-sm font-medium text-dark mb-2">
                                        {t.contact.form.message} *
                                    </label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={5}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg font-inter focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                        required
                                        disabled={status === 'loading'}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full bg-primary text-white px-6 py-4 rounded-lg font-inter font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            {t.nav.home === 'Home' ? 'Sending...' : 'Göndərilir...'}
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            {t.contact.form.send}
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="font-poppins text-2xl font-bold text-dark mb-6">
                                {t.contact.info.title}
                            </h2>

                            {[
                                { icon: MapPin, label: t.contact.info.address, value: t.contact.info.addressText },
                                { icon: Mail, label: t.contact.info.email, value: t.contact.info.emailText, href: 'mailto:info@proep.az' },
                                { icon: Phone, label: t.contact.info.phone, value: t.contact.info.phoneText, href: 'tel:+994502081108' },
                                { icon: Clock, label: t.contact.info.hours, value: t.contact.info.hoursText },
                            ].map((item, index) => (
                                <div key={index} className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <item.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-poppins font-semibold text-dark mb-1">{item.label}</h3>
                                        {item.href ? (
                                            <a href={item.href} className="font-inter text-primary hover:underline">
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="font-inter text-gray-600">{item.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
