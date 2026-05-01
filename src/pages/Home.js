import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Helmet } from 'react-helmet-async';

function Home() {
  const statsRef = useRef(null);
  const countersStarted = useRef(false);

  useEffect(() => {
    // Scroll reveal
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealObserver.observe(el));

    // Counter animation
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !countersStarted.current) {
          countersStarted.current = true;
          document.querySelectorAll('[data-count]').forEach(el => {
            const target = parseFloat(el.dataset.count);
            const isPercent = el.dataset.suffix === '%';
            const duration = 1800;
            const start = performance.now();
            const update = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = Math.round(eased * target) + (el.dataset.suffix || '');
              if (progress < 1) requestAnimationFrame(update);
            };
            requestAnimationFrame(update);
          });
        }
      });
    }, { threshold: 0.3 });
    if (statsRef.current) counterObserver.observe(statsRef.current);

    return () => {
      revealObserver.disconnect();
      counterObserver.disconnect();
    };
  }, []);

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

        /* ── KEYFRAMES ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.2;} }
        @keyframes gridPan {
          0% { background-position: 0 0; }
          100% { background-position: 48px 48px; }
        }
        @keyframes glow1Pulse {
          0%,100% { opacity: 0.7; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.08); }
        }
        @keyframes glow2Pulse {
          0%,100% { opacity: 0.5; }
          50% { opacity: 0.9; }
        }
        @keyframes particleFloat {
          0% { transform: translateY(100vh); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.2; }
          100% { transform: translateY(-100px); opacity: 0; }
        }
        @keyframes gradientShift {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* ── SCROLL REVEAL ── */
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
          animation: glow1Pulse 6s ease-in-out infinite;
        }
        .hero-glow-2 {
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%);
          bottom: 0; right: 10%;
          pointer-events: none;
          animation: glow2Pulse 8s ease-in-out infinite;
        }
        .hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 100% 100% at 50% 0%, black 30%, transparent 80%);
          pointer-events: none;
          animation: gridPan 18s linear infinite;
        }
        /* Floating particles */
        .hero-particles { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .hero-particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(37,99,235,0.5);
          animation: particleFloat linear infinite;
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
          background: linear-gradient(90deg, #2563eb, #06b6d4, #22d3ee, #06b6d4, #2563eb);
          background-size: 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 5s ease infinite;
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
          position: relative;
          overflow: hidden;
        }
        .btn-main::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(rgba(255,255,255,0.12), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .btn-main:hover::before { opacity: 1; }
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
          transition: all 0.25s ease;
          cursor: default;
        }
        .tech-pill:hover {
          border-color: rgba(37,99,235,0.4);
          color: rgba(255,255,255,0.85);
          background: rgba(37,99,235,0.08);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(37,99,235,0.15);
        }

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
          cursor: default;
        }
        .stat-box:first-child { border-radius: 20px 0 0 20px; }
        .stat-box:last-child { border-radius: 0 20px 20px 0; }
        .stat-box:hover { background: rgba(37,99,235,0.07); transform: translateY(-3px); }
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
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .svc-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(37,99,235,0.6), rgba(6,182,212,0.6), transparent);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .svc-card:hover::before { opacity: 1; }
        .svc-card:hover {
          border-color: rgba(37,99,235,0.35);
          background: rgba(37,99,235,0.05);
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(37,99,235,0.1);
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
          transition: transform 0.3s ease;
        }
        .svc-card:hover .svc-icon { transform: scale(1.15) rotate(-5deg); }
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
          transition: color 0.2s;
        }
        .check-list li:hover { color: rgba(255,255,255,0.9); }
        .check-icon {
          width: 20px; height: 20px;
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px;
          flex-shrink: 0;
          margin-top: 2px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .check-list li:hover .check-icon { transform: scale(1.1); box-shadow: 0 0 10px rgba(37,99,235,0.4); }
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
          cursor: default;
        }
        .why-card.span2 { grid-column: span 2; }
        .why-card:hover { border-color: rgba(37,99,235,0.25); background: rgba(37,99,235,0.04); transform: translateY(-3px); }
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
          animation: glow2Pulse 6s ease-in-out infinite;
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
          .hero-glow-1 { width: 400px; height: 400px; }
          .hero-glow-2 { width: 200px; height: 200px; }
        }
        @media (max-width: 480px) {
          .hero-actions { flex-direction: column; align-items: center; }
          .btn-main, .btn-ghost { width: 100%; max-width: 280px; text-align: center; }
          .services-wrap { padding: 60px 16px; }
          .why-wrap { padding: 60px 16px; }
          .cta-wrap { padding: 60px 16px; }
          .stat-box { padding: 24px 16px; }
        }
      `}</style>

      <Navbar />

      <Helmet>
        <title>MDS Software Development Services | Innovation. Code. Solutions.</title>
        <meta name="description" content="MDS Software Development Services designs and builds high-quality web, mobile, and custom software solutions for businesses across the Philippines and beyond." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mdstechservices-ph.online/" />
        <meta property="og:title" content="MDS Software Development Services | Innovation. Code. Solutions." />
        <meta property="og:description" content="MDS Software Development Services designs and builds high-quality web, mobile, and custom software solutions for businesses across the Philippines and beyond." />
        <meta property="og:image" content="https://mdstechservices-ph.online/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MDS Software Development Services | Innovation. Code. Solutions." />
        <meta name="twitter:description" content="MDS Software Development Services designs and builds high-quality web, mobile, and custom software solutions for businesses across the Philippines and beyond." />
        <meta name="twitter:image" content="https://mdstechservices-ph.online/logo.png" />
        <link rel="canonical" href="https://mdstechservices-ph.online/" />
      </Helmet>

      {/* HERO */}
      <section className="hero">
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />
        <div className="hero-grid" />
        {/* Particles rendered via JS in useEffect equivalent — inline for SSR safety */}
        <div className="hero-particles" id="home-particles" />
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
      <div style={{ padding: '0 24px' }} ref={statsRef}>
        <div className="stats">
          {[
            { num: '9+', label: 'Services Offered', count: '9', suffix: '+' },
            { num: '10+', label: 'Technologies', count: '10', suffix: '+' },
            { num: '100%', label: 'Client Focused', count: '100', suffix: '%' },
            { num: '24/7', label: 'Support', count: null },
          ].map((s, i) => (
            <div className="stat-box reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="stat-num">
                {s.count ? (
                  <span data-count={s.count} data-suffix={s.suffix}>0{s.suffix}</span>
                ) : s.num}
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <div className="services-wrap">
        <div className="services-inner">
          <span className="section-tag reveal">// what we do</span>
          <h2 className="section-heading reveal">Services Built for<br /><span>Modern Businesses</span></h2>
          <div className="services-grid">
            {[
              { icon: '🌐', num: '01', title: 'Web App Development', desc: 'Modern, responsive web applications built with cutting-edge frameworks and best practices.' },
              { icon: '📱', num: '02', title: 'Mobile Development', desc: 'Android and cross-platform mobile apps tailored precisely to your business needs.' },
              { icon: '⚙️', num: '03', title: 'Custom Software', desc: 'Fully customized software solutions designed around your specific operational workflow.' },
              { icon: '🎨', num: '04', title: 'UI/UX Design', desc: 'Beautiful, intuitive interfaces that users love — designed with purpose and precision.' },
              { icon: '🗄️', num: '05', title: 'Database Management', desc: 'Structured, secure, and optimized database design, management, and administration.' },
              { icon: '🤖', num: '06', title: 'Automation Solutions', desc: 'Digital workflow automation that boosts efficiency and eliminates manual bottlenecks.' },
            ].map((s, i) => (
              <div className={`svc-card reveal reveal-d${(i % 3) + 1}`} key={i}>
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
          <div className="why-left reveal">
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
          <div className="why-cards reveal reveal-d2">
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
        <h2 className="reveal">Ready to Build Something<br /><span style={{ color: '#60a5fa' }}>Extraordinary?</span></h2>
        <p className="reveal reveal-d1">Let's turn your idea into a powerful digital product. We're ready when you are.</p>
        <Link to="/contact" className="btn-main reveal reveal-d2" style={{ position: 'relative', display: 'inline-block' }}>
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

      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          var container = document.getElementById('home-particles');
          if (!container) return;
          for (var i = 0; i < 16; i++) {
            var p = document.createElement('div');
            p.className = 'hero-particle';
            var size = Math.random() * 2.5 + 1;
            p.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + (Math.random()*100) + '%;animation-duration:' + (Math.random()*12+8) + 's;animation-delay:' + (Math.random()*10) + 's;opacity:' + (Math.random()*0.4+0.1) + ';';
            container.appendChild(p);
          }
        })();
      `}} />
    </div>
  );
}

export default Home;