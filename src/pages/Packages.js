import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet-async";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_kporv3e";
const EMAILJS_TEMPLATE_ID = "template_gxllwch";
const EMAILJS_PUBLIC_KEY = "1ya1P7Zs3dwMpoZ8k";

const categories = [
  {
    id: "website",
    label: "Website + CMS",
    icon: "🌐",
    desc: "Professional business websites with a built-in Content Management System.",
    packages: [
      {
        name: "Basic",
        price: "PHP 80,000",
        timeline: "3–4 weeks",
        desc: "Perfect for small businesses looking to establish their online presence.",
        color: "#3b82f6",
        features: [
          "Responsive website design",
          "Up to 5 standard pages",
          "Basic CMS admin panel",
          "Page content management",
          "Image/banner management",
          "Contact form integration",
          "Mobile and tablet compatibility",
          "Basic SEO setup",
          "Testing and deployment",
          "Administrator orientation/training",
        ],
      },
      {
        name: "Standard",
        price: "PHP 150,000",
        timeline: "6–8 weeks",
        desc: "Ideal for growing businesses that need more features and flexibility.",
        color: "#06b6d4",
        popular: true,
        features: [
          "Custom responsive website design",
          "Up to 10 website pages",
          "Advanced CMS dashboard",
          "Page content management",
          "News/Blog management module",
          "Media library management",
          "Banner and slider management",
          "Contact inquiry management",
          "User/admin account management",
          "SEO-friendly structure and configuration",
          "Database setup and security configuration",
          "Testing, deployment, and project turnover",
          "Administrator training and documentation",
        ],
      },
      {
        name: "Premium",
        price: "PHP 280,000",
        timeline: "10–14 weeks",
        desc: "Enterprise-level solution for businesses that demand the best.",
        color: "#8b5cf6",
        features: [
          "Premium custom UI/UX design",
          "Unlimited standard website pages",
          "Enterprise-level CMS dashboard",
          "Multi-user role and permission management",
          "Advanced blog/news management",
          "Document and file repository",
          "Analytics and reporting dashboard",
          "Event and announcement management",
          "Dynamic forms and inquiry workflows",
          "Social media and API integrations",
          "Enhanced SEO optimization",
          "Advanced security implementation",
          "Performance optimization",
          "Priority technical support",
          "Deployment, turnover, and administrator training",
        ],
      },
    ],
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    icon: "🛒",
    desc: "Online store solutions with local payment integrations for the Philippine market.",
    packages: [
      {
        name: "Basic",
        price: "PHP 120,000",
        timeline: "5–6 weeks",
        desc: "Great for small businesses starting their online selling journey.",
        color: "#3b82f6",
        features: [
          "Responsive online store design",
          "Up to 50 product listings",
          "Product category management",
          "Basic inventory tracking",
          "GCash & bank transfer payment",
          "Order management dashboard",
          "Customer inquiry form",
          "Mobile-friendly storefront",
          "Basic SEO setup",
          "Testing, deployment & training",
        ],
      },
      {
        name: "Standard",
        price: "PHP 220,000",
        timeline: "8–10 weeks",
        desc: "Full-featured store for growing online businesses with higher volume.",
        color: "#06b6d4",
        popular: true,
        features: [
          "Custom responsive store design",
          "Unlimited product listings",
          "Advanced inventory management",
          "GCash, Maya & bank transfer integration",
          "Shopping cart & checkout system",
          "Discount & promo code management",
          "Order tracking & status updates",
          "Customer account & order history",
          "Product reviews & ratings",
          "Sales reporting & analytics",
          "Email notifications (order/shipping)",
          "SEO-friendly product pages",
          "Testing, deployment & admin training",
        ],
      },
      {
        name: "Premium",
        price: "PHP 380,000",
        timeline: "12–16 weeks",
        desc: "Enterprise e-commerce with advanced features for high-volume sellers.",
        color: "#8b5cf6",
        features: [
          "Premium custom UI/UX design",
          "Unlimited products & variants",
          "Multi-category & multi-brand support",
          "GCash, Maya, credit/debit card integration",
          "Advanced inventory with low-stock alerts",
          "Loyalty points & rewards system",
          "Flash sale & bulk discount engine",
          "Abandoned cart recovery",
          "Multi-admin & staff role management",
          "Advanced sales & customer analytics",
          "SMS & email notification system",
          "Social media & marketplace sync",
          "Performance & security optimization",
          "Priority technical support",
          "Full deployment, turnover & training",
        ],
      },
    ],
  },
  {
    id: "booking",
    label: "Booking System",
    icon: "📅",
    desc: "Online appointment and scheduling systems for clinics, salons, and service businesses.",
    packages: [
      {
        name: "Basic",
        price: "PHP 70,000",
        timeline: "3–4 weeks",
        desc: "Simple appointment booking for small service businesses and freelancers.",
        color: "#3b82f6",
        features: [
          "Online booking form",
          "Up to 3 services/staff",
          "Calendar availability view",
          "Email confirmation to client",
          "Admin appointment dashboard",
          "Manual booking management",
          "Mobile-friendly interface",
          "Basic client records",
          "Testing, deployment & training",
        ],
      },
      {
        name: "Standard",
        price: "PHP 130,000",
        timeline: "5–6 weeks",
        desc: "Ideal for salons, clinics, and tutorial centers managing multiple staff.",
        color: "#06b6d4",
        popular: true,
        features: [
          "Custom booking page design",
          "Unlimited services & staff management",
          "Real-time availability calendar",
          "Automated email & SMS confirmation",
          "Appointment rescheduling & cancellation",
          "Client profile & history records",
          "Admin booking & schedule dashboard",
          "Walk-in & online booking support",
          "Daily/weekly schedule view",
          "Basic reports & analytics",
          "Testing, deployment & admin training",
        ],
      },
      {
        name: "Premium",
        price: "PHP 220,000",
        timeline: "8–10 weeks",
        desc: "Full-featured system for multi-branch businesses and high-volume service providers.",
        color: "#8b5cf6",
        features: [
          "Premium custom UI/UX design",
          "Multi-branch & location management",
          "Staff schedule & shift management",
          "Online payment & deposit collection",
          "Automated SMS & email reminders",
          "Waitlist & queue management",
          "Loyalty & repeat client tracking",
          "Promo & package deal management",
          "Advanced analytics & booking reports",
          "Customer satisfaction follow-up",
          "Multi-admin role management",
          "API integrations (Google Calendar, etc.)",
          "Performance & security optimization",
          "Priority support & full training",
        ],
      },
    ],
  },
  {
    id: "school",
    label: "School Management",
    icon: "🏫",
    desc: "Complete school management systems for private schools and learning centers.",
    packages: [
      {
        name: "Basic",
        price: "PHP 180,000",
        timeline: "6–8 weeks",
        desc: "Essential digital tools for small schools and tutorial centers.",
        color: "#3b82f6",
        features: [
          "Student enrollment & records",
          "Basic grading & grade entry",
          "Section & subject assignment",
          "Teacher account management",
          "Tuition fee recording",
          "Basic student report generation",
          "Admin dashboard",
          "School year & semester setup",
          "Testing, deployment & training",
        ],
      },
      {
        name: "Standard",
        price: "PHP 350,000",
        timeline: "12–16 weeks",
        desc: "Full school system for private schools managing enrollment to graduation.",
        color: "#06b6d4",
        popular: true,
        features: [
          "Complete student enrollment system",
          "Grading system with report card generation",
          "Subject, section & curriculum management",
          "Teacher & staff account management",
          "Tuition fee billing & payment tracking",
          "Student attendance monitoring",
          "Parent/guardian portal",
          "School ID & certificate generation",
          "Announcements & bulletin board",
          "Academic calendar management",
          "Basic payroll summary",
          "Reports & analytics dashboard",
          "Testing, deployment & admin training",
        ],
      },
      {
        name: "Premium",
        price: "PHP 550,000",
        timeline: "18–24 weeks",
        desc: "Enterprise-grade system for multi-campus schools with full automation.",
        color: "#8b5cf6",
        features: [
          "Multi-campus & multi-level management",
          "Advanced enrollment & admission workflow",
          "Full grading, GWA & honor roll computation",
          "Automated report card & TOR generation",
          "Complete tuition billing & online payment",
          "Student attendance with QR/RFID option",
          "Advanced parent & student portal",
          "HR & payroll management",
          "Library management system",
          "School bus & transport tracking",
          "Online examination module",
          "Advanced analytics & CHED/DepEd reports",
          "API integrations & data migration",
          "Security, backup & performance optimization",
          "Priority support & full documentation",
        ],
      },
    ],
  },
  {
    id: "pos",
    label: "Inventory & POS",
    icon: "📦",
    desc: "Point-of-sale and inventory management systems for retail and food businesses.",
    packages: [
      {
        name: "Basic",
        price: "PHP 90,000",
        timeline: "4–5 weeks",
        desc: "Simple POS and inventory tracking for small retailers and food stalls.",
        color: "#3b82f6",
        features: [
          "Point-of-sale interface",
          "Product & category management",
          "Basic inventory tracking",
          "Sales transaction recording",
          "Daily sales summary report",
          "Cash & GCash payment support",
          "Receipt generation",
          "Single-branch setup",
          "Admin dashboard",
          "Testing, deployment & training",
        ],
      },
      {
        name: "Standard",
        price: "PHP 180,000",
        timeline: "7–9 weeks",
        desc: "Full POS system for growing retail stores, restos, and small chains.",
        color: "#06b6d4",
        popular: true,
        features: [
          "Custom POS interface design",
          "Full inventory management",
          "Low-stock alerts & reorder tracking",
          "Supplier & purchase order management",
          "Multiple payment methods (cash, GCash, card)",
          "Barcode/QR scanning support",
          "Staff & cashier account management",
          "Discount & promo management",
          "Sales, inventory & expense reports",
          "Shift & end-of-day report",
          "Customer records & purchase history",
          "Testing, deployment & admin training",
        ],
      },
      {
        name: "Premium",
        price: "PHP 300,000",
        timeline: "10–14 weeks",
        desc: "Enterprise POS for multi-branch businesses with advanced analytics.",
        color: "#8b5cf6",
        features: [
          "Premium custom POS & dashboard design",
          "Multi-branch inventory management",
          "Inter-branch stock transfer",
          "Advanced supplier & procurement management",
          "GCash, Maya, credit/debit card integration",
          "Loyalty & rewards program",
          "Franchise & multi-location reporting",
          "Advanced sales analytics & forecasting",
          "Wastage & loss tracking",
          "Custom report generation",
          "Multi-admin & role permission management",
          "Data backup & cloud sync",
          "Performance & security optimization",
          "Priority support & full documentation",
        ],
      },
    ],
  },
];

