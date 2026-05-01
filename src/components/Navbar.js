import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  const links = ['Home', 'About', 'Services', 'Projects', 'Packages'];

  const getPath = (link) => link === 'Home' ? '/' : `/${link.toLowerCase()}`;
  const isActive = (link) => location.pathname === getPath(link);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');

        @keyframes navSlideDown {
          from { opacity: 0; transform: translateY(-100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes navLinkFadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes brandGlow {
          0%, 100% { filter: drop-shadow(0 0 12px rgba(37,99,235,0.5)); }
          50% { filter: drop-shadow(0 0 22px rgba(6,182,212,0.8)); }
        }
        @keyframes mobileNavSlide {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── NAV WRAP ── */
        .nav-wrap {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          padding: 0 40px;
          background: ${scrolled ? 'rgba(4,6,16,0.97)' : 'rgba(4,6,16,0.4)'};
          backdrop-filter: ${scrolled ? 'blur(32px) saturate(1.8)' : 'blur(12px)'};
          -webkit-backdrop-filter: ${scrolled ? 'blur(32px) saturate(1.8)' : 'blur(12px)'};
          border-bottom: 1px solid ${scrolled ? 'rgba(255,255,255,0.07)' : 'transparent'};
          box-shadow: ${scrolled ? '0 4px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(37,99,235,0.08)' : 'none'};
          transition: background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
          animation: navSlideDown 0.6s cubic-bezier(0.4,0,0.2,1) both;
        }

        /* ── NAV INNER (shrinks height on scroll) ── */
        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          height: ${scrolled ? '62px' : '88px'};
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: height 0.4s cubic-bezier(0.4,0,0.2,1);
        }

        /* ── BRAND ── */
        .nav-brand {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
          animation: navLinkFadeIn 0.6s ease 0.1s both;
        }
        .brand-mds {
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          font-size: ${scrolled ? '28px' : '36px'};
          letter-spacing: -0.04em;
          background: linear-gradient(135deg, #2563eb 0%, #06b6d4 60%, #22d3ee 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          filter: drop-shadow(0 0 12px rgba(37,99,235,0.5));
          animation: brandGlow 4s ease-in-out infinite;
          transition: font-size 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-brand:hover .brand-mds {
          filter: drop-shadow(0 0 20px rgba(6,182,212,0.7));
        }
        .brand-divider {
          width: 1px;
          height: ${scrolled ? '24px' : '34px'};
          background: linear-gradient(to bottom, transparent, rgba(37,99,235,0.4), transparent);
          transition: height 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .brand-text-group {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
          overflow: hidden;
        }
        .brand-text-top {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: ${scrolled ? '13px' : '15px'};
          color: rgba(255,255,255,0.9);
          letter-spacing: -0.01em;
          transition: font-size 0.4s ease;
        }
        /* Hide subtitle when scrolled */
        .brand-text-bottom {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: rgba(6,182,212,0.7);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          max-height: ${scrolled ? '0px' : '20px'};
          opacity: ${scrolled ? '0' : '1'};
          overflow: hidden;
          transition: max-height 0.35s ease, opacity 0.25s ease;
        }

        /* ── NAV LINKS ── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0; padding: 0;
        }
        .nav-links li:nth-child(1) { animation: navLinkFadeIn 0.6s ease 0.2s both; }
        .nav-links li:nth-child(2) { animation: navLinkFadeIn 0.6s ease 0.3s both; }
        .nav-links li:nth-child(3) { animation: navLinkFadeIn 0.6s ease 0.4s both; }
        .nav-links li:nth-child(4) { animation: navLinkFadeIn 0.6s ease 0.5s both; }
        .nav-links li:nth-child(5) { animation: navLinkFadeIn 0.6s ease 0.6s both; }
        .nav-links a {
          padding: 8px 18px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.2s ease;
          position: relative;
          letter-spacing: -0.01em;
        }
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: 3px; left: 50%; right: 50%;
          height: 1.5px;
          background: linear-gradient(90deg, #2563eb, #06b6d4);
          transition: left 0.3s ease, right 0.3s ease;
          border-radius: 1px;
        }
        .nav-links a:hover::after,
        .nav-links a.active::after { left: 18px; right: 18px; }
        .nav-links a:hover { color: #fff; background: rgba(255,255,255,0.06); }
        .nav-links a.active { color: #fff; }

        /* ── CTA BUTTON ── */
        .nav-cta {
          padding: ${scrolled ? '9px 22px' : '11px 26px'};
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          border-radius: 10px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          text-decoration: none;
          margin-left: 12px;
          box-shadow: 0 0 24px rgba(37,99,235,0.3);
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          animation: navLinkFadeIn 0.6s ease 0.65s both;
          position: relative;
          overflow: hidden;
          white-space: nowrap;
        }
        .nav-cta::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .nav-cta:hover::before { opacity: 1; }
        .nav-cta:hover {
          box-shadow: 0 0 40px rgba(37,99,235,0.6);
          transform: translateY(-1px);
        }

        /* ── SCROLL PROGRESS BAR ── */
        .nav-progress {
          position: absolute;
          bottom: -1px; left: 0;
          height: 2px;
          background: linear-gradient(90deg, #2563eb, #06b6d4, #22d3ee);
          width: var(--scroll-progress, 0%);
          opacity: ${scrolled ? '1' : '0'};
          transition: opacity 0.4s ease;
          border-radius: 0 2px 2px 0;
        }

        /* ── HAMBURGER ── */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: background 0.2s ease;
          animation: navLinkFadeIn 0.6s ease 0.3s both;
        }
        .hamburger:hover { background: rgba(255,255,255,0.06); }
        .hamburger span {
          display: block;
          width: 22px; height: 2px;
          background: rgba(255,255,255,0.8);
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── MOBILE NAV ── */
        .mobile-nav {
          display: none;
          flex-direction: column;
          padding: 10px 0 16px;
          border-top: 1px solid rgba(255,255,255,0.06);
          gap: 2px;
        }
        .mobile-nav.open {
          display: flex;
          animation: mobileNavSlide 0.25s ease both;
        }
        .mobile-nav a {
          padding: 11px 14px;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .mobile-nav a:hover {
          background: rgba(255,255,255,0.06);
          color: #fff;
        }
        .mobile-nav a.active {
          background: rgba(37,99,235,0.1);
          color: #60a5fa;
          border: 1px solid rgba(37,99,235,0.2);
        }
        .mobile-nav a.active::after {
          content: '●';
          font-size: 6px;
          color: #06b6d4;
        }
        .mobile-cta {
          margin: 8px 0 0;
          padding: 13px 14px;
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          border-radius: 10px;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #fff !important;
          text-decoration: none;
          text-align: center;
          display: block;
          border: none !important;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
        }
        @media (max-width: 768px) {
          .nav-wrap { padding: 0 20px; }
          .brand-mds { font-size: ${scrolled ? '22px' : '26px'} !important; }
          .brand-text-top { font-size: 11px !important; }
          .brand-text-bottom { display: none; }
        }
        @media (max-width: 480px) {
          .nav-wrap { padding: 0 16px; }
          .brand-mds { font-size: 22px !important; }
          .brand-text-top { font-size: 10px !important; }
        }
      `}</style>

      <ScrollProgress />

      <nav className="nav-wrap">
        <div className="nav-progress" />
        <div className="nav-inner">
          <Link to="/" className="nav-brand">
            <span className="brand-mds">MDS</span>
            <div className="brand-divider" />
            <div className="brand-text-group">
              <span className="brand-text-top">Software Development Services</span>
              <span className="brand-text-bottom">Innovation · Code · Solutions</span>
            </div>
          </Link>

          <ul className="nav-links">
            {links.map((link, i) => (
              <li key={link}>
                <Link
                  to={getPath(link)}
                  className={isActive(link) ? 'active' : ''}
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>

          <Link to="/contact" className="nav-cta">Contact Us</Link>

          <button
            className={`hamburger ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>

        <div className={`mobile-nav ${isOpen ? 'open' : ''}`}>
          {links.map(link => (
            <Link
              key={link}
              to={getPath(link)}
              className={isActive(link) ? 'active' : ''}
              onClick={() => setIsOpen(false)}
            >
              {link}
            </Link>
          ))}
          <Link to="/contact" className="mobile-cta" onClick={() => setIsOpen(false)}>
            Contact Us →
          </Link>
        </div>
      </nav>
    </>
  );
}

/* Scroll progress bar logic — separate component to avoid re-rendering Navbar */
function ScrollProgress() {
  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return null;
}

export default Navbar;