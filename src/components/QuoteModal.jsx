import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Phone, Mail, User, MapPin, IndianRupee } from 'lucide-react'
import { useModal } from '../context/ModalContext'

const API = import.meta.env.VITE_API_URL

export default function QuoteModal() {
  const { isQuoteModalOpen, closeQuoteModal } = useModal()
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', bill: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isQuoteModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isQuoteModalOpen])

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.email || !form.city || !form.bill)
      return setError('Please fill all required fields.')
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API}/contact/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.name,
          phoneNumber: form.phone,
          email: form.email,
          city: form.city,
          monthlyBill: Number(form.bill),
          message: form.message
        })
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
        setForm({ name: '', phone: '', email: '', city: '', bill: '', message: '' })
        setTimeout(() => {
          setSubmitted(false)
          closeQuoteModal()
        }, 3000)
      } else {
        setError(data.message || 'Something went wrong.')
      }
    } catch {
      setError('Server error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isQuoteModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuoteModal}
            className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden pointer-events-auto relative"
            >
              {/* Top visual bar */}
              <div className="h-2 w-full bg-gradient-to-r from-orange to-orange/80" />
              
              <button
                onClick={closeQuoteModal}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors duration-200"
              >
                <X size={20} />
              </button>

              <div className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-navy">
                    Get a Free <span className="text-orange">Quote</span>
                  </h2>
                  <p className="text-slate-500 text-sm sm:text-base mt-1">Fill details and we'll contact you shortly.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        required
                        type="text"
                        placeholder="Full Name *"
                        value={form.name}
                        onChange={(e) => set('name', e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        required
                        type="tel"
                        placeholder="Phone Number *"
                        value={form.phone}
                        onChange={(e) => set('phone', e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      required
                      type="email"
                      placeholder="Email Address *"
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        required
                        type="text"
                        placeholder="City *"
                        value={form.city}
                        onChange={(e) => set('city', e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all"
                      />
                    </div>
                    <div className="relative">
                      <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        required
                        type="number"
                        placeholder="Monthly Bill *"
                        value={form.bill}
                        onChange={(e) => set('bill', e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <textarea
                      placeholder="Any message or specific requirement?"
                      rows={3}
                      value={form.message}
                      onChange={(e) => set('message', e.target.value)}
                      className="w-full p-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || submitted}
                    className={`w-full py-4 rounded-xl font-bold text-white text-base sm:text-lg flex items-center justify-center gap-2 shadow-lg transition-all transform hover:-translate-y-0.5 ${
                      submitted ? 'bg-green-500 shadow-green-500/20' : 'bg-gradient-to-r from-[#FF7A00] to-[#ff9500] hover:shadow-orange/30'
                    } disabled:opacity-70`}
                  >
                    {loading ? (
                      'Sending Details...'
                    ) : submitted ? (
                      '✓ Request Submitted'
                    ) : (
                      <>
                        Request Call Back <Send size={18} />
                      </>
                    )}
                  </button>

                  {error && (
                    <p className="text-center text-red-500 text-xs font-medium bg-red-50 py-2 rounded-lg">
                      {error}
                    </p>
                  )}

                  {submitted && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-green-600 text-xs font-medium"
                    >
                      Thank you! Expect our call within 24 hrs.
                    </motion.p>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
