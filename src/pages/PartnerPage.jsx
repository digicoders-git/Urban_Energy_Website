import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Handshake, TrendingUp, ShieldCheck, Users, ArrowRight, Send, Building2, Phone, Mail, MapPin, Rocket, Megaphone, Headphones } from 'lucide-react'

const API = import.meta.env.VITE_API_URL

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

const partnerBenefits = [
  {
    icon: TrendingUp,
    title: 'High Earning Potential',
    desc: 'Lucrative profit margins and commission structures. Scalable business model with massive market growth.',
  },
  {
    icon: ShieldCheck,
    title: 'Comprehensive Training',
    desc: 'End-to-end technical, design, and sales training for you and your field team at every step.',
  },
  {
    icon: Megaphone,
    title: 'Fully Marketing Support',
    desc: 'Co-branded promotional material, digital marketing leads, localized campaigns, and local awareness assets.',
  },
  {
    icon: Headphones,
    title: 'Customer Support',
    desc: 'Dedicated 24/7 client relations team, escalation handling, and service support to ensure absolute customer satisfaction.',
  },
  {
    icon: Handshake,
    title: 'Project & Technical Support',
    desc: 'Dedicated engineering team for layout verification, site feasibility, and compliance assistance.',
  },
  {
    icon: Users,
    title: 'Operational Ecosystem',
    desc: 'Direct access to inventory, software for custom generation reporting, and logistics support.',
  },
]

