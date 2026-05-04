import React from 'react'
import { motion } from 'framer-motion'
import { Home, Building2, Sun, Wrench } from "lucide-react";

const services = [
  {
    icon: <Home size={28} />,
    title: 'Residential Solar',
    desc: 'Custom rooftop solutions for homes. Dramatically reduce electricity bills with panels designed for Indian climate conditions and net metering.',
    tag: '1–10 kW Systems',
  },
  {
    icon: <Building2 size={28} />,
    title: 'Commercial Solar',
    desc: 'Large-scale installations for businesses, factories, and institutions. Maximize ROI with high-efficiency commercial-grade solar panels.',
    tag: '10 kW – 5 MW',
  },
  {
    icon: <Sun size={28} />,
    title: 'Rooftop EPC',
    desc: 'End-to-end Engineering, Procurement & Construction services. We handle everything — design, supply, installation, and grid commissioning.',
    tag: 'Turnkey Projects',
  },
  {
    icon: <Wrench size={28} />,
    title: 'AMC & O&M',
    desc: 'Annual Maintenance Contracts and Operations & Maintenance packages to ensure peak panel performance, longevity, and maximum output.',
    tag: '24/7 Monitoring',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-10 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-tag">Our Services</span>
          <h2 className="section-title">
            Comprehensive <span className="text-orange">Solar Solutions</span>
          </h2>
          <p className="text-slate-500 mt-3 max-w-lg mx-auto">
            From residential rooftops to large commercial plants — we've got every solar need covered.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white border border-gray-100 rounded-2xl p-7 relative overflow-hidden group transition-shadow duration-300 hover:shadow-2xl"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange to-yellow scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange/10 to-yellow/10 flex items-center justify-center text-3xl mb-5">
                {s.icon && React.cloneElement(s.icon, { className: "text-orange group-hover:scale-110 transition" })}
              </div>
              <h3 className="font-outfit font-bold text-lg text-navy mb-3">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">{s.desc}</p>
              <span className="inline-block bg-orange/8 text-orange text-xs font-outfit font-bold px-3 py-1 rounded-full">
                {s.tag}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
