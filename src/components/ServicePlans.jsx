import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const plans = [
  {
    name: 'Basic',
    price: '₹3,999',
    period: '/year',
    color: '#00A3E0',
    features: ['2 scheduled visits/year', 'Panel cleaning (2x)', 'Visual inspection', 'Email support', '48-hr emergency response'],
    notIncluded: ['Parts replacement', 'Priority support', 'Real-time monitoring'],
  },
  {
    name: 'Standard',
    price: '₹7,499',
    period: '/year',
    color: '#FFB800',
    popular: true,
    features: ['4 scheduled visits/year', 'Panel cleaning (4x)', 'Inverter diagnostics', 'Phone + WhatsApp support', '24-hr emergency response', 'Minor parts replacement (free)'],
    notIncluded: ['Real-time monitoring app', 'Battery service'],
  },
  {
    name: 'Premium',
    price: '₹13,999',
    period: '/year',
    color: '#00C9A7',
    features: ['6 scheduled visits/year', 'Panel cleaning (monthly)', 'Inverter + battery service', '24/7 dedicated support', 'Same-day emergency response', 'Real-time monitoring app', 'All parts replacement (free)'],
    notIncluded: [],
  },
]

export default function ServicePlans() {
  const navigate = useNavigate()

  const goToPlans = () => {
    navigate('/services/after-installation')
    setTimeout(() => {
      document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  return (
    <section className="py-20 px-5 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-tag">AMC Plans</span>
          <h2 className="section-title mt-2">Solar Maintenance <span className="text-orange">Plans</span></h2>
          <p className="text-slate-500 text-sm mt-3 max-w-lg mx-auto">Keep your solar system at peak performance. Transparent pricing, no hidden charges.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={goToPlans}
              className={`relative rounded-2xl p-7 border-2 flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${plan.popular ? 'scale-105 shadow-xl' : 'border-gray-100'}`}
              style={plan.popular ? { borderColor: plan.color, background: '#fffdf0' } : { background: '#fff' }}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-space font-bold text-white" style={{ background: plan.color }}>
                  Most Popular
                </div>
              )}
              <h3 className="font-orbitron font-black text-xl text-navy">{plan.name}</h3>
              <div className="flex items-end gap-1 mt-2 mb-5">
                <span className="font-orbitron font-black text-3xl" style={{ color: plan.color }}>{plan.price}</span>
                <span className="text-slate-400 font-space text-sm mb-1">{plan.period}</span>
              </div>
              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm font-space text-slate-700">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: plan.color }} />
                    {f}
                  </li>
                ))}
                {plan.notIncluded.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm font-space text-slate-400 line-through">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 opacity-30" />
                    {f}
                  </li>
                ))}
              </ul>
              <div
                className="w-full py-3 rounded-xl font-space font-bold text-sm text-center flex items-center justify-center gap-2 transition-all"
                style={plan.popular ? { background: plan.color, color: '#fff' } : { background: `${plan.color}15`, color: plan.color, border: `1px solid ${plan.color}40` }}
              >
                View Full Details <ArrowRight size={15} />
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-slate-400 font-space text-xs mt-6">* Prices are indicative. Final quote based on system size & location.</p>
      </div>
    </section>
  )
}
