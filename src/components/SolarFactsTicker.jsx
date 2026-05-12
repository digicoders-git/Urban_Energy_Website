import React from 'react'
import { motion } from 'framer-motion'
import { Sun, Zap, Leaf, TrendingDown, Award, Globe } from 'lucide-react'

const facts = [
  { icon: <Sun size={14} />, text: 'India receives 300+ sunny days per year' },
  { icon: <Zap size={14} />, text: '1 kW solar saves ₹1,500/month on average' },
  { icon: <Leaf size={14} />, text: '1 kW solar = 1.5 tonnes CO₂ saved annually' },
  { icon: <TrendingDown size={14} />, text: 'Solar panel costs dropped 90% in 10 years' },
  { icon: <Award size={14} />, text: 'PM Surya Ghar: Up to ₹78,000 subsidy available' },
  { icon: <Globe size={14} />, text: 'India targets 500 GW renewable energy by 2030' },
  { icon: <Sun size={14} />, text: 'Solar ROI achieved in just 3–5 years' },
  { icon: <Zap size={14} />, text: 'Net metering lets you sell power back to grid' },
]

export default function SolarFactsTicker() {
  return (
    <div className="relative overflow-hidden py-3" style={{ background: 'linear-gradient(90deg, #0B1D51, #1a3a8f, #0B1D51)', borderTop: '1px solid rgba(255,184,0,0.2)', borderBottom: '1px solid rgba(255,184,0,0.2)' }}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
        className="flex gap-10 whitespace-nowrap"
        style={{ width: 'max-content' }}
      >
        {[...facts, ...facts].map((f, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-xs font-space font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <span style={{ color: '#FFB800' }}>{f.icon}</span>
            {f.text}
            <span className="mx-4" style={{ color: 'rgba(255,184,0,0.3)' }}>◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
