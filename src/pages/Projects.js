import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';

function Projects() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <PageTransition>
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

          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes blink {
            0%,100% { opacity: 1; }
            50% { opacity: 0.2; }
          }
          @keyframes glow1Pulse {
            0%,100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.08); }
          }
          @keyframes gradientShift {
            0%,100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }

          .reveal {
            opacity: 0;
            transform: translateY(28px);
            transition: opacity 0.65s cubic-bezier(0.4,0,0.2,1), transform 0.65s cubic-bezier(0.4,0,0.2,1);
          }
          .reveal.visible { opacity: 1; transform: translateY(0); }
          .reveal-d1 { transition-delay: 0.1s; }
          .reveal-d2 { transition-delay: 0.2s; }
          .reveal-d3 { transition-delay: 0.3s; }
          .reveal-d4 { transition-delay: 0.4s; }

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
            animation: glow1Pulse 6s ease-in-out infinite;
          }
          .hero-eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 5px 14px 5px 10px;
            background: rgba(37,99,235,0.1);
            border: 1px solid rgba(37,99,235,0.25);
            border-radius: 100px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px;
            color: #60a5fa;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            margin-bottom: 28px;
            animation: fadeUp 0.5s ease both;
          }
          .eyebrow-dot {
            width: 6px; height: 6px;
            background: #60a5fa;
            border-radius: 50%;
            animation: blink 2s ease infinite;
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
            animation: fadeUp 0.65s ease 0.1s both;
          }
          .page-title span {
            background: linear-gradient(135deg, #2563eb, #06b6d4, #22d3ee, #06b6d4, #2563eb);
            background-size: 300%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradientShift 5s ease infinite;
          }
          .page-desc {
            font-family: 'Outfit', sans-serif;
            font-size: clamp(15px, 1.5vw, 18px);
            color: var(--muted);
            max-width: 600px;
            line-height: 1.8;
            font-weight: 400;
            animation: fadeUp 0.65s ease 0.2s both;
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
            transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
            display: flex;
            flex-direction: column;
            gap: 16px;
            position: relative;
            overflow: hidden;
          }
          .project-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(37,99,235,0.6), rgba(6,182,212,0.5), transparent);
            opacity: 0;
            transition: opacity 0.4s;
          }
          .project-card:hover::before { opacity: 1; }
          .project-card:hover {
            border-color: rgba(37,99,235,0.3);
            background: rgba(37,99,235,0.05);
            transform: translateY(-6px);
            box-shadow: 0 24px 48px rgba(0,0,0,0.3), 0 0 0 1px rgba(37,99,235,0.1);
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
          .project-features { display: flex; flex-direction: column; gap: 8px; }
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
            transition: color 0.2s;
          }
          .feature-item:hover { color: rgba(255,255,255,0.9); }
          .feature-dot {
            width: 6px; height: 6px;
            background: linear-gradient(135deg, #2563eb, #06b6d4);
            border-radius: 50%;
            flex-shrink: 0;
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .feature-item:hover .feature-dot { transform: scale(1.4); box-shadow: 0 0 6px rgba(37,99,235,0.5); }
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
            position: relative;
            overflow: hidden;
          }
          .project-link::before {
            content: '';
            position: absolute; inset: 0;
            background: linear-gradient(90deg, transparent, rgba(37,99,235,0.15), transparent);
            background-size: 200%;
            animation: shimmer 2.5s linear infinite;
            opacity: 0;
            transition: opacity 0.3s;
          }
          .project-link:hover::before { opacity: 1; }
          .project-link:hover {
            background: rgba(37,99,235,0.25);
            color: #fff;
            transform: translateX(4px);
            border-color: rgba(37,99,235,0.5);
          }

          /* EXPERIENCE */
          .exp-section { padding: 100px 40px; max-width: 1280px; margin: 0 auto; }
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
            position: relative;
            overflow: hidden;
          }
          .exp-card::after {
            content: '';
            position: absolute;
            bottom: 0; left: 0; right: 0;
            height: 2px;
            background: linear-gradient(90deg, #2563eb, #06b6d4);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.4s ease;
          }
          .exp-card:hover::after { transform: scaleX(1); }
          .exp-card:hover {
            border-color: rgba(37,99,235,0.25);
            background: rgba(37,99,235,0.04);
            transform: translateY(-4px);
            box-shadow: 0 16px 32px rgba(0,0,0,0.2);
          }
          .exp-icon { font-size: 24px; margin-bottom: 14px; display: block; transition: transform 0.3s; }
          .exp-card:hover .exp-icon { transform: scale(1.15) rotate(-5deg); }
          .exp-card h3 {
            font-family: 'Outfit', sans-serif;
            font-size: 16px; font-weight: 700; color: #fff;
            letter-spacing: -0.02em; margin-bottom: 8px;
          }
          .exp-card p {
            font-family: 'Outfit', sans-serif;
            font-size: 13px; color: var(--muted); line-height: 1.6; font-weight: 400;
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
            animation: glow1Pulse 6s ease-in-out infinite;
          }
          .cta-wrap h2 {
            font-family: 'Outfit', sans-serif;
            font-size: clamp(28px, 4vw, 48px);
            font-weight: 900; letter-spacing: -0.04em; line-height: 1.1;
            margin-bottom: 16px; position: relative;
          }
          .cta-wrap p {
            font-family: 'Outfit', sans-serif;
            font-size: 16px; color: var(--muted);
            max-width: 440px; margin: 0 auto 40px;
            line-height: 1.7; position: relative; font-weight: 400;
          }
          .btn-main {
            padding: 14px 32px;
            background: linear-gradient(135deg, #2563eb, #06b6d4);
            border-radius: 12px;
            font-family: 'Outfit', sans-serif;
            font-weight: 700; font-size: 15px; color: #fff;
            text-decoration: none;
            box-shadow: 0 8px 32px rgba(37,99,235,0.35);
            transition: all 0.3s ease;
            display: inline-block;
            position: relative; overflow: hidden;
          }
          .btn-main::before {
            content: ''; position: absolute; inset: 0;
            background: linear-gradient(rgba(255,255,255,0.12), transparent);
            opacity: 0; transition: opacity 0.3s;
          }
          .btn-main:hover::before { opacity: 1; }
          .btn-main:hover { transform: translateY(-3px); box-shadow: 0 12px 48px rgba(37,99,235,0.55); }

          /* FOOTER */
          .footer {
            padding: 32px 40px; border-top: 1px solid var(--border);
            display: flex; align-items: center; justify-content: space-between;
            flex-wrap: wrap; gap: 12px; max-width: 1280px; margin: 0 auto;
          }
          .footer-brand { font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.5); }
          .footer-right { font-family: 'Outfit', sans-serif; font-size: 13px; color: var(--muted); }
          .footer-right a { color: #60a5fa; text-decoration: none; }

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
            .project-card { padding: 24px 20px; }
          }
          @media (max-width: 480px) {
            .page-hero { padding: 110px 16px 50px; }
            .projects-section { padding: 50px 16px; }
            .exp-section { padding: 50px 16px; }
            .cta-wrap { padding: 50px 16px; }
            .project-card { padding: 20px 16px; }
            .project-card h3 { font-size: 18px; }
          }
        `}</style>

        <Navbar />

        <Helmet>
          <title>Projects | MDS Software Development Services</title>
          <meta name="description" content="View MDS Software Development Services deployed projects including web apps, business systems, and e-commerce platforms built for real clients." />
        </Helmet>

        {/* PAGE HERO */}
        <section className="page-hero">
          <div className="page-hero-glow" />
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            Real Clients · Real Results
          </div>
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
            <span className="section-tag reveal">// deployed projects</span>
            <h2 className="reveal" style={{ fontFamily: "'Outfit',sans-serif", fontSize: 'clamp(24px,2.5vw,36px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Live & <span style={{ color: '#60a5fa' }}>Deployed</span>
            </h2>
            <div className="projects-grid">

              {/* Featured */}
              <div className="project-card featured reveal">
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

              {/* ARM */}
              <div className="project-card reveal reveal-d1">
                <span className="project-type">🏢 Client Project</span>
                <h3>ARM Solution Enterprises</h3>
                <p>A corporate business website developed to establish online presence and showcase services, company profile, and contact information.</p>
                <div className="project-features">
                  <h4>Key Features</h4>
                  {['Corporate design', 'Company profile', 'Service showcase', 'Contact forms', 'SEO-friendly'].map((f, i) => (
                    <div className="feature-item" key={i}><div className="feature-dot" />{f}</div>
                  ))}
                </div>
                <a href="https://armsolutionenterprises.com/" target="_blank" rel="noreferrer" className="project-link">Visit Live Site →</a>
              </div>

              {/* Bloodline */}
              <div className="project-card reveal reveal-d2">
                <span className="project-type">🔬 Personal Project</span>
                <h3>Bloodline Tracker System</h3>
                <p>A web-based management system for tracking and monitoring bloodlines and breeding records with a modern, user-friendly interface.</p>
                <div className="project-features">
                  <h4>Key Features</h4>
                  {['Bloodline record management', 'Structured data tracking', 'Secure web-based access', 'Responsive design'].map((f, i) => (
                    <div className="feature-item" key={i}><div className="feature-dot" />{f}</div>
                  ))}
                </div>
                <a href="https://default-bloodline-tracker.web.app/" target="_blank" rel="noreferrer" className="project-link">Visit Live Site →</a>
              </div>

              {/* E-Commerce */}
              <div className="project-card reveal reveal-d1">
                <span className="project-type">🛒 Personal Project</span>
                <h3>E-Commerce Web Application</h3>
                <p>A fully functional e-commerce platform supporting online product selling, digital transactions, and an organized user experience.</p>
                <div className="project-features">
                  <h4>Key Features</h4>
                  {['Product catalog', 'Shopping cart system', 'User-friendly UI', 'Responsive design', 'Scalable structure'].map((f, i) => (
                    <div className="feature-item" key={i}><div className="feature-dot" />{f}</div>
                  ))}
                </div>
                <a href="https://default-e-commerce-shop.web.app/" target="_blank" rel="noreferrer" className="project-link">Visit Live Site →</a>
              </div>

            </div>
          </div>
        </div>

        {/* EXPERIENCE HIGHLIGHTS */}
        <div className="exp-section">
          <span className="section-tag reveal">// expertise</span>
          <h2 className="reveal" style={{ fontFamily: "'Outfit',sans-serif", fontSize: 'clamp(24px,2.5vw,36px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
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
              <div className={`exp-card reveal reveal-d${(i % 3) + 1}`} key={i}>
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
          <h2 className="reveal">Want Us to Build<br /><span style={{ color: '#60a5fa' }}>Your Project?</span></h2>
          <p className="reveal reveal-d1">Let's create something amazing together. Reach out and let's get started.</p>
          <Link to="/contact" className="btn-main reveal reveal-d2">Start Your Project →</Link>
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
    </PageTransition>
  );
}

export default Projects;