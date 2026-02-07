/**
 * Live SDY Analytics & User Tracking
 * Tracks user interactions and page performance
 */

(function() {
    'use strict';

    const Analytics = {
        // Configuration
        config: {
            trackPageView: true,
            trackClicks: true,
            trackScroll: true,
            trackTime: true,
            debugMode: false
        },

        // Session data
        session: {
            startTime: Date.now(),
            pageViews: 0,
            clicks: 0,
            scrollDepth: 0,
            events: []
        },

        /**
         * Initialize analytics
         */
        init: function() {
            this.trackPageLoad();
            this.setupEventListeners();

            if (this.config.debugMode) {
                console.log('Analytics initialized', this.session);
            }
        },

        /**
         * Track page load
         */
        trackPageLoad: function() {
            this.session.pageViews++;

            const pageData = {
                url: window.location.href,
                title: document.title,
                referrer: document.referrer,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                screenSize: `${window.screen.width}x${window.screen.height}`,
                viewport: `${window.innerWidth}x${window.innerHeight}`
            };

            this.logEvent('page_view', pageData);

            // Track performance metrics
            if (window.performance && window.performance.timing) {
                window.addEventListener('load', () => {
                    setTimeout(() => {
                        this.trackPerformance();
                    }, 0);
                });
            }
        },

        /**
         * Track performance metrics
         */
        trackPerformance: function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
            const firstPaintTime = perfData.responseStart - perfData.navigationStart;

            const metrics = {
                pageLoadTime: Math.round(pageLoadTime),
                domReadyTime: Math.round(domReadyTime),
                firstPaintTime: Math.round(firstPaintTime),
                resourceLoadTime: Math.round(perfData.loadEventEnd - perfData.responseEnd)
            };

            this.logEvent('performance', metrics);

            if (this.config.debugMode) {
                console.log('Performance metrics:', metrics);
            }
        },

        /**
         * Setup event listeners
         */
        setupEventListeners: function() {
            // Track clicks
            if (this.config.trackClicks) {
                document.addEventListener('click', (e) => {
                    this.trackClick(e);
                });
            }

            // Track scroll depth
            if (this.config.trackScroll) {
                let maxScroll = 0;
                window.addEventListener('scroll', () => {
                    const scrollPercent = Math.round(
                        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
                    );

                    if (scrollPercent > maxScroll) {
                        maxScroll = scrollPercent;
                        this.session.scrollDepth = maxScroll;

                        // Log milestone scrolls
                        if ([25, 50, 75, 100].includes(scrollPercent)) {
                            this.logEvent('scroll_depth', { depth: scrollPercent });
                        }
                    }
                });
            }

            // Track time on page
            if (this.config.trackTime) {
                window.addEventListener('beforeunload', () => {
                    this.trackTimeOnPage();
                });

                // Also track on visibility change
                document.addEventListener('visibilitychange', () => {
                    if (document.hidden) {
                        this.trackTimeOnPage();
                    }
                });
            }

            // Track link clicks
            document.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', (e) => {
                    this.trackLinkClick(e.target);
                });
            });

            // Track button clicks
            document.querySelectorAll('button').forEach(button => {
                button.addEventListener('click', (e) => {
                    this.trackButtonClick(e.target);
                });
            });

            // Track form submissions
            document.querySelectorAll('form').forEach(form => {
                form.addEventListener('submit', (e) => {
                    this.trackFormSubmit(e.target);
                });
            });
        },

        /**
         * Track click events
         */
        trackClick: function(event) {
            this.session.clicks++;

            const clickData = {
                element: event.target.tagName,
                className: event.target.className,
                id: event.target.id,
                text: event.target.textContent?.substring(0, 50),
                x: event.clientX,
                y: event.clientY,
                timestamp: new Date().toISOString()
            };

            this.logEvent('click', clickData);
        },

        /**
         * Track link clicks
         */
        trackLinkClick: function(link) {
            const linkData = {
                href: link.href,
                text: link.textContent?.substring(0, 50),
                isExternal: !link.href.includes(window.location.hostname),
                timestamp: new Date().toISOString()
            };

            this.logEvent('link_click', linkData);
        },

        /**
         * Track button clicks
         */
        trackButtonClick: function(button) {
            const buttonData = {
                text: button.textContent?.substring(0, 50),
                id: button.id,
                className: button.className,
                timestamp: new Date().toISOString()
            };

            this.logEvent('button_click', buttonData);
        },

        /**
         * Track form submissions
         */
        trackFormSubmit: function(form) {
            const formData = {
                id: form.id,
                action: form.action,
                method: form.method,
                timestamp: new Date().toISOString()
            };

            this.logEvent('form_submit', formData);
        },

        /**
         * Track time spent on page
         */
        trackTimeOnPage: function() {
            const timeSpent = Date.now() - this.session.startTime;
            const minutes = Math.floor(timeSpent / 60000);
            const seconds = Math.floor((timeSpent % 60000) / 1000);

            this.logEvent('time_on_page', {
                totalMilliseconds: timeSpent,
                formattedTime: `${minutes}m ${seconds}s`
            });
        },

        /**
         * Log custom event
         */
        logEvent: function(eventName, eventData) {
            const event = {
                name: eventName,
                data: eventData,
                timestamp: new Date().toISOString()
            };

            this.session.events.push(event);

            // Send to analytics service (placeholder)
            this.sendToAnalytics(event);

            if (this.config.debugMode) {
                console.log('Event logged:', event);
            }
        },

        /**
         * Send data to analytics service
         * Replace this with actual analytics service integration
         */
        sendToAnalytics: function(event) {
            // Placeholder for Google Analytics, Mixpanel, or custom analytics
            // Example: gtag('event', event.name, event.data);

            // Store in localStorage for demo purposes
            try {
                const storedEvents = JSON.parse(localStorage.getItem('sdy_analytics') || '[]');
                storedEvents.push(event);

                // Keep only last 100 events
                if (storedEvents.length > 100) {
                    storedEvents.shift();
                }

                localStorage.setItem('sdy_analytics', JSON.stringify(storedEvents));
            } catch (e) {
                console.error('Failed to store analytics:', e);
            }
        },

        /**
         * Get session summary
         */
        getSessionSummary: function() {
            return {
                duration: Date.now() - this.session.startTime,
                pageViews: this.session.pageViews,
                clicks: this.session.clicks,
                scrollDepth: this.session.scrollDepth,
                totalEvents: this.session.events.length
            };
        },

        /**
         * Get all stored events
         */
        getStoredEvents: function() {
            try {
                return JSON.parse(localStorage.getItem('sdy_analytics') || '[]');
            } catch (e) {
                return [];
            }
        },

        /**
         * Clear analytics data
         */
        clearData: function() {
            this.session.events = [];
            localStorage.removeItem('sdy_analytics');
            console.log('Analytics data cleared');
        },

        /**
         * Export analytics data
         */
        exportData: function() {
            const data = {
                session: this.getSessionSummary(),
                events: this.session.events
            };

            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `analytics_${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
        },

        /**
         * Track custom conversion
         */
        trackConversion: function(conversionName, conversionValue = null) {
            this.logEvent('conversion', {
                name: conversionName,
                value: conversionValue,
                timestamp: new Date().toISOString()
            });
        },

        /**
         * Track error
         */
        trackError: function(error) {
            this.logEvent('error', {
                message: error.message,
                stack: error.stack,
                timestamp: new Date().toISOString()
            });
        },

        /**
         * Track user engagement score
         */
        calculateEngagementScore: function() {
            const summary = this.getSessionSummary();
            const durationMinutes = summary.duration / 60000;

            // Simple engagement score calculation
            let score = 0;
            score += Math.min(durationMinutes * 10, 50); // Max 50 points for time
            score += Math.min(summary.clicks * 2, 30); // Max 30 points for clicks
            score += Math.min(summary.scrollDepth / 2, 20); // Max 20 points for scroll

            return Math.round(Math.min(score, 100));
        }
    };

    // Track errors automatically
    window.addEventListener('error', function(event) {
        Analytics.trackError(event.error);
    });

    // Initialize analytics when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            Analytics.init();
        });
    } else {
        Analytics.init();
    }

    // Expose Analytics globally
    window.LiveSDYAnalytics = Analytics;

    // Log session summary before page unload
    window.addEventListener('beforeunload', function() {
        const summary = Analytics.getSessionSummary();
        const engagement = Analytics.calculateEngagementScore();

        console.log('Session Summary:', summary);
        console.log('Engagement Score:', engagement);
    });

    console.log('Live SDY Analytics loaded');

})();
