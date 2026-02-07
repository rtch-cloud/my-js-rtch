# Live SDY JavaScript Files Documentation

Dokumentasi lengkap untuk file-file JavaScript yang digunakan pada website Live SDY.

## 📁 File Overview

### 1. **live-sdy.js** - Main Interactive Features
File utama yang mengatur interaktivitas website Live SDY.

**Fitur:**
- ⏰ **Countdown Timer** - Menampilkan hitungan mundur hingga live draw (13:45 WIB)
- 🔄 **Auto Refresh** - Refresh otomatis data setiap 1 menit
- 📊 **Dynamic Data Update** - Update tabel data SDY secara real-time
- 🎯 **Smooth Scroll** - Navigasi smooth scroll untuk anchor links
- ⏱️ **Last Update Time** - Menampilkan waktu update terakhir
- 🎨 **Table Highlighting** - Highlight row tabel saat hover
- 📋 **Copy to Clipboard** - Fitur copy data dengan satu klik
- 🔗 **Share Functionality** - Share hasil ke social media
- 🖨️ **Print Support** - Print tabel data
- 🔍 **Table Search** - Filter/search data dalam tabel

**Cara Penggunaan:**
```html
<!-- Tambahkan di akhir body tag -->
<script src="/live-sdy.js"></script>

<!-- Countdown element -->
<div data-countdown></div>

<!-- Last update timestamp -->
<span data-last-update></span>

<!-- Copy button -->
<button data-copy="7824">Copy Angka</button>

<!-- Share button -->
<button data-share>Share</button>

<!-- Print button -->
<button data-print>Print</button>

<!-- Search input -->
<input type="text" data-table-search placeholder="Cari data...">
```

**Global API:**
```javascript
// Fetch latest data
window.LiveSDY.fetchData();

// Update table with new data
window.LiveSDY.updateTable({
    prize1: 7824,
    prize2: 3156,
    prize3: 9043
});

// Generate demo data
const demoData = window.LiveSDY.generateDemo();
```

---

### 2. **data-generator.js** - SDY Data Generator
Generator data untuk testing dan demo purposes.

**Fitur:**
- 🎲 **Random Data Generation** - Generate angka SDY realistis
- 📅 **Historical Data** - Generate data historis hingga 30 hari
- 📊 **Statistics Calculator** - Hitung statistik dari data
- 🔍 **Search Functions** - Cari berdasarkan tanggal atau angka
- 📈 **Pattern Analysis** - Analisis pola angka (genap/ganjil, range, consecutive)
- 💾 **Export Functions** - Export ke JSON atau CSV

**Cara Penggunaan:**
```javascript
// Generate single result
const todayResult = window.SDYDataGenerator.getTodayResult();
// { date: Date, day: "Jumat", prize1: 7824, ... }

// Generate week results
const weekData = window.SDYDataGenerator.getWeekResults();

// Generate month results
const monthData = window.SDYDataGenerator.getMonthResults();

// Generate historical data (30 days)
const history = window.SDYDataGenerator.generateHistory(30);

// Calculate statistics
const stats = window.SDYDataGenerator.generateStatistics(history);
console.log(stats);
// { totalDraws: 30, mostFrequent: [...], average: 5500, ... }

// Search by date
const results = window.SDYDataGenerator.searchByDate('07 Feb');

// Search by number
const matches = window.SDYDataGenerator.searchByNumber(7824);

// Find patterns
const patterns = window.SDYDataGenerator.findPatterns(history);
console.log(patterns);
// { evenOdd: {...}, ranges: {...}, consecutive: 5 }

// Format for table
const tableData = window.SDYDataGenerator.formatForTable(weekData);

// Export as JSON
const jsonData = window.SDYDataGenerator.exportJSON(history);

// Export as CSV
const csvData = window.SDYDataGenerator.exportCSV(history);
```

---

### 3. **analytics.js** - User Analytics & Tracking
Tracking interaksi user dan performance website.

