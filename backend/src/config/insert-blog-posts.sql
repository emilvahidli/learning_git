-- ============================================
-- BLOG POSTS INSERT - 10 Maraqlı Xəbər (AZ + EN)
-- ============================================

-- Əvvəlcə author_id-ni tapın (admin_users table-ından)
-- Bu nümunədə author_id = 1 götürülüb, öz author_id-nizi istifadə edin

-- ============================================
-- AZƏRBAYCAN DİLİNDƏ XƏBƏRLƏR
-- ============================================

-- 1. AI Texnologiyaları və Gələcək (AZ)
INSERT INTO admin_blog_posts (
    post_id, title, slug, short_description, content, 
    category, tags, status, language, views, likes,
    seo_title, seo_description, seo_keywords, published_at, author_id
) VALUES (
    '100001',
    'AI Texnologiyaları: Gələcəyin İnnovasiyası',
    'ai-texnologiyalari-gelceyin-innovasiyasi',
    'Süni intellekt texnologiyaları biznes dünyasını dəyişdirir. Bu məqalədə AI-nın müasir biznesə təsirini araşdırırıq.',
    'Süni intellekt (AI) texnologiyaları son illərdə sürətlə inkişaf edir və biznes dünyasında inqilabi dəyişikliklər yaradır. Machine Learning, Deep Learning və Neural Networks kimi texnologiyalar müxtəlif sahələrdə tətbiq olunur.

AI-nın əsas üstünlükləri:
- Avtomatlaşdırma və səmərəliliyin artırılması
- Dəqiq proqnozlar və qərar qəbulu
- Müştəri xidmətlərinin yaxşılaşdırılması
- Xərclərin azaldılması

Gələcəkdə AI texnologiyaları daha da genişlənəcək və biznes proseslərini tamamilə transformasiya edəcək.',
    'Texnologiya',
    ARRAY['AI', 'Süni İntellekt', 'Machine Learning', 'İnnovasiya'],
    'published',
    'az',
    0,
    0,
    'AI Texnologiyaları: Gələcəyin İnnovasiyası | Proep.az',
    'Süni intellekt texnologiyaları biznes dünyasını dəyişdirir. AI-nın müasir biznesə təsirini öyrənin.',
    'AI, süni intellekt, machine learning, innovasiya, texnologiya',
    CURRENT_TIMESTAMP,
    1
);

-- 1. AI Technologies and the Future (EN)
INSERT INTO admin_blog_posts (
    post_id, title, slug, short_description, content, 
    category, tags, status, language, views, likes,
    seo_title, seo_description, seo_keywords, published_at, author_id
) VALUES (
    '100011',
    'AI Technologies: The Innovation of the Future',
    'ai-technologies-innovation-of-the-future',
    'Artificial intelligence technologies are transforming the business world. In this article, we explore the impact of AI on modern business.',
    'Artificial Intelligence (AI) technologies have been rapidly developing in recent years and are creating revolutionary changes in the business world. Technologies such as Machine Learning, Deep Learning, and Neural Networks are being applied in various fields.

Key advantages of AI:
- Automation and increased efficiency
- Accurate predictions and decision-making
- Improved customer services
- Cost reduction

In the future, AI technologies will expand even further and completely transform business processes.',
    'Technology',
    ARRAY['AI', 'Artificial Intelligence', 'Machine Learning', 'Innovation'],
    'published',
    'en',
    0,
    0,
    'AI Technologies: The Innovation of the Future | Proep.az',
    'Artificial intelligence technologies are transforming the business world. Learn about the impact of AI on modern business.',
    'AI, artificial intelligence, machine learning, innovation, technology',
    CURRENT_TIMESTAMP,
    1
);

