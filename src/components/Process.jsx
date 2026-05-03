import { Link } from 'react-router-dom'
import React from 'react'
import { motion } from 'framer-motion'

const steps = [
  { num: 1, title: 'Free Site Survey', desc: 'Our experts visit your location to assess roof area, shadow analysis, and energy requirements.' },
  { num: 2, title: 'Custom Design', desc: 'We design a system tailored to your energy needs with detailed savings projections and ROI.' },
  { num: 3, title: 'Installation', desc: 'Certified technicians install panels and inverter. Grid connection & net metering handled.' },
  { num: 4, title: 'Go Solar!', desc: 'Start saving from day one. Monitor production live on the Urban Energy app 24/7.' },
]

export default function Process() {
  return (
    <section id="process" className="py-12 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-tag">How It Works</span>
          <h2 className="section-title">
            Simple 4-Step <span className="text-orange">Process</span>
          </h2>
          <p className="text-slate-500 mt-3 max-w-md mx-auto">
            From inquiry to powering your home — we make going solar completely hassle-free.
          </p>
        </motion.div>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[14%] right-[14%] h-0.5 bg-gradient-to-r from-orange to-yellow z-0" />

          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative z-10 text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center font-outfit font-black text-2xl text-white shadow-lg shadow-orange/30"
                style={{ background: 'linear-gradient(135deg, #FF7A00, #FFC107)' }}
              >
                {s.num}
              </motion.div>
              <h3 className="font-outfit font-bold text-lg text-navy mb-2">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link to="/contact" className="btn-primary">
            Start My Solar Journey →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