**Fitur:**
- 📊 **Page View Tracking** - Track page views dan referrer
- 🖱️ **Click Tracking** - Track semua klik user
- 📜 **Scroll Depth** - Track seberapa dalam user scroll
- ⏱️ **Time on Page** - Hitung waktu user di halaman
- 🚀 **Performance Metrics** - Track loading time, DOM ready, dll
- 🔗 **Link Click Tracking** - Track klik pada link
- 🎯 **Button Click Tracking** - Track klik tombol
- 📝 **Form Tracking** - Track form submissions
- ❌ **Error Tracking** - Track JavaScript errors
- 💯 **Engagement Score** - Hitung skor engagement user

**Cara Penggunaan:**
```javascript
// Log custom event
window.LiveSDYAnalytics.logEvent('custom_event', {
    action: 'download',
    item: 'data-sdy'
});

// Track conversion
window.LiveSDYAnalytics.trackConversion('signup', 100);

// Get session summary
const summary = window.LiveSDYAnalytics.getSessionSummary();
console.log(summary);
// { duration: 120000, pageViews: 1, clicks: 5, scrollDepth: 75 }

// Calculate engagement score (0-100)
const score = window.LiveSDYAnalytics.calculateEngagementScore();
console.log('Engagement:', score);

// Get all stored events
const events = window.LiveSDYAnalytics.getStoredEvents();

// Export analytics data as JSON
window.LiveSDYAnalytics.exportData();

// Clear analytics data
window.LiveSDYAnalytics.clearData();
```

**Configuration:**
```javascript
// Enable debug mode
window.LiveSDYAnalytics.config.debugMode = true;

// Disable scroll tracking
window.LiveSDYAnalytics.config.trackScroll = false;
```

---

### 4. **seo-utilities.js** - SEO Optimization Tools
Tools untuk optimasi SEO dinamis.

**Fitur:**
- 🏷️ **Dynamic Meta Tags** - Update title, description, dll
- 🔗 **Canonical URL Management** - Kelola canonical URL
- 📋 **Structured Data** - Add schema.org JSON-LD
- 🌐 **Open Graph Tags** - Optimize untuk social sharing
- 🐦 **Twitter Cards** - Twitter card optimization
- 🖼️ **Image Optimization** - Auto add alt text, lazy loading
- 🔗 **Link Optimization** - Optimize internal/external links
- ✅ **SEO Validation** - Validasi elemen SEO
- 📊 **SEO Report** - Generate laporan SEO lengkap

**Cara Penggunaan:**
```javascript
// Update page title
window.SEOUtils.updateTitle('Live SDY Hari Ini - Data Terbaru');

// Update meta description
window.SEOUtils.updateDescription('Saksikan live SDY hari ini...');

// Update canonical URL
window.SEOUtils.updateCanonical('https://example.com/live-sdy');

// Add breadcrumb schema
window.SEOUtils.addBreadcrumb([
    { name: 'Home', url: 'https://example.com/' },
    { name: 'Live SDY', url: 'https://example.com/live-sdy' }
]);

// Add FAQ schema
window.SEOUtils.addFAQSchema([
    {
        question: 'Jam berapa live SDY?',
        answer: 'Live SDY dimulai pukul 13:45 WIB setiap hari.'
    }
]);

// Add Article schema
window.SEOUtils.addArticleSchema({
    headline: 'Live SDY Hari Ini',
    description: 'Data SDY terbaru',
    image: 'https://example.com/image.jpg',
    datePublished: '2025-02-07T08:00:00+07:00'
});

// Add Open Graph tags
window.SEOUtils.addOpenGraphTags({
    title: 'Live SDY',
    description: 'Data SDY hari ini',
    image: 'https://example.com/og-image.jpg',
    url: 'https://example.com/'
});

// Add Twitter Card tags
window.SEOUtils.addTwitterCardTags({
    title: 'Live SDY',
    description: 'Data SDY hari ini',
    image: 'https://example.com/twitter-card.jpg'
});

// Set robots meta
window.SEOUtils.setRobotsMeta(true, true); // index, follow

// Validate SEO
const validation = window.SEOUtils.validateSEO();
console.log(validation);
// { valid: true/false, issues: [...] }

// Generate SEO report
const report = window.SEOUtils.generateSEOReport();
console.log(report);
```

---

## 🚀 Quick Start

