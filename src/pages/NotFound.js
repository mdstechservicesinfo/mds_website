import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import PageTransition from '../components/PageTransition';

function NotFound() {
  const navigate  = useNavigate();
  const timerRef  = useRef(null);
  const countRef  = useRef(null);

  // Auto-redirect countdown
  useEffect(() => {
    let seconds = 10;
    const tick = () => {
      seconds--;
      if (countRef.current) countRef.current.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(timerRef.current);
        navigate('/');
      }
    };
    timerRef.current = setInterval(tick, 1000);
    return () => clearInterval(timerRef.current);
  }, [navigate]);

  // Glitch animation restart on hover
  const glitchRef = useRef(null);
  const restartGlitch = () => {
    if (!glitchRef.current) return;
    glitchRef.current.style.animation = 'none';
    void glitchRef.current.offsetWidth; // reflow
    glitchRef.current.style.animation = '';
  };

  return (
    <PageTransition>
      <div style={{ background: '#040610', minHeight: '100vh', color: '#fff', overflowX: 'hidden' }}>
        <Helmet>
          <title>404 — Page Not Found | MDS Software Development Services</title>
        </Helmet>

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

          .nf-wrap * { box-sizing: border-box; margin: 0; padding: 0; }

          /* ── KEYFRAMES ── */
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes gridPan {
            0%   { background-position: 0 0; }
            100% { background-position: 48px 48px; }
          }
          @keyframes glow1Pulse {
            0%,100% { opacity: 0.7; transform: translateX(-50%) scale(1); }
            50%      { opacity: 1;   transform: translateX(-50%) scale(1.08); }
          }
          @keyframes glow2Pulse {
            0%,100% { opacity: 0.5; }
            50%      { opacity: 0.9; }
          }
          @keyframes gradientShift {
            0%,100% { background-position: 0% 50%; }
            50%      { background-position: 100% 50%; }
          }
          @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.2; } }

          /* Glitch effect on "404" */
          @keyframes glitch-clip-1 {
            0%        { clip-path: inset(40% 0 50% 0); transform: translate(-4px, 0); }
            20%       { clip-path: inset(70% 0 10% 0); transform: translate(4px, 0); }
            40%       { clip-path: inset(10% 0 80% 0); transform: translate(-2px, 0); }
            60%       { clip-path: inset(55% 0 30% 0); transform: translate(3px, 0); }
            80%       { clip-path: inset(25% 0 60% 0); transform: translate(-3px, 0); }
            100%      { clip-path: inset(40% 0 50% 0); transform: translate(0, 0); }
          }
          @keyframes glitch-clip-2 {
            0%        { clip-path: inset(20% 0 70% 0); transform: translate(4px, 0); color: #06b6d4; }
            25%       { clip-path: inset(60% 0 20% 0); transform: translate(-4px, 0); color: #2563eb; }
            50%       { clip-path: inset(5%  0 90% 0); transform: translate(3px, 0);  color: #06b6d4; }
            75%       { clip-path: inset(45% 0 40% 0); transform: translate(-2px, 0); color: #2563eb; }
            100%      { clip-path: inset(20% 0 70% 0); transform: translate(0, 0); }
          }
          @keyframes glitch-main {
            0%,90%,100% { transform: translate(0); }
            92%         { transform: translate(-3px, 1px); }
            94%         { transform: translate(3px, -1px); }
            96%         { transform: translate(-2px, 2px); }
            98%         { transform: translate(2px, -2px); }
          }

          /* Countdown ring */
          @keyframes countdownStroke {
            from { stroke-dashoffset: 0; }
            to   { stroke-dashoffset: 283; }
          }

          /* Scanline overlay */
          @keyframes scanMove {
            0%   { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
          }

          /* ── LAYOUT ── */
          .nf-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 160px 24px 100px;
            position: relative;
            overflow: hidden;
          }

          /* Background grid */
          .nf-grid {
            position: absolute; inset: 0;
            background-image:
              linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px);
            background-size: 48px 48px;
            mask-image: radial-gradient(ellipse 100% 100% at 50% 0%, black 30%, transparent 80%);
            pointer-events: none;
            animation: gridPan 18s linear infinite;
          }

          /* Glow blobs */
          .nf-glow-1 {
            position: absolute;
            width: 700px; height: 700px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%);
            top: -100px; left: 50%;
            transform: translateX(-50%);
            pointer-events: none;
            animation: glow1Pulse 6s ease-in-out infinite;
          }
          .nf-glow-2 {
            position: absolute;
            width: 350px; height: 350px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%);
            bottom: 10%; right: 8%;
            pointer-events: none;
            animation: glow2Pulse 8s ease-in-out infinite;
          }

          /* Scanline */
          .nf-scan {
            position: absolute; inset: 0;
            pointer-events: none;
            overflow: hidden;
            z-index: 0;
          }
          .nf-scan::after {
            content: '';
            position: absolute;
            left: 0; right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(6,182,212,0.12), transparent);
            animation: scanMove 6s linear infinite;
          }

          /* ── CONTENT ── */
          .nf-content {
            position: relative;
            z-index: 1;
            max-width: 680px;
          }

          /* Eyebrow pill */
          .nf-eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 5px 14px 5px 10px;
            background: rgba(239,68,68,0.1);
            border: 1px solid rgba(239,68,68,0.25);
            border-radius: 100px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px;
            color: #f87171;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            margin-bottom: 36px;
            animation: fadeUp 0.5s ease both;
          }
          .nf-eyebrow-dot {
            width: 6px; height: 6px;
            background: #f87171;
            border-radius: 50%;
            animation: blink 1.5s ease infinite;
          }

          /* Big 404 glitch number */
          .nf-code-wrap {
            position: relative;
            display: inline-block;
            margin-bottom: 32px;
            animation: fadeUp 0.5s ease 0.1s both;
          }
          .nf-code {
            font-family: 'Outfit', sans-serif;
            font-size: clamp(100px, 18vw, 180px);
            font-weight: 900;
            letter-spacing: -0.06em;
            line-height: 1;
            background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.5) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            position: relative;
            animation: glitch-main 5s ease-in-out infinite;
            cursor: default;
            user-select: none;
          }
          .nf-code::before,
          .nf-code::after {
            content: '404';
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            font-family: 'Outfit', sans-serif;
            font-size: clamp(100px, 18vw, 180px);
            font-weight: 900;
            letter-spacing: -0.06em;
          }
          .nf-code::before {
            color: #2563eb;
            animation: glitch-clip-1 4s ease-in-out infinite;
            opacity: 0.7;
            -webkit-text-fill-color: #2563eb;
          }
          .nf-code::after {
            color: #06b6d4;
            animation: glitch-clip-2 4s ease-in-out infinite 0.15s;
            opacity: 0.7;
            -webkit-text-fill-color: #06b6d4;
          }

          /* Divider line */
          .nf-divider {
            width: 60px; height: 2px;
            background: linear-gradient(90deg, #2563eb, #06b6d4);
            margin: 0 auto 28px;
            border-radius: 2px;
            animation: fadeUp 0.5s ease 0.2s both;
          }

          .nf-title {
            font-family: 'Outfit', sans-serif;
            font-size: clamp(22px, 3vw, 32px);
            font-weight: 800;
            letter-spacing: -0.03em;
            color: #fff;
            margin-bottom: 14px;
            animation: fadeUp 0.5s ease 0.25s both;
          }
          .nf-desc {
            font-family: 'Outfit', sans-serif;
            font-size: 15px;
            color: var(--text-muted);
            line-height: 1.8;
            max-width: 420px;
            margin: 0 auto 48px;
            animation: fadeUp 0.5s ease 0.3s both;
          }

          /* Buttons */
          .nf-actions {
            display: flex;
            gap: 14px;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 56px;
            animation: fadeUp 0.5s ease 0.35s both;
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
            position: absolute; inset: 0;
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
          .btn-ghost:hover {
            border-color: rgba(37,99,235,0.4);
            color: #fff;
            background: rgba(37,99,235,0.08);
            transform: translateY(-3px);
          }

          /* Countdown ring */
          .nf-countdown {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            animation: fadeUp 0.5s ease 0.4s both;
          }
          .nf-countdown-ring {
            position: relative;
            width: 56px; height: 56px;
          }
          .nf-countdown-ring svg {
            transform: rotate(-90deg);
          }
          .nf-countdown-ring circle.track {
            fill: none;
            stroke: rgba(255,255,255,0.07);
            stroke-width: 3;
          }
          .nf-countdown-ring circle.progress {
            fill: none;
            stroke: url(#countGrad);
            stroke-width: 3;
            stroke-linecap: round;
            stroke-dasharray: 283;
            stroke-dashoffset: 0;
            animation: countdownStroke 10s linear forwards;
          }
          .nf-countdown-num {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'JetBrains Mono', monospace;
            font-size: 16px;
            font-weight: 500;
            color: #60a5fa;
            line-height: 1;
          }
          .nf-countdown-label {
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px;
            color: var(--text-muted);
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          /* Quick nav links */
          .nf-nav-links {
            display: flex;
            gap: 8px;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 40px;
            animation: fadeUp 0.5s ease 0.45s both;
          }
          .nf-nav-link {
            padding: 6px 16px;
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.07);
            border-radius: 100px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px;
            color: rgba(255,255,255,0.45);
            text-decoration: none;
            letter-spacing: 0.05em;
            transition: all 0.25s ease;
          }
          .nf-nav-link:hover {
            border-color: rgba(37,99,235,0.35);
            color: #60a5fa;
            background: rgba(37,99,235,0.07);
            transform: translateY(-2px);
          }

          /* Responsive */
          @media (max-width: 480px) {
            .nf-page { padding: 120px 20px 80px; }
            .nf-actions { flex-direction: column; align-items: center; }
            .btn-main, .btn-ghost { width: 100%; max-width: 280px; text-align: center; }
          }
        `}</style>

        <Navbar />

        <div className="nf-wrap">
          <main className="nf-page">
            <div className="nf-grid" />
            <div className="nf-glow-1" />
            <div className="nf-glow-2" />
            <div className="nf-scan" />

            <div className="nf-content">

              {/* Eyebrow */}
              <div className="nf-eyebrow">
                <span className="nf-eyebrow-dot" />
                Error 404 · Page not found
              </div>

              {/* Glitch 404 */}
              <div
                className="nf-code-wrap"
                ref={glitchRef}
                onMouseEnter={restartGlitch}
              >
                <div className="nf-code">404</div>
              </div>

              <div className="nf-divider" />

              <h1 className="nf-title">Looks like you're lost in the matrix.</h1>
              <p className="nf-desc">
                The page you're looking for doesn't exist, was moved, or never existed in the first place. Let's get you back on track.
              </p>

              {/* Action buttons */}
              <div className="nf-actions">
                <Link to="/" className="btn-main">← Back to Home</Link>
                <Link to="/contact" className="btn-ghost">Report an Issue</Link>
              </div>

              {/* Countdown */}
              <div className="nf-countdown">
                <div className="nf-countdown-ring">
                  <svg width="56" height="56" viewBox="0 0 56 56">
                    <defs>
                      <linearGradient id="countGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%"   stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                    <circle className="track"    cx="28" cy="28" r="24" />
                    <circle className="progress" cx="28" cy="28" r="24" />
                  </svg>
                  <span className="nf-countdown-num" ref={countRef}>10</span>
                </div>
                <span className="nf-countdown-label">Redirecting to home</span>
              </div>

              {/* Quick nav */}
              <div className="nf-nav-links">
                {[
                  { label: 'Home',     to: '/' },
                  { label: 'About',    to: '/about' },
                  { label: 'Services', to: '/services' },
                  { label: 'Projects', to: '/projects' },
                  { label: 'Packages', to: '/packages' },
                  { label: 'Contact',  to: '/contact' },
                ].map(({ label, to }) => (
                  <Link key={to} to={to} className="nf-nav-link">{label}</Link>
                ))}
              </div>

            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  );
}

export default NotFound;