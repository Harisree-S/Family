import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const location = useLocation();
    const scrollYRef = useRef(0);

    useLayoutEffect(() => {
        // Disable browser's default scroll restoration to avoid conflicts
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    }, []);

    // Track scroll position on Home
    useLayoutEffect(() => {
        if (location.pathname !== '/') return;

        const handleScroll = () => {
            scrollYRef.current = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);

        // Save on cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
            // Save the tracked value, fallback to current window.scrollY if ref is 0 (just in case)
            const valueToSave = scrollYRef.current > 0 ? scrollYRef.current : window.scrollY;
            sessionStorage.setItem('homeScrollY', valueToSave.toString());
        };
    }, [location.pathname]);

    // Restore scroll position
    useLayoutEffect(() => {
        if (location.pathname === '/') {
            const savedY = sessionStorage.getItem('homeScrollY');

            if (savedY) {
                const targetY = parseInt(savedY, 10);

                // Immediate attempt to restore scroll position
                window.scrollTo({ top: targetY, behavior: 'instant' });

                // Retry multiple times to account for dynamic content/images loading
                // Extended retries to handle slower network/image loading
                [50, 100, 300, 500, 1000, 2000].forEach(delay => {
                    setTimeout(() => window.scrollTo({ top: targetY, behavior: 'instant' }), delay);
                });
            }
        } else {
            // Normal navigation to other pages - scroll to top
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    }, [location.pathname]);

    return null;
};

export default ScrollToTop;
