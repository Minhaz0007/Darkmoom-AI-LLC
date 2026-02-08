import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { ArrowRight, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const CaseStudy = () => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // Scroll Reveal Logic
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

    // Scroll to top on mount
    window.scrollTo(0, 0);

    return () => observer.disconnect();
  }, []);

  // --- Chart Data & Options ---

  const chartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: { color: '#94A3B8', font: { family: 'Inter', size: 11 }, boxWidth: 12 }
      },
    },
    scales: {
      x: {
        ticks: { color: '#64748B', font: { size: 10 } },
        grid: { color: 'rgba(148,163,184,0.06)' }
      },
      y: {
        ticks: { color: '#64748B', font: { size: 10 } },
        grid: { color: 'rgba(148,163,184,0.06)' }
      },
    }
  };

  const downtimeData = {
    labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
    datasets: [
      { label: 'Baytown', data: [120, 85, 210, 95, 110, 72, 180, 88], backgroundColor: 'rgba(56, 189, 248, 0.7)', borderRadius: 3 },
      { label: 'Wood River', data: [90, 110, 145, 80, 95, 130, 100, 70], backgroundColor: 'rgba(52, 211, 153, 0.7)', borderRadius: 3 },
      { label: 'Los Angeles', data: [150, 95, 120, 170, 140, 88, 105, 160], backgroundColor: 'rgba(251, 191, 36, 0.7)', borderRadius: 3 },
    ]
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: { display: true, position: 'bottom' as const, labels: { color: '#94A3B8', font: { size: 11 }, boxWidth: 10 } }
    }
  };

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const steamData = {
    labels: months,
    datasets: [
      { label: '2023', data: [480,510,490,520,560,590,610,600,570,530,500,490], borderColor: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.05)', fill: true, tension: 0.4, pointRadius: 2 },
      { label: '2024', data: [460,490,505,540,575,605,620,610,580,545,510,480], borderColor: '#34d399', backgroundColor: 'rgba(52, 211, 153, 0.05)', fill: true, tension: 0.4, pointRadius: 2 },
    ]
  };

  const gasElecData = {
    labels: months,
    datasets: [
      { label: 'Natural Gas', data: [320,340,330,350,380,400,410,405,390,360,340,325], borderColor: '#fbbf24', tension: 0.4, pointRadius: 2 },
      { label: 'Electricity', data: [180,190,195,210,230,250,260,255,240,220,200,185], borderColor: '#f87171', tension: 0.4, pointRadius: 2 },
    ]
  };

  // Deep dive data
  const steamDeepData = {
      labels: months,
      datasets: [
        { label: '2022', data: [450,470,460,490,530,560,580,570,540,510,480,460], borderColor: '#64748B', tension: 0.4, pointRadius: 2, borderDash: [5,5] },
        { label: '2023', data: [480,510,490,520,560,590,610,600,570,530,500,490], borderColor: '#38bdf8', tension: 0.4, pointRadius: 2 },
        { label: '2024', data: [460,490,505,540,575,605,620,610,580,545,510,480], borderColor: '#34d399', tension: 0.4, pointRadius: 3 },
      ]
  };

  const gasDeepData = {
      labels: months,
      datasets: [
        { label: '2022', data: [300,310,305,330,360,380,390,385,370,340,320,310], borderColor: '#64748B', tension: 0.4, pointRadius: 2, borderDash: [5,5] },
        { label: '2023', data: [320,340,330,350,380,400,410,405,390,360,340,325], borderColor: '#fbbf24', tension: 0.4, pointRadius: 2 },
        { label: '2024', data: [310,330,340,365,395,415,425,415,395,370,345,330], borderColor: '#34d399', tension: 0.4, pointRadius: 3 },
      ]
  };

  const elecDeepData = {
      labels: months,
      datasets: [
        { label: '2022', data: [170,175,180,195,215,235,245,240,225,210,190,175], borderColor: '#64748B', tension: 0.4, pointRadius: 2, borderDash: [5,5] },
        { label: '2023', data: [180,190,195,210,230,250,260,255,240,220,200,185], borderColor: '#f87171', tension: 0.4, pointRadius: 2 },
        { label: '2024', data: [175,185,200,220,245,265,275,268,250,230,208,190], borderColor: '#34d399', tension: 0.4, pointRadius: 3 },
      ]
  };


  return (
    <div className="pt-20 pb-20">
        {/* HERO */}
        <section className="min-h-[60vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute top-[-200px] right-[-200px] w-[800px] h-[800px] bg-brand-400/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-5xl mx-auto w-full pt-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-brand-500/20 rounded-full mb-8 animate-fade-in">
                    <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-400">Case Study</span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-up">
                    Multi-Refinery Production<br/>
                    <span className="gradient-text">Intelligence Dashboard</span>
                </h1>

                <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
                    How we unified operations data across 3 petroleum refineries into a single source of truth — driving real-time visibility into capacity, yield, energy & downtime.
                </p>

                <div className="flex flex-wrap gap-8 sm:gap-12 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-mono uppercase tracking-widest text-slate-500">Industry</span>
                        <span className="font-display font-semibold text-slate-200">Oil & Gas / Petroleum</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-mono uppercase tracking-widest text-slate-500">Tools</span>
                        <span className="font-display font-semibold text-slate-200">Power BI · DAX · GIS</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-mono uppercase tracking-widest text-slate-500">Scope</span>
                        <span className="font-display font-semibold text-slate-200">3 Refineries · 6+ KPIs</span>
                    </div>
                </div>
            </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent my-10 mx-6"></div>

        {/* TRANSFORMATION */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-12 reveal-on-scroll">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-400 block mb-3">The Transformation</span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">From Spreadsheet Chaos to Real-Time Intelligence</h2>
                <p className="text-slate-400 max-w-2xl text-lg">The client was drowning in disconnected data across 3 refinery sites. Here's what changed.</p>
            </div>

            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 items-stretch mb-16 reveal-on-scroll">
                {/* Before */}
                <div className="glass-card p-8 rounded-2xl border-red-500/20 relative overflow-hidden group hover:border-red-500/40 transition-colors">
                    <h3 className="font-display text-xl font-bold text-red-500 mb-6 flex items-center gap-2">
                        <span className="text-lg">✕</span> Before Darkmoon AI
                    </h3>
                    <ul className="space-y-4">
                        {[
                            "Each refinery tracked production in separate Excel files",
                            "Monthly yield reports took 2-3 days of manual aggregation",
                            "Energy costs were never visualized against production",
                            "Equipment downtime buried in maintenance logs",
                            "Executives made decisions on stale, incomplete data"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
                                <span className="text-red-500 font-bold mt-0.5">✕</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center text-slate-600">
                    <ArrowRight className="h-8 w-8 rotate-90 md:rotate-0" />
                </div>

                {/* After */}
                <div className="glass-card p-8 rounded-2xl border-emerald-500/20 bg-gradient-to-br from-slate-900/50 to-emerald-500/5 hover:border-emerald-500/40 transition-colors">
                    <h3 className="font-display text-xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
                        <span className="text-lg">✓</span> After Darkmoon AI
                    </h3>
                    <ul className="space-y-4">
                        {[
                            "Single interactive dashboard unifying all 3 refineries",
                            "Instant KPI cards: utilization %, yield %, crude run",
                            "Energy consumption trends correlated with production",
                            "Quarterly downtime analysis with cross-plant comparison",
                            "GIS map with capacity bubbles and utilization color-coding"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 reveal-on-scroll">
                {[
                    { val: "3", label: "Refineries Unified" },
                    { val: "6+", label: "Live KPIs" },
                    { val: "5", label: "Data Sources" },
                    { val: "3", label: "Dashboard Pages" },
                    { val: "~90%", label: "Faster Reporting" },
                    { val: "24/7", label: "Live Monitoring" }
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-6 rounded-xl text-center hover:-translate-y-1 transition-transform duration-300">
                        <div className="font-display text-3xl font-bold text-brand-400 mb-2">{stat.val}</div>
                        <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">{stat.label}</div>
                    </div>
                ))}
            </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent my-10 mx-6"></div>

        {/* DASHBOARD PREVIEW */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-10 reveal-on-scroll">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-400 block mb-3">The Dashboard We Built</span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">Interactive Power BI Dashboard — Recreated</h2>
                <p className="text-slate-400 max-w-2xl text-lg">Every visualization extracted from the production .pbix file. Three pages of actionable intelligence.</p>
            </div>

            <div className="glass-card border border-slate-700 rounded-2xl overflow-hidden reveal-on-scroll shadow-2xl shadow-black/50">
                {/* Top Bar */}
                <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center gap-6">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex gap-1 overflow-x-auto">
                        {['Operations Command', 'Energy & Emissions', 'Executive KPIs'].map((tab, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveTab(i)}
                                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-t-lg border border-b-0 transition-colors ${
                                    activeTab === i
                                    ? 'bg-slate-800 text-brand-400 border-slate-700'
                                    : 'bg-transparent text-slate-500 border-transparent hover:text-slate-300'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Dashboard Body */}
                <div className="p-6 md:p-8 bg-slate-950/50 min-h-[600px]">

                    {/* PAGE 1: Operations */}
                    {activeTab === 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                            {/* Map */}
                            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                                <h4 className="font-display font-semibold text-white mb-1">Refinery Locations & Utilization</h4>
                                <p className="text-xs text-slate-500 mb-4">ESRI GIS Map · Bubble = Capacity · Color = Utilization</p>
                                <div className="relative h-[280px] bg-gradient-to-br from-[#0a1628] to-[#0f2038] rounded-lg overflow-hidden group">
                                    <div className="absolute inset-4 border border-brand-500/10 rounded-[30%_20%_20%_30%]"></div>

                                    {/* Pins */}
                                    {[
                                        { top: '62%', left: '55%', label: 'Baytown, TX', sub: '560K · 92%' },
                                        { top: '42%', left: '50%', label: 'Wood River, IL', sub: '340K · 87%' },
                                        { top: '55%', left: '18%', label: 'Los Angeles, CA', sub: '430K · 79%' }
                                    ].map((pin, i) => (
                                        <div key={i} className="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-500" style={{ top: pin.top, left: pin.left }}>
                                            <div className="w-4 h-4 rounded-full bg-brand-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] animate-pulse relative">
                                                <div className="absolute inset-[-6px] border-2 border-brand-500/30 rounded-full animate-ping"></div>
                                            </div>
                                            <div className="mt-2 bg-slate-950/90 backdrop-blur text-[10px] text-brand-400 px-2 py-1 rounded border border-brand-500/20 whitespace-nowrap">
                                                {pin.label} <span className="text-slate-500">· {pin.sub}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Downtime Chart */}
                            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                                <h4 className="font-display font-semibold text-white mb-1">Downtime (hours) by Plant</h4>
                                <p className="text-xs text-slate-500 mb-4">Quarterly breakdown</p>
                                <div className="h-[280px]">
                                    <Bar data={downtimeData} options={chartDefaults} />
                                </div>
                            </div>

                            {/* Donuts */}
                            <div className="md:col-span-2 bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                                <h4 className="font-display font-semibold text-white mb-1">Crude Oil Sourcing</h4>
                                <p className="text-xs text-slate-500 mb-6">Domestic vs. Imported per refinery</p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                    {[
                                        { label: 'Baytown, TX', data: [72, 28] },
                                        { label: 'Wood River, IL', data: [85, 15] },
                                        { label: 'Los Angeles, CA', data: [55, 45] }
                                    ].map((item, i) => (
                                        <div key={i} className="flex flex-col items-center h-[180px]">
                                            <Doughnut
                                                data={{
                                                    labels: ['Domestic', 'Imported'],
                                                    datasets: [{ data: item.data, backgroundColor: ['rgba(56, 189, 248, 0.8)', 'rgba(251, 191, 36, 0.8)'], borderWidth: 0 }]
                                                }}
                                                options={donutOptions}
                                            />
                                            <div className="mt-2 text-xs font-mono text-slate-500">{item.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Energy Lines */}
                            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                                <h4 className="font-display font-semibold text-white mb-1">Steam Consumption</h4>
                                <div className="h-[200px]">
                                    <Line data={steamData} options={chartDefaults} />
                                </div>
                            </div>
                            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                                <h4 className="font-display font-semibold text-white mb-1">Gas & Electricity</h4>
                                <div className="h-[200px]">
                                    <Line data={gasElecData} options={chartDefaults} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PAGE 2: Energy */}
                    {activeTab === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                            {[
                                { title: 'Steam by Year', data: steamDeepData },
                                { title: 'Natural Gas by Year', data: gasDeepData },
                                { title: 'Electricity by Year', data: elecDeepData }
                            ].map((chart, i) => (
                                <div key={i} className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                                    <h4 className="font-display font-semibold text-white mb-1">{chart.title}</h4>
                                    <p className="text-xs text-slate-500 mb-4">Year-over-year comparison</p>
                                    <div className="h-[300px]">
                                        <Line data={chart.data} options={chartDefaults} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* PAGE 3: KPIs */}
                    {activeTab === 2 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                            {[
                                { val: "1,284,000", label: "Total Crude Run (bbl)", color: "text-white" },
                                { val: "1,490,000", label: "Plant Nominal Capacity", color: "text-white" },
                                { val: "86.2%", label: "Utilization %", color: "text-emerald-400" },
                                { val: "46.3%", label: "Gasoline Yield %", color: "text-white" },
                                { val: "28.7%", label: "Diesel Yield %", color: "text-white" },
                                { val: "9.8%", label: "Jet Fuel Yield %", color: "text-white" }
                            ].map((kpi, i) => (
                                <div key={i} className="bg-slate-900/50 p-8 rounded-xl border border-slate-800 relative overflow-hidden text-center group">
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-400 to-emerald-400 opacity-50"></div>
                                    <div className={`font-display text-4xl font-bold mb-2 ${kpi.color}`}>{kpi.val}</div>
                                    <div className="text-sm text-slate-500 font-mono">{kpi.label}</div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent my-10 mx-6"></div>

        {/* DATA ARCHITECTURE */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-10 reveal-on-scroll">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-400 block mb-3">Under the Hood</span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">Data Architecture & Model</h2>
                <p className="text-slate-400 max-w-2xl text-lg">Five interconnected data tables, custom DAX measures, and a star schema.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-on-scroll">
                {[
                    { title: "plant", fields: "state · capacity_bpd · plant_id", desc: "Master reference with location, capacity, and utilization calculations." },
                    { title: "input_monthly", fields: "domestic_bbl · imported_bbl · date", desc: "Monthly crude intake tracking by domestic vs. imported source." },
                    { title: "output_monthly", fields: "gasoline · diesel · jet_fuel yields", desc: "Product output and DAX-calculated yield percentages per product." },
                    { title: "energy_emissions", fields: "steam · natural_gas · electricity", desc: "Energy consumption tracking for cost and efficiency analysis." },
                    { title: "Downtime", fields: "downtime_hours · plant_id", desc: "Equipment downtime records by plant for maintenance intelligence." }
                ].map((table, i) => (
                    <div key={i} className="glass-card p-6 rounded-xl border-slate-800 hover:border-brand-400/30 transition-colors">
                        <div className="flex items-center gap-2 mb-3">
                            <Database className="w-4 h-4 text-brand-400" />
                            <h4 className="font-mono font-bold text-brand-400">{table.title}</h4>
                        </div>
                        <div className="text-xs font-mono text-slate-500 mb-3 bg-slate-900/50 p-2 rounded border border-slate-800/50">{table.fields}</div>
                        <p className="text-sm text-slate-400">{table.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent my-10 mx-6"></div>

        {/* IMPACT TABLE */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
             <div className="mb-10 reveal-on-scroll">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-400 block mb-3">Results</span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">Business Impact</h2>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden reveal-on-scroll">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-900/80 border-b border-slate-700">
                                <th className="p-6 text-xs font-mono uppercase tracking-widest text-slate-500">Impact Area</th>
                                <th className="p-6 text-xs font-mono uppercase tracking-widest text-slate-500">Result</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {[
                                { area: "Decision Speed", result: "From 2-3 days of manual aggregation to instant, interactive insights." },
                                { area: "Utilization Visibility", result: "Real-time capacity tracking eliminated blind spots." },
                                { area: "Energy Cost Control", result: "First-ever correlation of steam/gas/elec against production." },
                                { area: "Downtime Intelligence", result: "Quarterly trend analysis enabled predictive maintenance." },
                                { area: "Supply Chain Risk", result: "Domestic vs. import visibility enables proactive diversification." },
                                { area: "Yield Optimization", result: "Live yield tracking allows engineers to catch underperformance." }
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="p-6 font-semibold text-brand-400 border-l-4 border-transparent hover:border-brand-400 transition-colors">{row.area}</td>
                                    <td className="p-6 text-slate-400">{row.result}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center relative overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-400/10 rounded-full blur-3xl pointer-events-none"></div>

             <div className="relative z-10 max-w-2xl mx-auto px-4">
                 <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6 text-white">Ready to transform <span className="text-brand-400">your</span> data?</h2>
                 <p className="text-slate-400 text-xl mb-10">Whether you need a Power BI dashboard, automated workflows, or a custom application — we deliver results fast.</p>
                 <Link to="/#contact" className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 px-10 rounded-full shadow-2xl shadow-brand-500/30 transition-all hover:scale-105 active:scale-95">
                    Start Your Project
                 </Link>
                 <div className="mt-8 font-display font-bold text-slate-600">Darkmoon AI Solution LLC</div>
             </div>
        </section>
    </div>
  );
};

export default CaseStudy;
