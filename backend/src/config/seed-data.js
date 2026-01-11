import pool from '../config/database.js';

/**
 * Test data əlavə et
 */
async function seedData() {
  try {
    console.log('🌱 Test data əlavə edilir...\n');

    // Messages
    console.log('💌 Messages əlavə edilir...');
    await pool.query(`
      INSERT INTO admin_messages (name, email, phone_number, appeal_type, message, status)
      VALUES 
        ('Elvin Məmmədov', 'elvin@test.az', '+994501234567', 1, 'Web sayt haqqında məlumat almaq istəyirəm', 'unread'),
        ('Aysel Həsənova', 'aysel@test.az', '+994502345678', 2, 'AI konsaltinq xidməti ilə maraqlanıram', 'read'),
        ('Rəşad Əliyev', 'rashad@test.az', '+994503456789', 3, 'Backend development üçün təklif', 'replied')
      ON CONFLICT DO NOTHING
    `);
    
    // Frontend Users
    console.log('👥 Frontend Users əlavə edilir...');
    await pool.query(`
      INSERT INTO admin_frontend_users (full_name, email, phone_number, company, position, status)
      VALUES 
        ('Nigar Quliyeva', 'nigar@company.az', '+994501111111', 'Tech Solutions', 'CEO', 'active'),
        ('Kamran Rzayev', 'kamran@startup.az', '+994502222222', 'Startup Hub', 'Developer', 'active'),
        ('Leyla Məmmədli', 'leyla@business.az', '+994503333333', 'Business Corp', 'Manager', 'inactive')
      ON CONFLICT (email) DO NOTHING
    `);

    // Blog Posts
    console.log('📝 Blog Posts əlavə edilir...');
    await pool.query(`
      INSERT INTO admin_blog_posts 
      (title, slug, short_description, content, author_id, category, status, language, views)
      VALUES 
        ('Süni İntellekt Texnologiyalarının Gələcəyi', 
         'suni-intellekt-texnologiyalarinin-geleceiyi',
         'AI texnologiyalarının inkişaf istiqamətləri',
         'Süni intellekt texnologiyaları sürətlə inkişaf edir və biznes proseslərinə böyük təsir göstərir...',
         1, 'AI & Technology', 'published', 'az', 245),
        ('Backend Development Best Practices',
         'backend-development-best-practices',
         'Modern backend development principles',
         'Building scalable and maintainable backend systems requires following industry best practices...',
         1, 'Development', 'published', 'en', 187),
        ('API İnteqrasiyası üçün Praktiki Tövsiyələr',
         'api-inteqrasiyasi-ucun-praktiki-tovsiyeler',
         'API dizayn və inteqrasiya prinsipləri',
         'API-lərin düzgün dizaynı və inteqrasiyası layihənin uğuru üçün çox vacibdir...',
         1, 'Development', 'draft', 'az', 0)
      ON CONFLICT (slug) DO NOTHING
    `);

    // Portfolio Projects - Proep.az saytından mövcud layihələr
    console.log('🎨 Portfolio Projects əlavə edilir...');
    await pool.query(`
      INSERT INTO admin_portfolio_projects 
      (title_az, title_en, slug, short_description_az, short_description_en,
       detailed_description_az, detailed_description_en, project_url,
       cover_image, technologies, features_az, features_en, status, is_featured, display_order, created_by)
      VALUES 
        ('Zum.com.tr', 'Zum.com.tr', 'zum-com-tr',
         'Türkiyənin aparıcı e-ticarət platforması üçün kompleks backend və API həlləri.',
         'Comprehensive backend and API solutions for Turkey''s leading e-commerce platform.',
         'Zum.com.tr üçün yüksək yüklənmə qabiliyyətli e-ticarət arxitekturası, məhsul kataloq sistemləri və ödəniş inteqrasiyaları hazırlanmışdır.',
         'For Zum.com.tr, we developed high-load e-commerce architecture, product catalog systems, and payment integrations.',
         'https://zum.com.tr', null,
         ARRAY['E-commerce Solutions', 'Microservices', 'Payment Integration', 'Cloud Infrastructure'],
         ARRAY['Yüksək yüklənmə qabiliyyəti', 'Real-time inventar idarəetməsi', 'Çoxkanallı ödəniş sistemləri', 'Advanced məhsul axtarışı'],
         ARRAY['High-load capacity', 'Real-time inventory management', 'Multi-channel payment systems', 'Advanced product search'],
         'published', true, 1, 1),
        
        ('Gosport.az', 'Gosport.az', 'gosport-az',
         'İdman məhsulları üçün AI əsaslı e-ticarət platforması və backend həlləri.',
         'AI-powered e-commerce platform and backend solutions for sports products.',
         'Gosport.az layihəsində süni intellekt texnologiyaları ilə backend sistemlərin qurulması və API inteqrasiyası həyata keçirilmişdir.',
         'In the Gosport.az project, we implemented backend systems development with AI technologies and API integration.',
         'https://gosport.az/az/', null,
         ARRAY['AI Integration', 'Backend Development', 'API Design', 'Recommendation Engine'],
         ARRAY['AI əsaslı məhsul tövsiyə sistemi', 'RESTful API arxitekturası', 'Real-time məlumat emalı', 'Yüksək performanslı database'],
         ARRAY['AI-powered product recommendations', 'RESTful API architecture', 'Real-time data processing', 'High-performance database'],
         'published', true, 2, 1),
        
        ('Courir.az', 'Courir.az', 'courir-az',
         'Premium ayaqqabı və geyim brendi üçün modern e-ticarət həlli.',
         'Modern e-commerce solution for premium footwear and apparel brand.',
         'Courir.az üçün müasir dizaynlı, istifadəçi dostu e-ticarət platforması yaradılmışdır.',
         'For Courir.az, we created a modern, user-friendly e-commerce platform.',
         'https://courir.az/az/', null,
         ARRAY['Web Development', 'E-commerce', 'UI/UX Optimization', 'Security'],
         ARRAY['Modern və responsive dizayn', 'Tez yüklənmə vaxtı', 'Təhlükəsiz ödəniş sistemi', 'Asan məhsul idarəetməsi'],
         ARRAY['Modern and responsive design', 'Fast loading times', 'Secure payment system', 'Easy product management'],
         'published', false, 3, 1)
      ON CONFLICT (slug) DO NOTHING
    `);

    console.log('\n✅ Test data uğurla əlavə edildi!');
    console.log('\n📊 Statistika:');
    
    const messagesCount = await pool.query('SELECT COUNT(*) FROM admin_messages');
    const usersCount = await pool.query('SELECT COUNT(*) FROM admin_frontend_users');
    const postsCount = await pool.query('SELECT COUNT(*) FROM admin_blog_posts');
    const projectsCount = await pool.query('SELECT COUNT(*) FROM admin_portfolio_projects');
    
    console.log(`   💌 Messages: ${messagesCount.rows[0].count}`);
    console.log(`   👥 Users: ${usersCount.rows[0].count}`);
    console.log(`   📝 Blog Posts: ${postsCount.rows[0].count}`);
    console.log(`   🎨 Portfolio Projects: ${projectsCount.rows[0].count}`);

  } catch (error) {
    console.error('❌ Xəta:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seedData();
