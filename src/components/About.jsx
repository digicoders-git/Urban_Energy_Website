import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Building2, Zap, Sun, IndianRupee,
  Award, ShieldCheck, Leaf, Lock,
  Sprout, FlaskConical, Handshake, Trophy,
  User, UserCog, UserCheck, Headphones
} from "lucide-react";
import { FaUser } from "react-icons/fa";
import Logo from '../../public/urbanlogo.png'

const stats = [
  { num: '24/7', label: 'Expert Support', icon: <Headphones size={28} /> },
  { num: '100%', label: 'Client Commitment', icon: <Sprout size={28} /> },
  { num: 'Premium', label: 'Tech Integration', icon: <FlaskConical size={28} /> },
  { num: 'MNRE', label: 'Standards Met', icon: <Award size={28} /> },
];

const team = [
  { name: 'Arjun Mehta', role: 'Founder & CEO', emoji: <User size={40} />, exp: 'Renewable Energy Specialist' },
  { name: 'Priya Sharma', role: 'Head of Engineering', emoji: <UserCog size={40} />, exp: 'IIT Kanpur Tech Background' },
  { name: 'Rohit Verma', role: 'Operations Lead', emoji: <UserCheck size={40} />, exp: 'Scalability Operations Expert' },
  { name: 'Neha Singh', role: 'Customer Success', emoji: <Headphones size={40} />, exp: 'Support & Client Relations' },
];

const values = [
  {
    icon: <Sprout size={28} />,
    title: 'Sustainability First',
    desc: "Every installation we do reduces India's carbon footprint. We're committed to a greener planet for the next generation."
  },
  {
    icon: <FlaskConical size={28} />,
    title: 'Quality Engineering',
    desc: 'We use only Tier-1 panels and certified inverters. Every system is engineered for maximum output and 25+ year life.'
  },
  {
    icon: <Handshake size={28} />,
    title: 'Customer Trust',
    desc: 'Transparent pricing, no hidden fees, and lifetime support. We build relationships, not just installations.'
  },
  {
    icon: <Trophy size={28} />,
    title: 'Certified Excellence',
    desc: 'MNRE empanelled, DISCOM certified installers. We meet every government standard for quality and safety.'
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

export default function About() {
  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative py-20 px-5 overflow-hidden bg-slate-50">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, #FF7A00 0%, transparent 50%), radial-gradient(circle at 80% 20%, #FFC107 0%, transparent 40%)',
          }}
        />
        <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 bg-orange/15 border border-orange/30 text-orange px-5 py-2 rounded-full text-xs font-space font-bold uppercase tracking-widest mb-5">
              <img src={Logo} alt="Vaulix Solar" className="w-4 h-4 object-contain" />
              Vaulix Solar Corporate
            </span>
          </motion.div>
          <motion.h1
            {...fadeUp(0.1)}
            className="font-orbitron text-4xl md:text-6xl font-black text-navy leading-tight mb-5"
          >
            Built on Values,{' '}
            <span style={{ background: 'linear-gradient(90deg,#FF7A00,#FFC107)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Driven by Sun
            </span>
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
            Vaulix Solar has been at the forefront of India's solar revolution — delivering clean, affordable energy to homes and businesses across Uttar Pradesh and beyond.
          </motion.p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-14 px-5 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">

          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.03 }}
              className="text-center bg-slate-50 hover:bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >

              {/* Icon */}
              <div className="text-3xl mb-3">{React.cloneElement(s.icon, {
                className: "text-orange group-hover:scale-110 transition"
              })}</div>

              {/* Number (HIGHLIGHT FIX) */}
              <div className="font-outfit text-3xl md:text-4xl font-black text-orange">
                {s.num}
              </div>

              {/* Label */}
              <div className="text-slate-600 text-sm mt-2 font-medium">
                {s.label}
              </div>

            </motion.div>
          ))}

        </div>
      </section>

      {/* ── Story ── */}
      <section className="py-12 px-5 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp(0)}>
            <span className="section-tag">Our Story</span>
            <h2 className="section-title mb-5">
              Powering UP, <span className="glow-text">One Rooftop at a Time</span>
            </h2>
            <p className="text-slate-500 leading-relaxed mb-5">
              Vaulix Solar was born out of a simple frustration — skyrocketing electricity bills, unreliable power supply, and a rooftop full of untapped potential. We started in Lucknow with a mission to make solar energy accessible, affordable, and genuinely worth it for every home and business in Uttar Pradesh.
            </p>
            <p className="text-slate-500 leading-relaxed mb-5">
              We don't just install panels — we engineer complete energy solutions. From the first site survey to the last wire, every project is handled by our in-house certified team with zero outsourcing and full accountability.
            </p>
            <p className="text-slate-500 leading-relaxed">
              We are MNRE empanelled, DISCOM certified, and proud partners of India's PM Surya Ghar Yojana — helping families across UP claim up to ₹78,000 in government subsidies while cutting their electricity bills by up to 90%.
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.2)} className="grid grid-cols-2 gap-4">
            {[
              { icon: <Award size={26} />, title: 'MNRE Empanelled', sub: 'Certified by Ministry of New & Renewable Energy' },
              { icon: <ShieldCheck size={26} />, title: 'DISCOM Certified', sub: 'Approved by State Electricity Distribution Companies' },
              { icon: <Leaf size={26} />, title: 'PM Surya Ghar Partner', sub: 'Official partner for government subsidy processing' },
              { icon: <Lock size={26} />, title: 'Premium Quality', sub: 'Industry-best performance guarantee on every system' },
            ].map((item, i) => (
              <div key={item.title} className="card">
                <div className="text-3xl mb-3">{React.cloneElement(item.icon, {
                  className: "text-orange group-hover:scale-110 transition"
                })}</div>
                <div className="font-outfit font-bold text-navy text-sm mb-1">{item.title}</div>
                <div className="text-slate-500 text-xs leading-relaxed">{item.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-10 px-5 bg-slate-50">
        <div className="max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="section-tag">Our Values</span>
            <h2 className="section-title">
              What We <span className="glow-text">Stand For</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white relative rounded-2xl p-7 border border-gray-100 transition-shadow duration-300 hover:shadow-2xl group"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange to-yellow scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange/10 to-yellow/10 flex items-center justify-center text-3xl mb-5">
                  {React.cloneElement(v.icon, {
                    className: "text-orange group-hover:scale-110 transition"
                  })}
                </div>

                <h3 className="font-outfit font-bold text-navy mb-3">
                  {v.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-5 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #FF7A00, transparent 60%)' }} />
        <motion.div {...fadeUp(0)} className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="font-outfit text-3xl md:text-4xl font-black text-navy mb-4">
            Ready to{' '}
            <span style={{ background: 'linear-gradient(90deg,#FF7A00,#FFC107)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Go Solar?
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-lg mx-auto mb-8">
            Book a free home survey today. Our expert will visit, assess your roof, and give you a detailed savings report — completely free, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-orange hover:bg-orange/90 text-white font-outfit font-bold px-10 py-4 rounded-full shadow-xl shadow-orange/30 transition-all duration-300 hover:-translate-y-1 no-underline text-center">Book Free Home Survey</Link>
            <Link to="/calculator" className="border-2 border-white/30 hover:border-white text-white font-outfit font-bold px-10 py-4 rounded-full transition-all duration-300 hover:bg-white/10 no-underline text-center">Calculate Savings</Link>
          </div>
        </motion.div>
      </section>
    </>
  )
}
