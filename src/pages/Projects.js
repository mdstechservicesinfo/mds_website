import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

function Projects() {
  return (
    <div style={{ background: '#040610', minHeight: '100vh', color: '#fff', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          --blue: #2563eb;
          --cyan: #06b6d4;
          --bg: #040610;
          --bg2: #070b1a;
          --border: rgba(255,255,255,0.07);
          --muted: rgba(255,255,255,0.45);
        }

        .projects * { box-sizing: border-box; margin: 0; padding: 0; }

        .page-hero {
          padding: 160px 40px 80px;
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
        }
        .page-hero-glow {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%);
          top: 0; right: 0;
          pointer-events: none;
        }
        .section-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #60a5fa;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 16px;
          display: block;
        }
        .page-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1.05;
          margin-bottom: 24px;
        }
        .page-title span {
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .page-desc {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(15px, 1.5vw, 18px);
          color: var(--muted);
          max-width: 600px;
          line-height: 1.8;
          font-weight: 400;
        }

        /* PROJECTS GRID */
        .projects-section {
          padding: 80px 40px;
          background: var(--bg2);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .projects-inner { max-width: 1280px; margin: 0 auto; }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 48px;
        }
        .project-card {
          padding: 36px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          border-radius: 20px;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .project-card:hover {
          border-color: rgba(37,99,235,0.3);
          background: rgba(37,99,235,0.05);
          transform: translateY(-6px);
        }
        .project-card.featured {
          grid-column: span 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }
        .project-type {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          background: rgba(37,99,235,0.1);
          border: 1px solid rgba(37,99,235,0.2);
          border-radius: 100px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #60a5fa;
          letter-spacing: 0.08em;
          width: fit-content;
        }
        .project-card h3 {
          font-family: 'Outfit', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 1.2;
        }
        .project-card p {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          color: var(--muted);
          line-height: 1.7;
          font-weight: 400;
        }
        .project-features {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .project-features h4 {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.6);
        }
        .feature-dot {
          width: 6px; height: 6px;
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          border-radius: 50%;
          flex-shrink: 0;
        }
        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: rgba(37,99,235,0.15);
          border: 1px solid rgba(37,99,235,0.3);
          border-radius: 10px;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #60a5fa;
          text-decoration: none;
          transition: all 0.3s ease;
          width: fit-content;
          margin-top: 8px;
        }
        .project-link:hover {
          background: rgba(37,99,235,0.25);
          color: #fff;
          transform: translateX(4px);
        }

        /* EXPERIENCE */
        .exp-section {
          padding: 100px 40px;
          max-width: 1280px;
          margin: 0 auto;
        }
        .exp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 48px;
        }
        .exp-card {
          padding: 28px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          border-radius: 16px;
          transition: all 0.3s ease;
        }
        .exp-card:hover {
          border-color: rgba(37,99,235,0.25);
          background: rgba(37,99,235,0.04);
          transform: translateY(-4px);
        }
        .exp-icon { font-size: 24px; margin-bottom: 14px; display: block; }
        .exp-card h3 {
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }
        .exp-card p {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          color: var(--muted);
          line-height: 1.6;
          font-weight: 400;
        }

        /* CTA */
        .cta-wrap {
          padding: 100px 40px;
          background: var(--bg2);
          border-top: 1px solid var(--border);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cta-glow {
          position: absolute;
          width: 600px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .cta-wrap h2 {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1.1;
          margin-bottom: 16px;
          position: relative;
        }
        .cta-wrap p {
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          color: var(--muted);
          max-width: 440px;
          margin: 0 auto 40px;
          line-height: 1.7;
          position: relative;
          font-weight: 400;
        }
        .btn-main {
          padding: 14px 32px;
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          border-radius: 12px;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 15px;
          color: #fff;
          text-decoration: none;
          box-shadow: 0 8px 32px rgba(37,99,235,0.35);
          transition: all 0.3s ease;
          display: inline-block;
          position: relative;
        }
        .btn-main:hover { transform: translateY(-3px); box-shadow: 0 12px 48px rgba(37,99,235,0.55); }

        /* FOOTER */
        .footer {
          padding: 32px 40px;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          max-width: 1280px;
          margin: 0 auto;
        }
        .footer-brand {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: rgba(255,255,255,0.5);
        }
        .footer-right {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          color: var(--muted);
        }
        .footer-right a { color: #60a5fa; text-decoration: none; }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .exp-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .page-hero { padding: 120px 20px 60px; }
          .projects-section, .cta-wrap { padding: 60px 20px; }
          .exp-section { padding: 60px 20px; }
          .projects-grid { grid-template-columns: 1fr; }
          .project-card.featured { grid-column: span 1; grid-template-columns: 1fr; gap: 20px; }
          .exp-grid { grid-template-columns: 1fr; }
          .footer { padding: 24px 20px; justify-content: center; text-align: center; }
        }
      `}</style>

      <Navbar />

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero-glow" />
        <span className="section-tag">// our projects</span>
        <h1 className="page-title">
          Work We're<br />
          <span>Proud Of</span>
        </h1>
        <p className="page-desc">
          Real projects, real clients, real results. Here's a look at what we've built and deployed for businesses and personal development.
        </p>
      </section>

      {/* PROJECTS */}
      <div className="projects-section">
        <div className="projects-inner">
          <span className="section-tag">// deployed projects</span>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 'clamp(24px,2.5vw,36px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
            Live & <span style={{ color: '#60a5fa' }}>Deployed</span>
          </h2>
          <div className="projects-grid">

            {/* Featured - Romance Travel */}
            <div className="project-card featured">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <span className="project-type">✈️ Client Project</span>
                <h3>Romance Travel Group</h3>
                <p>A travel business website enhanced for Romance Travel Group to redesign and improve their blog pages for better desktop and mobile experience.</p>
                <a href="https://www.romancetravelgroup.com/" target="_blank" rel="noreferrer" className="project-link">
                  Visit Live Site →
                </a>
              </div>
              <div className="project-features">
                <h4>Key Features</h4>
                {['Professional layout design', 'Desktop & mobile friendly', 'SEO-friendly structure', 'Improved blog pages'].map((f, i) => (
                  <div className="feature-item" key={i}>
                    <div className="feature-dot" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* ARM Solution */}
            <div className="project-card">
              <span className="project-type">🏢 Client Project</span>
              <h3>ARM Solution Enterprises</h3>
              <p>A corporate business website developed to establish online presence and showcase services, company profile, and contact information.</p>
              <div className="project-features">
                <h4>Key Features</h4>
                {['Corporate design', 'Company profile', 'Service showcase', 'Contact forms', 'SEO-friendly'].map((f, i) => (
                  <div className="feature-item" key={i}>
                    <div className="feature-dot" />
                    {f}
                  </div>
                ))}
              </div>
              <a href="https://armsolutionenterprises.com/" target="_blank" rel="noreferrer" className="project-link">
                Visit Live Site →
              </a>
            </div>

            {/* Bloodline Tracker */}
            <div className="project-card">
              <span className="project-type">🔬 Personal Project</span>
              <h3>Bloodline Tracker System</h3>
              <p>A web-based management system for tracking and monitoring bloodlines and breeding records with a modern, user-friendly interface.</p>
              <div className="project-features">
                <h4>Key Features</h4>
                {['Bloodline record management', 'Structured data tracking', 'Secure web-based access', 'Responsive design'].map((f, i) => (
                  <div className="feature-item" key={i}>
                    <div className="feature-dot" />
                    {f}
                  </div>
                ))}
              </div>
              <a href="https://default-bloodline-tracker.web.app/" target="_blank" rel="noreferrer" className="project-link">
                Visit Live Site →
              </a>
            </div>

            {/* E-Commerce */}
            <div className="project-card">
              <span className="project-type">🛒 Personal Project</span>
              <h3>E-Commerce Web Application</h3>
              <p>A fully functional e-commerce platform supporting online product selling, digital transactions, and an organized user experience.</p>
              <div className="project-features">
                <h4>Key Features</h4>
                {['Product catalog', 'Shopping cart system', 'User-friendly UI', 'Responsive design', 'Scalable structure'].map((f, i) => (
                  <div className="feature-item" key={i}>
                    <div className="feature-dot" />
                    {f}
                  </div>
                ))}
              </div>
              <a href="https://default-e-commerce-shop.web.app/" target="_blank" rel="noreferrer" className="project-link">
                Visit Live Site →
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* EXPERIENCE HIGHLIGHTS */}
      <div className="exp-section">
        <span className="section-tag">// expertise</span>
        <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 'clamp(24px,2.5vw,36px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
          What We've <span style={{ color: '#60a5fa' }}>Mastered</span>
        </h2>
        <div className="exp-grid">
          {[
            { icon: '🌐', title: 'Web App Development', desc: 'End-to-end web application development from design to deployment.' },
            { icon: '🏢', title: 'Business Systems', desc: 'Custom business management systems tailored to operational workflows.' },
            { icon: '🗄️', title: 'Database Management', desc: 'Structured, secure database design and management.' },
            { icon: '🎨', title: 'UI/UX Design', desc: 'User-centered interface design that is both beautiful and functional.' },
            { icon: '🚀', title: 'System Deployment', desc: 'Professional deployment and configuration for live production use.' },
            { icon: '🛠️', title: 'Maintenance & Support', desc: 'Ongoing system support and continuous improvements post-launch.' },
          ].map((e, i) => (
            <div className="exp-card" key={i}>
              <span className="exp-icon">{e.icon}</span>
              <h3>{e.title}</h3>
              <p>{e.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="cta-wrap">
        <div className="cta-glow" />
        <h2>Want Us to Build<br /><span style={{ color: '#60a5fa' }}>Your Project?</span></h2>
        <p>Let's create something amazing together. Reach out and let's get started.</p>
        <Link to="/contact" className="btn-main">Start Your Project →</Link>
      </div>

      {/* FOOTER */}
      <footer style={{ background: '#040610', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="footer">
          <div className="footer-brand">MDS Software Development Services</div>
          <div className="footer-right">
            📧 <a href="mailto:mdstechservices.info@gmail.com">mdstechservices.info@gmail.com</a> · © 2025 All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Projects;