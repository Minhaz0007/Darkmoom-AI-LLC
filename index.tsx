import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Rocket, Mail, Database, Package, FileEdit, BarChart3, 
  CloudCog, Smartphone, Monitor, Layers, Palette, GitMerge,
  ChevronDown, ChevronUp, Check, X, Menu, ArrowRight,
  Search, PenTool, Settings, Cpu
} from 'lucide-react';

// --- COMPONENTS ---

import logo from './darkmoon-ai-logo-white.svg';

interface BackgroundCanvasProps {
  className?: string;
  id?: string;
}

const BackgroundCanvas = ({ className = "fixed inset-0 z-[-1] pointer-events-none", id = "bg-canvas" }: BackgroundCanvasProps) => {
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
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
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

  return <canvas ref={canvasRef} id={id} className={className} />;
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
  <section id="process" className="relative min-h-screen py-20 px-4 flex flex-col items-center justify-center overflow-hidden bg-slate-950">
     {/* Background elements */}
     <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <BackgroundCanvas className="absolute inset-0 opacity-100" id="process-bg" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[120px]"></div>
     </div>

     {/* Title Section */}
     <div className="relative z-10 text-center mb-16 space-y-4">
         <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-brand-500/10 text-brand-400 border border-brand-500/20">
            Our Methodology
         </span>
         <h1 className="text-4xl md:text-6xl font-extrabold font-display tracking-tight text-white">
            How <span className="text-brand-400">We Work</span>
         </h1>
         <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Four simple steps to transform your operational efficiency through strategic automation.
         </p>
     </div>

     {/* Orbital Container */}
     <div className="relative z-10 w-full max-w-5xl mx-auto orbital-container flex items-center justify-center hidden md:flex">
         <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 700">
             <defs>
                 <linearGradient id="lineGradient" x1="0%" x2="100%" y1="0%" y2="100%">
                     <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8"></stop>
                     <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2"></stop>
                 </linearGradient>
                 <filter id="glow">
                     <feGaussianBlur result="coloredBlur" stdDeviation="3"></feGaussianBlur>
                     <feMerge>
                         <feMergeNode in="coloredBlur"></feMergeNode>
                         <feMergeNode in="SourceGraphic"></feMergeNode>
                     </feMerge>
                 </filter>
             </defs>
             {/* Lines */}
             <line className="glow-line opacity-30" filter="url(#glow)" stroke="url(#lineGradient)" strokeWidth="1.5" x1="500" x2="250" y1="350" y2="150"></line>
             <line className="glow-line opacity-30" filter="url(#glow)" stroke="url(#lineGradient)" strokeWidth="1.5" x1="500" x2="750" y1="350" y2="150"></line>
             <line className="glow-line opacity-30" filter="url(#glow)" stroke="url(#lineGradient)" strokeWidth="1.5" x1="500" x2="250" y1="350" y2="550"></line>
             <line className="glow-line opacity-30" filter="url(#glow)" stroke="url(#lineGradient)" strokeWidth="1.5" x1="500" x2="750" y1="350" y2="550"></line>
             {/* Circles */}
             <circle className="opacity-10" cx="500" cy="350" fill="none" r="180" stroke="currentColor" strokeWidth="1"></circle>
             <circle className="opacity-10" cx="500" cy="350" fill="none" r="280" stroke="currentColor" strokeWidth="1"></circle>
         </svg>

         {/* Central Hub */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 group">
             <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full glass-card flex items-center justify-center shadow-2xl border-brand-400/30">
                 <div className="absolute inset-2 border border-dashed border-brand-400/40 rounded-full animate-spin-slow"></div>
                 <div className="text-center p-6">
                     <div className="w-16 h-16 bg-brand-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-brand-500/40">
                         <Cpu className="text-white h-8 w-8" />
                     </div>
                     <h3 className="font-bold font-display text-lg text-white uppercase tracking-tighter">Automation</h3>
                     <p className="text-[10px] text-brand-400 font-bold uppercase tracking-widest mt-1">Central Hub</p>
                 </div>
             </div>
         </div>

         {/* Orbital Nodes */}
         {/* Step 1: Audit (Top Left) */}
         <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 z-30 group animate-float" style={{ animationDelay: '0s' }}>
             <div className="glass-card p-6 rounded-3xl w-64 shadow-xl hover:border-brand-400/50 transition-all duration-500 hover:-translate-y-2">
                 <div className="flex items-start gap-4">
                     <div className="relative">
                         <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                             <Search className="text-brand-400 h-6 w-6" />
                         </div>
                         <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-brand-500/20 rounded-xl -z-10"></div>
                     </div>
                     <div>
                         <div className="text-[10px] font-bold text-brand-400 mb-1">STEP 01</div>
                         <h4 className="font-bold text-xl text-white mb-2">Audit</h4>
                         <p className="text-sm text-slate-400">Deep-dive analysis of existing workflows.</p>
                     </div>
                 </div>
             </div>
         </div>
         {/* Step 2: Design (Top Right) */}
         <div className="absolute top-1/4 right-1/4 translate-x-1/2 -translate-y-1/2 z-30 group animate-float" style={{ animationDelay: '1.5s' }}>
             <div className="glass-card p-6 rounded-3xl w-64 shadow-xl hover:border-brand-400/50 transition-all duration-500 hover:-translate-y-2">
                 <div className="flex items-start gap-4">
                     <div className="relative">
                         <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                             <PenTool className="text-brand-400 h-6 w-6" />
                         </div>
                         <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-brand-500/20 rounded-xl -z-10"></div>
                     </div>
                     <div>
                         <div className="text-[10px] font-bold text-brand-400 mb-1">STEP 02</div>
                         <h4 className="font-bold text-xl text-white mb-2">Design</h4>
                         <p className="text-sm text-slate-400">Architecting the automation blueprint.</p>
                     </div>
                 </div>
             </div>
         </div>
         {/* Step 3: Build (Bottom Left) */}
         <div className="absolute bottom-1/4 left-1/4 -translate-x-1/2 translate-y-1/2 z-30 group animate-float" style={{ animationDelay: '3s' }}>
             <div className="glass-card p-6 rounded-3xl w-64 shadow-xl hover:border-brand-400/50 transition-all duration-500 hover:-translate-y-2">
                 <div className="flex items-start gap-4">
                     <div className="relative">
                         <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                             <Settings className="text-brand-400 h-6 w-6" />
                         </div>
                         <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-brand-500/20 rounded-xl -z-10"></div>
                     </div>
                     <div>
                         <div className="text-[10px] font-bold text-brand-400 mb-1">STEP 03</div>
                         <h4 className="font-bold text-xl text-white mb-2">Build</h4>
                         <p className="text-sm text-slate-400">Agile development and rigorous testing.</p>
                     </div>
                 </div>
             </div>
         </div>
         {/* Step 4: Deploy (Bottom Right) */}
         <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 z-30 group animate-float" style={{ animationDelay: '4.5s' }}>
             <div className="glass-card p-6 rounded-3xl w-64 shadow-xl hover:border-brand-400/50 transition-all duration-500 hover:-translate-y-2">
                 <div className="flex items-start gap-4">
                     <div className="relative">
                         <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                             <Rocket className="text-brand-400 h-6 w-6" />
                         </div>
                         <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-brand-500/20 rounded-xl -z-10"></div>
                     </div>
                     <div>
                         <div className="text-[10px] font-bold text-brand-400 mb-1">STEP 04</div>
                         <h4 className="font-bold text-xl text-white mb-2">Deploy</h4>
                         <p className="text-sm text-slate-400">Launching and empowering your team.</p>
                     </div>
                 </div>
             </div>
         </div>
     </div>

     {/* Mobile View (Grid) */}
     <div className="md:hidden grid grid-cols-1 gap-6 w-full mt-10 z-10">
        {[
            { step: 'Audit', desc: 'Analyze your workflows', icon: Search },
            { step: 'Design', desc: 'Create automation blueprint', icon: PenTool },
            { step: 'Build', desc: 'Develop and test solution', icon: Settings },
            { step: 'Deploy', desc: 'Launch and train your team', icon: Rocket }
        ].map((item, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-500/10 rounded-lg flex items-center justify-center">
                    <item.icon className="text-brand-400 h-6 w-6" />
                </div>
                <div>
                    <h4 className="font-bold text-white">{item.step}</h4>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
            </div>
        ))}
     </div>

     <div className="mt-24 z-10 text-center">
        <button className="bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 px-10 rounded-full shadow-2xl shadow-brand-500/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto">
            Start Your Process <ArrowRight className="text-sm h-5 w-5" />
        </button>
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