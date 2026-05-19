import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  BatteryCharging, WifiOff, Sun, Wrench, CheckCircle2, MapPin,
  Zap, ShieldCheck, ChevronDown, ArrowRight, Star, XCircle
} from 'lucide-react'
import { useModal } from '../context/ModalContext'

const fw = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
})

const benefits = [
  { icon: WifiOff, color: 'text-solarsky', bg: 'bg-solarsky/10', title: '100% Grid Independent', desc: 'No electricity bill, no DISCOM dependency. Generate, store, and consume your own power entirely.' },
  { icon: BatteryCharging, color: 'text-green-600', bg: 'bg-green-50', title: '24/7 Power Supply', desc: 'Battery banks store excess solar energy for use at night, during cloudy days, or power outages.' },
  { icon: MapPin, color: 'text-orange', bg: 'bg-orange/10', title: 'Works Anywhere', desc: 'Perfect for remote farms, hill stations, villages, and any location without reliable grid connectivity.' },
  { icon: Wrench, color: 'text-purple-600', bg: 'bg-purple-50', title: 'Minimal Maintenance', desc: 'No moving parts, no fuel, no noise. Modern lithium batteries last 10+ years with minimal upkeep.' },
  { icon: ShieldCheck, color: 'text-navy', bg: 'bg-navy/10', title: 'Disaster Proof', desc: 'When the grid goes down during storms or disasters, your off-grid system keeps running uninterrupted.' },
  { icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50', title: 'Scalable Capacity', desc: 'Start small and expand. Add more panels or batteries as your power needs grow over time.' },
]

const components = [
  { num: '01', title: 'Solar Panels', desc: 'High-efficiency monocrystalline panels capture maximum sunlight and convert it to DC electricity. Premium quality built for long-term performance.', detail: '400W–550W per panel' },
  { num: '02', title: 'MPPT Charge Controller', desc: 'Maximum Power Point Tracking controllers optimise energy harvest from panels and regulate charging to protect battery health and maximise lifespan.', detail: 'Up to 98% efficiency' },
  { num: '03', title: 'Battery Bank', desc: 'Lithium Iron Phosphate (LiFePO4) or lead-acid batteries store energy for use when the sun isn\'t shining. Lithium batteries offer 3,000–6,000 charge cycles.', detail: 'LiFePO4 recommended' },
  { num: '04', title: 'Off-Grid Inverter', desc: 'Pure sine wave inverters convert stored DC battery power to 230V AC electricity — compatible with all household and commercial appliances.', detail: 'Pure sine wave output' },
]

const applications = [
  { title: 'Remote Farmhouses & Agricultural Land', desc: 'Power irrigation pumps, lighting, and farm equipment without waiting for grid extension. Ideal for farms 5+ km from the nearest grid.' },
  { title: 'Hill Stations & Mountain Resorts', desc: 'Unreliable grid power is a common problem in hilly areas. Off-grid solar provides consistent, clean power for resorts and homestays.' },
  { title: 'Villages & Rural Communities', desc: 'Electrify entire villages with community off-grid solar microgrids. Power homes, schools, health centres, and street lights.' },
  { title: 'Telecom Towers & Remote Infrastructure', desc: 'Replace diesel generators at telecom towers with solar + battery systems. Reduce fuel costs by 80% and eliminate generator maintenance.' },
  { title: 'Construction Sites', desc: 'Temporary power for construction sites without grid connection. Power tools, lighting, and site offices with portable solar systems.' },
  { title: 'Eco Lodges & Glamping Sites', desc: 'Sustainable tourism properties use off-grid solar as a premium feature. Guests love the eco-friendly experience and zero noise from generators.' },
]

const faqs = [
  { q: 'How many days of backup does an off-grid system provide?', a: 'Typically 1–3 days of backup depending on battery bank size and your daily consumption. We design systems with 2 days of autonomy as standard, which covers most weather scenarios.' },
  { q: 'What happens when batteries are fully discharged?', a: 'Modern off-grid inverters have low-voltage disconnect protection that shuts down loads before batteries are fully discharged, protecting battery health. A diesel generator can be added as a backup.' },
  { q: 'Can I add grid connection later?', a: 'Yes. We can design hybrid systems that work off-grid but can also connect to the grid when available. This gives you the best of both worlds — independence with a grid safety net.' },
  { q: 'How long do lithium batteries last?', a: 'Quality LiFePO4 batteries last 10–15 years with 3,000–6,000 charge cycles. They exhibit exceptional durability and maintain 80% capacity for an extensive cycle life.' },
  { q: 'Is off-grid solar suitable for a home in a city?', a: 'For urban homes with reliable grid access, on-grid solar is more cost-effective. Off-grid is ideal for locations with frequent power cuts (8+ hours/day) or no grid access at all.' },
]

export default function OffGridSolarPage() {
  const [openFaq, setOpenFaq] = useState(null)
  const { openQuoteModal } = useModal()

  return (
    <main className="pt-20 bg-white">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[88vh] flex items-center overflow-hidden bg-slate-50">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/6 rounded-full blur-[130px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-solarsky/6 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">
          <div>
            <motion.div {...fw(0)} className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center">
                <WifiOff className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-green-600 font-bold text-sm uppercase tracking-widest">Off-Grid Solar</span>
            </motion.div>
            <motion.h1 {...fw(0.1)} className="font-outfit text-5xl md:text-6xl font-black text-navy leading-[1.05] mb-6">
              Energy Freedom.<br />
              <span className="text-green-600">Anywhere. Always.</span>
            </motion.h1>
            <motion.p {...fw(0.2)} className="text-slate-500 text-xl leading-relaxed mb-10 max-w-lg">
              Complete energy independence with solar + battery storage. No grid needed. No electricity bills. No power cuts. Just clean, reliable power wherever you are.
            </motion.p>
            <motion.div {...fw(0.3)} className="flex flex-wrap gap-4">
              <button onClick={openQuoteModal} className="bg-green-600 hover:bg-green-500 text-white font-outfit font-bold px-10 py-4 rounded-full flex items-center gap-2 group transition-all shadow-xl shadow-green-500/20 border-none cursor-pointer">
                Get Free Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link to="/solar/on-grid" className="bg-white hover:bg-slate-50 text-navy font-outfit font-bold px-10 py-4 rounded-full transition-all no-underline border border-gray-200">
                Compare On-Grid
              </Link>
            </motion.div>
          </div>
          <motion.div {...fw(0.3)} className="space-y-4">
            {[
              { label: 'Grid Connection Required', offGrid: 'Not Required', color: 'text-green-600' },
              { label: 'Works During Power Cut', offGrid: 'Yes, Always', color: 'text-green-600' },
              { label: 'Electricity Bill', offGrid: '₹0 Forever', color: 'text-green-600' },
              { label: 'Battery Backup', offGrid: '1–3 Days', color: 'text-green-600' },
            ].map((item, i) => (
              <motion.div key={item.label} {...fw(0.3 + i * 0.1)} className="bg-white border border-gray-100 rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm">
                <span className="text-slate-500 font-medium">{item.label}</span>
                <span className={`font-outfit font-black ${item.color}`}>{item.offGrid}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fw(0)} className="text-center mb-16">
            <h2 className="font-outfit text-4xl md:text-5xl font-black text-navy">Why Choose <span className="text-solarsky">Off-Grid Solar</span></h2>
            <p className="text-navy/55 text-lg mt-4 max-w-2xl mx-auto">Complete energy autonomy with modern solar and battery technology.</p>
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

      {/* ── SYSTEM COMPONENTS ── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fw(0)} className="text-center mb-16">
            <h2 className="font-outfit text-4xl md:text-5xl font-black text-navy">How an Off-Grid System <span className="text-solarsky">Works</span></h2>
            <p className="text-slate-500 text-lg mt-4 max-w-2xl mx-auto">Four core components work together to give you 24/7 clean power.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {components.map((c, i) => (
              <motion.div key={c.num} {...fw(i * 0.1)} className="bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-lg transition-all">
                <div className="w-14 h-14 rounded-2xl bg-solarsky text-white font-outfit font-black text-2xl flex items-center justify-center mb-6">{c.num}</div>
                <h3 className="font-outfit font-bold text-navy text-xl mb-3">{c.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{c.desc}</p>
                <span className="inline-block bg-solarsky/10 text-solarsky text-xs font-bold px-3 py-1 rounded-full">{c.detail}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATIONS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fw(0)} className="text-center mb-16">
            <h2 className="font-outfit text-4xl md:text-5xl font-black text-navy">Perfect For <span className="text-orange">These Applications</span></h2>
            <p className="text-navy/55 text-lg mt-4 max-w-2xl mx-auto">Off-grid solar is the ideal solution for a wide range of remote and power-challenged locations.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app, i) => (
              <motion.div key={app.title} {...fw(i * 0.08)} className="flex gap-5 p-7 rounded-2xl border border-gray-100 hover:border-orange/30 hover:shadow-lg transition-all group">
                <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center shrink-0 group-hover:bg-orange transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-orange group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-outfit font-bold text-navy mb-2">{app.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{app.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
       

      {/* ── FAQ ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fw(0)} className="text-center mb-16">
            <h2 className="font-outfit text-4xl md:text-5xl font-black text-navy">Off-Grid Solar <span className="text-orange">FAQs</span></h2>
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
          <Sun className="w-14 h-14 text-green-500/40 mx-auto mb-6" />
          <h2 className="font-outfit text-4xl md:text-5xl font-black text-navy mb-6">Go Off-Grid Today</h2>
          <p className="text-slate-500 text-xl mb-10">Tell us your location and power requirements. We'll design the perfect off-grid system and give you a detailed quote — completely free.</p>
          <button onClick={openQuoteModal} className="bg-green-600 hover:bg-green-500 text-white font-outfit font-black px-14 py-5 rounded-full text-lg transition-all shadow-xl shadow-green-500/20 border-none cursor-pointer inline-block">
            Design My Off-Grid System
          </button>
        </motion.div>
      </section>

    </main>
  )
}