export default function PartnerPage() {
  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', city: '', type: 'Dealer', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API}/partners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          type: formData.type,
          message: formData.message,
        })
      })
      if (res.ok) { setSubmitted(true) }
      else { const d = await res.json(); setError(d.message || 'Something went wrong.') }
    } catch { setError('Server error. Please try again.') }
    finally { setLoading(false) }
  };

  return (
    <main className="pt-16 bg-slate-50">
      {/* ── HERO ── */}
      <section className="relative py-24 px-6 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #FF7A00 0%, transparent 40%), radial-gradient(circle at 20% 80%, #00A3E0 0%, transparent 50%)' }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        {/* Animated Glass Glows */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-1/4 w-64 h-64 bg-orange/30 rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 left-1/4 w-80 h-80 bg-solarsky/20 rounded-full blur-[100px] pointer-events-none"
        />

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 bg-orange/15 border border-orange/30 text-orange px-5 py-2 rounded-full text-xs font-space font-bold uppercase tracking-widest mb-6">
                Partner Network
              </span>
            </motion.div>
            <motion.h1 {...fadeUp(0.1)} className="font-orbitron text-5xl md:text-6xl font-black leading-tight mb-6 text-navy">
              Scale Your Business with{' '}
              <span style={{ background: 'linear-gradient(90deg,#FF7A00,#FFC107)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                VAULIX™ SOLAR ENERGY
              </span>
            </motion.h1>
            <motion.p {...fadeUp(0.2)} className="text-slate-500 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
              Join India's most progressive solar network. Leverage our industry-certified standards and dedicated support structure to deliver world-class residential and commercial solutions.
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="grid grid-cols-2 gap-6 max-w-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center text-orange"><ArrowRight size={18} /></div>
                <span className="font-medium text-slate-700">Dedicated Support</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center text-orange"><ArrowRight size={18} /></div>
                <span className="font-medium text-slate-700">Direct Lead Flow</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center text-orange"><ArrowRight size={18} /></div>
                <span className="font-medium text-slate-700">Marketing Support</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center text-orange"><ArrowRight size={18} /></div>
                <span className="font-medium text-slate-700">Customer Support</span>
              </div>
            </motion.div>
          </div>

          {/* Contact Card side banner decorative or simplified */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="hidden lg:block relative"
          >
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
              <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=800&q=80" alt="Business Handshake" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <div className="font-orbitron text-2xl font-black text-white">Mutual Growth.</div>
                <div className="font-outfit text-sm text-orange mt-1 uppercase tracking-widest">Shared Responsibility</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <h2 className="font-orbitron text-3xl md:text-4xl font-black text-navy">
              Why Become a <span className="text-orange">Partner?</span>
            </h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">We empower you with technical resources, commercial leverage, and constant development tracks so you can thrive seamlessly.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerBenefits.map((b, i) => (
              <motion.div
                key={b.title}
                {...fadeUp(i * 0.1)}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-orange/30 transition-all group duration-300 hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-orange/5 text-orange rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange group-hover:text-white transition-colors">
                  <b.icon size={28} />
                </div>
                <h3 className="font-outfit font-bold text-xl text-navy mb-3">{b.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section className="py-20 px-6 bg-white relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <span className="text-orange font-space font-bold tracking-widest text-sm uppercase">The Journey</span>
            <h2 className="font-orbitron text-3xl md:text-4xl font-black text-navy mt-2">
              Seamless Onboarding <span className="text-orange">Process</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connector line only visible on desktop */}
            <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5 bg-dashed border-t-2 border-dashed border-gray-200 -z-0 translate-y-3" />

            {[
              { num: '01', title: 'Apply', desc: 'Submit your company details and core interests via our form below.', icon: Send },
              { num: '02', title: 'Review', desc: 'Our franchise relations team validates geography eligibility.', icon: ShieldCheck },
              { num: '03', title: 'Sign MOU', desc: 'Finalize regional territory boundaries and sign official partnership.', icon: Handshake },
              { num: '04', title: 'Activation', desc: 'Get access to resources, portals, and sales collaterals.', icon: Rocket },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                {...fadeUp(0.1 * idx)}
                className="relative text-center group z-10"
              >
                <div className="w-16 h-16 rounded-full bg-navy text-white font-orbitron text-xl font-black flex items-center justify-center mx-auto mb-6 shadow-xl relative group-hover:scale-110 transition-transform ring-8 ring-white">
                  {step.num}
                  <div className="absolute inset-0 rounded-full bg-orange scale-0 group-hover:scale-100 transition-transform -z-10 duration-300" />
                </div>
                <h4 className="font-outfit font-bold text-navy text-lg mb-2">{step.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed px-4">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at center, #FF7A00, transparent)' }} />
        <div className="max-w-4xl mx-auto bg-white rounded-[40px] shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row border border-white/10">

          {/* Form Intro Info Panel */}
          <div className="w-full md:w-2/5 bg-gradient-to-br from-navy to-[#0a1a5c] p-10 text-white flex flex-col justify-between">
            <div>
              <h3 className="font-orbitron text-3xl font-bold mb-4">Let's Connect.</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-8">Fill out our short partnership onboarding intent form and an executive will reach out within 24 business hours.</p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Mail className="text-orange" size={20} />
                  <span className="text-sm">partners@vaulixsolar.in</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="text-orange" size={20} />
                  <span className="text-sm">+91 8960-68-6060</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="text-orange" size={20} />
                  <span className="text-sm">KH-3/283/124, Vistarit Area Part-2, Khargapur,<br/>Sector-6, Gomti Nagar Extension,<br/>Lucknow</span>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="text-xs text-white/40 uppercase tracking-widest mb-2">Authorized Verification</div>
              <div className="font-bold text-white">VAULIX™ ENERGIES LLP</div>
            </div>
          </div>

          {/* Actual Action Form */}
          <div className="w-full md:w-3/5 p-10 bg-white">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase text-navy/60 mb-2">Name</label>
                    <div className="relative">
                      <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-orange focus:ring-0 outline-none text-navy transition-all" placeholder="Enter your full name" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-navy/60 mb-2">Organization</label>
                    <div className="relative">
                      <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-orange focus:ring-0 outline-none text-navy transition-all" placeholder="Enter organization name" />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase text-navy/60 mb-2">Email ID</label>
                    <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-orange focus:ring-0 outline-none text-navy transition-all" placeholder="Enter email address" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-navy/60 mb-2">Mobile Number</label>
                    <input required type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-orange focus:ring-0 outline-none text-navy transition-all" placeholder="Enter mobile number" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase text-navy/60 mb-2">Location (City)</label>
                    <input required type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-orange focus:ring-0 outline-none text-navy transition-all" placeholder="Enter your city" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-navy/60 mb-2">Applicant Type</label>
                    <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-orange focus:ring-0 outline-none text-navy transition-all bg-white cursor-pointer">
                      <option value="Dealer">Associates</option>
                      <option value="Installer">Installation Partners</option>
                      <option value="Distributor">Partners</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-navy/60 mb-2">Write something about your background</label>
                  <textarea rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-orange focus:ring-0 outline-none text-navy transition-all resize-none" placeholder="Write about your business background..." />
                </div>

                <button type="submit" disabled={loading} className="w-full bg-orange hover:bg-orange/90 text-white font-outfit font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-lg shadow-orange/30 flex items-center justify-center gap-2 disabled:opacity-60">
                  {loading ? 'Submitting...' : <> Submit Application <Send size={16} /> </>}
                </button>
                {error && <p className="text-center text-red-500 text-xs font-medium bg-red-50 py-2 rounded-lg">{error}</p>}
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <Send size={36} />
                </div>
                <h4 className="font-orbitron text-2xl font-bold text-navy mb-2">Received Successfully!</h4>
                <p className="text-slate-500 max-w-sm">Thank you, {formData.name}. Our partnership support cell will review your request and initiate correspondence shortly.</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

    </main>
  )
}
