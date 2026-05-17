import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const API = import.meta.env.VITE_API_URL
const cityIrr = {
  lucknow: 5.2, delhi: 5.5, mumbai: 5.0,
  bangalore: 5.3, chennai: 5.6, jaipur: 6.0,
  hyderabad: 5.7, pune: 5.4, ahmedabad: 5.8, kolkata: 4.9,
}

export default function SolarCalculator() {
  const [form, setForm] = useState({ bill: 3000, city: 'lucknow', roof: 500, type: 'grid' })
  const [results, setResults] = useState(null)
  const [queryForm, setQueryForm] = useState({ name: '', phone: '', requirement: '' })
  const [queryLoading, setQueryLoading] = useState(false)
  const [queryDone, setQueryDone] = useState(false)
  const [queryError, setQueryError] = useState('')

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const calculate = () => {
    const bill = parseFloat(form.bill) || 3000
    const roof = parseFloat(form.roof) || 500
    const sun = cityIrr[form.city] || 5.2
    const tariff = 7.5
    const sizeByBill = bill / tariff / 30 / sun
    const sizeByRoof = roof / 100
    let size = Math.min(sizeByBill, sizeByRoof)
    size = Math.max(1, Math.round(size * 2) / 2)
    const costPerKw = form.type === 'hybrid' ? 75000 : form.type === 'off' ? 90000 : 65000
    const sysCost = Math.round(size * costPerKw)
    const subsidyRate = size <= 3 ? 0.4 : size <= 10 ? 0.2 : 0
    const subsidy = Math.round(sysCost * subsidyRate)
    const net = sysCost - subsidy
    const annual = Math.round(size * sun * 365 * tariff)
    const payback = (net / annual).toFixed(1)
    const co2 = (size * sun * 365 * 0.82 / 1000).toFixed(1)
    setResults({ size, annual, sysCost, subsidy, net, payback, co2, twentyFive: annual * 25 })
    setQueryForm(f => ({ ...f, requirement: `${size} kW ${form.type} solar system — Monthly bill ₹${form.bill}, City: ${form.city}` }))
  }

  const submitQuery = async () => {
    if (!queryForm.name || !queryForm.phone) return setQueryError('Name aur phone required hai.')
    setQueryError('')
    setQueryLoading(true)
    try {
      const res = await fetch(`${API}/queries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: queryForm.name, phone: queryForm.phone, city: form.city, requirement: queryForm.requirement })
      })
      if (res.ok) { setQueryDone(true) }
      else {
        const data = await res.json()
        setQueryError(data.message || 'Something went wrong.')
      }
    } catch {
      setQueryError('Server error. Please try again.')
    } finally {
      setQueryLoading(false)
    }
  }

  const fmt = (n) => n?.toLocaleString('en-IN')

  return (
    <section id="calculator" className="py-12 px-5 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-tag">Smart Calculator</span>
          <h2 className="section-title">
            Calculate Your <span className="text-orange">Solar Savings</span>
          </h2>
          <p className="text-slate-500 mt-3 max-w-lg mx-auto">
            Enter your details and instantly see how much you can save with rooftop solar.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-strach">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 border border-gray-100 shadow-md"
          >
            <h3 className="font-outfit font-bold text-xl text-navy mb-8">Your Energy Details</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-outfit font-semibold text-navy mb-4">
                  Monthly Electricity Bill (₹)
                </label>
                <input
                  type="number"
                  value={form.bill}
                  onChange={(e) => set('bill', e.target.value)}
                  placeholder="Enter monthly electricity bill"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-navy font-inter focus:outline-none focus:border-orange transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-outfit font-semibold text-navy mb-4">City</label>
                <select
                  value={form.city}
                  onChange={(e) => set('city', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-navy font-inter focus:outline-none focus:border-orange transition-colors"
                >
                  <option value="lucknow">Lucknow (UP)</option>
                  <option value="delhi">Delhi / NCR</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="chennai">Chennai</option>
                  <option value="jaipur">Jaipur (Rajasthan)</option>
                  <option value="hyderabad">Hyderabad</option>
                  <option value="pune">Pune</option>
                  <option value="ahmedabad">Ahmedabad</option>
                  <option value="kolkata">Kolkata</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-outfit font-semibold text-navy mb-5">
                  Roof Area Available (sq ft)
                </label>
                <input
                  type="number"
                  value={form.roof}
                  onChange={(e) => set('roof', e.target.value)}
                  placeholder="Enter available roof area"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-navy font-inter focus:outline-none focus:border-orange transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-outfit font-semibold text-navy mb-5">System Type</label>
                <select
                  value={form.type}
                  onChange={(e) => set('type', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-navy font-inter focus:outline-none focus:border-orange transition-colors"
                >
                  <option value="grid">On-Grid (Recommended)</option>
                  <option value="hybrid">Hybrid (Battery Backup)</option>
                  <option value="off">Off-Grid</option>
                </select>
              </div>
              <button
                onClick={calculate}
                className="w-full py-4 mt-10 btn-primary rounded-xl font-outfit font-bold text-lg text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange/30"
                
              >
                Calculate My Savings
              </button>
            </div>
          </motion.div>

       {/* Results */}
<motion.div
  initial={{ opacity: 0, x: 30 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  className="flex flex-col gap-4 bg-white rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-100 shadow-md"
>
  {/* Top Stats */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

    {[
      { label: 'Annual Savings', val: `₹${fmt(results?.annual || 54000)}`, sub: 'Per year', highlight: true },
      { label: 'System Size', val: `${results?.size || 3} kW`, sub: 'Recommended' },
      { label: 'Payback Period', val: `${results?.payback || 3.2} yrs`, sub: 'ROI' },
      { label: '25-Year Savings', val: `₹${((results?.twentyFive || 1350000) / 100000).toFixed(1)}L+`, sub: 'Lifetime' },
    ].map((r) => (
      <motion.div
        key={r.label}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`rounded-2xl p-1 sm:p-4 text-center border ${
          r.highlight
            ? 'bg-orange/5 border-orange/20'
            : 'bg-white border-gray-100'
        }`}
      >
        <div className={`text-[10px] sm:text-xs font-outfit font-semibold uppercase tracking-widest mb-1 sm:mb-2 ${
          r.highlight ? 'text-orange/60' : 'text-slate-400'
        }`}>
          {r.label}
        </div>

        <div className={`font-outfit text-xl sm:text-2xl md:text-3xl font-black ${
          r.highlight ? 'text-orange' : 'text-orange'
        }`}>
          {r.val}
        </div>

        <div className={`text-[10px] sm:text-xs mt-1 ${
          r.highlight ? 'text-slate-400' : 'text-slate-400'
        }`}>
          {r.sub}
        </div>
      </motion.div>
    ))}
  </div>

  {/* Cost Breakdown */}
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-2xl p-1 sm:p-5 md:p-6 border border-gray-100"
  >
    <div className="text-[10px] sm:text-xs font-outfit font-semibold uppercase tracking-widest text-slate-400 mb-3 sm:mb-4">
      Cost Breakdown
    </div>

    <div className="space-y-2 sm:space-y-3">

      <div className="flex justify-between text-xs sm:text-sm">
        <span className="text-slate-500">Estimated System Cost</span>
        <span className="font-semibold text-navy">
          ₹{fmt(results?.sysCost || 165000)}
        </span>
      </div>

      <div className="flex justify-between text-xs sm:text-sm">
        <span className="text-slate-500">Govt Subsidy</span>
        <span className="font-semibold text-green-600">
          -₹{fmt(results?.subsidy || 66000)}
        </span>
      </div>

      <div className="flex justify-between pt-2 sm:pt-3 border-t border-gray-100 text-sm sm:text-base">
        <span className="font-outfit font-semibold text-navy">
          Your Net Cost
        </span>
        <span className="font-outfit font-black text-orange text-base sm:text-lg">
          ₹{fmt(results?.net || 99000)}
        </span>
      </div>

      <div className="flex justify-between text-xs sm:text-sm">
        <span className="text-slate-500">CO₂ Saved / Year</span>
        <span className="font-semibold text-green-600">
          {results?.co2 || 1.6} tonnes
        </span>
      </div>
    </div>
  </motion.div>

  {/* CTA */}
  <a
    href="#contact"
    className="btn-primary text-center text-base sm:text-lg py-3 sm:py-4"
  >
    Get My Custom Quote →
  </a>

  {/* Query Form */}
  {results && (
    <div className="bg-slate-50 border border-gray-100 rounded-2xl p-5">
      <div className="text-sm font-outfit font-bold text-navy mb-3">Get a Free Quote for Your {results.size} kW System</div>
      {queryDone ? (
        <div className="text-center py-3 px-4 rounded-xl text-green-700 font-semibold text-sm" style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)' }}>
          ✓ Query submitted! We'll call you within 24 hours.
        </div>
      ) : (
        <div className="space-y-3">
          <input
            value={queryForm.name}
            onChange={e => setQueryForm(f => ({ ...f, name: e.target.value }))}
            placeholder="Enter your name"
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-navy text-sm focus:outline-none focus:border-orange transition-colors"
          />
          <input
            value={queryForm.phone}
            onChange={e => setQueryForm(f => ({ ...f, phone: e.target.value }))}
            placeholder="Enter phone number"
            type="tel"
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-navy text-sm focus:outline-none focus:border-orange transition-colors"
          />
          {queryError && <p className="text-red-500 text-xs">{queryError}</p>}
          <button
            onClick={submitQuery}
            disabled={queryLoading}
            className="w-full py-3 rounded-xl font-outfit font-bold text-sm text-white disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #FF7A00, #ff9500)' }}
          >
            {queryLoading ? 'Submitting...' : 'Send My Query →'}
          </button>
        </div>
      )}
    </div>
  )}
</motion.div>
        </div>
      </div>
    </section>
  )
}
