import { useState, useMemo, useEffect } from "react";
import { FaUser, FaCalendarAlt, FaClock, FaEye } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL;

// ─── DATA ────────────────────────────────────────────────────────────────────
const FALLBACK_POSTS = [
  {
    id: 1, featured: true,
    title: "PM Surya Ghar Subsidy Guide 2025 — Complete Walkthrough",
    excerpt: "Everything you need to know about claiming up to ₹78,000 government subsidy under PM Surya Ghar Muft Bijli Yojana. Step-by-step process, documents needed, and timeline.",
    category: "Government Schemes", author: "Admin", date: "01 May 2025",
    views: 4821, readTime: "8 min",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
    bg: "from-[#0B1F3A] to-[#1a3a6b]",
    tags: ["subsidy", "MNRE", "PM Surya Ghar", "government"],
    content: `<h2>What is PM Surya Ghar Muft Bijli Yojana?</h2>
      <p>Launched in February 2024, PM Surya Ghar Muft Bijli Yojana is India's largest rooftop solar scheme. It aims to provide free electricity to 1 crore households and offers a central government subsidy of up to ₹78,000 for installing a 3 kW system.</p>
      <div class="highlight-box"><p>Under this scheme, a family with a 3 kW solar system can get 300 units of free electricity every month — meaning a near-zero electricity bill for 25 years!</p></div>
      <h2>How Much Subsidy Can You Get?</h2>
      <p>The subsidy amount depends on your system size:</p>
      <ul><li><strong>1 kW:</strong> ₹30,000 subsidy</li><li><strong>2 kW:</strong> ₹60,000 subsidy</li><li><strong>3 kW and above:</strong> ₹78,000 (maximum)</li></ul>
      <p>This is the central government subsidy. Many states like Uttar Pradesh, Rajasthan, and Gujarat offer additional state-level subsidies on top of this amount.</p>
      <h2>Documents Required</h2>
      <ul><li>Aadhaar Card (mandatory)</li><li>Recent electricity bill (last 3 months)</li><li>Bank account details (for direct benefit transfer)</li><li>Roof ownership or landlord's NOC</li><li>Passport-size photograph</li></ul>
      <div class="highlight-box"><p>Urban Energy has successfully processed ₹12 crore+ in government subsidies for 5000+ customers. We handle 100% of the paperwork — you just enjoy free electricity!</p></div>`,
  },
  {
    id: 2, featured: false,
    title: "Top 5 Solar Panel Brands in India 2025 — Honest Review",
    excerpt: "We tested and compared the best solar panels available in India. From efficiency ratings to warranty terms — here is what actually matters.",
    category: "Product Reviews", author: "Admin", date: "24 Apr 2025",
    views: 3104, readTime: "6 min",
    image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1200&q=80",
    bg: "from-[#1a3a6b] to-[#2d5a9e]",
    tags: ["reviews", "panels", "brands", "efficiency"],
    content: `<h2>How We Evaluated These Panels</h2>
      <p>We assessed each brand across five parameters: efficiency, warranty, price-to-performance, availability of service centres in India, and customer satisfaction scores from our 5000+ installations.</p>
      <h2>The Top 5 Brands</h2>
      <ul><li><strong>Waaree Energies</strong> — India's #1 exporter. Best value for money with 22%+ efficiency mono-PERC panels.</li><li><strong>Adani Solar</strong> — Premium quality with strong after-sales support across India.</li><li><strong>Vikram Solar</strong> — Excellent for commercial projects with high-power TOPCon modules.</li><li><strong>Loom Solar</strong> — Best for small residential (1–3 kW) with affordable bifacial panels.</li><li><strong>Tata Power Solar</strong> — Most trusted brand name with pan-India service network.</li></ul>
      <div class="highlight-box"><p>Our recommendation: For residential 3–5 kW systems in UP, Waaree or Loom Solar offer the best value. For commercial 10 kW+, Adani or Vikram Solar is the clear choice.</p></div>`,
  },
  {
    id: 3, featured: false,
    title: "How Net Metering Works in Uttar Pradesh — Full Guide",
    excerpt: "Net metering lets you sell excess solar power back to UPPCL and earn credits. Here is exactly how it works and how to get connected.",
    category: "Solar Education", author: "Admin", date: "18 Apr 2025",
    views: 2567, readTime: "7 min",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80",
    bg: "from-[#0f3460] to-[#16213e]",
    tags: ["net metering", "UPPCL", "UP", "grid"],
    content: `<h2>What is Net Metering?</h2>
      <p>Net metering is a billing mechanism that allows solar panel owners to feed excess electricity back into the grid. You receive credits for every unit exported, which are adjusted against your regular electricity bill.</p>
      <div class="highlight-box"><p>Example: If your solar panels generate 400 units and you use only 300 units, the remaining 100 units go to the UPPCL grid. Your bill shows a credit of 100 units × ₹7.5 = ₹750.</p></div>
      <h2>Net Metering Process in UP</h2>
      <ul><li>Step 1: Submit net metering application to UPPCL through the Urban Energy portal</li><li>Step 2: UPPCL site inspection (typically within 7 days)</li><li>Step 3: Bidirectional meter installation by UPPCL</li><li>Step 4: System energisation and commissioning</li></ul>
      <h2>How Long Does It Take?</h2>
      <p>In urban areas of UP (Lucknow, Kanpur, Agra), the DISCOM typically completes net metering within 15–30 days of application. Rural areas may take 30–45 days.</p>`,
  },
  {
    id: 4, featured: false,
    title: "Solar ROI Calculator — How to Compute Your Exact Savings",
    excerpt: "Learn the exact formula to calculate your solar return on investment, payback period, and 25-year savings. Includes a worked example for a Lucknow household.",
    category: "How-To Guides", author: "Admin", date: "10 Apr 2025",
    views: 1908, readTime: "5 min",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    bg: "from-[#134e4a] to-[#0f3460]",
    tags: ["calculator", "ROI", "savings", "kW"],
    content: `<h2>The Solar ROI Formula</h2>
      <p>Calculating solar ROI is simpler than you think. You need just three numbers: system cost, annual savings, and subsidy amount.</p>
      <div class="highlight-box"><p>Payback Period = (System Cost – Subsidy) ÷ Annual Savings</p></div>
      <h2>Worked Example — 5 kW System in Lucknow</h2>
      <ul><li>System cost: ₹2,75,000</li><li>Subsidy (40% for 3 kW): ₹78,000</li><li>Net cost: ₹1,97,000</li><li>Monthly savings: ₹4,500 (₹54,000/year)</li><li>Payback period: 1,97,000 ÷ 54,000 = <strong>3.6 years</strong></li><li>25-year savings: ₹54,000 × 25 = <strong>₹13.5 lakhs!</strong></li></ul>`,
  },
  {
    id: 5, featured: false,
    title: "Rajesh's Story — From ₹7,000 Bills to ₹400 With Solar",
    excerpt: "Rajesh Kumar from Lucknow shares his honest experience of going solar with Urban Energy — the process, the savings, and what he wishes he had known earlier.",
    category: "Success Stories", author: "Admin", date: "05 Apr 2025",
    views: 1650, readTime: "4 min",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    bg: "from-[#3d1f00] to-[#7c3a00]",
    tags: ["success story", "Lucknow", "residential", "savings"],
    content: `<h2>The Problem — ₹7,000 Monthly Bill</h2>
      <p>"Before solar, I was paying ₹6,500 to ₹7,200 every month to UPPCL," says Rajesh Kumar, a teacher from Gomti Nagar, Lucknow. "With 3 ACs running in summer, the bills were destroying my budget."</p>
      <div class="highlight-box"><p>After subsidy, Rajesh paid just ₹1,82,000 for his 6 kW system. His current monthly electricity bill is ₹380–420. Payback in 3.1 years.</p></div>
      <h2>6 Months Later</h2>
      <p>"I've saved ₹38,000 in 6 months. The Urban Energy app shows me real-time production. I genuinely regret not doing this 3 years ago."</p>`,
  },
  {
    id: 6, featured: false,
    title: "5 Signs Your Solar Inverter Needs Servicing Right Now",
    excerpt: "Is your solar system underperforming? These warning signs mean your inverter needs immediate attention. Catch them early to avoid costly breakdowns.",
    category: "How-To Guides", author: "Admin", date: "28 Mar 2025",
    views: 1320, readTime: "4 min",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
    bg: "from-[#1e3a5f] to-[#0d2137]",
    tags: ["inverter", "maintenance", "AMC", "tips"],
    content: `<h2>Why Inverter Health Matters</h2>
      <p>Your inverter is the brain of your solar system. A faulty inverter can silently reduce your energy generation by 20–40% without triggering any obvious alarm.</p>
      <h2>Warning Signs to Watch For</h2>
      <ul><li><strong>Error codes on display:</strong> Any red light or error code needs immediate attention from a technician.</li><li><strong>Production drop:</strong> If your app shows generation 15%+ lower than usual on a sunny day, the inverter may be throttling.</li><li><strong>Unusual noise:</strong> Clicking or buzzing beyond normal fan noise indicates a hardware issue.</li><li><strong>Overheating:</strong> Inverters should be warm but never too hot to touch.</li><li><strong>Frequent restarts:</strong> If the inverter reboots more than once per week, schedule a service visit immediately.</li></ul>
      <div class="highlight-box"><p>Urban Energy's AMC plan includes quarterly system health checks, remote monitoring alerts, and free inverter servicing.</p></div>`,
  },
  {
    id: 7, featured: false,
    title: "Hybrid vs On-Grid Solar — Which One Should You Choose in 2025?",
    excerpt: "Both systems save money, but one is dramatically better for most Indian households. We break down the difference, costs, and best use case for each.",
    category: "Solar Education", author: "Admin", date: "20 Mar 2025",
    views: 1180, readTime: "5 min",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    bg: "from-[#2d1654] to-[#0f3460]",
    tags: ["hybrid", "on-grid", "comparison", "battery"],
    content: `<h2>On-Grid Solar</h2>
      <p>On-grid systems connect directly to the DISCOM grid. They are cheaper, simpler, and eligible for full net metering credits. However, they shut down during power cuts for safety reasons.</p>
      <h2>Hybrid Solar</h2>
      <p>Hybrid systems add battery storage. You get power during outages, maximise self-consumption, and reduce grid dependence to near-zero. But they cost 35–50% more than on-grid systems.</p>
      <div class="highlight-box"><p>Our recommendation: If your area has reliable power supply (&lt;2 hours daily cuts), go on-grid. For frequent outages, hybrid is worth every rupee.</p></div>`,
  },
  {
    id: 8, featured: false,
    title: "Solar Panels in Monsoon — What Really Happens?",
    excerpt: "Does solar work during rain? What about cloudy days? We share actual production data from 100 installations across UP during the 2024 monsoon season.",
    category: "Solar Education", author: "Admin", date: "10 Mar 2025",
    views: 980, readTime: "5 min",
    image: "https://images.unsplash.com/photo-1500674425229-f692875b0ab7?auto=format&fit=crop&w=1200&q=80",
    bg: "from-[#1a4a6b] to-[#0d2137]",
    tags: ["monsoon", "weather", "production", "UP"],
    content: `<h2>The Short Answer</h2>
      <p>Yes, solar panels work during monsoon — just at lower output. Based on data from 100 systems we monitor in UP, panels produce 20–35% of their peak output during heavy overcast days.</p>
      <h2>Real Production Data — Lucknow 2024 Monsoon</h2>
      <ul><li>Clear summer days: 5.2–5.8 kWh per kW installed</li><li>Cloudy monsoon days: 1.0–1.8 kWh per kW installed</li><li>Rainy days: 0.6–1.2 kWh per kW installed</li></ul>
      <div class="highlight-box"><p>A 5 kW system in Lucknow generates an average of 6,200 units per year — monsoon months included. Our ROI projections already account for seasonal variation.</p></div>`,
  },
];