-- 2. Cloud Computing və Biznes (AZ)
INSERT INTO admin_blog_posts (
    post_id, title, slug, short_description, content, 
    category, tags, status, language, views, likes,
    seo_title, seo_description, seo_keywords, published_at, author_id
) VALUES (
    '100002',
    'Cloud Computing: Modern Biznesin Əsası',
    'cloud-computing-modern-biznesin-esasi',
    'Cloud computing müasir biznes üçün vacibdir. Bu məqalədə cloud həllərinin üstünlüklərini araşdırırıq.',
    'Cloud computing müasir biznes üçün vacib texnologiyadır. Bulud texnologiyaları şirkətlərə çeviklik, miqyaslanabilirlik və xərclərin azaldılması imkanı verir.

Cloud həllərinin əsas üstünlükləri:
- İnfrastruktur xərclərinin azaldılması
- Uzaqdan iş imkanı
- Avtomatik backup və disaster recovery
- Miqyaslanabilirlik

AWS, Azure, Google Cloud kimi platformalar müxtəlif biznes ehtiyaclarına cavab verir.',
    'Texnologiya',
    ARRAY['Cloud Computing', 'AWS', 'Azure', 'Biznes'],
    'published',
    'az',
    0,
    0,
    'Cloud Computing: Modern Biznesin Əsası | Proep.az',
    'Cloud computing müasir biznes üçün vacibdir. Bulud həllərinin üstünlüklərini öyrənin.',
    'cloud computing, AWS, Azure, bulud texnologiyaları, biznes',
    CURRENT_TIMESTAMP,
    1
);

-- 2. Cloud Computing and Business (EN)
INSERT INTO admin_blog_posts (
    post_id, title, slug, short_description, content, 
    category, tags, status, language, views, likes,
    seo_title, seo_description, seo_keywords, published_at, author_id
) VALUES (
    '100012',
    'Cloud Computing: The Foundation of Modern Business',
    'cloud-computing-foundation-of-modern-business',
    'Cloud computing is essential for modern business. In this article, we explore the advantages of cloud solutions.',
    'Cloud computing is an essential technology for modern business. Cloud technologies provide companies with flexibility, scalability, and cost reduction opportunities.

Key advantages of cloud solutions:
- Reduced infrastructure costs
- Remote work capabilities
- Automatic backup and disaster recovery
- Scalability

Platforms like AWS, Azure, and Google Cloud meet various business needs.',
    'Technology',
    ARRAY['Cloud Computing', 'AWS', 'Azure', 'Business'],
    'published',
    'en',
    0,
    0,
    'Cloud Computing: The Foundation of Modern Business | Proep.az',
    'Cloud computing is essential for modern business. Learn about the advantages of cloud solutions.',
    'cloud computing, AWS, Azure, cloud technologies, business',
    CURRENT_TIMESTAMP,
    1
);

-- 3. E-commerce və Onlayn Satış (AZ)
INSERT INTO admin_blog_posts (
    post_id, title, slug, short_description, content, 
    category, tags, status, language, views, likes,
    seo_title, seo_description, seo_keywords, published_at, author_id
) VALUES (
    '100003',
    'E-commerce Strategiyaları: Onlayn Satışın Artırılması',
    'e-commerce-strategiyalari-onlayn-satisin-artirilmasi',
    'E-commerce sahəsində uğur qazanmaq üçün düzgün strategiya lazımdır. Bu məqalədə effektiv strategiyaları araşdırırıq.',
    'E-commerce sahəsi sürətlə inkişaf edir və müştərilərin alış-veriş davranışları dəyişir. Uğurlu onlayn mağaza yaratmaq üçün düzgün strategiya lazımdır.

Uğurlu e-commerce strategiyasının əsas elementləri:
- İstifadəçi dostu dizayn
- Sürətli yüklənmə
- Təhlükəsiz ödəniş sistemləri
- SEO optimallaşdırma
- Sosial media marketinqi

Müştəri təcrübəsini yaxşılaşdırmaq satışları artırır.',
    'Biznes',
    ARRAY['E-commerce', 'Onlayn Satış', 'Marketinq', 'SEO'],
    'published',
    'az',
    0,
    0,
    'E-commerce Strategiyaları: Onlayn Satışın Artırılması | Proep.az',
    'E-commerce sahəsində uğur qazanmaq üçün effektiv strategiyalar. Onlayn satışı artırmaq üçün tövsiyələr.',
    'e-commerce, onlayn satış, marketinq, SEO, biznes',
    CURRENT_TIMESTAMP,
    1
);

