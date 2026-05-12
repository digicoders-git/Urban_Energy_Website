import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Zap, IndianRupee, BarChart3, ShieldCheck, CheckCircle2, Sun,
  XCircle, ChevronDown, ArrowRight, Star, TrendingUp, Award, Clock
} from 'lucide-react'
import { useModal } from '../context/ModalContext'

const fw = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
})

const benefits = [
  { icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-50', title: 'Lowest System Cost', desc: 'No batteries needed — on-grid systems cost 40–50% less than off-grid. Most affordable way to go solar.' },
  { icon: Zap, color: 'text-solarsky', bg: 'bg-solarsky/10', title: 'Net Metering Credits', desc: 'Export surplus solar power to the grid. Your DISCOM credits you at the applicable rate — reducing future bills.' },
  { icon: Award, color: 'text-orange', bg: 'bg-orange/10', title: 'PM Surya Ghar Subsidy', desc: 'Get up to ₹78,000 government subsidy. We handle the entire application process from registration to disbursement.' },
  { icon: BarChart3, color: 'text-purple-600', bg: 'bg-purple-50', title: 'Real-Time Monitoring', desc: 'Track live generation, consumption, export, and savings via our mobile app. Know exactly how much you\'re saving.' },
  { icon: TrendingUp, color: 'text-navy', bg: 'bg-navy/10', title: 'Best ROI in Solar', desc: 'On-grid systems deliver the highest return on investment — payback in 3–4 years, then 20+ years of free power.' },
  { icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-50', title: 'Quick Installation', desc: 'Most on-grid systems are installed and commissioned within 2–3 days. Start saving from day one.' },
]

const steps = [
  { num: '01', title: 'Sunlight Hits Your Panels', desc: 'Solar panels on your rooftop absorb sunlight and convert it to Direct Current (DC) electricity. More sunlight = more power generated.' },
  { num: '02', title: 'Inverter Converts to AC', desc: 'The grid-tie inverter converts DC electricity to 230V AC — the same type of power your home appliances use.' },
  { num: '03', title: 'Power Your Home First', desc: 'Solar power runs your appliances directly during the day — ACs, refrigerators, lights, fans — reducing grid consumption to near zero.' },
  { num: '04', title: 'Export Surplus to Grid', desc: 'When your solar generates more than you consume, the excess flows to the grid. Your net meter records this export for billing credits.' },
]

const subsidyData = [
  { capacity: 'Up to 2 kW', subsidy: '₹30,000 per kW', maxAmount: '₹60,000', eligibility: 'All residential consumers' },
  { capacity: '2 kW to 3 kW', subsidy: '₹18,000 per kW (additional)', maxAmount: '₹78,000 total', eligibility: 'All residential consumers' },
  { capacity: 'Above 3 kW', subsidy: 'Fixed at ₹78,000', maxAmount: '₹78,000 (capped)', eligibility: 'All residential consumers' },
]

const comparison = [
  { feature: 'Battery Storage Required', onGrid: false, offGrid: true },
  { feature: 'Works During Power Cut', onGrid: false, offGrid: true },
  { feature: 'Lower Installation Cost', onGrid: true, offGrid: false },
  { feature: 'Net Metering / Bill Credits', onGrid: true, offGrid: false },
  { feature: 'PM Surya Ghar Subsidy', onGrid: true, offGrid: false },
  { feature: 'Best for Urban Areas', onGrid: true, offGrid: false },
  { feature: 'Best for Remote Areas', onGrid: false, offGrid: true },
  { feature: 'Fastest Payback Period', onGrid: true, offGrid: false },
  { feature: 'Zero Electricity Bill Possible', onGrid: true, offGrid: true },
  { feature: 'Minimal Maintenance', onGrid: true, offGrid: false },
]

const systemSizes = [
  { kw: '1 kW', units: '120 units/mo', saving: '₹840–₹1,200/mo', cost: '~₹65,000', subsidy: '₹30,000', payback: '4–5 yrs' },
  { kw: '2 kW', units: '240 units/mo', saving: '₹1,680–₹2,400/mo', cost: '~₹1,20,000', subsidy: '₹60,000', payback: '3–4 yrs' },
  { kw: '3 kW', units: '360 units/mo', saving: '₹2,520–₹3,600/mo', cost: '~₹1,75,000', subsidy: '₹78,000', payback: '3 yrs' },
  { kw: '5 kW', units: '600 units/mo', saving: '₹4,200–₹6,000/mo', cost: '~₹2,80,000', subsidy: '₹78,000', payback: '3–4 yrs' },
  { kw: '10 kW', units: '1,200 units/mo', saving: '₹8,400–₹12,000/mo', cost: '~₹5,20,000', subsidy: '₹78,000', payback: '3–4 yrs' },
]

const faqs = [
  { q: 'Will my on-grid system work during a power cut?', a: 'Standard on-grid systems shut down during power cuts for safety (anti-islanding protection). If you need backup power, we offer hybrid systems that combine on-grid solar with battery storage for uninterrupted supply.' },
  { q: 'What is net metering and how does it work?', a: 'Net metering allows you to export surplus solar power to the grid. Your electricity meter records both import (from grid) and export (to grid). At billing time, you pay only for the net units consumed. If you export more than you import, you get credits carried forward.' },
  { q: 'How do I apply for the PM Surya Ghar subsidy?', a: 'We handle the entire process — registration on the PM Surya Ghar portal, DISCOM inspection coordination, net meter application, and subsidy disbursement directly to your bank account. You don\'t need to do anything.' },
  { q: 'What is the minimum bill I can achieve with on-grid solar?', a: 'With a properly sized system, your bill can drop to just the fixed charges (₹100–₹200/month) — essentially zero units consumed from the grid. Many of our customers have achieved ₹0 variable charges.' },
  { q: 'How much roof space do I need for a 3 kW system?', a: 'A 3 kW system requires approximately 180–200 sq ft of shadow-free roof area. This is typically available on most Indian homes with a terrace or flat roof.' },
  { q: 'What happens to my solar system after 25 years?', a: 'Solar panels degrade at about 0.5% per year. After 25 years, they still produce ~87% of original output. You can continue using them or upgrade to newer, more efficient panels. The inverter may need replacement after 10–15 years.' },
]

export default function OnGridSolarPage() {
  const [openFaq, setOpenFaq] = useState(null)
  const { openQuoteModal } = useModal()

  return (
    <main className="pt-20 bg-white">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[88vh] flex items-center overflow-hidden bg-gradient-to-br from-[#FF7A00] via-[#e06500] to-[#112378]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-yellow-400/15 rounded-full blur-[140px] -translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-navy/30 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">
          <div>
            <motion.div {...fw(0)} className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-white/80 font-bold text-sm uppercase tracking-widest">On-Grid Solar</span>
            </motion.div>
            <motion.h1 {...fw(0.1)} className="font-outfit text-5xl md:text-6xl font-black text-white leading-[1.05] mb-6">
              Cut Your Bill.<br />
              <span className="text-yellow-300">Earn from Solar.</span>
            </motion.h1>
            <motion.p {...fw(0.2)} className="text-white/75 text-xl leading-relaxed mb-10 max-w-lg">
              The most popular and cost-effective solar solution. Connect to the grid, use solar during the day, export surplus power, and watch your electricity bill drop to near zero.
            </motion.p>
            <motion.div {...fw(0.3)} className="flex flex-wrap gap-4">
              <button onClick={openQuoteModal} className="bg-white text-orange font-outfit font-black px-10 py-4 rounded-full flex items-center gap-2 group transition-all shadow-xl border-none cursor-pointer hover:bg-white/90">
                Get Free Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link to="/solar/off-grid" className="bg-white/15 hover:bg-white/25 text-white font-outfit font-bold px-10 py-4 rounded-full transition-all no-underline border border-white/30">
                Compare Off-Grid
              </Link>
            </motion.div>
          </div>
          <motion.div {...fw(0.3)} className="grid grid-cols-2 gap-4">
            {[
              { val: '₹0', label: 'Upfront (EMI Plans)', color: 'bg-white/20' },
              { val: '3 Yrs', label: 'Avg. Payback', color: 'bg-white/20' },
              { val: '₹78K', label: 'Max Govt. Subsidy', color: 'bg-white/20' },
              { val: 'Top-Tier', label: 'Premium Modules', color: 'bg-white/20' },
            ].map((item, i) => (
              <motion.div key={item.label} {...fw(0.3 + i * 0.1)} className="bg-white/15 backdrop-blur border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-colors">
                <div className="font-outfit font-black text-white text-3xl">{item.val}</div>
                <div className="text-white/60 text-sm mt-1">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fw(0)} className="text-center mb-16">
            <h2 className="font-outfit text-4xl md:text-5xl font-black text-navy">Why On-Grid is <span className="text-orange">India's #1 Choice</span></h2>
            <p className="text-navy/55 text-lg mt-4 max-w-2xl mx-auto">The most cost-effective, subsidy-eligible, and highest-ROI solar solution for homes and businesses.</p>
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

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6 bg-navy">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fw(0)} className="text-center mb-16">
            <h2 className="font-outfit text-4xl md:text-5xl font-black text-white">How On-Grid Solar <span className="text-orange">Works</span></h2>
            <p className="text-white/55 text-lg mt-4 max-w-2xl mx-auto">Simple, automatic, and completely seamless. Here's what happens every sunny day.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div key={s.num} {...fw(i * 0.1)} className="bg-white/8 border border-white/10 rounded-2xl p-7 hover:bg-white/12 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-orange text-white font-outfit font-black text-2xl flex items-center justify-center mb-6">{s.num}</div>
                <h3 className="font-outfit font-bold text-white text-xl mb-3">{s.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SYSTEM SIZES ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fw(0)} className="text-center mb-16">
            <h2 className="font-outfit text-4xl md:text-5xl font-black text-navy">System Sizes & <span className="text-orange">Expected Savings</span></h2>
            <p className="text-navy/55 text-lg mt-4 max-w-2xl mx-auto">Based on ₹7/unit average tariff and 300 peak sun hours per year.</p>
          </motion.div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-200">
                  {['System Size', 'Monthly Generation', 'Monthly Savings', 'Approx. Cost', 'Subsidy', 'Payback'].map(h => (
                    <th key={h} className="text-left py-4 px-4 text-navy/50 text-sm font-semibold uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {systemSizes.map((row, i) => (
                  <motion.tr key={row.kw} {...fw(i * 0.08)} className={`border-b border-gray-100 hover:bg-orange/3 transition-colors ${i === 2 ? 'bg-orange/5' : ''}`}>
                    <td className="py-5 px-4 font-outfit font-black text-orange text-lg">{row.kw} {i === 2 && <span className="text-xs bg-orange text-white px-2 py-0.5 rounded-full ml-2 font-bold">Popular</span>}</td>
                    <td className="py-5 px-4 text-navy/70 font-medium">{row.units}</td>
                    <td className="py-5 px-4 text-green-600 font-bold">{row.saving}</td>
                    <td className="py-5 px-4 text-navy/70 font-medium">{row.cost}</td>
                    <td className="py-5 px-4 text-solarsky font-bold">{row.subsidy}</td>
                    <td className="py-5 px-4 text-navy/70 font-medium">{row.payback}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── SUBSIDY GUIDE ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-solarsky/5 to-white">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fw(0)} className="text-center mb-16">
            <h2 className="font-outfit text-4xl md:text-5xl font-black text-navy">PM Surya Ghar <span className="text-solarsky">Subsidy Guide</span></h2>
            <p className="text-navy/55 text-lg mt-4">The Government of India offers substantial subsidies for residential on-grid solar installations.</p>
          </motion.div>
          <div className="overflow-x-auto mb-8">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-gray-200">
                  {['System Capacity', 'Subsidy Rate', 'Maximum Subsidy', 'Eligibility'].map(h => (
                    <th key={h} className="text-left py-4 px-4 text-navy/50 text-sm font-semibold uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subsidyData.map((row, i) => (
                  <motion.tr key={row.capacity} {...fw(i * 0.08)} className="border-b border-gray-100">
                    <td className="py-5 px-4 font-semibold text-navy">{row.capacity}</td>
                    <td className="py-5 px-4 text-solarsky font-bold">{row.subsidy}</td>
                    <td className="py-5 px-4 text-green-600 font-bold">{row.maxAmount}</td>
                    <td className="py-5 px-4 text-slate-500 text-sm">{row.eligibility}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <motion.div {...fw(0.2)} className="bg-solarsky/10 border border-solarsky/20 rounded-2xl p-6 flex gap-4">
            <CheckCircle2 className="w-6 h-6 text-solarsky shrink-0 mt-0.5" />
            <p className="text-navy font-medium">We handle the entire PM Surya Ghar subsidy process — from portal registration to DISCOM inspection and direct bank disbursement. You don't need to visit any office.</p>
          </motion.div>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fw(0)} className="text-center mb-16">
            <h2 className="font-outfit text-4xl md:text-5xl font-black text-navy">On-Grid vs <span className="text-orange">Off-Grid</span></h2>
            <p className="text-navy/55 text-lg mt-4">Not sure which is right for you? Here's a clear comparison.</p>
          </motion.div>
          <motion.div {...fw(0.1)} className="rounded-3xl overflow-hidden border border-gray-100 shadow-lg">
            <div className="grid grid-cols-3 bg-navy text-white text-sm font-bold text-center">
              <div className="py-5 px-4 text-left text-white/60">Feature</div>
              <div className="py-5 px-4 border-l border-white/10 text-orange">On-Grid ⚡</div>
              <div className="py-5 px-4 border-l border-white/10 text-solarsky">Off-Grid 🔋</div>
            </div>
            {comparison.map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 text-sm text-center ${i % 2 === 0 ? 'bg-white' : 'bg-surface'}`}>
                <div className="py-4 px-4 text-left font-medium text-navy">{row.feature}</div>
                <div className="py-4 px-4 border-l border-gray-100 flex items-center justify-center">
                  {row.onGrid ? <CheckCircle2 size={20} className="text-green-500" /> : <XCircle size={20} className="text-gray-200" />}
                </div>
                <div className="py-4 px-4 border-l border-gray-100 flex items-center justify-center">
                  {row.offGrid ? <CheckCircle2 size={20} className="text-green-500" /> : <XCircle size={20} className="text-gray-200" />}
                </div>
              </div>
            ))}
          </motion.div>
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
              "I installed a 3 kW on-grid system in March. My April bill was ₹0 variable charges — just ₹150 fixed. Urban Energy handled the subsidy and net meter application. I got ₹78,000 subsidy directly in my account."
            </blockquote>
            <div className="text-white/70 font-medium">— Anita Desai, Homeowner | Nagpur | 3 kW On-Grid System</div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fw(0)} className="text-center mb-16">
            <h2 className="font-outfit text-4xl md:text-5xl font-black text-navy">On-Grid Solar <span className="text-orange">FAQs</span></h2>
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
      <section className="py-24 px-6 bg-gradient-to-r from-orange to-[#e06500] text-white text-center">
        <motion.div {...fw(0)} className="max-w-3xl mx-auto">
          <Sun className="w-14 h-14 text-white/30 mx-auto mb-6" />
          <h2 className="font-outfit text-4xl md:text-5xl font-black mb-6">Start Saving with On-Grid Solar</h2>
          <p className="text-white/80 text-xl mb-10">Get a free site assessment, custom system design, and detailed savings report. We'll also handle your PM Surya Ghar subsidy application.</p>
          <button onClick={openQuoteModal} className="bg-white text-orange font-outfit font-black px-14 py-5 rounded-full text-lg hover:bg-white/90 transition-all shadow-2xl border-none cursor-pointer inline-block">
            Book Free Site Assessment
          </button>
        </motion.div>
      </section>

    </main>
  )
}
