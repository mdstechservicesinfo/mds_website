import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import founderImg from '../assets/founder.png';
import { Helmet } from 'react-helmet-async';

function About() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const handleKey = (e) => { if (e.key === 'Escape') setModalOpen(false); };
    window.addEventListener('keydown', handleKey);

    return () => {
      observer.disconnect();
      window.removeEventListener('keydown', handleKey);
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
          --muted: rgba(255,255,255,0.45);
        }

        .about * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow1Pulse {
          0%,100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes gradientShift {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes scanLine {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.4; }
          100% { top: 110%; opacity: 0; }
        }
        @keyframes badgePop {
          0% { transform: scale(0.6); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes nameFadeIn {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes glowPulse {
          0%,100% { box-shadow: 0 0 20px rgba(37,99,235,0.2), 0 0 0 1px rgba(37,99,235,0.15); }
          50% { box-shadow: 0 0 40px rgba(6,182,212,0.35), 0 0 0 1px rgba(6,182,212,0.3); }
        }
        @keyframes dotBlink {
          0%,100% { opacity: 1; box-shadow: 0 0 6px #22d3ee; }
          50% { opacity: 0.3; box-shadow: none; }
        }
        @keyframes modalBackdropIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes tabFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes skillPop {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
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
          animation: fadeUp 0.65s ease 0.05s both;
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
          animation: fadeUp 0.65s ease 0.15s both;
        }

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
          transform: translateX(4px);
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

        .founder-photo-wrap {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(37,99,235,0.2);
          background: rgba(255,255,255,0.02);
          transition: all 0.5s cubic-bezier(0.4,0,0.2,1);
          animation: glowPulse 4s ease-in-out infinite;
          cursor: pointer;
        }
        .founder-photo-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(37,99,235,0.08), transparent 50%, rgba(6,182,212,0.06));
          z-index: 1;
          opacity: 0;
          transition: opacity 0.4s;
        }
        .founder-photo-wrap:hover::before { opacity: 1; }
        .founder-photo-wrap::after {
          content: '';
          position: absolute;
          top: -1px; right: -1px;
          width: 40px; height: 40px;
          border-top: 2px solid #06b6d4;
          border-right: 2px solid #06b6d4;
          border-radius: 0 16px 0 0;
          z-index: 3;
          transition: all 0.4s ease;
        }
        .founder-photo-wrap:hover::after {
          width: 60px; height: 60px;
          border-color: #22d3ee;
          box-shadow: 4px -4px 12px rgba(34,211,238,0.3);
        }
        .founder-corner-bl {
          position: absolute;
          bottom: -1px; left: -1px;
          width: 40px; height: 40px;
          border-bottom: 2px solid #2563eb;
          border-left: 2px solid #2563eb;
          border-radius: 0 0 0 16px;
          z-index: 3;
          transition: all 0.4s ease;
        }
        .founder-photo-wrap:hover .founder-corner-bl {
          width: 60px; height: 60px;
          border-color: #3b82f6;
          box-shadow: -4px 4px 12px rgba(37,99,235,0.3);
        }
        .founder-scan {
          position: absolute;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(6,182,212,0.6), rgba(37,99,235,0.6), transparent);
          z-index: 2;
          top: -10%;
          opacity: 0;
          animation: scanLine 4s ease-in-out infinite;
          pointer-events: none;
        }
        .founder-photo-wrap img {
          width: 100%;
          display: block;
          object-fit: cover;
          object-position: top center;
          max-height: 380px;
          transition: transform 0.6s cubic-bezier(0.4,0,0.2,1), filter 0.4s ease;
          filter: brightness(0.9) saturate(0.95);
        }
        .founder-photo-wrap:hover img {
          transform: scale(1.05);
          filter: brightness(1.05) saturate(1.1);
        }
        .founder-photo-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 48px 20px 18px;
          background: linear-gradient(to top, rgba(4,6,16,0.96) 0%, rgba(4,6,16,0.6) 60%, transparent 100%);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          z-index: 2;
          transform: translateY(100%);
          opacity: 0;
          transition: all 0.45s cubic-bezier(0.4,0,0.2,1);
        }
        .founder-photo-wrap:hover .founder-photo-overlay {
          transform: translateY(0);
          opacity: 1;
        }
        .founder-click-hint {
          position: absolute;
          top: 12px;
          left: 12px;
          padding: 4px 10px;
          background: rgba(4,6,16,0.7);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 100px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.1em;
          z-index: 4;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: all 0.3s ease;
          pointer-events: none;
          white-space: nowrap;
        }
        .founder-photo-wrap:hover .founder-click-hint {
          border-color: rgba(37,99,235,0.35);
          color: #60a5fa;
          background: rgba(4,6,16,0.88);
        }
        .click-hint-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #60a5fa;
          animation: dotBlink 1.5s ease-in-out infinite;
        }
        .founder-photo-name {
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
          animation: nameFadeIn 0.4s ease 0.1s both;
        }
        .founder-photo-role {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: rgba(6,182,212,0.9);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 3px;
        }
        .founder-photo-badge {
          padding: 5px 12px;
          background: linear-gradient(135deg, rgba(37,99,235,0.3), rgba(6,182,212,0.3));
          border: 1px solid rgba(6,182,212,0.4);
          border-radius: 100px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: #22d3ee;
          letter-spacing: 0.12em;
          animation: badgePop 0.5s cubic-bezier(0.4,0,0.2,1) 0.2s both;
          box-shadow: 0 0 12px rgba(6,182,212,0.2);
        }

        .mv-section { padding: 100px 40px; max-width: 1280px; margin: 0 auto; }
        .mv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 56px; }
        .mv-card { padding: 40px; border-radius: 20px; border: 1px solid var(--border); position: relative; overflow: hidden; transition: all 0.3s ease; }
        .mv-card.mission { background: linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(6,182,212,0.04) 100%); border-color: rgba(37,99,235,0.2); }
        .mv-card.vision { background: linear-gradient(135deg, rgba(6,182,212,0.08) 0%, rgba(37,99,235,0.04) 100%); border-color: rgba(6,182,212,0.2); }
        .mv-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
        .mv-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 16px; display: block; }
        .mv-card.mission .mv-label { color: #60a5fa; }
        .mv-card.vision .mv-label { color: #22d3ee; }
        .mv-card h3 { font-family: 'Outfit', sans-serif; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 16px; color: #fff; }
        .mv-card p { font-family: 'Outfit', sans-serif; font-size: 15px; color: var(--muted); line-height: 1.8; font-weight: 400; }

        .values-section { padding: 100px 40px; background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .values-inner { max-width: 1280px; margin: 0 auto; }
        .values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 56px; }
        .value-card { padding: 28px; background: rgba(255,255,255,0.02); border: 1px solid var(--border); border-radius: 16px; transition: all 0.3s ease; position: relative; overflow: hidden; }
        .value-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(37,99,235,0.5), rgba(6,182,212,0.5), transparent); opacity: 0; transition: opacity 0.4s; }
        .value-card:hover::before { opacity: 1; }
        .value-card:hover { border-color: rgba(37,99,235,0.3); background: rgba(37,99,235,0.05); transform: translateY(-4px); box-shadow: 0 16px 32px rgba(0,0,0,0.25); }
        .value-num { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: rgba(37,99,235,0.5); letter-spacing: 0.1em; margin-bottom: 12px; }
        .value-card h3 { font-family: 'Outfit', sans-serif; font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 8px; letter-spacing: -0.02em; }
        .value-card p { font-family: 'Outfit', sans-serif; font-size: 13px; color: var(--muted); line-height: 1.7; font-weight: 400; }

        .obj-section { padding: 100px 40px; max-width: 1280px; margin: 0 auto; }
        .obj-list { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 56px; }
        .obj-item { display: flex; align-items: flex-start; gap: 16px; padding: 24px; background: rgba(255,255,255,0.02); border: 1px solid var(--border); border-radius: 14px; transition: all 0.3s ease; }
        .obj-item:hover { border-color: rgba(37,99,235,0.25); background: rgba(37,99,235,0.04); transform: translateX(4px); }
        .obj-dot { width: 8px; height: 8px; background: linear-gradient(135deg, #2563eb, #06b6d4); border-radius: 50%; flex-shrink: 0; margin-top: 6px; transition: transform 0.2s, box-shadow 0.2s; }
        .obj-item:hover .obj-dot { transform: scale(1.4); box-shadow: 0 0 8px rgba(37,99,235,0.5); }
        .obj-item p { font-family: 'Outfit', sans-serif; font-size: 14px; color: rgba(255,255,255,0.65); line-height: 1.6; font-weight: 400; }

        .cta-wrap { padding: 100px 40px; text-align: center; position: relative; overflow: hidden; }
        .cta-glow { position: absolute; width: 600px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%); top: 50%; left: 50%; transform: translate(-50%, -50%); pointer-events: none; animation: glow1Pulse 6s ease-in-out infinite; }
        .cta-wrap h2 { font-family: 'Outfit', sans-serif; font-size: clamp(28px, 4vw, 48px); font-weight: 900; letter-spacing: -0.04em; line-height: 1.1; margin-bottom: 16px; position: relative; }
        .cta-wrap p { font-family: 'Outfit', sans-serif; font-size: 16px; color: var(--muted); max-width: 440px; margin: 0 auto 40px; line-height: 1.7; position: relative; font-weight: 400; }
        .btn-main { padding: 14px 32px; background: linear-gradient(135deg, #2563eb, #06b6d4); border-radius: 12px; font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 15px; color: #fff; text-decoration: none; box-shadow: 0 8px 32px rgba(37,99,235,0.35); transition: all 0.3s ease; display: inline-block; position: relative; overflow: hidden; }
        .btn-main:hover { transform: translateY(-3px); box-shadow: 0 12px 48px rgba(37,99,235,0.55); }

        .footer { padding: 32px 40px; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; max-width: 1280px; margin: 0 auto; }
        .footer-brand { font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.5); }
        .footer-right { font-family: 'Outfit', sans-serif; font-size: 13px; color: var(--muted); }
        .footer-right a { color: #60a5fa; text-decoration: none; }

        .modal-backdrop { position: fixed; inset: 0; background: rgba(4,6,16,0.85); backdrop-filter: blur(12px); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 24px; animation: modalBackdropIn 0.3s ease both; }
        .modal-box { background: #070b1a; border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; width: 100%; max-width: 700px; max-height: 88vh; overflow: hidden; display: flex; flex-direction: column; animation: modalSlideUp 0.4s cubic-bezier(0.4,0,0.2,1) both; box-shadow: 0 40px 80px rgba(0,0,0,0.5); position: relative; }
        .modal-box::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(37,99,235,0.5), rgba(6,182,212,0.5), transparent); }
        .modal-header { padding: 28px 32px 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.07); flex-shrink: 0; }
        .modal-header-left { display: flex; align-items: center; gap: 16px; }
        .modal-avatar { width: 48px; height: 48px; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.07); flex-shrink: 0; }
        .modal-avatar img { width: 100%; height: 100%; object-fit: cover; object-position: top center; }
        .modal-header-name { font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 800; color: #fff; letter-spacing: -0.03em; line-height: 1.1; }
        .modal-header-role { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: rgba(6,182,212,0.7); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 4px; }
        .modal-close { width: 34px; height: 34px; border-radius: 8px; background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07); color: rgba(255,255,255,0.45); font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; flex-shrink: 0; }
        .modal-close:hover { background: rgba(239,68,68,0.08); border-color: rgba(239,68,68,0.25); color: #f87171; }
        .modal-tabs { display: flex; gap: 2px; padding: 16px 32px 0; border-bottom: 1px solid rgba(255,255,255,0.07); flex-shrink: 0; overflow-x: auto; scrollbar-width: none; }
        .modal-tabs::-webkit-scrollbar { display: none; }
        .modal-tab { padding: 8px 20px 14px; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: rgba(255,255,255,0.35); letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; border: none; background: none; border-bottom: 2px solid transparent; transition: all 0.2s ease; white-space: nowrap; margin-bottom: -1px; }
        .modal-tab:hover { color: rgba(255,255,255,0.65); }
        .modal-tab.active { color: #60a5fa; border-bottom-color: #2563eb; }
        .modal-content { padding: 28px 32px; overflow-y: auto; flex: 1; scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.07) transparent; }
        .modal-content::-webkit-scrollbar { width: 4px; }
        .modal-content::-webkit-scrollbar-track { background: transparent; }
        .modal-content::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 2px; }
        .modal-tab-panel { animation: tabFadeIn 0.3s ease both; }

        .exp-timeline { display: flex; flex-direction: column; position: relative; }
        .exp-timeline::before { content: ''; position: absolute; left: 7px; top: 8px; bottom: 8px; width: 1px; background: linear-gradient(to bottom, rgba(37,99,235,0.6), rgba(6,182,212,0.3), transparent); }
        .exp-entry { display: flex; gap: 20px; padding-bottom: 28px; }
        .exp-entry:last-child { padding-bottom: 0; }
        .exp-dot { width: 15px; height: 15px; border-radius: 50%; background: linear-gradient(135deg, #2563eb, #06b6d4); flex-shrink: 0; margin-top: 3px; box-shadow: 0 0 8px rgba(37,99,235,0.4); position: relative; z-index: 1; }
        .exp-title { font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 700; color: #fff; letter-spacing: -0.02em; margin-bottom: 2px; }
        .exp-company { font-family: 'Outfit', sans-serif; font-size: 13px; color: #60a5fa; font-weight: 500; margin-bottom: 3px; }
        .exp-period { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: rgba(255,255,255,0.3); letter-spacing: 0.08em; margin-bottom: 10px; }
        .exp-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .exp-tag { padding: 3px 10px; background: rgba(37,99,235,0.08); border: 1px solid rgba(37,99,235,0.2); border-radius: 100px; font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #60a5fa; letter-spacing: 0.05em; }

        .skills-group { margin-bottom: 24px; }
        .skills-group-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: rgba(255,255,255,0.3); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 12px; }
        .skills-pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .skill-pill { padding: 6px 14px; background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07); border-radius: 100px; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.65); transition: all 0.2s ease; animation: skillPop 0.3s ease both; cursor: default; }
        .skill-pill:hover { border-color: rgba(37,99,235,0.35); color: rgba(255,255,255,0.9); background: rgba(37,99,235,0.06); transform: translateY(-2px); }

        .info-row { display: flex; align-items: flex-start; gap: 14px; padding: 20px; background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; margin-bottom: 12px; transition: all 0.3s ease; }
        .info-row:last-child { margin-bottom: 0; }
        .info-row:hover { border-color: rgba(37,99,235,0.25); background: rgba(37,99,235,0.04); transform: translateX(4px); }
        .info-row-icon { width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, rgba(37,99,235,0.15), rgba(6,182,212,0.15)); border: 1px solid rgba(37,99,235,0.2); display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
        .info-row-title { font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700; color: #fff; letter-spacing: -0.01em; margin-bottom: 4px; }
        .info-row-sub { font-family: 'Outfit', sans-serif; font-size: 13px; color: var(--muted); font-weight: 400; line-height: 1.5; }
        .info-row-badge { margin-left: auto; padding: 3px 10px; background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.2); border-radius: 100px; font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #4ade80; letter-spacing: 0.06em; white-space: nowrap; flex-shrink: 0; }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .founder-photo-overlay { transform: translateY(0) !important; opacity: 1 !important; }
          .founder-click-hint { top: auto !important; left: 50% !important; transform: translateX(-50%) !important; bottom: 72px !important; white-space: nowrap; }
        }
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
          .modal-backdrop { padding: 16px; }
          .modal-box { max-height: 92vh; border-radius: 16px; }
          .modal-header { padding: 20px 20px 16px; }
          .modal-tabs { padding: 12px 20px 0; }
          .modal-content { padding: 20px; }
          .founder-photo-overlay { transform: translateY(0) !important; opacity: 1 !important; }
          .founder-click-hint { top: auto !important; left: 50% !important; transform: translateX(-50%) !important; bottom: 72px !important; white-space: nowrap; }
        }
        @media (max-width: 480px) {
          .values-grid { grid-template-columns: 1fr; }
          .page-hero { padding: 110px 16px 50px; }
          .mv-card { padding: 28px 20px; }
          .cta-wrap { padding: 50px 16px; }
          .modal-header-name { font-size: 15px; }
          .founder-photo-overlay { transform: translateY(0) !important; opacity: 1 !important; }
          .founder-click-hint { top: auto !important; left: 50% !important; transform: translateX(-50%) !important; bottom: 72px !important; white-space: nowrap; }
        }
      `}</style>

      <Navbar />
      <Helmet>
        <title>About Us | MDS Software Development Services</title>
        <meta name="description" content="Learn about MDS Software Development Services — a Philippine-based startup founded by Arem Jay Mendoza, dedicated to delivering innovative digital solutions." />
        <meta property="og:title" content="About Us | MDS Software Development Services" />
        <meta property="og:url" content="https://mds-profile-website.web.app/about" />
      </Helmet>

      <section className="page-hero">
        <div className="page-hero-glow" />
        <span className="section-tag" style={{ animation: 'fadeUp 0.5s ease both' }}>// about us</span>
        <h1 className="page-title">
          Who We Are &<br />
          <span>What Drives Us</span>
        </h1>
        <p className="page-desc">
          MDS Software Development Services is a Philippine-based startup dedicated to building innovative, secure, and high-quality digital solutions for businesses and organizations.
        </p>
      </section>

      <div className="overview">
        <div className="overview-inner">
          <div className="overview-left reveal">
            <span className="section-tag">// company overview</span>
            <h2>Built to Help Businesses<br />Go Digital</h2>
            <p>Founded by Arem Jay Mendoza, MDS was established to help clients modernize their operations through reliable software systems, websites, and mobile applications.</p>
            <p>We serve startups, small-to-medium enterprises, and organizations that require customized software solutions tailored to their specific operational needs.</p>
            <p>We believe technology should empower businesses — not complicate them.</p>
          </div>
          <div className="overview-right">
            <div className="founder-photo-wrap reveal reveal-d1" onClick={() => setModalOpen(true)}>
              <div className="founder-scan" />
              <div className="founder-corner-bl" />
              <div className="founder-click-hint">
                <div className="click-hint-dot" />
                CLICK TO VIEW PROFILE
              </div>
              <img src={founderImg} alt="Arem Jay Mendoza - Founder of MDS" />
              <div className="founder-photo-overlay">
                <div>
                  <div className="founder-photo-name">Arem Jay Mendoza</div>
                  <div className="founder-photo-role">Founder & Lead Developer</div>
                </div>
                <div className="founder-photo-badge">MDS</div>
              </div>
            </div>
            {[
              { label: 'Location', value: 'Philippines' },
              { label: 'Company Type', value: 'Software Development Startup' },
              { label: 'Team Size', value: '2–5 Professional Programmers' },
              { label: 'Contact', value: 'mdstechservices.info@gmail.com' },
            ].map((item, i) => (
              <div className={`info-card reveal reveal-d${Math.min(i + 1, 5)}`} key={i}>
                <h4>{item.label}</h4>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mv-section">
        <span className="section-tag reveal">// mission & vision</span>
        <h2 className="reveal" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          Our Purpose &<br /><span style={{ color: '#60a5fa' }}>Our Direction</span>
        </h2>
        <div className="mv-grid">
          <div className="mv-card mission reveal reveal-d1">
            <span className="mv-label">// mission</span>
            <h3>Our Mission</h3>
            <p>To deliver high-quality, secure, and innovative software solutions that help businesses improve efficiency, productivity, and digital transformation.</p>
          </div>
          <div className="mv-card vision reveal reveal-d2">
            <span className="mv-label">// vision</span>
            <h3>Our Vision</h3>
            <p>To become a trusted and leading software development company in the Philippines and internationally, known for reliability, professionalism, and excellence in technology services.</p>
          </div>
        </div>
      </div>

      <div className="values-section">
        <div className="values-inner">
          <span className="section-tag reveal">// core values</span>
          <h2 className="reveal" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
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
              <div className={`value-card reveal reveal-d${(i % 3) + 1}`} key={i}>
                <div className="value-num">{v.num}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="obj-section">
        <span className="section-tag reveal">// business objectives</span>
        <h2 className="reveal" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
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
            <div className={`obj-item reveal reveal-d${(i % 2) + 1}`} key={i}>
              <div className="obj-dot" />
              <p>{obj}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="cta-wrap">
        <div className="cta-glow" />
        <h2 className="reveal">Ready to Work<br /><span style={{ color: '#60a5fa' }}>With Us?</span></h2>
        <p className="reveal reveal-d1">Let's build something great together. Reach out and let's talk about your project.</p>
        <Link to="/contact" className="btn-main reveal reveal-d2">Get In Touch →</Link>
      </div>

      <footer style={{ background: '#040610', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="footer">
          <div className="footer-brand">MDS Software Development Services</div>
          <div className="footer-right">
            📧 <a href="mailto:mdstechservices.info@gmail.com">mdstechservices.info@gmail.com</a> · © 2025 All rights reserved.
          </div>
        </div>
      </footer>

      {modalOpen && <FounderModal onClose={() => setModalOpen(false)} founderImg={founderImg} />}
    </div>
  );
}

function FounderModal({ onClose, founderImg }) {
  const [activeTab, setActiveTab] = useState('experience');

  const experience = [
    { title: 'Website Developer', company: 'Romance Travel Group', period: 'Jan 2025 – Present · Freelance', tags: ['Frontend', 'Bootstrap 5', 'CSS', 'HTML'] },
    { title: 'Jr/Mid Software Developer', company: 'The Beehive Inc.', period: 'Sep 2024 – Apr 2025', tags: ['C#', '.NET', 'Backend', 'Frontend', 'NuGet'] },
    { title: 'Web App / Software Developer', company: 'Romance Travel Group', period: 'Mar 2024 – Sep 2024 · Freelance', tags: ['ASP.NET', 'DevExpress', 'Web Forms', 'Bootstrap'] },
    { title: 'Associate Software Engineer', company: 'Accenture', period: 'Mar 2022 – Feb 2024', tags: ['Azure SQL', 'AWS', 'PowerShell', 'QA Testing', 'DevOps'] },
    { title: 'IT Staff', company: 'Aruze Global Shared Services', period: 'Nov 2021 – Mar 2022', tags: ['IT Support', 'Network', 'Jira'] },
    { title: 'Field Technician', company: 'Tangent Solution Inc.', period: 'Jan 2021 – Oct 2021', tags: ['POS Systems', 'Hardware', 'Configuration'] },
  ];

  const skillGroups = [
    { label: 'Frontend', skills: ['HTML5', 'CSS3', 'Bootstrap 5', 'ReactJS', 'ASP.NET', 'Web Design'] },
    { label: 'Backend', skills: ['C#', '.NET', 'Web API', 'Entity Framework', 'VB.NET', 'PowerShell'] },
    { label: 'Database & Cloud', skills: ['SQL Server', 'Azure SQL', 'AWS ElastiCache', 'SSMS', 'Azure DevOps'] },
    { label: 'Tools', skills: ['Visual Studio 2022', 'VS Code', 'Postman', 'SourceTree', 'Jira', 'ServiceNow'] },
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="modal-avatar">
              <img src={founderImg} alt="Arem Jay Mendoza" />
            </div>
            <div>
              <div className="modal-header-name">Arem Jay Mendoza</div>
              <div className="modal-header-role">Founder & Lead Developer · MDS</div>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-tabs">
          {[
            { id: 'experience', label: '// Experience' },
            { id: 'skills', label: '// Skills' },
            { id: 'education', label: '// Education' },
          ].map(t => (
            <button key={t.id} className={`modal-tab ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="modal-content">
          {activeTab === 'experience' && (
            <div className="modal-tab-panel">
              <div className="exp-timeline">
                {experience.map((e, i) => (
                  <div className="exp-entry" key={i}>
                    <div className="exp-dot" />
                    <div>
                      <div className="exp-title">{e.title}</div>
                      <div className="exp-company">{e.company}</div>
                      <div className="exp-period">{e.period}</div>
                      <div className="exp-tags">{e.tags.map(t => <span key={t} className="exp-tag">{t}</span>)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="modal-tab-panel">
              {skillGroups.map((g, gi) => (
                <div className="skills-group" key={gi}>
                  <div className="skills-group-label">{g.label}</div>
                  <div className="skills-pills">
                    {g.skills.map((s, si) => (
                      <span key={s} className="skill-pill" style={{ animationDelay: `${(gi * 6 + si) * 0.04}s` }}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
              <div className="skills-group-label" style={{ marginTop: '8px' }}>Certification</div>
              <div className="info-row">
                <div className="info-row-icon">🏅</div>
                <div>
                  <div className="info-row-title">MB-910 — Microsoft Certified</div>
                  <div className="info-row-sub">Dynamics 365 Fundamentals (CRM) · Jun 2022</div>
                </div>
                <div className="info-row-badge">VERIFIED</div>
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="modal-tab-panel">
              <div className="info-row">
                <div className="info-row-icon">🎓</div>
                <div>
                  <div className="info-row-title">Kolehiyo ng Lungsod ng Lipa</div>
                  <div className="info-row-sub">Bachelor of Science in Computer Science · 2014 – 2018</div>
                </div>
              </div>
              <div style={{ marginTop: '24px' }}>
                <div className="skills-group-label">Seminars & Training</div>
                {[
                  { icon: '🗣️', title: 'English Communication', sub: 'Fiesta World Mall, Lipa City · Nov 2016' },
                  { icon: '💻', title: 'CCS Code Summit', sub: 'Fiesta World Mall, Lipa City · Feb 2017' },
                  { icon: '📱', title: 'Android App Summit', sub: 'Fiesta World Mall, Lipa City · Mar 2017' },
                ].map((item, i) => (
                  <div className="info-row" key={i}>
                    <div className="info-row-icon">{item.icon}</div>
                    <div>
                      <div className="info-row-title">{item.title}</div>
                      <div className="info-row-sub">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default About;