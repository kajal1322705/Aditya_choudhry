/**
 * Analytics Module
 * Simple privacy-friendly analytics tracking
 */
export class AnalyticsModule {
    constructor() {
        this.events = [];
        this.sessionStart = Date.now();
        this.init();
    }

    init() {
        this.trackPageView();
        this.trackScrollDepth();
        this.trackClicks();
        this.trackTimeOnPage();
        this.displayAnalyticsBadge();
    }

    trackPageView() {
        this.logEvent('page_view', {
            page: window.location.pathname,
            referrer: document.referrer,
            timestamp: new Date().toISOString()
        });
    }

    trackScrollDepth() {
        let maxScroll = 0;
        const milestones = [25, 50, 75, 100];
        const tracked = new Set();

        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                
                milestones.forEach(milestone => {
                    if (scrollPercent >= milestone && !tracked.has(milestone)) {
                        tracked.add(milestone);
                        this.logEvent('scroll_depth', { depth: milestone });
                    }
                });
            }
        }, { passive: true });
    }

    trackClicks() {
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a, button');
            if (!target) return;

            const data = {
                type: target.tagName.toLowerCase(),
                text: target.textContent?.slice(0, 50) || '',
                href: target.href || '',
                class: target.className
            };

            // Track specific elements
            if (target.classList.contains('btn-primary') || target.classList.contains('btn-secondary')) {
                this.logEvent('cta_click', data);
            } else if (target.classList.contains('project-link')) {
                this.logEvent('project_click', data);
            } else if (target.classList.contains('social-link') || target.classList.contains('contact-method')) {
                this.logEvent('social_click', data);
            } else if (target.classList.contains('nav-link')) {
                this.logEvent('nav_click', data);
            }
        });
    }

    trackTimeOnPage() {
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - this.sessionStart) / 1000);
            this.logEvent('session_end', { 
                duration_seconds: timeSpent,
                events_count: this.events.length
            });
        });
    }

    logEvent(eventName, data = {}) {
        const event = {
            event: eventName,
            ...data,
            timestamp: Date.now()
        };
        
        this.events.push(event);
        
        // Log to console in development
        if (window.location.hostname === 'localhost' || window.location.hostname.includes('replit')) {
            console.log(`[Analytics] ${eventName}:`, data);
        }

        // Store in localStorage for later analysis
        try {
            const stored = JSON.parse(localStorage.getItem('portfolio_analytics') || '[]');
            stored.push(event);
            // Keep only last 100 events
            if (stored.length > 100) {
                stored.splice(0, stored.length - 100);
            }
            localStorage.setItem('portfolio_analytics', JSON.stringify(stored));
        } catch (e) {
            // Storage might be full or disabled
        }
    }

    displayAnalyticsBadge() {
        // Show a small privacy notice
        const notice = document.createElement('div');
        notice.className = 'analytics-notice';
        notice.innerHTML = `
            <i class="fas fa-chart-line"></i>
            <span>Anonymous analytics enabled</span>
        `;
        notice.style.cssText = `
            position: fixed;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--card-bg, #1e293b);
            color: var(--gray-text, #94a3b8);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.75rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            z-index: 100;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
        
        document.body.appendChild(notice);
        
        // Show briefly then hide
        setTimeout(() => {
            notice.style.opacity = '1';
            setTimeout(() => {
                notice.style.opacity = '0';
                setTimeout(() => notice.remove(), 300);
            }, 3000);
        }, 2000);
    }

    getAnalyticsSummary() {
        const stored = JSON.parse(localStorage.getItem('portfolio_analytics') || '[]');
        return {
            totalEvents: stored.length,
            pageViews: stored.filter(e => e.event === 'page_view').length,
            ctaClicks: stored.filter(e => e.event === 'cta_click').length,
            projectClicks: stored.filter(e => e.event === 'project_click').length
        };
    }
}
