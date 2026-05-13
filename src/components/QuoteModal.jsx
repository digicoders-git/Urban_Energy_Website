import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Phone, Mail, User, MapPin, IndianRupee, Zap, Home } from 'lucide-react'
import { useModal } from '../context/ModalContext'

const API = import.meta.env.VITE_API_URL

const EMPTY = { name: '', phone: '', email: '', city: '', bill: '', systemSize: '', type: 'Residential', message: '' }

export default function QuoteModal() {
  const { isQuoteModalOpen, closeQuoteModal } = useModal()
  const [form, setForm]           = useState(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')

  useEffect(() => {
    document.body.style.overflow = isQuoteModalOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isQuoteModalOpen])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.city)
      return setError('Please fill all required fields.')
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API}/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:       form.name.trim(),
          phone:      form.phone.trim(),
          email:      form.email.trim(),
          city:       form.city.trim(),
          bill:       form.bill ? `₹${form.bill}/mo` : '',
          systemSize: form.systemSize.trim(),
          type:       form.type,
          message:    form.message.trim(),
        })
      })
      if (res.ok) {
        setSubmitted(true)
        setForm(EMPTY)
        setTimeout(() => { setSubmitted(false); closeQuoteModal() }, 3000)
      } else {
        const d = await res.json()
        setError(d.message || 'Something went wrong.')
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
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeQuoteModal}
            className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-[100]"
          />

          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden pointer-events-auto relative max-h-[90vh] overflow-y-auto"
            >
              <div className="h-2 w-full bg-gradient-to-r from-orange to-orange/80" />

              <button onClick={closeQuoteModal}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors">
                <X size={20} />
              </button>

              <div className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-navy">
                    Get a Free <span className="text-orange">Quote</span>
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">Fill details and we'll contact you shortly.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input required type="text" placeholder="Enter your full name"
                        value={form.name} onChange={e => set('name', e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange transition-all" />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input required type="tel" placeholder="Enter phone number"
                        value={form.phone} onChange={e => set('phone', e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange transition-all" />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="email" placeholder="Enter email address"
                      value={form.email} onChange={e => set('email', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange transition-all" />
                  </div>

                  {/* City + Monthly Bill */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input required type="text" placeholder="Enter your city"
                        value={form.city} onChange={e => set('city', e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange transition-all" />
                    </div>
                    <div className="relative">
                      <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input type="number" placeholder="Monthly bill (₹)"
                        value={form.bill} onChange={e => set('bill', e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange transition-all" />
                    </div>
                  </div>

                  {/* System Size + Type */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Zap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input type="text" placeholder="System size (e.g. 5 kW)"
                        value={form.systemSize} onChange={e => set('systemSize', e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange transition-all" />
                    </div>
                    <div className="relative">
                      <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <select value={form.type} onChange={e => set('type', e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange transition-all bg-white">
                        <option>Residential</option>
                        <option>Commercial</option>
                        <option>Society</option>
                        <option>Off-Grid</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <textarea placeholder="Write your message here..." rows={3}
                    value={form.message} onChange={e => set('message', e.target.value)}
                    className="w-full p-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange transition-all resize-none" />

                  <button type="submit" disabled={loading || submitted}
                    className={`w-full py-4 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2 shadow-lg transition-all hover:-translate-y-0.5 ${submitted ? 'bg-green-500' : 'bg-gradient-to-r from-[#FF7A00] to-[#ff9500]'} disabled:opacity-70`}>
                    {loading ? 'Sending...' : submitted ? '✓ Request Submitted' : <><Send size={18} /> Request Call Back</>}
                  </button>

                  {error && <p className="text-center text-red-500 text-xs font-medium bg-red-50 py-2 rounded-lg">{error}</p>}
                  {submitted && (
                    <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                      className="text-center text-green-600 text-xs font-medium">
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