### Basic Setup
```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Live SDY</title>
</head>
<body>
    <!-- Your content here -->

    <!-- Add all scripts before closing body tag -->
    <script src="/seo-utilities.js"></script>
    <script src="/data-generator.js"></script>
    <script src="/analytics.js"></script>
    <script src="/live-sdy.js"></script>
</body>
</html>
```

### Complete Integration Example
```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Live SDY Hari Ini</title>
</head>
<body>
    <!-- Countdown -->
    <div>
        Live draw dalam: <span data-countdown>Loading...</span>
    </div>

    <!-- Data Table -->
    <table class="data-table">
        <thead>
            <tr>
                <th>Hari</th>
                <th>Tanggal</th>
                <th>Prize 1</th>
                <th>Prize 2</th>
                <th>Prize 3</th>
            </tr>
        </thead>
        <tbody>
            <!-- Data rows -->
        </tbody>
    </table>

    <!-- Last Update -->
    <p>Terakhir diupdate: <span data-last-update></span></p>

    <!-- Scripts -->
    <script src="/seo-utilities.js"></script>
    <script src="/data-generator.js"></script>
    <script src="/analytics.js"></script>
    <script src="/live-sdy.js"></script>

    <!-- Custom initialization -->
    <script>
        // Load initial data
        window.addEventListener('DOMContentLoaded', function() {
            // Generate demo data
            const weekData = window.SDYDataGenerator.getWeekResults();
            console.log('Week data loaded:', weekData);

            // Track page view
            window.LiveSDYAnalytics.logEvent('page_load', {
                page: 'live-sdy'
            });

            // Update SEO
            window.SEOUtils.updateTitle('Live SDY Hari Ini - Update Tercepat');
        });
    </script>
</body>
</html>
```

---

## 🎯 Use Cases

### Use Case 1: Real-time Data Update
```javascript
// Fetch from API and update table
fetch('/api/sdy-latest')
    .then(res => res.json())
    .then(data => {
        window.LiveSDY.updateTable(data);
        window.LiveSDYAnalytics.logEvent('data_updated', { source: 'api' });
    });
```

### Use Case 2: Generate Weekly Report
```javascript
// Generate and export weekly data
const weekData = window.SDYDataGenerator.getWeekResults();
const stats = window.SDYDataGenerator.generateStatistics(weekData);
const csv = window.SDYDataGenerator.exportCSV(weekData);

// Download CSV
const blob = new Blob([csv], { type: 'text/csv' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'sdy-week-report.csv';
a.click();
```

### Use Case 3: SEO Optimization on Route Change
```javascript
// When navigating to different section
function updatePageSEO(section) {
    const seoData = {
        'live': {
            title: 'Live SDY Hari Ini - Streaming Langsung',
            description: 'Saksikan live draw SDY langsung...'
        },
        'data': {
            title: 'Data SDY Terlengkap - History 2025',
            description: 'Lihat data SDY lengkap...'
        }
    };

    if (seoData[section]) {
        window.SEOUtils.updateTitle(seoData[section].title);
        window.SEOUtils.updateDescription(seoData[section].description);
    }
}
```

---

## 📝 Notes

- Semua file JavaScript bersifat **standalone** dan dapat digunakan secara independen
- File-file ini **tidak memiliki dependencies** eksternal
- Kompatibel dengan semua browser modern (ES6+)
- Untuk production, pertimbangkan untuk **minify** file JavaScript
- Data analytics disimpan di **localStorage** (max 100 events)

---

## 🔧 Troubleshooting

### Script tidak load
```javascript
// Check if script loaded
if (window.LiveSDY) {
    console.log('✅ live-sdy.js loaded');
} else {
    console.error('❌ live-sdy.js failed to load');
}
```

### Debug mode
```javascript
// Enable debug mode for analytics
window.LiveSDYAnalytics.config.debugMode = true;

// Check console for detailed logs
```

### Clear all data
```javascript
// Clear localStorage
localStorage.clear();

// Clear analytics
window.LiveSDYAnalytics.clearData();
```

---

## 📄 License

Copyright © 2025 Live SDY Pools. All rights reserved.
