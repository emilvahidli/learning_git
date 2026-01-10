# Google Search Console "URL not in property" Xətası - Həll

## ❌ Problem

Google Search Console-da URL Inspection-də:
```
URL not in property
Inspect a URL in the currently selected property or switch properties
```

## 🔍 Səbəb

Bu xəta bir neçə səbəbdən ola bilər:

1. **Property URL formatı yanlışdır**
   - Property: `proep.az` (domain format)
   - Amma URL: `https://proep.az/home/az` (https ilə)

2. **Property URL formatı fərqlidir**
   - Property: `https://proep.az/` (trailing slash)
   - Amma URL: `https://proep.az/home/az` (trailing slash yoxdur)

3. **Property yanlış seçilib**
   - Başqa property (məsələn, `www.proep.az`) seçilib
   - Amma URL: `https://proep.az/home/az`

## ✅ Həll

### **Metod 1: Property URL Formatı Yoxlama**

1. **Google Search Console → Property seçin**
   - Property: `https://proep.az` olmalıdır
   - Yoxdursa, yeni property əlavə edin: `https://proep.az`

2. **Property formatı yoxlama:**
   - Property type: **"URL prefix"** olmalıdır
   - Yoxdursa, property silin və yenidən əlavə edin

### **Metod 2: URL Formatı Yoxlama**

URL Inspection-də URL yazarkən:

✅ **Düzgün formatlar:**
- `https://proep.az/home/az`
- `https://proep.az/about/az`
- `https://proep.az/`

❌ **Yanlış formatlar:**
- `proep.az/home/az` (https yoxdur)
- `www.proep.az/home/az` (www var, amma property-də yoxdur)
- `http://proep.az/home/az` (http, amma property https-dir)

### **Metod 3: Property Əlavə Etmək (Əgər yoxdursa)**

1. **Google Search Console → "Add Property"**
2. **"URL prefix"** seçin
3. **URL yazın:** `https://proep.az`
4. **"Continue"** klikləyin
5. **Verification:**
   - HTML meta tag metodunu istifadə edin (artıq əlavə olunub)
   - Və ya HTML file metodunu istifadə edin (artıq əlavə olunub)
6. **"Verify"** klikləyin

### **Metod 4: Property Switch (Əgər çox property varsa)**

1. **Google Search Console → Property dropdown (yuxarıda)**
2. **Düzgün property seçin:** `https://proep.az`
3. **URL Inspection** açın
4. **URL yazın:** `https://proep.az/home/az`
5. İndi işləməlidir ✅

## 🔧 Təlimat: Property Yoxlama

### **Addım 1: Google Search Console Property List**

1. https://search.google.com/search-console açın
2. Yuxarıda **property dropdown** görə bilərsiniz
3. Hansı property-lər var?
   - `https://proep.az` ✅ (bu lazımdır)
   - `https://www.proep.az` ❌ (bu yoxdursa, əlavə etməyin)
   - `proep.az` ❌ (domain format, bu yoxdursa, əlavə etməyin)

### **Addım 2: Property Formatı Yoxlama**

1. Property seçin: `https://proep.az`
2. Sol menyuda **"Settings"** (⚙️) klikləyin
3. **"Users and permissions"** altında property URL görünməlidir
4. Property URL: `https://proep.az` olmalıdır

### **Addım 3: URL Inspection Test**

1. **Property seçin:** `https://proep.az`
2. **URL Inspection** (yuxarıdakı axtarış sahəsi) açın
3. **URL yazın:** `https://proep.az/` (root URL ilə test edin)
4. **"Enter"** basın
5. Əgər işləyirsə, ✅
6. Əgər işləmirsə, `https://proep.az/home/az` ilə test edin

## 📝 Qeyd

**Əgər property `https://proep.az` yoxdursa:**

1. **Yeni property əlavə edin:**
   - "Add Property" → "URL prefix"
   - URL: `https://proep.az`
   - Verification: HTML meta tag (artıq əlavə olunub)
   - "Verify" klikləyin

2. **Verification:**
   - Meta tag: `<meta name="google-site-verification" content="kpakDuTrRHkX1jIXcsp6nIRpVOqAPcJ1F_Xh9h6ogW4" />` artıq HTML-də var ✅
   - HTML file: `google1644ddaab61d4cf7.html` artıq public-də var ✅

## ⚠️ Vacib

**Property URL formatı:**
- ✅ `https://proep.az` (tövsiyə olunur - URL prefix)
- ❌ `proep.az` (domain format, React SPA üçün problemli ola bilər)
- ❌ `https://www.proep.az` (www subdomain, əgər www yoxdursa)

**URL Inspection-də URL formatı:**
- ✅ `https://proep.az/home/az` (tam URL, https ilə)
- ❌ `proep.az/home/az` (https yoxdur)
- ❌ `/home/az` (relative URL)

## 🎯 Növbəti Addımlar

1. ✅ Property yoxlayın: `https://proep.az`
2. ✅ Property formatı yoxlayın: "URL prefix"
3. ✅ URL Inspection-də tam URL yazın: `https://proep.az/home/az`
4. ✅ Əgər hələ də işləmirsə, property silin və yenidən əlavə edin
