import React from 'react'
import { motion } from 'framer-motion'
import { Home, Building2, Sun, Wrench, Zap, Battery } from "lucide-react"

const services = [
  {
    icon: <Home size={26} />,
    title: 'Residential Solar',
    desc: 'Transform your rooftop into a personal power plant. Custom 1–10 kW systems designed for Indian homes — slash your electricity bill by up to 90% from day one.',
    tag: '1–10 kW Systems',
    color: '#FFB800',
  },
  {
    icon: <Building2 size={26} />,
    title: 'Commercial Solar',
    desc: 'Power your business with the sun. High-efficiency commercial-grade panels for factories, offices & institutions. Achieve ROI in under 4 years.',
    tag: '10 kW – 5 MW',
    color: '#00A3E0',
  },
  {
    icon: <Sun size={26} />,
    title: 'Rooftop EPC',
    desc: 'Complete turnkey solar solutions — from site survey and system design to procurement, installation, and grid commissioning. We handle everything.',
    tag: 'Turnkey Projects',
    color: '#FF7A00',
  },
  {
    icon: <Wrench size={26} />,
    title: 'AMC & O&M',
    desc: 'Protect your solar investment with our Annual Maintenance Contracts. Real-time monitoring, preventive servicing, and guaranteed peak performance.',
    tag: '24/7 Monitoring',
    color: '#00C9A7',
  },
  {
    icon: <Battery size={26} />,
    title: 'Battery Storage',
    desc: 'Store excess solar energy and use it at night or during outages. Our lithium battery solutions give you true energy independence round the clock.',
    tag: 'Energy Storage',
    color: '#FFB800',
  },
  {
    icon: <Zap size={26} />,
    title: 'Net Metering',
    desc: 'Sell surplus solar power back to the grid and earn credits on your electricity bill. We handle all DISCOM paperwork and net meter installation.',
    tag: 'Grid Export',
    color: '#00A3E0',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 px-5" style={{ background: '#f8faff' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-tag">Our Services</span>
          <h2 className="section-title mt-2">
            Complete <span className="glow-text">Solar Solutions</span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto font-space text-base leading-relaxed">
            From a single rooftop to an entire industrial campus — we engineer, install, and maintain every solar system with precision and care.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="bg-white border border-gray-100 rounded-2xl p-7 relative overflow-hidden group transition-shadow duration-300 hover:shadow-2xl"
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${s.color}, ${s.color}88)` }}
              />

              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}
              >
                {React.cloneElement(s.icon, { style: { color: s.color } })}
              </div>

              <h3 className="font-orbitron font-bold text-base text-navy mb-3">{s.title}</h3>
              <p className="text-slate-500 text-sm font-space leading-relaxed mb-5">{s.desc}</p>
              <span
                className="inline-block text-xs font-space font-bold px-3 py-1 rounded-full"
                style={{ background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}30` }}
              >
                {s.tag}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
