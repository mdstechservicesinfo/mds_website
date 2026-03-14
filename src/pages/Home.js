import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Home() {
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
          --text-muted: rgba(255,255,255,0.45);
        }

        .home * { box-sizing: border-box; margin: 0; padding: 0; }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 160px 24px 100px;
          position: relative;
          overflow: hidden;
        }
        .hero-glow-1 {
          position: absolute;
          width: 700px; height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 70%);
          top: -100px; left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
        }
        .hero-glow-2 {
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%);
          bottom: 0; right: 10%;
          pointer-events: none;
        }
        .hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 100% 100% at 50% 0%, black 30%, transparent 80%);
          pointer-events: none;
        }
        .hero-content { position: relative; z-index: 1; max-width: 860px; }
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
          margin-bottom: 36px;
          animation: fadeUp 0.6s ease both;
        }
        .eyebrow-dot {
          width: 6px; height: 6px;
          background: #60a5fa;
          border-radius: 50%;
          animation: blink 2s ease infinite;
        }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.2;} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }

        .hero-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(36px, 5vw, 72px);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: #fff;
          margin-bottom: 28px;
          animation: fadeUp 0.6s ease 0.1s both;
        }
        .hero-title .line2 {
          background: linear-gradient(90deg, #2563eb, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-desc {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(15px, 1.6vw, 18px);
          color: var(--text-muted);
          max-width: 560px;
          margin: 0 auto 48px;
          line-height: 1.8;
          font-weight: 400;
          animation: fadeUp 0.6s ease 0.2s both;
        }
        .hero-actions {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeUp 0.6s ease 0.3s both;
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
          letter-spacing: -0.01em;
        }
        .btn-main:hover { transform: translateY(-3px); box-shadow: 0 12px 48px rgba(37,99,235,0.55); }
        .btn-ghost {
          padding: 14px 32px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 15px;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          transition: all 0.3s ease;
          letter-spacing: -0.01em;
        }
        .btn-ghost:hover { border-color: rgba(37,99,235,0.4); color: #fff; background: rgba(37,99,235,0.08); transform: translateY(-3px); }

        /* TRUSTED */
        .trusted {
          padding: 40px 24px;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .trusted-inner {
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .trusted-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-right: 8px;
        }
        .tech-pill {
          padding: 6px 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 100px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          transition: all 0.2s ease;
        }
        .tech-pill:hover { border-color: rgba(37,99,235,0.3); color: rgba(255,255,255,0.8); }

        /* STATS */
        .stats {
          padding: 80px 24px;
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
          border-radius: 20px;
          overflow: hidden;
        }
        .stat-box {
          padding: 40px 32px;
          background: rgba(255,255,255,0.025);
          border: 1px solid var(--border);
          text-align: center;
          transition: all 0.3s ease;
        }
        .stat-box:first-child { border-radius: 20px 0 0 20px; }
        .stat-box:last-child { border-radius: 0 20px 20px 0; }
        .stat-box:hover { background: rgba(37,99,235,0.07); }
        .stat-num {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(36px, 4vw, 52px);
          font-weight: 900;
          letter-spacing: -0.04em;
          background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 8px;
        }
        .stat-label {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 400;
        }

        /* SERVICES */
        .services-wrap {
          padding: 100px 24px;
          background: var(--bg2);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .services-inner { max-width: 1200px; margin: 0 auto; }
        .section-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #60a5fa;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 12px;
          display: block;
        }
        .section-heading {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(28px, 3.5vw, 48px);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 60px;
          color: #fff;
        }
        .section-heading span {
          background: linear-gradient(90deg, #2563eb, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .svc-card {
          padding: 32px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          border-radius: 16px;
          transition: all 0.3s ease;
          cursor: default;
        }
        .svc-card:hover {
          border-color: rgba(37,99,235,0.35);
          background: rgba(37,99,235,0.05);
          transform: translateY(-4px);
        }
        .svc-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: rgba(37,99,235,0.6);
          letter-spacing: 0.1em;
          margin-bottom: 16px;
        }
        .svc-icon {
          font-size: 28px;
          margin-bottom: 16px;
          display: block;
        }
        .svc-card h3 {
          font-family: 'Outfit', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 10px;
          letter-spacing: -0.02em;
        }
        .svc-card p {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.7;
          font-weight: 400;
        }

        /* WHY */
        .why-wrap {
          padding: 100px 24px;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        .why-left h2 {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(28px, 3vw, 44px);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin-bottom: 20px;
        }
        .why-left p {
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          color: var(--text-muted);
          line-height: 1.8;
          margin-bottom: 40px;
          font-weight: 400;
        }
        .check-list { list-style: none; display: flex; flex-direction: column; gap: 14px; }
        .check-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.65);
          line-height: 1.5;
        }
        .check-icon {
          width: 20px; height: 20px;
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .why-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .why-card {
          padding: 24px 20px;
          background: rgba(255,255,255,0.025);
          border: 1px solid var(--border);
          border-radius: 14px;
          transition: all 0.3s ease;
        }
        .why-card.span2 { grid-column: span 2; }
        .why-card:hover { border-color: rgba(37,99,235,0.25); background: rgba(37,99,235,0.04); }
        .why-card h4 {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #60a5fa;
          margin-bottom: 6px;
          letter-spacing: -0.01em;
        }
        .why-card p {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.6;
          font-weight: 400;
        }

        /* CTA */
        .cta-wrap {
          padding: 100px 24px;
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
          background: radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .cta-wrap h2 {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(28px, 4vw, 52px);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1.1;
          margin-bottom: 16px;
          position: relative;
        }
        .cta-wrap p {
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          color: var(--text-muted);
          max-width: 440px;
          margin: 0 auto 40px;
          line-height: 1.7;
          position: relative;
          font-weight: 400;
        }

        /* FOOTER */
        .footer {
          padding: 32px 24px;
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
          color: rgba(255,255,255,0.6);
        }
        .footer-right {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          color: var(--text-muted);
        }
        .footer-right a { color: #60a5fa; text-decoration: none; }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .stats { grid-template-columns: repeat(2, 1fr); }
          .stat-box:first-child { border-radius: 20px 0 0 0; }
          .stat-box:last-child { border-radius: 0 0 20px 0; }
          .stat-box:nth-child(2) { border-radius: 0 20px 0 0; }
          .stat-box:nth-child(3) { border-radius: 0 0 0 20px; }
        }
        @media (max-width: 768px) {
          .hero { padding: 120px 20px 80px; }
          .services-grid { grid-template-columns: 1fr; }
          .why-wrap { grid-template-columns: 1fr; gap: 48px; }
          .why-cards { grid-template-columns: 1fr; }
          .why-card.span2 { grid-column: span 1; }
          .stats { grid-template-columns: repeat(2, 1fr); padding: 40px 20px; }
          .stat-box { padding: 28px 20px; }
          .footer { justify-content: center; text-align: center; }
          .trusted-inner { gap: 10px; }
        }
        @media (max-width: 480px) {
          .hero-actions { flex-direction: column; align-items: center; }
          .btn-main, .btn-ghost { width: 100%; max-width: 280px; text-align: center; }
        }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            Philippine-Based · Est. by Arem Jay Mendoza
          </div>
          <h1 className="hero-title">
            Build Smarter.<br />
            <span className="line2">Scale Faster.</span>
          </h1>
          <p className="hero-desc">
            MDS Software Development Services designs and builds high-quality web, mobile, and custom software solutions for businesses across the Philippines and beyond.
          </p>
          <div className="hero-actions">
            <Link to="/services" className="btn-main">Explore Our Services</Link>
            <Link to="/contact" className="btn-ghost">Get a Free Quote →</Link>
          </div>
        </div>
      </section>

      {/* TRUSTED / TECH STACK */}
      <div className="trusted">
        <div className="trusted-inner">
          <span className="trusted-label">Built with</span>
          {['React.js', 'Node.js', 'Firebase', 'MongoDB', '.NET', 'MySQL', 'Flutter', 'REST API'].map(t => (
            <span key={t} className="tech-pill">{t}</span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div style={{ padding: '0 24px' }}>
        <div className="stats">
          {[
            { num: '9+', label: 'Services Offered' },
            { num: '10+', label: 'Technologies' },
            { num: '100%', label: 'Client Focused' },
            { num: '24/7', label: 'Support' },
          ].map((s, i) => (
            <div className="stat-box" key={i}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <div className="services-wrap">
        <div className="services-inner">
          <span className="section-tag">// what we do</span>
          <h2 className="section-heading">Services Built for<br /><span>Modern Businesses</span></h2>
          <div className="services-grid">
            {[
              { icon: '🌐', num: '01', title: 'Web App Development', desc: 'Modern, responsive web applications built with cutting-edge frameworks and best practices.' },
              { icon: '📱', num: '02', title: 'Mobile Development', desc: 'Android and cross-platform mobile apps tailored precisely to your business needs.' },
              { icon: '⚙️', num: '03', title: 'Custom Software', desc: 'Fully customized software solutions designed around your specific operational workflow.' },
              { icon: '🎨', num: '04', title: 'UI/UX Design', desc: 'Beautiful, intuitive interfaces that users love — designed with purpose and precision.' },
              { icon: '🗄️', num: '05', title: 'Database Management', desc: 'Structured, secure, and optimized database design, management, and administration.' },
              { icon: '🤖', num: '06', title: 'Automation Solutions', desc: 'Digital workflow automation that boosts efficiency and eliminates manual bottlenecks.' },
            ].map((s, i) => (
              <div className="svc-card" key={i}>
                <div className="svc-num">{s.num}</div>
                <span className="svc-icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div style={{ background: 'var(--bg)' }}>
        <div className="why-wrap">
          <div className="why-left">
            <span className="section-tag">// why mds</span>
            <h2>We Don't Just Build.<br /><span style={{ color: '#60a5fa' }}>We Partner.</span></h2>
            <p>Every project gets our full dedication — from first meeting to post-launch support. We treat your business goals as our own.</p>
            <ul className="check-list">
              {[
                'Professional & dedicated development team',
                'Client-centered approach on every project',
                'Secure, scalable, and future-proof systems',
                'Affordable and flexible service packages',
                'Transparent communication at every stage',
                'Long-term technical support & maintenance',
              ].map((item, i) => (
                <li key={i}><span className="check-icon">✓</span>{item}</li>
              ))}
            </ul>
          </div>
          <div className="why-cards">
            {[
              { title: 'Founded with Purpose', desc: 'Built to help Philippine businesses modernize through reliable, innovative software.', span: true },
              { title: 'Full-Stack Team', desc: 'React, Node, Firebase, MongoDB, .NET and more.' },
              { title: 'Deployed Projects', desc: 'Real clients, real results, real satisfaction.' },
              { title: 'Always Learning', desc: 'We adopt the latest technologies constantly.' },
            ].map((c, i) => (
              <div className={`why-card ${c.span ? 'span2' : ''}`} key={i}>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-wrap">
        <div className="cta-glow" />
        <h2>Ready to Build Something<br /><span style={{ color: '#60a5fa' }}>Extraordinary?</span></h2>
        <p>Let's turn your idea into a powerful digital product. We're ready when you are.</p>
        <Link to="/contact" className="btn-main" style={{ position: 'relative', display: 'inline-block' }}>
          Start Your Project →
        </Link>
      </div>

      {/* FOOTER */}
      <footer style={{ background: 'var(--bg)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 40px' }}>
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

export default Home;