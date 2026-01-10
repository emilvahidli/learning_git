# Google-da Səliqəli Görünmək Üçün Manual Indexing Guide

## ⚠️ Vacib Qeyd

Google-da indexing **1-7 gün** vaxt aparır. **SiteLinks** (proep.az altında buttonlar) üçün isə **2-4 həftə** lazımdır. Bu normaldır!

## 🚀 Sürətli Manual Indexing

### **1. Google Search Console-a Daxil Olun:**
- https://search.google.com/search-console
- Property seçin: `https://proep.az`

### **2. Sitemap Submit:**
1. Sol menyuda **"Sitemaps"** klikləyin
2. Əgər `sitemap.xml` artıq submit olunmayıbsa:
   - **"Add a new sitemap"** yazın
   - URL: `sitemap.xml`
   - **"Submit"** klikləyin

### **3. URL Inspection (Manual Indexing):**

Hər əsas səhifə üçün manual indexing edin:

#### **Azərbaycan dilində səhifələr:**

1. **URL Inspection** (yuxarıdakı axtarış sahəsi) açın
2. URL yazın və hər biri üçün təkrarlayın:
   - `https://proep.az/home/az`
   - `https://proep.az/about/az`
   - `https://proep.az/services/az`
   - `https://proep.az/portfolio/az`
   - `https://proep.az/blog/az`
   - `https://proep.az/contact/az`

3. Hər URL üçün:
   - **"Test Live URL"** klikləyin
   - Gözləyin (bir neçə saniyə)
   - **"Request Indexing"** klikləyin
   - "Request accepted" mesajı görünməlidir

#### **İngilis dilində səhifələr:**

Eyni addımları ingilis dilində səhifələr üçün də təkrarlayın:
- `https://proep.az/home/en`
- `https://proep.az/about/en`
- `https://proep.az/services/en`
- `https://proep.az/portfolio/en`
- `https://proep.az/blog/en`
- `https://proep.az/contact/en`

### **4. Bulk URL Inspection (Çox URL bir anda):**

Google Search Console API-dən istifadə edərək çox URL-i bir anda index edə bilərsiniz, amma manual yol daha asandır.

---

## 📊 Indexing Status Yoxlama

### **Google Search Console-da:**
1. **"Coverage"** (sol menyuda) klikləyin
2. "Valid" və "Submitted and indexed" səhifələri görə bilərsiniz
3. Əgər səhifələr "Discovered - currently not indexed" statusundadırsa, manual indexing edin

### **Google Search-da:**
1. Google-da axtarış edin: `site:proep.az`
2. İndeks olunmuş səhifələr görünməlidir
3. Əgər görünmürsə, bir az gözləyin (1-2 gün)

---

## 🎯 SiteLinks (Buttonlar) Üçün

SiteLinks (proep.az altında "Ana Səhifə", "Haqqımızda" və s. buttonlar) **avtomatik** yaranır və **2-4 həftə** vaxt lazımdır.

### SiteLinks üçün Tövsiyələr:

1. **Structured Data** (artıq əlavə olunub):
   - WebSite Schema ✅
   - Organization Schema ✅
   - BreadcrumbList Schema ✅

2. **Daxili linklər:**
   - Navigation-də linklər var ✅
   - Footer-də linklər var ✅

3. **Domain Authority:**
   - Backlink-lər (başqa saytlardan linklər)
   - Social media presence
   - Content quality

4. **Trafik:**
   - Sayta ziyarətçi trafik artırın
   - Social media-də paylaşın

---

## 🔍 Rich Results Test

### **1. Rich Results Test:**
1. https://search.google.com/test/rich-results açın
2. URL yazın: `https://proep.az/home/az`
3. **"Test URL"** klikləyin
4. Structured Data görünməlidir:
   - ✅ Organization
   - ✅ WebSite
   - ✅ BreadcrumbList
   - ✅ WebPage

### **2. Mobile-Friendly Test:**
1. https://search.google.com/test/mobile-friendly açın
2. URL yazın: `https://proep.az`
3. **"Test URL"** klikləyin
4. Mobile-friendly olmalıdır ✅

---

## 📈 Indexing Sürətləndirmək Üçün:

### **1. Sitemap Yeniləyin:**
Hər dəfə yeni məzmun əlavə etdikdə, sitemap-i yeniləyin və Google Search Console-da yenidən submit edin.

### **2. Robots.txt Yoxlama:**
1. `https://proep.az/robots.txt` açın
2. Görməli olduğunuz:
   ```
   User-agent: *
   Allow: /
   
   Sitemap: https://proep.az/sitemap.xml
   ```

### **3. Backlink-lər:**
- Social media-də paylaşın
- Reddit, LinkedIn və s. platformalarda paylaşın
- Digər saytlardan link istəyin

---

## ⏱️ Gözləmə Vaxtları:

- **Verification:** Dərhal ✅ (tamamlandı)
- **Sitemap indexing:** 1-7 gün
- **URL indexing:** 1-7 gün (manual indexing ilə daha sürətli)
- **SiteLinks:** 2-4 həftə (avtomatik)
- **Rich Results:** 1-2 həftə

---

## 🆘 Problem Giderme

### Səhifələr index olunmur?

1. **Robots.txt yoxlama:**
   - `https://proep.az/robots.txt` açın
   - `Disallow: /` olmamalıdır

2. **Meta robots tag:**
   - View Source → `<meta name="robots" content="index, follow">` olmalıdır

3. **Canonical URL:**
   - Hər səhifədə canonical URL olmalıdır

4. **404 Error:**
   - Bütün linklər işləməlidir
   - 404 error olmamalıdır

### SiteLinks görünmür?

- **Normaldır!** 2-4 həftə lazımdır
- Structured Data düzgündür ✅
- Trafik artırın
- Backlink əlavə edin

---

## ✅ Növbəti Addımlar

1. ✅ Google Search Console verification (tamamlandı)
2. ✅ Structured Data əlavə olundu
3. ✅ Sitemap.xml hazırdır
4. 🔄 **İndi:** Manual indexing edin (yuxarıdakı addımlar)
5. ⏳ **Gözləyin:** 1-7 gün indexing
6. ⏳ **Gözləyin:** 2-4 həftə SiteLinks

---

## 📝 Qeyd

Google-da "proep" yazanda **səliqəli görünmək** üçün:
- ✅ Structured Data var
- ✅ Sitemap var
- ✅ Meta tags var
- ✅ Robots.txt var
- 🔄 **Manual indexing lazımdır** (yuxarıda izah olunub)
- ⏳ **Vaxt lazımdır** (1-7 gün)

**SiteLinks** (buttonlar) üçün isə **2-4 həftə** lazımdır və bu **avtomatik** yaranır.
