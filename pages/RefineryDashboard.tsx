import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Check, X, ArrowRight, Activity, Zap, TrendingUp, AlertTriangle, Layers, Database } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

const RefineryDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  // --- CHART DATA ---
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  // Downtime Chart
  const downtimeData = {
    labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
    datasets: [
      { label: 'Baytown', data: [120, 85, 210, 95, 110, 72, 180, 88], backgroundColor: 'rgba(59,130,246,0.7)', borderRadius: 3 },
      { label: 'Wood River', data: [90, 110, 145, 80, 95, 130, 100, 70], backgroundColor: 'rgba(6,214,160,0.7)', borderRadius: 3 },
      { label: 'Los Angeles', data: [150, 95, 120, 170, 140, 88, 105, 160], backgroundColor: 'rgba(245,158,11,0.7)', borderRadius: 3 },
    ]
  };

  // Donut Charts
  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'bottom' as const, labels: { color: '#94A3B8', font: { size: 11 }, boxWidth: 10 } },
      tooltip: { callbacks: { label: (ctx: any) => `${ctx.label}: ${ctx.raw}%` } }
    },
    cutout: '65%',
    borderWidth: 0,
  };

  const makeDonutData = (domestic: number, imported: number) => ({
    labels: ['Domestic', 'Imported'],
    datasets: [{ data: [domestic, imported], backgroundColor: ['rgba(59,130,246,0.8)', 'rgba(245,158,11,0.8)'], borderWidth: 0 }]
  });

  // Steam Chart
  const steamData = {
    labels: months,
    datasets: [
      { label: '2023', data: [480,510,490,520,560,590,610,600,570,530,500,490], borderColor: '#3B82F6', backgroundColor: 'rgba(59,130,246,0.05)', fill: true, tension: 0.4, pointRadius: 2 },
      { label: '2024', data: [460,490,505,540,575,605,620,610,580,545,510,480], borderColor: '#06D6A0', backgroundColor: 'rgba(6,214,160,0.05)', fill: true, tension: 0.4, pointRadius: 2 },
    ]
  };

  // Gas & Elec Chart
  const gasElecData = {
    labels: months,
    datasets: [
      { label: 'Natural Gas', data: [320,340,330,350,380,400,410,405,390,360,340,325], borderColor: '#F59E0B', tension: 0.4, pointRadius: 2 },
      { label: 'Electricity', data: [180,190,195,210,230,250,260,255,240,220,200,185], borderColor: '#EF4444', tension: 0.4, pointRadius: 2 },
    ]
  };

  // Common Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, labels: { color: '#94A3B8', font: { family: 'Inter', size: 11 }, boxWidth: 12 } },
    },
    scales: {
      x: { ticks: { color: '#64748B', font: { size: 10 } }, grid: { color: 'rgba(148,163,184,0.06)' } },
      y: { ticks: { color: '#64748B', font: { size: 10 } }, grid: { color: 'rgba(148,163,184,0.06)' } },
    }
  };

  return (
    <div className={`min-h-screen pt-20 pb-20 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>

      {/* HERO */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900/50 border border-slate-700/50 rounded-full mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
          <span className="text-xs font-mono text-brand-400 uppercase tracking-widest">Case Study</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 max-w-4xl leading-tight animate-fade-up">
          Multi-Refinery Production<br/>
          <span className="gradient-text">Intelligence Dashboard</span>
        </h1>

        <p className="text-lg text-slate-400 max-w-2xl mb-10 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          How we unified operations data across 3 petroleum refineries into a single source of truth — driving real-time visibility into capacity, yield, energy & downtime.
        </p>

        <div className="flex flex-wrap justify-center gap-8 sm:gap-16 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest text-slate-500 mb-1">Industry</span>
            <span className="text-white font-semibold">Oil & Gas / Petroleum</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest text-slate-500 mb-1">Tools</span>
            <span className="text-white font-semibold">Power BI · DAX · GIS</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest text-slate-500 mb-1">Scope</span>
            <span className="text-white font-semibold">3 Refineries · 6+ KPIs</span>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent w-full max-w-6xl mx-auto my-10"></div>

      {/* BEFORE vs AFTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <span className="text-brand-400 text-xs font-bold tracking-wider uppercase">The Transformation</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">From Spreadsheet Chaos to Real-Time Intelligence</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">The client was drowning in disconnected data across 3 refinery sites. Here's what changed.</p>
        </div>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center mb-16">
          {/* Before Card */}
          <div className="bg-slate-900/40 border border-red-500/20 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="font-display text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
              <X className="w-5 h-5" /> Before Darkmoon AI
            </h3>
            <ul className="space-y-4">
              {['Each refinery tracked production in separate Excel files', 'Monthly yield reports took 2-3 days to aggregate', 'Energy costs never visualized against production', 'Downtime patterns buried in maintenance logs'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                  <X className="w-4 h-4 text-red-500/50 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Arrow */}
          <div className="flex justify-center text-slate-600">
            <ArrowRight className="w-8 h-8 md:rotate-0 rotate-90" />
          </div>

          {/* After Card */}
          <div className="bg-gradient-to-br from-slate-900/60 to-brand-900/10 border border-brand-500/20 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="font-display text-xl font-bold text-brand-400 mb-6 flex items-center gap-2">
              <Check className="w-5 h-5" /> After Darkmoon AI
            </h3>
            <ul className="space-y-4">
              {['Single interactive dashboard unifying all 3 refineries', 'Instant KPI cards: utilization, yield, crude run', 'Energy consumption correlated with production volume', 'Quarterly downtime analysis with cross-plant comparison'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                  <Check className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { val: '3', label: 'Refineries Unified' },
            { val: '6+', label: 'Live KPIs' },
            { val: '5', label: 'Data Sources' },
            { val: '3', label: 'Dashboard Pages' },
            { val: '~90%', label: 'Faster Reporting' },
            { val: '24/7', label: 'Live Monitoring' },
          ].map((kpi, i) => (
            <div key={i} className="bg-slate-900/30 border border-slate-800 hover:border-brand-500/30 transition-colors rounded-xl p-4 text-center group">
              <div className="font-display text-2xl font-bold text-brand-400 mb-1 group-hover:scale-110 transition-transform">{kpi.val}</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500">{kpi.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DASHBOARD RECREATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <span className="text-brand-400 text-xs font-bold tracking-wider uppercase">The Dashboard We Built</span>
          <h2 className="font-display text-3xl font-bold text-white mt-2">Interactive Power BI Dashboard — Recreated</h2>
          <p className="text-slate-400 mt-2">Every visualization extracted from the production .pbix file.</p>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Dashboard Header */}
          <div className="bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between flex-wrap gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>

            <div className="flex gap-1 bg-slate-950 p-1 rounded-lg">
              {['Operations Command', 'Energy & Emissions', 'Executive KPIs'].map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`px-4 py-2 rounded-md text-xs font-medium transition-all ${activeTab === i ? 'bg-slate-800 text-brand-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Dashboard Body */}
          <div className="p-6 bg-slate-950 min-h-[600px]">

            {/* PAGE 1: Operations */}
            {activeTab === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
                {/* Map Placeholder */}
                <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent)]"></div>
                  <h4 className="font-display text-sm font-semibold text-white mb-1 relative z-10">Refinery Locations & Utilization</h4>
                  <p className="text-xs text-slate-500 mb-4 relative z-10">ESRI GIS Map · Bubble Size = Capacity</p>

                  <div className="relative h-[240px] w-full bg-slate-900 rounded-lg border border-slate-800/50 overflow-hidden">
                    {/* Simplified Map Visual */}
                    <div className="absolute inset-10 border border-slate-700/30 rounded-[30%] opacity-50"></div>

                    {[
                      { top: '60%', left: '55%', label: 'Baytown', val: '92%' },
                      { top: '40%', left: '50%', label: 'Wood River', val: '87%' },
                      { top: '55%', left: '20%', label: 'Los Angeles', val: '79%' },
                    ].map((pin, i) => (
                      <div key={i} className="absolute flex flex-col items-center group cursor-pointer" style={{ top: pin.top, left: pin.left }}>
                        <div className="w-3 h-3 bg-brand-500 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.6)] animate-pulse"></div>
                        <div className="mt-2 px-2 py-1 bg-slate-950/90 border border-slate-700 rounded text-[10px] text-brand-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                          {pin.label} · {pin.val}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Downtime Chart */}
                <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-5">
                  <h4 className="font-display text-sm font-semibold text-white mb-1">Downtime (hours) by Plant</h4>
                  <p className="text-xs text-slate-500 mb-4">Quarterly breakdown</p>
                  <div className="h-[240px]">
                    <Bar data={downtimeData} options={chartOptions} />
                  </div>
                </div>

                {/* Donut Charts */}
                <div className="lg:col-span-2 bg-slate-900/30 border border-slate-800 rounded-xl p-5">
                  <h4 className="font-display text-sm font-semibold text-white mb-1">Crude Oil Sourcing</h4>
                  <p className="text-xs text-slate-500 mb-6">Domestic vs. Imported Dependency</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { name: 'Baytown, TX', d: 72, i: 28 },
                      { name: 'Wood River, IL', d: 85, i: 15 },
                      { name: 'Los Angeles, CA', d: 55, i: 45 }
                    ].map((site, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="h-[140px] w-[140px] mb-3">
                          <Doughnut data={makeDonutData(site.d, site.i)} options={donutOptions} />
                        </div>
                        <span className="text-xs font-medium text-slate-400">{site.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Energy Charts */}
                <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-5">
                  <h4 className="font-display text-sm font-semibold text-white mb-1">Steam Consumption</h4>
                  <div className="h-[200px]">
                    <Line data={steamData} options={chartOptions} />
                  </div>
                </div>
                <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-5">
                  <h4 className="font-display text-sm font-semibold text-white mb-1">Gas & Electricity</h4>
                  <div className="h-[200px]">
                    <Line data={gasElecData} options={chartOptions} />
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 2: Energy */}
            {activeTab === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                {['Steam', 'Natural Gas', 'Electricity'].map((type, i) => (
                  <div key={i} className="bg-slate-900/30 border border-slate-800 rounded-xl p-5">
                    <h4 className="font-display text-sm font-semibold text-white mb-4">{type} by Year</h4>
                    <div className="h-[250px] flex items-center justify-center text-slate-600 text-xs italic border border-dashed border-slate-800 rounded">
                      [Detailed {type} Analysis Chart]
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PAGE 3: KPIs */}
            {activeTab === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in">
                {[
                  { val: '1,284,000', label: 'Total Crude Run (bbl)', color: 'text-white' },
                  { val: '86.2%', label: 'Utilization %', color: 'text-brand-400' },
                  { val: '46.3%', label: 'Gasoline Yield %', color: 'text-white' },
                  { val: '28.7%', label: 'Diesel Yield %', color: 'text-white' },
                  { val: '9.8%', label: 'Jet Fuel Yield %', color: 'text-white' },
                  { val: '$4.2M', label: 'Est. Energy Savings', color: 'text-green-400' },
                ].map((kpi, i) => (
                  <div key={i} className="bg-slate-900/30 border border-slate-800 rounded-xl p-8 text-center hover:bg-slate-800/50 transition-colors">
                    <div className={`font-display text-4xl font-bold ${kpi.color} mb-2`}>{kpi.val}</div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">{kpi.label}</div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </section>

      {/* DATA ARCHITECTURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <span className="text-brand-400 text-xs font-bold tracking-wider uppercase">Under the Hood</span>
          <h2 className="font-display text-3xl font-bold text-white mt-2">Data Architecture & Model</h2>
          <p className="text-slate-400 mt-2">Five interconnected data tables, custom DAX measures, and a star schema.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { title: 'plant', fields: 'state · capacity_bpd · plant_id', desc: 'Master reference with location & capacity.' },
            { title: 'input_monthly', fields: 'domestic_bbl · imported_bbl', desc: 'Monthly crude intake tracking.' },
            { title: 'output_monthly', fields: 'gasoline · diesel · jet_fuel', desc: 'Product output and yields.' },
            { title: 'energy_emissions', fields: 'steam · gas · electricity', desc: 'Energy consumption tracking.' },
            { title: 'downtime', fields: 'hours · reason · plant_id', desc: 'Maintenance intelligence.' }
          ].map((table, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl hover:border-brand-500/30 transition-colors">
              <Database className="w-5 h-5 text-brand-500 mb-3" />
              <h4 className="font-mono text-sm font-bold text-brand-100 mb-2">{table.title}</h4>
              <div className="text-[10px] font-mono text-slate-500 mb-3 leading-relaxed">{table.fields}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{table.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-6">Ready to transform <span className="text-brand-400">your</span> data?</h2>
          <p className="text-lg text-slate-400 mb-10">Whether you need a Power BI dashboard, automated workflows, or a custom application — we deliver results fast.</p>
          <a href="/#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-full font-bold transition-all hover:scale-105 shadow-[0_0_30px_rgba(2,132,199,0.4)]">
            Start Your Project <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

    </div>
  );
};

export default RefineryDashboard;
