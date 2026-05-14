import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const subsidyMap = {
  1: 30000, 2: 60000, 3: 78000, 5: 78000, 10: 78000,
}

export default function SubsidyCalc() {
  const [size, setSize] = useState('3')
  const [type, setType] = useState('residential')

  const amount = type === 'residential' ? (subsidyMap[parseInt(size)] || 78000) : 0
  const note = type !== 'residential'
    ? 'Commercial systems are not eligible for central subsidy.'
    : `For ${size} kW residential system under PM Surya Ghar Yojana`

  return (
    <section
      id="subsidy"
      className="py-20 px-5 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #112378 0%, #1a3a6b 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(255,193,7,0.08) 0%, transparent 60%)' }}
      />
      <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-outfit font-bold uppercase tracking-widest mb-5"
            style={{ background: 'rgba(255,193,7,0.15)', color: '#FFC107' }}
          >
            Govt Scheme
          </span>
          <h2 className="font-outfit text-4xl font-black text-white leading-tight mb-5">
            PM Surya Ghar<br />Subsidy Calculator
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-7">
            Under PM Surya Ghar Muft Bijli Yojana, residential consumers get up to 40%
            subsidy on solar installation. Check your eligibility instantly and let us handle
            all the paperwork.
          </p>
          <ul className="space-y-3">
            {[
              'Up to ₹78,000 subsidy for 3 kW systems',
              'Additional state-level subsidies also available',
              'We handle all paperwork & MNRE portal registration',
              'Direct bank transfer from Ministry of New & Renewable Energy',
              'Applicable to all residential electricity consumers',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-white/75 text-sm">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center text-green-400 text-xs font-bold mt-0.5">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Calc */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl p-8"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <h3 className="font-outfit font-bold text-xl text-white mb-6">Calculate Your Subsidy</h3>
          <div className="space-y-5">
            <div>
              <label className="block text-white/60 text-sm font-outfit font-semibold mb-2">System Size (kW)</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-white font-inter focus:outline-none focus:border-orange transition-colors"
                style={{ background: '#1a3a6b', border: '1.5px solid rgba(255,255,255,0.25)', color: '#fff' }}
              >
                <option value="1" style={{ background: '#1a3a6b', color: '#fff' }}>1 kW</option>
                <option value="2" style={{ background: '#1a3a6b', color: '#fff' }}>2 kW</option>
                <option value="3" style={{ background: '#1a3a6b', color: '#fff' }}>3 kW</option>
                <option value="5" style={{ background: '#1a3a6b', color: '#fff' }}>5 kW</option>
                <option value="10" style={{ background: '#1a3a6b', color: '#fff' }}>10 kW+</option>
              </select>
            </div>
            <div>
              <label className="block text-white/60 text-sm font-outfit font-semibold mb-2">Consumer Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-white font-inter focus:outline-none transition-colors"
                style={{ background: '#1a3a6b', border: '1.5px solid rgba(255,255,255,0.25)', color: '#fff' }}
              >
                <option value="residential" style={{ background: '#1a3a6b', color: '#fff' }}>Residential</option>
                <option value="commercial" style={{ background: '#1a3a6b', color: '#fff' }}>Commercial / Industrial</option>
              </select>
            </div>

            {/* Result */}
            <motion.div
              key={`${size}-${type}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="rounded-xl p-6 text-center"
              style={{ background: 'rgba(255,193,7,0.1)', border: '1px solid rgba(255,193,7,0.25)' }}
            >
              <div className="text-white/50 text-xs font-outfit font-semibold uppercase tracking-widest mb-2">
                Your Central Govt Subsidy
              </div>
              <div className="font-outfit font-black text-5xl" style={{ color: '#FFC107' }}>
                {amount > 0 ? `₹${amount.toLocaleString('en-IN')}` : 'N/A'}
              </div>
              <div className="text-white/40 text-sm mt-2">{note}</div>
            </motion.div>

            <Link to="/contact" className="btn-primary block text-center">
              Claim My Subsidy →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
