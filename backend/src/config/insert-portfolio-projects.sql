-- ============================================
-- PORTFOLIO PROJECTS INSERT - 6 Layihə
-- Hər layihə üçün həm AZ həm də EN məlumatlar eyni record-da
-- ============================================

-- Əvvəlcə created_by-ni tapın (admin_users table-ından)
-- Bu nümunədə created_by = 1 götürülüb, öz admin user ID-nizi istifadə edin

-- ============================================
-- 1. GOSPORT.AZ
-- ============================================
INSERT INTO admin_portfolio_projects (
    title_az, title_en, slug, 
    short_description_az, short_description_en,
    detailed_description_az, detailed_description_en,
    project_url, status, technologies, features_az, features_en,
    seo_title_az, seo_title_en, seo_description_az, seo_description_en,
    published_at, created_by
) VALUES (
    'GoSport.az - İdman Platforması',
    'GoSport.az - Sports Platform',
    'gosport-az-idman-platformasi',
    'GoSport.az idman həvəskarları üçün müasir onlayn platformadır. İdman hadisələri, xəbərlər və interaktiv funksiyalar.',
    'GoSport.az is a modern online platform for sports enthusiasts. Sports events, news, and interactive features.',
    'GoSport.az idman həvəskarları üçün yaradılmış müasir onlayn platformadır. Platforma idman hadisələri, canlı nəticələr, xəbərlər və analitika təqdim edir. İstifadəçilər müxtəlif idman növləri haqqında məlumat əldə edə, hadisələri izləyə və interaktiv funksiyalardan istifadə edə bilər.',
    'GoSport.az is a modern online platform created for sports enthusiasts. The platform provides sports events, live results, news, and analytics. Users can get information about various sports, follow events, and use interactive features.',
    'https://gosport.az/az/',
    'published',
    ARRAY['React', 'Node.js', 'PostgreSQL', 'Redis', 'WebSocket'],
    ARRAY[
        'Responsive dizayn - bütün cihazlarda mükəmməl görünüş',
        'Canlı nəticələr - real-time idman hadisələri',
        'İnteraktiv xəritələr və statistikalar',
        'İstifadəçi profilləri və sosial funksiyalar',
        'SEO optimallaşdırılmış struktur'
    ],
    ARRAY[
        'Responsive design - perfect appearance on all devices',
        'Live results - real-time sports events',
        'Interactive maps and statistics',
        'User profiles and social features',
        'SEO optimized structure'
    ],
    'GoSport.az - İdman Platforması | Proep Portfolio',
    'GoSport.az - Sports Platform | Proep Portfolio',
    'GoSport.az idman həvəskarları üçün müasir onlayn platforma. İdman hadisələri, canlı nəticələr və xəbərlər.',
    'GoSport.az is a modern online platform for sports enthusiasts. Sports events, live results, and news.',
    CURRENT_TIMESTAMP,
    1
);

-- ============================================
-- 2. COURIR.AZ
-- ============================================
INSERT INTO admin_portfolio_projects (
    title_az, title_en, slug, 
    short_description_az, short_description_en,
    detailed_description_az, detailed_description_en,
    project_url, status, technologies, features_az, features_en,
    seo_title_az, seo_title_en, seo_description_az, seo_description_en,
    published_at, created_by
) VALUES (
    'Courir.az - İdman və Atletika Portalı',
    'Courir.az - Sports and Athletics Portal',
    'courir-az-idman-ve-atletika-portali',
    'Courir.az idman və atletika üzrə məlumat portalıdır. Qaçış, atletika və idman tədbirləri haqqında məlumat.',
    'Courir.az is an information portal for sports and athletics. Information about running, athletics, and sports events.',
    'Courir.az idman və atletika sahəsində məlumat portalıdır. Platforma qaçış, atletika yarışları, idman tədbirləri və təlim proqramları haqqında məlumat təqdim edir. İstifadəçilər yarış nəticələrini, təqvimləri və idmançı profillərini görə bilər.',
    'Courir.az is an information portal in the field of sports and athletics. The platform provides information about running, athletics competitions, sports events, and training programs. Users can view competition results, calendars, and athlete profiles.',
    'https://courir.az/az/',
    'published',
    ARRAY['Vue.js', 'Node.js', 'MongoDB', 'Express', 'REST API'],
    ARRAY[
        'Yarış nəticələri və statistikalar',
        'İdman təqvimi və tədbirlər',
        'İdmançı profilləri və performans məlumatları',
        'Təlim proqramları və tövsiyələr',
        'Mobil uyğun dizayn'
    ],
    ARRAY[
        'Competition results and statistics',
        'Sports calendar and events',
        'Athlete profiles and performance data',
        'Training programs and recommendations',
        'Mobile-friendly design'
    ],
    'Courir.az - İdman və Atletika Portalı | Proep Portfolio',
    'Courir.az - Sports and Athletics Portal | Proep Portfolio',
    'Courir.az idman və atletika üzrə məlumat portalı. Qaçış, atletika yarışları və idman tədbirləri.',
    'Courir.az is an information portal for sports and athletics. Running, athletics competitions, and sports events.',
    CURRENT_TIMESTAMP,
    1
);

