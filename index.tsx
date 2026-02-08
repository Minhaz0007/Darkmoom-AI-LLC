import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import BackgroundCanvas from './components/BackgroundCanvas';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import RefineryDashboard from './pages/RefineryDashboard';

const Layout = () => {
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

        // Small timeout to allow DOM to update
        const timeout = setTimeout(() => {
            document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
        }, 100);

        return () => {
            clearTimeout(timeout);
            observer.disconnect();
        }
    }, [location.pathname]);

    useEffect(() => {
        // Enhanced smooth scroll with navbar offset
        const handleAnchorClick = (e: Event) => {
            const targetElement = e.target as HTMLElement;
            const anchor = targetElement.closest('a');
            if (anchor && anchor.hash) {
                const href = anchor.getAttribute('href');
                // Only hijack if it's a hash link on the current page (starts with #)
                if (href?.startsWith('#')) {
                    e.preventDefault();
                    const element = document.querySelector(href);
                    if (element) {
                        const navbarHeight = 80;
                        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = elementPosition - navbarHeight;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        };

        document.addEventListener('click', handleAnchorClick);

        return () => {
            document.removeEventListener('click', handleAnchorClick);
        };
    }, []);

    return (
        <>
            <BackgroundCanvas />
            <Navbar />
            <main className="relative z-10">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/case-study/refinery-dashboard" element={<RefineryDashboard />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
};

const App = () => {
    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
