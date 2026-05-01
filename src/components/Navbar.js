import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  const links = ['Home', 'About', 'Services', 'Projects', 'Packages'];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');

        /* NAVBAR ENTRANCE ANIMATION */
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

        .nav-wrap {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          padding: 0 40px;
          background: ${scrolled ? 'rgba(4,6,16,0.97)' : 'rgba(4,6,16,0.5)'};
          backdrop-filter: blur(24px);
          border-bottom: 1px solid ${scrolled ? 'rgba(255,255,255,0.07)' : 'transparent'};
          transition: all 0.4s ease;
          animation: navSlideDown 0.6s cubic-bezier(0.4,0,0.2,1) both;
        }
        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-brand {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 4px;
          animation: navLinkFadeIn 0.6s ease 0.1s both;
        }
        .brand-mds {
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          font-size: 38px;
          letter-spacing: -0.04em;
          background: linear-gradient(135deg, #2563eb 0%, #06b6d4 60%, #22d3ee 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          filter: drop-shadow(0 0 12px rgba(37,99,235,0.5));
          animation: brandGlow 4s ease-in-out infinite;
          transition: filter 0.3s ease;
        }
        .nav-brand:hover .brand-mds {
          filter: drop-shadow(0 0 20px rgba(6,182,212,0.7));
        }
        .brand-divider {
          width: 1px;
          height: 36px;
          background: linear-gradient(to bottom, transparent, rgba(37,99,235,0.4), transparent);
        }
        .brand-text-group {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }
        .brand-text-top {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 16px;
          color: rgba(255,255,255,0.9);
          letter-spacing: -0.01em;
        }
        .brand-text-bottom {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: rgba(6,182,212,0.7);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
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
        .nav-links a {
          padding: 9px 20px;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.2s ease;
          position: relative;
        }
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 50%; right: 50%;
          height: 1px;
          background: linear-gradient(90deg, #2563eb, #06b6d4);
          transition: left 0.3s ease, right 0.3s ease;
          border-radius: 1px;
        }
        .nav-links a:hover::after, .nav-links a.active::after {
          left: 20px; right: 20px;
        }
        .nav-links a:hover { color: #fff; background: rgba(255,255,255,0.06); }
        .nav-links a.active { color: #fff; }
        .nav-cta {
          padding: 12px 28px;
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          border-radius: 10px;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          text-decoration: none;
          margin-left: 16px;
          box-shadow: 0 0 24px rgba(37,99,235,0.3);
          transition: all 0.3s ease;
          animation: navLinkFadeIn 0.6s ease 0.6s both;
          position: relative;
          overflow: hidden;
        }
        .nav-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .nav-cta:hover::before { opacity: 1; }
        .nav-cta:hover { box-shadow: 0 0 40px rgba(37,99,235,0.6); transform: translateY(-1px); }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          animation: navLinkFadeIn 0.6s ease 0.3s both;
        }
        .hamburger span {
          display: block;
          width: 24px; height: 2px;
          background: rgba(255,255,255,0.8);
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .mobile-nav {
          display: none;
          flex-direction: column;
          padding: 12px 0 20px;
          border-top: 1px solid rgba(255,255,255,0.06);
          gap: 2px;
        }
        .mobile-nav.open {
          display: flex;
          animation: mobileNavSlide 0.25s ease both;
        }
        .mobile-nav a {
          padding: 12px 16px;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.2s ease;
        }
        .mobile-nav a:hover { background: rgba(255,255,255,0.06); color: #fff; }

        @media (max-width: 768px) {
          .nav-wrap { padding: 0 20px; }
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
          .brand-mds { font-size: 26px; }
          .brand-divider { display: block; }
          .brand-text-group { display: flex; }
          .brand-text-top { font-size: 11px; }
          .brand-text-bottom { font-size: 8px; }
        }

        @media (max-width: 480px) {
          .nav-wrap { padding: 0 16px; }
          .brand-mds { font-size: 22px; }
          .brand-text-top { font-size: 10px; }
        }
      `}</style>

      <nav className="nav-wrap">
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
            {links.map(link => (
              <li key={link}>
                <Link
                  to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                  className={location.pathname === (link === 'Home' ? '/' : `/${link.toLowerCase()}`) ? 'active' : ''}
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>

          <Link to="/contact" className="nav-cta">Contact Us</Link>

          <button className={`hamburger ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
            <span /><span /><span />
          </button>
        </div>

        <div className={`mobile-nav ${isOpen ? 'open' : ''}`}>
          {[...links, 'Contact'].map(link => (
            <Link key={link} to={link === 'Home' ? '/' : `/${link.toLowerCase()}`} onClick={() => setIsOpen(false)}>
              {link}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}

export default Navbar;