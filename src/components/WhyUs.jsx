import React from 'react'
import { motion } from 'framer-motion'

const reasons = [
  { num: '10+', title: 'Years Experience', desc: 'A decade of solar expertise across all Indian states and diverse climate zones.' },
  { num: '98%', title: 'Customer Satisfaction', desc: 'Industry-leading scores backed by 5000+ verified happy customers.' },
  { num: '25yr', title: 'Panel Warranty', desc: 'Premium panels with 25-year performance warranty and 10-year product warranty.' },
  { num: '48hr', title: 'Fast Installation', desc: 'Most residential installations completed within 48 hours of survey approval.' },
  { num: '100%', title: 'Subsidy Assistance', desc: 'MNRE government subsidy documentation and filing handled entirely by our team.' },
  { num: '24/7', title: 'Remote Monitoring', desc: 'Real-time app monitoring of your solar production and consumption data.' },
]

export default function WhyUs() {
  return (
    <section id="why" className="py-8 sm:py-12 px-4 sm:px-5" style={{ background: '#0B1F3A' }}>
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-14"
        >
          <span
            className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-outfit font-bold uppercase tracking-widest mb-3 text-orange"
            style={{ background: 'rgba(255,122,0,0.2)' }}
          >
            Why Urban Energy
          </span>

          <h2 className="font-outfit text-xl sm:text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            Why Choose <span className="text-orange">Us?</span>
          </h2>

          <p className="text-white/50 mt-2 sm:mt-3 max-w-md sm:max-w-lg mx-auto text-xs sm:text-base leading-relaxed">
            Trusted by thousands across India for quality, transparency, and results.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ borderColor: 'rgba(255,122,0,0.4)', backgroundColor: 'rgba(255,122,0,0.08)' }}
              className="rounded-xl sm:rounded-2xl p-4 sm:p-7 cursor-default transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div className="font-outfit text-2xl sm:text-4xl lg:text-5xl font-black text-orange mb-1 sm:mb-2">
                {r.num}
              </div>

              <h3 className="font-outfit font-bold text-white text-sm sm:text-lg mb-1 sm:mb-2">
                {r.title}
              </h3>

              <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
                {r.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}