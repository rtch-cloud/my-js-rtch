/**
 * SEO Utilities for Live SDY
 * Dynamic meta tags, structured data, and SEO optimization
 */

class SEOUtilities {
    constructor() {
        this.baseURL = window.location.origin;
        this.siteName = 'Live SDY Pools';
    }

    /**
     * Update page title dynamically
     */
    updateTitle(title) {
        document.title = title;

        // Update OG title
        this.updateMetaTag('property', 'og:title', title);

        // Update Twitter title
        this.updateMetaTag('name', 'twitter:title', title);

        console.log('Title updated:', title);
    }

    /**
     * Update meta description
     */
    updateDescription(description) {
        this.updateMetaTag('name', 'description', description);
        this.updateMetaTag('property', 'og:description', description);
        this.updateMetaTag('name', 'twitter:description', description);

        console.log('Description updated');
    }

    /**
     * Update meta tag helper
     */
    updateMetaTag(attribute, attributeValue, content) {
        let meta = document.querySelector(`meta[${attribute}="${attributeValue}"]`);

        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute(attribute, attributeValue);
            document.head.appendChild(meta);
        }

        meta.setAttribute('content', content);
    }

    /**
     * Update canonical URL
     */
    updateCanonical(url) {
        let canonical = document.querySelector('link[rel="canonical"]');

        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }

        canonical.setAttribute('href', url);
        console.log('Canonical URL updated:', url);
    }

    /**
     * Add breadcrumb structured data
     */
    addBreadcrumb(items) {
        const breadcrumbList = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": items.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": item.name,
                "item": item.url
            }))
        };

        this.addStructuredData('breadcrumb', breadcrumbList);
    }

    /**
     * Add FAQ structured data
     */
    addFAQSchema(faqs) {
        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };

        this.addStructuredData('faq', faqSchema);
    }

    /**
     * Add Article structured data
     */
    addArticleSchema(articleData) {
        const articleSchema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": articleData.headline,
            "description": articleData.description,
            "image": articleData.image,
            "author": {
                "@type": "Organization",
                "name": this.siteName
            },
            "publisher": {
                "@type": "Organization",
                "name": this.siteName,
                "logo": {
                    "@type": "ImageObject",
                    "url": articleData.logo || `${this.baseURL}/logo.png`
                }
            },
            "datePublished": articleData.datePublished || new Date().toISOString(),
            "dateModified": articleData.dateModified || new Date().toISOString()
        };

        this.addStructuredData('article', articleSchema);
    }

    /**
     * Add Table structured data
     */
    addTableSchema(tableData) {
        const tableSchema = {
            "@context": "https://schema.org",
            "@type": "Table",
            "about": tableData.about,
            "description": tableData.description
        };

        this.addStructuredData('table', tableSchema);
    }

    /**
     * Add generic structured data
     */
    addStructuredData(id, schema) {
        // Remove existing script with same id
        const existing = document.getElementById(`schema-${id}`);
        if (existing) {
            existing.remove();
        }

        const script = document.createElement('script');
        script.id = `schema-${id}`;
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);

        console.log(`Schema added: ${id}`);
    }

    /**
     * Generate dynamic sitemap data
     */
    generateSitemapData(pages) {
        return pages.map(page => ({
            url: `${this.baseURL}${page.path}`,
            lastmod: page.lastModified || new Date().toISOString().split('T')[0],
            changefreq: page.changefreq || 'daily',
            priority: page.priority || 0.8
        }));
    }

    /**
     * Add Open Graph tags for social sharing
     */
    addOpenGraphTags(data) {
        const ogTags = {
            'og:type': data.type || 'website',
            'og:url': data.url || window.location.href,
            'og:title': data.title,
            'og:description': data.description,
            'og:image': data.image,
            'og:site_name': data.siteName || this.siteName,
            'og:locale': data.locale || 'id_ID'
        };

        Object.entries(ogTags).forEach(([property, content]) => {
            if (content) {
                this.updateMetaTag('property', property, content);
            }
        });

        console.log('Open Graph tags updated');
    }

    /**
     * Add Twitter Card tags
     */
    addTwitterCardTags(data) {
        const twitterTags = {
            'twitter:card': data.cardType || 'summary_large_image',
            'twitter:url': data.url || window.location.href,
            'twitter:title': data.title,
            'twitter:description': data.description,
            'twitter:image': data.image
        };

        Object.entries(twitterTags).forEach(([name, content]) => {
            if (content) {
                this.updateMetaTag('name', name, content);
            }
        });

        console.log('Twitter Card tags updated');
    }

    /**
     * Generate robots meta tag
     */
    setRobotsMeta(index = true, follow = true) {
        const content = `${index ? 'index' : 'noindex'}, ${follow ? 'follow' : 'nofollow'}`;
        this.updateMetaTag('name', 'robots', content);
    }

    /**
     * Add hreflang tags for multi-language
     */
    addHreflangTags(languages) {
        // Remove existing hreflang tags
        document.querySelectorAll('link[rel="alternate"]').forEach(link => link.remove());

        languages.forEach(lang => {
            const link = document.createElement('link');
            link.setAttribute('rel', 'alternate');
            link.setAttribute('hreflang', lang.code);
            link.setAttribute('href', lang.url);
            document.head.appendChild(link);
        });

        console.log('Hreflang tags added');
    }

    /**
     * Optimize images for SEO
     */
    optimizeImages() {
        const images = document.querySelectorAll('img');

        images.forEach(img => {
            // Add loading="lazy" if not present
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }

            // Check for alt text
            if (!img.hasAttribute('alt') || img.alt === '') {
                console.warn('Image missing alt text:', img.src);
                // Add generic alt text based on filename
                const filename = img.src.split('/').pop().split('.')[0];
                img.setAttribute('alt', filename.replace(/-|_/g, ' '));
            }

            // Add width and height if not present
            if (!img.hasAttribute('width') && img.naturalWidth) {
                img.setAttribute('width', img.naturalWidth);
            }
            if (!img.hasAttribute('height') && img.naturalHeight) {
                img.setAttribute('height', img.naturalHeight);
            }
        });

        console.log('Images optimized');
    }

    /**
     * Optimize internal links
     */
    optimizeInternalLinks() {
        const links = document.querySelectorAll('a');

        links.forEach(link => {
            const href = link.getAttribute('href');

            if (!href) return;

            // Add noopener noreferrer for external links
            if (href.startsWith('http') && !href.includes(this.baseURL)) {
                link.setAttribute('rel', 'noopener noreferrer');
                link.setAttribute('target', '_blank');
            }

            // Add descriptive title if missing
            if (!link.hasAttribute('title') && link.textContent.trim()) {
                link.setAttribute('title', link.textContent.trim().substring(0, 100));
            }
        });

        console.log('Links optimized');
    }

    /**
     * Add last modified date to page
     */
    addLastModified() {
        const lastModified = document.lastModified;
        const metaDate = document.createElement('meta');
        metaDate.setAttribute('name', 'last-modified');
        metaDate.setAttribute('content', lastModified);
        document.head.appendChild(metaDate);

        console.log('Last modified date added:', lastModified);
    }

    /**
     * Validate SEO elements
     */
    validateSEO() {
        const issues = [];

        // Check title
        if (!document.title || document.title.length < 30) {
            issues.push('Title is too short (should be 30-60 characters)');
        }
        if (document.title.length > 60) {
            issues.push('Title is too long (should be 30-60 characters)');
        }

        // Check description
        const description = document.querySelector('meta[name="description"]');
        if (!description) {
            issues.push('Meta description is missing');
        } else {
            const descLength = description.content.length;
            if (descLength < 120) {
                issues.push('Meta description is too short (should be 120-160 characters)');
            }
            if (descLength > 160) {
                issues.push('Meta description is too long (should be 120-160 characters)');
            }
        }

        // Check H1
        const h1Tags = document.querySelectorAll('h1');
        if (h1Tags.length === 0) {
            issues.push('No H1 tag found');
        }
        if (h1Tags.length > 1) {
            issues.push('Multiple H1 tags found (should be only one)');
        }

        // Check canonical
        if (!document.querySelector('link[rel="canonical"]')) {
            issues.push('Canonical URL is missing');
        }

        // Check images
        const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
        if (imagesWithoutAlt.length > 0) {
            issues.push(`${imagesWithoutAlt.length} images missing alt text`);
        }

        // Log results
        if (issues.length === 0) {
            console.log('✅ SEO validation passed!');
            return { valid: true, issues: [] };
        } else {
            console.warn('⚠️ SEO issues found:', issues);
            return { valid: false, issues };
        }
    }

    /**
     * Generate SEO report
     */
    generateSEOReport() {
        const report = {
            url: window.location.href,
            title: {
                content: document.title,
                length: document.title.length
            },
            description: {
                content: document.querySelector('meta[name="description"]')?.content || '',
                length: document.querySelector('meta[name="description"]')?.content?.length || 0
            },
            headings: {
                h1: Array.from(document.querySelectorAll('h1')).map(h => h.textContent.trim()),
                h2: Array.from(document.querySelectorAll('h2')).map(h => h.textContent.trim()),
                h3: Array.from(document.querySelectorAll('h3')).map(h => h.textContent.trim())
            },
            images: {
                total: document.querySelectorAll('img').length,
                withAlt: document.querySelectorAll('img[alt]').length,
                withoutAlt: document.querySelectorAll('img:not([alt])').length
            },
            links: {
                total: document.querySelectorAll('a').length,
                internal: document.querySelectorAll(`a[href^="${this.baseURL}"], a[href^="/"]`).length,
                external: document.querySelectorAll('a[href^="http"]:not([href^="' + this.baseURL + '"])').length
            },
            structuredData: document.querySelectorAll('script[type="application/ld+json"]').length,
            validation: this.validateSEO()
        };

        console.table(report);
        return report;
    }

    /**
     * Initialize SEO optimizations
     */
    init() {
        this.optimizeImages();
        this.optimizeInternalLinks();
        this.addLastModified();

        console.log('SEO Utilities initialized');

        // Run validation in development
        if (window.location.hostname === 'localhost') {
            setTimeout(() => {
                this.validateSEO();
            }, 1000);
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        window.SEOUtils = new SEOUtilities();
        window.SEOUtils.init();
    });
} else {
    window.SEOUtils = new SEOUtilities();
    window.SEOUtils.init();
}

console.log('SEO Utilities loaded');