-- 3. E-commerce Strategies: Increasing Online Sales (EN)
INSERT INTO admin_blog_posts (
    post_id, title, slug, short_description, content, 
    category, tags, status, language, views, likes,
    seo_title, seo_description, seo_keywords, published_at, author_id
) VALUES (
    '100013',
    'E-commerce Strategies: Increasing Online Sales',
    'e-commerce-strategies-increasing-online-sales',
    'A proper strategy is needed to succeed in e-commerce. In this article, we explore effective strategies.',
    'The e-commerce sector is rapidly developing and customer shopping behaviors are changing. A proper strategy is needed to create a successful online store.

Key elements of a successful e-commerce strategy:
- User-friendly design
- Fast loading
- Secure payment systems
- SEO optimization
- Social media marketing

Improving customer experience increases sales.',
    'Business',
    ARRAY['E-commerce', 'Online Sales', 'Marketing', 'SEO'],
    'published',
    'en',
    0,
    0,
    'E-commerce Strategies: Increasing Online Sales | Proep.az',
    'Effective strategies to succeed in e-commerce. Tips to increase online sales.',
    'e-commerce, online sales, marketing, SEO, business',
    CURRENT_TIMESTAMP,
    1
);

-- 4. Cybersecurity və Təhlükəsizlik (AZ)
INSERT INTO admin_blog_posts (
    post_id, title, slug, short_description, content, 
    category, tags, status, language, views, likes,
    seo_title, seo_description, seo_keywords, published_at, author_id
) VALUES (
    '100004',
    'Cybersecurity: Rəqəmsal Dünyada Təhlükəsizlik',
    'cybersecurity-reqemsal-dunyada-tehlukesizlik',
    'Cybersecurity müasir dünyada vacibdir. Bu məqalədə əsas təhlükəsizlik tədbirlərini araşdırırıq.',
    'Cybersecurity müasir rəqəmsal dünyada ən vacib məsələlərdən biridir. Kiber hücumlar artır və şirkətlər təhlükəsizlik tədbirləri görməlidir.

Əsas cybersecurity tədbirləri:
- Güclü parollar və iki faktorlu autentifikasiya
- Müntəzəm sistem yeniləmələri
- Firewall və antivirus proqramları
- İşçilərin təlimi
- Müntəzəm backup

Məlumatların qorunması həm qanuni, həm də etik məsuliyyətdir.',
    'Təhlükəsizlik',
    ARRAY['Cybersecurity', 'Təhlükəsizlik', 'Kiber Hücumlar', 'Məlumat Qorunması'],
    'published',
    'az',
    0,
    0,
    'Cybersecurity: Rəqəmsal Dünyada Təhlükəsizlik | Proep.az',
    'Cybersecurity müasir dünyada vacibdir. Kiber təhlükəsizlik tədbirlərini öyrənin.',
    'cybersecurity, təhlükəsizlik, kiber hücumlar, məlumat qorunması',
    CURRENT_TIMESTAMP,
    1
);

-- 4. Cybersecurity: Security in the Digital World (EN)
INSERT INTO admin_blog_posts (
    post_id, title, slug, short_description, content, 
    category, tags, status, language, views, likes,
    seo_title, seo_description, seo_keywords, published_at, author_id
) VALUES (
    '100014',
    'Cybersecurity: Security in the Digital World',
    'cybersecurity-security-in-the-digital-world',
    'Cybersecurity is essential in the modern world. In this article, we explore key security measures.',
    'Cybersecurity is one of the most important issues in the modern digital world. Cyber attacks are increasing and companies must take security measures.

Key cybersecurity measures:
- Strong passwords and two-factor authentication
- Regular system updates
- Firewall and antivirus programs
- Employee training
- Regular backups

Protecting data is both a legal and ethical responsibility.',
    'Security',
    ARRAY['Cybersecurity', 'Security', 'Cyber Attacks', 'Data Protection'],
    'published',
    'en',
    0,
    0,
    'Cybersecurity: Security in the Digital World | Proep.az',
    'Cybersecurity is essential in the modern world. Learn about cyber security measures.',
    'cybersecurity, security, cyber attacks, data protection',
    CURRENT_TIMESTAMP,
    1
);