const CATEGORIES = ["All Posts", "Government Schemes", "Solar Education", "How-To Guides", "Product Reviews", "Success Stories"];
const TAGS = ["solar", "subsidy", "rooftop", "net metering", "battery", "UP", "inverter", "savings", "MNRE", "kW system"];

// ─── TOAST ───────────────────────────────────────────────────────────────────
function Toast({ msg, visible }) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0B1F3A] text-white px-5 py-3 rounded-xl border-l-4 border-[#FF7A00] text-sm font-semibold shadow-2xl transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}>
      <span>✓</span> {msg}
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Navbar({ onNavClick }) {
  return (
    <nav className="sticky top-0 z-40 bg-[#0B1F3A] border-b border-[#FF7A00]/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        <button onClick={() => onNavClick("home")} className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF7A00] to-[#FFC107] flex items-center justify-center text-white text-xs font-black">UE</div>
          <span className="font-black text-white text-base tracking-tight">Urban <span className="text-[#FF7A00]">Energy</span></span>
        </button>
        <div className="hidden md:flex items-center gap-7">
          {["Home", "Services", "Calculator", "Blog", "Contact"].map(l => (
            <a key={l} href="#" className={`text-sm font-medium transition-colors ${l === "Blog" ? "text-[#FF7A00]" : "text-white/60 hover:text-[#FF7A00]"}`}>{l}</a>
          ))}
        </div>
        <button className="bg-[#FF7A00] hover:bg-[#e86e00] text-white text-sm font-bold px-5 py-2 rounded-lg transition-colors">
          Free Quote
        </button>
      </div>
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero({ totalPosts }) {
  return (
    <div className="relative bg-gradient-to-br from-[#0B1F3A] to-[#1a3a6b] overflow-hidden">
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-[#FF7A00]/10 blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-5 py-10 md:py-12 flex justify-center">
        <div className="max-w-2xl flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 bg-[#FF7A00]/15 border border-[#FF7A00]/30 text-[#FF7A00] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            ☀ Solar Knowledge Hub
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-[1.08] tracking-tighter mb-4">
            Learn. Save.<br />
            <span className="bg-gradient-to-r from-[#FF7A00] to-[#FFC107] bg-clip-text text-transparent">Go Solar.</span>
          </h1>
          <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-lg mb-8">
            Expert guides, government scheme updates, and real solar savings stories — everything you need to make the switch.
          </p>
          <div className="flex gap-8 pt-6 border-t border-white/10 w-full justify-center">
            {[{ n: totalPosts, l: "Articles Published" }, { n: "24.8K", l: "Monthly Readers" }, { n: "7", l: "Categories" }].map(s => (
              <div key={s.l} className="text-center">
                <div className="text-2xl font-black text-[#FF7A00]">{s.n}</div>
                <div className="text-[11px] text-white/45 mt-0.5 uppercase tracking-wider">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FEATURED CARD ───────────────────────────────────────────────────────────
function FeaturedCard({ post, onClick }) {
  return (
    <div
      onClick={() => onClick(post)}
      className="group bg-white border border-slate-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 mb-6"
    >
      {/* KEY FIX: position:relative on container, img is absolute inset-0 */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* gradient overlay ON TOP of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/70 via-transparent to-transparent" />
        {/* badges ON TOP of overlay */}
        <span className="absolute top-4 left-4 z-10 bg-[#FF7A00] text-white text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1.5">⭐ Featured</span>
        <span className="absolute top-4 right-4 z-10 bg-[#0B1F3A]/70 backdrop-blur-sm text-[#FFC107] text-[10px] font-bold px-3 py-1.5 rounded-full">{post.category}</span>
      </div>

      <div className="p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-black text-[#0B1F3A] leading-tight mb-3 group-hover:text-[#FF7A00] transition-colors">{post.title}</h2>
        <p className="text-slate-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mb-5">
          <span className="flex items-center gap-1"><FaUser className="text-[10px]" /> {post.author}</span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span className="flex items-center gap-1"><FaCalendarAlt className="text-[10px]" /> {post.date}</span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span className="flex items-center gap-1"><FaClock className="text-[10px]" /> {post.readTime} read</span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span className="flex items-center gap-1"><FaEye className="text-[10px]" /> {post.views.toLocaleString("en-IN")}</span>
        </div>
        <span className="inline-flex items-center gap-2 text-[#FF7A00] font-bold text-sm group-hover:gap-3 transition-all">
          Read Article →
        </span>
      </div>
    </div>
  );
}

// ─── BLOG CARD ───────────────────────────────────────────────────────────────
function BlogCard({ post, onClick }) {
  return (
    <div
      onClick={() => onClick(post)}
      className="group bg-white border border-slate-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* KEY FIX: same pattern — relative container, absolute image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 z-10 bg-[#0B1F3A]/75 backdrop-blur-sm text-[#FFC107] text-[10px] font-bold px-2.5 py-1 rounded-full">{post.category}</span>
      </div>

      <div className="p-4 md:p-5">
        <div className="flex gap-1.5 flex-wrap mb-2.5">
          {(post.tags || []).slice(0, 2).map(t => (
            <span key={t} className="bg-[#FF7A00]/10 text-[#FF7A00] text-[10px] font-bold px-2 py-0.5 rounded">{t}</span>
          ))}
        </div>
        <h3 className="text-sm md:text-base font-black text-[#0B1F3A] leading-snug mb-2 group-hover:text-[#FF7A00] transition-colors line-clamp-2">{post.title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FFC107] flex items-center justify-center text-white text-[8px] font-black">A</div>
            <span className="text-[11px] text-slate-400">{post.author} · {post.date}</span>
          </div>
          <span className="text-[11px] text-slate-400 flex items-center gap-1"><FaEye className="text-[9px]" /> {post.views.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </div>
  );
}

// ─── DETAIL VIEW ─────────────────────────────────────────────────────────────
function DetailView({ post, allPosts, onBack, onOpen, showToast }) {
  const related = allPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2);
  return (
    <div className="animate-fade-in">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 bg-white border border-slate-200 text-[#0B1F3A] font-bold text-sm px-4 py-2.5 rounded-xl mb-6 hover:border-[#FF7A00] hover:text-[#FF7A00] transition-all"
      >
        ← Back to Blog
      </button>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-8">
        {/* KEY FIX: detail hero image */}
        <div className="relative h-80 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/50 via-transparent to-transparent" />
        </div>

        <div className="px-6 md:px-8 py-5 border-b border-slate-100 flex flex-wrap items-center gap-4">
          <span className="bg-[#FF7A00]/10 text-[#FF7A00] text-xs font-bold px-3 py-1 rounded-full">{post.category}</span>
          <span className="text-xs text-slate-400 flex items-center gap-1"><FaCalendarAlt className="text-[10px]" /> {post.date}</span>
          <span className="text-xs text-slate-400 flex items-center gap-1"><FaClock className="text-[10px]" /> {post.readTime} read</span>
          <span className="text-xs text-slate-400 flex items-center gap-1"><FaEye className="text-[10px]" /> {post.views.toLocaleString("en-IN")} views</span>
        </div>

        <div className="px-6 md:px-8 py-8">
          <h1 className="text-2xl md:text-3xl font-black text-[#0B1F3A] leading-tight mb-4">{post.title}</h1>
          <p className="text-base text-slate-500 leading-relaxed mb-6 font-normal">{post.excerpt}</p>
          <div className="prose-custom" dangerouslySetInnerHTML={{ __html: post.content }} />
          <div className="flex gap-2 flex-wrap mt-8 pt-6 border-t border-slate-100">
            {(post.tags || []).map(t => (
              <span key={t} className="bg-[#FF7A00]/10 text-[#FF7A00] text-xs font-bold px-3 py-1 rounded">#{t}</span>
            ))}
          </div>
        </div>

        <div className="px-6 md:px-8 py-5 bg-slate-50 border-t border-slate-100 flex items-center gap-3 flex-wrap">
          <span className="text-sm font-bold text-[#0B1F3A]">Share:</span>
          {["🔗 Copy Link", "💬 WhatsApp", "📘 Facebook"].map(btn => (
            <button
              key={btn}
              onClick={() => showToast(btn === "🔗 Copy Link" ? "Link copied!" : `Sharing on ${btn.split(" ")[1]}...`)}
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-[#0B1F3A] hover:border-[#FF7A00] hover:text-[#FF7A00] transition-all"
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <h3 className="text-lg font-black text-[#0B1F3A] mb-5">Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {related.map(p => <BlogCard key={p.id} post={p} onClick={onOpen} />)}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({ posts, onSearch, onOpen, showToast }) {
  const [email, setEmail] = useState("");
  const recent = [...posts].sort((a, b) => b.id - a.id).slice(0, 4);
  const cats = {};
  posts.forEach(p => { cats[p.category] = (cats[p.category] || 0) + 1; });

  return (
    <aside className="flex flex-col gap-5">
      {/* Newsletter */}
      <div className="relative bg-gradient-to-br from-[#0B1F3A] to-[#1a3a6b] rounded-2xl p-6 overflow-hidden text-center">
        <div className="absolute -top-16 -right-10 w-40 h-40 rounded-full bg-[#FF7A00]/10 blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <div className="text-2xl mb-2">☀</div>
          <h4 className="text-white font-black text-base mb-2">Solar Weekly</h4>
          <p className="text-white/55 text-xs leading-relaxed mb-4">Get latest solar tips, subsidy updates & savings guides directly in your inbox.</p>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full bg-white/[0.08] border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/40 outline-none focus:border-[#FF7A00] mb-2.5 transition-colors"
          />
          <button
            onClick={() => { showToast("Subscribed! Welcome to Solar Weekly."); setEmail(""); }}
            className="w-full bg-[#FF7A00] hover:bg-[#e86e00] text-white font-bold text-sm py-2.5 rounded-lg transition-colors"
          >
            Subscribe Free →
          </button>
        </div>
      </div>

      {/* Recent Posts — KEY FIX: thumbnails with absolute image pattern */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <h4 className="text-sm font-black text-[#0B1F3A] pb-2 border-b-2 border-[#FF7A00] inline-block">Recent Posts</h4>
        <div className="mt-4 flex flex-col">
          {recent.map(p => (
            <button key={p.id} onClick={() => onOpen(p)} className="flex gap-3 py-3 border-b border-slate-100 last:border-0 hover:opacity-70 transition-opacity text-left">
              <div className="relative w-14 h-11 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-bold text-[#0B1F3A] leading-snug line-clamp-2 mb-0.5">{p.title}</p>
                <span className="text-[11px] text-slate-400">{p.date} · {p.readTime} read</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <h4 className="text-sm font-black text-[#0B1F3A] pb-2 border-b-2 border-[#FF7A00] inline-block">Categories</h4>
        <div className="mt-4">
          {Object.entries(cats).map(([cat, count]) => (
            <button
              key={cat}
              onClick={() => onSearch(cat)}
              className="flex justify-between items-center w-full py-2.5 border-b border-slate-100 last:border-0 hover:opacity-70 transition-opacity group"
            >
              <span className="text-sm font-semibold text-[#0B1F3A] group-hover:text-[#FF7A00] transition-colors">{cat}</span>
              <span className="bg-[#FF7A00]/10 text-[#FF7A00] text-[11px] font-bold px-2.5 py-0.5 rounded-full">{count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tag Cloud */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <h4 className="text-sm font-black text-[#0B1F3A] pb-2 border-b-2 border-[#FF7A00] inline-block">Popular Tags</h4>
        <div className="mt-4 flex flex-wrap gap-2">
          {TAGS.map(t => (
            <button
              key={t}
              onClick={() => onSearch(t)}
              className="bg-slate-100 hover:bg-[#FF7A00] text-slate-500 hover:text-white border border-slate-200 hover:border-[#FF7A00] text-xs font-semibold px-3 py-1.5 rounded-md transition-all"
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-[#FF7A00] to-[#ff9500] rounded-2xl p-6 text-center">
        <div className="text-white font-black text-base mb-2">Calculate Your Savings</div>
        <div className="text-white/75 text-xs leading-relaxed mb-4">Find out exactly how much you can save with rooftop solar.</div>
        <button
          onClick={() => showToast("Opening Solar Calculator...")}
          className="w-full bg-white text-[#FF7A00] font-black text-sm py-2.5 rounded-lg hover:bg-orange-50 transition-colors"
        >
          Try Calculator →
        </button>
      </div>
    </aside>
  );
}

// ─── PAGINATION ──────────────────────────────────────────────────────────────
function Pagination({ current, total, onChange }) {
  if (total <= 1) return null;
  return (
    <div className="flex justify-center gap-2 mt-10">
      {Array.from({ length: total }, (_, i) => i + 1).map(n => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${n === current ? "bg-[#FF7A00] text-white" : "bg-white border border-slate-200 text-slate-400 hover:border-[#FF7A00] hover:text-[#FF7A00]"}`}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

// ─── FILTER BAR ──────────────────────────────────────────────────────────────
function FilterBar({ activeFilter, setFilter, sort, setSort }) {
  return (
    <div className="flex items-center justify-between mb-7 flex-wrap gap-3">
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat === "All Posts" ? "all" : cat)}
            className={`px-4 py-2 rounded-full border text-xs font-bold transition-all ${
              (activeFilter === "all" && cat === "All Posts") || activeFilter === cat
                ? "bg-[#FF7A00] border-[#FF7A00] text-white"
                : "bg-white border-slate-200 text-slate-500 hover:border-[#FF7A00] hover:text-[#FF7A00]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <select
        value={sort}
        onChange={e => setSort(e.target.value)}
        className="px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-500 bg-white outline-none cursor-pointer hover:border-[#FF7A00] transition-colors"
      >
        <option value="newest">Newest First</option>
        <option value="views">Most Viewed</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [POSTS, setPOSTS] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [activePost, setActivePost] = useState(null);
  const [toast, setToast] = useState({ visible: false, msg: "" });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API}/blog`);
        const data = await res.json();
        if (data.success && data.data) {
          const blogs = data.data.map(b => ({
            id: b._id,
            featured: b.featured || false,
            title: b.title,
            excerpt: b.excerpt,
            category: b.category,
            author: b.author || 'Admin',
            date: new Date(b.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            views: b.views || 0,
            readTime: b.readTime || '5 min',
            image: b.image,
            tags: b.tags || [],
            content: b.content
          }));
          setPOSTS(blogs);
        } else {
          setPOSTS(FALLBACK_POSTS);
        }
      } catch (err) {
        console.error('Blog fetch error:', err);
        setPOSTS(FALLBACK_POSTS);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const showToast = (msg) => {
    setToast({ visible: true, msg });
    setTimeout(() => setToast({ visible: false, msg: "" }), 2800);
  };

  const handleSearch = (q) => { setSearch(q); setPage(1); setFilter("all"); };
  const handleFilter = (f) => { setFilter(f); setPage(1); setSearch(""); };

  const filtered = useMemo(() => {
    let posts = [...POSTS];
    if (filter !== "all") posts = posts.filter(p => p.category === filter);
    if (search) {
      const q = search.toLowerCase();
      posts = posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.tags || []).some(t => t.toLowerCase().includes(q))
      );
    }
    if (sort === "views") posts.sort((a, b) => b.views - a.views);
    else if (sort === "oldest") posts.sort((a, b) => a.id - b.id);
    else posts.sort((a, b) => b.id - a.id);
    return posts;
  }, [POSTS, filter, sort, search]);

  const featured = filter === "all" && !search && page === 1 ? filtered.find(p => p.featured) || filtered[0] : null;
  const gridPosts = featured ? filtered.filter(p => p.id !== featured.id) : filtered;
  const totalPages = Math.ceil(gridPosts.length / POSTS_PER_PAGE);
  const paginated = gridPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const openPost = (p) => { setActivePost(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const closePost = () => { setActivePost(null); window.scrollTo({ top: 0, behavior: "smooth" }); };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">☀</div>
          <p className="text-slate-500 font-semibold">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC]" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        .prose-custom h2{font-size:1.2rem;font-weight:800;color:#0B1F3A;margin:1.5rem 0 0.6rem;letter-spacing:-0.3px}
        .prose-custom p{font-size:0.9rem;color:#374151;line-height:1.85;margin-bottom:0.9rem}
        .prose-custom ul{padding-left:1.2rem;margin-bottom:0.9rem}
        .prose-custom li{font-size:0.9rem;color:#374151;line-height:1.8;margin-bottom:0.3rem}
        .prose-custom strong{font-weight:700;color:#0B1F3A}
        .prose-custom .highlight-box{background:linear-gradient(135deg,rgba(255,122,0,0.06),rgba(255,193,7,0.04));border:1px solid rgba(255,122,0,0.2);border-left:4px solid #FF7A00;border-radius:0 12px 12px 0;padding:14px 18px;margin:1rem 0}
        .prose-custom .highlight-box p{color:#0B1F3A;font-weight:500;margin:0}
        .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .animate-fade-in{animation:fadeIn 0.35s ease both}
      `}</style>

      <Navbar onNavClick={() => { setActivePost(null); setSearch(""); setFilter("all"); }} />
      <Hero totalPosts={POSTS.length} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-8 items-start">
          <main>
            {activePost ? (
              <DetailView post={activePost} allPosts={POSTS} onBack={closePost} onOpen={openPost} showToast={showToast} />
            ) : (
              <div className="animate-fade-in">
                <FilterBar activeFilter={filter} setFilter={handleFilter} sort={sort} setSort={v => { setSort(v); setPage(1); }} />
                {filtered.length === 0 ? (
                  <div className="text-center py-20 text-slate-400">
                    <div className="text-5xl opacity-40 mb-4">☀</div>
                    <p className="font-bold text-base mb-1">No posts found</p>
                    <p className="text-sm">Try a different search or category filter.</p>
                  </div>
                ) : (
                  <>
                    {featured && <FeaturedCard post={featured} onClick={openPost} />}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {paginated.map(p => <BlogCard key={p.id} post={p} onClick={openPost} />)}
                    </div>
                    <Pagination current={page} total={totalPages} onChange={n => { setPage(n); window.scrollTo({ top: 400, behavior: "smooth" }); }} />
                  </>
                )}
              </div>
            )}
          </main>

          <div className="hidden lg:block sticky top-20">
            <Sidebar posts={POSTS} onSearch={handleSearch} onOpen={openPost} showToast={showToast} />
          </div>
        </div>
      </div>

      <Toast msg={toast.msg} visible={toast.visible} />
    </div>
  );
}
