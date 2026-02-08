import React, { useState } from 'react';
import {
  Rocket, Mail, Database, BarChart3,
  CloudCog, Monitor, Layers, GitMerge,
  ChevronDown, Check, ArrowRight,
  Search, Settings
} from 'lucide-react';

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
          <a href="/#contact" className="px-8 py-4 bg-brand-600 text-white rounded-full font-semibold hover:bg-brand-500 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(2,132,199,0.5)]">
            Get Started
          </a>
          <a href="/#solutions" className="px-8 py-4 bg-slate-900/30 text-slate-300 border border-slate-700 rounded-full font-semibold hover:border-brand-400 hover:text-brand-400 transition-all backdrop-blur-sm">
            View Solutions
          </a>
        </div>
      </div>
    </div>
  </section>
);

const FeaturedWork = () => {
    return (
        <section id="featured" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10 reveal-on-scroll">
                    <span className="inline-block py-1 px-3 rounded-full bg-brand-500/10 text-brand-400 text-xs font-bold tracking-wider uppercase mb-4 border border-brand-500/20">
                        Case Study
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3 text-white">Featured Work</h2>
                    <p className="text-slate-400">Real-world results.</p>
                </div>

                <div className="reveal-on-scroll glass-card rounded-2xl overflow-hidden hover:border-brand-400/50 transition-all duration-300 group">
                    <a href="/portfolio/refinery-dashboard" className="block grid md:grid-cols-2 gap-0">
                        {/* Thumbnail */}
                        <div className="relative h-64 md:h-auto bg-[#0C1220] overflow-hidden">
                             {/* CSS-only Dashboard Mockup */}
                             <div className="absolute inset-4 border border-slate-800 rounded-lg bg-[#162032]/50">
                                 {/* Top bar */}
                                 <div className="h-8 border-b border-slate-800 flex items-center px-3 gap-2">
                                     <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                     <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                     <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                 </div>
                                 {/* Content grid */}
                                 <div className="p-3 grid grid-cols-2 gap-2 h-[calc(100%-2rem)]">
                                     <div className="bg-slate-800/50 rounded h-full relative overflow-hidden">
                                         {/* Mock Map */}
                                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-blue-500/30"></div>
                                         <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></div>
                                         <div className="absolute top-2/3 left-2/3 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></div>
                                     </div>
                                     <div className="flex flex-col gap-2 h-full">
                                         <div className="bg-slate-800/50 rounded h-1/2 relative">
                                             {/* Mock Chart */}
                                             <div className="absolute bottom-2 left-2 right-2 h-1/2 flex items-end justify-between gap-1">
                                                 <div className="w-full bg-blue-500/50 h-[40%] rounded-sm"></div>
                                                 <div className="w-full bg-blue-500/70 h-[70%] rounded-sm"></div>
                                                 <div className="w-full bg-blue-500/40 h-[30%] rounded-sm"></div>
                                                 <div className="w-full bg-blue-500/60 h-[50%] rounded-sm"></div>
                                             </div>
                                         </div>
                                         <div className="bg-slate-800/50 rounded h-1/2 flex items-center justify-center">
                                             {/* Mock Donut */}
                                             <div className="w-10 h-10 rounded-full border-4 border-emerald-500/50 border-t-emerald-500"></div>
                                         </div>
                                     </div>
                                 </div>
                             </div>

                             {/* Overlay */}
                             <div className="absolute inset-0 bg-gradient-to-t from-[#0C1220] to-transparent opacity-60"></div>
                        </div>

                        {/* Content */}
                        <div className="p-8 flex flex-col justify-center">
                            <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-brand-400 transition-colors">
                                Multi-Refinery Production Intelligence
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="text-xs font-mono text-brand-400 bg-brand-900/30 px-2 py-1 rounded">Oil & Gas</span>
                                <span className="text-xs font-mono text-brand-400 bg-brand-900/30 px-2 py-1 rounded">Power BI</span>
                                <span className="text-xs font-mono text-brand-400 bg-brand-900/30 px-2 py-1 rounded">Automation</span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                Unified operations data across 3 petroleum refineries into a single source of truth — driving real-time visibility into capacity, yield, energy & downtime.
                            </p>
                            <span className="text-sm font-bold text-white flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                                View Case Study <ArrowRight className="h-4 w-4" />
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
};

const Process = () => (
  <section id="process" className="relative py-16 md:py-32 overflow-hidden">
    {/* Section Header */}
    <div className="container mx-auto px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center mb-16 md:mb-32 reveal-on-scroll">
        <span className="inline-block py-1 px-3 rounded-full bg-brand-500/10 text-brand-400 text-xs font-bold tracking-wider uppercase mb-4 border border-brand-500/20">
          Our Process
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight font-display">
          How We <span className="text-brand-400">Automate Success</span>
        </h2>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          We transform complex workflows into seamless automated systems through a rigorous, proven four-step methodology.
        </p>
      </div>

      {/* Process Timeline Container */}
      <div className="relative max-w-6xl mx-auto">
        {/* Center Pulse Line (Visible on Desktop) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -ml-[1px] timeline-line hidden md:block"></div>

        {/* Step 01: The Audit */}
        <div className="relative flex flex-col md:flex-row items-center justify-between mb-16 md:mb-32 group reveal-on-scroll">
          {/* Icon Left */}
          <div className="w-full md:w-5/12 flex justify-center md:justify-end md:pr-12 lg:pr-16 mb-8 md:mb-0 order-1 md:order-1">
            <div className="relative w-full max-w-sm aspect-square glass-card rounded-2xl p-2 group-hover:-translate-y-2 transition-transform duration-500">
              <div className="absolute inset-0 bg-brand-500/10 blur-2xl -z-10 rounded-full"></div>
              <div className="w-full h-full bg-slate-900/50 rounded-xl overflow-hidden relative">
                <div
                  className="w-full h-full bg-cover bg-center opacity-80"
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCA4FtjmCFTHXSGcSMvzfTAFOUZ2PiEumxnF4dmGTQZ3I-QscC9-ngwGIodCGqZ8u_sWnicKei1bUKWHmDqMbSLF_FTGp63TO2vFMnNOyWUVkBmv7GjbtyOdS-f-7-XHYysGBVKCbA_LKpt3OPPTfvWkd_PjqDnHFMAP2QeKMVSOHnBFDeUpOIMNQO3_LjjvXb8zei8XTgPFLUVvISne2p-1VijzuwbafmVlRNMdudpXODPwrcATYJ8PhROmCkFlXGKaY_uW5_Bv11F')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                {/* Decorative UI Element overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400">
                      <BarChart3 className="h-4 w-4" />
                    </div>
                    <span className="text-white font-medium text-sm">System Analysis</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-400 w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Dot */}
          <div className="absolute left-1/2 -ml-3 md:flex items-center justify-center w-6 h-6 hidden order-2">
            <div className="w-4 h-4 bg-slate-950 border-2 border-brand-400 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)] z-10"></div>
          </div>

          {/* Text Right */}
          <div className="w-full md:w-5/12 md:pl-12 lg:pl-16 order-2 md:order-3 text-center md:text-left">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-brand-400 to-slate-600 opacity-30">01</span>
              <h3 className="text-3xl font-bold text-white font-display">The Audit</h3>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              We perform a deep dive into your current workflows to identify bottlenecks, inefficiencies, and hidden opportunities for automation.
            </p>
            <ul className="space-y-3 inline-block md:block text-left">
              <li className="flex items-center gap-3 text-slate-300">
                <Check className="text-brand-400 h-5 w-5" />
                <span>Workflow mapping</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Check className="text-brand-400 h-5 w-5" />
                <span>Tech stack review</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Check className="text-brand-400 h-5 w-5" />
                <span>ROI Projection</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Step 02: The Design */}
        <div className="relative flex flex-col md:flex-row items-center justify-between mb-16 md:mb-32 group reveal-on-scroll">
          {/* Text Left */}
          <div className="w-full md:w-5/12 md:pr-12 lg:pr-16 order-2 md:order-1 text-center md:text-right">
            <div className="inline-flex items-center gap-3 mb-4 md:flex-row-reverse">
              <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-bl from-brand-400 to-slate-600 opacity-30">02</span>
              <h3 className="text-3xl font-bold text-white font-display">The Design</h3>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              Architecting a custom solution tailored to your specific needs. We create a blueprint that bridges your tools seamlessly.
            </p>
            <ul className="space-y-3 inline-block md:flex md:flex-col md:items-end text-left md:text-right w-full">
              <li className="flex items-center gap-3 text-slate-300 md:flex-row-reverse">
                <Layers className="text-brand-400 h-5 w-5" />
                <span>Custom Blueprinting</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300 md:flex-row-reverse">
                <GitMerge className="text-brand-400 h-5 w-5" />
                <span>Data Flow Architecture</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300 md:flex-row-reverse">
                <Database className="text-brand-400 h-5 w-5" />
                <span>Security Protocol Plan</span>
              </li>
            </ul>
          </div>

          {/* Center Dot */}
          <div className="absolute left-1/2 -ml-3 md:flex items-center justify-center w-6 h-6 hidden order-2">
            <div className="w-4 h-4 bg-slate-950 border-2 border-brand-400 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)] z-10"></div>
          </div>

          {/* Icon Right */}
          <div className="w-full md:w-5/12 flex justify-center md:justify-start md:pl-12 lg:pl-16 mb-8 md:mb-0 order-1 md:order-3">
            <div className="relative w-full max-w-sm aspect-square glass-card rounded-2xl p-2 group-hover:-translate-y-2 transition-transform duration-500">
              <div className="absolute inset-0 bg-brand-500/10 blur-2xl -z-10 rounded-full"></div>
              <div className="w-full h-full bg-slate-900/50 rounded-xl overflow-hidden relative">
                <div
                  className="w-full h-full bg-cover bg-center opacity-80"
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA2HfrFIEujFy53QFfo2CmRXdL6cWXzR2-YQxXEz55z1bjgcEhDoxLor4e_mcdvZqWtvxDWhvuL2FBab2Q_9DSKZYy2LU24IHnlSOFv5XkaZiIHp7IMdcHHR96PZYO4T7zvBrpKVvfluI2VxTq0L2zrdgtv4XSTAVEA7xvWLxWmpo3RrceI0uazXMsxaYldkP5Kdx7e0Ga8XsznGqd3MYEvgShc5yLRWeuw4MBe4tMjbgW_hkBfIFl-KwO51vVIroKL6WpRYBm138zN')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                {/* Decorative UI Element overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4">
                  <div className="bg-black/40 backdrop-blur-md rounded-lg border border-white/10 p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="w-20 h-2 bg-white/20 rounded"></div>
                      <div className="w-6 h-6 bg-brand-500/20 rounded-full flex items-center justify-center">
                        <Settings className="h-3 w-3 text-brand-400" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-16 bg-white/5 rounded border border-dashed border-white/10"></div>
                      <div className="h-16 bg-white/5 rounded border border-dashed border-white/10"></div>
                      <div className="col-span-2 h-8 bg-brand-500/20 rounded border border-brand-500/30"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 03: The Build */}
        <div className="relative flex flex-col md:flex-row items-center justify-between mb-16 md:mb-32 group reveal-on-scroll">
          {/* Icon Left */}
          <div className="w-full md:w-5/12 flex justify-center md:justify-end md:pr-12 lg:pr-16 mb-8 md:mb-0 order-1 md:order-1">
            <div className="relative w-full max-w-sm aspect-square glass-card rounded-2xl p-2 group-hover:-translate-y-2 transition-transform duration-500">
              <div className="absolute inset-0 bg-brand-500/10 blur-2xl -z-10 rounded-full"></div>
              <div className="w-full h-full bg-slate-900/50 rounded-xl overflow-hidden relative">
                <div
                  className="w-full h-full bg-cover bg-center opacity-80"
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBGS2pxeAPYXMIyvM_GwSaGk0Hjazyc75CwNPz0dMtDgg0ASrAe9HlieE6GSwAY7ZTpM4Qyf-FeWfkFdOG7Xi2MCf8KWmDJgdFd5tFSXqWeqHsgCS2PNX10PBfGrBab3Y5DXP56HBWRJ4kD-YFA9drEpw_b6SiO_rkaPC3pHJPo9BNcdMHBmw0jhVLtnAaVMRTwHoNBlsSpo2IwKRigmjIfUbjXsT4fJEfEbXj9bsVIBMCQ-V08HB0tJCIaykoLojozDwik8nZM85fb')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                {/* Decorative UI Element overlay */}
                <div className="absolute bottom-6 right-6 p-3 rounded-lg bg-black/60 backdrop-blur-md border border-brand-500/30 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <div className="text-xs font-mono text-brand-400">Compiling Build...</div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Dot */}
          <div className="absolute left-1/2 -ml-3 md:flex items-center justify-center w-6 h-6 hidden order-2">
            <div className="w-4 h-4 bg-slate-950 border-2 border-brand-400 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)] z-10"></div>
          </div>

          {/* Text Right */}
          <div className="w-full md:w-5/12 md:pl-12 lg:pl-16 order-2 md:order-3 text-center md:text-left">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-brand-400 to-slate-600 opacity-30">03</span>
              <h3 className="text-3xl font-bold text-white font-display">The Build</h3>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              Rapid implementation using low-code tools and custom scripts. We bring the design to life with clean, efficient code.
            </p>
            <ul className="space-y-3 inline-block md:block text-left">
              <li className="flex items-center gap-3 text-slate-300">
                <Monitor className="text-brand-400 h-5 w-5" />
                <span>API Integration</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <CloudCog className="text-brand-400 h-5 w-5" />
                <span>Low-code Development</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Search className="text-brand-400 h-5 w-5" />
                <span>Rigorous Testing</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Step 04: The Scale */}
        <div className="relative flex flex-col md:flex-row items-center justify-between mb-10 group reveal-on-scroll">
          {/* Text Left */}
          <div className="w-full md:w-5/12 md:pr-12 lg:pr-16 order-2 md:order-1 text-center md:text-right">
            <div className="inline-flex items-center gap-3 mb-4 md:flex-row-reverse">
              <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-bl from-brand-400 to-slate-600 opacity-30">04</span>
              <h3 className="text-3xl font-bold text-white font-display">The Scale</h3>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              Monitoring performance and expanding automation across the organization. We ensure your systems grow as you grow.
            </p>
            <ul className="space-y-3 inline-block md:flex md:flex-col md:items-end text-left md:text-right w-full">
              <li className="flex items-center gap-3 text-slate-300 md:flex-row-reverse">
                <BarChart3 className="text-brand-400 h-5 w-5" />
                <span>Performance Monitoring</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300 md:flex-row-reverse">
                <Rocket className="text-brand-400 h-5 w-5" />
                <span>Feature Expansion</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300 md:flex-row-reverse">
                <Mail className="text-brand-400 h-5 w-5" />
                <span>Ongoing Support</span>
              </li>
            </ul>
          </div>

          {/* Center Dot */}
          <div className="absolute left-1/2 -ml-3 md:flex items-center justify-center w-6 h-6 hidden order-2">
            <div className="w-4 h-4 bg-slate-950 border-2 border-brand-400 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)] z-10"></div>
          </div>

          {/* Icon Right */}
          <div className="w-full md:w-5/12 flex justify-center md:justify-start md:pl-12 lg:pl-16 mb-8 md:mb-0 order-1 md:order-3">
            <div className="relative w-full max-w-sm aspect-square glass-card rounded-2xl p-2 group-hover:-translate-y-2 transition-transform duration-500">
              <div className="absolute inset-0 bg-brand-500/10 blur-2xl -z-10 rounded-full"></div>
              <div className="w-full h-full bg-slate-900/50 rounded-xl overflow-hidden relative">
                <div
                  className="w-full h-full bg-cover bg-center opacity-80"
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBbg3epSh1Z2J1kZ4A2VODDpehOZajsXWUu1-eo9gGm6BfTyghu8MVqP5oww1rvOBk0K7FLpkOdKoURSd1HQj5TphjaaMAVf3SjqZrpmoZLna2Oh3E-rqLY4XeNNaJ2nNQ3rbH77VfBKyMNV4C86Xstseflq5MiunXSaGzrEC6a_I6qvOH4N1y8AxN7vWxPYnwv3Vu37tdIihEnLYHkXQBkbd8JwvMTV8p70zSIR9GPpDpw-bxIEs9A8ejWG_CGW2RnmQfvkszeAVIa')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                {/* Decorative UI Element overlay */}
                <div className="absolute top-8 right-8 w-24 h-24 rounded-full border-4 border-brand-500/20 flex items-center justify-center backdrop-blur-sm bg-black/20">
                  <div className="text-center">
                    <span className="block text-xl font-bold text-brand-400">+240%</span>
                    <span className="text-[10px] uppercase text-slate-400 tracking-wider">Growth</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-16 z-10 text-center reveal-on-scroll">
        <a href="/#contact" className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 px-10 rounded-full shadow-2xl shadow-brand-500/30 transition-all hover:scale-105 active:scale-95">
          Start Your Audit <ArrowRight className="h-5 w-5" />
        </a>
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

const LandingPage = () => {
    return (
        <main className="relative z-10">
            <Hero />
            <FeaturedWork />
            <Process />
            <Solutions />
            <FAQ />
            <Contact />
        </main>
    );
};

export default LandingPage;
