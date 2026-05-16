import React from 'react'
import { motion } from 'framer-motion'
import { Sun, ShieldCheck, Zap, Wrench, BadgePercent, Radio } from 'lucide-react'

const reasons = [
  { icon: Sun, num: 'Expert', title: 'Tailored System Design', desc: 'We build customized configurations ensuring the most effective orientation and sizing for your roof.' },
  { icon: ShieldCheck, num: 'Pure', title: 'Performance Transparency', desc: 'Honest estimations with zero hidden charges, delivering exactly what is promised every time.' },
  { icon: Zap, num: 'Premium', title: 'Panel Peak Performance', desc: 'Tier-1 panels built with robust structural integrity. Your solar investment is protected by state-of-the-art engineering.' },
  { icon: Wrench, num: '48hr', title: 'Lightning-Fast Installation', desc: 'Most residential solar systems fully installed and commissioned within 48 hours of site survey.' },
  { icon: BadgePercent, num: '100%', title: 'Subsidy Assistance', desc: 'We handle all MNRE & PM Surya Ghar Yojana paperwork — you get up to ₹78,000 in government subsidies hassle-free.' },
  { icon: Radio, num: '24/7', title: 'Smart Remote Monitoring', desc: 'Live app dashboard tracks your solar generation, consumption, and savings in real time, every day.' },
]

export default function WhyUs() {
  return (
    <section id="why" className="py-20 px-5 relative overflow-hidden bg-slate-50">

      {/* Subtle accent glows */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,184,0,0.07) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,122,0,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-space font-bold uppercase tracking-widest mb-4" style={{ background: 'rgba(255,184,0,0.12)', border: '1px solid rgba(255,184,0,0.3)', color: '#FF8C00' }}>
            Why Vaulix Solar
          </span>
          <h2 className="font-orbitron text-3xl md:text-4xl font-black text-navy leading-tight">
            Why Choose <span className="glow-text">Us?</span>
          </h2>
          <p className="text-slate-500 mt-3 max-w-lg mx-auto font-space text-base leading-relaxed">
            Focused on quality, transparency, and efficient execution to deliver solar results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(255,122,0,0.1)' }}
              className="bg-white rounded-2xl p-7 cursor-default transition-all duration-300 border border-gray-100 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(255,184,0,0.1)', border: '1px solid rgba(255,184,0,0.2)' }}>
                <r.icon size={22} color="#FF8C00" strokeWidth={1.8} />
              </div>
              <div className="font-outfit text-4xl lg:text-5xl font-black mb-2" style={{ background: 'linear-gradient(135deg, #FFB800, #FF7A00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {r.num}
              </div>
              <h3 className="font-space font-bold text-navy text-base mb-2">{r.title}</h3>
              <p className="text-slate-500 text-sm font-space leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