-- 5. Mobile App Development (AZ)
INSERT INTO admin_blog_posts (
    post_id, title, slug, short_description, content, 
    category, tags, status, language, views, likes,
    seo_title, seo_description, seo_keywords, published_at, author_id
) VALUES (
    '100005',
    'Mobil Tətbiqlərin İnkişafı: 2026 Təndənsləri',
    'mobil-tetbiqlerin-inkisafi-2026-tendensleri',
    'Mobil tətbiqlər biznes üçün vacibdir. Bu məqalədə 2026-cı ilin əsas təndənslərini araşdırırıq.',
    'Mobil tətbiqlər müasir biznes üçün vacibdir. İstifadəçilər mobil cihazlardan daha çox istifadə edir və şirkətlər mobil strategiyaya diqqət yetirməlidir.

2026-cı ilin əsas təndənsləri:
- Cross-platform development (React Native, Flutter)
- Progressive Web Apps (PWA)
- AI inteqrasiyası
- Augmented Reality (AR)
- Micro-interactions

Mobil tətbiq dizaynı istifadəçi təcrübəsini prioritetləşdirməlidir.',
    'Texnologiya',
    ARRAY['Mobil Tətbiqlər', 'App Development', 'React Native', 'Flutter'],
    'published',
    'az',
    0,
    0,
    'Mobil Tətbiqlərin İnkişafı: 2026 Təndənsləri | Proep.az',
    'Mobil tətbiqlər biznes üçün vacibdir. 2026-cı ilin əsas təndənslərini öyrənin.',
    'mobil tətbiqlər, app development, React Native, Flutter, PWA',
    CURRENT_TIMESTAMP,
    1
);

-- 5. Mobile App Development: 2026 Trends (EN)
INSERT INTO admin_blog_posts (
    post_id, title, slug, short_description, content, 
    category, tags, status, language, views, likes,
    seo_title, seo_description, seo_keywords, published_at, author_id
) VALUES (
    '100015',
    'Mobile App Development: 2026 Trends',
    'mobile-app-development-2026-trends',
    'Mobile apps are essential for business. In this article, we explore the key trends of 2026.',
    'Mobile apps are essential for modern business. Users increasingly use mobile devices and companies must pay attention to mobile strategy.

Key trends of 2026:
- Cross-platform development (React Native, Flutter)
- Progressive Web Apps (PWA)
- AI integration
- Augmented Reality (AR)
- Micro-interactions

Mobile app design must prioritize user experience.',
    'Technology',
    ARRAY['Mobile Apps', 'App Development', 'React Native', 'Flutter'],
    'published',
    'en',
    0,
    0,
    'Mobile App Development: 2026 Trends | Proep.az',
    'Mobile apps are essential for business. Learn about the key trends of 2026.',
    'mobile apps, app development, React Native, Flutter, PWA',
    CURRENT_TIMESTAMP,
    1
);

-- 6. Digital Marketing (AZ)
INSERT INTO admin_blog_posts (
    post_id, title, slug, short_description, content, 
    category, tags, status, language, views, likes,
    seo_title, seo_description, seo_keywords, published_at, author_id
) VALUES (
    '100006',
    'Rəqəmsal Marketinq: Müştərilərə Çatma Yolları',
    'reqemsal-marketinq-musterilere-catma-yollari',
    'Rəqəmsal marketinq müasir biznes üçün vacibdir. Bu məqalədə effektiv marketinq strategiyalarını araşdırırıq.',
    'Rəqəmsal marketinq müasir biznes üçün vacibdir. İnternet və sosial media platformaları müştərilərə çatmaq üçün əsas kanallardır.

Effektiv rəqəmsal marketinq strategiyası:
- SEO və content marketing
- Sosial media marketinqi
- Email marketinqi
- Pay-per-click (PPC) reklamlar
- Influencer marketinqi

Müştəri segmentasiyası və personalizasiya marketinq effektivliyini artırır.',
    'Marketinq',
    ARRAY['Rəqəmsal Marketinq', 'SEO', 'Sosial Media', 'Content Marketing'],
    'published',
    'az',
    0,
    0,
    'Rəqəmsal Marketinq: Müştərilərə Çatma Yolları | Proep.az',
    'Rəqəmsal marketinq müasir biznes üçün vacibdir. Effektiv marketinq strategiyalarını öyrənin.',
    'rəqəmsal marketinq, SEO, sosial media, content marketing',
    CURRENT_TIMESTAMP,
    1
);

