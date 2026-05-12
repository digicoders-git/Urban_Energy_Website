import React from 'react'
import { motion } from 'framer-motion'
import Contact from '../components/Contact'
import { FaPhoneAlt } from "react-icons/fa";
export default function ContactPage() {
  return (
    <main className="pt-16">
      <section className="relative py-20 px-5 overflow-hidden bg-navy">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 60% 40%, #FF7A00 0%, transparent 55%), radial-gradient(circle at 20% 80%, #FFC107 0%, transparent 40%)' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 bg-orange/15 border border-orange/30 text-orange px-4 py-1.5 rounded-full text-xs font-outfit font-bold uppercase tracking-widest mb-5">
              <FaPhoneAlt /> Get In Touch
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="font-outfit text-4xl md:text-6xl font-black text-white leading-tight mb-5">
            Let's Go{' '}
            <span style={{ background: 'linear-gradient(90deg, #FF7A00, #FFC107)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Solar Together</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            Get a free site survey and customized solar proposal within 24 hours. Our experts are ready to help you start saving.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-wrap justify-center gap-8 mt-8">
            {[['Free', 'Site Survey'], ['24 hrs', 'Response Time'], ['₹0', 'Consultation Fee'], ['Premium', 'Service']].map(([val, lbl]) => (
              <div key={lbl} className="text-center">
                <div className="font-outfit text-xl font-black text-orange">{val}</div>
                <div className="text-white/50 text-xs mt-0.5">{lbl}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      <Contact />
    </main>
  )
}
