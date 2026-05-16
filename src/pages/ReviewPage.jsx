import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Send, User, Briefcase, MessageSquare } from 'lucide-react'

const API = import.meta.env.VITE_API_URL

export default function ReviewPage() {
  const [form, setForm] = useState({ name: '', role: '', stars: 5, review: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [hovered, setHovered] = useState(0)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) return setError('Please enter your name.')
    if (!form.review.trim()) return setError('Please write your review.')
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          role: form.role.trim(),
          initials: form.name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2),
          stars: form.stars,
          review: form.review.trim(),
        })
      })
      if (res.ok) {
        setSubmitted(true)
        setForm({ name: '', role: '', stars: 5, review: '' })
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
    <main className="pt-16 bg-slate-50 min-h-screen">

      {/* Hero */}
      <section className="relative py-20 px-5 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 60% 40%, #FF7A00 0%, transparent 55%), radial-gradient(circle at 20% 80%, #FFC107 0%, transparent 40%)' }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 bg-orange/10 border border-orange/25 text-orange px-4 py-1.5 rounded-full text-xs font-outfit font-bold uppercase tracking-widest mb-5">
              <Star size={13} fill="#FF7A00" /> Share Your Experience
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-outfit text-4xl md:text-5xl font-black text-navy leading-tight mb-4">
            How Was Your <span style={{ background: 'linear-gradient(90deg,#FF7A00,#FFC107)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Solar Experience?</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-slate-500 text-base leading-relaxed max-w-xl mx-auto">
            Your feedback helps others make the right decision. Share your honest experience with Vaulix Solar.
          </motion.p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 px-5">
        <div className="max-w-xl mx-auto">
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-10 text-center shadow-lg border border-gray-100">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: 'rgba(34,197,94,0.1)' }}>
                <Star size={36} fill="#22c55e" color="#22c55e" />
              </div>
              <h3 className="font-outfit font-black text-2xl text-navy mb-3">Thank You!</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Your review has been submitted and is pending approval. We'll publish it shortly after review.
              </p>
              <button onClick={() => setSubmitted(false)}
                className="px-6 py-3 rounded-xl font-outfit font-bold text-sm text-white"
                style={{ background: 'linear-gradient(135deg,#FF7A00,#ff9500)' }}>
                Submit Another Review
              </button>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold uppercase text-navy/60 tracking-widest mb-2">Full Name *</label>
                  <div className="relative">
                    <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text" placeholder="Enter your full name"
                      value={form.name} onChange={e => set('name', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange transition-all text-navy"
                    />
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-xs font-bold uppercase text-navy/60 tracking-widest mb-2">Your Role / Location <span className="normal-case font-normal">(optional)</span></label>
                  <div className="relative">
                    <Briefcase size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text" placeholder="Enter your role or location"
                      value={form.role} onChange={e => set('role', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange transition-all text-navy"
                    />
                  </div>
                </div>

                {/* Star Rating */}
                <div>
                  <label className="block text-xs font-bold uppercase text-navy/60 tracking-widest mb-3">Your Rating *</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(s => (
                      <button key={s} type="button"
                        onClick={() => set('stars', s)}
                        onMouseEnter={() => setHovered(s)}
                        onMouseLeave={() => setHovered(0)}
                        className="transition-transform hover:scale-110">
                        <Star
                          size={32}
                          fill={(hovered || form.stars) >= s ? '#FFB800' : 'transparent'}
                          color={(hovered || form.stars) >= s ? '#FFB800' : '#d1d5db'}
                          strokeWidth={1.5}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-slate-400 self-center">
                      {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][hovered || form.stars]}
                    </span>
                  </div>
                </div>

                {/* Review */}
                <div>
                  <label className="block text-xs font-bold uppercase text-navy/60 tracking-widest mb-2">Your Review *</label>
                  <div className="relative">
                    <MessageSquare size={15} className="absolute left-4 top-4 text-slate-400" />
                    <textarea
                      placeholder="Write your review here..."
                      rows={5} value={form.review} onChange={e => set('review', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange transition-all resize-none text-navy"
                    />
                  </div>
                </div>

                {error && (
                  <div className="text-center py-2.5 px-4 rounded-xl text-red-600 text-sm font-medium"
                    style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)' }}>
                    ⚠ {error}
                  </div>
                )}

                <button type="submit" disabled={loading}
                  className="w-full py-4 rounded-xl font-outfit font-bold text-white text-base flex items-center justify-center gap-2 disabled:opacity-60 transition-all hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg,#FF7A00,#ff9500)', boxShadow: '0 6px 24px rgba(255,122,0,0.25)' }}>
                  {loading ? 'Submitting...' : <><Send size={16} /> Submit Review</>}
                </button>

                <p className="text-center text-xs text-slate-400">
                  Reviews are published after admin approval.
                </p>
              </form>
            </motion.div>
          )}
        </div>
      </section>

    </main>
  )
}
