import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Database, BarChart3, CloudCog, FileSpreadsheet, AlertCircle, Zap, Activity } from 'lucide-react';
import './RefineryDashboard.css';

const RefineryDashboard = () => {

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

  return (
    <div id="case-study-wrapper">
      <section className="hero">
        <Link to="/" style={{ position: 'absolute', top: 30, left: 30, textDecoration: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 8, zIndex: 10 }}>
          <span>← Back to Portfolio</span>
        </Link>
        <h1>Multi-Refinery Production<br/><span className="highlight">Intelligence Dashboard</span></h1>
        <p className="hero-sub">Unified operations data across 3 petroleum refineries into a single source of truth — driving real-time visibility into capacity, yield, energy & downtime.</p>
        <div className="hero-meta">
          <div className="hero-meta-item">
            <span className="label">Industry</span>
            <span className="value">Oil & Gas</span>
          </div>
          <div className="hero-meta-item">
            <span className="label">Tools</span>
            <span className="value">Power BI · DAX · GIS</span>
          </div>
          <div className="hero-meta-item">
            <span className="label">Impact</span>
            <span className="value">90% Faster Reporting</span>
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
        <h2 className="section-title">From Spreadsheet Chaos to Real-Time Clarity</h2>
        <p className="section-desc">The client was managing 3 refineries using hundreds of disconnected Excel files. We centralized everything into one automated dashboard.</p>

        <div className="scenario-section">
            {/* BEFORE CARD */}
            <div className="scenario-card before">
                <div className="scenario-header">
                    <h3><AlertCircle size={20} /> Before: Data Silos</h3>
                </div>
                <div className="scenario-visual">
                    <div className="spreadsheet-grid">
                        {[...Array(16)].map((_, i) => (
                            <div key={i} className="spreadsheet-item">
                                {i % 3 === 0 && <div className="alert-icon">!</div>}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="scenario-desc">
                    Fragmentation. Manual aggregation took 2-3 days per month. Zero visibility into cross-site performance.
                </div>
            </div>

            {/* AFTER CARD */}
            <div className="scenario-card after">
                <div className="scenario-header">
                    <h3><Zap size={20} /> After: Unified Intelligence</h3>
                </div>
                <div className="scenario-visual">
                    <div className="dashboard-clean">
                        <div className="clean-map">
                            <div className="clean-pin" style={{top: '40%', left: '50%'}}></div>
                            <div className="clean-pin" style={{top: '60%', left: '20%'}}></div>
                            <div className="clean-pin" style={{top: '55%', left: '70%'}}></div>
                        </div>
                        <div className="clean-metric">
                            <span className="label">Utilization</span>
                            <span className="value">92%</span>
                        </div>
                        <div className="clean-list">
                             <div className="clean-list-item"></div>
                             <div className="clean-list-item"></div>
                             <div className="clean-list-item"></div>
                        </div>
                        <div className="clean-metric lg">
                            <span className="label">Total Capacity</span>
                            <span className="value">1.4M</span>
                        </div>
                    </div>
                </div>
                <div className="scenario-desc">
                    Automation. Real-time KPIs for all 3 sites instantly. Proactive decision making based on live data.
                </div>
            </div>
        </div>
      </section>

      <div className="section-divider"></div>

      <section className="section">
        <div className="section-label">Results</div>
        <h2 className="section-title">Immediate Business Impact</h2>
        <p className="section-desc">By eliminating manual reporting, we unlocked massive efficiency gains.</p>

        <div className="impact-grid">
            <div className="impact-card-big">
                <div className="val">3 Days</div>
                <div className="lbl">Saved Per Month</div>
            </div>
            <div className="impact-card-big">
                <div className="val">100%</div>
                <div className="lbl">Real-Time Visibility</div>
            </div>
            <div className="impact-card-big">
                <div className="val">3 Sites</div>
                <div className="lbl">Unified Instantly</div>
            </div>
        </div>
      </section>

      <div className="section-divider"></div>

      <section className="section">
        <div className="section-label">How We Did It</div>
        <h2 className="section-title">Our Process</h2>
        <p className="section-desc">We moved from raw data to actionable insights in three steps.</p>

        <div className="process-steps">
            <div className="process-step">
                <div className="process-icon"><Database size={24} /></div>
                <h4>1. Consolidate</h4>
                <p>Connected 5 disparate data sources (Excel, SQL, IoT logs) into a single optimized star-schema model.</p>
            </div>
            <div className="process-step">
                <div className="process-icon"><CloudCog size={24} /></div>
                <h4>2. Automate</h4>
                <p>Built DAX measures to automatically calculate complex yields and energy costs in real-time.</p>
            </div>
            <div className="process-step">
                <div className="process-icon"><BarChart3 size={24} /></div>
                <h4>3. Visualize</h4>
                <p>Designed an interactive Power BI dashboard for executives to monitor KPIs at a glance.</p>
            </div>
        </div>
      </section>

      <div className="section-divider"></div>

      <section className="section">
        <div className="section-label">Why Us</div>
        <h2 className="section-title">Why Darkmoon AI Solution</h2>
        <div className="why-grid">
          <div className="why-card">
            <div className="why-num">01</div>
            <h4>Rapid Delivery</h4>
            <p>AI-assisted development means production-grade dashboards in days, not weeks.</p>
          </div>
          <div className="why-card">
            <div className="why-num">02</div>
            <h4>Domain Intelligence</h4>
            <p>We understand industry metrics and design dashboards that answer leadership's questions.</p>
          </div>
          <div className="why-card">
            <div className="why-num">03</div>
            <h4>End-to-End Pipeline</h4>
            <p>From data modeling to final visualization, we handle the complete BI stack.</p>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      <section className="cta-section">
        <h2 className="cta-title">Ready to transform <span style={{color:'var(--accent)'}}>your</span> data?</h2>
        <p className="cta-desc">Get a custom dashboard built for your business needs.</p>
        <div className="cta-brand">Darkmoon AI Solution LLC</div>
        <div className="cta-contact">darkmoonai.com</div>
      </section>
    </div>
  );
};

export default RefineryDashboard;
