import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import HeroImage from '../../public/hero.png'
import { HandCoins } from "lucide-react";
const stats = [
  { num: '5000+', label: 'Installations Done' },
  { num: '15 MW', label: 'Capacity Installed' },
  { num: '₹12Cr+', label: 'Savings Generated' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
})

/* ✅ Counter add */
const Counter = ({ value }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let num = parseInt(value.replace(/[^0-9]/g, ""))
    let start = 0
    let duration = 2000
    let step = num / (duration / 16)

    let timer = setInterval(() => {
      start += step
      if (start >= num) {
        setCount(num)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value])

  let suffix = value.replace(/[0-9]/g, "")

  return <>{count}{suffix}</>
}

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen absolute inset-0 bg-black/50 flex items-center  pt-24 pb-16 px-5 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${HeroImage})` }}
    >

      {/* ✅ Overlay add kiya (visibility ke liye) */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Left: Content */}
        {/* Left: Content */}
<div className="flex-1 max-w-xl text-center lg:text-left">
  <motion.div {...fadeUp(0)}>
    <span className="inline-flex items-center gap-2 bg-orange/15 border border-orange/30 text-orange px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-outfit font-bold uppercase tracking-widest mb-5 sm:mb-6">
      ☀ India's Trusted Solar Partner
    </span>
  </motion.div>

  <motion.h1
    {...fadeUp(0.1)}
    className="font-outfit text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-4 sm:mb-5"
  >
    Power Your Home<br />
    With{' '}
    <span
      style={{
        background: 'linear-gradient(90deg, #FF7A00, #FFC107)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      Solar Energy
    </span>
  </motion.h1>

  <motion.p
    {...fadeUp(0.2)}
    className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-9 max-w-md mx-auto lg:mx-0"
  >
    Cut electricity bills by up to 90%. Get government-subsidized solar
    panels installed by certified experts. Clean energy for a brighter India.
  </motion.p>

 <motion.div
  {...fadeUp(0.3)}
  className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-12 justify-center lg:justify-start"
>
  <Link 
    to="/calculator" 
    className="btn-primary flex items-center justify-center gap-2"
  >
    Calculate Savings 
    <HandCoins />
  </Link>

  <Link 
    to="/contact" 
    className="btn-outline flex items-center justify-center"
  >
    Free Site Survey
  </Link>
</motion.div>

  <motion.div
    {...fadeUp(0.4)}
    className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-10 pt-6 sm:pt-8 border-t border-white/10"
  >
    {stats.map((s) => (
      <div key={s.label}>
        <div className="font-outfit text-2xl sm:text-3xl font-black text-orange">
          <Counter value={s.num} />
        </div>
        <div className="text-white/50 text-[10px] sm:text-xs mt-1">{s.label}</div>
      </div>
    ))}
  </motion.div>
</div>

        {/* Right: Live Dashboard Cards (UNCHANGED) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1 max-w-md w-full flex flex-col gap-4"
        >
          {/* Energy Production Card */}
          <div
            className="rounded-2xl p-6"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white text-xs font-outfit font-semibold uppercase tracking-widest">
                Live Energy Production
              </h4>
              <span className="flex items-center gap-1.5 text-green-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-live" />
                Live
              </span>
            </div>
            {[
              { label: 'Solar', pct: 82 },
              { label: 'Grid', pct: 12 },
              { label: 'Battery', pct: 6 },
            ].map((b, i) => (
              <div key={b.label} className="flex items-center gap-3 mb-2.5 last:mb-0">
                <span className="text-white text-sm w-16">{b.label}</span>
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${b.pct}%` }}
                    transition={{ duration: 1.2, delay: 0.5 + i * 0.15 }}
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #FF7A00, #FFC107)' }}
                  />
                </div>
                <span className="text-white font-outfit font-bold text-sm w-9 text-right">{b.pct}%</span>
              </div>
            ))}
          </div>

          {/* Savings Card */}
          <div
            className="rounded-2xl p-6"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <h4 className="text-white text-xs font-outfit font-semibold uppercase tracking-widest mb-4">
              This Month's Savings
            </h4>
            <div className="flex items-center justify-between">
              <span className="font-outfit text-4xl font-black text-yellow">₹4,820</span>
              <div className="text-right">
                <div className="text-white text-sm">Saved vs grid</div>
                <div className="text-green-400 text-sm font-semibold mt-1">↑ 23% vs last month</div>
              </div>
            </div>
          </div>

          {/* Mini stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '☀️', val: '18 kWh', label: "Today's Generation" },
              { icon: '🌿', val: '2.4T', label: 'CO₂ Offset / Year' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl p-4"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-outfit font-black text-white text-xl">{item.val}</div>
                <div className="text-white text-xs mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}