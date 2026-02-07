/**
 * Live SDY - Interactive JavaScript
 * Handles dynamic data updates, countdown timer, and user interactions
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        DRAW_TIME: '13:45',
        TIMEZONE: 'Asia/Jakarta',
        AUTO_REFRESH_INTERVAL: 60000, // 1 minute
        API_ENDPOINT: '/api/sdy-data' // Placeholder for future API integration
    };

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initCountdown();
        initSmoothScroll();
        initLastUpdate();
        initAutoRefresh();
        initLiveBadge();
    });

    /**
     * Live Draw Countdown Timer
     */
    function initCountdown() {
        const countdownElements = document.querySelectorAll('[data-countdown]');
        if (countdownElements.length === 0) return;

        function updateCountdown() {
            const now = new Date();
            const currentTime = now.toLocaleString('en-US', {
                timeZone: CONFIG.TIMEZONE,
                hour12: false
            });

            const today = new Date(currentTime);
            const [hours, minutes] = CONFIG.DRAW_TIME.split(':');

            const drawTime = new Date(today);
            drawTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

            // If draw time has passed today, set for tomorrow
            if (today > drawTime) {
                drawTime.setDate(drawTime.getDate() + 1);
            }

            const diff = drawTime - today;

            if (diff > 0) {
                const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
                const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);

                countdownElements.forEach(el => {
                    el.textContent = `${String(hoursLeft).padStart(2, '0')}:${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
                });
            } else {
                countdownElements.forEach(el => {
                    el.textContent = 'LIVE NOW';
                    el.classList.add('animate-pulse');
                });
            }
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    /**
     * Smooth Scroll Navigation
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Update Last Modified Timestamp
     */
    function initLastUpdate() {
        const timestampElements = document.querySelectorAll('[data-last-update]');
        if (timestampElements.length === 0) return;

        const now = new Date();
        const options = {
            timeZone: CONFIG.TIMEZONE,
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        };

        const formattedTime = now.toLocaleString('id-ID', options);

        timestampElements.forEach(el => {
            el.textContent = formattedTime;
        });
    }

    /**
     * Auto Refresh Data (Placeholder for future API integration)
     */
    function initAutoRefresh() {
        setInterval(function() {
            // Placeholder for future API call to fetch latest SDY data
            // Example: fetchLatestSDYData();
            console.log('Auto-refresh triggered at:', new Date().toLocaleTimeString());
        }, CONFIG.AUTO_REFRESH_INTERVAL);
    }

    /**
     * Live Badge Animation
     */
    function initLiveBadge() {
        const liveBadges = document.querySelectorAll('.live-badge');

        liveBadges.forEach(badge => {
            // Check if current time is near draw time (within 15 minutes before or after)
            const now = new Date();
            const [hours, minutes] = CONFIG.DRAW_TIME.split(':');
            const drawTime = new Date(now);
            drawTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

            const timeDiff = Math.abs(now - drawTime) / 60000; // difference in minutes

            if (timeDiff <= 15) {
                badge.classList.add('pulse-glow');
            }
        });
    }

    /**
     * Table Row Highlighting
     */
    function initTableHighlight() {
        const tableRows = document.querySelectorAll('.data-table tbody tr');

        tableRows.forEach((row, index) => {
            row.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
                this.style.transition = 'transform 0.2s ease';
            });

            row.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });

            // Highlight today's row
            if (index === 0) {
                row.classList.add('bg-emerald-900', 'bg-opacity-20');
            }
        });
    }

    // Call table highlight after DOM loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTableHighlight);
    } else {
        initTableHighlight();
    }

    /**
     * Copy to Clipboard Functionality
     */
    function initCopyToClipboard() {
        const copyButtons = document.querySelectorAll('[data-copy]');

        copyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const textToCopy = this.getAttribute('data-copy');

                navigator.clipboard.writeText(textToCopy).then(() => {
                    // Show success feedback
                    const originalText = this.textContent;
                    this.textContent = 'Tersalin!';
                    this.classList.add('bg-green-600');

                    setTimeout(() => {
                        this.textContent = originalText;
                        this.classList.remove('bg-green-600');
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy:', err);
                });
            });
        });
    }

    initCopyToClipboard();

    /**
     * Generate Random SDY Data (Demo Purpose Only)
     * In production, this should fetch from real API
     */
    function generateDemoData() {
        function randomNumber() {
            return Math.floor(1000 + Math.random() * 9000);
        }

        return {
            prize1: randomNumber(),
            prize2: randomNumber(),
            prize3: randomNumber(),
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Fetch Latest SDY Data (Placeholder)
     * Replace this with actual API integration
     */
    async function fetchLatestSDYData() {
        try {
            // In production, replace with actual API call
            // const response = await fetch(CONFIG.API_ENDPOINT);
            // const data = await response.json();

            // Demo data for testing
            const demoData = generateDemoData();
            console.log('Demo SDY Data:', demoData);

            // Update UI with new data
            updateDataTable(demoData);

        } catch (error) {
            console.error('Error fetching SDY data:', error);
        }
    }

    /**
     * Update Data Table with New Results
     */
    function updateDataTable(data) {
        const tableBody = document.querySelector('.data-table tbody');
        if (!tableBody) return;

        // Create new row
        const newRow = document.createElement('tr');
        const now = new Date();
        const dayName = now.toLocaleDateString('id-ID', { weekday: 'long' });
        const dateStr = now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

        newRow.innerHTML = `
            <td>${dayName}</td>
            <td>${dateStr}</td>
            <td class="text-emerald-400 font-bold">${data.prize1}</td>
            <td class="text-emerald-400 font-bold">${data.prize2}</td>
            <td class="text-emerald-400 font-bold">${data.prize3}</td>
        `;

        // Add animation
        newRow.style.opacity = '0';
        newRow.style.transform = 'translateY(-10px)';

        // Insert at top
        tableBody.insertBefore(newRow, tableBody.firstChild);

        // Animate in
        setTimeout(() => {
            newRow.style.transition = 'all 0.5s ease';
            newRow.style.opacity = '1';
            newRow.style.transform = 'translateY(0)';
        }, 10);

        // Remove old rows if more than 7
        while (tableBody.children.length > 7) {
            tableBody.removeChild(tableBody.lastChild);
        }

        // Update last modified time
        initLastUpdate();
    }

    /**
     * Visibility Change Handler
     * Refresh data when user returns to tab
     */
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            initLastUpdate();
            console.log('Tab visible - refreshing data');
        }
    });

    /**
     * Share Functionality
     */
    function initShare() {
        const shareButtons = document.querySelectorAll('[data-share]');

        shareButtons.forEach(button => {
            button.addEventListener('click', async function() {
                const shareData = {
                    title: 'Live SDY Hari Ini',
                    text: 'Lihat hasil keluaran SDY terbaru!',
                    url: window.location.href
                };

                try {
                    if (navigator.share) {
                        await navigator.share(shareData);
                    } else {
                        // Fallback: copy URL to clipboard
                        await navigator.clipboard.writeText(window.location.href);
                        alert('Link berhasil disalin!');
                    }
                } catch (err) {
                    console.error('Error sharing:', err);
                }
            });
        });
    }

    initShare();

    /**
     * Print Functionality
     */
    function initPrint() {
        const printButtons = document.querySelectorAll('[data-print]');

        printButtons.forEach(button => {
            button.addEventListener('click', function() {
                window.print();
            });
        });
    }

    initPrint();

    /**
     * Search/Filter Data Table
     */
    function initTableSearch() {
        const searchInput = document.querySelector('[data-table-search]');
        if (!searchInput) return;

        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const tableRows = document.querySelectorAll('.data-table tbody tr');

            tableRows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    initTableSearch();

    // Expose some functions globally for external use
    window.LiveSDY = {
        fetchData: fetchLatestSDYData,
        updateTable: updateDataTable,
        generateDemo: generateDemoData
    };

    console.log('Live SDY JavaScript initialized successfully');

})();
