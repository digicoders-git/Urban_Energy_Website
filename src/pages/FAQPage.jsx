import React from 'react'
import { motion } from 'framer-motion'
import FAQ from '../components/FAQ'
import { Link } from 'react-router-dom'

export default function FAQPage() {
  return (
    <main className="pt-16">
      <section className="relative py-20 px-5 overflow-hidden bg-navy">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 40% 50%, #FFC107 0%, transparent 55%), radial-gradient(circle at 80% 30%, #FF7A00 0%, transparent 40%)' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 bg-orange/15 border border-orange/30 text-orange px-4 py-1.5 rounded-full text-xs font-outfit font-bold uppercase tracking-widest mb-5">
              ❓ Got Questions?
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="font-outfit text-4xl md:text-6xl font-black text-white leading-tight mb-5">
            Frequently Asked{' '}
            <span style={{ background: 'linear-gradient(90deg, #FF7A00, #FFC107)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Questions</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about going solar — costs, subsidies, installation, and maintenance. Can't find your answer? Talk to our experts.
          </motion.p>
        </div>
      </section>
      <FAQ />
      <section className="py-10 px-5 bg-slate-50 border-t border-gray-100">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center">
          <div className="text-5xl mb-4">🤔</div>
          <h3 className="font-outfit text-2xl font-black text-navy mb-3">Still Have Questions?</h3>
          <p className="text-slate-500 mb-7">Our solar experts are available Mon–Sat, 9 AM to 7 PM. We'll answer any question you have.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Talk to an Expert ⚡</Link>
            <a href="tel:+919800012345" className="btn-outline" style={{ color: '#0B1F3A', borderColor: 'rgba(11,31,58,0.3)' }}>📞 Call Us Now</a>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
