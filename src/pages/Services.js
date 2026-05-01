import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';

function Services() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal, .reveal-left').forEach(el => observer.observe(el));
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

          .services * { box-sizing: border-box; margin: 0; padding: 0; }

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
          .reveal-d5 { transition-delay: 0.5s; }
          .reveal-left {
            opacity: 0;
            transform: translateX(-24px);
            transition: opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1);
          }
          .reveal-left.visible { opacity: 1; transform: translateX(0); }

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

          /* MAIN SERVICES */
          .main-services {
            padding: 80px 40px;
            background: var(--bg2);
            border-top: 1px solid var(--border);
            border-bottom: 1px solid var(--border);
          }
          .main-services-inner { max-width: 1280px; margin: 0 auto; }
          .services-list { display: flex; flex-direction: column; gap: 2px; margin-top: 48px; }
          .service-row {
            display: grid;
            grid-template-columns: 80px 1fr 1fr auto;
            align-items: center;
            gap: 32px;
            padding: 28px 32px;
            background: rgba(255,255,255,0.02);
            border: 1px solid var(--border);
            border-radius: 14px;
            transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
            cursor: default;
            position: relative;
            overflow: hidden;
          }
          .service-row::before {
            content: '';
            position: absolute;
            left: 0; top: 0; bottom: 0;
            width: 2px;
            background: linear-gradient(to bottom, #2563eb, #06b6d4);
            opacity: 0;
            transition: opacity 0.3s;
          }
          .service-row:hover::before { opacity: 1; }
          .service-row:hover {
            background: rgba(37,99,235,0.06);
            border-color: rgba(37,99,235,0.25);
            transform: translateX(8px);
          }
          .service-row-num {
            font-family: 'JetBrains Mono', monospace;
            font-size: 13px;
            color: rgba(37,99,235,0.5);
            letter-spacing: 0.1em;
          }
          .service-row-main h3 {
            font-family: 'Outfit', sans-serif;
            font-size: 18px; font-weight: 700; color: #fff;
            letter-spacing: -0.02em; margin-bottom: 4px;
          }
          .service-row-main p {
            font-family: 'Outfit', sans-serif;
            font-size: 13px; color: var(--muted); font-weight: 400;
          }
          .service-row-tags { display: flex; flex-wrap: wrap; gap: 8px; }
          .tag {
            padding: 4px 12px;
            background: rgba(37,99,235,0.1);
            border: 1px solid rgba(37,99,235,0.2);
            border-radius: 100px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px; color: #60a5fa; letter-spacing: 0.05em;
            transition: all 0.2s;
          }
          .service-row:hover .tag { background: rgba(37,99,235,0.15); border-color: rgba(37,99,235,0.35); }
          .service-row-icon { font-size: 28px; transition: transform 0.3s ease; }
          .service-row:hover .service-row-icon { transform: scale(1.2) rotate(-8deg); }

          /* TECH STACK */
          .tech-section { padding: 100px 40px; max-width: 1280px; margin: 0 auto; }
          .tech-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 14px;
            margin-top: 48px;
          }
          .tech-card {
            padding: 20px;
            background: rgba(255,255,255,0.025);
            border: 1px solid var(--border);
            border-radius: 12px;
            text-align: center;
            transition: all 0.3s ease;
            cursor: default;
          }
          .tech-card:hover {
            border-color: rgba(37,99,235,0.3);
            background: rgba(37,99,235,0.05);
            transform: translateY(-4px);
            box-shadow: 0 12px 24px rgba(0,0,0,0.2), 0 0 0 1px rgba(37,99,235,0.1);
          }
          .tech-card span {
            font-family: 'Outfit', sans-serif;
            font-size: 14px; font-weight: 600;
            color: rgba(255,255,255,0.7); transition: color 0.2s;
          }
          .tech-card:hover span { color: rgba(255,255,255,0.95); }

          /* PROCESS */
          .process-section {
            padding: 100px 40px;
            background: var(--bg2);
            border-top: 1px solid var(--border);
            border-bottom: 1px solid var(--border);
          }
          .process-inner { max-width: 1280px; margin: 0 auto; }
          .process-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin-top: 48px;
          }
          .process-card {
            padding: 32px;
            background: rgba(255,255,255,0.02);
            border: 1px solid var(--border);
            border-radius: 16px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          .process-card::after {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 2px;
            background: linear-gradient(90deg, #2563eb, #06b6d4);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.4s ease;
          }
          .process-card:hover::after { transform: scaleX(1); }
          .process-card:hover {
            border-color: rgba(37,99,235,0.25);
            background: rgba(37,99,235,0.04);
            transform: translateY(-4px);
            box-shadow: 0 16px 32px rgba(0,0,0,0.2);
          }
          .process-step {
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px; color: rgba(37,99,235,0.5);
            letter-spacing: 0.1em; margin-bottom: 12px;
          }
          .process-card h3 {
            font-family: 'Outfit', sans-serif;
            font-size: 18px; font-weight: 700; color: #fff;
            letter-spacing: -0.02em; margin-bottom: 10px;
          }
          .process-card p {
            font-family: 'Outfit', sans-serif;
            font-size: 14px; color: var(--muted); line-height: 1.7; font-weight: 400;
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
            .tech-grid { grid-template-columns: repeat(3, 1fr); }
            .process-grid { grid-template-columns: repeat(2, 1fr); }
            .service-row { grid-template-columns: 60px 1fr; }
            .service-row-tags, .service-row-icon { display: none; }
          }
          @media (max-width: 768px) {
            .page-hero { padding: 120px 20px 60px; }
            .main-services, .process-section { padding: 60px 20px; }
            .tech-section, .cta-wrap { padding: 60px 20px; }
            .tech-grid { grid-template-columns: repeat(2, 1fr); }
            .process-grid { grid-template-columns: 1fr; }
            .footer { padding: 24px 20px; justify-content: center; text-align: center; }
            .service-row { padding: 20px 16px; gap: 16px; }
          }
          @media (max-width: 480px) {
            .page-hero { padding: 110px 16px 50px; }
            .tech-grid { grid-template-columns: repeat(2, 1fr); }
            .service-row { padding: 18px 14px; }
            .service-row-main h3 { font-size: 15px; }
            .cta-wrap { padding: 50px 16px; }
          }
        `}</style>

        <Navbar />

        <Helmet>
          <title>Services | MDS Software Development Services</title>
          <meta name="description" content="Explore MDS services including web development, mobile apps, custom software, UI/UX design, database management, and automation solutions." />
        </Helmet>

        {/* PAGE HERO */}
        <section className="page-hero">
          <div className="page-hero-glow" />
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            End-to-End Digital Solutions
          </div>
          <h1 className="page-title">
            What We Build &<br />
            <span>How We Do It</span>
          </h1>
          <p className="page-desc">
            From web applications to mobile apps and custom software, we deliver end-to-end digital solutions tailored to your business needs.
          </p>
        </section>

        {/* SERVICES LIST */}
        <div className="main-services">
          <div className="main-services-inner">
            <span className="section-tag reveal">// service offerings</span>
            <h2 className="reveal" style={{ fontFamily: "'Outfit',sans-serif", fontSize: 'clamp(24px,2.5vw,36px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Everything You Need to <span style={{ color: '#60a5fa' }}>Go Digital</span>
            </h2>
            <div className="services-list">
              {[
                { num: '01', icon: '🌐', title: 'Web Application Development', desc: 'Modern, responsive web apps built with React, Angular, and more.', tags: ['React.js', 'Angular', 'Node.js'] },
                { num: '02', icon: '📱', title: 'Mobile App Development', desc: 'Android and cross-platform mobile applications.', tags: ['Android', 'Flutter', 'Cross-Platform'] },
                { num: '03', icon: '⚙️', title: 'Custom Software Development', desc: 'Fully tailored software solutions for your specific workflow.', tags: ['Custom', '.NET', 'PHP'] },
                { num: '04', icon: '🏢', title: 'Business Management Systems', desc: 'Complete business systems to streamline your operations.', tags: ['ERP', 'CRM', 'Systems'] },
                { num: '05', icon: '📦', title: 'Inventory & Tracking Systems', desc: 'Smart tracking and inventory management solutions.', tags: ['Tracking', 'Database', 'Reports'] },
                { num: '06', icon: '🎨', title: 'UI/UX Design', desc: 'Beautiful, intuitive interfaces designed for real users.', tags: ['Figma', 'Prototyping', 'Design'] },
                { num: '07', icon: '🛠️', title: 'System Maintenance & Support', desc: 'Ongoing technical support and system improvements.', tags: ['Support', 'Maintenance', '24/7'] },
                { num: '08', icon: '🗄️', title: 'Database Design & Management', desc: 'Structured, secure, and optimized database solutions.', tags: ['MySQL', 'MongoDB', 'SQL Server'] },
                { num: '09', icon: '🤖', title: 'Automation & Digital Workflow', desc: 'Smart automation to boost efficiency and reduce manual work.', tags: ['Automation', 'REST API', 'Integration'] },
              ].map((s, i) => (
                <div className="service-row reveal-left" key={i} style={{ transitionDelay: `${i * 0.07}s` }}>
                  <div className="service-row-num">{s.num}</div>
                  <div className="service-row-main">
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                  <div className="service-row-tags">
                    {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <div className="service-row-icon">{s.icon}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TECH STACK */}
        <div className="tech-section">
          <span className="section-tag reveal">// technologies</span>
          <h2 className="reveal" style={{ fontFamily: "'Outfit',sans-serif", fontSize: 'clamp(24px,2.5vw,36px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
            Tools & Technologies <span style={{ color: '#60a5fa' }}>We Use</span>
          </h2>
          <div className="tech-grid">
            {['HTML/CSS', 'JavaScript', 'React.js', 'Angular', 'Express.js', 'Node.js', 'PHP', '.NET', 'MongoDB', 'MySQL', 'SQL Server', 'Firebase', 'Bootstrap', 'REST API', 'Unity'].map((t, i) => (
              <div className="tech-card reveal" key={t} style={{ transitionDelay: `${(i % 5) * 0.08}s` }}>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PROCESS */}
        <div className="process-section">
          <div className="process-inner">
            <span className="section-tag reveal">// our process</span>
            <h2 className="reveal" style={{ fontFamily: "'Outfit',sans-serif", fontSize: 'clamp(24px,2.5vw,36px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
              How We <span style={{ color: '#60a5fa' }}>Deliver</span>
            </h2>
            <div className="process-grid">
              {[
                { step: 'Step 01', title: 'Requirement Analysis', desc: 'We carefully gather and understand your business needs, goals, and objectives before anything else.' },
                { step: 'Step 02', title: 'System Design', desc: 'We design the architecture, database structure, and user interface before development begins.' },
                { step: 'Step 03', title: 'Development', desc: 'We implement the system using industry-standard programming practices and modern frameworks.' },
                { step: 'Step 04', title: 'Testing & QA', desc: 'We perform thorough testing to ensure stability, security, and performance across all devices.' },
                { step: 'Step 05', title: 'Deployment', desc: 'We install and configure the system for live usage with zero disruption to your operations.' },
                { step: 'Step 06', title: 'Maintenance & Support', desc: 'We provide continuous support, updates, and system improvements long after launch.' },
              ].map((p, i) => (
                <div className={`process-card reveal reveal-d${(i % 3) + 1}`} key={i}>
                  <div className="process-step">{p.step}</div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="cta-wrap">
          <div className="cta-glow" />
          <h2 className="reveal">Need a Custom<br /><span style={{ color: '#60a5fa' }}>Solution?</span></h2>
          <p className="reveal reveal-d1">Tell us about your project and we'll put together the perfect plan for you.</p>
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

export default Services;