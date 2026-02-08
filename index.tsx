import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import BackgroundCanvas from './components/BackgroundCanvas';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import RefineryDashboard from './pages/RefineryDashboard';
import Footer from './components/Footer';

// Scroll to top on route change
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

// Layout Component
const Layout = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();

    useEffect(() => {
        // Initialize scroll reveal
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        // Observe elements
        const observeElements = () => {
             document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
        };

        observeElements();

        // Re-observe on mutation (e.g. route change or content load)
        const mutationObserver = new MutationObserver(observeElements);
        mutationObserver.observe(document.body, { childList: true, subtree: true });

        // Enhanced smooth scroll with navbar offset
        const handleAnchorClick = (e: Event) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a');

            if (anchor && anchor.hash) {
                const href = anchor.getAttribute('href');
                // Handle both #id and /#id links when on the home page
                if (href && (href.startsWith('#') || (href.startsWith('/#') && window.location.pathname === '/'))) {
                    if (window.location.pathname === '/') {
                        e.preventDefault();
                        const hash = anchor.hash; // e.g., "#contact"
                        const element = document.querySelector(hash);

                        if (element) {
                            const navbarHeight = 80;
                            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                            const offsetPosition = elementPosition - navbarHeight;

                            window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                            });

                            window.history.pushState(null, '', hash);
                        }
                    }
                }
            }
        };

        document.addEventListener('click', handleAnchorClick);

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
            document.removeEventListener('click', handleAnchorClick);
        };
    }, [location.pathname]);

    return (
        <>
            <ScrollToTop />
            {children}
        </>
    );
};

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={
                        <>
                            <BackgroundCanvas />
                            <Navbar />
                            <LandingPage />
                            <Footer />
                        </>
                    } />
                    <Route path="/portfolio/refinery-dashboard" element={<RefineryDashboard />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