-- 6. Digital Marketing: Ways to Reach Customers (EN)
INSERT INTO admin_blog_posts (
    post_id, title, slug, short_description, content, 
    category, tags, status, language, views, likes,
    seo_title, seo_description, seo_keywords, published_at, author_id
) VALUES (
    '100016',
    'Digital Marketing: Ways to Reach Customers',
    'digital-marketing-ways-to-reach-customers',
    'Digital marketing is essential for modern business. In this article, we explore effective marketing strategies.',
    'Digital marketing is essential for modern business. The internet and social media platforms are the main channels to reach customers.

Effective digital marketing strategy:
- SEO and content marketing
- Social media marketing
- Email marketing
- Pay-per-click (PPC) advertising
- Influencer marketing

Customer segmentation and personalization increase marketing effectiveness.',
    'Marketing',
    ARRAY['Digital Marketing', 'SEO', 'Social Media', 'Content Marketing'],
    'published',
    'en',
    0,
    0,
    'Digital Marketing: Ways to Reach Customers | Proep.az',
    'Digital marketing is essential for modern business. Learn about effective marketing strategies.',
    'digital marketing, SEO, social media, content marketing',
    CURRENT_TIMESTAMP,
    1
);

-- 7. Blockchain və Kriptovalyuta (AZ)
INSERT INTO admin_blog_posts (
    post_id, title, slug, short_description, content, 
    category, tags, status, language, views, likes,
    seo_title, seo_description, seo_keywords, published_at, author_id
) VALUES (
    '100007',
    'Blockchain Texnologiyası: Gələcəyin İnnovasiyası',
    'blockchain-texnologiyasi-gelceyin-innovasiyasi',
    'Blockchain texnologiyası müxtəlif sahələrdə tətbiq olunur. Bu məqalədə blockchain-in imkanlarını araşdırırıq.',
    'Blockchain texnologiyası son illərdə böyük diqqət çəkir. Bu texnologiya maliyyə, təchizat zənciri və digər sahələrdə inqilabi dəyişikliklər yaradır.

Blockchain-in əsas xüsusiyyətləri:
- Şəffaflıq və dəyişməzlik
- Mərkəzləşdirilməmiş struktura
- Təhlükəsizlik
- Smart contracts

Kriptovalyuta və DeFi (Decentralized Finance) blockchain-in ən məşhur tətbiqləridir.',
    'Texnologiya',
    ARRAY['Blockchain', 'Kriptovalyuta', 'DeFi', 'Smart Contracts'],
    'published',
    'az',
    0,
    0,
    'Blockchain Texnologiyası: Gələcəyin İnnovasiyası | Proep.az',
    'Blockchain texnologiyası müxtəlif sahələrdə tətbiq olunur. Blockchain-in imkanlarını öyrənin.',
    'blockchain, kriptovalyuta, DeFi, smart contracts, innovasiya',
    CURRENT_TIMESTAMP,
    1
);

-- 7. Blockchain Technology: Innovation of the Future (EN)
INSERT INTO admin_blog_posts (
    post_id, title, slug, short_description, content, 
    category, tags, status, language, views, likes,
    seo_title, seo_description, seo_keywords, published_at, author_id
) VALUES (
    '100017',
    'Blockchain Technology: Innovation of the Future',
    'blockchain-technology-innovation-of-the-future',
    'Blockchain technology is being applied in various fields. In this article, we explore the possibilities of blockchain.',
    'Blockchain technology has attracted great attention in recent years. This technology creates revolutionary changes in finance, supply chain, and other fields.

Key features of blockchain:
- Transparency and immutability
- Decentralized structure
- Security
- Smart contracts

Cryptocurrency and DeFi (Decentralized Finance) are the most popular applications of blockchain.',
    'Technology',
    ARRAY['Blockchain', 'Cryptocurrency', 'DeFi', 'Smart Contracts'],
    'published',
    'en',
    0,
    0,
    'Blockchain Technology: Innovation of the Future | Proep.az',
    'Blockchain technology is being applied in various fields. Learn about the possibilities of blockchain.',
    'blockchain, cryptocurrency, DeFi, smart contracts, innovation',
    CURRENT_TIMESTAMP,
    1
);

