import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackgroundCanvas from './components/BackgroundCanvas';
import LandingPage from './pages/LandingPage';
import CaseStudy from './pages/CaseStudy';

const App = () => {
    return (
        <BrowserRouter>
            <BackgroundCanvas />
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/case-study" element={<CaseStudy />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
