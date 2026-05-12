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
    <main className="pt-16 bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-6 overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #FF7A00 0%, transparent 60%)' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 bg-orange/15 border border-orange/30 text-orange px-4 py-1.5 rounded-full text-xs font-space font-bold uppercase tracking-widest mb-5">
              Join The Mission
            </span>
          </motion.div>
          <motion.h1 {...fadeUp(0.1)} className="font-orbitron text-4xl md:text-6xl font-black mb-6 leading-tight">
            Build Your Career in{' '}
            <span style={{ background: 'linear-gradient(90deg,#FF7A00,#FFC107)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Clean Tech
            </span>
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
            Work with bold, dynamic professionals determined to transition India to the solar era.
          </motion.p>
        </div>
      </section>

      {/* Cultural Perks */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-6">
           {[
             { icon: Users, t: 'Collaborative Culture', d: 'Work in integrated tech/sales environments directly with the founders.' },
             { icon: Rocket, t: 'Rapid Growth Path', d: 'As an aggressive early-stage startup, standout performers see exponential leverage.' },
             { icon: Coffee, t: 'Modern Worklife', d: 'Clean, positive office space in central Lucknow with continuous learning sessions.' },
           ].map((i, idx) => (
             <motion.div key={idx} {...fadeUp(idx * 0.1)} className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm text-center">
               <div className="w-12 h-12 bg-orange/10 text-orange rounded-xl flex items-center justify-center mx-auto mb-4"><i.icon size={24} /></div>
               <h3 className="font-outfit font-bold text-navy text-lg mb-2">{i.t}</h3>
               <p className="text-slate-500 text-sm leading-relaxed">{i.d}</p>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
           <motion.h2 {...fadeUp(0)} className="font-orbitron text-3xl font-black text-navy mb-10 text-center">Open Positions</motion.h2>
           
           <div className="space-y-4">
             {roles.map((role, idx) => (
               <motion.div 
                 key={idx} 
                 {...fadeUp(idx * 0.1)}
                 className="group p-6 rounded-2xl border border-gray-100 hover:border-orange/40 hover:shadow-xl hover:shadow-orange/5 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
               >
                 <div>
                   <div className="flex items-center gap-3 mb-2">
                     <span className="text-xs font-bold text-orange bg-orange/10 px-2 py-1 rounded-md">{role.type}</span>
                     <span className="text-xs text-slate-400">{role.location}</span>
                   </div>
                   <h4 className="font-outfit font-bold text-navy text-xl group-hover:text-orange transition-colors">{role.title}</h4>
                   <p className="text-slate-500 text-sm mt-1 max-w-md">{role.desc}</p>
                 </div>
                 <a href="mailto:careers@urbanenergy.in" className="shrink-0 flex items-center justify-center gap-2 bg-navy hover:bg-orange text-white text-sm font-bold px-5 py-3 rounded-xl transition-all no-underline">
                   Apply Now <ArrowRight size={16} />
                 </a>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      {/* Simple Bottom Section */}
      <section className="py-16 px-6 text-center bg-slate-50">
        <div className="max-w-xl mx-auto">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="font-outfit font-bold text-navy text-xl mb-2">Don't see a relevant position?</h3>
          <p className="text-slate-500 mb-6 text-sm">Drop your resume and a short cover letter anyway. We're always tracking exceptional talent.</p>
          <a href="mailto:careers@urbanenergy.in" className="font-bold text-orange hover:underline">careers@urbanenergy.in</a>
        </div>
      </section>

    </main>
  )
}
