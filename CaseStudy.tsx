import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { ArrowLeft, Check, X as XIcon } from 'lucide-react';

Chart.register(...registerables);

// ─── Chart helper ───
function useChart(
  factory: (ctx: CanvasRenderingContext2D) => Chart
): React.RefObject<HTMLCanvasElement | null> {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = ref.current.getContext('2d');
    if (!ctx) return;
    chartRef.current = factory(ctx);
    return () => {
      chartRef.current?.destroy();
    };
  }, []);

  return ref;
}

const chartScales = {
  x: { ticks: { color: '#64748b', font: { size: 10, family: 'Inter' } }, grid: { color: 'rgba(148,163,184,0.06)' } },
  y: { ticks: { color: '#64748b', font: { size: 10, family: 'Inter' } }, grid: { color: 'rgba(148,163,184,0.06)' } },
};
const chartLegend = { display: true, labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 }, boxWidth: 12 } };
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// ─── Sub-components ───

const CaseHero = () => (
  <section className="min-h-[70vh] flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="max-w-5xl mx-auto w-full">
      <div className="reveal-on-scroll">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-brand-500/20 shadow-sm mb-8 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-brand-400 animate-pulse"></span>
          <span className="text-xs font-semibold tracking-widest uppercase text-brand-100">Case Study</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Multi-Refinery Production{' '}
          <span className="gradient-text">Intelligence Dashboard</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mb-12">
          How we unified operations data across 3 petroleum refineries into a single source of truth — driving real-time visibility into capacity, yield, energy &amp; downtime.
        </p>

        <div className="flex flex-wrap gap-8 sm:gap-12">
          {[
            { label: 'Industry', value: 'Oil & Gas / Petroleum' },
            { label: 'Tools', value: 'Power BI · DAX · GIS' },
            { label: 'Scope', value: '3 Refineries · 6+ KPIs' },
            { label: 'Delivered by', value: 'Darkmoon AI Solution', accent: true },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-slate-500">{item.label}</span>
              <span className={`font-display font-semibold ${item.accent ? 'text-brand-400' : 'text-white'}`}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Divider = () => (
  <div className="h-px mx-4 sm:mx-8 lg:mx-16 bg-gradient-to-r from-transparent via-slate-700/40 to-transparent" />
);

const BeforeAfter = () => (
  <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      <div className="reveal-on-scroll mb-12">
        <span className="inline-block py-1 px-3 rounded-full bg-brand-500/10 text-brand-400 text-xs font-bold tracking-wider uppercase mb-4 border border-brand-500/20">
          The Transformation
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-5 text-white leading-tight">
          From Spreadsheet Chaos to Real-Time Intelligence
        </h2>
        <p className="text-lg text-slate-400 max-w-3xl">
          The client was drowning in disconnected data across 3 refinery sites. Here's what changed.
        </p>
      </div>

      {/* Comparison */}
      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-0 mb-16 reveal-on-scroll">
        {/* Before */}
        <div className="glass-card rounded-2xl p-8 border-red-500/20">
          <h3 className="font-display text-lg font-bold text-red-400 flex items-center gap-2 mb-6">
            <XIcon className="h-5 w-5" /> Before Darkmoon AI
          </h3>
          <ul className="space-y-4">
            {[
              'Each refinery tracked production in separate Excel files — no cross-plant visibility',
              'Monthly yield reports took 2-3 days of manual data aggregation',
              'Energy costs (steam, gas, electricity) were never visualized against production',
              'Equipment downtime buried in maintenance logs — no trend analysis',
              'Domestic vs. imported crude split untracked — supply chain risk invisible',
              'Executives made decisions on stale, incomplete data',
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
                <XIcon className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center text-slate-600 text-3xl font-light px-4 md:rotate-0 rotate-90">
          &rarr;
        </div>

        {/* After */}
        <div className="glass-card rounded-2xl p-8 border-emerald-500/25 bg-gradient-to-br from-[rgba(15,23,42,0.6)] to-[rgba(6,214,160,0.03)]">
          <h3 className="font-display text-lg font-bold text-emerald-400 flex items-center gap-2 mb-6">
            <Check className="h-5 w-5" /> After Darkmoon AI
          </h3>
          <ul className="space-y-4">
            {[
              'Single interactive dashboard unifying all 3 refineries in real time',
              'Instant KPI cards: utilization %, yield %, crude run — updated live',
              'Energy consumption trends correlated with production for cost optimization',
              'Quarterly downtime analysis with cross-plant comparison and patterns',
              'Per-refinery crude sourcing donut charts quantifying import dependency',
              'GIS map with capacity bubbles and utilization color-coding',
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                <Check className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 reveal-on-scroll">
        {[
          { value: '3', label: 'Refineries Unified' },
          { value: '6+', label: 'Live KPIs' },
          { value: '5', label: 'Data Sources' },
          { value: '3', label: 'Dashboard Pages' },
          { value: '~90%', label: 'Faster Reporting' },
          { value: '24/7', label: 'Live Monitoring' },
        ].map((kpi) => (
          <div key={kpi.label} className="glass-card rounded-xl p-5 text-center hover:border-brand-400/50 transition-all duration-300 group hover:-translate-y-1">
            <div className="font-display text-3xl font-bold text-brand-400 mb-1 group-hover:scale-105 transition-transform">{kpi.value}</div>
            <div className="text-[11px] font-semibold tracking-wider uppercase text-slate-500">{kpi.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Dashboard Section ───

const MapVisual = () => (
  <div className="h-72 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800/80 relative overflow-hidden border border-slate-700/30">
    {/* Subtle radial glows */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-brand-500/5 blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-brand-500/4 blur-3xl" />
    </div>
    {/* US outline hint */}
    <div className="absolute inset-6 border border-brand-500/[0.04] rounded-[30%_20%_20%_30%]" />

    {/* Pins */}
    {[
      { top: '62%', left: '55%', name: 'Baytown, TX', cap: '560K bpd · 92%', size: 16 },
      { top: '42%', left: '50%', name: 'Wood River, IL', cap: '340K bpd · 87%', size: 12 },
      { top: '55%', left: '18%', name: 'Los Angeles, CA', cap: '430K bpd · 79%', size: 14 },
    ].map((pin) => (
      <div key={pin.name} className="absolute flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2 z-10" style={{ top: pin.top, left: pin.left }}>
        <div
          className="rounded-full bg-brand-400 shadow-[0_0_16px_rgba(56,189,248,0.4)] animate-pulse relative"
          style={{ width: pin.size, height: pin.size }}
        >
          <div className="absolute -inset-1.5 border-2 border-brand-400/30 rounded-full animate-ping" />
        </div>
        <div className="text-[10px] font-mono text-brand-400 bg-slate-950/80 px-2 py-0.5 rounded border border-brand-500/20 whitespace-nowrap">
          {pin.name} <span className="text-slate-500 text-[9px]">· {pin.cap}</span>
        </div>
      </div>
    ))}
  </div>
);

const DashboardPanel: React.FC<{ title: string; subtitle: string; full?: boolean; children: React.ReactNode }> = ({ title, subtitle, full, children }) => (
  <div className={`glass-card rounded-xl p-5 ${full ? 'col-span-1 md:col-span-2' : ''}`}>
    <div className="font-display text-sm font-semibold text-white mb-1">{title}</div>
    <div className="text-[11px] text-slate-500 mb-4">{subtitle}</div>
    {children}
  </div>
);

const DowntimeChart = () => {
  const ref = useChart((ctx) =>
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Q1 2023','Q2 2023','Q3 2023','Q4 2023','Q1 2024','Q2 2024','Q3 2024','Q4 2024'],
        datasets: [
          { label: 'Baytown', data: [120,85,210,95,110,72,180,88], backgroundColor: 'rgba(56,189,248,0.7)', borderRadius: 3 },
          { label: 'Wood River', data: [90,110,145,80,95,130,100,70], backgroundColor: 'rgba(6,214,160,0.7)', borderRadius: 3 },
          { label: 'Los Angeles', data: [150,95,120,170,140,88,105,160], backgroundColor: 'rgba(245,158,11,0.7)', borderRadius: 3 },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { ...chartLegend, position: 'top' } }, scales: chartScales },
    })
  );
  return <div className="h-72"><canvas ref={ref} /></div>;
};

const DonutChart: React.FC<{ id: string; domestic: number; imported: number }> = ({ id, domestic, imported }) => {
  const ref = useChart((ctx) =>
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Domestic', 'Imported'],
        datasets: [{ data: [domestic, imported], backgroundColor: ['rgba(56,189,248,0.8)', 'rgba(245,158,11,0.8)'], borderWidth: 0, cutout: '65%' }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: true, position: 'bottom', labels: { color: '#94a3b8', font: { size: 11, family: 'Inter' }, boxWidth: 10 } },
          tooltip: { callbacks: { label: (ctx: any) => `${ctx.label}: ${ctx.raw}%` } },
        },
      },
    })
  );
  return <canvas ref={ref} />;
};

const LineChart: React.FC<{ datasets: any[]; yLabel?: string }> = ({ datasets }) => {
  const ref = useChart((ctx) =>
    new Chart(ctx, {
      type: 'line',
      data: { labels: months, datasets },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: chartLegend }, scales: chartScales },
    })
  );
  return <div className="h-56"><canvas ref={ref} /></div>;
};

const DashboardSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [energyInit, setEnergyInit] = useState(false);
  const tabs = ['Operations Command', 'Energy & Emissions', 'Executive KPIs'];

  const handleTab = (idx: number) => {
    setActiveTab(idx);
    if (idx === 1 && !energyInit) setEnergyInit(true);
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="reveal-on-scroll mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-brand-500/10 text-brand-400 text-xs font-bold tracking-wider uppercase mb-4 border border-brand-500/20">
            The Dashboard We Built
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-5 text-white leading-tight">
            Interactive Power BI Dashboard — Recreated
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl">
            Every visualization extracted from the production .pbix file. Three pages of actionable intelligence covering operations, energy, and executive KPIs.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="glass-card rounded-2xl overflow-hidden reveal-on-scroll">
          {/* Top bar */}
          <div className="flex items-center gap-3 px-5 py-3 bg-slate-900/80 border-b border-slate-700/40">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <div className="flex ml-4">
              {tabs.map((t, i) => (
                <button
                  key={t}
                  onClick={() => handleTab(i)}
                  className={`px-4 py-1.5 text-[11px] font-mono tracking-wide border border-slate-700/60 border-b-0 transition-all cursor-pointer ${
                    i === 0 ? 'rounded-tl-lg' : i === tabs.length - 1 ? 'rounded-tr-lg' : ''
                  } ${activeTab === i ? 'bg-slate-800/60 text-brand-400 border-brand-500/30' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-7">
            {/* Page 0: Operations */}
            {activeTab === 0 && (
              <div className="grid md:grid-cols-2 gap-5">
                <DashboardPanel title="Refinery Locations & Utilization" subtitle="ESRI GIS Map · Bubble = Capacity (bpd) · Color = Utilization %">
                  <MapVisual />
                </DashboardPanel>

                <DashboardPanel title="Downtime (hours) by Plant & Quarter" subtitle="Clustered Column + Trend Line · Quarterly breakdown">
                  <DowntimeChart />
                </DashboardPanel>

                <DashboardPanel title="Crude Oil Sourcing — Domestic vs. Imported" subtitle="Per-refinery import dependency analysis" full>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                      { name: 'Baytown, TX', d: 72, i: 28 },
                      { name: 'Wood River, IL', d: 85, i: 15 },
                      { name: 'Los Angeles, CA', d: 55, i: 45 },
                    ].map((r) => (
                      <div key={r.name} className="text-center">
                        <div className="max-w-[180px] mx-auto"><DonutChart id={r.name} domestic={r.d} imported={r.i} /></div>
                        <div className="text-[11px] font-mono text-slate-500 mt-2 tracking-wide">{r.name}</div>
                      </div>
                    ))}
                  </div>
                </DashboardPanel>

                <DashboardPanel title="Steam Consumption (MMBtu)" subtitle="Monthly trend by year">
                  <LineChart
                    datasets={[
                      { label: '2023', data: [480,510,490,520,560,590,610,600,570,530,500,490], borderColor: '#38bdf8', backgroundColor: 'rgba(56,189,248,0.05)', fill: true, tension: 0.4, pointRadius: 2 },
                      { label: '2024', data: [460,490,505,540,575,605,620,610,580,545,510,480], borderColor: '#06D6A0', backgroundColor: 'rgba(6,214,160,0.05)', fill: true, tension: 0.4, pointRadius: 2 },
                    ]}
                  />
                </DashboardPanel>

                <DashboardPanel title="Natural Gas (MMBtu) & Electricity (MWh)" subtitle="Dual-axis monthly trend">
                  <LineChart
                    datasets={[
                      { label: 'Natural Gas', data: [320,340,330,350,380,400,410,405,390,360,340,325], borderColor: '#f59e0b', tension: 0.4, pointRadius: 2 },
                      { label: 'Electricity', data: [180,190,195,210,230,250,260,255,240,220,200,185], borderColor: '#ef4444', tension: 0.4, pointRadius: 2 },
                    ]}
                  />
                </DashboardPanel>
              </div>
            )}

            {/* Page 1: Energy */}
            {activeTab === 1 && energyInit && (
              <div className="grid md:grid-cols-3 gap-5">
                <DashboardPanel title="Steam by Year (MMBtu)" subtitle="Year-over-year comparison">
                  <LineChart
                    datasets={[
                      { label: '2022', data: [450,470,460,490,530,560,580,570,540,510,480,460], borderColor: '#64748b', tension: 0.4, pointRadius: 2, borderDash: [5,5] },
                      { label: '2023', data: [480,510,490,520,560,590,610,600,570,530,500,490], borderColor: '#38bdf8', tension: 0.4, pointRadius: 2 },
                      { label: '2024', data: [460,490,505,540,575,605,620,610,580,545,510,480], borderColor: '#06D6A0', tension: 0.4, pointRadius: 3 },
                    ]}
                  />
                </DashboardPanel>
                <DashboardPanel title="Natural Gas by Year (MMBtu)" subtitle="Year-over-year comparison">
                  <LineChart
                    datasets={[
                      { label: '2022', data: [300,310,305,330,360,380,390,385,370,340,320,310], borderColor: '#64748b', tension: 0.4, pointRadius: 2, borderDash: [5,5] },
                      { label: '2023', data: [320,340,330,350,380,400,410,405,390,360,340,325], borderColor: '#f59e0b', tension: 0.4, pointRadius: 2 },
                      { label: '2024', data: [310,330,340,365,395,415,425,415,395,370,345,330], borderColor: '#06D6A0', tension: 0.4, pointRadius: 3 },
                    ]}
                  />
                </DashboardPanel>
                <DashboardPanel title="Electricity by Year (MWh)" subtitle="Year-over-year comparison">
                  <LineChart
                    datasets={[
                      { label: '2022', data: [170,175,180,195,215,235,245,240,225,210,190,175], borderColor: '#64748b', tension: 0.4, pointRadius: 2, borderDash: [5,5] },
                      { label: '2023', data: [180,190,195,210,230,250,260,255,240,220,200,185], borderColor: '#ef4444', tension: 0.4, pointRadius: 2 },
                      { label: '2024', data: [175,185,200,220,245,265,275,268,250,230,208,190], borderColor: '#06D6A0', tension: 0.4, pointRadius: 3 },
                    ]}
                  />
                </DashboardPanel>
              </div>
            )}

            {/* Page 2: Executive KPIs */}
            {activeTab === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { value: '1,284,000', label: 'Total Crude Run (bbl)', color: 'text-white' },
                  { value: '1,490,000', label: 'Plant Nominal Capacity (bbl/mo)', color: 'text-white' },
                  { value: '86.2%', label: 'Utilization %', color: 'text-emerald-400' },
                  { value: '46.3%', label: 'Gasoline Yield %', color: 'text-white' },
                  { value: '28.7%', label: 'Diesel Yield %', color: 'text-white' },
                  { value: '9.8%', label: 'Jet Fuel Yield %', color: 'text-white' },
                ].map((kpi) => (
                  <div key={kpi.label} className="glass-card rounded-xl p-7 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-500 to-emerald-400" />
                    <div className={`font-display text-3xl font-bold mb-1 ${kpi.color}`}>{kpi.value}</div>
                    <div className="text-sm text-slate-500">{kpi.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Data Architecture ───
const DataArchitecture = () => (
  <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      <div className="reveal-on-scroll mb-12">
        <span className="inline-block py-1 px-3 rounded-full bg-brand-500/10 text-brand-400 text-xs font-bold tracking-wider uppercase mb-4 border border-brand-500/20">
          Under the Hood
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-5 text-white leading-tight">
          Data Architecture &amp; Model
        </h2>
        <p className="text-lg text-slate-400 max-w-3xl">
          Five interconnected data tables, custom DAX measures, and a star schema designed for speed and flexibility.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 reveal-on-scroll">
        {[
          { name: 'plant', fields: 'state · capacity_bpd · plant_id', desc: 'Master reference with location, capacity, and utilization calculations.' },
          { name: 'input_monthly', fields: 'domestic_bbl · imported_bbl · date · plant_id', desc: 'Monthly crude intake tracking by domestic vs. imported source.' },
          { name: 'output_monthly', fields: 'gasoline · diesel · jet_fuel yields', desc: 'Product output and DAX-calculated yield percentages per product.' },
          { name: 'energy_emissions', fields: 'steam_mmbtu · natural_gas_mmbtu · electricity_mwh · date', desc: 'Energy consumption tracking for cost and efficiency analysis.' },
          { name: 'Downtime', fields: 'downtime_hours · plant_id', desc: 'Equipment downtime records by plant for maintenance intelligence.' },
        ].map((table) => (
          <div key={table.name} className="glass-card rounded-xl p-6 hover:border-brand-400/50 transition-all duration-300">
            <h4 className="font-mono text-brand-400 font-semibold mb-2">{table.name}</h4>
            <div className="font-mono text-xs text-slate-500 mb-3 leading-relaxed">{table.fields}</div>
            <p className="text-sm text-slate-400 leading-relaxed">{table.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Business Impact ───
const BusinessImpact = () => (
  <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      <div className="reveal-on-scroll mb-12">
        <span className="inline-block py-1 px-3 rounded-full bg-brand-500/10 text-brand-400 text-xs font-bold tracking-wider uppercase mb-4 border border-brand-500/20">
          Results
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-5 text-white leading-tight">
          Business Impact &amp; Efficiency Gains
        </h2>
        <p className="text-lg text-slate-400 max-w-3xl">
          This dashboard eliminated manual reporting and turned raw data into operational intelligence.
        </p>
      </div>

      <div className="space-y-3 reveal-on-scroll">
        {[
          { area: 'Decision Speed', result: 'From 2-3 days of manual Excel aggregation to instant, interactive insights across all 3 refineries.' },
          { area: 'Utilization Visibility', result: 'Real-time capacity utilization tracking eliminated blind spots — underperforming plants flagged immediately.' },
          { area: 'Energy Cost Control', result: 'First-ever correlation of steam, gas, and electricity against production volumes — revealing hidden inefficiencies.' },
          { area: 'Downtime Intelligence', result: 'Quarterly trend analysis enabled predictive maintenance planning across all facilities.' },
          { area: 'Supply Chain Risk', result: 'Per-refinery domestic vs. import visibility enables proactive supply diversification before disruptions hit.' },
          { area: 'Yield Optimization', result: 'Live gasoline, diesel, and jet fuel yield tracking allows engineers to catch underperformance same-period.' },
        ].map((row) => (
          <div key={row.area} className="glass-card rounded-xl flex flex-col sm:flex-row overflow-hidden">
            <div className="sm:w-56 flex-shrink-0 px-6 py-5 font-display font-semibold text-white border-l-[3px] border-brand-500">
              {row.area}
            </div>
            <div className="px-6 py-5 text-sm text-slate-400 leading-relaxed">
              {row.result}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Why Us ───
const WhyUs = () => (
  <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      <div className="reveal-on-scroll mb-12">
        <span className="inline-block py-1 px-3 rounded-full bg-brand-500/10 text-brand-400 text-xs font-bold tracking-wider uppercase mb-4 border border-brand-500/20">
          Why Us
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
          Why Darkmoon AI Solution
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 reveal-on-scroll">
        {[
          { num: '01', title: 'Rapid Delivery', desc: 'AI-assisted development means production-grade dashboards in days, not weeks. What takes agencies a month, we ship in a sprint.' },
          { num: '02', title: 'Domain Intelligence', desc: "We don't just build charts. We understand your industry metrics and design dashboards that answer what leadership actually asks." },
          { num: '03', title: 'End-to-End Pipeline', desc: 'From data modeling and DAX measures to GIS mapping and interactive filtering — we handle the complete BI stack.' },
          { num: '04', title: 'Cross-Platform', desc: 'Power BI, n8n automation, API integrations, custom web apps. We meet you where your data lives.' },
          { num: '05', title: 'Cost-Effective', desc: 'Our AI-augmented workflow delivers enterprise-quality at a fraction of big-agency pricing.' },
        ].map((card) => (
          <div key={card.num} className="glass-card rounded-xl p-7 hover:border-brand-400/50 transition-all duration-300 hover:-translate-y-1 group">
            <div className="font-mono text-3xl font-bold text-brand-500/20 mb-3 group-hover:text-brand-500/40 transition-colors">{card.num}</div>
            <h4 className="font-display text-lg font-bold text-white mb-2">{card.title}</h4>
            <p className="text-sm text-slate-400 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── CTA ───
const CaseCTA = () => (
  <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 text-center relative">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-500/[0.06] rounded-full blur-[120px] pointer-events-none" />
    <div className="relative z-10">
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-5 text-white">
        Ready to transform <span className="text-brand-400">your</span> data?
      </h2>
      <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10">
        Whether you need a Power BI dashboard, automated workflows, or a custom application — we deliver results fast.
      </p>
      <a
        href="#contact"
        className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 px-10 rounded-full shadow-2xl shadow-brand-500/30 transition-all hover:scale-105 active:scale-95"
      >
        Get Started
      </a>
      <div className="mt-8">
        <div className="font-display text-xl font-bold text-brand-400">Darkmoon AI Solution LLC</div>
        <div className="text-sm text-slate-500 mt-1">Buffalo, NY · darkmoonai.com</div>
      </div>
    </div>
  </section>
);

// ─── Main Export ───
export interface CaseStudyProps {
  onBack: () => void;
}

const CaseStudy: React.FC<CaseStudyProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div>
      {/* Back button */}
      <div className="sticky top-20 z-40 px-4 sm:px-6 lg:px-8 mb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 hover:text-brand-400 bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-full transition-all hover:border-brand-500/30 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>
      </div>

      <CaseHero />
      <Divider />
      <BeforeAfter />
      <Divider />
      <DashboardSection />
      <Divider />
      <DataArchitecture />
      <Divider />
      <BusinessImpact />
      <Divider />
      <WhyUs />
      <Divider />
      <CaseCTA />
    </div>
  );
};

export default CaseStudy;
