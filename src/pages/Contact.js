import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { Helmet } from 'react-helmet-async';

const EMAILJS_SERVICE_ID = 'service_kporv3e';
const EMAILJS_TEMPLATE_ID = 'template_gxllwch';
const EMAILJS_PUBLIC_KEY = '1ya1P7Zs3dwMpoZ8k';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    const time = new Date().toLocaleString('en-PH', {
      timeZone: 'Asia/Manila',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { name: form.name, email: form.email, title: form.subject, message: form.message, time },
        EMAILJS_PUBLIC_KEY
      );
    } catch (emailError) {
      console.error('EmailJS error:', emailError);
      setStatus('error');
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, 'contacts'), { ...form, createdAt: serverTimestamp() });
    } catch (firestoreError) {
      console.warn('Firestore save failed (email still sent):', firestoreError);
    }

    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
    setLoading(false);
  };

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

        .contact * { box-sizing: border-box; margin: 0; padding: 0; }

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
        @keyframes inputFocusPulse {
          0% { box-shadow: 0 0 0 0 rgba(37,99,235,0.3); }
          70% { box-shadow: 0 0 0 6px rgba(37,99,235,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,99,235,0); }
        }
        @keyframes successSlide {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes btnPulse {
          0%,100% { box-shadow: 0 8px 32px rgba(37,99,235,0.35); }
          50% { box-shadow: 0 8px 40px rgba(37,99,235,0.6); }
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

        .contact-section {
          padding: 80px 40px 100px;
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 60px;
          align-items: start;
        }

        .contact-info { display: flex; flex-direction: column; gap: 24px; }
        .contact-info-title {
          font-family: 'Outfit', sans-serif;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #fff;
          margin-bottom: 8px;
        }
        .contact-info-desc {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          color: var(--muted);
          line-height: 1.7;
          font-weight: 400;
        }
        .contact-detail {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 20px;
          background: rgba(255,255,255,0.025);
          border: 1px solid var(--border);
          border-radius: 14px;
          transition: all 0.3s ease;
        }
        .contact-detail:hover {
          border-color: rgba(37,99,235,0.25);
          background: rgba(37,99,235,0.04);
          transform: translateX(4px);
        }
        .contact-detail-icon {
          width: 40px; height: 40px;
          background: linear-gradient(135deg, rgba(37,99,235,0.2), rgba(6,182,212,0.2));
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }
        .contact-detail:hover .contact-detail-icon { transform: scale(1.1) rotate(-5deg); }
        .contact-detail-text h4 {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #60a5fa;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .contact-detail-text p {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.75);
          font-weight: 400;
        }

        .contact-form-wrap {
          padding: 40px;
          background: rgba(255,255,255,0.025);
          border: 1px solid var(--border);
          border-radius: 20px;
          transition: border-color 0.3s ease;
        }
        .contact-form-wrap:focus-within { border-color: rgba(37,99,235,0.2); }
        .form-title {
          font-family: 'Outfit', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }
        .form-subtitle {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          color: var(--muted);
          margin-bottom: 32px;
          font-weight: 400;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }
        .form-group label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .form-input {
          padding: 14px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          color: #fff;
          outline: none;
          transition: all 0.25s ease;
          width: 100%;
        }
        .form-input::placeholder { color: rgba(255,255,255,0.25); }
        .form-input:focus {
          border-color: rgba(37,99,235,0.5);
          background: rgba(37,99,235,0.06);
          animation: inputFocusPulse 0.5s ease;
        }
        .form-textarea {
          padding: 14px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          color: #fff;
          outline: none;
          transition: all 0.25s ease;
          width: 100%;
          resize: vertical;
          min-height: 140px;
        }
        .form-textarea::placeholder { color: rgba(255,255,255,0.25); }
        .form-textarea:focus {
          border-color: rgba(37,99,235,0.5);
          background: rgba(37,99,235,0.06);
          animation: inputFocusPulse 0.5s ease;
        }
        .btn-submit {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          border: none;
          border-radius: 12px;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 16px;
          color: #fff;
          cursor: pointer;
          box-shadow: 0 8px 32px rgba(37,99,235,0.35);
          transition: all 0.3s ease;
          margin-top: 8px;
          position: relative;
          overflow: hidden;
        }
        .btn-submit::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(rgba(255,255,255,0.12), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .btn-submit:not(:disabled):hover::before { opacity: 1; }
        .btn-submit:not(:disabled) { animation: btnPulse 3s ease-in-out infinite; }
        .btn-submit:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 48px rgba(37,99,235,0.55);
          animation: none;
        }
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .success-msg {
          padding: 16px 20px;
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.25);
          border-radius: 12px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          color: #4ade80;
          margin-top: 16px;
          text-align: center;
          animation: successSlide 0.4s ease both;
        }
        .error-msg {
          padding: 16px 20px;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25);
          border-radius: 12px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          color: #f87171;
          margin-top: 16px;
          text-align: center;
          animation: successSlide 0.4s ease both;
        }

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

        @media (max-width: 768px) {
          .page-hero { padding: 120px 20px 60px; }
          .contact-section { grid-template-columns: 1fr; padding: 60px 20px; gap: 40px; }
          .form-row { grid-template-columns: 1fr; }
          .contact-form-wrap { padding: 24px; }
          .footer { padding: 24px 20px; justify-content: center; text-align: center; }
        }
        @media (max-width: 480px) {
          .page-hero { padding: 110px 16px 50px; }
          .contact-section { padding: 40px 16px; }
          .contact-form-wrap { padding: 20px 16px; }
          .form-input, .form-textarea { font-size: 14px; }
        }
      `}</style>

      <Navbar />

      <Helmet>
        <title>Contact Us | MDS Software Development Services</title>
        <meta name="description" content="Get in touch with MDS Software Development Services. Send us a message and we'll respond within 24 hours." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mdstechservices-ph.online/contact" />
        <meta property="og:title" content="Contact Us | MDS Software Development Services" />
        <meta property="og:description" content="Get in touch with MDS Software Development Services. Send us a message and we'll respond within 24 hours." />
        <meta property="og:image" content="https://mdstechservices-ph.online/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | MDS Software Development Services" />
        <meta name="twitter:description" content="Get in touch with MDS Software Development Services. Send us a message and we'll respond within 24 hours." />
        <meta name="twitter:image" content="https://mdstechservices-ph.online/logo.png" />
        <link rel="canonical" href="https://mdstechservices-ph.online/contact" />
      </Helmet>

      <section className="page-hero">
        <div className="page-hero-glow" />
        <span className="section-tag" style={{ animation: 'fadeUp 0.5s ease both' }}>// contact us</span>
        <h1 className="page-title">
          Let's Build Something<br />
          <span>Together</span>
        </h1>
        <p className="page-desc">
          Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you as soon as possible.
        </p>
      </section>

      <div className="contact-section">
        <div className="contact-info">
          <div className="reveal">
            <h2 className="contact-info-title">Get In Touch</h2>
            <p className="contact-info-desc">We're always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
          </div>
          {[
            { icon: '📧', label: 'Email', value: 'mdstechservices.info@gmail.com' },
            { icon: '📍', label: 'Location', value: 'Philippines' },
            { icon: '🏢', label: 'Company', value: 'MDS Software Development Services' },
            { icon: '👤', label: 'Founder', value: 'Arem Jay Mendoza' },
            { icon: '⏰', label: 'Response Time', value: 'Within 24 hours' },
          ].map((d, i) => (
            <div className={`contact-detail reveal reveal-d${Math.min(i + 1, 5)}`} key={i}>
              <div className="contact-detail-icon">{d.icon}</div>
              <div className="contact-detail-text">
                <h4>{d.label}</h4>
                <p>{d.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="contact-form-wrap reveal reveal-d2">
          <h3 className="form-title">Send Us a Message</h3>
          <p className="form-subtitle">Fill out the form below and we'll respond within 24 hours.</p>

          <div className="form-row">
            <div className="form-group">
              <label>Your Name</label>
              <input className="form-input" type="text" name="name" placeholder="Juan dela Cruz" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input className="form-input" type="email" name="email" placeholder="juan@email.com" value={form.email} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input className="form-input" type="text" name="subject" placeholder="Web App Development Project" value={form.subject} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea className="form-textarea" name="message" placeholder="Tell us about your project, goals, and timeline..." value={form.message} onChange={handleChange} required />
          </div>

          <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Sending...' : 'Send Message →'}
          </button>

          {status === 'success' && (
            <div className="success-msg">✅ Message sent successfully! We'll get back to you within 24 hours.</div>
          )}
          {status === 'error' && (
            <div className="error-msg">❌ Something went wrong. Please try again or email us directly.</div>
          )}
        </div>
      </div>

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

export default Contact;