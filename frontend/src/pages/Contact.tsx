import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Phone, MapPin, Send, Clock, AlertCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { api } from '../config/api';
import React from 'react';

export function Contact() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    appeal: 1, // Default appeal type (1-9, Web saytın yaradılması)
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const content = {
    az: {
      title: 'Əlaqə',
      subtitle: 'Layihəniz haqqında danışaq və birgə gələcək quaq',
      form: {
        name: 'Ad',
        email: 'E-poçt',
        phone: 'Telefon',
        appeal: 'Müraciət Növü',
        message: 'Mesaj',
        send: 'Göndər',
        sending: 'Göndərilir...',
        namePlaceholder: 'Adınızı daxil edin (maksimum 30 simvol)',
        emailPlaceholder: 'E-poçt ünvanınızı daxil edin',
        phonePlaceholder: 'XX XXX XX XX',
        messagePlaceholder: 'Mesajınızı yazın... (maksimum 2000 simvol)',
        appealOptions: [
          { value: 1, label: 'Web saytın yaradılması' },
          { value: 2, label: 'AI Konsaltinq və Strategiya' },
          { value: 3, label: 'Backend Development və API Həlləri' },
          { value: 4, label: 'AI Model İnteqrasiyası' },
          { value: 5, label: 'Avtomatlaşdırma Sistemləri' },
          { value: 6, label: 'Data Analitika və Machine Learning' },
          { value: 7, label: 'Mövcud Sistemin Təkmilləşdirilməsi' },
          { value: 8, label: 'Texniki Dəstək və Konsaltinq' },
          { value: 9, label: 'Digər' },
        ],
      },
      info: {
        title: 'Əlaqə Məlumatları',
        address: 'Ünvan',
        addressText: 'Caspian Plaza, Cəfər Cabbarlı, Bakı, Yasamal, AZ1065',
        email: 'E-poçt',
        emailText: 'info@proep.az',
        phone: 'Telefon',
        phoneText: '+994 50 208 11 08',
        hours: 'İş saatları',
        hoursText: 'B.e – Cümə | 09:00 – 18:00',
      },
      success: 'Mesajınız uğurla göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.',
      error: 'Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.',
      errorNetwork: 'Şəbəkə xətası. İnternet bağlantınızı yoxlayın.',
      errorValidation: 'Xahiş edirik bütün sahələri düzgün doldurun.',
    },
    en: {
      title: 'Contact',
      subtitle: 'Let\'s talk about your project and build the future together',
      form: {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        appeal: 'Appeal Type',
        message: 'Message',
        send: 'Send',
        sending: 'Sending...',
        namePlaceholder: 'Enter your name (max 30 characters)',
        emailPlaceholder: 'Enter your email address',
        phonePlaceholder: 'XX XXX XX XX',
        messagePlaceholder: 'Write your message... (max 2000 characters)',
        appealOptions: [
          { value: 1, label: 'Website Development' },
          { value: 2, label: 'AI Consulting & Strategy' },
          { value: 3, label: 'Backend Development & API Solutions' },
          { value: 4, label: 'AI Model Integration' },
          { value: 5, label: 'Automation Systems' },
          { value: 6, label: 'Data Analytics & Machine Learning' },
          { value: 7, label: 'Existing System Enhancement' },
          { value: 8, label: 'Technical Support & Consulting' },
          { value: 9, label: 'Other' },
        ],
      },
      info: {
        title: 'Contact Information',
        address: 'Address',
        addressText: 'Caspian Plaza, Jafar Jabbarli, Baku, Yasamal, AZ1065',
        email: 'Email',
        emailText: 'info@proep.az',
        phone: 'Phone',
        phoneText: '+994 50 208 11 08',
        hours: 'Working Hours',
        hoursText: 'Mon – Fri | 09:00 – 18:00',
      },
      success: 'Your message has been sent successfully! We will contact you soon.',
      error: 'An error occurred. Please try again.',
      errorNetwork: 'Network error. Please check your internet connection.',
      errorValidation: 'Please fill all fields correctly.',
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    
    // Prevent double submission
    if (loading || submitted) {
      return;
    }
    
    setError(null);
    setLoading(true);

    try {
      // Validate form data
      if (!formData.name.trim() || !formData.email.trim() || !formData.phone_number.trim() || !formData.message.trim()) {
        setError(content[language].errorValidation);
        setLoading(false);
        return;
      }

      // Validate name length
      if (formData.name.length > 30) {
        setError(language === 'az' ? 'Ad maksimum 30 simvol ola bilər.' : 'Name must be maximum 30 characters.');
        setLoading(false);
        return;
      }

      // Validate message length
      if (formData.message.length > 2000) {
        setError(language === 'az' ? 'Mesaj maksimum 2000 simvol ola bilər.' : 'Message must be maximum 2000 characters.');
        setLoading(false);
        return;
      }

      // Prepare phone number with +994 prefix if not already present
      let phoneNumber = formData.phone_number.trim();
      if (!phoneNumber.startsWith('+994')) {
        // Remove any existing +994 and spaces, then add +994
        phoneNumber = phoneNumber.replace(/^\+994\s*/, '').replace(/\s+/g, '');
        phoneNumber = `+994${phoneNumber}`;
      }

      // Prepare request data according to backend API
      const requestData = {
        mail: formData.email,
        phone_number: phoneNumber, // With +994 prefix
        appeal: formData.appeal, // Integer 1-9
        name: formData.name,
        message: formData.message,
      };

      // Send request to backend API
      const response = await fetch(api.appeal, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || content[language].error);
      }

      const result = await response.json();

      if (result.success) {
        // Success
        setSubmitted(true);
        setFormData({ name: '', email: '', phone_number: '', appeal: 1, message: '' });
        setError(null);
        
        // Scroll to top to show success message
        if (formRef.current) {
          formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        throw new Error(result.message || content[language].error);
      }
    } catch (err: any) {
      console.error('Error submitting form:', err);
      if (err.message === 'Failed to fetch' || err.message.includes('network')) {
        setError(content[language].errorNetwork);
      } else {
        setError(err.message || content[language].error);
      }
      
      // Scroll to top to show error message
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Remove +994 if user tries to type it manually (we'll add it automatically)
    value = value.replace(/^\+994\s*/, '');
    // Remove any non-digit characters except spaces
    value = value.replace(/[^\d\s]/g, '');
    // Limit to 9 digits (Azerbaijan phone format: XX XXX XX XX)
    const digits = value.replace(/\s/g, '');
    if (digits.length <= 9) {
      setFormData({
        ...formData,
        phone_number: value,
      });
    }
  };

  // Scroll to top when error or success message appears
  useEffect(() => {
    if ((submitted || error) && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [submitted, error]);

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
            <div ref={formRef} className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">
                {language === 'az' ? 'Mesaj Göndərin' : 'Send a Message'}
              </h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {content[language].success}
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>{error}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {content[language].form.name}:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={content[language].form.namePlaceholder}
                    required
                    maxLength={30}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 transition-colors text-white"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.name.length}/30 {language === 'az' ? 'simvol' : 'characters'}
                  </p>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {content[language].form.email}:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={content[language].form.emailPlaceholder}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 transition-colors text-white"
                  />
                </div>

                <div>
                  <label htmlFor="phone_number" className="block text-sm font-medium mb-2">
                    {content[language].form.phone}:
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      +994
                    </div>
                    <input
                      type="tel"
                      id="phone_number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handlePhoneChange}
                      placeholder={content[language].form.phonePlaceholder}
                      required
                      maxLength={12}
                      className="w-full pl-16 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 transition-colors text-white"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    +994 {formData.phone_number || 'XX XXX XX XX'}
                  </p>
                </div>

                <div>
                  <label htmlFor="appeal" className="block text-sm font-medium mb-2">
                    {content[language].form.appeal}:
                  </label>
                  <select
                    id="appeal"
                    name="appeal"
                    value={formData.appeal}
                    onChange={(e) => setFormData({ ...formData, appeal: parseInt(e.target.value) })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 transition-colors text-white appearance-none cursor-pointer"
                  >
                    {content[language].form.appealOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-gray-900 text-white">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {content[language].form.message}:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={content[language].form.messagePlaceholder}
                    required
                    maxLength={2000}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 transition-colors resize-none text-white"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.message.length}/2000 {language === 'az' ? 'simvol' : 'characters'}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || submitted}
                  className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg transition-colors"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {content[language].form.sending}
                    </>
                  ) : (
                    <>
                      {content[language].form.send}
                      <Send className="w-5 h-5" />
                    </>
                  )}
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
                    <a href="tel:+994502081108" className="text-gray-400 hover:text-purple-400 transition-colors">
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

              {/* Google Map */}
              <div className="mt-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.1607988851597!2d49.84669431534934!3d40.38199897936631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d9a4e3e1111%3A0x7f6e7b9e9e9e9e9e!2sCaspian%20Plaza!5e0!3m2!1sen!2saz!4v1641234567890!5m2!1sen!2saz"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl border border-white/10"
                  title={language === 'az' ? 'Proep Ofis Xəritəsi' : 'Proep Office Map'}
                ></iframe>
                <a
                  href="https://maps.app.goo.gl/Hhjwf6R7wFRfdtjW8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  {language === 'az' ? 'Google Maps-də Aç' : 'Open in Google Maps'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
