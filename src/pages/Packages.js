import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet-async";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import PageTransition from "../components/PageTransition";

const EMAILJS_SERVICE_ID = "service_kporv3e";
const EMAILJS_TEMPLATE_ID = "template_gxllwch";
const EMAILJS_PUBLIC_KEY = "1ya1P7Zs3dwMpoZ8k";

const categories = [
  // ── 1. WEBSITE SOLUTIONS ──────────────────────────────────────────────────
  {
    id: "website",
    label: "Website Solutions",
    icon: "🌐",
    desc: "Professional business websites with a built-in Content Management System — designed to attract clients and grow your brand online.",
    packages: [
      {
        name: "Starter",
        price: "PHP 80,000",
        timeline: "3–4 weeks",
        desc: "Perfect for small businesses looking to establish a professional online presence.",
        color: "#3b82f6",
        features: [
          "Responsive website design",
          "Up to 5 standard pages",
          "Standard CMS admin panel",
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
        name: "Business Suite",
        price: "PHP 150,000",
        timeline: "6–8 weeks",
        desc: "Ideal for growing businesses that need a custom design with advanced content tools.",
        color: "#06b6d4",
        popular: true,
        features: [
          "Custom responsive UI/UX design",
          "Up to 10 website pages",
          "Advanced CMS dashboard",
          "Blog/news management module",
          "Media library management",
          "Banner and slider management",
          "Contact inquiry management",
          "User/admin account management",
          "Analytics integration",
          "SEO-friendly structure and configuration",
          "Database setup and security configuration",
          "Testing, deployment, and project turnover",
          "Administrator training and documentation",
          "Source code turnover",
        ],
      },
      {
        name: "Enterprise Digital Platform",
        price: "PHP 280,000",
        timeline: "10–14 weeks",
        desc: "Enterprise-level solution for organizations that demand the highest level of functionality and security.",
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
          "Approval workflows",
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

  // ── 2. E-COMMERCE ─────────────────────────────────────────────────────────
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

  // ── 3. BOOKING SYSTEM ─────────────────────────────────────────────────────
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

  // ── 4. BUSINESS SYSTEMS ───────────────────────────────────────────────────
  {
    id: "business",
    label: "Business Systems",
    icon: "🏢",
    desc: "Custom business management and workflow automation systems for growing and enterprise operations.",
    packages: [
      {
        name: "Core Business Suite",
        price: "PHP 350,000",
        timeline: "8–12 weeks",
        desc: "Complete business management system for small-to-medium enterprises streamlining daily operations.",
        color: "#3b82f6",
        features: [
          "Inventory & product management",
          "Transaction recording modules",
          "Reports generation dashboard",
          "Basic analytics & summaries",
          "User & admin management",
          "Role-based access control",
          "Data export & printing",
          "Mobile-responsive interface",
          "Testing, deployment & training",
          "Source code turnover",
        ],
      },
      {
        name: "Operations Suite",
        price: "PHP 750,000",
        timeline: "14–20 weeks",
        desc: "Advanced operations platform for multi-department businesses with automation and branch management.",
        color: "#06b6d4",
        popular: true,
        features: [
          "Full workflow automation",
          "Branch & location management",
          "Advanced inventory & procurement",
          "API integrations (3rd party)",
          "Advanced analytics dashboard",
          "Approval & routing workflows",
          "Staff & HR basic module",
          "Multi-admin role management",
          "Custom report generation",
          "Performance optimization",
          "Priority support & full training",
          "Source code & documentation turnover",
        ],
      },
      {
        name: "Enterprise Automation Platform",
        price: "PHP 1,500,000+",
        timeline: "24+ weeks",
        desc: "Fully centralized enterprise platform for large-scale businesses requiring end-to-end automation.",
        color: "#8b5cf6",
        features: [
          "Centralized operations platform",
          "Executive dashboards & KPIs",
          "Enterprise-grade workflow automation",
          "Scalable cloud-ready architecture",
          "Advanced API & system integrations",
          "Multi-branch & enterprise reporting",
          "Full HR, payroll & compliance modules",
          "Document & records management",
          "Advanced security & audit logs",
          "Data migration & legacy integration",
          "Dedicated project management",
          "Priority SLA support",
          "Full documentation & source code",
        ],
      },
    ],
  },

  // ── 5. SCHOOL MANAGEMENT ──────────────────────────────────────────────────
  {
    id: "school",
    label: "School Management",
    icon: "🏫",
    desc: "Complete school management systems for private schools, universities, and learning centers.",
    packages: [
      {
        name: "Basic School System",
        price: "PHP 280,000",
        timeline: "6–8 weeks",
        desc: "Essential digital tools for small schools, tutorial centers, and learning institutions.",
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
          "Announcements & bulletin board",
          "Testing, deployment & training",
        ],
      },
      {
        name: "Academic Management Suite",
        price: "PHP 650,000",
        timeline: "12–16 weeks",
        desc: "Full school system for private schools managing enrollment, grading, billing, and graduation.",
        color: "#06b6d4",
        popular: true,
        features: [
          "Online enrollment & admission workflow",
          "Complete grading system with report cards",
          "Subject, section & curriculum management",
          "Teacher & staff account management",
          "Tuition fee billing & payment tracking",
          "Student attendance monitoring",
          "Parent/guardian portal",
          "Student portal access",
          "Faculty portal",
          "School ID & certificate generation",
          "Academic calendar management",
          "Basic payroll summary",
          "Reports & analytics dashboard",
          "Testing, deployment & admin training",
        ],
      },
      {
        name: "Integrated Campus Platform",
        price: "PHP 1,200,000+",
        timeline: "18–24 weeks",
        desc: "Enterprise-grade multi-campus platform with full automation for large schools and universities.",
        color: "#8b5cf6",
        features: [
          "Multi-campus & multi-level management",
          "Advanced enrollment & admission workflow",
          "Full grading, GWA & honor roll computation",
          "Automated report card & TOR generation",
          "Complete tuition billing & online payment",
          "RFID/QR-based attendance system",
          "Advanced parent & student portal",
          "LMS (Learning Management System) integration",
          "HR & payroll management",
          "Library management system",
          "School bus & transport tracking",
          "Online examination module",
          "Advanced analytics & CHED/DepEd reports",
          "API integrations & data migration",
          "Priority support & full documentation",
        ],
      },
    ],
  },

  // ── 6. LGU / GOVERNMENT ───────────────────────────────────────────────────
  {
    id: "lgu",
    label: "LGU / Government",
    icon: "🏛️",
    desc: "Digital transformation solutions for local government units, government agencies, and public institutions.",
    packages: [
      {
        name: "LGU Basic Package",
        price: "PHP 250,000",
        timeline: "6–8 weeks",
        desc: "Essential digitalization tools to modernize document management and public records.",
        color: "#3b82f6",
        features: [
          "Document tracking system",
          "Records & file management",
          "Request & transaction logging",
          "Admin & staff accounts",
          "Basic reporting dashboard",
          "Citizen inquiry form",
          "Mobile-responsive interface",
          "Data export & printing",
          "Testing, deployment & training",
        ],
      },
      {
        name: "Government Operations Suite",
        price: "PHP 700,000",
        timeline: "12–16 weeks",
        desc: "Full-featured government management system with citizen portal and workflow approvals.",
        color: "#06b6d4",
        popular: true,
        features: [
          "Citizen services portal",
          "Online request & transaction processing",
          "Approval & routing workflow system",
          "Document tracking & management",
          "Permit & clearance management",
          "Multi-department user management",
          "Analytics & operations dashboard",
          "Public announcements & notices",
          "Audit trail & activity logs",
          "Reports & data export",
          "Priority support & admin training",
          "Source code & documentation turnover",
        ],
      },
      {
        name: "Smart LGU Enterprise Platform",
        price: "PHP 1,800,000+",
        timeline: "24+ weeks",
        desc: "Full enterprise smart government platform for cities and municipalities demanding complete digital transformation.",
        color: "#8b5cf6",
        features: [
          "Smart citizen services portal",
          "Enterprise workflow & process automation",
          "Multi-office & department management",
          "Online payment & fee collection",
          "Real-time executive dashboards",
          "GIS & location-based data integration",
          "Advanced document & records management",
          "Automated notifications (SMS & email)",
          "Business permit & licensing system",
          "Health & social services module",
          "Advanced analytics & compliance reports",
          "Integration with national government APIs",
          "Security, audit & DICT compliance",
          "Full training, documentation & support",
        ],
      },
    ],
  },

  // ── 7. SUPPORT PLANS ──────────────────────────────────────────────────────
  {
    id: "support",
    label: "Support Plans",
    icon: "🛠️",
    desc: "Ongoing technical support, maintenance, and monitoring plans to keep your systems running at peak performance.",
    packages: [
      {
        name: "Basic Support",
        price: "PHP 2,500/mo",
        timeline: "Monthly",
        desc: "Essential support coverage for small systems with minor maintenance needs.",
        color: "#3b82f6",
        features: [
          "Minor bug fixes & patches",
          "CMS content assistance",
          "Email-based support",
          "Response within 48–72 hours",
          "Up to 5 support tickets/month",
          "Monthly system check-up",
        ],
      },
      {
        name: "Professional Support",
        price: "PHP 5,000/mo",
        timeline: "Monthly",
        desc: "Priority support for growing businesses needing fast response and proactive maintenance.",
        color: "#06b6d4",
        popular: true,
        features: [
          "Priority technical support",
          "Bug fixes & minor enhancements",
          "Security updates & patches",
          "Performance monitoring",
          "Response within 24 hours",
          "Up to 15 support tickets/month",
          "Monthly maintenance report",
          "CMS & user account assistance",
        ],
      },
      {
        name: "Enterprise SLA Support",
        price: "PHP 12,000/mo",
        timeline: "Monthly",
        desc: "Full-coverage enterprise support with SLA guarantees, monthly maintenance, and dedicated consultations.",
        color: "#8b5cf6",
        features: [
          "Priority SLA response guarantee",
          "Unlimited support tickets",
          "Monthly full system maintenance",
          "Security patching & hardening",
          "Performance optimization checks",
          "Monthly technical consultation",
          "Response within 4–8 hours",
          "Dedicated support contact",
          "Backup verification & monitoring",
          "Monthly detailed report delivery",
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

  // FIX 1: Single consolidated useEffect — removed the duplicate initial observer
  // that used threshold:0.1 with no deps array. This one handles both
  // initial mount and category tab changes correctly.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.05 },
    );
    // Small timeout lets React flush the DOM before we query .reveal elements
    const timeout = setTimeout(() => {
      document
        .querySelectorAll(".reveal")
        .forEach((el) => observer.observe(el));
    }, 50);
    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [activeCategory]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
    <PageTransition>
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
          :root { --bg:#040610; --bg2:#070b1a; --border:rgba(255,255,255,0.07); --muted:rgba(255,255,255,0.45); }
          @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
          @keyframes blink{0%,100%{opacity:1}50%{opacity:0.2}}
          @keyframes glow1Pulse{0%,100%{opacity:.6;transform:translateX(-50%) scale(1)}50%{opacity:1;transform:translateX(-50%) scale(1.08)}}
          @keyframes gradientShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
          @keyframes modalBackdropIn{from{opacity:0}to{opacity:1}}
          @keyframes modalSlideUp{from{opacity:0;transform:translateY(40px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
          @keyframes successSlide{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
          @keyframes tabFadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
          @keyframes inputFocusPulse{0%{box-shadow:0 0 0 0 rgba(37,99,235,.3)}70%{box-shadow:0 0 0 6px rgba(37,99,235,0)}100%{box-shadow:0 0 0 0 rgba(37,99,235,0)}}
          .reveal{opacity:0;transform:translateY(28px);transition:opacity .65s cubic-bezier(.4,0,.2,1),transform .65s cubic-bezier(.4,0,.2,1)}
          .reveal.visible{opacity:1;transform:translateY(0)}
          .reveal-d1{transition-delay:.1s}.reveal-d2{transition-delay:.2s}.reveal-d3{transition-delay:.3s}.reveal-d4{transition-delay:.4s}

          .page-hero{padding:160px 40px 80px;max-width:1280px;margin:0 auto;position:relative;text-align:center}
          .page-hero-glow{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(37,99,235,.1) 0%,transparent 70%);top:0;left:50%;transform:translateX(-50%);pointer-events:none;animation:glow1Pulse 6s ease-in-out infinite}
          .hero-eyebrow{display:inline-flex;align-items:center;gap:8px;padding:5px 14px 5px 10px;background:rgba(37,99,235,.1);border:1px solid rgba(37,99,235,.25);border-radius:100px;font-family:'JetBrains Mono',monospace;font-size:11px;color:#60a5fa;letter-spacing:.08em;text-transform:uppercase;margin-bottom:28px;animation:fadeUp .5s ease both}
          .eyebrow-dot{width:6px;height:6px;background:#60a5fa;border-radius:50%;animation:blink 2s ease infinite}
          .page-title{font-family:'Outfit',sans-serif;font-size:clamp(36px,5vw,64px);font-weight:900;letter-spacing:-.04em;line-height:1.05;margin-bottom:24px;animation:fadeUp .65s ease .1s both}
          .page-title span{background:linear-gradient(135deg,#2563eb,#06b6d4,#22d3ee,#06b6d4,#2563eb);background-size:300%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gradientShift 5s ease infinite}
          .page-desc{font-family:'Outfit',sans-serif;font-size:clamp(15px,1.5vw,18px);color:var(--muted);max-width:600px;margin:0 auto;line-height:1.8;font-weight:400;animation:fadeUp .65s ease .2s both}

          .tabs-wrap{padding:40px 40px 0;max-width:1280px;margin:0 auto}
          .tabs-scroll{display:flex;flex-wrap:wrap;gap:10px;padding-bottom:2px}
          .tab-btn{display:flex;align-items:center;gap:8px;padding:10px 18px;border-radius:12px;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.025);font-family:'Outfit',sans-serif;font-size:13px;font-weight:600;color:rgba(255,255,255,.5);cursor:pointer;transition:all .25s ease;white-space:nowrap;flex-shrink:0;position:relative;overflow:hidden}
          .tab-btn::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(37,99,235,.15),rgba(6,182,212,.1));opacity:0;transition:opacity .25s}
          .tab-btn:hover{color:rgba(255,255,255,.8);border-color:rgba(255,255,255,.12)}
          .tab-btn:hover::before{opacity:1}
          .tab-btn.active{background:linear-gradient(135deg,rgba(37,99,235,.2),rgba(6,182,212,.15));border-color:rgba(37,99,235,.4);color:#fff;box-shadow:0 0 20px rgba(37,99,235,.15)}
          .tab-icon{font-size:16px}
          .tab-category-desc{margin-top:20px;font-family:'Outfit',sans-serif;font-size:14px;color:var(--muted);line-height:1.6}

          .packages-section{padding:40px 40px 80px;max-width:1280px;margin:0 auto}
          .packages-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;align-items:start;animation:tabFadeIn .4s cubic-bezier(.4,0,.2,1) both}
          .pkg-card{padding:40px 36px;background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);border-radius:20px;transition:all .35s cubic-bezier(.4,0,.2,1);position:relative;overflow:hidden;display:flex;flex-direction:column;gap:24px}
          .pkg-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--pkg-color);opacity:.6;transition:opacity .3s,height .3s}
          .pkg-card::after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 0%,var(--pkg-glow,rgba(37,99,235,.08)) 0%,transparent 60%);opacity:0;transition:opacity .4s;pointer-events:none}
          .pkg-card:hover::before{opacity:1;height:4px}
          .pkg-card:hover::after{opacity:1}
          .pkg-card:hover{transform:translateY(-8px);border-color:rgba(255,255,255,.12);box-shadow:0 28px 56px rgba(0,0,0,.35)}

          /* FIX 2: Popular card base lift reduced so hover can still move it further */
          .pkg-card.popular{border-color:rgba(6,182,212,.3);background:rgba(6,182,212,.04);transform:translateY(-4px);box-shadow:0 28px 56px rgba(0,0,0,.35)}
          .pkg-card.popular:hover{transform:translateY(-12px)}

          .popular-badge{position:absolute;top:20px;right:20px;padding:4px 12px;background:linear-gradient(135deg,#2563eb,#06b6d4);border-radius:100px;font-family:'JetBrains Mono',monospace;font-size:10px;color:#fff;letter-spacing:.1em;text-transform:uppercase;box-shadow:0 4px 12px rgba(6,182,212,.3)}
          .pkg-name{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.15em;text-transform:uppercase;margin-bottom:8px}
          .pkg-price{font-family:'Outfit',sans-serif;font-size:clamp(24px,2.5vw,36px);font-weight:900;letter-spacing:-.03em;color:#fff;line-height:1;margin-bottom:6px}
          .pkg-timeline{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.08em;margin-bottom:10px;display:flex;align-items:center;gap:6px}
          .pkg-desc{font-family:'Outfit',sans-serif;font-size:14px;color:var(--muted);line-height:1.6;font-weight:400}
          .pkg-divider{height:1px;background:var(--border)}
          .pkg-features{display:flex;flex-direction:column;gap:10px;flex:1}
          .pkg-feature{display:flex;align-items:flex-start;gap:10px;font-family:'Outfit',sans-serif;font-size:13px;color:rgba(255,255,255,.7);line-height:1.5;transition:color .2s}
          .pkg-feature:hover{color:rgba(255,255,255,.95)}
          .pkg-check{width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0;margin-top:1px;transition:transform .2s}
          .pkg-feature:hover .pkg-check{transform:scale(1.15)}
          .pkg-btn{width:100%;padding:14px;border:none;border-radius:12px;font-family:'Outfit',sans-serif;font-weight:700;font-size:15px;color:#fff;cursor:pointer;transition:all .3s ease;position:relative;overflow:hidden;letter-spacing:-.01em}
          .pkg-btn::before{content:'';position:absolute;inset:0;background:linear-gradient(rgba(255,255,255,.15),transparent);opacity:0;transition:opacity .3s}
          .pkg-btn:hover::before{opacity:1}
          .pkg-btn:hover{transform:translateY(-2px)}

          /* HOSTING CARD */
          .hosting-section{padding:0 40px 60px;max-width:1280px;margin:0 auto}
          .hosting-card{padding:32px 40px;background:linear-gradient(135deg,rgba(37,99,235,.07),rgba(6,182,212,.05));border:1px solid rgba(37,99,235,.2);border-radius:20px;display:flex;align-items:center;gap:32px;flex-wrap:wrap;position:relative;overflow:hidden}
          .hosting-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(37,99,235,.5),rgba(6,182,212,.5),transparent)}
          .hosting-icon{font-size:40px;flex-shrink:0}
          .hosting-content{flex:1}
          .hosting-content h3{font-family:'Outfit',sans-serif;font-size:20px;font-weight:800;color:#fff;letter-spacing:-.02em;margin-bottom:8px}
          .hosting-content p{font-family:'Outfit',sans-serif;font-size:14px;color:var(--muted);line-height:1.7;font-weight:400}
          .hosting-features{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
          .hosting-tag{padding:5px 12px;background:rgba(37,99,235,.1);border:1px solid rgba(37,99,235,.2);border-radius:100px;font-family:'JetBrains Mono',monospace;font-size:11px;color:#60a5fa}
          .hosting-price{text-align:right;flex-shrink:0}
          .hosting-price-label{font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(255,255,255,.4);letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px}
          .hosting-price-value{font-family:'Outfit',sans-serif;font-size:28px;font-weight:900;color:#fff;letter-spacing:-.03em;line-height:1}
          .hosting-price-sub{font-family:'Outfit',sans-serif;font-size:12px;color:var(--muted);margin-top:4px}

          .notes-section{padding:0 40px 80px;max-width:1280px;margin:0 auto}
          .notes-card{padding:32px 40px;background:rgba(255,255,255,.02);border:1px solid var(--border);border-radius:20px;position:relative;overflow:hidden}
          .notes-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(37,99,235,.4),rgba(6,182,212,.4),transparent)}
          .notes-title{font-family:'JetBrains Mono',monospace;font-size:11px;color:#60a5fa;letter-spacing:.15em;text-transform:uppercase;margin-bottom:20px}
          .notes-list{display:flex;flex-direction:column;gap:12px}
          .notes-item{display:flex;align-items:flex-start;gap:12px;font-family:'Outfit',sans-serif;font-size:14px;color:var(--muted);line-height:1.6;padding:12px 16px;border-radius:10px;transition:background .25s,color .25s}
          .notes-item:hover{background:rgba(37,99,235,.05);color:rgba(255,255,255,.7)}
          .notes-dot{width:6px;height:6px;background:#2563eb;border-radius:50%;flex-shrink:0;margin-top:8px;transition:background .25s,box-shadow .25s}
          .notes-item:hover .notes-dot{background:#06b6d4;box-shadow:0 0 6px rgba(6,182,212,.5)}

          .modal-backdrop{position:fixed;inset:0;background:rgba(4,6,16,.9);backdrop-filter:blur(12px);z-index:2000;display:flex;align-items:center;justify-content:center;padding:24px;animation:modalBackdropIn .3s ease both}
          .modal-box{background:#070b1a;border:1px solid rgba(255,255,255,.07);border-radius:20px;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;animation:modalSlideUp .4s cubic-bezier(.4,0,.2,1) both;box-shadow:0 40px 80px rgba(0,0,0,.5);position:relative;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.07) transparent}
          .modal-box::-webkit-scrollbar{width:4px}
          .modal-box::-webkit-scrollbar-track{background:transparent}
          .modal-box::-webkit-scrollbar-thumb{background:rgba(255,255,255,.07);border-radius:2px}
          .modal-box::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(37,99,235,.5),rgba(6,182,212,.5),transparent)}
          .modal-header{padding:28px 32px 20px;border-bottom:1px solid rgba(255,255,255,.07);display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
          .modal-title{font-family:'Outfit',sans-serif;font-size:20px;font-weight:800;color:#fff;letter-spacing:-.02em}
          .modal-subtitle{font-family:'JetBrains Mono',monospace;font-size:10px;color:#60a5fa;letter-spacing:.1em;text-transform:uppercase;margin-top:4px;line-height:1.6}
          .modal-payment-note{font-family:'Outfit',sans-serif;font-size:12px;color:rgba(255,255,255,.35);margin-top:6px;display:flex;align-items:center;gap:5px}
          .modal-close{width:34px;height:34px;border-radius:8px;background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);color:rgba(255,255,255,.45);font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s ease;flex-shrink:0}
          .modal-close:hover{background:rgba(239,68,68,.08);border-color:rgba(239,68,68,.25);color:#f87171}
          .modal-body{padding:28px 32px 32px}
          .form-group{display:flex;flex-direction:column;gap:8px;margin-bottom:16px}
          .form-group label{font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(255,255,255,.5);letter-spacing:.1em;text-transform:uppercase}

          /* FIX 3: box-sizing:border-box prevents width:100% + padding from overflowing the modal */
          .form-input{box-sizing:border-box;padding:14px 16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:10px;font-family:'Outfit',sans-serif;font-size:15px;color:#fff;outline:none;transition:all .25s ease;width:100%}
          .form-input::placeholder{color:rgba(255,255,255,.25)}
          .form-input:focus{border-color:rgba(37,99,235,.5);background:rgba(37,99,235,.06);animation:inputFocusPulse .5s ease}
          .form-textarea{box-sizing:border-box;padding:14px 16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:10px;font-family:'Outfit',sans-serif;font-size:15px;color:#fff;outline:none;transition:all .25s ease;width:100%;resize:vertical;min-height:120px}
          .form-textarea::placeholder{color:rgba(255,255,255,.25)}
          .form-textarea:focus{border-color:rgba(37,99,235,.5);background:rgba(37,99,235,.06);animation:inputFocusPulse .5s ease}

          .btn-submit{width:100%;padding:16px;background:linear-gradient(135deg,#2563eb,#06b6d4);border:none;border-radius:12px;font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;color:#fff;cursor:pointer;box-shadow:0 8px 32px rgba(37,99,235,.35);transition:all .3s ease;margin-top:8px;position:relative;overflow:hidden}
          .btn-submit::before{content:'';position:absolute;inset:0;background:linear-gradient(rgba(255,255,255,.12),transparent);opacity:0;transition:opacity .3s}
          .btn-submit:hover:not(:disabled)::before{opacity:1}
          .btn-submit:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 12px 48px rgba(37,99,235,.55)}
          .btn-submit:disabled{opacity:.6;cursor:not-allowed}
          .success-msg{padding:16px 20px;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.25);border-radius:12px;font-family:'Outfit',sans-serif;font-size:14px;color:#4ade80;margin-top:16px;text-align:center;animation:successSlide .4s ease both}
          .error-msg{padding:16px 20px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);border-radius:12px;font-family:'Outfit',sans-serif;font-size:14px;color:#f87171;margin-top:16px;text-align:center;animation:successSlide .4s ease both}
          .missing-msg{padding:16px 20px;background:rgba(234,179,8,.1);border:1px solid rgba(234,179,8,.25);border-radius:12px;font-family:'Outfit',sans-serif;font-size:14px;color:#fbbf24;margin-top:16px;text-align:center;animation:successSlide .4s ease both}

          .footer{padding:32px 40px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;max-width:1280px;margin:0 auto}
          .footer-brand{font-family:'Outfit',sans-serif;font-size:14px;font-weight:700;color:rgba(255,255,255,.5)}
          .footer-right{font-family:'Outfit',sans-serif;font-size:13px;color:var(--muted)}
          .footer-right a{color:#60a5fa;text-decoration:none}

          @media(max-width:1024px){.packages-grid{grid-template-columns:repeat(2,1fr)}.pkg-card.popular{transform:none}.pkg-card.popular:hover{transform:translateY(-8px)}}
          @media(max-width:768px){.page-hero{padding:120px 20px 60px}.tabs-wrap{padding:24px 20px 0}.packages-section{padding:32px 20px 60px}.packages-grid{grid-template-columns:1fr}.notes-section{padding:0 20px 60px}.notes-card{padding:24px 20px}.footer{padding:24px 20px;justify-content:center;text-align:center}.modal-backdrop{padding:16px}.modal-header{padding:20px 20px 16px}.modal-body{padding:20px}.hosting-section{padding:0 20px 50px}.hosting-card{flex-direction:column;text-align:center;padding:24px 20px}.hosting-price{text-align:center}}
          @media(max-width:480px){.page-hero{padding:110px 16px 50px}.pkg-card{padding:28px 20px}.pkg-price{font-size:22px}}
        `}</style>

        <Navbar />
        <Helmet>
          <title>Packages & Pricing | MDS Software Development Services</title>
          <meta
            name="description"
            content="Explore MDS complete service packages — Website, E-Commerce, Booking, Business Systems, School Management, LGU, Support Plans, and more. Transparent pricing for every business."
          />
          <meta
            property="og:title"
            content="Packages & Pricing | MDS Software Development Services"
          />
          <meta
            property="og:url"
            content="https://mdstechservices-ph.online/packages"
          />
        </Helmet>

        {/* HERO */}
        <section className="page-hero">
          <div className="page-hero-glow" />
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            Transparent Pricing · No Hidden Fees · 2025–2026 Rates
          </div>
          <h1 className="page-title">
            Solutions for Every
            <br />
            <span>Business Need</span>
          </h1>
          <p className="page-desc">
            From simple websites to full enterprise systems — choose the product
            and tier that fits your business perfectly. All packages come with
            source code turnover.
          </p>
        </section>

        {/* CATEGORY TABS */}
        <div className="tabs-wrap">
          <div className="tabs-scroll reveal">
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
          <p className="tab-category-desc reveal reveal-d1">
            {currentCategory.desc}
          </p>
        </div>

        {/* PACKAGES GRID */}
        <div className="packages-section">
          <div className="packages-grid" key={activeCategory}>
            {currentCategory.packages.map((pkg, i) => (
              <div
                className={`pkg-card reveal reveal-d${i + 1} ${pkg.popular ? "popular" : ""}`}
                key={i}
                style={{
                  "--pkg-color": pkg.color,
                  "--pkg-glow": `${pkg.color}18`,
                }}
              >
                {pkg.popular && (
                  <div className="popular-badge">Most Popular</div>
                )}
                <div>
                  <div className="pkg-name" style={{ color: pkg.color }}>
                    {pkg.name}
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
                        style={{
                          background: `${pkg.color}22`,
                          color: pkg.color,
                        }}
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
                    background: `linear-gradient(135deg,${pkg.color},${pkg.color}bb)`,
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

        {/* HOSTING & INFRASTRUCTURE */}
        <div className="hosting-section">
          <div className="hosting-card reveal">
            <div className="hosting-icon">🖥️</div>
            <div className="hosting-content">
              <h3>Hosting & Infrastructure Assistance</h3>
              <p>
                Need help setting up your server or cloud infrastructure? We
                handle VPS/cloud setup, SSL configuration, security hardening,
                and backup systems so your application runs reliably from day
                one.
              </p>
              <div className="hosting-features">
                {[
                  "VPS / Cloud Setup",
                  "SSL Configuration",
                  "Security Hardening",
                  "Backup Configuration",
                  "Server Optimization",
                ].map((t) => (
                  <span key={t} className="hosting-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="hosting-price">
              <div className="hosting-price-label">Starting from</div>
              <div className="hosting-price-value">PHP 10,000</div>
              <div className="hosting-price-sub">
                Up to PHP 35,000 depending on scope
              </div>
            </div>
          </div>
        </div>

        {/* NOTES */}
        <div className="notes-section">
          <div className="notes-card reveal">
            <div className="notes-title">{'// important notes'}</div>
            <div className="notes-list">
              {[
                "Domain registration and web hosting subscription fees are excluded from all package rates and shall be paid directly by the client.",
                "Additional modules, custom integrations, and specialized workflows beyond the listed features may require separate costing.",
                "Timeline and final pricing may vary depending on revisions, content preparation, and additional feature requests.",
                "Source code and project files shall be turned over upon full project completion and payment.",
                "50% downpayment is required upon project start. The remaining 50% is due upon project completion and turnover.",
                "Support & Maintenance plans are billed monthly and may be cancelled with 30 days advance notice.",
                "Hosting & Infrastructure assistance is billed separately and is not included in any package rate.",
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
            <div className="footer-brand">
              MDS Software Development Services
            </div>
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
                  <div className="modal-title">{selectedPackage} Inquiry</div>
                  <div className="modal-subtitle">
                    {selectedCategoryLabel} · Response within 24 hours
                  </div>
                  <div className="modal-payment-note">
                    💳 GCash, bank transfer, and check payments accepted
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
                  <label>Company / Organization (Optional)</label>
                  <input
                    className="form-input"
                    type="text"
                    name="company"
                    placeholder="Your Company or School"
                    value={form.company}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Tell us about your project</label>
                  <textarea
                    className="form-textarea"
                    name="message"
                    placeholder="What does your business do? What are your goals? Any specific features you need?"
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>
                <button
                  className="btn-submit"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Sending..." : `Send Inquiry →`}
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
    </PageTransition>
  );
}

export default Packages;