function Packages() {
  const [activeCategory, setActiveCategory] = useState("website");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const currentCategory = categories.find((c) => c.id === activeCategory);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setStatus("missing");
      return;
    }
    setLoading(true);
    setStatus("");

    const time = new Date().toLocaleString("en-PH", {
      timeZone: "Asia/Manila",
      dateStyle: "medium",
      timeStyle: "short",
    });

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          title: `Package Inquiry: ${selectedCategoryLabel} – ${selectedPackage} Package`,
          message: `Company: ${form.company || "N/A"}\n\n${form.message}`,
          time,
        },
        EMAILJS_PUBLIC_KEY,
      );
    } catch (err) {
      setStatus("error");
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "package_inquiries"), {
        ...form,
        category: selectedCategoryLabel,
        package: selectedPackage,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.warn("Firestore error:", err);
    }

    setStatus("success");
    setForm({ name: "", email: "", company: "", message: "" });
    setLoading(false);
  };

  return (
    <div
      style={{
        background: "#040610",
        minHeight: "100vh",
        color: "#fff",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          --bg: #040610;
          --bg2: #070b1a;
          --border: rgba(255,255,255,0.07);
          --muted: rgba(255,255,255,0.45);
        }

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
        @keyframes modalBackdropIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes successSlide {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tabFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .page-hero {
          padding: 160px 40px 60px;
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
          text-align: center;
        }
        .page-hero-glow {
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%);
          top: 0; left: 50%;
          transform: translateX(-50%);
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
          margin: 0 auto;
          line-height: 1.8;
          font-weight: 400;
          animation: fadeUp 0.65s ease 0.15s both;
        }

        /* CATEGORY TABS */
        .tabs-wrap {
          padding: 40px 40px 0;
          max-width: 1280px;
          margin: 0 auto;
        }
        .tabs-scroll {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 2px;
          scrollbar-width: none;
        }
        .tabs-scroll::-webkit-scrollbar { display: none; }
        .tab-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 22px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.025);
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .tab-btn:hover {
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.8);
          border-color: rgba(255,255,255,0.12);
        }
        .tab-btn.active {
          background: linear-gradient(135deg, rgba(37,99,235,0.2), rgba(6,182,212,0.15));
          border-color: rgba(37,99,235,0.4);
          color: #fff;
        }
        .tab-icon { font-size: 16px; }
        .tab-category-desc {
          margin-top: 20px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          color: var(--muted);
          line-height: 1.6;
        }

        /* PACKAGES GRID */
        .packages-section {
          padding: 40px 40px 80px;
          max-width: 1280px;
          margin: 0 auto;
        }
        .packages-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: start;
          animation: tabFadeIn 0.35s ease both;
        }
        .pkg-card {
          padding: 40px 36px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          transition: all 0.35s ease;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .pkg-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--pkg-color);
          opacity: 0.7;
          transition: opacity 0.3s;
        }
        .pkg-card:hover {
          transform: translateY(-8px);
          border-color: rgba(255,255,255,0.12);
          box-shadow: 0 24px 48px rgba(0,0,0,0.3);
        }
        .pkg-card:hover::before { opacity: 1; }
        .pkg-card.popular {
          border-color: rgba(6,182,212,0.3);
          background: rgba(6,182,212,0.05);
          transform: translateY(-8px);
          box-shadow: 0 24px 48px rgba(0,0,0,0.3);
        }
        .popular-badge {
          position: absolute;
          top: 20px; right: 20px;
          padding: 4px 12px;
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          border-radius: 100px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: #fff;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .pkg-name {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .pkg-price {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(28px, 3vw, 40px);
          font-weight: 900;
          letter-spacing: -0.03em;
          color: #fff;
          line-height: 1;
          margin-bottom: 6px;
        }
        .pkg-timeline {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .pkg-desc {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          color: var(--muted);
          line-height: 1.6;
          font-weight: 400;
        }
        .pkg-divider { height: 1px; background: var(--border); }
        .pkg-features { display: flex; flex-direction: column; gap: 10px; flex: 1; }
        .pkg-feature {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.7);
          line-height: 1.5;
        }
        .pkg-check {
          width: 18px; height: 18px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; flex-shrink: 0; margin-top: 1px;
        }
        .pkg-btn {
          width: 100%; padding: 14px;
          border: none; border-radius: 12px;
          font-family: 'Outfit', sans-serif;
          font-weight: 700; font-size: 15px; color: #fff;
          cursor: pointer; transition: all 0.3s ease;
          position: relative; overflow: hidden;
        }
        .pkg-btn::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(rgba(255,255,255,0.12), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .pkg-btn:hover::before { opacity: 1; }
        .pkg-btn:hover { transform: translateY(-2px); }

        /* NOTES */
        .notes-section { padding: 0 40px 80px; max-width: 1280px; margin: 0 auto; }
        .notes-card {
          padding: 32px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          border-radius: 16px;
        }
        .notes-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; color: #60a5fa;
          letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 16px;
        }
        .notes-list { display: flex; flex-direction: column; gap: 10px; }
        .notes-item {
          display: flex; align-items: flex-start; gap: 10px;
          font-family: 'Outfit', sans-serif; font-size: 14px;
          color: var(--muted); line-height: 1.6;
        }
        .notes-dot {
          width: 6px; height: 6px; background: #60a5fa;
          border-radius: 50%; flex-shrink: 0; margin-top: 7px;
        }

        /* MODAL */
        .modal-backdrop {
          position: fixed; inset: 0;
          background: rgba(4,6,16,0.9); backdrop-filter: blur(12px);
          z-index: 2000; display: flex; align-items: center; justify-content: center;
          padding: 24px; animation: modalBackdropIn 0.3s ease both;
        }
        .modal-box {
          background: #070b1a; border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px; width: 100%; max-width: 560px; max-height: 90vh;
          overflow-y: auto; animation: modalSlideUp 0.4s cubic-bezier(0.4,0,0.2,1) both;
          box-shadow: 0 40px 80px rgba(0,0,0,0.5); position: relative;
          scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.07) transparent;
        }
        .modal-box::-webkit-scrollbar { width: 4px; }
        .modal-box::-webkit-scrollbar-track { background: transparent; }
        .modal-box::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 2px; }
        .modal-box::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(37,99,235,0.5), rgba(6,182,212,0.5), transparent);
        }
        .modal-header {
          padding: 28px 32px 20px; border-bottom: 1px solid rgba(255,255,255,0.07);
          display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;
        }
        .modal-title {
          font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 800;
          color: #fff; letter-spacing: -0.02em;
        }
        .modal-subtitle {
          font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #60a5fa;
          letter-spacing: 0.1em; text-transform: uppercase; margin-top: 4px; line-height: 1.6;
        }
        .modal-payment-note {
          font-family: 'Outfit', sans-serif; font-size: 12px;
          color: rgba(255,255,255,0.35); margin-top: 6px;
          display: flex; align-items: center; gap: 5px;
        }
        .modal-close {
          width: 34px; height: 34px; border-radius: 8px;
          background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.45); font-size: 16px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s ease; flex-shrink: 0;
        }
        .modal-close:hover { background: rgba(239,68,68,0.08); border-color: rgba(239,68,68,0.25); color: #f87171; }
        .modal-body { padding: 28px 32px 32px; }
        .form-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
        .form-group label {
          font-family: 'JetBrains Mono', monospace; font-size: 11px;
          color: rgba(255,255,255,0.5); letter-spacing: 0.1em; text-transform: uppercase;
        }
        .form-input {
          padding: 14px 16px; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 10px;
          font-family: 'Outfit', sans-serif; font-size: 15px; color: #fff;
          outline: none; transition: all 0.25s ease; width: 100%;
        }
        .form-input::placeholder { color: rgba(255,255,255,0.25); }
        .form-input:focus { border-color: rgba(37,99,235,0.5); background: rgba(37,99,235,0.06); }
        .form-textarea {
          padding: 14px 16px; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 10px;
          font-family: 'Outfit', sans-serif; font-size: 15px; color: #fff;
          outline: none; transition: all 0.25s ease; width: 100%;
          resize: vertical; min-height: 120px;
        }
        .form-textarea::placeholder { color: rgba(255,255,255,0.25); }
        .form-textarea:focus { border-color: rgba(37,99,235,0.5); background: rgba(37,99,235,0.06); }
        .btn-submit {
          width: 100%; padding: 16px;
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          border: none; border-radius: 12px;
          font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 16px; color: #fff;
          cursor: pointer; box-shadow: 0 8px 32px rgba(37,99,235,0.35);
          transition: all 0.3s ease; margin-top: 8px;
        }
        .btn-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 48px rgba(37,99,235,0.55); }
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .success-msg {
          padding: 16px 20px; background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.25); border-radius: 12px;
          font-family: 'Outfit', sans-serif; font-size: 14px; color: #4ade80;
          margin-top: 16px; text-align: center; animation: successSlide 0.4s ease both;
        }
        .error-msg {
          padding: 16px 20px; background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25); border-radius: 12px;
          font-family: 'Outfit', sans-serif; font-size: 14px; color: #f87171;
          margin-top: 16px; text-align: center; animation: successSlide 0.4s ease both;
        }
        .missing-msg {
          padding: 16px 20px; background: rgba(234,179,8,0.1);
          border: 1px solid rgba(234,179,8,0.25); border-radius: 12px;
          font-family: 'Outfit', sans-serif; font-size: 14px; color: #fbbf24;
          margin-top: 16px; text-align: center; animation: successSlide 0.4s ease both;
        }

        /* FOOTER */
        .footer {
          padding: 32px 40px; border-top: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px; max-width: 1280px; margin: 0 auto;
        }
        .footer-brand { font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.5); }
        .footer-right { font-family: 'Outfit', sans-serif; font-size: 13px; color: var(--muted); }
        .footer-right a { color: #60a5fa; text-decoration: none; }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .packages-grid { grid-template-columns: repeat(2, 1fr); }
          .pkg-card.popular { transform: none; }
        }
        @media (max-width: 768px) {
          .page-hero { padding: 120px 20px 60px; }
          .tabs-wrap { padding: 24px 20px 0; }
          .packages-section { padding: 32px 20px 60px; }
          .packages-grid { grid-template-columns: 1fr; }
          .notes-section { padding: 0 20px 60px; }
          .footer { padding: 24px 20px; justify-content: center; text-align: center; }
          .modal-backdrop { padding: 16px; }
          .modal-header { padding: 20px 20px 16px; }
          .modal-body { padding: 20px; }
        }
      `}</style>

      <Navbar />
      <Helmet>
        <title>Packages | MDS Software Development Services</title>
        <meta
          name="description"
          content="Choose from our Website, E-Commerce, Booking, School, or POS packages. Professional software solutions tailored to your business needs."
        />
        <meta
          property="og:title"
          content="Packages | MDS Software Development Services"
        />
        <meta
          property="og:url"
          content="https://mdstechservices-ph.online/packages"
        />
      </Helmet>

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero-glow" />
        <span className="section-tag">// pricing & packages</span>
        <h1 className="page-title">
          Solutions for Every
          <br />
          <span>Business Need</span>
        </h1>
        <p className="page-desc">
          From simple websites to full enterprise systems — choose the product
          and tier that fits your business perfectly.
        </p>
      </section>

      {/* CATEGORY TABS */}
      <div className="tabs-wrap">
        <div className="tabs-scroll">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`tab-btn ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className="tab-icon">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
        <p className="tab-category-desc">{currentCategory.desc}</p>
      </div>

      {/* PACKAGES GRID */}
      <div className="packages-section">
        <div className="packages-grid" key={activeCategory}>
          {currentCategory.packages.map((pkg, i) => (
            <div
              className={`pkg-card ${pkg.popular ? "popular" : ""}`}
              key={i}
              style={{ "--pkg-color": pkg.color }}
            >
              {pkg.popular && <div className="popular-badge">Most Popular</div>}
              <div>
                <div className="pkg-name" style={{ color: pkg.color }}>
                  {pkg.name} Package
                </div>
                <div className="pkg-price">{pkg.price}</div>
                <div className="pkg-timeline" style={{ color: pkg.color }}>
                  <span>⏱</span>
                  <span>Est. {pkg.timeline}</span>
                </div>
                <div className="pkg-desc">{pkg.desc}</div>
              </div>
              <div className="pkg-divider" />
              <div className="pkg-features">
                {pkg.features.map((f, j) => (
                  <div className="pkg-feature" key={j}>
                    <div
                      className="pkg-check"
                      style={{ background: `${pkg.color}22`, color: pkg.color }}
                    >
                      ✓
                    </div>
                    {f}
                  </div>
                ))}
              </div>
              <button
                className="pkg-btn"
                style={{
                  background: `linear-gradient(135deg, ${pkg.color}, ${pkg.color}bb)`,
                  boxShadow: `0 8px 24px ${pkg.color}44`,
                }}
                onClick={() => {
                  setSelectedPackage(pkg.name);
                  setSelectedCategoryLabel(currentCategory.label);
                  setStatus("");
                  setForm({ name: "", email: "", company: "", message: "" });
                }}
              >
                Get Started →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* NOTES */}
      <div className="notes-section">
        <div className="notes-card">
          <div className="notes-title">// important notes</div>
          <div className="notes-list">
            {[
              "Domain registration and web hosting fees are excluded from the package rates and shall be paid directly by the client.",
              "Additional modules, custom integrations, and specialized business workflows may require separate costing.",
              "Timeline and final pricing may vary depending on revisions, content preparation, and additional feature requests.",
              "Source code and project files shall be turned over upon full project completion and payment.",
              "50% downpayment is required upon project start. The remaining 50% is due upon project completion and turnover.",
            ].map((note, i) => (
              <div className="notes-item" key={i}>
                <div className="notes-dot" />
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer
        style={{
          background: "#040610",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="footer">
          <div className="footer-brand">MDS Software Development Services</div>
          <div className="footer-right">
            📧{" "}
            <a href="mailto:mdstechservices.info@gmail.com">
              mdstechservices.info@gmail.com
            </a>{" "}
            · © 2025 All rights reserved.
          </div>
        </div>
      </footer>

      {/* INQUIRY MODAL */}
      {selectedPackage && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedPackage(null)}
        >
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-title">
                  {selectedPackage} Package Inquiry
                </div>
                <div className="modal-subtitle">
                  {selectedCategoryLabel} · We'll get back to you within 24
                  hours
                </div>
                <div className="modal-payment-note">
                  💳 We accept GCash, bank transfer, and check payments
                </div>
              </div>
              <button
                className="modal-close"
                onClick={() => setSelectedPackage(null)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Your Name</label>
                <input
                  className="form-input"
                  type="text"
                  name="name"
                  placeholder="Juan dela Cruz"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  placeholder="juan@email.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Company Name (Optional)</label>
                <input
                  className="form-input"
                  type="text"
                  name="company"
                  placeholder="Your Company"
                  value={form.company}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  className="form-textarea"
                  name="message"
                  placeholder="Tell us about your project and requirements..."
                  value={form.message}
                  onChange={handleChange}
                />
              </div>
              <button
                className="btn-submit"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading
                  ? "Sending..."
                  : `Inquire About ${selectedPackage} Package →`}
              </button>
              {status === "success" && (
                <div className="success-msg">
                  ✅ Inquiry sent! We'll contact you within 24 hours.
                </div>
              )}
              {status === "error" && (
                <div className="error-msg">
                  ❌ Something went wrong. Please try again.
                </div>
              )}
              {status === "missing" && (
                <div className="missing-msg">
                  ⚠️ Please fill in your name, email and message.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Packages;
