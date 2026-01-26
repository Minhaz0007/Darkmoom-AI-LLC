import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Mail, ChevronDown, Check, X, Menu
} from 'lucide-react';

// --- COMPONENTS ---

import logo from './darkmoon-ai-logo-white.svg';

const BackgroundCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width: number, height: number;
    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const animate = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const gap = 30;
      const rows = Math.ceil(height / gap);
      const cols = Math.ceil(width / gap);

      ctx.fillStyle = 'rgba(56, 189, 248, 0.2)'; // Subtle Cyan Glow

      for (let row = 0; row <= rows; row++) {
        for (let col = 0; col <= cols; col++) {
          const x = col * gap;
          const baseY = row * gap;

          // Wave calculation
          // frequency: determines how tight the waves are
          // amplitude: how high/low they go
          // time: moves the wave
          const yOffset = Math.sin(x * 0.01 + time + row * 0.1) * 10;
          const y = baseY + yOffset;

          // Simple culling
          if (x < -10 || x > width + 10 || y < -10 || y > height + 10) continue;

          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} id="bg-canvas" />;
};

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
          <a href="#home" className={`flex items-center gap-2 group cursor-pointer transition-opacity duration-300 ${mobileMenuOpen ? 'md:opacity-100 opacity-0 pointer-events-none md:pointer-events-auto' : 'opacity-100'}`}>
            <div className="transform group-hover:scale-110 transition-transform duration-300">
                <img src={logo} alt="Darkmoon AI Logo" className="h-10 w-auto object-contain" />
            </div>
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-white">DARKMOON <span className="gradient-text">AI</span></span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {['Process', 'Solutions'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
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
            <a href="#contact" className="relative px-6 py-2.5 bg-brand-600 text-white rounded-full text-sm font-semibold hover:bg-brand-500 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.5)] animate-pulse">
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
            {['Process', 'Solutions'].map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
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
              href="#contact"
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

const Hero = () => (
  <section id="home" className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="max-w-5xl mx-auto w-full">
      <div className="text-center animate-fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-700/50 shadow-sm mb-6 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-brand-400 animate-pulse"></span>
          <span className="text-xs font-semibold text-brand-100">Accepting New Clients</span>
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-bold mb-6 leading-tight">
          <span className="gradient-text">Automate Your Manual Work</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          Custom automation that eliminates repetitive tasks and scales your business.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="px-8 py-4 bg-brand-600 text-white rounded-full font-semibold hover:bg-brand-500 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(2,132,199,0.5)]">
            Get Started
          </a>
          <a href="#solutions" className="px-8 py-4 bg-slate-900/30 text-slate-300 border border-slate-700 rounded-full font-semibold hover:border-brand-400 hover:text-brand-400 transition-all backdrop-blur-sm">
            View Solutions
          </a>
        </div>
      </div>
    </div>
  </section>
);


const Process = () => (
  <section id="process" className="relative z-10 py-24 md:py-32 bg-background-dark overflow-hidden font-grotesk">
    {/* Ambient Background Gradients */}
    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

    <div className="container mx-auto px-4 sm:px-6 relative z-10">
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-20 md:mb-32">
        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-4 border border-primary/20">Our Process</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">How We Automate Success</h2>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          We transform complex workflows into seamless automated systems through a rigorous, proven four-step methodology.
        </p>
      </div>

      {/* Process Timeline Container */}
      <div className="relative max-w-6xl mx-auto">
        {/* Center Pulse Line (Visible on Desktop) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -ml-[1px] bg-gradient-to-b from-transparent via-primary to-transparent shadow-neon hidden md:block"></div>

        {/* Step 01: The Audit */}
        <div className="relative flex flex-col md:flex-row items-center justify-between mb-24 md:mb-32 group">
          {/* Icon Left */}
          <div className="w-full md:w-5/12 flex justify-center md:justify-end md:pr-12 lg:pr-16 mb-8 md:mb-0 order-1 md:order-1">
            <div className="relative w-full max-w-sm aspect-square glass-card rounded-2xl p-2 group-hover:-translate-y-2 transition-transform duration-500">
              <div className="absolute inset-0 bg-primary/10 blur-2xl -z-10 rounded-full"></div>
              <div className="w-full h-full bg-surface-dark/50 rounded-xl overflow-hidden relative">
                <div
                    className="w-full h-full bg-cover bg-center opacity-80"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCA4FtjmCFTHXSGcSMvzfTAFOUZ2PiEumxnF4dmGTQZ3I-QscC9-ngwGIodCGqZ8u_sWnicKei1bUKWHmDqMbSLF_FTGp63TO2vFMnNOyWUVkBmv7GjbtyOdS-f-7-XHYysGBVKCbA_LKpt3OPPTfvWkd_PjqDnHFMAP2QeKMVSOHnBFDeUpOIMNQO3_LjjvXb8zei8XTgPFLUVvISne2p-1VijzuwbafmVlRNMdudpXODPwrcATYJ8PhROmCkFlXGKaY_uW5_Bv11F')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                {/* Decorative UI Element overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-sm">analytics</span>
                    </div>
                    <span className="text-white font-medium text-sm">System Analysis</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Center Dot */}
          <div className="absolute left-1/2 -ml-3 md:flex items-center justify-center w-6 h-6 hidden order-2">
            <div className="w-4 h-4 bg-background-dark border-2 border-primary rounded-full shadow-neon z-10"></div>
          </div>
          {/* Text Right */}
          <div className="w-full md:w-5/12 md:pl-12 lg:pl-16 order-2 md:order-3 text-center md:text-left">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-slate-600 opacity-30">01</span>
              <h3 className="text-3xl font-bold text-white">The Audit</h3>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              We perform a deep dive into your current workflows to identify bottlenecks, inefficiencies, and hidden opportunities for automation.
            </p>
            <ul className="space-y-3 inline-block md:block text-left">
              <li className="flex items-center gap-3 text-slate-300">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                <span>Workflow mapping</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                <span>Tech stack review</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                <span>ROI Projection</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Step 02: The Design */}
        <div className="relative flex flex-col md:flex-row items-center justify-between mb-24 md:mb-32 group">
          {/* Text Left */}
          <div className="w-full md:w-5/12 md:pr-12 lg:pr-16 order-2 md:order-1 text-center md:text-right">
            <div className="inline-flex items-center gap-3 mb-4 md:flex-row-reverse">
              <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-bl from-primary to-slate-600 opacity-30">02</span>
              <h3 className="text-3xl font-bold text-white">The Design</h3>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              Architecting a custom solution tailored to your specific needs. We create a blueprint that bridges your tools seamlessly.
            </p>
            <ul className="space-y-3 inline-block md:flex md:flex-col md:items-end text-left md:text-right w-full">
              <li className="flex items-center gap-3 text-slate-300 md:flex-row-reverse">
                <span className="material-symbols-outlined text-primary text-xl">architecture</span>
                <span>Custom Blueprinting</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300 md:flex-row-reverse">
                <span className="material-symbols-outlined text-primary text-xl">schema</span>
                <span>Data Flow Architecture</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300 md:flex-row-reverse">
                <span className="material-symbols-outlined text-primary text-xl">security</span>
                <span>Security Protocol Plan</span>
              </li>
            </ul>
          </div>
          {/* Center Dot */}
          <div className="absolute left-1/2 -ml-3 md:flex items-center justify-center w-6 h-6 hidden order-2">
            <div className="w-4 h-4 bg-background-dark border-2 border-primary rounded-full shadow-neon z-10"></div>
          </div>
          {/* Icon Right */}
          <div className="w-full md:w-5/12 flex justify-center md:justify-start md:pl-12 lg:pl-16 mb-8 md:mb-0 order-1 md:order-3">
            <div className="relative w-full max-w-sm aspect-square glass-card rounded-2xl p-2 group-hover:-translate-y-2 transition-transform duration-500">
              <div className="absolute inset-0 bg-primary/10 blur-2xl -z-10 rounded-full"></div>
              <div className="w-full h-full bg-surface-dark/50 rounded-xl overflow-hidden relative">
                <div
                    className="w-full h-full bg-cover bg-center opacity-80"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA2HfrFIEujFy53QFfo2CmRXdL6cWXzR2-YQxXEz55z1bjgcEhDoxLor4e_mcdvZqWtvxDWhvuL2FBab2Q_9DSKZYy2LU24IHnlSOFv5XkaZiIHp7IMdcHHR96PZYO4T7zvBrpKVvfluI2VxTq0L2zrdgtv4XSTAVEA7xvWLxWmpo3RrceI0uazXMsxaYldkP5Kdx7e0Ga8XsznGqd3MYEvgShc5yLRWeuw4MBe4tMjbgW_hkBfIFl-KwO51vVIroKL6WpRYBm138zN')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                {/* Decorative UI Element overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4">
                  <div className="bg-black/40 backdrop-blur-md rounded-lg border border-white/10 p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="w-20 h-2 bg-white/20 rounded"></div>
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[10px] text-primary">settings</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-16 bg-white/5 rounded border border-dashed border-white/10"></div>
                      <div className="h-16 bg-white/5 rounded border border-dashed border-white/10"></div>
                      <div className="col-span-2 h-8 bg-primary/20 rounded border border-primary/30"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 03: The Build */}
        <div className="relative flex flex-col md:flex-row items-center justify-between mb-24 md:mb-32 group">
          {/* Icon Left */}
          <div className="w-full md:w-5/12 flex justify-center md:justify-end md:pr-12 lg:pr-16 mb-8 md:mb-0 order-1 md:order-1">
            <div className="relative w-full max-w-sm aspect-square glass-card rounded-2xl p-2 group-hover:-translate-y-2 transition-transform duration-500">
              <div className="absolute inset-0 bg-primary/10 blur-2xl -z-10 rounded-full"></div>
              <div className="w-full h-full bg-surface-dark/50 rounded-xl overflow-hidden relative">
                <div
                    className="w-full h-full bg-cover bg-center opacity-80"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBGS2pxeAPYXMIyvM_GwSaGk0Hjazyc75CwNPz0dMtDgg0ASrAe9HlieE6GSwAY7ZTpM4Qyf-FeWfkFdOG7Xi2MCf8KWmDJgdFd5tFSXqWeqHsgCS2PNX10PBfGrBab3Y5DXP56HBWRJ4kD-YFA9drEpw_b6SiO_rkaPC3pHJPo9BNcdMHBmw0jhVLtnAaVMRTwHoNBlsSpo2IwKRigmjIfUbjXsT4fJEfEbXj9bsVIBMCQ-V08HB0tJCIaykoLojozDwik8nZM85fb')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                {/* Decorative UI Element overlay */}
                <div className="absolute bottom-6 right-6 p-3 rounded-lg bg-black/60 backdrop-blur-md border border-primary/30 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <div className="text-xs font-mono text-primary">Compiling Build...</div>
                </div>
              </div>
            </div>
          </div>
          {/* Center Dot */}
          <div className="absolute left-1/2 -ml-3 md:flex items-center justify-center w-6 h-6 hidden order-2">
            <div className="w-4 h-4 bg-background-dark border-2 border-primary rounded-full shadow-neon z-10"></div>
          </div>
          {/* Text Right */}
          <div className="w-full md:w-5/12 md:pl-12 lg:pl-16 order-2 md:order-3 text-center md:text-left">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-slate-600 opacity-30">03</span>
              <h3 className="text-3xl font-bold text-white">The Build</h3>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              Rapid implementation using low-code tools and custom scripts. We bring the design to life with clean, efficient code.
            </p>
            <ul className="space-y-3 inline-block md:block text-left">
              <li className="flex items-center gap-3 text-slate-300">
                <span className="material-symbols-outlined text-primary text-xl">terminal</span>
                <span>API Integration</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <span className="material-symbols-outlined text-primary text-xl">webhook</span>
                <span>Low-code Development</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <span className="material-symbols-outlined text-primary text-xl">bug_report</span>
                <span>Rigorous Testing</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Step 04: The Scale */}
        <div className="relative flex flex-col md:flex-row items-center justify-between mb-10 group">
          {/* Text Left */}
          <div className="w-full md:w-5/12 md:pr-12 lg:pr-16 order-2 md:order-1 text-center md:text-right">
            <div className="inline-flex items-center gap-3 mb-4 md:flex-row-reverse">
              <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-bl from-primary to-slate-600 opacity-30">04</span>
              <h3 className="text-3xl font-bold text-white">The Scale</h3>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              Monitoring performance and expanding automation across the organization. We ensure your systems grow as you grow.
            </p>
            <ul className="space-y-3 inline-block md:flex md:flex-col md:items-end text-left md:text-right w-full">
              <li className="flex items-center gap-3 text-slate-300 md:flex-row-reverse">
                <span className="material-symbols-outlined text-primary text-xl">monitoring</span>
                <span>Performance Monitoring</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300 md:flex-row-reverse">
                <span className="material-symbols-outlined text-primary text-xl">rocket_launch</span>
                <span>Feature Expansion</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300 md:flex-row-reverse">
                <span className="material-symbols-outlined text-primary text-xl">support_agent</span>
                <span>Ongoing Support</span>
              </li>
            </ul>
          </div>
          {/* Center Dot */}
          <div className="absolute left-1/2 -ml-3 md:flex items-center justify-center w-6 h-6 hidden order-2">
            <div className="w-4 h-4 bg-background-dark border-2 border-primary rounded-full shadow-neon z-10"></div>
          </div>
          {/* Icon Right */}
          <div className="w-full md:w-5/12 flex justify-center md:justify-start md:pl-12 lg:pl-16 mb-8 md:mb-0 order-1 md:order-3">
            <div className="relative w-full max-w-sm aspect-square glass-card rounded-2xl p-2 group-hover:-translate-y-2 transition-transform duration-500">
              <div className="absolute inset-0 bg-primary/10 blur-2xl -z-10 rounded-full"></div>
              <div className="w-full h-full bg-surface-dark/50 rounded-xl overflow-hidden relative">
                <div
                    className="w-full h-full bg-cover bg-center opacity-80"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBbg3epSh1Z2J1kZ4A2VODDpehOZajsXWUu1-eo9gGm6BfTyghu8MVqP5oww1rvOBk0K7FLpkOdKoURSd1HQj5TphjaaMAVf3SjqZrpmoZLna2Oh3E-rqLY4XeNNaJ2nNQ3rbH77VfBKyMNV4C86Xstseflq5MiunXSaGzrEC6a_I6qvOH4N1y8AxN7vWxPYnwv3Vu37tdIihEnLYHkXQBkbd8JwvMTV8p70zSIR9GPpDpw-bxIEs9A8ejWG_CGW2RnmQfvkszeAVIa')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                {/* Decorative UI Element overlay */}
                <div className="absolute top-8 right-8 w-24 h-24 rounded-full border-4 border-primary/20 flex items-center justify-center backdrop-blur-sm bg-black/20">
                  <div className="text-center">
                    <span className="block text-xl font-bold text-primary">+240%</span>
                    <span className="text-[10px] uppercase text-slate-400 tracking-wider">Growth</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* CTA Section (Integrated) */}
    <div className="relative py-20 border-t border-white/5 bg-background-dark">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to streamline your workflow?</h2>
        <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">Let's build your custom automation solution today. Start with a free audit.</p>
        <div className="flex justify-center gap-4 flex-col sm:flex-row">
          <button className="bg-primary hover:bg-cyan-400 text-background-dark px-8 py-4 rounded-lg text-base font-bold transition-all shadow-neon hover:shadow-[0_0_25px_rgba(6,208,249,0.7)] flex items-center justify-center gap-2">
            <span>Start Your Audit</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
          <button className="bg-transparent border border-slate-600 hover:border-white text-white px-8 py-4 rounded-lg text-base font-medium transition-all">
            View Case Studies
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Solutions = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const services = [
        { title: "Web & Mobile Apps", points: ["Custom web applications", "Mobile apps for iOS/Android", "API integration"] },
        { title: "Digital Signage", points: ["Cloud-controlled displays", "Auto-scheduled content", "Offline mode"] },
        { title: "System Integration", points: ["Connect CRM to ERP", "Automated data sync", "Real-time updates"] },
        { title: "Onboarding Automation", points: ["Document data extraction", "Auto-fill forms", "Reduce manual entry"] },
        { title: "Email Campaigns", points: ["Personalized at scale", "Behavioral triggers", "Auto-segmentation"] },
        { title: "Database Automation", points: ["SQL query automation", "Data cleanup", "Scheduled reports"] },
        { title: "Inventory Monitoring", points: ["Real-time stock tracking", "Auto vendor alerts", "Reorder triggers"] },
        { title: "Proposal Generation", points: ["AI-powered drafts", "Bulk creation", "Custom templates"] },
        { title: "Business Reporting", points: ["Automated dashboards", "PDF report delivery", "KPI tracking"] },
        { title: "Big Data Analytics", points: ["Large-scale processing", "Azure Databricks", "Strategic insights"] },
        { title: "Custom Business Apps", points: ["Tailored workflows", "Mobile-first", "Internal tools"] },
        { title: "App Modernization", points: ["UI/UX upgrade", "Performance boost", "Code refactoring"] }
    ];

    return (
        <section id="solutions" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10 reveal-on-scroll">
                    <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3 text-white">What We Build</h2>
                    <p className="text-slate-400">Click to expand details.</p>
                </div>

                <div className="space-y-3">
                    {services.map((service, index) => (
                        <div key={index} className="glass-card rounded-xl overflow-hidden hover:border-brand-400/50 hover:shadow-[0_0_15px_rgba(2,132,199,0.2)] transition-all duration-300 reveal-on-scroll" style={{ transitionDelay: `${index * 50}ms` }}>
                            <button
                                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                aria-expanded={expandedIndex === index}
                                aria-controls={`solution-content-${index}`}
                                className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-800/50 transition-all duration-300"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${expandedIndex === index ? 'bg-brand-400 scale-125 shadow-[0_0_10px_#38bdf8]' : 'bg-slate-600'}`}></div>
                                    <h3 id={`solution-heading-${index}`} className={`font-bold transition-colors duration-300 ${expandedIndex === index ? 'text-brand-400' : 'text-slate-200'}`}>{service.title}</h3>
                                </div>
                                <ChevronDown className={`h-5 w-5 text-slate-500 transition-all duration-500 ${expandedIndex === index ? 'rotate-180 text-brand-400' : ''}`} />
                            </button>

                            <div
                                id={`solution-content-${index}`}
                                role="region"
                                aria-labelledby={`solution-heading-${index}`}
                                className={`card-content ${expandedIndex === index ? 'expanded' : ''}`}
                            >
                                <div className="px-5 pb-5 pl-12">
                                    <ul className="space-y-2.5">
                                        {service.points.map((point, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-400 transform transition-all duration-300" style={{ transitionDelay: `${i * 50}ms` }}>
                                                <Check className="h-4 w-4 text-brand-400 mt-0.5 flex-shrink-0" />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


const FAQ = () => {
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

    const faqs = [
        { q: "Is my data secure?", a: "Yes. Industry-standard encryption. Data flows through secure pipes without permanent storage." },
        { q: "Monthly fees?", a: "No. One-time project fee. You own the code and pay for your own hosting." },
        { q: "How long?", a: "Starter: 5-7 days. Growth: 2-3 weeks." }
    ];

    return (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl font-bold mb-8 text-center text-white reveal-on-scroll">FAQ</h2>
                <div className="space-y-3">
                    {faqs.map((item, i) => (
                        <div key={i} className="glass-card rounded-lg overflow-hidden reveal-on-scroll" style={{ transitionDelay: `${i * 100}ms` }}>
                            <button
                                onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
                                aria-expanded={expandedFAQ === i}
                                aria-controls={`faq-content-${i}`}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/50 transition-colors"
                            >
                                <h3 id={`faq-heading-${i}`} className="font-bold text-slate-200">{item.q}</h3>
                                <ChevronDown className={`h-5 w-5 text-slate-500 transition-transform flex-shrink-0 ${expandedFAQ === i ? 'rotate-180 text-brand-400' : ''}`} />
                            </button>
                            {expandedFAQ === i && (
                                <div
                                    id={`faq-content-${i}`}
                                    role="region"
                                    aria-labelledby={`faq-heading-${i}`}
                                    className="px-4 pb-4"
                                >
                                    <p className="text-slate-400 text-sm">{item.a}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Contact = () => {
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

    return (
        <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto">
                <div className="text-center mb-8 reveal-on-scroll">
                    <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3 text-white">Get Started</h2>
                    <p className="text-slate-400">Response within 24 hours.</p>
                </div>

                <form name="contact" method="POST" action="/#contact" data-netlify="true" data-netlify-honeypot="bot-field" className="space-y-4 glass-card p-6 sm:p-8 rounded-2xl shadow-xl reveal-on-scroll delay-100">
                    <input type="hidden" name="form-name" value="contact" />
                    <p className="hidden">
                        <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-semibold text-slate-300 mb-1 block">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                required
                                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 outline-none transition-all placeholder:text-slate-600"
                                placeholder="Jane"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-slate-300 mb-1 block">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                required
                                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 outline-none transition-all placeholder:text-slate-600"
                                placeholder="Doe"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-slate-300 mb-1 block">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 outline-none transition-all placeholder:text-slate-600"
                            placeholder="jane@company.com"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-slate-300 mb-1 block">What do you need?</label>
                        <textarea
                            name="message"
                            rows={4}
                            required
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 outline-none transition-all resize-none placeholder:text-slate-600"
                            placeholder="Describe your automation needs..."
                        ></textarea>
                    </div>

                    <button type="submit" className="w-full py-4 bg-brand-600 text-white rounded-lg font-bold hover:bg-brand-500 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(2,132,199,0.4)]">
                        Send Message
                    </button>
                </form>

                <div className="text-center mt-6 reveal-on-scroll delay-200">
                    <div className="relative inline-block">
                        <button onClick={copyEmail} className="text-slate-500 text-sm hover:text-brand-400 transition-colors cursor-pointer">
                            contact@darkmoonai.com
                        </button>
                        {emailCopied && (
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-600 text-white text-xs rounded-lg shadow-lg whitespace-nowrap">
                                Copied!
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
            <p className="text-slate-500 text-sm">
                © 2025 Darkmoon AI Solution LLC. All rights reserved.
            </p>
        </div>
    </footer>
);

const App = () => {
    useEffect(() => {
        // Initialize scroll reveal
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

        // Enhanced smooth scroll with navbar offset
        const handleAnchorClick = (e: Event) => {
            const target = e.target as HTMLAnchorElement;
            if (target.tagName === 'A' && target.hash) {
                const href = target.getAttribute('href');
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
                <Hero />
                <Process />
                <Solutions />
                <FAQ />
                <Contact />
            </main>
            <Footer />
        </>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);