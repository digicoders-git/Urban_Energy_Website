import React from 'react'
import { motion } from 'framer-motion'

const reasons = [
  { num: 'Expert', title: 'Tailored System Design', desc: 'We build customized configurations ensuring the most effective orientation and sizing for your roof.' },
  { num: 'Pure', title: 'Performance Transparency', desc: 'Honest estimations with zero hidden charges, delivering exactly what is promised every time.' },
  { num: 'Premium', title: 'Panel Peak Performance', desc: 'Tier-1 panels built with robust structural integrity. Your solar investment is protected by state-of-the-art engineering.' },
  { num: '48hr', title: 'Lightning-Fast Installation', desc: 'Most residential solar systems fully installed and commissioned within 48 hours of site survey.' },
  { num: '100%', title: 'Subsidy Assistance', desc: 'We handle all MNRE & PM Surya Ghar Yojana paperwork — you get up to ₹78,000 in government subsidies hassle-free.' },
  { num: '24/7', title: 'Smart Remote Monitoring', desc: 'Live app dashboard tracks your solar generation, consumption, and savings in real time, every day.' },
]

export default function WhyUs() {
  return (
    <section id="why" className="py-20 px-5 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #0B1D51 0%, #0d2460 60%, #0B1D51 100%)' }}>

      {/* Sun glow bg */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,184,0,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,163,224,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      {/* Grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />

      <div className="max-w-6xl mx-auto relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-space font-bold uppercase tracking-widest mb-4" style={{ background: 'rgba(255,184,0,0.15)', border: '1px solid rgba(255,184,0,0.3)', color: '#FFB800' }}>
            Why Urban Energy
          </span>
          <h2 className="font-orbitron text-3xl md:text-4xl font-black text-white leading-tight">
            Why Choose <span className="glow-text">Us?</span>
          </h2>
          <p className="text-white/50 mt-3 max-w-lg mx-auto font-space text-base leading-relaxed">
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
              whileHover={{ borderColor: 'rgba(255,184,0,0.4)', backgroundColor: 'rgba(255,184,0,0.06)' }}
              className="rounded-2xl p-7 cursor-default transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="font-orbitron text-4xl lg:text-5xl font-black mb-2" style={{ background: 'linear-gradient(135deg, #FFB800, #FF7A00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {r.num}
              </div>
              <h3 className="font-space font-bold text-white text-base mb-2">{r.title}</h3>
              <p className="text-white/45 text-sm font-space leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
