-- ============================================
-- BLOG POSTS INSERT - 10 Maraqlı Xəbər
-- ============================================

-- Əvvəlcə author_id-ni tapın (admin_users table-ından)
-- Bu nümunədə author_id = 1 götürülüb, öz author_id-nizi istifadə edin

-- 1. AI Texnologiyaları və Gələcək
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

-- 2. Cloud Computing və Biznes
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

-- 3. E-commerce və Onlayn Satış
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

-- 4. Cybersecurity və Təhlükəsizlik
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

-- 5. Mobile App Development
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

-- 6. Digital Marketing
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

-- 7. Blockchain və Kriptovalyuta
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

-- 8. Data Analytics və Big Data
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

-- 9. Remote Work və Digital Nomad
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

-- 10. Web Development və Modern Frameworks
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

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
    RAISE NOTICE '✅ 10 blog post uğurla əlavə edildi!';
END $$;
