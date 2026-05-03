import React from 'react'
import { motion } from 'framer-motion'
import Projects from '../components/Projects'
import Dashboard from '../components/Dashboard'
import Testimonials from '../components/Testimonials'
import { Link } from 'react-router-dom'

export default function ProjectsPage() {
  return (
    <main className="pt-16">
      <section className="relative py-20 px-5 overflow-hidden bg-navy">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 70% 40%, #FFC107 0%, transparent 50%), radial-gradient(circle at 20% 70%, #FF7A00 0%, transparent 40%)' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 bg-orange/15 border border-orange/30 text-orange px-4 py-1.5 rounded-full text-xs font-outfit font-bold uppercase tracking-widest mb-5">
              🏗️ Our Work
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="font-outfit text-4xl md:text-6xl font-black text-white leading-tight mb-5">
            Real Projects,{' '}
            <span style={{ background: 'linear-gradient(90deg, #FF7A00, #FFC107)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Real Impact</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Over 5,000 installations across Uttar Pradesh and India. See how we're transforming energy consumption one rooftop at a time.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-wrap justify-center gap-6">
            {[['5000+', 'Installations'], ['15 MW', 'Capacity'], ['₹12Cr+', 'Savings'], ['4.9★', 'Rating']].map(([val, lbl]) => (
              <div key={lbl} className="text-center">
                <div className="font-outfit text-2xl font-black text-orange">{val}</div>
                <div className="text-white/50 text-xs mt-0.5">{lbl}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      <Dashboard />
      <Projects />
      <Testimonials />
      <section className="py-12 px-5 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #FF7A00, transparent 60%)' }} />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center relative z-10">
          <h3 className="font-outfit text-2xl md:text-3xl font-black text-white mb-3">Your Project Could Be Next ⚡</h3>
          <p className="text-white/60 mb-7">Join 5,000+ happy customers who've made the switch to solar.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Start My Project</Link>
            <Link to="/calculator" className="btn-outline">Calculate Savings</Link>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
