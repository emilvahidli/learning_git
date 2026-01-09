import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const content = {
    az: {
      title: 'Əlaqə',
      subtitle: 'Layihəniz haqqında danışaq və birgə gələcək quaq',
      form: {
        name: 'Ad Soyad',
        email: 'E-poçt',
        company: 'Şirkət',
        subject: 'Mövzu',
        message: 'Mesaj',
        send: 'Göndər',
        namePlaceholder: 'Adınızı daxil edin',
        emailPlaceholder: 'E-poçt ünvanınızı daxil edin',
        companyPlaceholder: 'Şirkət adını daxil edin',
        subjectPlaceholder: 'Mövzunu daxil edin',
        messagePlaceholder: 'Mesajınızı yazın...',
      },
      info: {
        title: 'Əlaqə Məlumatları',
        address: 'Ünvan',
        addressText: 'Bakı şəhəri, Nizami küç. 203B',
        email: 'E-poçt',
        emailText: 'hello@proep.az',
        phone: 'Telefon',
        phoneText: '+994 50 123 45 67',
        hours: 'İş saatları',
        hoursText: 'B.e – Cümə | 09:00 – 18:00',
      },
      success: 'Mesajınız uğurla göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.',
    },
    en: {
      title: 'Contact',
      subtitle: 'Let\'s talk about your project and build the future together',
      form: {
        name: 'Full Name',
        email: 'Email',
        company: 'Company',
        subject: 'Subject',
        message: 'Message',
        send: 'Send',
        namePlaceholder: 'Enter your name',
        emailPlaceholder: 'Enter your email address',
        companyPlaceholder: 'Enter company name',
        subjectPlaceholder: 'Enter subject',
        messagePlaceholder: 'Write your message...',
      },
      info: {
        title: 'Contact Information',
        address: 'Address',
        addressText: 'Baku, Nizami Street 203B',
        email: 'Email',
        emailText: 'hello@proep.az',
        phone: 'Phone',
        phoneText: '+994 50 123 45 67',
        hours: 'Working Hours',
        hoursText: 'Mon – Fri | 09:00 – 18:00',
      },
      success: 'Your message has been sent successfully! We will contact you soon.',
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', company: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24">
      {/* Header */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light mb-6">{content[language].title}</h1>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">{content[language].subtitle}</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">
                {language === 'az' ? 'Mesaj Göndərin' : 'Send a Message'}
              </h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300">
                  {content[language].success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {content[language].form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={content[language].form.namePlaceholder}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {content[language].form.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={content[language].form.emailPlaceholder}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    {content[language].form.company}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={content[language].form.companyPlaceholder}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    {content[language].form.subject}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={content[language].form.subjectPlaceholder}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {content[language].form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={content[language].form.messagePlaceholder}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg transition-colors"
                >
                  {content[language].form.send}
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-8">{content[language].info.title}</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{content[language].info.address}</h3>
                    <p className="text-gray-400">{content[language].info.addressText}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{content[language].info.email}</h3>
                    <a href="mailto:info@proep.az" className="text-gray-400 hover:text-purple-400 transition-colors">
                      {content[language].info.emailText}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{content[language].info.phone}</h3>
                    <a href="tel:+994XXXXXXXXX" className="text-gray-400 hover:text-purple-400 transition-colors">
                      {content[language].info.phoneText}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{content[language].info.hours}</h3>
                    <p className="text-gray-400">{content[language].info.hoursText}</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 h-64 bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-2xl border border-white/10 flex items-center justify-center">
                <p className="text-gray-400">
                  {language === 'az' ? 'Xəritə' : 'Map'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}