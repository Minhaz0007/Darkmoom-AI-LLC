import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Rocket, Mail, Database, Package, FileEdit, BarChart3, 
  CloudCog, Smartphone, Monitor, Layers, Palette, GitMerge,
  ChevronDown, ChevronUp, Check, X, Menu, ArrowRight
} from 'lucide-react';

// --- COMPONENTS ---

const Logo = ({ activeLogo = 'logo2' }) => (
    <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8 text-brand-600">
      <path d="M8 8V32H20C26.6274 32 32 26.6274 32 20C32 13.3726 26.6274 8 20 8H8Z" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M12 12V28" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M24 20L36 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
);

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

      ctx.fillStyle = 'rgba(148, 163, 184, 0.35)'; // Subtle slate

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
          // Slightly vary radius for effect? No, keep it simple "dotted"
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
                <Logo activeLogo="logo2" />
            </div>
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-slate-900">DARKMOON <span className="gradient-text">AI</span></span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {['Process', 'Solutions'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">
                    {item}
                </a>
            ))}
            <button onClick={copyEmail} className="relative flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg hover:border-brand-600 transition-all group cursor-pointer">
              <Mail className="h-4 w-4 text-brand-600" />
              <span className="font-bold text-sm text-slate-900 group-hover:text-brand-600 transition-colors">contact@darkmoonai.com</span>
              {emailCopied && (
                <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>
            <a href="#contact" className="relative px-6 py-2.5 bg-brand-600 text-white rounded-full text-sm font-semibold hover:bg-brand-700 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-brand-600/30 animate-pulse">
              Contact Us
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu-overlay"
            className="md:hidden text-slate-900 p-2 rounded-lg transition-colors active:scale-90 z-[60]"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-overlay"
          className="fixed inset-0 bg-white/95 backdrop-blur-xl z-[55] md:hidden animate-fade-in"
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
                className="text-3xl font-display font-bold text-slate-900 hover:text-brand-600 transition-all duration-300 hover:scale-110 active:scale-95"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => { copyEmail(); setMobileMenuOpen(false); }}
              className="relative text-xl font-bold text-brand-600 hover:text-brand-700 transition-all duration-300 hover:scale-110 active:scale-95"
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
  <section id="home" className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-5xl mx-auto w-full">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-slate-200 shadow-sm mb-6">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold text-slate-700">Accepting New Clients</span>
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-bold mb-6 leading-tight">
          <span className="gradient-text">Automate Your Manual Work</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Custom automation that eliminates repetitive tasks and scales your business.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="px-8 py-4 bg-brand-600 text-white rounded-full font-semibold hover:bg-brand-700 transition-all hover:scale-105 active:scale-95 shadow-lg">
            Get Started
          </a>
          <a href="#solutions" className="px-8 py-4 bg-white text-slate-700 border border-slate-300 rounded-full font-semibold hover:border-brand-600 hover:text-brand-600 transition-all">
            View Solutions
          </a>
        </div>
      </div>
    </div>
  </section>
);


