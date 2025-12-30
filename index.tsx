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
    const particles: Particle[] = [];
    
    // Config: Smoother, more abstract feel
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 25 : 60;
    const connectionDist = isMobile ? 100 : 180;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseOpacity: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Slower velocity for "floating" feel
        this.vx = (Math.random() - 0.5) * 0.2; 
        this.vy = (Math.random() - 0.5) * 0.2;
        this.size = Math.random() * 2 + 0.5;
        this.baseOpacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Gentle bounce off edges instead of hard reset for smoother visuals
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(148, 163, 184, ${this.baseOpacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const initParticles = () => {
        particles.length = 0;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections first (behind dots)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            // Smooth opacity falloff
            const opacity = (1 - dist / connectionDist) * 0.15;
            ctx.strokeStyle = `rgba(148, 163, 184, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles on top
      for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    initParticles();
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ease-out-expo ${scrolled ? 'glass-nav h-16' : 'bg-transparent h-24'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <a href="#home" className="flex items-center gap-2 group cursor-pointer">
            <div className="transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500 ease-out-expo">
                <Logo activeLogo="logo2" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">DARKMOON<span className="text-brand-600">.AI</span></span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {['Process', 'Solutions', 'Services'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors relative group py-2">
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-600 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
                </a>
            ))}
            <a href="#contact" className="px-6 py-2.5 bg-brand-600 text-white rounded-full text-sm font-semibold hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-500/30 transition-all duration-300 ease-out-expo hover:-translate-y-0.5 active:scale-95 active:translate-y-0">
              Get Free Audit
            </a>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-600 p-2 hover:bg-slate-100 rounded-lg transition-colors active:scale-90">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white/98 backdrop-blur-xl z-40 flex flex-col pt-24 px-6 md:hidden transition-all duration-500 ease-out-expo ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 p-2 bg-slate-50 rounded-full hover:bg-slate-100 active:scale-90 transition-transform">
                <X className="h-6 w-6 text-slate-600" />
            </button>
            <div className="flex flex-col space-y-6 text-center">
                {['Process', 'Solutions', 'Services'].map((item) => (
                    <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-display font-bold text-slate-800 active:text-brand-600 transition-colors hover:scale-105 transform inline-block">
                        {item}
                    </a>
                ))}
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="mt-4 px-8 py-4 bg-brand-600 text-white rounded-xl font-bold text-xl shadow-xl shadow-brand-500/20 active:scale-95 transition-transform">
                    Get Free Audit
                </a>
            </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
      <div className="text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border border-slate-200/60 shadow-sm mb-8 animate-fade-up backdrop-blur-sm hover:border-brand-200 transition-colors duration-300">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold text-slate-600 tracking-wide uppercase">Accepting New Clients for Q4</span>
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-bold text-slate-900 mb-8 leading-[1.05] tracking-tight animate-fade-up" style={{ animationDelay: '0.1s' }}>
          We Engineer Time.<br />
          {/* Updated Gradient to darker shades for better contrast on white */}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 to-brand-500">You Engineer Growth.</span>
        </h1>

        <p className="text-lg sm:text-2xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto animate-fade-up font-light" style={{ animationDelay: '0.2s' }}>
          Darkmoon AI builds custom automation infrastructures. We replace repetitive chaos with silent, error-free workflows.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <a href="#contact" className="group w-full sm:w-auto px-8 py-4 bg-brand-600 text-white rounded-full font-semibold hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-500/30 transition-all duration-300 ease-out-expo hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-2">
            Book Strategy Call
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#solutions" className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-700 border border-slate-300 rounded-full font-semibold hover:border-brand-600 hover:text-brand-600 transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] flex items-center justify-center">
            Explore Solutions
          </a>
        </div>
      </div>
    </div>
  </section>
);

const PainPoints = () => (
  <section className="py-24 bg-white/50 backdrop-blur-sm border-y border-slate-100/50">
    <div className="max-w-7xl mx-auto px-6 reveal-on-scroll">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">The "Busy Trap" is Killing Your Scale.</h2>
          <p className="text-slate-600 text-lg mb-8 leading-relaxed">
            Your team is talented, but they're buried in copy-paste work. Data entry, email sorting, and report generation are expensive distractions.
          </p>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="p-2 bg-red-50 rounded-full text-red-500 mt-1"><X className="h-5 w-5" /></div>
              <span className="text-slate-700 text-lg">Manually syncing CRM data with Accounting</span>
            </li>
            <li className="flex items-start gap-4">
              <div className="p-2 bg-red-50 rounded-full text-red-500 mt-1"><X className="h-5 w-5" /></div>
              <span className="text-slate-700 text-lg">Chasing invoices and vendor communications</span>
            </li>
            <li className="flex items-start gap-4">
              <div className="p-2 bg-red-50 rounded-full text-red-500 mt-1"><X className="h-5 w-5" /></div>
              <span className="text-slate-700 text-lg">Hiring more admin staff just to maintain status quo</span>
            </li>
          </ul>
        </div>
        <div className="relative group cursor-default">
          <div className="absolute -inset-4 bg-gradient-to-r from-brand-100 to-indigo-100 rounded-[2rem] blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-1000"></div>
          <div className="relative bg-white/80 backdrop-blur-xl border border-white/60 rounded-[2rem] p-8 shadow-2xl shadow-slate-200/50 hover:scale-[1.01] transition-transform duration-500 ease-out-expo">
            <div className="flex items-center justify-between mb-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span>Before</span>
              <ArrowRight className="text-brand-400" />
              <span className="text-brand-600">After Darkmoon</span>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-5 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:border-slate-200 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400"></div>
                  <span className="font-medium text-slate-700">Manual Entry</span>
                </div>
                <span className="text-slate-400 line-through decoration-red-400">3hrs</span>
              </div>
              <div className="flex items-center justify-between p-5 bg-brand-50/50 rounded-xl shadow-sm border border-brand-100 group-hover:border-brand-200 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="font-medium text-brand-900">Automated Sync</span>
                </div>
                <span className="font-bold text-brand-600">0m (Instant)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Process = () => (
  <section id="process" className="py-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-20 reveal-on-scroll">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">The Engineering Process</h2>
        <p className="text-slate-600 max-w-xl mx-auto text-lg">We don't guess. We audit, architect, and deploy.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {[
            { step: '01', title: 'Audit & Discovery', desc: 'We analyze your current workflow friction points and ROI potential.' },
            { step: '02', title: 'Blueprint', desc: 'We design the architecture. You approve the logic before code is written.' },
            { step: '03', title: 'Development', desc: 'We build in n8n/Python. We test edge cases. We secure the data pipes.' },
            { step: '04', title: 'Handoff', desc: 'We deploy, train your team, and provide documentation. You own the code.' }
        ].map((item, i) => (
            <div key={i} className="glass-card p-8 rounded-3xl hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/5 border border-transparent hover:border-brand-100 transition-all duration-500 ease-out-expo reveal-on-scroll" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="text-6xl font-display font-bold text-slate-100 mb-6 transition-colors duration-500 group-hover:text-brand-100">{item.step}</div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
        ))}
      </div>
    </div>
  </section>
);

const Solutions = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    // Removed hardcoded 'text-brand-600' from icons so they inherit 'text-white' when active.
    const services = [
        {
            icon: <Smartphone className="h-7 w-7" />,
            title: "Web & Mobile App Development",
            short: "Custom apps built for your specific business needs.",
            desc: "We build fast, production-ready web and mobile applications with modern interfaces. Whether you need a customer-facing portal, an internal tool, or a mobile app for field staff, we integrate it perfectly with your existing payment gateways, CRMs, and analytics.",
            points: ["Full-stack development", "Multilingual support", "Third-party API integration"]
        },
        {
            icon: <Monitor className="h-7 w-7" />,
            title: "Smart Digital Signage",
            short: "Cloud-controlled screens for your office or shop.",
            desc: "Deploy intelligent display systems that you can control from anywhere. Perfect for businesses, mosques, or public spaces that need dynamic information displays. Schedule content updates automatically and even run offline.",
            points: ["Cloud content management", "Automated scheduling", "Offline functionality"]
        },
        {
            icon: <GitMerge className="h-7 w-7" />,
            title: "System Integration",
            short: "Make your software talk to each other.",
            desc: "Stop moving data manually between tabs. We connect your disparate business systems (CRM, ERP, Email, Databases) into one synchronized ecosystem. Data entered in one place automatically appears everywhere else.",
            points: ["Multi-platform sync", "Automated data pipelines", "Real-time updates"]
        },
        {
            icon: <Rocket className="h-7 w-7" />,
            title: "Onboarding Automation",
            short: "Speed up new client or employee setup.",
            desc: "Streamline your onboarding with systems that securely extract data from IDs/documents and auto-populate your required forms. What used to take hours of manual entry now happens instantly.",
            points: ["Secure document extraction", "Auto-populate forms", "Reduce errors & delay"]
        },
        {
            icon: <Mail className="h-7 w-7" />,
            title: "Email Campaign Automation",
            short: "Send emails that feel personal at scale.",
            desc: "Deploy intelligent email campaigns that deliver fully customized messages to thousands of people. Triggers based on user behavior ensure you send the right message at the right time.",
            points: ["Dynamic personalization", "Behavioral triggers", "Automated segmentation"]
        },
        {
            icon: <Database className="h-7 w-7" />,
            title: "Database Automation",
            short: "Connect and query your data instantly.",
            desc: "Connect seamlessly to your SQL databases. Automate data pulls, execute queries on demand, and clean up datasets without needing a data scientist on call.",
            points: ["On-demand SQL queries", "Secure data delivery", "Automated cleanup"]
        },
        {
            icon: <Package className="h-7 w-7" />,
            title: "Inventory Monitoring",
            short: "Never run out of stock again.",
            desc: "Smart inventory systems that continuously watch your stock levels. When you run low, the system automatically alerts you or sends a purchase order to your vendor.",
            points: ["Real-time monitoring", "Automated vendor alerts", "Smart reorder triggers"]
        },
        {
            icon: <FileEdit className="h-7 w-7" />,
            title: "Proposal Automation",
            short: "Draft contracts and proposals in seconds.",
            desc: "AI-powered systems that read client requirements and generate customized proposals, contracts, or job applications. Maintain high quality while reducing submission time by 90%.",
            points: ["AI-driven customization", "Bulk generation", "Template optimization"]
        },
        {
            icon: <BarChart3 className="h-7 w-7" />,
            title: "Business Reporting",
            short: "Executive reports delivered on auto-pilot.",
            desc: "Transform raw data into beautiful, decision-ready PDF reports delivered to your inbox every Monday morning. No more copy-pasting into Excel.",
            points: ["Scheduled delivery", "Visual data presentation", "KPI tracking"]
        },
        {
            icon: <CloudCog className="h-7 w-7" />,
            title: "Big Data Analytics",
            short: "Make sense of massive datasets.",
            desc: "Leverage enterprise-grade data processing with Azure Databricks. We build pipelines that can handle massive scale, transforming complex data into clear strategic insights.",
            points: ["High-performance pipelines", "Complex transformations", "Enterprise scalability"]
        },
        {
            icon: <Layers className="h-7 w-7" />,
            title: "Custom Business Apps",
            short: "Software built for your unique workflow.",
            desc: "Generic software often doesn't fit. We create tailored applications designed specifically for your operations—from field staff management to internal process tools.",
            points: ["Custom workflow logic", "Mobile-first design", "Real-time sync"]
        },
        {
            icon: <Palette className="h-7 w-7" />,
            title: "App Modernization",
            short: "Update your old, slow software.",
            desc: "Transform outdated applications into modern, high-performance platforms. We upgrade the look, feel, and underlying code while preserving your critical business logic.",
            points: ["UI/UX Redesign", "Performance optimization", "Code refactoring"]
        }
    ];

    return (
        <section id="solutions" className="py-32">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20 reveal-on-scroll">
                    <span className="text-brand-600 font-bold tracking-widest text-sm uppercase bg-brand-50 px-3 py-1 rounded-full">Our Solutions</span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold mt-6 mb-6">Everything You Need to Scale</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">Explore our comprehensive range of automation and development services.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <div 
                            key={index} 
                            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                            className={`glass-card rounded-3xl p-6 transition-all duration-500 ease-out-expo cursor-pointer group hover:shadow-xl hover:shadow-brand-900/5 hover:border-brand-200/50 ${expandedIndex === index ? 'ring-2 ring-brand-500 bg-white/90 scale-[1.02]' : 'hover:bg-white/70 hover:scale-[1.01]'}`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                {/* Added shrink-0 to prevent icon squashing */}
                                <div className={`p-3 rounded-2xl transition-colors duration-500 shrink-0 ${expandedIndex === index ? 'bg-brand-600 text-white' : 'bg-brand-50 text-brand-600 group-hover:bg-brand-100'}`}>
                                    {service.icon}
                                </div>
                                <div className={`transform transition-transform duration-500 ${expandedIndex === index ? 'rotate-180 text-brand-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
                                    <ChevronDown className="h-5 w-5" />
                                </div>
                            </div>
                            
                            <h3 className="text-xl font-bold mb-2 text-slate-900">{service.title}</h3>
                            {/* Updated text color for accessibility (brand-600 is now darker) */}
                            <p className="text-sm font-medium text-brand-600 mb-4">{service.short}</p>
                            
                            <div className={`grid transition-all duration-500 ease-out-expo ${expandedIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    <div className="pt-2 pb-1 border-t border-slate-100 mt-2">
                                        <p className="text-slate-600 text-sm leading-relaxed mb-4">{service.desc}</p>
                                        <ul className="space-y-2">
                                            {service.points.map((point, i) => (
                                                <li key={i} className="flex items-center text-xs text-slate-500 font-medium">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-brand-500 mr-2"></div>
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {expandedIndex !== index && (
                                /* Changed text-slate-400 to text-brand-600 for better visibility and affordance */
                                <p className="text-xs text-brand-600 mt-2 font-semibold transition-colors flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                    Tap for details
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Pricing = () => (
  // Changed id from "pricing" to "services" so navbar link works
  <section id="services" className="py-24 bg-white/30 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16 reveal-on-scroll">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Service Packages</h2>
        <p className="text-slate-600 text-lg">Choose the level of engagement that fits your business stage.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="glass-card p-8 rounded-[2rem] hover:scale-[1.01] hover:shadow-xl hover:shadow-brand-900/5 transition-all duration-500 ease-out-expo reveal-on-scroll border border-transparent hover:border-brand-100">
          <h3 className="font-bold text-2xl mb-2 text-slate-900">Starter</h3>
          <p className="text-slate-500 text-sm mb-8">For specific bottlenecks.</p>
          <ul className="space-y-4 mb-8 text-sm text-slate-600">
            <li className="flex gap-3"><Check className="h-5 w-5 text-brand-600 flex-shrink-0" /> Single Workflow Automation</li>
            <li className="flex gap-3"><Check className="h-5 w-5 text-brand-600 flex-shrink-0" /> Standard Integrations</li>
            <li className="flex gap-3"><Check className="h-5 w-5 text-brand-600 flex-shrink-0" /> 1 Week Delivery</li>
            <li className="flex gap-3"><Check className="h-5 w-5 text-brand-600 flex-shrink-0" /> Training & Documentation</li>
          </ul>
          <a href="#contact" className="block text-center py-4 border border-slate-200 rounded-xl font-bold text-slate-600 hover:border-brand-600 hover:text-brand-600 transition-all duration-300 bg-white/50 hover:bg-white active:scale-[0.98]">Start Small</a>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl shadow-slate-900/20 relative transform md:-translate-y-4 reveal-on-scroll hover:scale-[1.02] transition-transform duration-500 ease-out-expo" style={{ transitionDelay: '100ms' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-500 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-lg shadow-brand-500/40">Most Popular</div>
          <h3 className="font-bold text-2xl mb-2">Growth</h3>
          <p className="text-slate-400 text-sm mb-8">Complete process overhaul.</p>
          <ul className="space-y-4 mb-8 text-sm text-slate-300">
            <li className="flex gap-3"><Check className="h-5 w-5 text-brand-400 flex-shrink-0" /> Multi-step Workflows</li>
            <li className="flex gap-3"><Check className="h-5 w-5 text-brand-400 flex-shrink-0" /> Custom API Scripts</li>
            <li className="flex gap-3"><Check className="h-5 w-5 text-brand-400 flex-shrink-0" /> Dashboard Creation</li>
            <li className="flex gap-3"><Check className="h-5 w-5 text-brand-400 flex-shrink-0" /> Priority Support</li>
          </ul>
          <a href="#contact" className="block text-center py-4 bg-brand-600 rounded-xl font-bold hover:bg-brand-500 transition-all duration-300 shadow-lg shadow-brand-600/30 active:scale-[0.98]">Get Growth Plan</a>
        </div>

        <div className="glass-card p-8 rounded-[2rem] hover:scale-[1.01] hover:shadow-xl hover:shadow-brand-900/5 transition-all duration-500 ease-out-expo reveal-on-scroll border border-transparent hover:border-brand-100" style={{ transitionDelay: '200ms' }}>
          <h3 className="font-bold text-2xl mb-2 text-slate-900">Enterprise</h3>
          <p className="text-slate-500 text-sm mb-8">Complex ecosystem scale.</p>
          <ul className="space-y-4 mb-8 text-sm text-slate-600">
            <li className="flex gap-3"><Check className="h-5 w-5 text-brand-600 flex-shrink-0" /> Full Stack Development</li>
            <li className="flex gap-3"><Check className="h-5 w-5 text-brand-600 flex-shrink-0" /> Data Warehouse Ops</li>
            <li className="flex gap-3"><Check className="h-5 w-5 text-brand-600 flex-shrink-0" /> SLA & Retainers</li>
            <li className="flex gap-3"><Check className="h-5 w-5 text-brand-600 flex-shrink-0" /> Dedicated Account Manager</li>
          </ul>
          <a href="#contact" className="block text-center py-4 border border-slate-200 rounded-xl font-bold text-slate-600 hover:border-brand-600 hover:text-brand-600 transition-all duration-300 bg-white/50 hover:bg-white active:scale-[0.98]">Contact Us</a>
        </div>
      </div>
    </div>
  </section>
);

const FAQ = () => (
    <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 reveal-on-scroll">
            <h2 className="font-display text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {[
                    { q: "Is my data secure?", a: "Absolutely. We use industry-standard encryption. We build workflows where data flows through secure pipes (n8n/API) without being stored permanently on our servers unless specifically requested." },
                    { q: "Do I need to pay a monthly fee?", a: "Generally, no. We charge a one-time project fee for the build. You pay for your own hosting (which can be as low as $20/mo for n8n) or API usage, but you don't pay us a retainer unless you want ongoing maintenance." },
                    { q: "How long does a project take?", a: "Simple workflows (Starter tier) are often done in 5-7 days. Growth tier projects usually take 2-3 weeks including testing and handoff." }
                ].map((item, i) => (
                    <details key={i} className="group glass-card rounded-2xl p-2 [&_summary::-webkit-details-marker]:hidden transition-all duration-300 hover:bg-white/80 hover:shadow-md">
                        <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 font-medium text-slate-900">
                            <h3 className="text-lg font-bold group-hover:text-brand-600 transition-colors">{item.q}</h3>
                            <span className="shrink-0 rounded-full bg-slate-50 p-2 text-slate-900 sm:p-3 group-open:bg-brand-50 group-open:text-brand-600 transition-colors">
                                <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform duration-300 ease-out-expo" />
                            </span>
                        </summary>
                        <div className="px-4 pb-4">
                            <p className="leading-relaxed text-slate-600 text-base">{item.a}</p>
                        </div>
                    </details>
                ))}
            </div>
        </div>
    </section>
);

const Contact = () => (
    <section id="contact" className="py-24 relative overflow-hidden">
        {/* Abstract shapes specifically for contact area */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-100 rounded-full blur-[100px] opacity-30 pointer-events-none"></div>

        <div className="max-w-xl mx-auto px-6 relative z-10">
            <div className="text-center mb-12 reveal-on-scroll">
                <h2 className="font-display text-5xl font-bold mb-6 text-slate-900">Let's Build.</h2>
                <p className="text-slate-600 text-lg">Fill out the form below. We'll audit your request and send a preliminary plan within 24 hours.</p>
            </div>

            <form name="contact" method="POST" data-netlify="true" className="space-y-6 reveal-on-scroll">
                <input type="hidden" name="form-name" value="contact" />
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">First Name</label>
                        <input 
                            type="text" 
                            name="firstName" 
                            required 
                            className="w-full px-5 py-4 bg-white text-slate-900 border border-slate-300 rounded-2xl focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all duration-300 ease-out-expo shadow-sm hover:border-slate-400" 
                            placeholder="Jane"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Last Name</label>
                        <input 
                            type="text" 
                            name="lastName" 
                            required 
                            className="w-full px-5 py-4 bg-white text-slate-900 border border-slate-300 rounded-2xl focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all duration-300 ease-out-expo shadow-sm hover:border-slate-400" 
                            placeholder="Doe"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        required 
                        className="w-full px-5 py-4 bg-white text-slate-900 border border-slate-300 rounded-2xl focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all duration-300 ease-out-expo shadow-sm hover:border-slate-400" 
                        placeholder="jane@company.com"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">What are you looking to automate?</label>
                    <textarea 
                        name="message" 
                        rows={4} 
                        required 
                        className="w-full px-5 py-4 bg-white text-slate-900 border border-slate-300 rounded-2xl focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all duration-300 ease-out-expo shadow-sm hover:border-slate-400 resize-none" 
                        placeholder="e.g. My sales team spends too much time on data entry..."
                    ></textarea>
                </div>

                <button type="submit" className="w-full py-4 bg-brand-600 text-white rounded-2xl font-bold text-lg hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-500/30 transition-all duration-300 ease-out-expo transform hover:-translate-y-1 active:scale-[0.98] active:translate-y-0">
                    Get Free Audit
                </button>
            </form>

            <div className="text-center mt-8">
                <a href="mailto:contact@darkmoonai.com" className="text-slate-400 text-sm hover:text-brand-600 transition-colors font-medium hover:underline">contact@darkmoonai.com</a>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-white/50 backdrop-blur-md border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
                <Logo activeLogo="logo2" />
                <span className="font-display font-bold text-slate-700">Darkmoon AI</span>
            </div>
            <div className="flex gap-8 text-sm text-slate-500 font-medium">
                <a href="#about" className="hover:text-brand-600 transition-all duration-300 hover:translate-x-0.5 inline-block">About</a>
                <a href="#privacy" className="hover:text-brand-600 transition-all duration-300 hover:translate-x-0.5 inline-block">Privacy Policy</a>
                <a href="#terms" className="hover:text-brand-600 transition-all duration-300 hover:translate-x-0.5 inline-block">Terms</a>
            </div>
            <div className="text-sm text-slate-400">
                &copy; 2025 Darkmoon AI Solution.
            </div>
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
    }, []);

    return (
        <>
            <BackgroundCanvas />
            <Navbar />
            <main className="relative z-10">
                <Hero />
                <PainPoints />
                <Process />
                <Solutions />
                <Pricing />
                <FAQ />
                <Contact />
            </main>
            <Footer />
        </>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);