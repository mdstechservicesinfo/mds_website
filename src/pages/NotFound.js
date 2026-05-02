import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import PageTransition from "../components/PageTransition";

const CHARS =
  "ｦｱｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789@#$%<>{}=+*".split(
    "",
  );
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const FONT_SIZE = 13;

function NotFound() {
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const countRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const columns = useRef([]);

  /* ── MATRIX RAIN — brand colors ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initColumns();
    };

    function initColumns() {
      const count = Math.floor(window.innerWidth / 28);
      columns.current = Array.from({ length: count }, (_, i) => ({
        x: i * 28 + Math.random() * 14,
        y: Math.random() * -window.innerHeight,
        speed: 0.4 + Math.random() * 0.5,
        chars: Array.from({ length: 20 }, () => rand(CHARS)),
        mutate: Array.from({ length: 20 }, () => (Math.random() * 30) | 0),
        length: 8 + Math.floor(Math.random() * 12),
        opacity: 0.04 + Math.random() * 0.06,
      }));
    }

    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      columns.current.forEach((col) => {
        col.y += col.speed;
        if (col.y > H + col.length * FONT_SIZE) {
          col.y = -col.length * FONT_SIZE;
          col.speed = 0.4 + Math.random() * 0.5;
          col.chars = Array.from({ length: 20 }, () => rand(CHARS));
        }

        col.mutate = col.mutate.map((m, ci) => {
          if (m <= 0) {
            col.chars[ci] = rand(CHARS);
            return (Math.random() * 40) | 0;
          }
          return m - 1;
        });

        for (let ci = 0; ci < col.length; ci++) {
          const cy = col.y + ci * FONT_SIZE;
          if (cy < -FONT_SIZE || cy > H) continue;

          const isHead = ci === col.length - 1;
          const fade = ci / col.length;

          if (isHead) {
            // bright white-cyan head — matches CustomCursor
            ctx.fillStyle = `rgba(200,240,255,${Math.min(col.opacity * 5, 0.35)})`;
          } else {
            // cyan body — matches CustomCursor
            ctx.fillStyle = `rgba(6,182,212,${Math.min(fade * col.opacity * 3.5, 0.22)})`;
          }

          ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;
          ctx.fillText(col.chars[ci] || rand(CHARS), col.x, cy);
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── COUNTDOWN ── */
  useEffect(() => {
    let seconds = 30;
    const tick = () => {
      seconds--;
      if (countRef.current) countRef.current.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(timerRef.current);
        navigate("/");
      }
    };
    timerRef.current = setInterval(tick, 1000);
    return () => clearInterval(timerRef.current);
  }, [navigate]);

  return (
    <PageTransition>
      <div
        style={{
          background: "#040610",
          minHeight: "100vh",
          color: "#fff",
          overflowX: "hidden",
        }}
      >
        <Helmet>
          <title>
            404 — Page Not Found | MDS Software Development Services
          </title>
        </Helmet>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');

          :root {
            --blue: #2563eb;
            --cyan: #06b6d4;
            --bg: #040610;
            --border: rgba(255,255,255,0.07);
            --text-muted: rgba(255,255,255,0.45);
          }

          .nf-wrap * { box-sizing: border-box; margin: 0; padding: 0; }

          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.2; } }
          @keyframes gradientShift {
            0%,100% { background-position: 0% 50%; }
            50%      { background-position: 100% 50%; }
          }
          @keyframes codeGlow {
            0%,100% {
              filter: drop-shadow(0 0 20px rgba(37,99,235,0.4))
                      drop-shadow(0 0 60px rgba(37,99,235,0.15));
            }
            50% {
              filter: drop-shadow(0 0 40px rgba(6,182,212,0.6))
                      drop-shadow(0 0 100px rgba(37,99,235,0.25));
            }
          }
          @keyframes scanLine {
            0%   { top: -2px; opacity: 0; }
            5%   { opacity: 1; }
            95%  { opacity: 0.5; }
            100% { top: 100%; opacity: 0; }
          }
          @keyframes countdownStroke {
            from { stroke-dashoffset: 0; }
            to   { stroke-dashoffset: 283; }
          }

          .nf-canvas {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            z-index: 0;
            opacity: 0.4;
            pointer-events: none;
          }
          .nf-vignette {
            position: fixed;
            inset: 0;
            z-index: 0;
            pointer-events: none;
            background: radial-gradient(
              ellipse 70% 70% at 50% 50%,
              rgba(4,6,16,0.55) 0%,
              rgba(4,6,16,0.82) 55%,
              rgba(4,6,16,0.97) 100%
            );
          }
          .nf-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 160px 24px 100px;
            position: relative;
            z-index: 1;
          }
          .nf-content {
            position: relative;
            z-index: 2;
            max-width: 700px;
          }

          /* Eyebrow */
          .nf-eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 5px 14px 5px 10px;
            background: rgba(239,68,68,0.08);
            border: 1px solid rgba(239,68,68,0.2);
            border-radius: 100px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px;
            color: #f87171;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            margin-bottom: 32px;
            animation: fadeUp 0.5s ease both;
          }
          .nf-eyebrow-dot {
            width: 6px; height: 6px;
            background: #f87171;
            border-radius: 50%;
            animation: blink 1.2s ease infinite;
            box-shadow: 0 0 6px rgba(239,68,68,0.6);
          }

          /* 404 */
          .nf-code-wrap {
            position: relative;
            display: inline-block;
            margin-bottom: 28px;
            animation: fadeUp 0.5s ease 0.1s both;
          }
          .nf-scan {
            position: absolute;
            left: -10%; right: -10%;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(6,182,212,0.7), rgba(37,99,235,0.7), transparent);
            pointer-events: none;
            animation: scanLine 4s linear infinite;
          }
          .nf-code {
            font-family: 'Outfit', sans-serif;
            font-size: clamp(110px, 20vw, 200px);
            font-weight: 900;
            letter-spacing: -0.06em;
            line-height: 1;
            background: linear-gradient(135deg, #fff 0%, #60a5fa 40%, #06b6d4 70%, #2563eb 100%);
            background-size: 300%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradientShift 5s ease infinite, codeGlow 3s ease-in-out infinite;
            user-select: none;
            cursor: default;
          }

          .nf-divider {
            width: 60px; height: 2px;
            background: linear-gradient(90deg, #2563eb, #06b6d4);
            margin: 0 auto 24px;
            border-radius: 2px;
            box-shadow: 0 0 10px rgba(37,99,235,0.4);
            animation: fadeUp 0.5s ease 0.2s both;
          }
          .nf-title {
            font-family: 'Outfit', sans-serif;
            font-size: clamp(20px, 3vw, 30px);
            font-weight: 800;
            letter-spacing: -0.03em;
            color: #fff;
            margin-bottom: 12px;
            animation: fadeUp 0.5s ease 0.25s both;
          }
          .nf-desc {
            font-family: 'Outfit', sans-serif;
            font-size: 15px;
            color: var(--text-muted);
            line-height: 1.8;
            max-width: 420px;
            margin: 0 auto 44px;
            animation: fadeUp 0.5s ease 0.3s both;
          }

          /* Buttons */
          .nf-actions {
            display: flex;
            gap: 14px;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 48px;
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
            letter-spacing: -0.01em;
            box-shadow: 0 8px 32px rgba(37,99,235,0.35);
            transition: all 0.3s ease;
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
            letter-spacing: -0.01em;
            transition: all 0.3s ease;
          }
          .btn-ghost:hover {
            border-color: rgba(37,99,235,0.4);
            color: #fff;
            background: rgba(37,99,235,0.08);
            transform: translateY(-3px);
          }

          /* Countdown */
          .nf-countdown {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            animation: fadeUp 0.5s ease 0.4s both;
          }
          .nf-countdown-ring { position: relative; width: 56px; height: 56px; }
          .nf-countdown-ring svg { transform: rotate(-90deg); }
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
            filter: drop-shadow(0 0 4px rgba(37,99,235,0.5));
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
            font-size: 10px;
            color: var(--text-muted);
            letter-spacing: 0.1em;
            text-transform: uppercase;
          }

          /* Quick nav */
          .nf-nav-links {
            display: flex;
            gap: 8px;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 36px;
            animation: fadeUp 0.5s ease 0.45s both;
          }
          .nf-nav-link {
            padding: 5px 14px;
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.07);
            border-radius: 100px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 10px;
            color: rgba(255,255,255,0.35);
            text-decoration: none;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            transition: all 0.25s ease;
          }
          .nf-nav-link:hover {
            border-color: rgba(37,99,235,0.35);
            color: #60a5fa;
            background: rgba(37,99,235,0.07);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(37,99,235,0.1);
          }

          @media (max-width: 480px) {
            .nf-page { padding: 120px 20px 80px; }
            .nf-actions { flex-direction: column; align-items: center; }
            .btn-main, .btn-ghost { width: 100%; max-width: 280px; text-align: center; }
          }
        `}</style>

        <Navbar />
        <canvas ref={canvasRef} className="nf-canvas" />
        <div className="nf-vignette" />

        <div className="nf-wrap">
          <main className="nf-page">
            <div className="nf-content">
              <div className="nf-eyebrow">
                <span className="nf-eyebrow-dot" />
                Error 404 · Page not found
              </div>

              <div className="nf-code-wrap">
                <div className="nf-scan" />
                <div className="nf-code">404</div>
              </div>

              <div className="nf-divider" />

              <h1 className="nf-title">
                Looks like you're lost in the matrix.
              </h1>
              <p className="nf-desc">
                The page you're looking for doesn't exist, was moved, or never
                existed in the first place. Let's get you back on track.
              </p>

              <div className="nf-actions">
                <Link to="/" className="btn-main">
                  ← Back to Home
                </Link>
                <Link to="/contact" className="btn-ghost">
                  Report an Issue
                </Link>
              </div>

              <div className="nf-countdown">
                <div className="nf-countdown-ring">
                  <svg width="56" height="56" viewBox="0 0 56 56">
                    <defs>
                      <linearGradient
                        id="countGrad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                    <circle className="track" cx="28" cy="28" r="24" />
                    <circle className="progress" cx="28" cy="28" r="24" />
                  </svg>
                  <span className="nf-countdown-num" ref={countRef}>
                    10
                  </span>
                </div>
                <span className="nf-countdown-label">Redirecting to home</span>
              </div>

              <div className="nf-nav-links">
                {[
                  { label: "Home", to: "/" },
                  { label: "About", to: "/about" },
                  { label: "Services", to: "/services" },
                  { label: "Projects", to: "/projects" },
                  { label: "Packages", to: "/packages" },
                  { label: "Contact", to: "/contact" },
                ].map(({ label, to }) => (
                  <Link key={to} to={to} className="nf-nav-link">
                    {label}
                  </Link>
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
