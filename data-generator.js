/**
 * SDY Data Generator
 * Generates realistic SDY lottery data for demo/testing purposes
 */

class SDYDataGenerator {
    constructor() {
        this.history = [];
        this.currentDate = new Date();
    }

    /**
     * Generate random 4-digit number
     */
    generateNumber() {
        return Math.floor(1000 + Math.random() * 9000);
    }

    /**
     * Generate single draw result
     */
    generateDrawResult(date = new Date()) {
        return {
            date: date,
            day: date.toLocaleDateString('id-ID', { weekday: 'long' }),
            dateString: date.toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }),
            prize1: this.generateNumber(),
            prize2: this.generateNumber(),
            prize3: this.generateNumber(),
            timestamp: date.toISOString()
        };
    }

    /**
     * Generate historical data for past N days
     */
    generateHistory(days = 30) {
        const results = [];
        const today = new Date();

        for (let i = 0; i < days; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            results.push(this.generateDrawResult(date));
        }

        this.history = results;
        return results;
    }

    /**
     * Get today's result
     */
    getTodayResult() {
        return this.generateDrawResult(new Date());
    }

    /**
     * Get this week's results
     */
    getWeekResults() {
        const results = [];
        const today = new Date();

        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            results.push(this.generateDrawResult(date));
        }

        return results;
    }

    /**
     * Get this month's results
     */
    getMonthResults() {
        const results = [];
        const today = new Date();
        const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

        for (let i = 0; i < Math.min(daysInMonth, today.getDate()); i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            results.push(this.generateDrawResult(date));
        }

        return results;
    }

    /**
     * Generate statistics from data
     */
    generateStatistics(data) {
        const allNumbers = [];

        data.forEach(result => {
            allNumbers.push(result.prize1, result.prize2, result.prize3);
        });

        // Calculate frequency
        const frequency = {};
        allNumbers.forEach(num => {
            frequency[num] = (frequency[num] || 0) + 1;
        });

        // Get most frequent numbers
        const sorted = Object.entries(frequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        return {
            totalDraws: data.length,
            totalNumbers: allNumbers.length,
            mostFrequent: sorted.map(([num, count]) => ({ number: num, count })),
            average: Math.round(allNumbers.reduce((a, b) => a + b, 0) / allNumbers.length),
            highest: Math.max(...allNumbers),
            lowest: Math.min(...allNumbers)
        };
    }

    /**
     * Format data for table display
     */
    formatForTable(results) {
        return results.map(result => ({
            day: result.day,
            date: result.dateString,
            prize1: result.prize1,
            prize2: result.prize2,
            prize3: result.prize3
        }));
    }

    /**
     * Export data as JSON
     */
    exportJSON(data) {
        return JSON.stringify(data, null, 2);
    }

    /**
     * Export data as CSV
     */
    exportCSV(data) {
        const headers = ['Hari', 'Tanggal', 'Prize 1', 'Prize 2', 'Prize 3'];
        const rows = data.map(result => [
            result.day,
            result.dateString,
            result.prize1,
            result.prize2,
            result.prize3
        ]);

        const csv = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        return csv;
    }

    /**
     * Search results by date
     */
    searchByDate(dateString) {
        return this.history.filter(result =>
            result.dateString.includes(dateString)
        );
    }

    /**
     * Search results by number
     */
    searchByNumber(number) {
        return this.history.filter(result =>
            result.prize1 === number ||
            result.prize2 === number ||
            result.prize3 === number
        );
    }

    /**
     * Get results by month
     */
    getResultsByMonth(month, year) {
        return this.history.filter(result => {
            const resultDate = new Date(result.date);
            return resultDate.getMonth() === month &&
                   resultDate.getFullYear() === year;
        });
    }

    /**
     * Calculate patterns
     */
    findPatterns(data) {
        const patterns = {
            evenOdd: { even: 0, odd: 0 },
            ranges: { low: 0, mid: 0, high: 0 }, // 1000-3999, 4000-6999, 7000-9999
            consecutive: 0
        };

        data.forEach(result => {
            [result.prize1, result.prize2, result.prize3].forEach(num => {
                // Even/Odd
                if (num % 2 === 0) {
                    patterns.evenOdd.even++;
                } else {
                    patterns.evenOdd.odd++;
                }

                // Ranges
                if (num >= 1000 && num < 4000) {
                    patterns.ranges.low++;
                } else if (num >= 4000 && num < 7000) {
                    patterns.ranges.mid++;
                } else {
                    patterns.ranges.high++;
                }
            });

            // Check consecutive numbers
            const prizes = [result.prize1, result.prize2, result.prize3].sort((a, b) => a - b);
            if (prizes[1] - prizes[0] === 1 || prizes[2] - prizes[1] === 1) {
                patterns.consecutive++;
            }
        });

        return patterns;
    }
}

// Create global instance
if (typeof window !== 'undefined') {
    window.SDYDataGenerator = new SDYDataGenerator();
    console.log('SDY Data Generator initialized');
}

// Export for Node.js environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SDYDataGenerator;
}
