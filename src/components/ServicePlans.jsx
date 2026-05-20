import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ServicePlans() {
  const navigate = useNavigate()

  const goToPlans = () => {
    navigate('/services/after-installation')
    setTimeout(() => {
      document.getElementById('amc-plans')?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  return (
    <section className="py-16 px-5 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-orange/10 border border-orange/20 text-orange text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <ShieldCheck size={14} />
            AMC Plans Available
          </div>
          <h2 className="font-outfit text-3xl md:text-4xl font-black text-navy mb-4">
            Keep Your Solar System <span className="text-orange">Performing</span>
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto mb-8">
            We offer flexible maintenance plans to ensure your solar system runs at peak efficiency year after year.
          </p>
        </motion.div>

        <motion.button
          onClick={goToPlans}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="group bg-white border-2 border-orange text-orange hover:bg-orange hover:text-white font-outfit font-bold px-8 py-4 rounded-full flex items-center gap-2 mx-auto transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange/20 cursor-pointer"
        >
          View Maintenance Plans
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>

        <p className="text-slate-400 text-xs mt-6">
          Click to explore Basic, Standard & Premium AMC options
        </p>
      </div>
    </section>
  )
}
