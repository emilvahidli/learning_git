import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Head } from './components/Head';
import { FaviconUpdater } from './components/FaviconUpdater';
import { GoogleAnalytics } from './components/GoogleAnalytics';
import { StructuredData } from './components/StructuredData';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Blog } from './pages/Blog';
import { Portfolio } from './pages/Portfolio';
import { Contact } from './pages/Contact';
import { useEffect } from 'react';
import type { ReactNode } from 'react';

// Component to handle language from URL and update context
function LanguageRoute({ children }: { children: ReactNode }) {
  const { lang } = useParams<{ lang: string }>();
  const { setLanguage } = useLanguage();

  // Update language context when URL changes
  useEffect(() => {
    if (lang === 'az' || lang === 'en') {
      setLanguage(lang);
    }
  }, [lang, setLanguage]);

  return <>{children}</>;
}

// Wrapper component for pages with language routing
function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <GoogleAnalytics />
      <StructuredData />
      <FaviconUpdater />
      <Head />
      <Navigation />
      {children}
      <Footer />
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Redirect root to /home/az */}
      <Route path="/" element={<Navigate to="/home/az" replace />} />
      
      {/* Home routes */}
      <Route
        path="/home/:lang"
        element={
          <LanguageRoute>
            <PageWrapper>
              <Home />
            </PageWrapper>
          </LanguageRoute>
        }
      />
      
      {/* About routes */}
      <Route
        path="/about/:lang"
        element={
          <LanguageRoute>
            <PageWrapper>
              <About />
            </PageWrapper>
          </LanguageRoute>
        }
      />
      
      {/* Services routes */}
      <Route
        path="/services/:lang"
        element={
          <LanguageRoute>
            <PageWrapper>
              <Services />
            </PageWrapper>
          </LanguageRoute>
        }
      />
      
      {/* Blog routes */}
      <Route
        path="/blog/:lang"
        element={
          <LanguageRoute>
            <PageWrapper>
              <Blog />
            </PageWrapper>
          </LanguageRoute>
        }
      />
      
      {/* Portfolio routes */}
      <Route
        path="/portfolio/:lang"
        element={
          <LanguageRoute>
            <PageWrapper>
              <Portfolio />
            </PageWrapper>
          </LanguageRoute>
        }
      />
      
      {/* Contact routes */}
      <Route
        path="/contact/:lang"
        element={
          <LanguageRoute>
            <PageWrapper>
              <Contact />
            </PageWrapper>
          </LanguageRoute>
        }
      />
      
      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/home/az" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <div className="min-h-screen bg-black">
          <AppRoutes />
        </div>
      </LanguageProvider>
    </BrowserRouter>
  );
}
