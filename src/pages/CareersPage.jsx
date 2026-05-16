import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Users, Coffee, Rocket, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay }
})

const roles = [
  { title: 'Solar PV Design Engineer', location: 'Lucknow Office', type: 'Full Time', desc: 'Responsible for 2D layout design, system capacity forecasting, and component optimization.' },
  { title: 'B2B Sales Executive', location: 'On-field / Pan UP', type: 'Full Time + Incentives', desc: 'Pitching rooftop solar installations to schools, SMEs, and local commercial organizations.' },
  { title: 'Installation Technician', location: 'Lucknow / Kanpur', type: 'Field Support', desc: 'Expert wiring, structural setup, and inverter commissioning specialists.' },
]

export default function CareersPage() {
  return (
    <main className="pt-16 bg-slate-50 min-h-screen flex items-center justify-center">
      <section className="py-16 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="font-outfit font-bold text-navy text-xl mb-2">Don't see a relevant position?</h3>
          <p className="text-slate-500 mb-6 text-sm">Drop your resume and a short cover letter anyway. We're always tracking exceptional talent.</p>
          <a href="mailto:careers@vaulixsolar.in" className="font-bold text-orange hover:underline">careers@vaulixsolar.in</a>
        </div>
      </section>
    </main>
  )
}