-- ============================================
-- 3. TRUSTGARANT.COM.TR
-- ============================================
INSERT INTO admin_portfolio_projects (
    title_az, title_en, slug, 
    short_description_az, short_description_en,
    detailed_description_az, detailed_description_en,
    project_url, status, technologies, features_az, features_en,
    seo_title_az, seo_title_en, seo_description_az, seo_description_en,
    published_at, created_by
) VALUES (
    'Trust Garant - Təminat və Zəmanət Həlləri',
    'Trust Garant - Guarantee and Warranty Solutions',
    'trust-garant-teminat-ve-zemanet-helleri',
    'Trust Garant təminat və zəmanət xidmətləri üçün müasir platformadır. Müştərilərə etibarlı təminat həlləri təqdim edir.',
    'Trust Garant is a modern platform for guarantee and warranty services. Provides reliable guarantee solutions to customers.',
    'Trust Garant təminat və zəmanət xidmətləri üçün yaradılmış müasir platformadır. Şirkət müştərilərə geniş təminat və zəmanət həlləri təqdim edir. Platforma onlayn müraciət, təminat izləmə və müştəri dəstəyi funksiyalarını əhatə edir.',
    'Trust Garant is a modern platform created for guarantee and warranty services. The company provides customers with comprehensive guarantee and warranty solutions. The platform includes online applications, warranty tracking, and customer support features.',
    'https://trustgarant.com.tr',
    'published',
    ARRAY['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe API'],
    ARRAY[
        'Onlayn təminat müraciətləri',
        'Təminat statusu izləmə sistemi',
        'Müştəri portalı və sənədlərin idarəetməsi',
        'Təhlükəsiz ödəniş inteqrasiyası',
        'Çoxdilli dəstək (TR, AZ, EN)'
    ],
    ARRAY[
        'Online warranty applications',
        'Warranty status tracking system',
        'Customer portal and document management',
        'Secure payment integration',
        'Multilingual support (TR, AZ, EN)'
    ],
    'Trust Garant - Təminat və Zəmanət Həlləri | Proep Portfolio',
    'Trust Garant - Guarantee and Warranty Solutions | Proep Portfolio',
    'Trust Garant təminat və zəmanət xidmətləri üçün müasir platforma. Etibarlı təminat həlləri.',
    'Trust Garant is a modern platform for guarantee and warranty services. Reliable guarantee solutions.',
    CURRENT_TIMESTAMP,
    1
);

-- ============================================
-- 4. ZUM.COM.TR
-- ============================================
INSERT INTO admin_portfolio_projects (
    title_az, title_en, slug, 
    short_description_az, short_description_en,
    detailed_description_az, detailed_description_en,
    project_url, status, technologies, features_az, features_en,
    seo_title_az, seo_title_en, seo_description_az, seo_description_en,
    published_at, created_by
) VALUES (
    'Zum - İnnovativ Biznes Həlləri',
    'Zum - Innovative Business Solutions',
    'zum-innovativ-biznes-helleri',
    'Zum müasir biznes həlləri üçün platformadır. Şirkətlərə innovativ texnologiyalar və xidmətlər təqdim edir.',
    'Zum is a platform for modern business solutions. Provides innovative technologies and services to companies.',
    'Zum müasir biznes həlləri üçün yaradılmış platformadır. Şirkət müxtəlif sahələrdə innovativ texnologiyalar və xidmətlər təqdim edir. Platforma biznes proseslərinin optimallaşdırılması, avtomatlaşdırma və rəqəmsal transformasiya həlləri təklif edir.',
    'Zum is a platform created for modern business solutions. The company provides innovative technologies and services in various fields. The platform offers business process optimization, automation, and digital transformation solutions.',
    'https://zum.com.tr',
    'published',
    ARRAY['Next.js', 'Node.js', 'PostgreSQL', 'GraphQL', 'Docker'],
    ARRAY[
        'Biznes proseslərinin avtomatlaşdırılması',
        'Rəqəmsal transformasiya həlləri',
        'Cloud-based infrastruktur',
        'Real-time analytics və hesabatlar',
        'API inteqrasiyaları'
    ],
    ARRAY[
        'Business process automation',
        'Digital transformation solutions',
        'Cloud-based infrastructure',
        'Real-time analytics and reports',
        'API integrations'
    ],
    'Zum - İnnovativ Biznes Həlləri | Proep Portfolio',
    'Zum - Innovative Business Solutions | Proep Portfolio',
    'Zum müasir biznes həlləri üçün platforma. İnnovativ texnologiyalar və xidmətlər.',
    'Zum is a platform for modern business solutions. Innovative technologies and services.',
    CURRENT_TIMESTAMP,
    1
);

