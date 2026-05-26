import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Phone, User, MapPin, Mail, IndianRupee, MessageSquare, Zap, Sun, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react'

const API = import.meta.env.VITE_API_URL
const EMPTY = { name: '', phone: '', email: '', city: '', category: 'residential', bill: '', message: '' }

export default function ContactPage() {
  const [form, setForm] = useState(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.city) {
      return setError('Please fill all required fields.')
    }
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API}/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          city: form.city.trim(),
          category: form.category,
          bill: form.bill ? String(form.bill) : '0',
          message: form.message.trim(),
        })
      })
      if (res.ok) {
        setSubmitted(true)
        setForm(EMPTY)
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
    <main className="pt-16 min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,184,0,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,122,0,0.04) 0%, transparent 70%)' }} />

      <section className="py-16 px-5 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading and Info */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 bg-orange/15 border border-orange/30 text-orange px-5 py-2 rounded-full text-xs font-space font-bold uppercase tracking-widest mb-4">
                <Sun size={13} className="animate-spin" style={{ animationDuration: '10s' }} />
                Get Started
              </span>
              <h1 className="font-orbitron text-4xl md:text-5xl font-black text-navy leading-tight mb-5">
                Book Your Free <br />
                <span className="glow-text">Solar Survey</span>
              </h1>
              <p className="text-slate-500 text-lg leading-relaxed font-outfit">
                Take the first step towards massive savings. Fill in your details, and our certified solar expert will contact you to schedule your free rooftop survey and custom savings analysis.
              </p>
            </motion.div>

            {/* Core Benefits list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {[
                { icon: <Clock size={20} className="text-orange" />, title: '24-Hour Response', desc: 'Our solar engineering team will review your requirement and call you within 24 hours.' },
                { icon: <ShieldCheck size={20} className="text-solarsky" />, title: 'Certified Site Experts', desc: 'A professional technical surveyor will inspect your roof capacity and shadow parameters.' },
                { icon: <Zap size={20} className="text-green-500" />, title: 'Custom Savings Report', desc: 'Get a tailored simulation of your generation capacity, total project cost, and payback period.' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-outfit font-bold text-navy text-sm mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-xs font-space leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Premium Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-[32px] border border-slate-100 shadow-2xl p-6 sm:p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange to-yellow" />
              
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12 px-4 space-y-4"
                >
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto border border-green-100 text-green-500 shadow-lg shadow-green-100">
                    <CheckCircle2 size={44} />
                  </div>
                  <h3 className="font-orbitron font-black text-2xl text-navy">Survey Request Submitted!</h3>
                  <p className="text-slate-500 text-base max-w-sm mx-auto">
                    Thank you! Our technical team has received your details and will call you within 24 hours to schedule your free home survey.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-8 py-3 rounded-xl border border-slate-200 text-slate-500 font-bold hover:bg-slate-50 transition-all font-outfit"
                  >
                    Submit Another Query
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-orbitron text-xl sm:text-2xl font-black text-navy">Rooftop Solar Survey & Consultation Form</h3>
                    <p className="text-slate-400 text-xs mt-1">Please provide accurate information for standard system engineering calculations.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Name + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                          required
                          type="text"
                          placeholder="Full Name *"
                          value={form.name}
                          onChange={e => set('name', e.target.value)}
                          className="w-full pl-11 pr-4 py-3.5 border-2 border-slate-100 rounded-xl text-sm outline-none focus:border-orange transition-all text-navy font-outfit"
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                          required
                          type="tel"
                          placeholder="Phone Number *"
                          value={form.phone}
                          onChange={e => set('phone', e.target.value)}
                          className="w-full pl-11 pr-4 py-3.5 border-2 border-slate-100 rounded-xl text-sm outline-none focus:border-orange transition-all text-navy font-outfit"
                        />
                      </div>
                    </div>

                    {/* Email + City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={form.email}
                          onChange={e => set('email', e.target.value)}
                          className="w-full pl-11 pr-4 py-3.5 border-2 border-slate-100 rounded-xl text-sm outline-none focus:border-orange transition-all text-navy font-outfit"
                        />
                      </div>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                          required
                          type="text"
                          placeholder="City *"
                          value={form.city}
                          onChange={e => set('city', e.target.value)}
                          className="w-full pl-11 pr-4 py-3.5 border-2 border-slate-100 rounded-xl text-sm outline-none focus:border-orange transition-all text-navy font-outfit"
                        />
                      </div>
                    </div>

                    {/* Bill + Category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                          type="number"
                          placeholder="Monthly Electricity Bill (₹)"
                          value={form.bill}
                          onChange={e => set('bill', e.target.value)}
                          className="w-full pl-11 pr-4 py-3.5 border-2 border-slate-100 rounded-xl text-sm outline-none focus:border-orange transition-all text-navy font-outfit"
                        />
                      </div>
                      <div className="relative">
                        <Zap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <select
                          value={form.category}
                          onChange={e => set('category', e.target.value)}
                          className="w-full pl-11 pr-4 py-3.5 border-2 border-slate-100 rounded-xl text-sm outline-none focus:border-orange transition-all bg-white text-navy font-outfit cursor-pointer appearance-none"
                        >
                          <option value="residential">Residential Solar</option>
                          <option value="commercial">Commercial / Industrial</option>
                          <option value="ongrid">On Grid Solar</option>
                          <option value="offgrid">Off Grid Solar</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 text-slate-400" size={16} />
                      <textarea
                        placeholder="Additional details (e.g. roof type, system size requirement)"
                        rows={4}
                        value={form.message}
                        onChange={e => set('message', e.target.value)}
                        className="w-full pl-11 pr-4 py-3.5 border-2 border-slate-100 rounded-xl text-sm outline-none focus:border-orange transition-all text-navy font-outfit resize-none"
                      />
                    </div>

                    {error && (
                      <p className="text-center text-red-500 text-xs font-medium bg-red-50 py-2.5 rounded-xl border border-red-100">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl font-outfit font-black text-white text-base flex items-center justify-center gap-2 shadow-lg shadow-orange/20 bg-gradient-to-r from-orange to-orange/90 hover:opacity-95 hover:shadow-xl hover:shadow-orange/30 disabled:opacity-75 transition-all cursor-pointer border-none"
                    >
                      {loading ? 'Submitting Your Details...' : <><Send size={18} /> Submit Survey Request</>}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
