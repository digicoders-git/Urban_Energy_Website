import React from 'react'
import { motion } from 'framer-motion'

const projects = [
  {
    image: '/project1.avif',
    kw: '5 kW',
    bg: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
    title: 'Residential — Lucknow, UP',
    desc: 'On-grid rooftop system with net metering. Saving ₹4,500 per month on electricity.',
    type: 'On-Grid', savings: '₹54,000/yr', roi: '3.2 yrs',
  },
  {
    image: '/project2.avif',
    kw: '50 kW',
    bg: 'linear-gradient(135deg, #fef3c7, #fde68a)',
    title: 'Factory — Kanpur Industrial Zone',
    desc: 'Commercial rooftop EPC project. 90% reduction in grid dependence achieved.',
    type: 'Commercial', savings: '₹6L/yr', roi: '4.1 yrs',
  },
  {
    image: '/project3.avif',
    kw: '20 kW',
    bg: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
    title: 'School — Agra, UP',
    desc: 'Hybrid solar with battery backup. 24/7 clean power for 800 students and staff.',
    type: 'Hybrid', savings: '₹2.4L/yr', roi: '3.8 yrs',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-12 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-tag">Our Projects</span>
          <h2 className="section-title">
            Recent <span className="text-orange">Installations</span>
          </h2>
          <p className="text-slate-500 mt-3 max-w-lg mx-auto">
            Real projects. Real savings. Powering homes and businesses across India.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl overflow-hidden border border-gray-100 transition-shadow duration-300 hover:shadow-2xl"
            >
              <div
                className="h-44 relative overflow-hidden"
                style={{ background: p.bg }}
              >
                {/* ✅ Image instead of emoji */}
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />

                <span className="absolute top-3 right-3 bg-navy/80 text-white font-outfit font-bold text-sm px-3 py-1 rounded-full">
                  {p.kw}
                </span>
              </div>

              <div className="bg-white p-6">
                <h3 className="font-outfit font-bold text-navy text-lg mb-2">{p.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{p.desc}</p>
                <div className="flex gap-4 pt-4 border-t border-gray-100">
                  <div className="text-xs text-slate-400">
                    <span className="font-semibold text-navy">{p.type}</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    Savings: <span className="font-semibold text-navy">{p.savings}</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    ROI: <span className="font-semibold text-navy">{p.roi}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}