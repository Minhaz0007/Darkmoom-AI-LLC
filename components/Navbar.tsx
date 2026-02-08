import React, { useEffect, useState } from 'react';
import { Mail, X, Menu } from 'lucide-react';
import logo from '../darkmoon-brand-logo.png';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('contact@darkmoonai.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav h-16' : 'bg-transparent h-20'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <a href="/#home" className={`flex items-center gap-2 group cursor-pointer transition-opacity duration-300 ${mobileMenuOpen ? 'md:opacity-100 opacity-0 pointer-events-none md:pointer-events-auto' : 'opacity-100'}`}>
            <div className="transform group-hover:scale-110 transition-transform duration-300">
                <img src={logo} alt="Darkmoon AI Logo" className="h-10 w-auto object-contain" />
            </div>
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-white">DARKMOON <span className="gradient-text">AI</span></span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {['Portfolio', 'Process', 'Solutions'].map((item) => (
                <a key={item} href={`/#${item.toLowerCase()}`} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    {item}
                </a>
            ))}
            <button onClick={copyEmail} className="relative flex items-center gap-2 px-4 py-2 bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-lg hover:border-brand-400 transition-all group cursor-pointer">
              <Mail className="h-4 w-4 text-brand-400" />
              <span className="font-bold text-sm text-slate-200 group-hover:text-brand-400 transition-colors">contact@darkmoonai.com</span>
              {emailCopied && (
                <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-600 text-white text-xs rounded-lg shadow-lg whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>
            <a href="/#contact" className="relative px-6 py-2.5 bg-brand-600 text-white rounded-full text-sm font-semibold hover:bg-brand-500 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.5)] animate-pulse">
              Contact Us
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu-overlay"
            className="md:hidden text-slate-200 p-2 rounded-lg transition-colors active:scale-90 z-[60]"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-overlay"
          className="fixed inset-0 bg-slate-950/95 backdrop-blur-xl z-[55] md:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
          style={{ touchAction: 'none' }}
        >
          <div
            className="flex flex-col items-center justify-center h-full space-y-8 px-6 animate-slide-down"
            onClick={(e) => e.stopPropagation()}
          >
            {['Portfolio', 'Process', 'Solutions'].map((item, index) => (
              <a
                key={item}
                href={`/#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-display font-bold text-slate-200 hover:text-brand-400 transition-all duration-300 hover:scale-110 active:scale-95"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => { copyEmail(); setMobileMenuOpen(false); }}
              className="relative text-xl font-bold text-brand-400 hover:text-brand-300 transition-all duration-300 hover:scale-110 active:scale-95"
              style={{ animationDelay: '200ms' }}
            >
              contact@darkmoonai.com
              {emailCopied && (
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap animate-fade-in">
                  Copied!
                </span>
              )}
            </button>
            <a
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 px-10 py-4 bg-brand-600 text-white rounded-full font-bold text-xl shadow-xl hover:bg-brand-700 transition-all duration-300 hover:scale-110 active:scale-95"
              style={{ animationDelay: '300ms' }}
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
