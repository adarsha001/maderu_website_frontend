import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import {
  Phone, Mail, Menu, X, Car, Plane, Radio, Zap,
  Shield, Award, CheckCircle, MapPin, Send, Upload,
  ArrowRight, Factory, Settings, Target, ChevronRight,
  Wrench, Layers, Clock, ShoppingCart, Trash2,Share2 
} from "lucide-react";
import logo from "../imports/image.png";

type Page = "home" | "about" | "products" | "quality" | "applications" | "contact" | "careers";

const NAVY = "#0D2C54";
const ORANGE = "#E8991F";

const NAV_LINKS: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "About Us", page: "about" },
  { label: "Products", page: "products" },
  { label: "Quality", page: "quality" },
  // { label: "Awards", page: "quality" },
  { label: "Application", page: "applications" },
  { label: "Contact Us", page: "contact" },
  { label: "Careers", page: "careers" },
];

const img = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format`;

const PHOTOS = {
  hero:       "photo-1740209475472-aa7d280f7452",
  factory:    "photo-1716643863806-989dd76ae093",
  press:      "photo-1717386255773-1e3037c81788",
  cnc2:       "photo-1711418235334-8895331a6cf9",
  engine:     "photo-1666634157070-6fd830fb5672",
  aerospace:  "photo-1581091212991-8891c7d4bd9b",
  telecom:    "photo-1533664488202-6af66d26c44a",
  telecom2:   "photo-1643155193188-38eb08e2b54f",
  electronic: "photo-1544724569-5f546fd6f2b5",
  switchgear: "photo-1635335874521-7987db781153",
  machine:    "photo-1666618090858-fbcee636bd3e",
  electrical: "photo-1716191300020-b52dec5b70a8",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-0.5" style={{ backgroundColor: ORANGE }} />
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: ORANGE }}>{children}</span>
    </div>
  );
}

function StatCounter({ target, suffix = "+", label }: { target: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 2200;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target]);

  return (
    <div ref={ref} className="text-center py-12 px-8">
      <div className="text-6xl lg:text-7xl font-black mb-3 leading-none" style={{ color: ORANGE, fontFamily: "'Montserrat', sans-serif" }}>
        {count}{suffix}
      </div>
      <div className="text-xs font-semibold uppercase tracking-widest text-white/60">{label}</div>
    </div>
  );
}

// ─── TopBar ───────────────────────────────────────────────────────────────────

function TopBar() {
  return (
    <div className="hidden md:block text-xs py-2 px-6" style={{ backgroundColor: "#091e3a", color: "rgba(255,255,255,0.75)" }}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-6">
          <a href="tel:+919611372722" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone size={11} style={{ color: ORANGE }} /> +91-96113 72722
          </a>
          <a href="mailto:info@maderu.in" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Mail size={11} style={{ color: ORANGE }} /> info@maderu.in
          </a>
        </div>
        <div className="flex items-center gap-1.5">
          <Shield size={11} style={{ color: ORANGE }} />
          <span>An ISO 9001:2015 and IATF 16949:2016 Certified Company</span>
        </div>
      </div>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav({ currentPage, setPage }: { currentPage: Page; setPage: (p: Page) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (page: Page) => {
    setPage(page);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? "shadow-lg" : "border-b border-border"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <button onClick={() => handleNav("home")} className="flex items-center gap-3 flex-shrink-0">
          <img src={logo} alt="Maderu Engineering" className="h-10 w-auto" />
          <div className="hidden sm:block leading-none">
            <div className="text-sm font-black tracking-wide" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}>MADERU</div>
            <div className="text-[9px] font-bold tracking-widest uppercase mt-0.5" style={{ color: ORANGE }}>Engineering Pvt. Ltd.</div>
          </div>
        </button>

        <div className="hidden lg:flex items-center">
          {NAV_LINKS.map((link) => {
            const active = currentPage === link.page;
            return (
              <button
                key={link.label}
                onClick={() => handleNav(link.page)}
                className="relative px-3 py-5 text-[11px] font-bold uppercase tracking-wide transition-colors"
                style={{ color: active ? ORANGE : `${NAVY}99`, fontFamily: "'Montserrat', sans-serif" }}
              >
                {link.label}
                {active && <span className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: ORANGE }} />}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNav("contact")}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-[11px] font-bold uppercase tracking-wide text-white transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: ORANGE, fontFamily: "'Montserrat', sans-serif" }}
          >
            Request a Quote <ArrowRight size={13} />
          </button>
          <button className="lg:hidden p-2" style={{ color: NAVY }} onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-white shadow-xl">
          <div className="px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const active = currentPage === link.page;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.page)}
                  className="text-left px-4 py-3 text-sm font-bold rounded-sm transition-colors"
                  style={{ backgroundColor: active ? ORANGE : "transparent", color: active ? "white" : `${NAVY}cc`, fontFamily: "'Montserrat', sans-serif" }}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              onClick={() => handleNav("contact")}
              className="mt-3 w-full py-3 text-sm font-bold uppercase tracking-wide text-white"
              style={{ backgroundColor: ORANGE, fontFamily: "'Montserrat', sans-serif" }}
            >
              Request a Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ setPage }: { setPage: (p: Page) => void }) {
  const goTo = (page: Page) => { setPage(page); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const uniqueLinks = NAV_LINKS.filter((l, i, arr) => arr.findIndex(x => x.page === l.page) === i);

  return (
    <footer style={{ backgroundColor: "#091e3a" }}>
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-white p-1.5 rounded-sm flex-shrink-0">
              <img src={logo} alt="Maderu Engineering" className="h-9 w-auto" />
            </div>
            <div>
              <div className="text-white font-black text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>MADERU</div>
              <div className="text-[9px] font-bold tracking-widest uppercase" style={{ color: ORANGE }}>Engineering Pvt. Ltd.</div>
            </div>
          </div>
          <p className="text-white/55 text-sm leading-relaxed mb-5">
            High-precision manufacturing for automotive, aerospace, telecommunications, and electrical sectors from Bangalore, India.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white" style={{ backgroundColor: ORANGE }}>ISO 9001:2015</span>
            <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white/70 border border-white/20">IATF 16949:2016</span>
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-5" style={{ fontFamily: "'Montserrat', sans-serif" }}>Quick Links</h3>
          <div className="flex flex-col gap-2.5">
            {uniqueLinks.map((link) => (
              <button key={link.page} onClick={() => goTo(link.page)} className="text-left text-sm text-white/55 hover:text-white transition-colors flex items-center gap-2">
                <ChevronRight size={12} style={{ color: ORANGE }} /> {link.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-5" style={{ fontFamily: "'Montserrat', sans-serif" }}>Product Categories</h3>
          <div className="flex flex-col gap-2.5">
            {[
              "Automotive Press Components",
              "Aerospace Products",
              "Telecommunication Products",
              "Engineering & Fabrication",
              "High-Precision Press Tooling",
            ].map((cat) => (
              <button key={cat} onClick={() => goTo("products")} className="text-left text-sm text-white/55 hover:text-white transition-colors flex items-center gap-2">
                <ChevronRight size={12} style={{ color: ORANGE }} /> {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-5" style={{ fontFamily: "'Montserrat', sans-serif" }}>Contact Us</h3>
          <div className="flex flex-col gap-4 text-sm text-white/55">
            <div className="flex gap-3">
              <MapPin size={14} className="flex-shrink-0 mt-0.5" style={{ color: ORANGE }} />
              <span className="leading-relaxed">No: B9, B10 & P-5, ITI Industrial Area, Mahadevapura, Bangalore – 560 048</span>
            </div>
            <div className="flex gap-3">
              <Phone size={14} className="flex-shrink-0 mt-0.5" style={{ color: ORANGE }} />
              <a href="tel:+919611372722" className="hover:text-white transition-colors">+91-96113 72722</a>
            </div>
            <div className="flex gap-3">
              <Mail size={14} className="flex-shrink-0 mt-0.5" style={{ color: ORANGE }} />
              <div>
                <a href="mailto:info@maderu.in" className="block hover:text-white transition-colors">info@maderu.in</a>
                <a href="mailto:mayur@maderu.in" className="block hover:text-white transition-colors">mayur@maderu.in</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/35">
          <span>© 2026 Maderu Engineering Pvt. Ltd. All rights reserved.</span>
          <span>ISO 9001:2015 | IATF 16949:2016 Certified</span>
        </div>
      </div>
    </footer>
  );
}

// ─── Home page ────────────────────────────────────────────────────────────────

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  const go = (p: Page) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const sectors = [
    { icon: Car, title: "Automotive", desc: "Precision stampings for body-in-white, chassis, and powertrain systems meeting IATF 16949 standards.", photo: PHOTOS.engine },
    { icon: Plane, title: "Aerospace", desc: "Close-tolerance structural components and assemblies for aircraft and ground support equipment.", photo: PHOTOS.aerospace },
    { icon: Radio, title: "Telecommunications", desc: "Galvanized tower hardware, enclosures, and brackets for telecom infrastructure deployment.", photo: PHOTOS.telecom },
    { icon: Zap, title: "Electrical & Electronics", desc: "Copper & steel press parts, contacts, and assemblies for switchgear and distribution boards.", photo: PHOTOS.switchgear },
  ];

return (
    <>
 <section 
  className="relative overflow-hidden" 
  style={{ backgroundColor: NAVY }}
>
  {/* Background Image - Optimized for mobile */}
  <div className="absolute inset-0">
    <img 
      src={img(PHOTOS.hero, 768, 600)} 
      alt="Precision CNC manufacturing" 
      className="w-full h-full object-cover" 
      style={{ opacity: 0.15 }}
      loading="eager"
    />
    <div 
      className="absolute inset-0" 
      style={{ 
        background: `linear-gradient(160deg, ${NAVY} 30%, rgba(13,44,84,0.8) 70%, ${NAVY} 100%)` 
      }} 
    />
  </div>

  {/* Pattern - hidden on mobile */}
  <div 
    className="absolute inset-0 pointer-events-none hidden sm:block" 
    style={{ 
      backgroundImage: `repeating-linear-gradient(45deg, rgba(232,153,31,0.04) 0px, rgba(232,153,31,0.04) 1px, transparent 1px, transparent 44px)` 
    }} 
  />

  {/* Main Content - Compact height on mobile */}
  <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 py-8 sm:py-20 md:py-32 w-full">
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Brand Label - Smaller on mobile */}
      <div className="flex items-center gap-2 mb-2 sm:mb-5 md:mb-7">
        <div className="h-px w-6 sm:w-14" style={{ backgroundColor: ORANGE }} />
        <span 
          className="text-[8px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-widest" 
          style={{ color: ORANGE }}
        >
          Maderu Engineering
        </span>
      </div>

      {/* Headline - Compact on mobile */}
      <h1 
        className="text-[1.8rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.05] sm:leading-none mb-2 sm:mb-5 md:mb-6 max-w-3xl lg:max-w-4xl" 
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        Precision
        <br />
        <span style={{ color: ORANGE }}>Engineering.</span>
        <br />
        <span className="text-[1.2rem] sm:text-inherit">Global Standards.</span>
      </h1>

      {/* Description - Shorter on mobile */}
      <p className="text-white/60 text-[0.8rem] sm:text-lg max-w-sm sm:max-w-xl leading-relaxed mb-3 sm:mb-8 md:mb-10">
        Manufacturing and Supplier of Pressed Products, Components, and Assemblies for Automotive, Aerospace, Telecommunication, and Electrical sectors.
      </p>

      {/* Buttons - Compact on mobile */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4">
        <button 
          onClick={() => go("products")} 
          className="flex items-center justify-center gap-1.5 px-4 sm:px-8 py-2.5 sm:py-4 text-[0.65rem] sm:text-sm font-bold uppercase tracking-wide text-white hover:opacity-90 active:scale-95 transition-all w-full sm:w-auto" 
          style={{ backgroundColor: ORANGE, fontFamily: "'Montserrat', sans-serif" }}
        >
          Explore Products <ArrowRight size={12} />
        </button>
        <button 
          onClick={() => go("contact")} 
          className="flex items-center justify-center gap-1.5 px-4 sm:px-8 py-2.5 sm:py-4 text-[0.65rem] sm:text-sm font-bold uppercase tracking-wide text-white/70 border border-white/20 hover:border-white hover:text-white transition-all w-full sm:w-auto" 
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Request a Quote
        </button>
      </div>

      {/* Compact Stats - Only on mobile */}
      {/* <div className="mt-4 sm:mt-8 pt-3 sm:pt-6 border-t border-white/5 sm:hidden">
        <div className="flex justify-around gap-2 text-center">
          <div>
            <div className="text-sm font-bold" style={{ color: ORANGE }}>25+</div>
            <div className="text-[8px] text-white/40 uppercase tracking-wider">Years</div>
          </div>
          <div>
            <div className="text-sm font-bold" style={{ color: ORANGE }}>500+</div>
            <div className="text-[8px] text-white/40 uppercase tracking-wider">Clients</div>
          </div>
          <div>
            <div className="text-sm font-bold" style={{ color: ORANGE }}>50+</div>
            <div className="text-[8px] text-white/40 uppercase tracking-wider">Countries</div>
          </div>
        </div>
      </div> */}
    </motion.div>
  </div>

  {/* Scroll Indicator - Removed on mobile, kept for larger screens */}
  <div className="absolute bottom-4 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 hidden sm:block">
    <div className="w-px h-8 sm:h-12 md:h-14 bg-gradient-to-b from-white/20 to-transparent" />
  </div>
</section>

    <section className="py-4 sm:py-6 md:py-7 border-b border-border" style={{ backgroundColor: "#F4F6F9" }}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    {/* Mobile: 2x2 Grid | Tablet+: Flex row */}
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center gap-3 sm:gap-6 md:gap-8 lg:gap-12">
      {[
        { icon: Shield, label: "ISO 9001:2015", sub: "Quality Management" },
        { icon: Award, label: "IATF 16949:2016", sub: "Automotive Quality" },
        { icon: CheckCircle, label: "Zero Defect Policy", sub: "Quality Commitment" },
        { icon: Factory, label: "Bangalore, India", sub: "State-of-the-Art Facility" },
      ].map(({ icon: Icon, label, sub }) => (
        <div 
          key={label} 
          className="flex items-center gap-2 sm:gap-3"
        >
          <Icon 
            size={18} 
            className="sm:w-[22px] sm:h-[22px] md:w-[26px] md:h-[26px] flex-shrink-0" 
            style={{ color: ORANGE }} 
          />
          <div className="min-w-0">
            <div 
              className="text-[7px] sm:text-[9px] md:text-[10px] font-semibold uppercase tracking-widest truncate" 
              style={{ color: `${NAVY}66` }}
            >
              {sub}
            </div>
            <div 
              className="font-black text-[10px] sm:text-sm leading-tight truncate" 
              style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}
            >
              {label}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
          <div>
            <SectionLabel>Our Vision</SectionLabel>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4 sm:mb-6 md:mb-8" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}>
              Built on <span style={{ color: ORANGE }}>Quality,</span><br />Driven by Precision
            </h2>
            <blockquote className="text-sm sm:text-base text-foreground/65 leading-relaxed border-l-4 pl-4 sm:pl-5 md:pl-6 italic" style={{ borderColor: ORANGE }}>
              "Maderu Engineering Private Limited provides timely Delivery of products with Quality to meet our customer requirements, whose performance and appearance are in accordance with our best practices of high manufacturing standards."
            </blockquote>
            <button onClick={() => go("about")} className="mt-6 sm:mt-7 md:mt-8 flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wide transition-colors" style={{ color: ORANGE, fontFamily: "'Montserrat', sans-serif" }}>
              Learn About Us <ArrowRight size={14} />
            </button>
          </div>
          <div className="relative mt-6 sm:mt-0">
            <div className="aspect-[4/3] overflow-hidden" style={{ backgroundColor: "#c8cdd8" }}>
              <img src={img(PHOTOS.press, 800, 600)} alt="Manufacturing facility" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-3 sm:-bottom-4 md:-bottom-5 -right-3 sm:-right-4 md:-right-5 w-28 sm:w-32 md:w-36 h-28 sm:h-32 md:h-36 flex flex-col items-center justify-center text-white" style={{ backgroundColor: ORANGE }}>
              <div className="text-3xl sm:text-4xl font-black leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>25+</div>
              <div className="text-[7px] sm:text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-center leading-snug mt-1 sm:mt-1.5">Years of<br />Excellence</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: NAVY }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 divide-y sm:divide-y-0 divide-white/10">
            <StatCounter target={200} suffix="+" label="Products & Custom Designs" />
            <StatCounter target={500} suffix="+" label="High-Precision Tools Built" />
            <StatCounter target={100} suffix="%" label="Quality & Performance Commitment" />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ backgroundColor: "#F4F6F9" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-14">
            <SectionLabel>Industries Served</SectionLabel>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}>Core Industry Sectors</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {sectors.map(({ icon: Icon, title, desc, photo }) => (
              <div key={title} className="group bg-white overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300" style={{ borderTop: `3px solid ${ORANGE}` }} onClick={() => go("applications")}>
                <div className="aspect-video overflow-hidden" style={{ backgroundColor: "#c8cdd8" }}>
                  <img src={img(photo, 400, 250)} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 flex items-center justify-center mb-3 sm:mb-3.5 md:mb-4 rounded-sm" style={{ backgroundColor: `${ORANGE}18` }}>
                    <Icon size={16} className="sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px]" style={{ color: ORANGE }} />
                  </div>
                  <h3 className="font-black text-sm sm:text-base mb-1.5 sm:mb-2 leading-tight" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}>{title}</h3>
                  <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Responsive Map Container */}
<div className="w-full relative overflow-hidden">
  {/* Mobile: Taller height | Desktop: Original aspect ratio */}
  <div className="block sm:hidden" style={{ paddingBottom: '56.25%' }}>
    <iframe 
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3269.0915503707133!2d77.6955262110451!3d12.995696850945697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1115724474b7%3A0xb11a9c7b54f23561!2sMADERU%20ENGINEERING%20PVT%20LTD!5e0!3m2!1sen!2sin!4v1783344982681!5m2!1sen!2sin" 
      className="absolute top-0 left-0 w-full h-full border-0"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      title="Maderu Engineering Location"
    />
  </div>
  
  {/* Desktop: Original slim height */}
  <div className="hidden sm:block" style={{ paddingBottom: '25.25%' }}>
    <iframe 
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3269.0915503707133!2d77.6955262110451!3d12.995696850945697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1115724474b7%3A0xb11a9c7b54f23561!2sMADERU%20ENGINEERING%20PVT%20LTD!5e0!3m2!1sen!2sin!4v1783344982681!5m2!1sen!2sin" 
      className="absolute top-0 left-0 w-full h-full border-0"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      title="Maderu Engineering Location"
    />
  </div>
</div>

      <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6" style={{ backgroundColor: ORANGE }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5 md:gap-6">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight text-center sm:text-left" style={{ fontFamily: "'Montserrat', sans-serif" }}>Ready to start your next precision project?</h2>
            <p className="text-white/80 mt-1 sm:mt-2 text-xs sm:text-sm text-center sm:text-left">Send us your blueprint — we respond within 24 business hours.</p>
          </div>
          <button onClick={() => go("contact")} className="flex-shrink-0 flex items-center justify-center gap-2 px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 font-bold uppercase tracking-wide text-xs sm:text-sm bg-white hover:bg-white/90 transition-colors w-full sm:w-auto" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}>
            Get a Quote <ArrowRight size={15} />
          </button>
        </div>
      </section>
    </>
  );
}

// ─── About page ───────────────────────────────────────────────────────────────

function AboutPage() {
  const capabilities = [
    { icon: Settings, title: "Progressive Die Tooling", desc: "Design and manufacture of complex multi-stage progressive dies for high-volume production runs." },
    { icon: Layers, title: "Sheet Metal Fabrication", desc: "Precision bending, forming, and welding with tolerances down to ±0.05 mm across a broad material range." },
    { icon: Target, title: "Assembly & Sub-Assembly", desc: "Complete assembly solutions including riveting, spot welding, and threaded hardware insertion." },
    { icon: Wrench, title: "Tool Room Operations", desc: "In-house tool room with Wire EDM, CNC grinding, and precision machining capabilities." },
    { icon: Factory, title: "Press Shop", desc: "200T to 600T hydraulic and mechanical presses for diverse materials and material gauges." },
    { icon: Clock, title: "On-Time Delivery", desc: "Robust production planning and logistics ensuring 98%+ on-time delivery performance every month." },
  ];

  return (
    <>
      <section className="py-24 px-6" style={{ backgroundColor: NAVY }}>
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Our Company</SectionLabel>
          <h1 className="text-5xl md:text-6xl font-black text-white max-w-3xl leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            About Maderu<br /><span style={{ color: ORANGE }}>Engineering</span>
          </h1>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionLabel>Who We Are</SectionLabel>
            <h2 className="text-3xl font-black mb-6 leading-tight" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}>Bangalore's Premier Precision Component Manufacturer</h2>
            <div className="space-y-4 text-foreground/65 leading-relaxed text-sm">
              <p>Maderu Engineering Private Limited is a technology-driven precision manufacturing company headquartered in the ITI Industrial Area, Mahadevapura, Bangalore. Established with a mission to deliver world-class pressed components and assemblies, we serve industries where quality is non-negotiable and delivery timelines are critical.</p>
              <p>Our state-of-the-art manufacturing facility spans a comprehensive press shop, a fully-equipped tool room, and a dedicated quality assurance lab — all under one roof to ensure seamless control from raw material intake to finished component dispatch.</p>
              <p>Holding dual certifications in ISO 9001:2015 and IATF 16949:2016, Maderu Engineering is positioned as a reliable Tier-1 and Tier-2 supplier to leading OEMs across automotive, aerospace, and electrical sectors in India and globally.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                ["Bangalore, India", "Headquarters"],
                ["200T – 600T", "Press Capacity"],
                ["±0.05 mm", "Tolerance Capability"],
                ["ISO & IATF", "Dual Certified"],
              ].map(([val, lbl]) => (
                <div key={lbl} className="p-4 border-l-2" style={{ borderColor: ORANGE, backgroundColor: "#F4F6F9" }}>
                  <div className="font-black text-base" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}>{val}</div>
                  <div className="text-[10px] font-semibold uppercase tracking-widest mt-0.5" style={{ color: `${NAVY}66` }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="aspect-[16/10] overflow-hidden" style={{ backgroundColor: "#c8cdd8" }}>
              <img src={img(PHOTOS.factory, 800, 500)} alt="Maderu manufacturing facility" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square overflow-hidden" style={{ backgroundColor: "#c8cdd8" }}>
                <img src={img(PHOTOS.cnc2, 400, 400)} alt="CNC machining" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square overflow-hidden" style={{ backgroundColor: "#c8cdd8" }}>
                <img src={img(PHOTOS.electronic, 400, 400)} alt="Precision inspection" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ backgroundColor: "#F4F6F9" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="text-4xl font-black" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}>Engineering Capabilities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white p-8 border-b-2 border-transparent hover:shadow-lg hover:border-b-2 transition-all duration-300"
                onMouseEnter={e => (e.currentTarget.style.borderBottomColor = ORANGE)}
                onMouseLeave={e => (e.currentTarget.style.borderBottomColor = "transparent")}
              >
                <div className="w-12 h-12 flex items-center justify-center mb-5 rounded-sm" style={{ backgroundColor: `${ORANGE}14` }}>
                  <Icon size={22} style={{ color: ORANGE }} />
                </div>
                <h3 className="font-black text-sm mb-3" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}>{title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Products page ────────────────────────────────────────────────────────────

interface ProductItem {
  id: string;
  name: string;
  desc: string;
  photo: string;
  price: string;
  moq: string;
  material: string;
  thickness: string;
}

interface CategoryData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  specThickness: string;
  specTensile: string;
  photo: string;
  products: ProductItem[];
}

const CATEGORY_DATA: CategoryData[] = [
  {
    id: "automotive",
    name: "Automotive Press Components",
    tagline: "Precision Stampings for the Automotive Value Chain",
    description: "Automotive Press Components are manufactured and supplied to align with customer standards by our experienced, competent professionals. These components are carefully examined by our quality inspectors on different parameters to ensure all requirements are met. Our products are characterised by dimensional accuracy, durability, strength, and performance.",
    features: [
      "High Dimensional Accuracy",
      "Products as per customer specifications",
      "Zero rejections per Batch or Lot quantity",
      "Excellent surface finish",
      "With or without component surface coating",
      "Just-In-Time deliveries",
      "Anytime after-sales service",
    ],
    specThickness: "0.10 mm – 6.35 mm",
    specTensile: "Up to 600 MPa",
    photo: PHOTOS.engine,
    products: [
      {
        id: "auto-chassis",
        name: "Chassis Mounting Brackets",
        desc: "High-strength stamped steel mounting brackets engineered for vehicle chassis systems. Compatible with all major passenger car and commercial vehicle platforms. Available with or without surface coating in zinc, phosphate, or powder coat finishes.",
        photo: PHOTOS.engine,
        price: "₹45 – ₹280 / pc",
        moq: "500 pcs",
        material: "CR Steel / MS",
        thickness: "0.5 – 4 mm",
      },
      {
        id: "auto-blower",
        name: "Blower & Radiator Motor Assembly Parts",
        desc: "Precision press components for blower fan assemblies and radiator motor mounting in automotive HVAC systems. Manufactured to OEM drawing specifications with tight tolerances for consistent assembly fitment.",
        photo: PHOTOS.factory,
        price: "₹120 – ₹450 / pc",
        moq: "250 pcs",
        material: "CR Steel / HR Steel",
        thickness: "0.8 – 3 mm",
      },
      {
        id: "auto-cv-axle",
        name: "Commercial Vehicle Axle Assembly Parts",
        desc: "Heavy-duty stamped components for commercial vehicle rear axle assemblies. Designed for high load capacity, long service life, and compatibility with leading commercial vehicle platforms.",
        photo: PHOTOS.press,
        price: "₹180 – ₹620 / pc",
        moq: "200 pcs",
        material: "HR Steel / MS",
        thickness: "2 – 6.35 mm",
      },
      {
        id: "auto-axle-shim",
        name: "Vehicle Axle Assembly Shim (0.1 mm)",
        desc: "Ultra-thin precision shims for vehicle axle assembly pre-load setting. Stamped from hardened steel strip with tight thickness tolerance of ±0.005 mm for consistent and repeatable bearing pre-load performance.",
        photo: PHOTOS.cnc2,
        price: "₹8 – ₹35 / pc",
        moq: "2,000 pcs",
        material: "Hardened Steel Strip",
        thickness: "0.10 – 0.50 mm",
      },
      {
        id: "auto-door",
        name: "Vehicle Door Assembly Components",
        desc: "Sheet metal press parts for vehicle door inner and outer panels, hinge reinforcements, and latch striker plates. Manufactured to automotive drawing tolerances with excellent Class A surface finish.",
        photo: PHOTOS.press,
        price: "₹95 – ₹380 / pc",
        moq: "300 pcs",
        material: "CR Steel / HSLA",
        thickness: "0.6 – 3 mm",
      },
      {
        id: "auto-lock",
        name: "Vehicle Lock Assembly Components",
        desc: "Precision press parts for door lock mechanisms, hood latches, and trunk release systems. Manufactured with tight dimensional accuracy for reliable functional fitment across all vehicle types.",
        photo: PHOTOS.machine,
        price: "₹65 – ₹220 / pc",
        moq: "500 pcs",
        material: "CR Steel / Zinc Coated",
        thickness: "0.5 – 2 mm",
      },
      {
        id: "auto-seat",
        name: "Vehicle Seat Assembly Components",
        desc: "Structural press components for automotive seat frames, recliner brackets, and track guide assemblies. Designed to meet automotive safety, durability, and NVH performance standards.",
        photo: PHOTOS.factory,
        price: "₹75 – ₹290 / pc",
        moq: "400 pcs",
        material: "CR Steel / HR Steel",
        thickness: "0.8 – 3.5 mm",
      },
      {
        id: "auto-rack",
        name: "Warehouse Rack Assembly Parts",
        desc: "Heavy-duty press and fabricated components for industrial storage rack systems and material handling equipment. Designed for modular assembly with maximum load-bearing capacity.",
        photo: PHOTOS.electrical,
        price: "₹180 – ₹650 / pc",
        moq: "150 pcs",
        material: "MS / HR Steel",
        thickness: "1.5 – 6 mm",
      },
    ],
  },
  {
    id: "aerospace",
    name: "Aerospace Products",
    tagline: "High-Precision Components for Critical Applications",
    description: "Aviation, Space, and Defence are very high-technology industries requiring high-quality products at competitive prices. With sophisticated machinery and advanced manufacturing techniques, we manufacture components that meet functional safety requirements throughout the full product lifecycle. We use excellent-quality raw materials and custom design products as per client preferences for door latch, door module system, dash panel brackets, and more.",
    features: [
      "High Dimensional Accuracy",
      "Products as per customer specifications",
      "Zero rejections per Batch or Lot quantity",
      "Excellent surface finish",
      "With or without component surface coating",
      "Just-In-Time deliveries",
      "Anytime after-sales service",
    ],
    specThickness: "0.10 mm – 6.35 mm",
    specTensile: "Up to 450 MPa",
    photo: PHOTOS.aerospace,
    products: [
      {
        id: "aero-latch",
        name: "Door Latch Components",
        desc: "High-precision press components for aircraft door latch mechanisms. Manufactured to aerospace drawing standards with full raw material traceability, dimensional inspection reports, and Certificate of Conformance documentation.",
        photo: PHOTOS.aerospace,
        price: "₹280 – ₹850 / pc",
        moq: "100 pcs",
        material: "Aluminium / Mild Steel",
        thickness: "0.5 – 3 mm",
      },
      {
        id: "aero-module",
        name: "Door Module System Parts",
        desc: "Stamped and fabricated sheet metal components for aircraft door module systems, including structural liners, seal supports, hinge brackets, and mounting reinforcements.",
        photo: PHOTOS.machine,
        price: "₹350 – ₹1,200 / pc",
        moq: "50 pcs",
        material: "Aluminium Alloy",
        thickness: "0.5 – 4 mm",
      },
      {
        id: "aero-dash",
        name: "Dash Panel Brackets",
        desc: "Precision aluminium and steel brackets for aircraft instrument panel and avionics mounting applications. First Article Inspection Reports (FAIRs) available on request.",
        photo: PHOTOS.cnc2,
        price: "₹120 – ₹450 / pc",
        moq: "100 pcs",
        material: "Al Alloy / CR Steel",
        thickness: "0.5 – 3 mm",
      },
      {
        id: "aero-struct",
        name: "Structural Airframe Brackets",
        desc: "Close-tolerance structural brackets for primary and secondary airframe assemblies. Manufactured from aerospace-grade materials with certificate of conformance and independent dimensional verification.",
        photo: PHOTOS.press,
        price: "₹650 – ₹2,800 / pc",
        moq: "25 pcs",
        material: "Al 2024 / Al 6061",
        thickness: "1 – 6 mm",
      },
      {
        id: "aero-ground",
        name: "Ground Support Equipment Parts",
        desc: "Robust steel and aluminium press components for aircraft ground support equipment including jacking pads, servicing platform structural parts, and equipment access covers.",
        photo: PHOTOS.factory,
        price: "₹480 – ₹1,800 / pc",
        moq: "50 pcs",
        material: "MS / Al Alloy",
        thickness: "1.5 – 6.35 mm",
      },
    ],
  },
  {
    id: "telecom",
    name: "Press Products for Telecommunications",
    tagline: "Structural Components for Critical Telecom Infrastructure",
    description: "Telecommunications is a major sector with critical needs for data processing equipment and infrastructure. Press and sheet metal products play a vital role in assembling, installing, and setting up various equipment like communication cabinets, fiber optics, towers, and exchange switch controls to meet international standards. We design and manufacture different kinds of press and sheet metal components to meet specific requirements.",
    features: [
      "Excellent Functional performance",
      "Very good surface finish",
      "With or without component surface coating",
      "Products as per customer specifications",
      "Zero rejections per Batch or Lot quantity",
      "Dimensional accuracy as per design specifications",
      "Defect-free components",
    ],
    specThickness: "0.10 mm – 6.35 mm",
    specTensile: "Up to 750 MPa",
    photo: PHOTOS.telecom,
    products: [
      {
        id: "tel-cab",
        name: "Communication Cabinet Panels",
        desc: "Precision sheet metal panels and structural frames for outdoor and indoor telecommunications equipment cabinets. Powder coated with IP-rated sealing features for long-term weathering resistance.",
        photo: PHOTOS.telecom,
        price: "₹380 – ₹1,200 / pc",
        moq: "100 pcs",
        material: "CR Steel / CRCA",
        thickness: "1 – 3 mm",
      },
      {
        id: "tel-tower",
        name: "Fiber Optic Tower Mounting Brackets",
        desc: "Hot-dip galvanized structural mounting brackets and clamps for fiber optic cable management on telecom towers, utility poles, and building facades in outdoor environments.",
        photo: PHOTOS.telecom2,
        price: "₹280 – ₹750 / pc",
        moq: "200 pcs",
        material: "MS (Hot-dip Galvanized)",
        thickness: "2 – 6 mm",
      },
      {
        id: "tel-switch",
        name: "Exchange Switch Control Parts",
        desc: "Precision press components for indoor exchange switch control panels including mounting frames, guide rails, backplane brackets, cable management systems, and panel covers.",
        photo: PHOTOS.electrical,
        price: "₹450 – ₹1,800 / pc",
        moq: "100 pcs",
        material: "CR Steel / Aluminium",
        thickness: "0.8 – 3 mm",
      },
      {
        id: "tel-shelter",
        name: "Equipment Shelter Frame Assemblies",
        desc: "Welded and bolted steel frame assemblies for outdoor BTS and telecom equipment shelters. Hot-dip galvanized for long-term corrosion resistance in tropical and coastal environments.",
        photo: PHOTOS.factory,
        price: "₹850 – ₹3,200 / set",
        moq: "20 sets",
        material: "MS / Structural Steel",
        thickness: "2 – 8 mm",
      },
    ],
  },
  {
    id: "fabrication",
    name: "Engineering & Fabrication",
    tagline: "Integrated Solutions for Complex Manufacturing Assemblies",
    description: "Engineering and Fabrication is the most important element in any engineering manufacturing process. Press products are integrated into manufacturing applications ranging from aeroplanes, turbines, engines, and pumps. The use of press components in engineering reduces design complexity and enhances manufacturing feasibility. We focus on design, advanced methods, and operation of integrated systems for high-quality, economically competitive products.",
    features: [
      "Excellent Functional performance",
      "Very good surface finish",
      "With or without component surface coating",
      "Products as per customer specifications",
      "Zero rejections per Batch or Lot quantity",
      "Dimensional accuracy as per design specifications",
      "Defect-free components",
    ],
    specThickness: "0.10 mm – 6.35 mm",
    specTensile: "Up to 750 MPa",
    photo: PHOTOS.factory,
    products: [
      {
        id: "eng-rack",
        name: "Warehouse Rack Assembly Parts",
        desc: "Heavy-duty stamped and formed rack uprights, beams, and connectors for industrial storage systems. Designed for modular assembly with maximum load-bearing capacity and long service life.",
        photo: PHOTOS.electrical,
        price: "₹180 – ₹620 / pc",
        moq: "150 pcs",
        material: "MS / HR Steel",
        thickness: "1.5 – 6 mm",
      },
      {
        id: "eng-gen",
        name: "General Engineering Assembly Parts",
        desc: "Custom press and fabricated components for general mechanical engineering assemblies across turbines, engines, pumps, compressors, and material handling systems. Manufactured to any customer drawing.",
        photo: PHOTOS.press,
        price: "₹95 – ₹480 / pc",
        moq: "100 pcs",
        material: "As per Customer Specification",
        thickness: "0.1 – 6.35 mm",
      },
      {
        id: "eng-turbine",
        name: "Turbine & Engine Brackets",
        desc: "Precision press components for turbine housing supports and engine bracket assemblies. Manufactured to complex GD&T drawing requirements with tight assembly stack-up tolerances.",
        photo: PHOTOS.machine,
        price: "₹350 – ₹1,400 / pc",
        moq: "50 pcs",
        material: "CR Steel / SS 304",
        thickness: "1 – 5 mm",
      },
      {
        id: "eng-pump",
        name: "Pump Assembly Components",
        desc: "Sheet metal press components for centrifugal and positive displacement pump housings, impeller shroud covers, and mounting bracket assemblies in industrial process equipment.",
        photo: PHOTOS.cnc2,
        price: "₹150 – ₹580 / pc",
        moq: "100 pcs",
        material: "CR Steel / Aluminium",
        thickness: "0.8 – 4 mm",
      },
    ],
  },
  {
    id: "tooling",
    name: "Press Tooling (Manufacturing & Servicing)",
    tagline: "20+ Years of In-House Tool Design, Build & Maintenance",
    description: "Press Tools produce a variety of sheet metal products accurately with pneumatic, mechanical, and hydraulic power presses. Tools are categorised by operation: blanking, forming, forging, piercing, punching. Conventional stage tools operate individually; progressive tools combine multiple operations for continuous production; compound tools perform two or more operations simultaneously. We have 20+ years of experience manufacturing and servicing Stage, Progressive, and Compound tooling for complex designs.",
    features: [
      "High degree of compressive strength and abrasion resistance",
      "Dimensional accuracy as per design specifications",
      "Excellent Functional performance",
      "Defect-free high-quality raw material",
      "High resistance to wear — long tool life",
      "Easy to assemble and service",
      "Defect-free spares and fasteners",
      "High process yield and efficiency",
    ],
    specThickness: "N/A",
    specTensile: "N/A",
    photo: PHOTOS.hero,
    products: [
      {
        id: "tool-stage",
        name: "Stage / Conventional Press Tools",
        desc: "Single-operation press tools for blanking, forming, piercing, or punching. Manufactured from D2/H13 tool steel at HRc 58–62. Suitable for low-to-medium volume production. Full design and manufacturing in-house.",
        photo: PHOTOS.hero,
        price: "₹25,000 – ₹1,50,000 / set",
        moq: "1 set",
        material: "D2 / H13 Tool Steel",
        thickness: "As per Component",
      },
      {
        id: "tool-prog",
        name: "Progressive Press Tools",
        desc: "Multi-station progressive dies for high-volume continuous production. Designed using CAD/CAM, manufactured to ±0.005 mm on critical dimensions. 20+ years of progressive tooling experience in-house.",
        photo: PHOTOS.cnc2,
        price: "₹45,000 – ₹3,50,000 / set",
        moq: "1 set",
        material: "D2 / H13 / HSS",
        thickness: "As per Component",
      },
      {
        id: "tool-compound",
        name: "Compound / Combination Tools",
        desc: "Two or more simultaneous operations in a single press stroke — blanking + piercing, bending + forming. Optimal for complex components requiring multi-feature dimensional accuracy in one hit.",
        photo: PHOTOS.machine,
        price: "₹35,000 – ₹2,50,000 / set",
        moq: "1 set",
        material: "D2 Tool Steel / HSS",
        thickness: "As per Component",
      },
      {
        id: "tool-service",
        name: "Tool Servicing & Regrinding",
        desc: "In-house tool room reconditioning service for re-grinding, repair, and rebuild of progressive, compound, and stage press tools. Quick turnaround with OEM-grade spare parts to minimise production downtime.",
        photo: PHOTOS.factory,
        price: "Custom Quote",
        moq: "Per Tool",
        material: "N/A",
        thickness: "N/A",
      },
    ],
  },
];

// import { useState, useEffect, useRef } from "react";
// import { ShoppingCart, Trash2, ArrowRight, CheckCircle, ChevronRight, Send, Phone, X } from "lucide-react";
// import { NAVY, ORANGE } from "../../constants";
// import { CATEGORY_DATA } from "../../constants/products";
// import { img } from "../../utils";
// import { SectionLabel } from "../common/SectionLabel";
// import type { CategoryData, ProductItem, Page } from "../../types";

// WhatsApp number (without +)
const WHATSAPP_NUMBER = "919611372722";

// Helper function to generate WhatsApp message
const generateWhatsAppMessage = (product: ProductItem, userName: string, phone: string, quantity: string, address: string) => {
  const message = `*MADERU ENGINEERING - Product Inquiry*

