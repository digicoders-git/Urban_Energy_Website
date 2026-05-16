import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import HeroImage from '../../public/hero.png'
import { ChevronRight, Sun } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col bg-white">

      {/* Subtle light bg accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,184,0,0.08) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,122,0,0.05) 0%, transparent 70%)' }} />

      {/* ── MOBILE: image first, then content ── */}
      <div className="md:hidden flex flex-col w-full">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full pt-20"
        >
          <div className="relative w-full overflow-hidden" style={{ boxShadow: '0 8px 40px rgba(255,122,0,0.12)' }}>
            <img
              src={HeroImage}
              alt="Vaulix Solar Installation"
              className="w-full h-[260px] object-cover object-center"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(255,255,255,0.6) 100%)' }} />
          </div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 w-full px-5 pt-8 pb-12 text-center">
          <motion.div {...fadeUp(0)} className="mb-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-space font-bold uppercase tracking-widest" style={{ background: 'rgba(255,184,0,0.12)', border: '1px solid rgba(255,184,0,0.35)', color: '#FF8C00' }}>
              <Sun size={13} className="animate-spin" style={{ animationDuration: '8s' }} />
              Vaulix Solar — Your Trusted Solar Partner
            </span>
          </motion.div>

          <motion.h1 {...fadeUp(0.1)} className="font-orbitron text-3xl font-black leading-[1.15] tracking-tight text-navy">
            Reliable Energy for<br />
            <span className="glow-text">Your Future Home</span><br />
            <span className="text-2xl text-slate-700">Real Savings Up to </span>
            <span className="sky-text text-2xl">90% on Bills</span>
          </motion.h1>

          <motion.p {...fadeUp(0.2)} className="mt-5 text-slate-500 text-base font-space max-w-sm mx-auto leading-relaxed">
            Vaulix Solar delivers <span className="font-bold text-orange-500">Transparent & Practical</span> solar solutions tailored to your needs.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="mt-8 flex flex-col items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 group font-space font-bold text-base px-8 py-3.5 rounded-full text-white transition-all duration-300 w-full justify-center"
              style={{ background: 'linear-gradient(135deg, #FFB800, #FF7A00)', boxShadow: '0 6px 24px rgba(255,122,0,0.3)' }}
            >
              Get Free Consultation
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/solar/on-grid" className="inline-flex items-center gap-2 font-space font-semibold text-base px-8 py-3.5 rounded-full w-full justify-center transition-all duration-300" style={{ background: '#f8faff', border: '1.5px solid #e2e8f0', color: '#0B1D51' }}>
              Explore Solutions
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── DESKTOP: text left, image right / stacked ── */}
      <div className="hidden md:flex flex-col w-full">
        {/* Text content */}
        <div className="relative z-10 w-full pt-40 pb-16 px-5 text-center">
          <motion.div {...fadeUp(0)} className="mb-6">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-space font-bold uppercase tracking-widest" style={{ background: 'rgba(255,184,0,0.12)', border: '1px solid rgba(255,184,0,0.35)', color: '#FF8C00' }}>
              <Sun size={14} className="animate-spin" style={{ animationDuration: '8s' }} />
              Vaulix Solar — Your Trusted Solar Partner
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="font-orbitron text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight"
          >
            <span className="text-navy">Reliable Energy for</span><br />
            <span className="glow-text">Your Future Home</span><br />
            <span className="text-slate-700 text-4xl md:text-5xl">Real Savings Up to </span>
            <span className="sky-text text-4xl md:text-5xl">90% on Bills</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="mt-8 text-slate-500 text-lg md:text-xl font-space max-w-2xl mx-auto leading-relaxed"
          >
            Vaulix Solar delivers <span className="font-bold" style={{ color: '#FF8C00' }}>Transparent & Practical</span> solar solutions tailored to your needs.
            Easy installation · Full maintenance support · MNRE certified expertise.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 group font-space font-bold text-base px-10 py-4 rounded-full text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #FFB800, #FF7A00)', boxShadow: '0 8px 32px rgba(255,122,0,0.3)' }}
            >
              Get Free Consultation
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/solar/on-grid" className="inline-flex items-center gap-2 font-space font-semibold text-base px-10 py-4 rounded-full transition-all duration-300 hover:-translate-y-1" style={{ background: '#f8faff', border: '1.5px solid #e2e8f0', color: '#0B1D51' }}>
              Explore Solutions
            </Link>
          </motion.div>
        </div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full px-4 md:px-10 pb-10"
        >
          <div className="relative w-full rounded-3xl md:rounded-[40px] overflow-hidden" style={{ boxShadow: '0 40px 80px -20px rgba(255,122,0,0.15), 0 0 0 1px rgba(255,184,0,0.08)' }}>
            <img
              src={HeroImage}
              alt="Vaulix Solar Installation"
              className="w-full h-[320px] sm:h-[440px] md:h-[580px] lg:h-[640px] object-cover object-center"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.15) 0%, transparent 50%)' }} />
          </div>
        </motion.div>
      </div>

    </section>
  )
}
