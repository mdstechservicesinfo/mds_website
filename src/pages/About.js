import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

function About() {
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

        .about * { box-sizing: border-box; margin: 0; padding: 0; }

        /* PAGE HERO */
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

        /* OVERVIEW */
        .overview {
          padding: 80px 40px;
          background: var(--bg2);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .overview-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .overview-left h2 {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(24px, 2.5vw, 36px);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.2;
          margin-bottom: 20px;
        }
        .overview-left p {
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          color: var(--muted);
          line-height: 1.8;
          margin-bottom: 16px;
          font-weight: 400;
        }
        .overview-right {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .info-card {
          padding: 24px;
          background: rgba(255,255,255,0.025);
          border: 1px solid var(--border);
          border-radius: 14px;
          transition: all 0.3s ease;
        }
        .info-card:hover {
          border-color: rgba(37,99,235,0.3);
          background: rgba(37,99,235,0.05);
        }
        .info-card h4 {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #60a5fa;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .info-card p {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.7);
          line-height: 1.7;
          font-weight: 400;
        }

        /* MISSION VISION */
        .mv-section {
          padding: 100px 40px;
          max-width: 1280px;
          margin: 0 auto;
        }
        .mv-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 56px;
        }
        .mv-card {
          padding: 40px;
          border-radius: 20px;
          border: 1px solid var(--border);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .mv-card.mission {
          background: linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(6,182,212,0.04) 100%);
          border-color: rgba(37,99,235,0.2);
        }
        .mv-card.vision {
          background: linear-gradient(135deg, rgba(6,182,212,0.08) 0%, rgba(37,99,235,0.04) 100%);
          border-color: rgba(6,182,212,0.2);
        }
        .mv-card:hover { transform: translateY(-4px); }
        .mv-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 16px;
          display: block;
        }
        .mv-card.mission .mv-label { color: #60a5fa; }
        .mv-card.vision .mv-label { color: #22d3ee; }
        .mv-card h3 {
          font-family: 'Outfit', sans-serif;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
          color: #fff;
        }
        .mv-card p {
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          color: var(--muted);
          line-height: 1.8;
          font-weight: 400;
        }

        /* CORE VALUES */
        .values-section {
          padding: 100px 40px;
          background: var(--bg2);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .values-inner { max-width: 1280px; margin: 0 auto; }
        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 56px;
        }
        .value-card {
          padding: 28px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          border-radius: 16px;
          transition: all 0.3s ease;
        }
        .value-card:hover {
          border-color: rgba(37,99,235,0.3);
          background: rgba(37,99,235,0.05);
          transform: translateY(-4px);
        }
        .value-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: rgba(37,99,235,0.5);
          letter-spacing: 0.1em;
          margin-bottom: 12px;
        }
        .value-card h3 {
          font-family: 'Outfit', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }
        .value-card p {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          color: var(--muted);
          line-height: 1.7;
          font-weight: 400;
        }

        /* OBJECTIVES */
        .obj-section {
          padding: 100px 40px;
          max-width: 1280px;
          margin: 0 auto;
        }
        .obj-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 56px;
        }
        .obj-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 24px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          border-radius: 14px;
          transition: all 0.3s ease;
        }
        .obj-item:hover {
          border-color: rgba(37,99,235,0.25);
          background: rgba(37,99,235,0.04);
        }
        .obj-dot {
          width: 8px; height: 8px;
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 6px;
        }
        .obj-item p {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.65);
          line-height: 1.6;
          font-weight: 400;
        }

        /* CTA */
        .cta-wrap {
          padding: 100px 40px;
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
        @media (max-width: 768px) {
          .page-hero { padding: 120px 20px 60px; }
          .overview { padding: 60px 20px; }
          .overview-inner { grid-template-columns: 1fr; gap: 40px; }
          .mv-section, .obj-section, .cta-wrap { padding: 60px 20px; }
          .mv-grid { grid-template-columns: 1fr; }
          .values-section { padding: 60px 20px; }
          .values-grid { grid-template-columns: 1fr 1fr; }
          .obj-list { grid-template-columns: 1fr; }
          .footer { padding: 24px 20px; justify-content: center; text-align: center; }
        }
        @media (max-width: 480px) {
          .values-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <Navbar />

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero-glow" />
        <span className="section-tag">// about us</span>
        <h1 className="page-title">
          Who We Are &<br />
          <span>What Drives Us</span>
        </h1>
        <p className="page-desc">
          MDS Software Development Services is a Philippine-based startup dedicated to building innovative, secure, and high-quality digital solutions for businesses and organizations.
        </p>
      </section>

      {/* OVERVIEW */}
      <div className="overview">
        <div className="overview-inner">
          <div className="overview-left">
            <span className="section-tag">// company overview</span>
            <h2>Built to Help Businesses<br />Go Digital</h2>
            <p>Founded by Arem Jay Mendoza, MDS was established to help clients modernize their operations through reliable software systems, websites, and mobile applications.</p>
            <p>We serve startups, small-to-medium enterprises, and organizations that require customized software solutions tailored to their specific operational needs.</p>
            <p>We believe technology should empower businesses — not complicate them.</p>
          </div>
          <div className="overview-right">
            {[
              { label: 'Founder', value: 'Arem Jay Mendoza' },
              { label: 'Location', value: 'Philippines' },
              { label: 'Company Type', value: 'Software Development Startup' },
              { label: 'Team Size', value: '2–5 Professional Programmers' },
              { label: 'Contact', value: 'mdstechservices.info@gmail.com' },
            ].map((item, i) => (
              <div className="info-card" key={i}>
                <h4>{item.label}</h4>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MISSION & VISION */}
      <div className="mv-section">
        <span className="section-tag">// mission & vision</span>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          Our Purpose &<br /><span style={{ color: '#60a5fa' }}>Our Direction</span>
        </h2>
        <div className="mv-grid">
          <div className="mv-card mission">
            <span className="mv-label">// mission</span>
            <h3>Our Mission</h3>
            <p>To deliver high-quality, secure, and innovative software solutions that help businesses improve efficiency, productivity, and digital transformation.</p>
          </div>
          <div className="mv-card vision">
            <span className="mv-label">// vision</span>
            <h3>Our Vision</h3>
            <p>To become a trusted and leading software development company in the Philippines and internationally, known for reliability, professionalism, and excellence in technology services.</p>
          </div>
        </div>
      </div>

      {/* CORE VALUES */}
      <div className="values-section">
        <div className="values-inner">
          <span className="section-tag">// core values</span>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            What We Stand For
          </h2>
          <div className="values-grid">
            {[
              { num: '01', title: 'Quality & Excellence', desc: 'We hold every project to the highest standards of engineering and design.' },
              { num: '02', title: 'Integrity & Transparency', desc: 'Honest communication and clear documentation at every stage.' },
              { num: '03', title: 'Client Satisfaction', desc: 'Your success is our success. We go above and beyond for every client.' },
              { num: '04', title: 'Continuous Learning', desc: 'We stay ahead by constantly improving our skills and adopting new technologies.' },
              { num: '05', title: 'Innovation', desc: 'We bring creative, forward-thinking solutions to every challenge.' },
              { num: '06', title: 'Long-Term Support', desc: 'We build lasting partnerships and support clients well beyond project completion.' },
            ].map((v, i) => (
              <div className="value-card" key={i}>
                <div className="value-num">{v.num}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OBJECTIVES */}
      <div className="obj-section">
        <span className="section-tag">// business objectives</span>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          Where We're <span style={{ color: '#60a5fa' }}>Headed</span>
        </h2>
        <div className="obj-list">
          {[
            'Deliver high-quality and cost-effective software solutions to clients.',
            'Continuously improve technical expertise and adopt modern technologies.',
            'Establish long-term partnerships through dependable service and support.',
            'Contribute to the digital transformation of organizations and businesses.',
            'Expand services in web, mobile, and automation-based solutions.',
            'Build enterprise-level software solutions and partner with institutions.',
          ].map((obj, i) => (
            <div className="obj-item" key={i}>
              <div className="obj-dot" />
              <p>{obj}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="cta-wrap">
        <div className="cta-glow" />
        <h2>Ready to Work<br /><span style={{ color: '#60a5fa' }}>With Us?</span></h2>
        <p>Let's build something great together. Reach out and let's talk about your project.</p>
        <Link to="/contact" className="btn-main">Get In Touch →</Link>
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

export default About;