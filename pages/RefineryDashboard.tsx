import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import './RefineryDashboard.css';

const RefineryDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const chartInstances = useRef<{ [key: string]: Chart }>({});
  const energyChartsInitialized = useRef(false);

  // Canvas Refs
  const downtimeChartRef = useRef<HTMLCanvasElement>(null);
  const donut1Ref = useRef<HTMLCanvasElement>(null);
  const donut2Ref = useRef<HTMLCanvasElement>(null);
  const donut3Ref = useRef<HTMLCanvasElement>(null);
  const steamChart1Ref = useRef<HTMLCanvasElement>(null);
  const gasElecChart1Ref = useRef<HTMLCanvasElement>(null);
  const steamDeepRef = useRef<HTMLCanvasElement>(null);
  const gasDeepRef = useRef<HTMLCanvasElement>(null);
  const elecDeepRef = useRef<HTMLCanvasElement>(null);

  // Load Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Initialize Page 0 Charts
  useEffect(() => {
    const chartDefaults = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, labels: { color: '#94A3B8', font: { family: 'DM Sans', size: 11 }, boxWidth: 12 } },
      },
      scales: {
        x: { ticks: { color: '#64748B', font: { size: 10 } }, grid: { color: 'rgba(148,163,184,0.06)' } },
        y: { ticks: { color: '#64748B', font: { size: 10 } }, grid: { color: 'rgba(148,163,184,0.06)' } },
      }
    };

    // Destroy existing charts if any (though usually not needed with empty dependency array unless strict mode)
    Object.values(chartInstances.current).forEach(chart => chart.destroy());
    chartInstances.current = {};

    if (downtimeChartRef.current) {
      chartInstances.current.downtime = new Chart(downtimeChartRef.current, {
        type: 'bar',
        data: {
          labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
          datasets: [
            { label: 'Baytown', data: [120, 85, 210, 95, 110, 72, 180, 88], backgroundColor: 'rgba(59,130,246,0.7)', borderRadius: 3 },
            { label: 'Wood River', data: [90, 110, 145, 80, 95, 130, 100, 70], backgroundColor: 'rgba(6,214,160,0.7)', borderRadius: 3 },
            { label: 'Los Angeles', data: [150, 95, 120, 170, 140, 88, 105, 160], backgroundColor: 'rgba(245,158,11,0.7)', borderRadius: 3 },
          ]
        },
        options: { ...chartDefaults, plugins: { ...chartDefaults.plugins, legend: { ...chartDefaults.plugins.legend, position: 'top' } } }
      });
    }

    const makeDonut = (ref: React.RefObject<HTMLCanvasElement>, key: string, domestic: number, imported: number) => {
      if (ref.current) {
        chartInstances.current[key] = new Chart(ref.current, {
          type: 'doughnut',
          data: {
            labels: ['Domestic', 'Imported'],
            datasets: [{ data: [domestic, imported], backgroundColor: ['rgba(59,130,246,0.8)', 'rgba(245,158,11,0.8)'], borderWidth: 0, cutout: '65%' }]
          },
          options: {
            responsive: false,
            plugins: {
              legend: { display: true, position: 'bottom', labels: { color: '#94A3B8', font: { size: 11 }, boxWidth: 10 } },
              tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.raw}%` } }
            }
          }
        });
      }
    };

    makeDonut(donut1Ref, 'donut1', 72, 28);
    makeDonut(donut2Ref, 'donut2', 85, 15);
    makeDonut(donut3Ref, 'donut3', 55, 45);

    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    if (steamChart1Ref.current) {
      chartInstances.current.steam1 = new Chart(steamChart1Ref.current, {
        type: 'line',
        data: {
          labels: months,
          datasets: [
            { label: '2023', data: [480,510,490,520,560,590,610,600,570,530,500,490], borderColor: '#3B82F6', backgroundColor: 'rgba(59,130,246,0.05)', fill: true, tension: 0.4, pointRadius: 2 },
            { label: '2024', data: [460,490,505,540,575,605,620,610,580,545,510,480], borderColor: '#06D6A0', backgroundColor: 'rgba(6,214,160,0.05)', fill: true, tension: 0.4, pointRadius: 2 },
          ]
        },
        options: chartDefaults
      });
    }

    if (gasElecChart1Ref.current) {
      chartInstances.current.gasElec1 = new Chart(gasElecChart1Ref.current, {
        type: 'line',
        data: {
          labels: months,
          datasets: [
            { label: 'Natural Gas', data: [320,340,330,350,380,400,410,405,390,360,340,325], borderColor: '#F59E0B', tension: 0.4, pointRadius: 2 },
            { label: 'Electricity', data: [180,190,195,210,230,250,260,255,240,220,200,185], borderColor: '#EF4444', tension: 0.4, pointRadius: 2 },
          ]
        },
        options: chartDefaults
      });
    }

    return () => {
      Object.values(chartInstances.current).forEach(chart => chart.destroy());
    };
  }, []);

  // Initialize Page 1 Charts (Lazy)
  useEffect(() => {
    if (activeTab === 1 && !energyChartsInitialized.current) {
      energyChartsInitialized.current = true;
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const chartDefaults = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, labels: { color: '#94A3B8', font: { family: 'DM Sans', size: 11 }, boxWidth: 12 } },
        },
        scales: {
          x: { ticks: { color: '#64748B', font: { size: 10 } }, grid: { color: 'rgba(148,163,184,0.06)' } },
          y: { ticks: { color: '#64748B', font: { size: 10 } }, grid: { color: 'rgba(148,163,184,0.06)' } },
        }
      };

      if (steamDeepRef.current) {
        chartInstances.current.steamDeep = new Chart(steamDeepRef.current, {
          type: 'line',
          data: {
            labels: months,
            datasets: [
              { label: '2022', data: [450,470,460,490,530,560,580,570,540,510,480,460], borderColor: '#64748B', tension: 0.4, pointRadius: 2, borderDash: [5,5] },
              { label: '2023', data: [480,510,490,520,560,590,610,600,570,530,500,490], borderColor: '#3B82F6', tension: 0.4, pointRadius: 2 },
              { label: '2024', data: [460,490,505,540,575,605,620,610,580,545,510,480], borderColor: '#06D6A0', tension: 0.4, pointRadius: 3 },
            ]
          },
          options: chartDefaults
        });
      }

      if (gasDeepRef.current) {
        chartInstances.current.gasDeep = new Chart(gasDeepRef.current, {
          type: 'line',
          data: {
            labels: months,
            datasets: [
              { label: '2022', data: [300,310,305,330,360,380,390,385,370,340,320,310], borderColor: '#64748B', tension: 0.4, pointRadius: 2, borderDash: [5,5] },
              { label: '2023', data: [320,340,330,350,380,400,410,405,390,360,340,325], borderColor: '#F59E0B', tension: 0.4, pointRadius: 2 },
              { label: '2024', data: [310,330,340,365,395,415,425,415,395,370,345,330], borderColor: '#06D6A0', tension: 0.4, pointRadius: 3 },
            ]
          },
          options: chartDefaults
        });
      }

      if (elecDeepRef.current) {
        chartInstances.current.elecDeep = new Chart(elecDeepRef.current, {
          type: 'line',
          data: {
            labels: months,
            datasets: [
              { label: '2022', data: [170,175,180,195,215,235,245,240,225,210,190,175], borderColor: '#64748B', tension: 0.4, pointRadius: 2, borderDash: [5,5] },
              { label: '2023', data: [180,190,195,210,230,250,260,255,240,220,200,185], borderColor: '#EF4444', tension: 0.4, pointRadius: 2 },
              { label: '2024', data: [175,185,200,220,245,265,275,268,250,230,208,190], borderColor: '#06D6A0', tension: 0.4, pointRadius: 3 },
            ]
          },
          options: chartDefaults
        });
      }
    }
  }, [activeTab]);

  return (
    <div id="case-study-wrapper">
      <section className="hero">
        <a href="/" style={{ position: 'absolute', top: 30, left: 30, textDecoration: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 8, zIndex: 10 }}>
          <span>← Back to Portfolio</span>
        </a>
        <div className="hero-badge">Case Study</div>
        <h1>Multi-Refinery Production<br/><span className="highlight">Intelligence Dashboard</span></h1>
        <p className="hero-sub">How we unified operations data across 3 petroleum refineries into a single source of truth — driving real-time visibility into capacity, yield, energy & downtime.</p>
        <div className="hero-meta">
          <div className="hero-meta-item">
            <span className="label">Industry</span>
            <span className="value">Oil & Gas / Petroleum</span>
          </div>
          <div className="hero-meta-item">
            <span className="label">Tools</span>
            <span className="value">Power BI · DAX · GIS</span>
          </div>
          <div className="hero-meta-item">
            <span className="label">Scope</span>
            <span className="value">3 Refineries · 6+ KPIs</span>
          </div>
          <div className="hero-meta-item">
            <span className="label">Delivered by</span>
            <span className="value" style={{color:'var(--accent)'}}>Darkmoon AI Solution</span>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      <section className="section">
        <div className="section-label">The Transformation</div>
        <h2 className="section-title">From Spreadsheet Chaos to Real-Time Intelligence</h2>
        <p className="section-desc">The client was drowning in disconnected data across 3 refinery sites. Here's what changed.</p>
        <div className="comparison-grid">
          <div className="comparison-card before">
            <h3>✕ Before Darkmoon AI</h3>
            <ul>
              <li>Each refinery tracked production in separate Excel files — no cross-plant visibility</li>
              <li>Monthly yield reports took 2-3 days of manual data aggregation</li>
              <li>Energy costs (steam, gas, electricity) were never visualized against production</li>
              <li>Equipment downtime buried in maintenance logs — no trend analysis</li>
              <li>Domestic vs. imported crude split untracked — supply chain risk invisible</li>
              <li>Executives made decisions on stale, incomplete data</li>
            </ul>
          </div>
          <div className="comparison-arrow">→</div>
          <div className="comparison-card after">
            <h3>✓ After Darkmoon AI</h3>
            <ul>
              <li>Single interactive dashboard unifying all 3 refineries in real time</li>
              <li>Instant KPI cards: utilization %, yield %, crude run — updated live</li>
              <li>Energy consumption trends correlated with production for cost optimization</li>
              <li>Quarterly downtime analysis with cross-plant comparison and patterns</li>
              <li>Per-refinery crude sourcing donut charts quantifying import dependency</li>
              <li>GIS map with capacity bubbles and utilization color-coding</li>
            </ul>
          </div>
        </div>
        <div className="kpi-strip">
          <div className="kpi-card">
            <div className="kpi-value">3</div>
            <div className="kpi-label">Refineries Unified</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value">6+</div>
            <div className="kpi-label">Live KPIs</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value">5</div>
            <div className="kpi-label">Data Sources</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value">3</div>
            <div className="kpi-label">Dashboard Pages</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value">~90%</div>
            <div className="kpi-label">Faster Reporting</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value">24/7</div>
            <div className="kpi-label">Live Monitoring</div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      <section className="section">
        <div className="section-label">The Dashboard We Built</div>
        <h2 className="section-title">Interactive Power BI Dashboard — Recreated</h2>
        <p className="section-desc">Every visualization extracted from the production .pbix file. Three pages of actionable intelligence covering operations, energy, and executive KPIs.</p>
        <div className="dashboard-frame">
          <div className="dashboard-topbar">
            <div className="dashboard-dot r"></div>
            <div className="dashboard-dot y"></div>
            <div className="dashboard-dot g"></div>
            <div className="dashboard-tab-bar">
              <div className={`dashboard-tab ${activeTab === 0 ? 'active' : ''}`} onClick={() => setActiveTab(0)}>Operations Command</div>
              <div className={`dashboard-tab ${activeTab === 1 ? 'active' : ''}`} onClick={() => setActiveTab(1)}>Energy & Emissions</div>
              <div className={`dashboard-tab ${activeTab === 2 ? 'active' : ''}`} onClick={() => setActiveTab(2)}>Executive KPIs</div>
            </div>
          </div>
          <div className="dashboard-body">

            {/* Page 0 */}
            <div className={`dashboard-page ${activeTab === 0 ? 'active' : ''}`} id="page-0">
              <div className="dash-grid-ops">
                <div className="dash-panel">
                  <div className="dash-panel-title">Refinery Locations & Utilization</div>
                  <div className="dash-panel-subtitle">ESRI GIS Map · Bubble = Capacity (bpd) · Color = Utilization %</div>
                  <div className="map-visual">
                    <div className="us-outline"></div>
                    <div className="map-pin" style={{top:'62%', left:'55%'}}>
                      <div className="map-pin-dot" style={{width:'20px', height:'20px'}}></div>
                      <div className="map-pin-label">Baytown, TX <span className="cap">· 560K bpd · 92%</span></div>
                    </div>
                    <div className="map-pin" style={{top:'42%', left:'50%'}}>
                      <div className="map-pin-dot" style={{width:'14px', height:'14px', animationDelay:'1s'}}></div>
                      <div className="map-pin-label">Wood River, IL <span className="cap">· 340K bpd · 87%</span></div>
                    </div>
                    <div className="map-pin" style={{top:'55%', left:'18%'}}>
                      <div className="map-pin-dot" style={{width:'16px', height:'16px', animationDelay:'0.5s'}}></div>
                      <div className="map-pin-label">Los Angeles, CA <span className="cap">· 430K bpd · 79%</span></div>
                    </div>
                  </div>
                </div>
                <div className="dash-panel">
                  <div className="dash-panel-title">Downtime (hours) by Plant & Quarter</div>
                  <div className="dash-panel-subtitle">Clustered Column + Trend Line · Quarterly breakdown</div>
                  <div className="chart-container tall"><canvas ref={downtimeChartRef}></canvas></div>
                </div>
                <div className="dash-panel full">
                  <div className="dash-panel-title">Crude Oil Sourcing — Domestic vs. Imported</div>
                  <div className="dash-panel-subtitle">Per-refinery import dependency analysis</div>
                  <div className="donut-grid">
                    <div className="donut-item">
                      <canvas ref={donut1Ref} width="160" height="160"></canvas>
                      <div className="donut-label">Baytown, TX</div>
                    </div>
                    <div className="donut-item">
                      <canvas ref={donut2Ref} width="160" height="160"></canvas>
                      <div className="donut-label">Wood River, IL</div>
                    </div>
                    <div className="donut-item">
                      <canvas ref={donut3Ref} width="160" height="160"></canvas>
                      <div className="donut-label">Los Angeles, CA</div>
                    </div>
                  </div>
                </div>
                <div className="dash-panel">
                  <div className="dash-panel-title">Steam Consumption (MMBtu)</div>
                  <div className="dash-panel-subtitle">Monthly trend by year</div>
                  <div className="chart-container"><canvas ref={steamChart1Ref}></canvas></div>
                </div>
                <div className="dash-panel">
                  <div className="dash-panel-title">Natural Gas (MMBtu) & Electricity (MWh)</div>
                  <div className="dash-panel-subtitle">Dual-axis monthly trend</div>
                  <div className="chart-container"><canvas ref={gasElecChart1Ref}></canvas></div>
                </div>
              </div>
            </div>

            {/* Page 1 */}
            <div className={`dashboard-page ${activeTab === 1 ? 'active' : ''}`} id="page-1">
              <div className="energy-grid">
                <div className="dash-panel">
                  <div className="dash-panel-title">Steam by Year (MMBtu)</div>
                  <div className="dash-panel-subtitle">Year-over-year comparison</div>
                  <div className="chart-container tall"><canvas ref={steamDeepRef}></canvas></div>
                </div>
                <div className="dash-panel">
                  <div className="dash-panel-title">Natural Gas by Year (MMBtu)</div>
                  <div className="dash-panel-subtitle">Year-over-year comparison</div>
                  <div className="chart-container tall"><canvas ref={gasDeepRef}></canvas></div>
                </div>
                <div className="dash-panel">
                  <div className="dash-panel-title">Electricity by Year (MWh)</div>
                  <div className="dash-panel-subtitle">Year-over-year comparison</div>
                  <div className="chart-container tall"><canvas ref={elecDeepRef}></canvas></div>
                </div>
              </div>
            </div>

            {/* Page 2 */}
            <div className={`dashboard-page ${activeTab === 2 ? 'active' : ''}`} id="page-2">
              <div className="kpi-exec-grid">
                <div className="kpi-exec-card">
                  <div className="kpi-exec-value">1,284,000</div>
                  <div className="kpi-exec-label">Total Crude Run (bbl)</div>
                </div>
                <div className="kpi-exec-card">
                  <div className="kpi-exec-value">1,490,000</div>
                  <div className="kpi-exec-label">Plant Nominal Capacity (bbl/mo)</div>
                </div>
                <div className="kpi-exec-card">
                  <div className="kpi-exec-value" style={{color:'var(--accent2)'}}>86.2%</div>
                  <div className="kpi-exec-label">Utilization %</div>
                </div>
                <div className="kpi-exec-card">
                  <div className="kpi-exec-value">46.3%</div>
                  <div className="kpi-exec-label">Gasoline Yield %</div>
                </div>
                <div className="kpi-exec-card">
                  <div className="kpi-exec-value">28.7%</div>
                  <div className="kpi-exec-label">Diesel Yield %</div>
                </div>
                <div className="kpi-exec-card">
                  <div className="kpi-exec-value">9.8%</div>
                  <div className="kpi-exec-label">Jet Fuel Yield %</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      <section className="section">
        <div className="section-label">Under the Hood</div>
        <h2 className="section-title">Data Architecture & Model</h2>
        <p className="section-desc">Five interconnected data tables, custom DAX measures, and a star schema designed for speed and flexibility.</p>
        <div className="data-arch-grid">
          <div className="data-table-card">
            <h4>plant</h4>
            <div className="fields">state · capacity_bpd · plant_id</div>
            <p>Master reference with location, capacity, and utilization calculations.</p>
          </div>
          <div className="data-table-card">
            <h4>input_monthly</h4>
            <div className="fields">domestic_bbl · imported_bbl · date · plant_id</div>
            <p>Monthly crude intake tracking by domestic vs. imported source.</p>
          </div>
          <div className="data-table-card">
            <h4>output_monthly</h4>
            <div className="fields">gasoline · diesel · jet_fuel yields</div>
            <p>Product output and DAX-calculated yield percentages per product.</p>
          </div>
          <div className="data-table-card">
            <h4>energy_emissions</h4>
            <div className="fields">steam_mmbtu · natural_gas_mmbtu · electricity_mwh · date</div>
            <p>Energy consumption tracking for cost and efficiency analysis.</p>
          </div>
          <div className="data-table-card">
            <h4>Downtime</h4>
            <div className="fields">downtime_hours · plant_id</div>
            <p>Equipment downtime records by plant for maintenance intelligence.</p>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      <section className="section">
        <div className="section-label">Results</div>
        <h2 className="section-title">Business Impact & Efficiency Gains</h2>
        <p className="section-desc">This dashboard eliminated manual reporting and turned raw data into operational intelligence.</p>
        <table className="impact-table">
          <thead>
            <tr>
              <th>Impact Area</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Decision Speed</td>
              <td>From 2-3 days of manual Excel aggregation to instant, interactive insights across all 3 refineries.</td>
            </tr>
            <tr>
              <td>Utilization Visibility</td>
              <td>Real-time capacity utilization tracking eliminated blind spots — underperforming plants flagged immediately.</td>
            </tr>
            <tr>
              <td>Energy Cost Control</td>
              <td>First-ever correlation of steam, gas, and electricity against production volumes — revealing hidden inefficiencies.</td>
            </tr>
            <tr>
              <td>Downtime Intelligence</td>
              <td>Quarterly trend analysis enabled predictive maintenance planning across all facilities.</td>
            </tr>
            <tr>
              <td>Supply Chain Risk</td>
              <td>Per-refinery domestic vs. import visibility enables proactive supply diversification before disruptions hit.</td>
            </tr>
            <tr>
              <td>Yield Optimization</td>
              <td>Live gasoline, diesel, and jet fuel yield tracking allows engineers to catch underperformance same-period.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <div className="section-divider"></div>

      <section className="section">
        <div className="section-label">Why Us</div>
        <h2 className="section-title">Why Darkmoon AI Solution</h2>
        <div className="why-grid">
          <div className="why-card">
            <div className="why-num">01</div>
            <h4>Rapid Delivery</h4>
            <p>AI-assisted development means production-grade dashboards in days, not weeks. What takes agencies a month, we ship in a sprint.</p>
          </div>
          <div className="why-card">
            <div className="why-num">02</div>
            <h4>Domain Intelligence</h4>
            <p>We don't just build charts. We understand your industry metrics and design dashboards that answer what leadership actually asks.</p>
          </div>
          <div className="why-card">
            <div className="why-num">03</div>
            <h4>End-to-End Pipeline</h4>
            <p>From data modeling and DAX measures to GIS mapping and interactive filtering — we handle the complete BI stack.</p>
          </div>
          <div className="why-card">
            <div className="why-num">04</div>
            <h4>Cross-Platform</h4>
            <p>Power BI, n8n automation, API integrations, custom web apps. We meet you where your data lives.</p>
          </div>
          <div className="why-card">
            <div className="why-num">05</div>
            <h4>Cost-Effective</h4>
            <p>Our AI-augmented workflow delivers enterprise-quality at a fraction of big-agency pricing.</p>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      <section className="cta-section">
        <h2 className="cta-title">Ready to transform <span style={{color:'var(--accent)'}}>your</span> data?</h2>
        <p className="cta-desc">Whether you need a Power BI dashboard, automated workflows, or a custom application — we deliver results fast.</p>
        <div className="cta-brand">Darkmoon AI Solution LLC</div>
        <div className="cta-contact">Buffalo, NY · darkmoonai.com</div>
      </section>
    </div>
  );
};

export default RefineryDashboard;
