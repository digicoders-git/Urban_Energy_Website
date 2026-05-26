import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Users, IndianRupee, Zap, ShieldCheck, CheckCircle2, Sun,
  Building2, ChevronDown, ArrowRight, Star, Leaf, BarChart3, Car
} from 'lucide-react'
import { useModal } from '../context/ModalContext'

const fw = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.6, delay },
})

const benefits = [
  { icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-50', title: 'Slash Common Area Bills', desc: 'Lifts, pumps, corridor lighting, and clubhouse power — all running on free solar energy. Societies save ₹30,000–₹2 lakh per month.' },
  { icon: Users, color: 'text-solarsky', bg: 'bg-solarsky/10', title: 'Shared Savings for All', desc: 'Solar credits are distributed proportionally across all flats, reducing individual maintenance charges for every resident.' },
  { icon: Zap, color: 'text-orange', bg: 'bg-orange/10', title: 'Backup for Critical Loads', desc: 'Optional battery backup ensures lifts, water pumps, and security systems stay on even during grid power cuts.' },
  { icon: Building2, color: 'text-purple-600', bg: 'bg-purple-50', title: 'Increased Property Value', desc: 'Solar-powered societies command 5–10% higher resale and rental premiums. A green society is a premium society.' },
  { icon: Leaf, color: 'text-emerald-600', bg: 'bg-emerald-50', title: 'Eco-Friendly Society', desc: 'Position your society as an eco-friendly, sustainable community and attract premium buyers and tenants.' },
  { icon: BarChart3, color: 'text-navy', bg: 'bg-navy/10', title: 'Transparent Monitoring', desc: 'Real-time generation dashboard accessible to the RWA committee. Full transparency on savings and system performance.' },
]

const useCases = [
  { icon: Zap, title: 'Corridor & Staircase Lighting', desc: 'All common area lighting powered by solar — corridors, staircases, parking lots, and garden lights run at zero cost.' },
  { icon: Building2, title: 'Lifts & Elevators', desc: 'Lifts are one of the biggest power consumers in a society. Solar can offset 60–80% of elevator electricity costs.' },
  { icon: Users, title: 'Water Pumps & Borewells', desc: 'Submersible pumps, overhead tank motors, and borewell pumps — all powered by solar during peak generation hours.' },
  { icon: Car, title: 'EV Charging Stations', desc: 'Install solar-powered EV charging points in your parking area — a future-ready amenity that attracts premium buyers.' },
  { icon: Sun, title: 'Clubhouse & Gym', desc: 'Power the clubhouse, gym, swimming pool pumps, and community hall with clean solar energy at zero running cost.' },
  { icon: ShieldCheck, title: 'Security & CCTV Systems', desc: 'Keep security cameras, intercom systems, and boom barriers running on solar with battery backup for 24/7 operation.' },
]

const savingsData = [
  { flats: '50 Flats', system: '20 kW', saving: '₹15,000–₹20,000/mo', perFlat: '₹300–₹400/mo', payback: '4–5 yrs' },
  { flats: '100 Flats', system: '40 kW', saving: '₹30,000–₹40,000/mo', perFlat: '₹300–₹400/mo', payback: '4–5 yrs' },
  { flats: '200 Flats', system: '80 kW', saving: '₹60,000–₹80,000/mo', perFlat: '₹300–₹400/mo', payback: '4 yrs' },
  { flats: '500 Flats', system: '200 kW', saving: '₹1.5–₹2 L/mo', perFlat: '₹300–₹400/mo', payback: '3–4 yrs' },
]

const process = [
  { num: '01', title: 'RWA Consultation', desc: 'We present a detailed savings report to your RWA committee — no obligation, completely free.' },
  { num: '02', title: 'Society NOC & Approvals', desc: 'We handle all paperwork — society NOC, net metering application, and structural approvals.' },
  { num: '03', title: 'Installation', desc: 'Our team installs the system on common rooftop areas with zero disruption to residents.' },
  { num: '04', title: 'Savings Distribution', desc: 'Monthly solar credits are applied to the society\'s electricity bill, reducing maintenance charges for all.' },
]

const included = [
  'Free RWA presentation & savings report',
  'Society NOC & approval handling',
  'Structural rooftop assessment',
  'High-efficiency solar panels',
  'Central inverter with WiFi monitoring',
  'Net metering application & commissioning',
  'Monthly savings report for RWA',
  'Resident-facing savings dashboard',
  '5-year comprehensive AMC',
  'Premium Grade-A efficient panels',
]

const faqs = [
  { q: 'How does the RWA approve a solar installation?', a: 'We present a detailed proposal to your RWA committee showing expected savings, system design, and payback period. Once approved in an AGM or committee meeting, we handle all subsequent paperwork.' },
  { q: 'What if some residents object to solar installation?', a: 'Since the system is installed on common rooftop areas and benefits all residents through reduced maintenance charges, it typically requires only RWA committee approval, not individual flat owner consent.' },
  { q: 'How are the savings distributed among residents?', a: 'Solar generation offsets the society\'s common area electricity bill. The savings are reflected as reduced maintenance charges for all residents, distributed proportionally based on flat size or equally per flat.' },
  { q: 'Can individual flats also get solar?', a: 'Yes! We can design a hybrid system where part of the rooftop serves common areas and individual flats can opt for their own dedicated solar allocation. We handle the metering and billing for each.' },
  { q: 'What happens during the monsoon or cloudy days?', a: 'The system continues to generate power even on cloudy days (10–25% of peak). During monsoon months, the grid supplements solar. Annual savings calculations account for seasonal variation.' },
]

export default function HousingSocietiesPage() {
  const [openFaq, setOpenFaq] = useState(null)
  const { openQuoteModal } = useModal()

  return (
    <main className="pt-20 bg-white">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[88vh] flex items-center overflow-hidden bg-slate-50">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-solarsky/6 rounded-full blur-[130px] -translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-500/6 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">
          <div>
            <motion.div {...fw(0)} className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-solarsky/15 flex items-center justify-center">
                <Users className="w-5 h-5 text-solarsky" />
              </div>
              <span className="text-solarsky font-bold text-sm uppercase tracking-widest">Housing Societies</span>
            </motion.div>
            <motion.h1 {...fw(0.1)} className="font-outfit text-5xl md:text-6xl font-black text-navy leading-[1.05] mb-6">
              One Rooftop.<br />
              <span className="glow-text">Savings for Everyone.</span>
            </motion.h1>
            <motion.p {...fw(0.2)} className="text-slate-500 text-xl leading-relaxed mb-10 max-w-lg">
              Centralised solar for housing societies, apartments, and gated communities. Reduce maintenance charges, power common areas for free, and make your society future-ready.
            </motion.p>
            <motion.div {...fw(0.3)} className="flex flex-wrap gap-4">
              <button onClick={openQuoteModal} className="bg-solarsky hover:bg-solarsky/90 text-white font-outfit font-bold px-10 py-4 rounded-full flex items-center gap-2 group transition-all shadow-xl shadow-solarsky/20 border-none cursor-pointer">
                Get Society Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={openQuoteModal} className="bg-white hover:bg-slate-50 text-navy font-outfit font-bold px-10 py-4 rounded-full transition-all border border-gray-200 cursor-pointer">
                Free RWA Presentation
              </button>
            </motion.div>
          </div>
          <motion.div {...fw(0.3)} className="grid grid-cols-2 gap-4">
            {[
              { val: '₹2 L+', label: 'Max Monthly Savings', color: 'bg-green-500' },
              { val: '500+', label: 'Societies Powered', color: 'bg-solarsky' },
              { val: '4 Yrs', label: 'Avg. Payback', color: 'bg-orange' },
              { val: '100%', label: 'NOC Handled by Us', color: 'bg-purple-500' },
            ].map((item, i) => (
              <motion.div key={item.label} {...fw(0.3 + i * 0.1)} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className={`w-3 h-3 ${item.color} rounded-full mb-4`} />
                <div className="font-outfit font-black text-navy text-2xl">{item.val}</div>
                <div className="text-slate-400 text-sm mt-1">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fw(0)} className="text-center mb-16">
            <h2 className="font-outfit text-4xl md:text-5xl font-black text-navy">Why Societies <span className="text-solarsky">Go Solar</span></h2>
            <p className="text-navy/55 text-lg mt-4 max-w-2xl mx-auto">From reduced maintenance charges to increased property value — solar transforms how your society operates.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={b.title} {...fw(i * 0.08)} className="group p-8 rounded-3xl border border-gray-100 hover:border-solarsky/30 hover:shadow-2xl hover:shadow-navy/8 transition-all duration-300 hover:-translate-y-1">
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

      {/* ── USE CASES ── */}
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fw(0)} className="text-center mb-16">
            <h2 className="font-outfit text-4xl md:text-5xl font-black text-navy">What Gets Powered <span className="text-orange">by Solar</span></h2>
            <p className="text-navy/55 text-lg mt-4 max-w-2xl mx-auto">Every common area load in your society can run on free solar energy.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((u, i) => (
              <motion.div key={u.title} {...fw(i * 0.08)} className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-solarsky/30 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 rounded-xl bg-solarsky/10 flex items-center justify-center mb-5 group-hover:bg-solarsky transition-colors">
                  <u.icon className="w-6 h-6 text-solarsky group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-outfit font-bold text-navy text-lg mb-2">{u.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{u.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAVINGS TABLE ── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fw(0)} className="text-center mb-16">
            <h2 className="font-outfit text-4xl md:text-5xl font-black text-navy">Expected <span className="text-solarsky">Savings by Society Size</span></h2>
            <p className="text-slate-500 text-lg mt-4 max-w-2xl mx-auto">Indicative savings based on average common area consumption and ₹7/unit tariff.</p>
          </motion.div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-200">
                  {['Society Size', 'Recommended System', 'Monthly Savings', 'Per Flat Saving', 'Payback Period'].map(h => (
                    <th key={h} className="text-left py-4 px-4 text-slate-400 text-sm font-semibold uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {savingsData.map((row, i) => (
                  <motion.tr key={row.flats} {...fw(i * 0.08)} className="border-b border-gray-100 hover:bg-white transition-colors">
                    <td className="py-5 px-4 font-outfit font-black text-solarsky text-lg">{row.flats}</td>
                    <td className="py-5 px-4 text-slate-600 font-medium">{row.system}</td>
                    <td className="py-5 px-4 text-green-600 font-bold">{row.saving}</td>
                    <td className="py-5 px-4 text-orange font-bold">{row.perFlat}</td>
                    <td className="py-5 px-4 text-slate-600 font-medium">{row.payback}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fw(0)} className="text-center mb-16">
            <h2 className="font-outfit text-4xl md:text-5xl font-black text-navy">How It <span className="text-orange">Works</span></h2>
            <p className="text-navy/55 text-lg mt-4 max-w-2xl mx-auto">From RWA approval to monthly savings — here's the complete journey.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((s, i) => (
              <motion.div key={s.num} {...fw(i * 0.1)} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-navy text-white font-outfit font-black text-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-navy/20">{s.num}</div>
                <h3 className="font-outfit font-bold text-navy text-xl mb-3">{s.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INCLUDED ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-solarsky/5 to-white">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fw(0)} className="text-center mb-16">
            <h2 className="font-outfit text-4xl md:text-5xl font-black text-navy">Everything <span className="text-solarsky">Included</span></h2>
            <p className="text-navy/55 text-lg mt-4">No hidden costs. Complete end-to-end service for your society.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            {included.map((item, i) => (
              <motion.div key={item} {...fw(i * 0.05)} className="flex items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-sm border border-gray-100 hover:border-solarsky/30 hover:shadow-md transition-all">
                <CheckCircle2 className="w-5 h-5 text-solarsky shrink-0" />
                <span className="text-navy font-semibold">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fw(0)} className="text-center mb-16">
            <h2 className="font-outfit text-4xl md:text-5xl font-black text-navy">Society Solar <span className="text-orange">FAQs</span></h2>
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
      <section className="py-24 px-6 bg-slate-50 text-center">
        <motion.div {...fw(0)} className="max-w-3xl mx-auto">
          <Sun className="w-14 h-14 text-orange/30 mx-auto mb-6" />
          <h2 className="font-outfit text-4xl md:text-5xl font-black text-navy mb-6">Bring Solar to Your Society</h2>
          <p className="text-slate-500 text-xl mb-10">We'll present a free savings report to your RWA committee — showing exactly how much your society will save every month.</p>
          <button onClick={openQuoteModal} className="bg-orange hover:bg-orange/90 text-white font-outfit font-black px-14 py-5 rounded-full text-lg transition-all shadow-xl shadow-orange/20 border-none cursor-pointer inline-block">
            Book Free RWA Presentation
          </button>
        </motion.div>
      </section>

    </main>
  )
}