-- 8. Data Analytics və Big Data (AZ)
INSERT INTO admin_blog_posts (
    post_id, title, slug, short_description, content, 
    category, tags, status, language, views, likes,
    seo_title, seo_description, seo_keywords, published_at, author_id
) VALUES (
    '100008',
    'Big Data və Data Analytics: Məlumatdan Dəyər Yaratmaq',
    'big-data-ve-data-analytics-melumatdan-deyer-yaratmaq',
    'Big Data müasir biznes üçün vacibdir. Bu məqalədə data analytics-in imkanlarını araşdırırıq.',
    'Big Data və Data Analytics müasir biznes üçün vacibdir. Böyük həcmdə məlumatları analiz etmək daha yaxşı qərar qəbul etməyə kömək edir.

Data Analytics-in əsas üstünlükləri:
- Müştəri davranışının anlaşılması
- Market təndənslərinin proqnozlaşdırılması
- Əməliyyat səmərəliliyinin artırılması
- Risk idarəetməsi

Machine Learning və AI data analytics-də mühüm rol oynayır.',
    'Analitika',
    ARRAY['Big Data', 'Data Analytics', 'Machine Learning', 'Business Intelligence'],
    'published',
    'az',
    0,
    0,
    'Big Data və Data Analytics: Məlumatdan Dəyər Yaratmaq | Proep.az',
    'Big Data müasir biznes üçün vacibdir. Data analytics-in imkanlarını öyrənin.',
    'big data, data analytics, machine learning, business intelligence',
    CURRENT_TIMESTAMP,
    1
);

-- 8. Big Data and Data Analytics: Creating Value from Data (EN)
INSERT INTO admin_blog_posts (
    post_id, title, slug, short_description, content, 
    category, tags, status, language, views, likes,
    seo_title, seo_description, seo_keywords, published_at, author_id
) VALUES (
    '100018',
    'Big Data and Data Analytics: Creating Value from Data',
    'big-data-and-data-analytics-creating-value-from-data',
    'Big Data is essential for modern business. In this article, we explore the possibilities of data analytics.',
    'Big Data and Data Analytics are essential for modern business. Analyzing large volumes of data helps make better decisions.

Key advantages of Data Analytics:
- Understanding customer behavior
- Forecasting market trends
- Increasing operational efficiency
- Risk management

Machine Learning and AI play an important role in data analytics.',
    'Analytics',
    ARRAY['Big Data', 'Data Analytics', 'Machine Learning', 'Business Intelligence'],
    'published',
    'en',
    0,
    0,
    'Big Data and Data Analytics: Creating Value from Data | Proep.az',
    'Big Data is essential for modern business. Learn about the possibilities of data analytics.',
    'big data, data analytics, machine learning, business intelligence',
    CURRENT_TIMESTAMP,
    1
);

-- 9. Remote Work və Digital Nomad (AZ)
INSERT INTO admin_blog_posts (
    post_id, title, slug, short_description, content, 
    category, tags, status, language, views, likes,
    seo_title, seo_description, seo_keywords, published_at, author_id
) VALUES (
    '100009',
    'Remote Work: Gələcəyin İş Modeli',
    'remote-work-gelceyin-is-modeli',
    'Remote work müasir dünyada populyardır. Bu məqalədə uzaqdan işin üstünlüklərini araşdırırıq.',
    'Remote work son illərdə populyarlıq qazanır. Pandemiya dövründən sonra bir çox şirkət uzaqdan iş modelinə keçib.

Remote work-in əsas üstünlükləri:
- İş-həyat balansı
- Xərclərin azaldılması
- Talent pool-un genişləndirilməsi
- Məhsuldarlığın artırılması

Uğurlu remote work üçün düzgün texnologiya və kommunikasiya vacibdir.',
    'Biznes',
    ARRAY['Remote Work', 'Uzaqdan İş', 'Digital Nomad', 'İş Modeli'],
    'published',
    'az',
    0,
    0,
    'Remote Work: Gələcəyin İş Modeli | Proep.az',
    'Remote work müasir dünyada populyardır. Uzaqdan işin üstünlüklərini öyrənin.',
    'remote work, uzaqdan iş, digital nomad, iş modeli',
    CURRENT_TIMESTAMP,
    1
);

