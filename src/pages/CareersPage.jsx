import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, Upload, X, CheckCircle2, ChevronDown } from 'lucide-react'

const API = import.meta.env.VITE_API_URL

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay }
})

const roles = [
  { title: 'Solar PV Design Engineer' },
  { title: 'B2B Sales Executive' },
  { title: 'Installation Technician' },
]

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [cv, setCv] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleFile = (file) => {
    if (!file) return
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowed.includes(file.type)) return setError('Only PDF or Word files allowed.')
    if (file.size > 5 * 1024 * 1024) return setError('File size must be under 5MB.')
    setError('')
    setCv(file)
  }

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone || !selectedRole)
      return setError('Please fill all required fields.')
    if (!cv) return setError('Please upload your CV.')
    setError('')
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('name', form.name)
      fd.append('email', form.email)
      fd.append('phone', form.phone)
      fd.append('role', selectedRole)
      fd.append('message', form.message)
      fd.append('cv', cv)

      const res = await fetch(`${API}/applications`, { method: 'POST', body: fd })
      if (res.ok) {
        setSubmitted(true)
        setForm({ name: '', email: '', phone: '', message: '' })
        setCv(null)
        setSelectedRole('')
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
    <main className="pt-16 bg-slate-50 min-h-screen">

      {/* Apply Form */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-10">
            <span className="section-tag">Apply Now</span>
            <h2 className="section-title mt-2">Submit Your <span className="text-orange">Application</span></h2>
            <p className="text-slate-500 text-sm mt-2">Fill the form below and attach your CV. We'll get back to you within 3 working days.</p>
          </motion.div>

          <AnimatePresence>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 px-8 rounded-2xl border border-green-100 bg-green-50"
              >
                <CheckCircle2 size={52} className="text-green-500 mx-auto mb-4" />
                <h3 className="font-outfit font-black text-xl text-navy mb-2">Application Submitted!</h3>
                <p className="text-slate-500 text-sm">Thank you for applying. Our team will review your application and reach out within 3 working days.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-orange font-outfit font-bold text-sm hover:underline bg-transparent border-none cursor-pointer">
                  Submit Another Application
                </button>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="bg-slate-50 rounded-2xl p-8 border border-gray-100">
                <div className="space-y-4">

                  {/* Role Select */}
                  <div>
                    <label className="block text-sm font-outfit font-semibold text-navy mb-1.5">Position Applying For *</label>
                    <div className="relative">
                      <select
                        value={selectedRole}
                        onChange={e => setSelectedRole(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-navy text-sm focus:outline-none focus:border-orange transition-colors bg-white appearance-none"
                      >
                        <option value="">Select a position</option>
                        {roles.map(r => <option key={r.title} value={r.title}>{r.title}</option>)}
                        <option value="Other">Other / General Application</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-outfit font-semibold text-navy mb-1.5">Full Name *</label>
                      <input value={form.name} onChange={e => set('name', e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-navy text-sm focus:outline-none focus:border-orange transition-colors bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-outfit font-semibold text-navy mb-1.5">Phone Number *</label>
                      <input value={form.phone} onChange={e => set('phone', e.target.value)}
                        placeholder="Enter phone number" type="tel"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-navy text-sm focus:outline-none focus:border-orange transition-colors bg-white" />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-outfit font-semibold text-navy mb-1.5">Email Address *</label>
                    <input value={form.email} onChange={e => set('email', e.target.value)}
                      placeholder="Enter your email" type="email"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-navy text-sm focus:outline-none focus:border-orange transition-colors bg-white" />
                  </div>

                  {/* CV Upload */}
                  <div>
                    <label className="block text-sm font-outfit font-semibold text-navy mb-1.5">Upload CV *</label>
                    <div
                      onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]) }}
                      onClick={() => document.getElementById('cv-input').click()}
                      className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${dragOver ? 'border-orange bg-orange/5' : cv ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-orange hover:bg-orange/5'}`}
                    >
                      <input id="cv-input" type="file" accept=".pdf,.doc,.docx" className="hidden"
                        onChange={e => handleFile(e.target.files[0])} />
                      {cv ? (
                        <div className="flex items-center justify-center gap-3">
                          <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                          <span className="text-sm font-outfit font-semibold text-navy truncate max-w-[200px]">{cv.name}</span>
                          <button onClick={e => { e.stopPropagation(); setCv(null) }}
                            className="text-slate-400 hover:text-red-500 transition-colors bg-transparent border-none cursor-pointer p-0">
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload size={24} className="text-slate-400 mx-auto mb-2" />
                          <p className="text-sm font-outfit font-semibold text-navy">Drag & drop or click to upload</p>
                          <p className="text-xs text-slate-400 mt-1">PDF or Word — max 5MB</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-outfit font-semibold text-navy mb-1.5">Cover Note (Optional)</label>
                    <textarea value={form.message} onChange={e => set('message', e.target.value)}
                      placeholder="Tell us why you'd be a great fit..." rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-navy text-sm focus:outline-none focus:border-orange transition-colors bg-white resize-none" />
                  </div>

                  <button onClick={handleSubmit} disabled={loading}
                    className="w-full py-4 rounded-xl font-outfit font-bold text-lg text-white flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange/30 disabled:opacity-60 disabled:cursor-not-allowed border-none cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #FF7A00, #ff9500)' }}>
                    {loading ? 'Submitting...' : <> Submit Application <Briefcase size={20} /> </>}
                  </button>

                  {error && (
                    <div className="text-center py-3 px-4 rounded-xl text-red-700 font-semibold text-sm"
                      style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)' }}>
                      ⚠ {error}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

    </main>
  )
}
