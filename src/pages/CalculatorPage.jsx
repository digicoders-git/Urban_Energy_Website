import React from 'react'
import { motion } from 'framer-motion'
import SolarCalculator from '../components/SolarCalculator'
import SubsidyCalc from '../components/SubsidyCalc'
import { FaCalculator } from "react-icons/fa";
export default function CalculatorPage() {
  return (
    <main className="pt-16">
      <section className="relative py-20 px-5 overflow-hidden bg-navy">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #FF7A00 0%, transparent 60%)' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 bg-orange/15 border border-orange/30 text-orange px-4 py-1.5 rounded-full text-xs font-outfit font-bold uppercase tracking-widest mb-5">
              <FaCalculator /> Solar Calculator
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="font-outfit text-4xl md:text-6xl font-black text-white leading-tight mb-5">
            How Much Can{' '}
            <span style={{ background: 'linear-gradient(90deg, #FF7A00, #FFC107)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>You Save?</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            Enter your monthly electricity bill and get an instant estimate of your solar savings, system size, and government subsidy eligibility.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }} className="flex flex-wrap justify-center gap-8 mt-8">
            {[['Up to 90%', 'Bill Reduction'], ['₹78K', 'Govt Subsidy'], ['25 yrs', 'Panel Life'], ['3–5 yrs', 'Payback Period']].map(([val, lbl]) => (
              <div key={lbl} className="text-center">
                <div className="font-outfit text-xl font-black text-orange">{val}</div>
                <div className="text-white/50 text-xs mt-0.5">{lbl}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      <SolarCalculator />
      <SubsidyCalc />
    </main>
  )
}
