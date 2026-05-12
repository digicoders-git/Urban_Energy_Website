import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Building2, TrendingUp, Leaf, ShieldCheck, CheckCircle2, Sun,
  Zap, BarChart3, ChevronDown, ArrowRight, IndianRupee, Star, Factory
} from 'lucide-react'

const fw = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.6, delay },
})

const stats = [
  { val: '10 kW', label: 'Minimum System' },
  { val: '5 MW+', label: 'Largest Project' },
  { val: '3–5 Yrs', label: 'Payback Period' },
  { val: '40%', label: 'Tax Depreciation' },
]

const benefits = [
  { icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50', title: 'Fastest ROI in Industry', desc: 'Commercial solar delivers 20–30% IRR with payback in 3–5 years. After that, 20+ years of near-free electricity.' },
  { icon: IndianRupee, color: 'text-orange', bg: 'bg-orange/10', title: '40% Accelerated Depreciation', desc: 'Claim 40% accelerated depreciation in Year 1 under the Income Tax Act — a massive tax benefit for businesses.' },
  { icon: Leaf, color: 'text-emerald-600', bg: 'bg-emerald-50', title: 'ESG & CSR Compliance', desc: 'Meet your corporate sustainability targets, reduce Scope 2 emissions, and strengthen your ESG reporting.' },
  { icon: ShieldCheck, color: 'text-solarsky', bg: 'bg-solarsky/10', title: 'Hedge Against Tariff Hikes', desc: 'Lock in your energy cost at near-zero for 25 years. No more worrying about annual electricity tariff increases.' },
  { icon: BarChart3, color: 'text-purple-600', bg: 'bg-purple-50', title: 'SCADA Monitoring', desc: 'Real-time plant performance monitoring via SCADA dashboard — track generation, PR ratio, and savings 24/7.' },
  { icon: Zap, color: 'text-navy', bg: 'bg-navy/10', title: 'Grid Independence', desc: 'Reduce peak demand charges and dependency on the grid. Pair with battery storage for complete energy security.' },
]

const industries = [
  { name: 'Manufacturing & Factories', desc: 'High daytime loads make factories ideal for solar. Offset peak demand charges significantly.' },
  { name: 'IT Parks & Offices', desc: 'Power air conditioning, servers, and lighting with clean solar energy during business hours.' },
  { name: 'Hotels & Hospitality', desc: 'Reduce operational costs and market your property as eco-friendly to attract premium guests.' },
  { name: 'Hospitals & Healthcare', desc: 'Ensure reliable, clean power for critical equipment while cutting energy costs by 40–60%.' },
  { name: 'Educational Institutions', desc: 'Schools and colleges benefit from solar during peak daytime hours when students are present.' },
  { name: 'Retail & Shopping Malls', desc: 'Massive rooftop areas and high AC loads make retail properties perfect for large solar plants.' },
  { name: 'Cold Storage & Logistics', desc: 'Refrigeration runs 24/7 — solar with battery backup dramatically cuts cold storage energy bills.' },
  { name: 'Textile & Garment Mills', desc: 'Power looms, compressors, and lighting with solar. Reduce per-unit production cost significantly.' },
]

const epcSteps = [
  { num: '01', title: 'Site Feasibility Study', desc: 'Shadow analysis, structural load assessment, grid connectivity check, and detailed energy audit of your facility.' },
  { num: '02', title: 'System Design & Engineering', desc: 'Single-line diagrams, 3D layout, string sizing, inverter selection, and yield simulation using PVsyst software.' },
  { num: '03', title: 'Procurement & Supply', desc: 'Tier-1 panels, commercial-grade inverters, mounting structures, and all BOS components sourced and quality-checked.' },
  { num: '04', title: 'Civil & Electrical Works', desc: 'Foundation work, mounting installation, cable laying, earthing, lightning protection, and panel commissioning.' },
  { num: '05', title: 'DISCOM & Net Metering', desc: 'Complete handling of DISCOM approvals, net metering application, synchronisation, and grid commissioning.' },
  { num: '06', title: 'O&M & Performance Guarantee', desc: 'Annual O&M contract with performance guarantee, SCADA monitoring, and quarterly performance reports.' },
]

const roiData = [
  { size: '50 kW', cost: '₹28–32 L', saving: '₹5–6 L/yr', payback: '5–6 yrs', units: '72,000 units/yr' },
  { size: '100 kW', cost: '₹55–60 L', saving: '₹10–12 L/yr', payback: '4–5 yrs', units: '1,44,000 units/yr' },
  { size: '250 kW', cost: '₹1.2–1.4 Cr', saving: '₹25–30 L/yr', payback: '4–5 yrs', units: '3,60,000 units/yr' },
  { size: '500 kW', cost: '₹2.2–2.5 Cr', saving: '₹50–60 L/yr', payback: '4 yrs', units: '7,20,000 units/yr' },
  { size: '1 MW', cost: '₹4–4.5 Cr', saving: '₹1–1.2 Cr/yr', payback: '3–4 yrs', units: '14.4 L units/yr' },
]

const faqs = [
  { q: 'What is the minimum system size for commercial solar?', a: 'We typically work with commercial systems starting from 10 kW. However, for optimal ROI, we recommend a minimum of 50 kW for commercial properties.' },
  { q: 'Can we install solar on a rented/leased property?', a: 'Yes, with the landlord\'s written consent. We can structure the agreement to benefit both parties, and the system can be transferred or removed if needed.' },
  { q: 'What is accelerated depreciation and how does it benefit us?', a: 'Under Section 32 of the Income Tax Act, businesses can claim 40% depreciation on solar assets in Year 1. For a ₹1 Cr system, this means ₹40 L in tax deductions — significantly improving your effective ROI.' },
  { q: 'Do you provide performance guarantees?', a: 'Yes. We provide a Performance Ratio (PR) guarantee of minimum 75% and a generation guarantee based on your location\'s solar irradiance data. Any shortfall is compensated.' },
  { q: 'How long does a commercial installation take?', a: 'A 100 kW system typically takes 3–4 weeks from order to commissioning. Larger MW-scale projects are planned with detailed project timelines agreed upfront.' },
]

export default function CommercialPage() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <main className="pt-20 bg-white">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[88vh] flex items-center overflow-hidden bg-gradient-to-br from-[#0a1a5c] via-navy to-[#112378]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-orange/10 rounded-full blur-[140px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-solarsky/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="max-w-3xl">
            <motion.div {...fw(0)} className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange/20 flex items-center justify-center">
                <Factory className="w-5 h-5 text-orange" />
              </div>
              <span className="text-orange font-bold text-sm uppercase tracking-widest">Commercial Solar</span>
            </motion.div>
            <motion.h1 {...fw(0.1)} className="font-outfit text-5xl md:text-7xl font-black text-white leading-[1.05] mb-6">
              Solar That Works<br />
              <span className="text-orange">As Hard As You Do.</span>
            </motion.h1>
            <motion.p {...fw(0.2)} className="text-white/65 text-xl leading-relaxed mb-10 max-w-2xl">
              Large-scale commercial solar with guaranteed performance, full EPC delivery, and 40% accelerated depreciation benefits. Built for businesses that demand results.
            </motion.p>
            <motion.div {...fw(0.3)} className="flex flex-wrap gap-4">
              <Link to="/contact" className="bg-orange hover:bg-orange/90 text-white font-outfit font-bold px-10 py-4 rounded-full flex items-center gap-2 group transition-all shadow-xl shadow-orange/30 no-underline">
                Request a Proposal <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="bg-white/10 hover:bg-white/20 text-white font-outfit font-bold px-10 py-4 rounded-full transition-all no-underline border border-white/20">
                Talk to an Expert
              </Link>
            </motion.div>
          </div>
          {/* Stats */}
          <motion.div {...fw(0.4)} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-16 border-t border-white/10">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-outfit font-black text-orange text-4xl">{s.val}</div>
                <div className="text-white/50 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fw(0)} className="text-center mb-16">
            <h2 className="font-outfit text-4xl md:text-5xl font-black text-navy">Why Businesses <span className="text-orange">Choose Solar</span></h2>
            <p className="text-navy/55 text-lg mt-4 max-w-2xl mx-auto">Beyond just saving on bills — commercial solar is a strategic financial and sustainability investment.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={b.title} {...fw(i * 0.08)} className="group p-8 rounded-3xl border border-gray-100 hover:border-orange/30 hover:shadow-2xl hover:shadow-orange/8 transition-all duration-300 hover:-translate-y-1">
                <div className={`w-14 h-14 ${b.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <b.icon className={`w-7 h-7 ${b.color}`} />
                </div>
                <h3 className="font-outfit font-bold text-navy text-xl mb-3">{b.title}</h3>
                <p className="text-slate-500 leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fw(0)} className="text-center mb-16">
            <h2 className="font-outfit text-4xl md:text-5xl font-black text-navy">Industries We <span className="text-orange">Power</span></h2>
            <p className="text-navy/55 text-lg mt-4 max-w-2xl mx-auto">From 10 kW offices to 5 MW industrial plants — we've delivered solar across every major sector.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {industries.map((ind, i) => (
              <motion.div key={ind.name} {...fw(i * 0.07)} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-orange/30 hover:shadow-lg transition-all group">
                <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center mb-4 group-hover:bg-orange transition-colors">
                  <Building2 className="w-4 h-4 text-orange group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-outfit font-bold text-navy mb-2">{ind.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI TABLE ── */}
      <section className="py-24 px-6 bg-navy">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fw(0)} className="text-center mb-16">
            <h2 className="font-outfit text-4xl md:text-5xl font-black text-white">Commercial Solar <span className="text-orange">ROI Calculator</span></h2>
            <p className="text-white/55 text-lg mt-4 max-w-2xl mx-auto">Indicative returns based on average commercial tariff of ₹7/unit and 300 sunny days per year.</p>
          </motion.div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10">
                  {['Plant Size', 'Approx. Cost', 'Annual Savings', 'Payback Period', 'Annual Generation'].map(h => (
                    <th key={h} className="text-left py-4 px-4 text-white/50 text-sm font-semibold uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roiData.map((row, i) => (
                  <motion.tr key={row.size} {...fw(i * 0.08)} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-5 px-4 font-outfit font-black text-orange text-lg">{row.size}</td>
                    <td className="py-5 px-4 text-white/80 font-medium">{row.cost}</td>
                    <td className="py-5 px-4 text-green-400 font-bold">{row.saving}</td>
                    <td className="py-5 px-4 text-solarsky font-bold">{row.payback}</td>
                    <td className="py-5 px-4 text-white/80 font-medium">{row.units}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── EPC PROCESS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fw(0)} className="text-center mb-16">
            <h2 className="font-outfit text-4xl md:text-5xl font-black text-navy">Our Full EPC <span className="text-orange">Process</span></h2>
            <p className="text-navy/55 text-lg mt-4 max-w-2xl mx-auto">End-to-end Engineering, Procurement & Construction — we handle everything from feasibility to commissioning.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {epcSteps.map((s, i) => (
              <motion.div key={s.num} {...fw(i * 0.08)} className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-orange text-white font-outfit font-black text-xl flex items-center justify-center shrink-0 shadow-lg shadow-orange/20">{s.num}</div>
                <div>
                  <h3 className="font-outfit font-bold text-navy text-lg mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="py-24 px-6 bg-orange">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fw(0)}>
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-white fill-white" />)}
            </div>
            <blockquote className="font-outfit text-2xl md:text-3xl font-bold text-white leading-relaxed mb-8">
              "Urban Energy installed a 250 kW plant at our factory. Our electricity bill dropped from ₹4.2 lakh to under ₹40,000 per month. The ROI has been phenomenal and the team delivered on time."
            </blockquote>
            <div className="text-white/70 font-medium">— Vikram Mehta, MD | Mehta Textiles, Surat | 250 kW Industrial Plant</div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fw(0)} className="text-center mb-16">
            <h2 className="font-outfit text-4xl md:text-5xl font-black text-navy">Commercial Solar <span className="text-orange">FAQs</span></h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} {...fw(i * 0.07)} className="border border-gray-100 rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors">
                  <span className="font-outfit font-bold text-navy text-lg pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-navy/40 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && <div className="px-6 pb-5 text-slate-500 leading-relaxed border-t border-gray-50 pt-4">{faq.a}</div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-gradient-to-r from-navy to-[#0a1a5c] text-white text-center">
        <motion.div {...fw(0)} className="max-w-3xl mx-auto">
          <Sun className="w-14 h-14 text-white/30 mx-auto mb-6" />
          <h2 className="font-outfit text-4xl md:text-5xl font-black mb-6">Let's Power Your Business</h2>
          <p className="text-white/70 text-xl mb-10">Get a detailed project proposal with ROI analysis, system design, and subsidy breakdown — completely free.</p>
          <Link to="/contact" className="bg-orange hover:bg-orange/90 text-white font-outfit font-black px-14 py-5 rounded-full text-lg transition-all shadow-2xl shadow-orange/30 no-underline inline-block">
            Get Free Commercial Proposal
          </Link>
        </motion.div>
      </section>

    </main>
  )
}
