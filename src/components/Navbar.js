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

  const links = ['Home', 'About', 'Services', 'Projects'];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');

        .nav-wrap {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          padding: 0 40px;
          background: ${scrolled ? 'rgba(4,6,16,0.97)' : 'rgba(4,6,16,0.5)'};
          backdrop-filter: blur(24px);
          border-bottom: 1px solid ${scrolled ? 'rgba(255,255,255,0.07)' : 'transparent'};
          transition: all 0.4s ease;
        }
        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-brand {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .brand-mds {
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          font-size: 28px;
          letter-spacing: -0.04em;
          background: linear-gradient(135deg, #2563eb 0%, #06b6d4 60%, #22d3ee 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          filter: drop-shadow(0 0 12px rgba(37,99,235,0.5));
          transition: filter 0.3s ease;
        }
        .nav-brand:hover .brand-mds {
          filter: drop-shadow(0 0 20px rgba(6,182,212,0.7));
        }
        .brand-divider {
          width: 1px;
          height: 28px;
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
          font-size: 13px;
          color: rgba(255,255,255,0.9);
          letter-spacing: -0.01em;
        }
        .brand-text-bottom {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
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
        .nav-links a {
          padding: 8px 18px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        .nav-links a:hover { color: #fff; background: rgba(255,255,255,0.06); }
        .nav-links a.active { color: #fff; }
        .nav-cta {
          padding: 10px 24px;
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          border-radius: 10px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          text-decoration: none;
          margin-left: 16px;
          box-shadow: 0 0 24px rgba(37,99,235,0.3);
          transition: all 0.3s ease;
        }
        .nav-cta:hover { box-shadow: 0 0 40px rgba(37,99,235,0.6); transform: translateY(-1px); }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
        }
        .hamburger span {
          display: block;
          width: 22px; height: 2px;
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
        .mobile-nav.open { display: flex; }
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
          .brand-text-group { display: none; }
          .brand-divider { display: none; }
          .brand-mds { font-size: 24px; }
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