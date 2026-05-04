import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, HandCoins } from "lucide-react";
const contactInfo = [
  {
    icon: <MapPin size={20} />,
    label: 'Address',
    val: 'Urban Energy, Lucknow, Uttar Pradesh – 226001'
  },
  {
    icon: <Phone size={20} />,
    label: 'Phone',
    val: '+91 98000 12345'
  },
  {
    icon: <Mail size={20} />,
    label: 'Email',
    val: 'hello@urbanenergy.in'
  },
  {
    icon: <Clock size={20} />,
    label: 'Working Hours',
    val: 'Mon – Sat: 9 AM – 7 PM'
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', bill: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = () => {
    if (!form.name || !form.phone) return alert('Please fill in your name and phone number.')
    setSubmitted(true)
    setTimeout(() => {
      setForm({ name: '', phone: '', email: '', city: '', bill: '', message: '' })
      setSubmitted(false)
    }, 5000)
  }

  return (
    <section id="contact" className="py-12 px-5 bg-slate-50">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title mb-5">
            Ready to Go <span className="text-orange">Solar?</span>
          </h2>
          <p className="text-slate-500 leading-relaxed mb-8">
            Get a free site survey and customized solar proposal within 24 hours.
            Our experts are ready to help you start saving on electricity.
          </p>
          <div className="flex flex-col gap-5">
            {contactInfo.map((c) => (
              <div key={c.label} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center text-xl flex-shrink-0">
                  {React.cloneElement(c.icon, {
  className: "text-orange group-hover:scale-110 transition"
})}
                </div>
                <div>
                  <div className="text-xs font-outfit font-semibold text-slate-400 uppercase tracking-widest">{c.label}</div>
                  <div className="text-navy font-medium text-sm mt-0.5">{c.val}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 border border-gray-100 shadow-md"
        >
          <h3 className="font-outfit font-bold text-xl text-navy mb-6">Get a Free Quote</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
              <div>
                <label className="block text-sm font-outfit font-semibold text-navy mb-1.5">Full Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  placeholder="Rajesh Kumar"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-navy text-sm focus:outline-none focus:border-orange transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-outfit font-semibold text-navy mb-1.5">Phone Number *</label>
                <input
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  placeholder="+91 98000 00000"
                  type="tel"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-navy text-sm focus:outline-none focus:border-orange transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-outfit font-semibold text-navy mb-1.5">Email Address</label>
              <input
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder="you@email.com"
                type="email"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-navy text-sm focus:outline-none focus:border-orange transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-outfit font-semibold text-navy mb-1.5">City</label>
                <input
                  value={form.city}
                  onChange={(e) => set('city', e.target.value)}
                  placeholder="Lucknow"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-navy text-sm focus:outline-none focus:border-orange transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-outfit font-semibold text-navy mb-1.5">Monthly Bill (₹)</label>
                <input
                  value={form.bill}
                  onChange={(e) => set('bill', e.target.value)}
                  placeholder="3000"
                  type="number"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-navy text-sm focus:outline-none focus:border-orange transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-outfit font-semibold text-navy mb-1.5">Message (Optional)</label>
              <textarea
                value={form.message}
                onChange={(e) => set('message', e.target.value)}
                placeholder="Tell us about your requirements..."
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-navy text-sm focus:outline-none focus:border-orange transition-colors resize-none"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full py-4 rounded-xl font-outfit flex items-center justify-center gap-2 font-bold text-lg text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange/30"
              style={{ background: 'linear-gradient(135deg, #FF7A00, #ff9500)' }}
            >
              Send My Request <HandCoins/>
            </button>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-3 px-4 rounded-xl text-green-700 font-semibold text-sm"
                style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)' }}
              >
                ✓ Thank you! We'll call you within 24 hours for your free site survey.
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
