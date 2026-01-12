-- ============================================
-- PROEP ADMIN PANEL - BÜTÜN TABLE-LAR
-- Bu SQL faylını pgAdmin-də icra edin
-- ============================================

-- ============================================
-- 1. ADMIN USERS (Login üçün)
-- ============================================
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    email VARCHAR(100),
    role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin sessions table
CREATE TABLE IF NOT EXISTS admin_sessions (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES admin_users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for admin_users
CREATE INDEX IF NOT EXISTS idx_admin_username ON admin_users(username);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(token_hash);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_admin_id ON admin_sessions(admin_id);

-- Updated at trigger function
CREATE OR REPLACE FUNCTION update_admin_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to admin_users
DROP TRIGGER IF EXISTS trigger_update_admin_updated_at ON admin_users;
CREATE TRIGGER trigger_update_admin_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_admin_updated_at();

-- ============================================
-- 2. MESSAGES (Contact Form Submissions)
-- ============================================
CREATE TABLE IF NOT EXISTS admin_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    appeal_type INTEGER CHECK (appeal_type BETWEEN 1 AND 9),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
    ip_address VARCHAR(45),
    user_agent TEXT,
    replied_by INTEGER REFERENCES admin_users(id),
    replied_at TIMESTAMP,
    reply_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 3. FRONTEND USERS (Website registered users)
-- ============================================
CREATE TABLE IF NOT EXISTS admin_frontend_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password_hash VARCHAR(255),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    company VARCHAR(100),
    position VARCHAR(100),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'blocked')),
    email_verified BOOLEAN DEFAULT FALSE,
    last_activity TIMESTAMP,
    notes TEXT,
    can_delete BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 4. BLOG POSTS
-- ============================================
-- Sequence for blog post IDs
CREATE SEQUENCE IF NOT EXISTS blog_post_id_seq START 100000;

CREATE TABLE IF NOT EXISTS admin_blog_posts (
    id SERIAL PRIMARY KEY,
    post_id VARCHAR(6) UNIQUE NOT NULL DEFAULT LPAD(CAST(NEXTVAL('blog_post_id_seq') AS TEXT), 6, '0'),
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(250) UNIQUE NOT NULL,
    short_description TEXT,
    content TEXT NOT NULL,
    cover_image VARCHAR(500),
    author_id INTEGER REFERENCES admin_users(id),
    category VARCHAR(50),
    tags TEXT[], -- Array of tags
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    -- SEO fields
    seo_title VARCHAR(200),
    seo_description TEXT,
    seo_keywords TEXT,
    -- Language support
    language VARCHAR(2) DEFAULT 'az' CHECK (language IN ('az', 'en')),
    -- Publishing
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 5. BLOG CATEGORIES
-- ============================================
CREATE TABLE IF NOT EXISTS admin_blog_categories (
    id SERIAL PRIMARY KEY,
    name_az VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 6. PORTFOLIO PROJECTS
-- ============================================
CREATE TABLE IF NOT EXISTS admin_portfolio_projects (
    id SERIAL PRIMARY KEY,
    -- Basic info
    title_az VARCHAR(200) NOT NULL,
    title_en VARCHAR(200) NOT NULL,
    slug VARCHAR(250) UNIQUE NOT NULL,
    
    -- Descriptions
    short_description_az TEXT NOT NULL,
    short_description_en TEXT NOT NULL,
    detailed_description_az TEXT,
    detailed_description_en TEXT,
    
    -- Project details
    client_name VARCHAR(100),
    project_url VARCHAR(500),
    completion_date DATE,
    project_duration VARCHAR(50),
    
    -- Media
    cover_image VARCHAR(500),
    gallery_images TEXT[], -- Array of image URLs
    
    -- Technologies
    technologies TEXT[], -- Array of technology names
    
    -- Features
    features_az TEXT[], -- Array of features in Azerbaijani
    features_en TEXT[], -- Array of features in English
    
    -- Status and visibility
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    
    -- Stats
    views INTEGER DEFAULT 0,
    
    -- SEO
    seo_title_az VARCHAR(200),
    seo_title_en VARCHAR(200),
    seo_description_az TEXT,
    seo_description_en TEXT,
    
    -- Metadata
    created_by INTEGER REFERENCES admin_users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP
);

-- ============================================
-- 7. PORTFOLIO CATEGORIES
-- ============================================
CREATE TABLE IF NOT EXISTS admin_portfolio_categories (
    id SERIAL PRIMARY KEY,
    name_az VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    icon VARCHAR(100),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 8. PORTFOLIO PROJECT - CATEGORY RELATION
-- ============================================
CREATE TABLE IF NOT EXISTS admin_portfolio_project_categories (
    project_id INTEGER REFERENCES admin_portfolio_projects(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES admin_portfolio_categories(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

-- ============================================
-- INDEXES
-- ============================================

-- Messages
CREATE INDEX IF NOT EXISTS idx_messages_status ON admin_messages(status);
CREATE INDEX IF NOT EXISTS idx_messages_created ON admin_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_email ON admin_messages(email);

-- Frontend Users
CREATE INDEX IF NOT EXISTS idx_frontend_users_email ON admin_frontend_users(email);
CREATE INDEX IF NOT EXISTS idx_frontend_users_status ON admin_frontend_users(status);
CREATE INDEX IF NOT EXISTS idx_frontend_users_username ON admin_frontend_users(username);

-- Blog Posts
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON admin_blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON admin_blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON admin_blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON admin_blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_language ON admin_blog_posts(language);
CREATE INDEX IF NOT EXISTS idx_blog_posts_post_id ON admin_blog_posts(post_id);

-- Portfolio Projects
CREATE INDEX IF NOT EXISTS idx_portfolio_slug ON admin_portfolio_projects(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_status ON admin_portfolio_projects(status);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON admin_portfolio_projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_order ON admin_portfolio_projects(display_order);

-- ============================================
-- TRIGGERS
-- ============================================

-- Updated at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
DROP TRIGGER IF EXISTS trigger_messages_updated_at ON admin_messages;
CREATE TRIGGER trigger_messages_updated_at
    BEFORE UPDATE ON admin_messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trigger_frontend_users_updated_at ON admin_frontend_users;
CREATE TRIGGER trigger_frontend_users_updated_at
    BEFORE UPDATE ON admin_frontend_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trigger_blog_posts_updated_at ON admin_blog_posts;
CREATE TRIGGER trigger_blog_posts_updated_at
    BEFORE UPDATE ON admin_blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trigger_portfolio_updated_at ON admin_portfolio_projects;
CREATE TRIGGER trigger_portfolio_updated_at
    BEFORE UPDATE ON admin_portfolio_projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- COMMENTS
-- ============================================
COMMENT ON TABLE admin_users IS 'Admin panel istifadəçiləri';
COMMENT ON TABLE admin_sessions IS 'Admin sessiya idarəetməsi';
COMMENT ON TABLE admin_messages IS 'Contact form submissions və mesajlar';
COMMENT ON TABLE admin_frontend_users IS 'Saytda qeydiyyatdan keçmiş istifadəçilər';
COMMENT ON TABLE admin_blog_posts IS 'Blog yazıları';
COMMENT ON TABLE admin_blog_categories IS 'Blog kateqoriyaları';
COMMENT ON TABLE admin_portfolio_projects IS 'Portfolio layihələri';
COMMENT ON TABLE admin_portfolio_categories IS 'Portfolio kateqoriyaları';

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
    RAISE NOTICE '✅ Bütün admin table-ları uğurla yaradıldı!';
END $$;
