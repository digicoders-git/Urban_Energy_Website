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
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col" style={{ background: 'linear-gradient(160deg, #0B1D51 0%, #0d2460 40%, #0B1D51 100%)' }}>

      {/* Animated sun orb */}
      <div className="absolute top-20 right-10 md:right-32 w-64 h-64 md:w-96 md:h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,184,0,0.25) 0%, rgba(255,122,0,0.1) 40%, transparent 70%)', filter: 'blur(2px)' }} />
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="absolute top-24 right-16 md:right-40 w-32 h-32 md:w-48 md:h-48 rounded-full pointer-events-none solar-glow"
        style={{ background: 'radial-gradient(circle, #FFB800 0%, #FF7A00 50%, transparent 75%)' }}
      />

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Floating energy particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
          style={{ background: '#FFB800', left: `${15 + i * 14}%`, top: `${30 + (i % 3) * 20}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 3 + i * 0.5, delay: i * 0.4 }}
        />
      ))}

      {/* Top text content */}
      <div className="relative z-10 w-full pt-32 md:pt-40 pb-16 px-5 text-center">

        <motion.div {...fadeUp(0)} className="mb-6">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-space font-bold uppercase tracking-widest" style={{ background: 'rgba(255,184,0,0.15)', border: '1px solid rgba(255,184,0,0.4)', color: '#FFB800' }}>
            <Sun size={14} className="animate-spin" style={{ animationDuration: '8s' }} />
            Urban Energy — Your Trusted Solar Partner
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.1)}
          className="font-orbitron text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight"
        >
          <span className="text-white">Reliable Energy for</span><br />
          <span className="glow-text">Your Future Home</span><br />
          <span className="text-white text-3xl sm:text-4xl md:text-5xl">Real Savings Up to </span>
          <span className="sky-text text-3xl sm:text-4xl md:text-5xl">90% on Bills</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="mt-8 text-white/60 text-lg md:text-xl font-space max-w-2xl mx-auto leading-relaxed"
        >
          Urban Energy delivers <span className="font-bold" style={{ color: '#FFB800' }}>Transparent & Practical</span> solar solutions tailored to your needs.
          Easy installation · Full maintenance support · MNRE certified expertise.
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 group font-space font-bold text-base px-10 py-4 rounded-full text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #FFB800, #FF7A00)', boxShadow: '0 8px 32px rgba(255,122,0,0.4)' }}
          >
            Get Free Consultation
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/solar/on-grid" className="inline-flex items-center gap-2 font-space font-semibold text-base px-10 py-4 rounded-full transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
            Explore Solutions
          </Link>
        </motion.div>


      </div>

      {/* Full-width hero image */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full px-4 md:px-10 pb-10"
      >
        <div className="relative w-full rounded-3xl md:rounded-[40px] overflow-hidden" style={{ boxShadow: '0 40px 100px -20px rgba(255,184,0,0.2), 0 0 0 1px rgba(255,184,0,0.1)' }}>
          <img
            src={HeroImage}
            alt="Urban Energy Solar Installation"
            className="w-full h-[320px] sm:h-[440px] md:h-[580px] lg:h-[640px] object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,29,81,0.7) 0%, rgba(11,29,81,0.1) 50%, transparent 100%)' }} />


        </div>
      </motion.div>

    </section>
  )
}
