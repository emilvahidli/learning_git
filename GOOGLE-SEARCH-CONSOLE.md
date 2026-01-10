# Google Search Console Setup Guide

## 1. Google Search Console-a Daxil Olun

1. https://search.google.com/search-console açın
2. Google hesabınızla daxil olun

## 2. Property Əlavə Edin

### URL Prefix Metodu (Tövsiyə olunur):

1. **"Add Property"** klikləyin
2. **"URL prefix"** seçin
3. URL yazın: `https://proep.az`
4. **"Continue"** klikləyin

## 3. Verification Metodları

Google Search Console-da bir neçə verification metodu təklif olunur:

### ✅ Metod 1: HTML Meta Tag (Ən Asan)

1. Verification metodu seçin: **"HTML tag"** və ya **"HTML meta tag"**
2. Google sizə belə bir meta tag verəcək:
   ```html
   <meta name="google-site-verification" content="XXXXXXXXXXXXX" />
   ```
3. Bu `content="XXXXXXXXXXXXX"` kodunu kopyalayın
4. `frontend/index.html` faylında `<!-- Google Search Console Verification -->` bölməsini tapın
5. Placeholder-i əvəz edin:
   ```html
   <meta name="google-site-verification" content="XXXXXXXXXXXXX" />
   ```
6. Build edin və deploy edin
7. Google Search Console-da **"Verify"** klikləyin

### Metod 2: DNS TXT Record (Ən Etibarlı)

1. Cloudflare-də DNS-ə daxil olun
2. Google Search Console-da **"DNS record"** metodunu seçin
3. Google sizə TXT record verəcək (məsələn: `google-site-verification=XXXXXXXXXXXXX`)
4. Cloudflare → DNS → **Add Record**:
   - **Type:** `TXT`
   - **Name:** `@` (və ya root domain)
   - **Content:** `google-site-verification=XXXXXXXXXXXXX`
   - **TTL:** Auto (və ya 3600)
5. **Save** klikləyin
6. 5-10 dəqiqə gözləyin (DNS propagate olsun)
7. Google Search Console-da **"Verify"** klikləyin

### Metod 3: Google Analytics (Əgər istifadə edirsinizsə)

1. Əgər Google Analytics (`G-QQRLNFRQ9X`) artıq işləyirsə
2. Google Search Console-da **"Google Analytics"** metodunu seçin
3. Avtomatik verify olacaq

### Metod 4: Google Tag Manager (Əgər istifadə edirsinizsə)

1. Əgər GTM (`GTM-NWTZFF94`) artıq işləyirsə
2. Google Search Console-da **"Google Tag Manager"** metodunu seçin
3. Avtomatik verify olacaq

## 4. Sitemap Submit

Verification tamamlandıqdan sonra:

1. Google Search Console → **Sitemaps** (sol menyuda)
2. **"Add a new sitemap"** yazın:
   - `sitemap.xml`
3. **"Submit"** klikləyin

## 5. URL Inspection (Test)

1. Google Search Console → **URL Inspection** (yuxarıdakı axtarış sahəsi)
2. URL yazın: `https://proep.az/home/az`
3. **"Test Live URL"** → **"Request Indexing"** klikləyin
4. Hər əsas səhifə üçün təkrarlayın:
   - `https://proep.az/home/az`
   - `https://proep.az/about/az`
   - `https://proep.az/services/az`
   - `https://proep.az/portfolio/az`
   - `https://proep.az/contact/az`

## 6. Rich Results Test

1. https://search.google.com/test/rich-results açın
2. URL yazın: `https://proep.az/home/az`
3. **"Test URL"** klikləyin
4. Structured Data görünməlidir (Organization, WebSite, BreadcrumbList)

## İndeksləmə Vaxtı

- **Verification:** Dərhal (bir neçə saniyə)
- **Sitemap:** 1-7 gün
- **URL Indexing:** 1-7 gün (Request Indexing ilə)
- **SiteLinks (breadcrumbs):** 2-4 həftə (Google avtomatik yaradır)

## Problem Giderme

### Verification failed?

1. **Meta tag metodunda:**
   - Fayl düzgün deploy olunubmu? `https://proep.az` açın → View Source → meta tag var mı?
   - Cache problemi? Hard refresh edin (Ctrl+Shift+R / Cmd+Shift+R)
   - Deployment yoxlayın: `curl https://proep.az | grep google-site-verification`

2. **DNS metodunda:**
   - DNS propagate oldumu? `dig TXT proep.az` və ya `nslookup -type=TXT proep.az`
   - Cloudflare-də TXT record düzgün yaradılıbmı?
   - 10-15 dəqiqə gözləyin

### Sitemap not found?

1. `https://proep.az/sitemap.xml` açın (browser-də)
2. XML düzgün görünürmü?
3. `robots.txt`-də sitemap link var mı? `https://proep.az/robots.txt`
4. Nginx config-də sitemap.xml serve olunurmu?

## Əlavə Məlumat

- Google Search Console Documentation: https://support.google.com/webmasters
- Rich Results Test: https://search.google.com/test/rich-results
- Google Search Central: https://developers.google.com/search