-- ============================================
-- 5. DAMLAMEBEL.AZ
-- ============================================
INSERT INTO admin_portfolio_projects (
    title_az, title_en, slug, 
    short_description_az, short_description_en,
    detailed_description_az, detailed_description_en,
    project_url, status, technologies, features_az, features_en,
    seo_title_az, seo_title_en, seo_description_az, seo_description_en,
    published_at, created_by
) VALUES (
    'Damla Mebel - Mebel və Dizayn Həlləri',
    'Damla Mebel - Furniture and Design Solutions',
    'damla-mebel-mebel-ve-dizayn-helleri',
    'Damla Mebel mebel və daxili dizayn həlləri üçün onlayn mağazadır. Müasir mebel kolleksiyaları və dizayn xidmətləri.',
    'Damla Mebel is an online store for furniture and interior design solutions. Modern furniture collections and design services.',
    'Damla Mebel mebel və daxili dizayn həlləri üçün yaradılmış onlayn mağazadır. Şirkət müasir mebel kolleksiyaları, daxili dizayn xidmətləri və məsləhət təqdim edir. Platforma istifadəçilərə geniş mebel seçimi, 3D vizualizasiya və onlayn sifariş imkanı verir.',
    'Damla Mebel is an online store created for furniture and interior design solutions. The company offers modern furniture collections, interior design services, and consultations. The platform provides users with a wide selection of furniture, 3D visualization, and online ordering capabilities.',
    'https://damlamebel.az',
    'published',
    ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe', '3D Visualization'],
    ARRAY[
        'Geniş mebel kataloqu və filtrlər',
        '3D otaq vizualizasiyası',
        'Onlayn sifariş və ödəniş sistemi',
        'Dizayn məsləhəti və konsultasiya',
        'Çatdırılma və quraşdırma xidmətləri'
    ],
    ARRAY[
        'Extensive furniture catalog and filters',
        '3D room visualization',
        'Online ordering and payment system',
        'Design advice and consultation',
        'Delivery and installation services'
    ],
    'Damla Mebel - Mebel və Dizayn Həlləri | Proep Portfolio',
    'Damla Mebel - Furniture and Design Solutions | Proep Portfolio',
    'Damla Mebel mebel və daxili dizayn həlləri üçün onlayn mağaza. Müasir mebel kolleksiyaları.',
    'Damla Mebel is an online store for furniture and interior design solutions. Modern furniture collections.',
    CURRENT_TIMESTAMP,
    1
);

-- ============================================
-- 6. BAROKMEBEL.AZ
-- ============================================
INSERT INTO admin_portfolio_projects (
    title_az, title_en, slug, 
    short_description_az, short_description_en,
    detailed_description_az, detailed_description_en,
    project_url, status, technologies, features_az, features_en,
    seo_title_az, seo_title_en, seo_description_az, seo_description_en,
    published_at, created_by
) VALUES (
    'Barok Mebel - Premium Mebel Həlləri',
    'Barok Mebel - Premium Furniture Solutions',
    'barok-mebel-premium-mebel-helleri',
    'Barok Mebel premium mebel və daxili dizayn həlləri üçün onlayn platformadır. Yüksək keyfiyyətli mebel və xüsusi dizayn xidmətləri.',
    'Barok Mebel is an online platform for premium furniture and interior design solutions. High-quality furniture and custom design services.',
    'Barok Mebel premium mebel və daxili dizayn həlləri üçün yaradılmış onlayn platformadır. Şirkət yüksək keyfiyyətli mebel, xüsusi dizayn həlləri və ekskluziv kolleksiyalar təqdim edir. Platforma istifadəçilərə premium mebel seçimi, fərdi dizayn xidmətləri və məsləhət imkanı verir.',
    'Barok Mebel is an online platform created for premium furniture and interior design solutions. The company offers high-quality furniture, custom design solutions, and exclusive collections. The platform provides users with premium furniture selection, personalized design services, and consultation opportunities.',
    'https://barokmebel.az',
    'published',
    ARRAY['Vue.js', 'Laravel', 'MySQL', 'Payment Gateway', 'CMS'],
    ARRAY[
        'Premium mebel kolleksiyaları',
        'Fərdi dizayn və konfiqurasiya',
        'Onlayn kataloq və 360° görüntülər',
        'Məsləhət və dizayn xidmətləri',
        'Premium müştəri dəstəyi'
    ],
    ARRAY[
        'Premium furniture collections',
        'Custom design and configuration',
        'Online catalog and 360° views',
        'Consultation and design services',
        'Premium customer support'
    ],
    'Barok Mebel - Premium Mebel Həlləri | Proep Portfolio',
    'Barok Mebel - Premium Furniture Solutions | Proep Portfolio',
    'Barok Mebel premium mebel və daxili dizayn həlləri üçün platforma. Yüksək keyfiyyətli mebel və xüsusi dizayn.',
    'Barok Mebel is a platform for premium furniture and interior design solutions. High-quality furniture and custom design.',
    CURRENT_TIMESTAMP,
    1
);

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
    RAISE NOTICE '✅ 6 portfolio layihəsi uğurla əlavə edildi! (hər biri AZ və EN dillərində)';
END $$;