const Process = () => (
  <section id="process" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-slate-900">How We Work</h2>
        <p className="text-slate-600 text-lg">Four simple steps to automation.</p>
      </div>

      <div className="relative">
        {/* Animated Connection Line */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 process-line transform -translate-y-1/2 rounded-full" style={{ zIndex: 0 }}></div>

        <div className="grid lg:grid-cols-4 gap-8 lg:gap-4 relative" style={{ zIndex: 1 }}>
          {[
              { title: 'Audit', desc: 'Analyze your workflows', icon: '🔍' },
              { title: 'Design', desc: 'Create automation blueprint', icon: '📐' },
              { title: 'Build', desc: 'Develop and test solution', icon: '⚙️' },
              { title: 'Deploy', desc: 'Launch and train your team', icon: '🚀' }
          ].map((item, i) => (
              <div key={i} className="relative group">
                {/* Animated Arrow for mobile */}
                {i < 3 && (
                  <div className="lg:hidden flex justify-center my-6">
                    <ArrowRight className="h-8 w-8 text-brand-600 arrow-animate" />
                  </div>
                )}

                <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-lg hover:shadow-2xl hover:border-brand-400 hover:-translate-y-3 transition-all duration-500 relative">
                  {/* Continuously Animated Arrow between cards for desktop */}
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-10 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-7 w-7 text-brand-600 arrow-animate drop-shadow-lg" />
                    </div>
                  )}

                  <div className="text-7xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-brand-600 transition-colors duration-300">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
          ))}
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
                <div className="text-center mb-10">
                    <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">What We Build</h2>
                    <p className="text-slate-600">Click to expand details.</p>
                </div>

                <div className="space-y-3">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl overflow-hidden hover:border-brand-300 hover:shadow-md transition-all duration-300">
                            <button
                                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                aria-expanded={expandedIndex === index}
                                aria-controls={`solution-content-${index}`}
                                className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50/50 transition-all duration-300"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${expandedIndex === index ? 'bg-brand-600 scale-125' : 'bg-slate-300'}`}></div>
                                    <h3 id={`solution-heading-${index}`} className={`font-bold transition-colors duration-300 ${expandedIndex === index ? 'text-brand-600' : 'text-slate-900'}`}>{service.title}</h3>
                                </div>
                                <ChevronDown className={`h-5 w-5 text-slate-400 transition-all duration-500 ${expandedIndex === index ? 'rotate-180 text-brand-600' : ''}`} />
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
                                            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 transform transition-all duration-300" style={{ transitionDelay: `${i * 50}ms` }}>
                                                <Check className="h-4 w-4 text-brand-600 mt-0.5 flex-shrink-0" />
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
                <h2 className="font-display text-3xl sm:text-4xl font-bold mb-8 text-center">FAQ</h2>
                <div className="space-y-3">
                    {faqs.map((item, i) => (
                        <div key={i} className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
                                aria-expanded={expandedFAQ === i}
                                aria-controls={`faq-content-${i}`}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                            >
                                <h3 id={`faq-heading-${i}`} className="font-bold text-slate-900">{item.q}</h3>
                                <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform flex-shrink-0 ${expandedFAQ === i ? 'rotate-180' : ''}`} />
                            </button>
                            {expandedFAQ === i && (
                                <div
                                    id={`faq-content-${i}`}
                                    role="region"
                                    aria-labelledby={`faq-heading-${i}`}
                                    className="px-4 pb-4"
                                >
                                    <p className="text-slate-600 text-sm">{item.a}</p>
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
                <div className="text-center mb-8">
                    <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3 text-slate-900">Get Started</h2>
                    <p className="text-slate-600">Response within 24 hours.</p>
                </div>

                <form name="contact" method="POST" action="/#contact" data-netlify="true" data-netlify-honeypot="bot-field" className="space-y-4 bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-lg">
                    <input type="hidden" name="form-name" value="contact" />
                    <p className="hidden">
                        <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-semibold text-slate-700 mb-1 block">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                required
                                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                                placeholder="Jane"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-slate-700 mb-1 block">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                required
                                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                                placeholder="Doe"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-slate-700 mb-1 block">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                            placeholder="jane@company.com"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-slate-700 mb-1 block">What do you need?</label>
                        <textarea
                            name="message"
                            rows={4}
                            required
                            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all resize-none"
                            placeholder="Describe your automation needs..."
                        ></textarea>
                    </div>

                    <button type="submit" className="w-full py-4 bg-brand-600 text-white rounded-lg font-bold hover:bg-brand-700 transition-all hover:scale-105 active:scale-95 shadow-lg">
                        Send Message
                    </button>
                </form>

                <div className="text-center mt-6">
                    <div className="relative inline-block">
                        <button onClick={copyEmail} className="text-slate-500 text-sm hover:text-brand-600 transition-colors cursor-pointer">
                            contact@darkmoonai.com
                        </button>
                        {emailCopied && (
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap">
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
    <footer className="bg-white border-t border-slate-200 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
            <p className="text-slate-600 text-sm">
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