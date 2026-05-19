import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ShieldCheck, Zap, IndianRupee, Wrench, Sun, CheckCircle2,
  Home, Star, ChevronDown, ArrowRight, Leaf, Clock, Award
} from 'lucide-react'

const fw = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.6, delay },
})

const benefits = [
  { icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-50', title: 'Save Up to 90% on Bills', desc: 'A 3 kW system can save ₹2,000–₹4,000 every month. Your system pays for itself in under 4 years.' },
  { icon: ShieldCheck, color: 'text-solarsky', bg: 'bg-solarsky/10', title: 'Reliable Performance', desc: 'Long-term output stability with high-efficiency premium components.' },
  { icon: Zap, color: 'text-orange', bg: 'bg-orange/10', title: 'Net Metering Earnings', desc: 'Sell surplus solar power back to the grid. Your DISCOM credits you — reducing future bills to near zero.' },
  { icon: Leaf, color: 'text-emerald-600', bg: 'bg-emerald-50', title: 'Zero Carbon Footprint', desc: 'A 3 kW home system offsets ~4 tonnes of CO₂ per year — equivalent to planting 180 trees annually.' },
  { icon: Award, color: 'text-purple-600', bg: 'bg-purple-50', title: 'Government Subsidy', desc: 'Government subsidies available for residential solar installations. We help you with the paperwork.' },
  { icon: Clock, color: 'text-navy', bg: 'bg-navy/10', title: 'Installed in 2–3 Days', desc: 'Our certified teams complete most home installations within 2–3 working days with zero roof damage.' },
]

const steps = [
  { num: '01', title: 'Free Home Survey', desc: 'Our solar expert visits your home, analyses your roof area, shadow patterns, and monthly electricity consumption to design the perfect system.' },
  { num: '02', title: 'Custom System Design', desc: 'We create a tailored solar layout — panel placement, inverter sizing, wiring plan — optimised for maximum generation at your specific location.' },
  { num: '03', title: 'Professional Installation', desc: 'Our certified technicians install your system in 2–3 days using premium mounting structures that cause zero damage to your roof.' },
  { num: '04', title: 'Grid Connection & Net Meter', desc: 'We handle all paperwork, net meter application, and grid synchronisation so you start saving from day one.' },
]

const included = [
  'High-efficiency solar panels',
  'Grid-tie inverter with WiFi monitoring',
  'Mounting structure',
  'AC/DC cables, MCBs & surge protection',
  'Net meter application assistance',
  'Government subsidy application support',
  'Post-installation support included',
  'Real-time generation monitoring app',
  'Premium high-efficiency design',
  'Dedicated post-installation support',
]

const systemSizes = [
  { kw: '1 kW', area: '60 sq ft', saving: '₹800–₹1,200/mo', cost: '~₹65,000', subsidy: '₹30,000' },
  { kw: '2 kW', area: '120 sq ft', saving: '₹1,600–₹2,400/mo', cost: '~₹1,30,000', subsidy: '₹60,000' },
  { kw: '3 kW', area: '180 sq ft', saving: '₹2,400–₹3,600/mo', cost: '~₹1,95,000', subsidy: '₹78,000' },
  { kw: '5 kW', area: '300 sq ft', saving: '₹4,000–₹6,000/mo', cost: '~₹3,25,000', subsidy: '₹78,000' },
  { kw: '10 kW', area: '600 sq ft', saving: '₹8,000–₹12,000/mo', cost: '~₹6,50,000', subsidy: '₹78,000' },
]

const faqs = [
  { q: 'Will solar work during power cuts?', a: 'Standard on-grid systems shut down during power cuts for safety. If you need backup, we offer hybrid systems with battery storage that keep your home powered 24/7.' },
  { q: 'How much roof space do I need?', a: 'A 1 kW system needs approximately 60 sq ft of shadow-free roof area. Most homes with a 100–200 sq ft terrace can install a 2–3 kW system comfortably.' },
  { q: 'What happens on cloudy or rainy days?', a: 'Solar panels still generate power on cloudy days — typically 10–25% of peak output. Your system is designed to account for seasonal variation in your area.' },
  { q: 'How do I apply for government subsidy?', a: 'We guide you through the entire subsidy application process. Our team helps with documentation and coordinates with the relevant authorities on your behalf.' },
  { q: 'Is there any maintenance required?', a: 'Solar systems require minimal maintenance. We recommend a panel cleaning every 2–3 months and an annual health check-up to keep your system running at peak performance.' },
]

export default function HomesPage() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <main className="pt-20 bg-white">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[88vh] flex items-center overflow-hidden bg-slate-50">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/8 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-solarsky/8 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">
          <div>
            <motion.div {...fw(0)} className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-solarsky/15 flex items-center justify-center">
                <Home className="w-5 h-5 text-solarsky" />
              </div>
              <span className="text-solarsky font-bold text-sm uppercase tracking-widest">Residential Solar</span>
            </motion.div>
            <motion.h1 {...fw(0.1)} className="font-outfit text-5xl md:text-6xl font-black text-navy leading-[1.05] mb-6">
              Power Your Home.<br />
              <span className="glow-text">Own Your Energy.</span>
            </motion.h1>
            <motion.p {...fw(0.2)} className="text-slate-500 text-xl leading-relaxed mb-10 max-w-lg">
              Custom rooftop solar for Indian homes. Save up to 90% on electricity bills, earn from surplus power, and achieve complete energy independence.
            </motion.p>
            <motion.div {...fw(0.3)} className="flex flex-wrap gap-4">
              <Link to="/contact" className="bg-solarsky hover:bg-solarsky/90 text-white font-outfit font-bold px-10 py-4 rounded-full flex items-center gap-2 group transition-all shadow-xl shadow-solarsky/20 no-underline">
                Get Free Survey <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/solar/on-grid" className="bg-white hover:bg-slate-50 text-navy font-outfit font-bold px-10 py-4 rounded-full transition-all no-underline border border-gray-200">
                On-Grid Solar
              </Link>
            </motion.div>
          </div>
          <motion.div {...fw(0.3)} className="grid grid-cols-2 gap-4">
            {[
              { icon: IndianRupee, val: '90%', label: 'Bill Reduction', color: 'bg-green-500' },
              { icon: Clock, val: '2–3 Days', label: 'Installation', color: 'bg-solarsky' },
              { icon: ShieldCheck, val: 'High Rank', label: 'Performance', color: 'bg-orange' },
              { icon: Award, val: '₹78,000', label: 'Max Subsidy', color: 'bg-purple-500' },
            ].map((item, i) => (
              <motion.div key={item.label} {...fw(0.3 + i * 0.1)} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
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
            <h2 className="font-outfit text-4xl md:text-5xl font-black text-navy">Why Homeowners <span className="text-solarsky">Love Solar</span></h2>
            <p className="text-navy/55 text-lg mt-4 max-w-2xl mx-auto">Real benefits that make a real difference to your monthly budget and quality of life.</p>
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

      {/* ── SYSTEM SIZES ── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fw(0)} className="text-center mb-16">
            <h2 className="font-outfit text-4xl md:text-5xl font-black text-navy">Choose Your <span className="text-solarsky">System Size</span></h2>
            <p className="text-slate-500 text-lg mt-4 max-w-2xl mx-auto">Every home is different. Pick the system that matches your consumption and roof space.</p>
          </motion.div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-gray-200">
                  {['System Size', 'Roof Area Needed', 'Monthly Savings', 'Approx. Cost', 'Govt. Subsidy'].map(h => (
                    <th key={h} className="text-left py-4 px-4 text-slate-400 text-sm font-semibold uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {systemSizes.map((row, i) => (
                  <motion.tr key={row.kw} {...fw(i * 0.08)} className="border-b border-gray-100 hover:bg-white transition-colors">
                    <td className="py-5 px-4 font-outfit font-black text-solarsky text-lg">{row.kw}</td>
                    <td className="py-5 px-4 text-slate-600 font-medium">{row.area}</td>
                    <td className="py-5 px-4 text-green-600 font-bold">{row.saving}</td>
                    <td className="py-5 px-4 text-slate-600 font-medium">{row.cost}</td>
                    <td className="py-5 px-4 text-orange font-bold">{row.subsidy}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <motion.p {...fw(0.3)} className="text-slate-400 text-sm mt-6 text-center">* Prices are indicative and vary by location, roof type, and panel brand. Contact us for an exact quote.</motion.p>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fw(0)} className="text-center mb-16">
            <h2 className="font-outfit text-4xl md:text-5xl font-black text-navy">From Survey to <span className="text-orange">Savings in 4 Steps</span></h2>
            <p className="text-navy/55 text-lg mt-4 max-w-2xl mx-auto">We make going solar completely effortless. Here's exactly what happens after you contact us.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div key={s.num} {...fw(i * 0.1)} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-solarsky/40 to-transparent z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-navy text-white font-outfit font-black text-2xl flex items-center justify-center mb-6 shadow-lg shadow-navy/20">{s.num}</div>
                  <h3 className="font-outfit font-bold text-navy text-xl mb-3">{s.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-solarsky/5 to-white">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fw(0)} className="text-center mb-16">
            <h2 className="font-outfit text-4xl md:text-5xl font-black text-navy">Everything <span className="text-solarsky">Included</span></h2>
            <p className="text-navy/55 text-lg mt-4">No hidden costs. No surprises. This is what you get with every Vaulix Solar home installation.</p>
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
            <h2 className="font-outfit text-4xl md:text-5xl font-black text-navy">Common <span className="text-orange">Questions</span></h2>
          </motion.div>
          <div className="space-y-1">
            {faqs.map((faq, i) => (
              <motion.div key={i} {...fw(i * 0.07)} className="border border-gray-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-outfit font-bold text-navy text-lg pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-navy/40 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-slate-500 leading-relaxed border-t border-gray-50 pt-4">{faq.a}</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-slate-50 text-center">
        <motion.div {...fw(0)} className="max-w-3xl mx-auto">
          <Sun className="w-14 h-14 text-orange/40 mx-auto mb-6" />
          <h2 className="font-outfit text-4xl md:text-5xl font-black text-navy mb-6">Ready to Go Solar?</h2>
          <p className="text-slate-500 text-xl mb-10">Book a free home survey today. Our expert will visit, assess your roof, and give you a detailed savings report — completely free, no obligation.</p>
          <Link to="/contact" className="bg-orange hover:bg-orange/90 text-white font-outfit font-black px-14 py-5 rounded-full text-lg transition-all shadow-xl shadow-orange/20 no-underline inline-block">
            Book Free Home Survey
          </Link>
        </motion.div>
      </section>

    </main>
  )
}
