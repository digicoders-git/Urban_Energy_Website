import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { HandCoins } from 'lucide-react'

const API = import.meta.env.VITE_API_URL

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', bill: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.city)
      return setError('Please fill all required fields.')
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          city: form.city,
          bill: Number(form.bill),
          message: form.message
        })
      })
      if (res.ok) {
        setSubmitted(true)
        setForm({ name: '', phone: '', email: '', city: '', bill: '', message: '' })
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        const data = await res.json()
        setError(data.message || 'Something went wrong.')
      }
    } catch {
      setError('Server error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="min-h-screen py-16 px-5 bg-slate-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-8 border border-gray-100 shadow-md w-full max-w-xl"
      >
        <div className="text-center mb-8">
          <span className="section-tag">Contact Us</span>
          <h2 className="section-title mt-2">Get a Free <span className="text-orange">Quote</span></h2>
          <p className="text-slate-500 text-sm mt-2">Fill the form and we'll call you within 24 hours.</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-outfit font-semibold text-navy mb-1.5">Full Name *</label>
              <input
                value={form.name} onChange={(e) => set('name', e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-navy text-sm focus:outline-none focus:border-orange transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-outfit font-semibold text-navy mb-1.5">Phone Number *</label>
              <input
                value={form.phone} onChange={(e) => set('phone', e.target.value)}
                placeholder="Enter phone number" type="tel"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-navy text-sm focus:outline-none focus:border-orange transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-outfit font-semibold text-navy mb-1.5">Email Address</label>
            <input
              value={form.email} onChange={(e) => set('email', e.target.value)}
              placeholder="Enter email address" type="email"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-navy text-sm focus:outline-none focus:border-orange transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-outfit font-semibold text-navy mb-1.5">City *</label>
              <input
                value={form.city} onChange={(e) => set('city', e.target.value)}
                placeholder="Enter your city"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-navy text-sm focus:outline-none focus:border-orange transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-outfit font-semibold text-navy mb-1.5">Monthly Bill (₹)</label>
              <input
                value={form.bill} onChange={(e) => set('bill', e.target.value)}
                placeholder="e.g. 3000" type="number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-navy text-sm focus:outline-none focus:border-orange transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-outfit font-semibold text-navy mb-1.5">Message (Optional)</label>
            <textarea
              value={form.message} onChange={(e) => set('message', e.target.value)}
              placeholder="Write your message here..." rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-navy text-sm focus:outline-none focus:border-orange transition-colors resize-none"
            />
          </div>

          <button
            onClick={handleSubmit} disabled={loading}
            className="w-full py-4 rounded-xl font-outfit flex items-center justify-center gap-2 font-bold text-lg text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange/30 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #FF7A00, #ff9500)' }}
          >
            {loading ? 'Sending...' : <> Send My Request <HandCoins /> </>}
          </button>

          {error && (
            <div className="text-center py-3 px-4 rounded-xl text-red-700 font-semibold text-sm" style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)' }}>
              ⚠ {error}
            </div>
          )}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-center py-3 px-4 rounded-xl text-green-700 font-semibold text-sm"
              style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)' }}
            >
              ✓ Thank you! We'll call you within 24 hours.
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  )
}
