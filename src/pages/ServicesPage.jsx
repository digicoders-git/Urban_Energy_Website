import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Wrench } from 'lucide-react'
import { motion } from 'framer-motion'
import Services from '../components/Services'
import WhyUs from '../components/WhyUs'
import Process from '../components/Process'

export default function ServicesPage() {
  return (
    <main className="pt-16">
      <Services />
      <WhyUs />
      <Process />

      {/* After Installation Banner */}
      <section className="py-14 px-5" style={{ background: 'linear-gradient(135deg, #0B1D51, #1a3a8f)' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: '#FFB80020', border: '1px solid #FFB80040' }}>
                <Wrench size={26} style={{ color: '#FFB800' }} />
              </div>
              <div>
                <h3 className="font-orbitron font-black text-xl text-white">Already Installed Solar?</h3>
                <p className="text-slate-300 font-space text-sm mt-1">Explore our complete post-installation services — AMC, maintenance, monitoring & more.</p>
              </div>
            </div>
            <Link
              to="/services/after-installation"
              className="flex items-center gap-2 px-7 py-3 rounded-xl font-space font-bold text-navy shrink-0 hover:scale-105 transition-all"
              style={{ background: '#FFB800' }}
            >
              View After-Sales Services <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