-- 9. Remote Work: The Work Model of the Future (EN)
INSERT INTO admin_blog_posts (
    post_id, title, slug, short_description, content, 
    category, tags, status, language, views, likes,
    seo_title, seo_description, seo_keywords, published_at, author_id
) VALUES (
    '100019',
    'Remote Work: The Work Model of the Future',
    'remote-work-the-work-model-of-the-future',
    'Remote work is popular in the modern world. In this article, we explore the advantages of remote work.',
    'Remote work has gained popularity in recent years. After the pandemic period, many companies have switched to remote work models.

Key advantages of remote work:
- Work-life balance
- Cost reduction
- Expanding talent pool
- Increased productivity

Proper technology and communication are essential for successful remote work.',
    'Business',
    ARRAY['Remote Work', 'Remote Job', 'Digital Nomad', 'Work Model'],
    'published',
    'en',
    0,
    0,
    'Remote Work: The Work Model of the Future | Proep.az',
    'Remote work is popular in the modern world. Learn about the advantages of remote work.',
    'remote work, remote job, digital nomad, work model',
    CURRENT_TIMESTAMP,
    1
);

-- 10. Web Development və Modern Frameworks (AZ)
INSERT INTO admin_blog_posts (
    post_id, title, slug, short_description, content, 
    category, tags, status, language, views, likes,
    seo_title, seo_description, seo_keywords, published_at, author_id
) VALUES (
    '100010',
    'Modern Web Development: 2026 Texnologiyaları',
    'modern-web-development-2026-texnologiyalari',
    'Web development sürətlə inkişaf edir. Bu məqalədə 2026-cı ilin əsas texnologiyalarını araşdırırıq.',
    'Web development sahəsi sürətlə inkişaf edir. Yeni framework-lər və texnologiyalar developer-lərə daha çox imkan verir.

2026-cı ilin əsas texnologiyaları:
- React 19 və Next.js 15
- Vue.js 3 və Nuxt.js
- SvelteKit
- TypeScript
- Serverless architecture

Modern web development performans, SEO və istifadəçi təcrübəsinə diqqət yetirir.',
    'Texnologiya',
    ARRAY['Web Development', 'React', 'Vue.js', 'TypeScript', 'Next.js'],
    'published',
    'az',
    0,
    0,
    'Modern Web Development: 2026 Texnologiyaları | Proep.az',
    'Web development sürətlə inkişaf edir. 2026-cı ilin əsas texnologiyalarını öyrənin.',
    'web development, React, Vue.js, TypeScript, Next.js, modern frameworks',
    CURRENT_TIMESTAMP,
    1
);

-- 10. Modern Web Development: 2026 Technologies (EN)
INSERT INTO admin_blog_posts (
    post_id, title, slug, short_description, content, 
    category, tags, status, language, views, likes,
    seo_title, seo_description, seo_keywords, published_at, author_id
) VALUES (
    '100020',
    'Modern Web Development: 2026 Technologies',
    'modern-web-development-2026-technologies',
    'Web development is rapidly evolving. In this article, we explore the key technologies of 2026.',
    'The web development field is rapidly evolving. New frameworks and technologies provide developers with more opportunities.

Key technologies of 2026:
- React 19 and Next.js 15
- Vue.js 3 and Nuxt.js
- SvelteKit
- TypeScript
- Serverless architecture

Modern web development focuses on performance, SEO, and user experience.',
    'Technology',
    ARRAY['Web Development', 'React', 'Vue.js', 'TypeScript', 'Next.js'],
    'published',
    'en',
    0,
    0,
    'Modern Web Development: 2026 Technologies | Proep.az',
    'Web development is rapidly evolving. Learn about the key technologies of 2026.',
    'web development, React, Vue.js, TypeScript, Next.js, modern frameworks',
    CURRENT_TIMESTAMP,
    1
);

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
    RAISE NOTICE '✅ 20 blog post uğurla əlavə edildi! (10 AZ + 10 EN)';
END $$;
