import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const subsidyMap = {
  1: 78000, 2: 78000, 3: 78000, 5: 78000, 10: 78000,
}
const costMap = {
  1: 65000, 2: 130000, 3: 195000, 5: 325000, 10: 650000,
}

export default function SubsidyCalc() {
  const [size, setSize] = useState('3')
  const [type, setType] = useState('residential')

  const amount = type === 'residential' ? (subsidyMap[parseInt(size)] || 78000) : 0
  const sysCost = costMap[parseInt(size)] || 650000
  const netCost = type === 'residential' ? sysCost - amount : sysCost
  const note = type !== 'residential'
    ? 'Commercial systems are not eligible for central subsidy.'
    : `For ${size} kW residential system — subsidy eligibility may apply`

  return (
    <section
      id="subsidy"
      className="py-20 px-5 relative overflow-hidden bg-slate-50"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(255,193,7,0.06) 0%, transparent 60%)' }}
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
            style={{ background: 'rgba(255,193,7,0.12)', color: '#FF8C00', border: '1px solid rgba(255,184,0,0.3)' }}
          >
            Govt Scheme
          </span>
          <h2 className="font-outfit text-4xl font-black text-navy leading-tight mb-5">
            Government Solar<br />Subsidy Calculator
          </h2>
          <p className="text-slate-500 text-base leading-relaxed mb-7">
            Under government solar schemes, residential consumers may get up to 40%
            subsidy on solar installation. Check your eligibility instantly and let us handle
            all the paperwork.
          </p>
          <ul className="space-y-3">
            {[
              'Up to ₹78,000 subsidy for 3 kW systems',
              'Additional state-level subsidies also available',
              'We help with subsidy applications and documentation',
              'Direct bank transfer from Ministry of New & Renewable Energy',
              'Applicable to all residential electricity consumers',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-600 text-sm">
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
          className="rounded-2xl p-8 bg-white border border-gray-100 shadow-md"
        >
          <h3 className="font-outfit font-bold text-xl text-navy mb-6">Calculate Your Subsidy</h3>
          <div className="space-y-5">
            <div>
              <label className="block text-slate-600 text-sm font-outfit font-semibold mb-2">System Size (kW)</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-4 py-3 rounded-xl font-inter focus:outline-none focus:border-orange transition-colors border-2 border-gray-200 text-navy bg-white"
              >
                <option value="1">1 kW</option>
                <option value="2">2 kW</option>
                <option value="3">3 kW</option>
                <option value="5">5 kW</option>
                <option value="10">10 kW+</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-600 text-sm font-outfit font-semibold mb-2">Consumer Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl font-inter focus:outline-none transition-colors border-2 border-gray-200 text-navy bg-white"
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial / Industrial</option>
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
              <div className="text-slate-500 text-xs font-outfit font-semibold uppercase tracking-widest mb-2">
                Your Central Govt Subsidy
              </div>
              <div className="font-outfit font-black text-5xl" style={{ color: '#FFC107' }}>
                {amount > 0 ? `₹${amount.toLocaleString('en-IN')}` : 'N/A'}
              </div>
              <div className="text-slate-400 text-sm mt-2">{note}</div>

              {type === 'residential' && (
                <div className="mt-4 pt-4 border-t border-yellow-200 space-y-2 text-sm text-left">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimated System Cost</span>
                    <span className="font-semibold text-navy">₹{sysCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Govt Subsidy</span>
                    <span className="font-semibold text-green-600">-₹{amount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-yellow-200">
                    <span className="font-outfit font-bold text-navy">Your Net Cost</span>
                    <span className="font-outfit font-black text-orange">₹{netCost.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}
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