*Product:* ${product.name}
*Price Range:* ${product.price}
*MOQ:* ${product.moq}
*Material:* ${product.material}
*Thickness:* ${product.thickness}

*Customer Details:*
*Name:* ${userName || 'Not provided'}
*Phone:* ${phone || 'Not provided'}
*Quantity Required:* ${quantity || 'Not specified'}
*Delivery Address:* ${address || 'Not provided'}

*Additional Notes:*
${product.desc}

Please provide a quotation at the earliest.`;

  return encodeURIComponent(message);
};

export function ProductsPage({ setPage }: { setPage: (p: Page) => void }) {
  const [selectedCat, setSelectedCat] = useState<CategoryData | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [whatsAppData, setWhatsAppData] = useState({
    userName: "",
    phone: "",
    quantity: "",
    address: "",
    product: null as ProductItem | null
  });

  const isInitial = useRef(true);
  useEffect(() => {
    if (isInitial.current) { isInitial.current = false; return; }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedCat, selectedProduct]);

  const openWhatsApp = (product: ProductItem) => {
    setWhatsAppData({
      userName: "",
      phone: "",
      quantity: "",
      address: "",
      product: product
    });
    setShowWhatsAppModal(true);
  };

  const handleWhatsAppSubmit = () => {
    if (!whatsAppData.product) return;
    
    const message = generateWhatsAppMessage(
      whatsAppData.product,
      whatsAppData.userName,
      whatsAppData.phone,
      whatsAppData.quantity,
      whatsAppData.address
    );
    
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, '_blank');
    setShowWhatsAppModal(false);
  };

  // ── Share Product via WhatsApp ──────────────────────────────────────────────
  const shareProductOnWhatsApp = (product: ProductItem) => {
    const shareMessage = `🔧 *${product.name}*\n\n📋 *Category:* ${selectedCat?.name || 'Product'}\n💰 *Price:* ${product.price}\n📦 *MOQ:* ${product.moq}\n🔩 *Material:* ${product.material}\n📏 *Thickness:* ${product.thickness}\n\n📝 *Description:* ${product.desc}\n\n🛠️ *Maderu Engineering Pvt. Ltd.*\n🔗 View more: https://maderu-website-frontend.vercel.app/products\n\n📱 *Contact us:* +91${WHATSAPP_NUMBER}`;
    
    const url = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
    window.open(url, '_blank');
  };

  // ── WhatsApp Modal ──────────────────────────────────────────────────────────
  if (showWhatsAppModal) {
    return (
      <div className="fixed inset-0 z-[999] flex items-center justify-center px-4" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
        <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Phone size={24} style={{ color: "#25D366" }} />
              <h2 className="text-xl font-black" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}>
                Inquire via WhatsApp
              </h2>
            </div>
            <button 
              onClick={() => setShowWhatsAppModal(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <X size={20} />
            </button>
          </div>

          {whatsAppData.product && (
            <div className="mb-4 p-3 rounded" style={{ backgroundColor: "#F4F6F9" }}>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Selected Product</div>
              <div className="font-bold" style={{ color: NAVY }}>{whatsAppData.product.name}</div>
              <div className="text-xs text-gray-500">Price: {whatsAppData.product.price} | MOQ: {whatsAppData.product.moq}</div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: `${NAVY}99` }}>
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                value={whatsAppData.userName}
                onChange={(e) => setWhatsAppData(d => ({ ...d, userName: e.target.value }))}
                className="w-full px-4 py-3 text-sm border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground transition-colors rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: `${NAVY}99` }}>
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="Enter your phone number"
                value={whatsAppData.phone}
                onChange={(e) => setWhatsAppData(d => ({ ...d, phone: e.target.value }))}
                className="w-full px-4 py-3 text-sm border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground transition-colors rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: `${NAVY}99` }}>
                Quantity Required
              </label>
              <input
                type="text"
                placeholder="Enter quantity (e.g., 500 pcs)"
                value={whatsAppData.quantity}
                onChange={(e) => setWhatsAppData(d => ({ ...d, quantity: e.target.value }))}
                className="w-full px-4 py-3 text-sm border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground transition-colors rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: `${NAVY}99` }}>
                Delivery Address
              </label>
              <textarea
                rows={3}
                placeholder="Enter your delivery address"
                value={whatsAppData.address}
                onChange={(e) => setWhatsAppData(d => ({ ...d, address: e.target.value }))}
                className="w-full px-4 py-3 text-sm border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground transition-colors rounded resize-none"
              />
            </div>

            <button
              onClick={handleWhatsAppSubmit}
              className="w-full py-4 flex items-center justify-center gap-2 font-bold uppercase tracking-wide text-sm text-white hover:opacity-90 active:scale-[0.99] transition-all rounded"
              style={{ backgroundColor: "#25D366", fontFamily: "'Montserrat', sans-serif" }}
            >
              <Phone size={18} /> Send via WhatsApp
            </button>

            <button
              onClick={() => setShowWhatsAppModal(false)}
              className="w-full py-3 text-sm font-bold uppercase tracking-wide text-gray-500 hover:text-gray-700 transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Product detail ──────────────────────────────────────────────────────────
  if (selectedProduct) {
    return (
      <div>
        <div className="py-3 px-6 border-b border-border" style={{ backgroundColor: "#F4F6F9" }}>
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs">
            <button onClick={() => { setSelectedProduct(null); setSelectedCat(null); }} className="text-muted-foreground hover:text-foreground transition-colors">Products</button>
            <ChevronRight size={11} className="text-muted-foreground" />
            <button onClick={() => setSelectedProduct(null)} className="text-muted-foreground hover:text-foreground transition-colors">{selectedCat?.name}</button>
            <ChevronRight size={11} className="text-muted-foreground" />
            <span className="font-semibold" style={{ color: NAVY }}>{selectedProduct.name}</span>
          </div>
        </div>

        <section className="py-14 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-start">
            <div className="aspect-[4/3] overflow-hidden" style={{ backgroundColor: "#c8cdd8" }}>
              <img src={img(selectedProduct.photo, 800, 600)} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: ORANGE }}>{selectedCat?.name}</div>
              <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}>{selectedProduct.name}</h1>
              <p className="text-foreground/65 leading-relaxed mb-7 text-sm">{selectedProduct.desc}</p>

              <div className="grid grid-cols-2 gap-3 mb-7">
                {([
                  ["Price Range", selectedProduct.price],
                  ["Min. Order Qty", selectedProduct.moq],
                  ["Material", selectedProduct.material],
                  ["Thickness Range", selectedProduct.thickness],
                ] as [string, string][]).map(([k, v]) => (
                  <div key={k} className="p-4" style={{ backgroundColor: "#F4F6F9" }}>
                    <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: `${NAVY}66` }}>{k}</div>
                    <div className="font-bold text-sm" style={{ color: NAVY }}>{v}</div>
                  </div>
                ))}
              </div>

              <div className="p-4 mb-6 border-l-4 text-sm text-foreground/65 leading-relaxed" style={{ backgroundColor: `${ORANGE}0d`, borderColor: ORANGE }}>
                All prices are indicative. Final pricing depends on order quantity, material grade, and surface finish requirements.
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => openWhatsApp(selectedProduct)}
                  className="flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-all flex items-center justify-center gap-2 rounded"
                  style={{
                    backgroundColor: "#25D366",
                    color: "white",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  <Phone size={18} /> Inquire on WhatsApp
                </button>
                
                <button
                  onClick={() => shareProductOnWhatsApp(selectedProduct)}
                  className="py-4 px-6 text-sm font-bold uppercase tracking-wide transition-all flex items-center justify-center gap-2 rounded border-2"
                  style={{
                    borderColor: "#25D366",
                    color: "#25D366",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  <Share2 size={16} /> Share Product
                </button>
              </div>
            </div>
          </div>
        </section>

        {selectedCat && (
          <section className="py-12 px-6 border-t border-border" style={{ backgroundColor: "#F4F6F9" }}>
            <div className="max-w-7xl mx-auto">
              <h2 className="text-xl font-black mb-8" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}>More from {selectedCat.name}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedCat.products.filter(p => p.id !== selectedProduct.id).slice(0, 4).map(p => (
                  <div key={p.id} className="bg-white overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedProduct(p)}>
                    <div className="aspect-video overflow-hidden" style={{ backgroundColor: "#c8cdd8" }}>
                      <img src={img(p.photo, 300, 190)} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3">
                      <div className="font-black text-xs leading-tight mb-1" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}>{p.name}</div>
                      <div className="text-[10px] font-bold" style={{ color: ORANGE }}>{p.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }

  // ── Category detail ─────────────────────────────────────────────────────────
  if (selectedCat) {
    return (
      <div>
        <div className="py-3 px-6 border-b border-border" style={{ backgroundColor: "#F4F6F9" }}>
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs">
            <button onClick={() => setSelectedCat(null)} className="text-muted-foreground hover:text-foreground transition-colors">Products</button>
            <ChevronRight size={11} className="text-muted-foreground" />
            <span className="font-semibold" style={{ color: NAVY }}>{selectedCat.name}</span>
          </div>
        </div>

        <section className="py-16 px-6" style={{ backgroundColor: NAVY }}>
          <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3">
              <SectionLabel>{selectedCat.tagline}</SectionLabel>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5" style={{ fontFamily: "'Montserrat', sans-serif" }}>{selectedCat.name}</h1>
              <p className="text-white/65 text-sm leading-relaxed mb-6">{selectedCat.description}</p>
              {selectedCat.specThickness !== "N/A" && (
                <div className="flex gap-4">
                  <div className="px-4 py-3" style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
                    <div className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Thickness Range</div>
                    <div className="font-bold text-white text-sm">{selectedCat.specThickness}</div>
                  </div>
                  <div className="px-4 py-3" style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
                    <div className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Tensile Strength</div>
                    <div className="font-bold text-white text-sm">{selectedCat.specTensile}</div>
                  </div>
                </div>
              )}
            </div>
            <div className="lg:col-span-2">
              <div className="text-[10px] font-bold uppercase tracking-widest mb-4 text-white/40">Salient Features</div>
              <ul className="space-y-2.5">
                {selectedCat.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                    <Phone size={13} className="flex-shrink-0 mt-0.5" style={{ color: ORANGE }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-14 px-6" style={{ backgroundColor: "#F4F6F9" }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-black mb-8" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}>
              {selectedCat.products.length} Products in this Category
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {selectedCat.products.map(product => (
                <div key={product.id} className="bg-white overflow-hidden group hover:shadow-xl transition-shadow duration-300 flex flex-col" style={{ borderTop: `3px solid ${ORANGE}` }}>
                  <div className="aspect-video overflow-hidden cursor-pointer" style={{ backgroundColor: "#c8cdd8" }} onClick={() => setSelectedProduct(product)}>
                    <img src={img(product.photo, 400, 250)} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-black text-sm mb-2 leading-tight cursor-pointer hover:underline" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }} onClick={() => setSelectedProduct(product)}>
                      {product.name}
                    </h3>
                    <p className="text-xs text-foreground/60 leading-relaxed mb-4 flex-1 line-clamp-3">{product.desc}</p>

                    <div className="flex items-end justify-between mb-4 pt-3 border-t border-border">
                      <div>
                        <div className="text-[9px] uppercase tracking-widest font-semibold text-muted-foreground mb-0.5">Price Range</div>
                        <div className="font-black text-sm" style={{ color: ORANGE, fontFamily: "'Montserrat', sans-serif" }}>{product.price}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] uppercase tracking-widest font-semibold text-muted-foreground mb-0.5">MOQ</div>
                        <div className="font-bold text-xs" style={{ color: NAVY }}>{product.moq}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => openWhatsApp(product)}
                        className="flex-1 py-2.5 text-[10px] font-bold uppercase tracking-wide transition-all flex items-center justify-center gap-2 rounded"
                        style={{
                          backgroundColor: "#25D366",
                          color: "white",
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        <Phone size={13} /> Inquire
                      </button>
                      <button
                        onClick={() => shareProductOnWhatsApp(product)}
                        className="px-3 py-2.5 text-[10px] font-bold uppercase tracking-wide transition-all flex items-center justify-center gap-1 rounded border-2"
                        style={{
                          borderColor: "#25D366",
                          color: "#25D366",
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        <Share2 size={13} />
                      </button>
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="px-3 py-2.5 border-2 transition-all hover:bg-primary hover:text-white hover:border-primary rounded"
                        style={{ borderColor: NAVY, color: NAVY }}
                        title="View Details"
                      >
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ── Category cards (main view) ──────────────────────────────────────────────
  return (
    <>
      <section className="py-24 px-6" style={{ backgroundColor: NAVY }}>
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Our Capabilities</SectionLabel>
          <h1 className="text-5xl md:text-6xl font-black text-white max-w-3xl leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Products &<br /><span style={{ color: ORANGE }}>Solutions</span>
          </h1>
          <p className="text-white/60 mt-4 max-w-xl text-sm leading-relaxed">
            Select a category to explore individual products with specifications and pricing.
          </p>
        </div>
      </section>

      <section className="py-14 px-6" style={{ backgroundColor: "#F4F6F9" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORY_DATA.map((cat) => (
              <div
                key={cat.id}
                className="bg-white overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300"
                style={{ borderTop: `3px solid ${ORANGE}` }}
                onClick={() => setSelectedCat(cat)}
              >
                <div className="aspect-video overflow-hidden" style={{ backgroundColor: "#c8cdd8" }}>
                  <img src={img(cat.photo, 600, 375)} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="font-black text-base mb-2 leading-tight" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}>{cat.name}</h3>
                  <p className="text-xs text-foreground/60 leading-relaxed mb-5">{cat.description.slice(0, 130)}…</p>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-xs font-semibold text-muted-foreground">{cat.products.length} products available</span>
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide" style={{ color: ORANGE, fontFamily: "'Montserrat', sans-serif" }}>
                      View Products <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Quality & Awards page ────────────────────────────────────────────────────

function QualityPage() {
  const pillars = [
    { n: "01", title: "Incoming Quality Control", desc: "100% raw material inspection with chemical composition analysis and mechanical property verification against mill certificates." },
    { n: "02", title: "In-Process SPC Monitoring", desc: "Statistical Process Control with Cpk monitoring at critical operations ensuring ongoing process stability and capability." },
    { n: "03", title: "Final Dimensional Inspection", desc: "Comprehensive verification using CMM, vision measurement systems, and functional gauges before every dispatch." },
    { n: "04", title: "Full Batch Traceability", desc: "Batch-level traceability from raw material to finished goods, supported by a digital quality management system." },
  ];

  const awards = [
    { year: "2023", title: "Preferred Supplier Award", body: "Recognised as Preferred Tier-2 Supplier by a leading automotive Tier-1 for consistent zero-PPM quality delivery." },
    { year: "2022", title: "Zero PPM Achievement", body: "Achieved zero parts-per-million defect rate for 18 consecutive months across all automotive component deliveries." },
    { year: "2021", title: "IATF 16949:2016 Recertification", body: "Successfully recertified with zero non-conformances raised in the independent third-party surveillance audit." },
    { year: "2020", title: "Delivery Excellence Award", body: "Awarded for 99.8% on-time delivery performance across 12 consecutive months during challenging supply chain conditions." },
    { year: "2018", title: "ISO 9001:2015 First Certification", body: "First-time ISO 9001:2015 certification achieved with commendation, establishing a foundation of global quality standards." },
  ];

  return (
    <>
      <section className="py-24 px-6" style={{ backgroundColor: NAVY }}>
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Certification & Recognition</SectionLabel>
          <h1 className="text-5xl md:text-6xl font-black text-white max-w-3xl leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Quality &<br /><span style={{ color: ORANGE }}>Awards</span>
          </h1>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Certifications</SectionLabel>
          <h2 className="text-4xl font-black mb-12" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}>Global Quality Standards</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {[
              { cert: "ISO 9001:2015", scope: "Quality Management System", detail: "Our ISO 9001:2015 certification covers the entire manufacturing value stream — from order review and design validation through production, inspection, and customer delivery. Annual surveillance audits by accredited certification bodies ensure continuous compliance." },
              { cert: "IATF 16949:2016", scope: "Automotive Quality Management", detail: "IATF 16949:2016 is the most rigorous automotive quality management standard, encompassing APQP, PPAP, FMEA, control plan, and MSA methodologies. It signals our readiness to supply directly to OEMs and Tier-1 manufacturers." },
            ].map(({ cert, scope, detail }) => (
              <div key={cert} className="p-8 border-t-4" style={{ backgroundColor: "#F4F6F9", borderColor: ORANGE }}>
                <div className="flex items-start gap-4 mb-4">
                  <Shield size={32} style={{ color: ORANGE }} />
                  <div>
                    <div className="font-black text-xl" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}>{cert}</div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest mt-1" style={{ color: `${NAVY}66` }}>{scope}</div>
                  </div>
                </div>
                <p className="text-sm text-foreground/65 leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>

          <SectionLabel>Our Framework</SectionLabel>
          <h2 className="text-4xl font-black mb-12" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}>Quality Assurance Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map(({ n, title, desc }) => (
              <div key={n}>
                <div className="text-7xl font-black leading-none mb-4" style={{ color: `${ORANGE}22`, fontFamily: "'Montserrat', sans-serif" }}>{n}</div>
                <h3 className="font-black text-sm mb-3" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}>{title}</h3>
                <p className="text-xs text-foreground/60 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ backgroundColor: NAVY }}>
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Recognition</SectionLabel>
          <h2 className="text-4xl font-black text-white mb-14" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Awards &amp; <span style={{ color: ORANGE }}>Milestones</span>
          </h2>
          <div className="relative">
            <div className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-white/10 hidden md:block" />
            <div className="space-y-10">
              {awards.map(({ year, title, body }) => (
                <div key={year} className="flex gap-8 items-start">
                  <div className="flex-shrink-0 w-16 text-right">
                    <span className="font-black text-base" style={{ color: ORANGE, fontFamily: "'Montserrat', sans-serif" }}>{year}</span>
                  </div>
                  <div className="hidden md:flex flex-shrink-0 w-8 items-center justify-center pt-1">
                    <div className="w-3 h-3 rounded-full border-2" style={{ backgroundColor: NAVY, borderColor: ORANGE }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Award size={14} style={{ color: ORANGE }} />
                      <h3 className="font-black text-sm text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>{title}</h3>
                    </div>
                    <p className="text-sm text-white/55 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Applications page ────────────────────────────────────────────────────────

function ApplicationsPage() {
  const apps = [
    { sector: "Automotive", icon: Car, photo: PHOTOS.engine, desc: "Our automotive components are engineered to meet IATF 16949 standards required by global OEMs, with full PPAP documentation and batch-level traceability.", items: ["Body-in-white stampings & closures", "Chassis and suspension brackets", "Powertrain mounting components", "Fuel and braking system parts", "Interior structural supports"] },
    { sector: "Aerospace", icon: Plane, photo: PHOTOS.aerospace, desc: "Aerospace-grade components manufactured with strict dimensional controls, raw material certifications, and First Article Inspection Reports (FAIRs) on request.", items: ["Structural airframe brackets", "Avionics and instrument enclosures", "Ground support equipment parts", "Interior structural panels", "Nacelle support components"] },
    { sector: "Telecommunications", icon: Radio, photo: PHOTOS.telecom, desc: "Heavy-duty galvanized and powder-coated components engineered for permanent outdoor deployment in extreme weather and corrosive environments.", items: ["Tower mounting hardware kits", "Equipment shelter enclosures", "Antenna brackets and support arms", "Cable tray and management systems", "Earthing and grounding assemblies"] },
    { sector: "Electrical & Electronics", icon: Zap, photo: PHOTOS.switchgear, desc: "Precision copper, brass, and steel components for LV/MV switchgear, metering, and control panel manufacturers across India.", items: ["Switchgear contacts and arc chutes", "Copper and aluminium bus bars", "MCB and RCCB housings", "Distribution board assemblies", "Control panel internal hardware"] },
  ];

  return (
    <>
      <section className="py-24 px-6" style={{ backgroundColor: NAVY }}>
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Where We Deliver</SectionLabel>
          <h1 className="text-5xl md:text-6xl font-black text-white max-w-3xl leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Real-World<br /><span style={{ color: ORANGE }}>Applications</span>
          </h1>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          {apps.map(({ sector, icon: Icon, photo, desc, items }, idx) => (
            <div key={sector} className={`grid lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
              <div style={{ direction: "ltr" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 flex items-center justify-center rounded-sm" style={{ backgroundColor: ORANGE }}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <SectionLabel>{sector} Sector</SectionLabel>
                </div>
                <h2 className="text-3xl font-black mb-4 leading-tight" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}>{sector} Applications</h2>
                <p className="text-sm text-foreground/65 leading-relaxed mb-6">{desc}</p>
                <ul className="space-y-2.5">
                  {items.map(item => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground/65">
                      <CheckCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: ORANGE }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aspect-[4/3] overflow-hidden" style={{ direction: "ltr", backgroundColor: "#c8cdd8" }}>
                <img src={img(photo, 800, 600)} alt={`${sector} applications`} className="w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// ─── Contact page ─────────────────────────────────────────────────────────────

function ContactPage() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", industry: "", message: "", file: null as File | null });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  const fieldClass = "w-full px-4 py-3 text-sm border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground transition-colors";

  return (
    <>
      <section className="py-24 px-6" style={{ backgroundColor: NAVY }}>
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Get in Touch</SectionLabel>
          <h1 className="text-5xl md:text-6xl font-black text-white max-w-3xl leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Contact &amp;<br /><span style={{ color: ORANGE }}>Request a Quote</span>
          </h1>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <SectionLabel>Corporate Office</SectionLabel>
            <h2 className="text-3xl font-black mb-8" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}>Reach Us Directly</h2>
            <div className="space-y-6 mb-10">
              {[
                { icon: MapPin, label: "Registered Address", content: <span className="text-sm text-foreground/65 leading-relaxed">No: B9, B10 &amp; P-5, ITI Industrial Area,<br />Mahadevapura, Bangalore – 560 048<br />Karnataka, India</span> },
                { icon: Phone, label: "Phone", content: <a href="tel:+919611372722" className="text-sm text-foreground/65 hover:text-accent transition-colors">+91-96113 72722</a> },
                { icon: Mail, label: "Email", content: <div><a href="mailto:info@maderu.in" className="block text-sm text-foreground/65 hover:text-accent transition-colors">info@maderu.in</a><a href="mailto:mayur@maderu.in" className="block text-sm text-foreground/65 hover:text-accent transition-colors">mayur@maderu.in</a></div> },
              ].map(({ icon: Icon, label, content }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-sm" style={{ backgroundColor: ORANGE }}>
                    <Icon size={17} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-xs uppercase tracking-widest mb-1" style={{ color: `${NAVY}88` }}>{label}</div>
                    {content}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-l-4" style={{ backgroundColor: "#F4F6F9", borderColor: ORANGE }}>
              <div className="flex items-center gap-3 mb-3">
                <Shield size={18} style={{ color: ORANGE }} />
                <span className="font-black text-sm" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}>Quality Certified Supplier</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="text-[10px] font-bold px-3 py-1.5 text-white tracking-wider" style={{ backgroundColor: NAVY }}>ISO 9001:2015</span>
                <span className="text-[10px] font-bold px-3 py-1.5 text-white tracking-wider" style={{ backgroundColor: ORANGE }}>IATF 16949:2016</span>
              </div>
            </div>
          </div>

          <div>
            <SectionLabel>RFQ Form</SectionLabel>
            <h2 className="text-3xl font-black mb-8" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}>Request for Quotation</h2>

            {submitted ? (
              <div className="p-10 text-center border-2" style={{ borderColor: ORANGE, backgroundColor: "#F4F6F9" }}>
                <CheckCircle size={48} className="mx-auto mb-4" style={{ color: ORANGE }} />
                <h3 className="font-black text-xl mb-2" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}>Enquiry Received!</h3>
                <p className="text-sm text-foreground/65 mb-6">Thank you. Our engineering team will respond within 24 business hours.</p>
                <button onClick={() => setSubmitted(false)} className="px-6 py-3 text-sm font-bold text-white" style={{ backgroundColor: ORANGE }}>Submit Another Enquiry</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: `${NAVY}99` }}>Full Name *</label>
                    <input required type="text" placeholder="John Smith" value={form.name} onChange={e => setForm(d => ({ ...d, name: e.target.value }))} className={fieldClass} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: `${NAVY}99` }}>Company *</label>
                    <input required type="text" placeholder="Acme Industries Ltd." value={form.company} onChange={e => setForm(d => ({ ...d, company: e.target.value }))} className={fieldClass} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: `${NAVY}99` }}>Email *</label>
                    <input required type="email" placeholder="john@company.com" value={form.email} onChange={e => setForm(d => ({ ...d, email: e.target.value }))} className={fieldClass} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: `${NAVY}99` }}>Phone</label>
                    <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(d => ({ ...d, phone: e.target.value }))} className={fieldClass} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: `${NAVY}99` }}>Industry Sector</label>
                  <select value={form.industry} onChange={e => setForm(d => ({ ...d, industry: e.target.value }))} className={fieldClass} style={{ backgroundColor: "white" }}>
                    <option value="">Select your industry</option>
                    <option>Automotive</option>
                    <option>Aerospace &amp; Defence</option>
                    <option>Telecommunications</option>
                    <option>Electrical &amp; Electronics</option>
                    <option>Engineering &amp; Fabrication</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: `${NAVY}99` }}>Requirements / Message *</label>
                  <textarea required rows={4} placeholder="Describe your component requirements, annual volumes, material specification, tolerance requirements..." value={form.message} onChange={e => setForm(d => ({ ...d, message: e.target.value }))} className={`${fieldClass} resize-none`} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: `${NAVY}99` }}>Attach Blueprint / Drawing</label>
                  <label className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-border cursor-pointer hover:border-accent transition-colors" style={{ backgroundColor: "#F4F6F9" }}>
                    <Upload size={16} style={{ color: ORANGE }} />
                    <span className="text-sm text-foreground/50">{form.file ? form.file.name : "Upload PDF, DWG, DXF, or STEP (max 10 MB)"}</span>
                    <input type="file" accept=".pdf,.dwg,.dxf,.step,.stp" className="hidden" onChange={e => setForm(d => ({ ...d, file: e.target.files?.[0] ?? null }))} />
                  </label>
                </div>
                <button type="submit" className="w-full py-4 flex items-center justify-center gap-2 font-bold uppercase tracking-wide text-sm text-white hover:opacity-90 active:scale-[0.99] transition-all" style={{ backgroundColor: ORANGE, fontFamily: "'Montserrat', sans-serif" }}>
                  <Send size={15} /> Submit Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Careers page ─────────────────────────────────────────────────────────────

function CareersPage() {
  const openings = [
    { title: "Tool Room Engineer", dept: "Manufacturing", exp: "3–6 years", type: "Full-time" },
    { title: "Quality Engineer (IATF / PPAP)", dept: "Quality Assurance", exp: "2–5 years", type: "Full-time" },
    { title: "Die Design Engineer", dept: "Engineering", exp: "4–8 years", type: "Full-time" },
    { title: "Production Supervisor – Press Shop", dept: "Operations", exp: "5–10 years", type: "Full-time" },
  ];

  return (
    <>
      <section className="py-24 px-6" style={{ backgroundColor: NAVY }}>
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Join Our Team</SectionLabel>
          <h1 className="text-5xl md:text-6xl font-black text-white max-w-3xl leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Build Your<br /><span style={{ color: ORANGE }}>Career</span> With Us
          </h1>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Open Positions</SectionLabel>
          <h2 className="text-3xl font-black mb-10" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}>Current Openings — Bangalore</h2>
          <div className="space-y-4">
            {openings.map(job => (
              <div key={job.title} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white border border-border hover:shadow-md transition-shadow gap-4">
                <div>
                  <h3 className="font-black text-sm mb-1" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}>{job.title}</h3>
                  <div className="flex flex-wrap gap-3 text-xs text-foreground/45">
                    <span>{job.dept}</span><span>·</span><span>{job.exp} experience</span><span>·</span><span>{job.type}</span>
                  </div>
                </div>
                <button className="flex-shrink-0 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90" style={{ backgroundColor: ORANGE, fontFamily: "'Montserrat', sans-serif" }}>
                  Apply Now
                </button>
              </div>
            ))}
          </div>
          <div className="mt-10 p-7 text-center border-t-4" style={{ backgroundColor: "#F4F6F9", borderColor: ORANGE }}>
            <p className="text-sm text-foreground/65 mb-3">Don't see a role that fits? We're always looking for talented engineers and manufacturing professionals.</p>
            <a href="mailto:info@maderu.in" className="font-bold text-sm" style={{ color: ORANGE }}>Send your CV to info@maderu.in</a>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const setPage = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":         return <HomePage setPage={setPage} />;
      case "about":        return <AboutPage />;
      case "products":     return <ProductsPage setPage={setPage} />;
      case "quality":      return <QualityPage />;
      case "applications": return <ApplicationsPage />;
      case "contact":      return <ContactPage />;
      case "careers":      return <CareersPage />;
      default:             return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Nav currentPage={currentPage} setPage={setPage} />
      <main className="flex-1">{renderPage()}</main>
      <Footer setPage={setPage} />
    </div>
  );
}
