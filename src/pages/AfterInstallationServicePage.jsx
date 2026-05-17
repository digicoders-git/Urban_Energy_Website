import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Wrench, ShieldCheck, Activity, Droplets, Zap, PhoneCall,
  ClipboardList, Star, CheckCircle2, AlertTriangle, Clock, ArrowRight,
  Sun, BatteryWarning, FileText, IndianRupee, ShieldAlert, TrendingUp
} from 'lucide-react'
import { useModal } from '../context/ModalContext'

const services = [
  {
    icon: <Wrench size={28} />,
    title: 'Preventive Maintenance',
    desc: 'Scheduled inspections of panels, inverters, wiring, and mounting structures to prevent failures before they happen.',
    tag: 'Quarterly / Half-Yearly',
    color: '#FF7A00',
    points: ['Panel tilt & alignment check', 'Inverter health diagnostics', 'Cable & junction box inspection', 'Earthing & safety audit'],
  },
  {
    icon: <Droplets size={28} />,
    title: 'Panel Cleaning',
    desc: 'Dust, bird droppings, and pollution reduce output by up to 30%. Our professional cleaning restores full efficiency.',
    tag: 'Monthly / On-Demand',
    color: '#00A3E0',
    points: ['Soft-brush dry cleaning', 'Deionized water wash', 'Anti-soiling coating (optional)', 'Output comparison report'],
  },
  {
    icon: <Activity size={28} />,
    title: 'Performance Monitoring',
    desc: 'Real-time remote monitoring of your solar system — generation, consumption, grid export, and fault alerts 24/7.',
    tag: '24/7 Live Monitoring',
    color: '#00C9A7',
    points: ['Live generation dashboard', 'Daily/monthly reports via app', 'Instant fault SMS/email alerts', 'Performance ratio tracking'],
  },
  {
    icon: <ShieldCheck size={28} />,
    title: 'AMC (Annual Maintenance Contract)',
    desc: 'Comprehensive yearly contract covering all scheduled visits, emergency calls, and parts replacement at fixed cost.',
    tag: 'Annual Contract',
    color: '#FFB800',
    points: ['2–4 scheduled visits/year', 'Priority emergency support', 'Inverter & battery check', 'Free minor parts replacement'],
  },
  {
    icon: <Zap size={28} />,
    title: 'Inverter & Battery Service',
    desc: 'Specialized servicing of string inverters, microinverters, and lithium/lead-acid battery banks for optimal performance.',
    tag: 'Inverter & Storage',
    color: '#FF7A00',
    points: ['Firmware updates', 'Efficiency calibration', 'Battery health test (SOH)', 'Spare parts sourcing & replacement'],
  },
  {
    icon: <ClipboardList size={28} />,
    title: 'Net Meter & DISCOM Support',
    desc: 'We handle all paperwork, inspections, and follow-ups with your electricity board for net metering and billing issues.',
    tag: 'Grid & Billing',
    color: '#00A3E0',
    points: ['Net meter reading verification', 'DISCOM complaint filing', 'Export credit reconciliation', 'Tariff change assistance'],
  },
  {
    icon: <AlertTriangle size={28} />,
    title: 'Emergency Repair',
    desc: 'System down? Our rapid response team reaches your site within 24–48 hours to diagnose and fix critical failures.',
    tag: '24–48 Hr Response',
    color: '#EF4444',
    points: ['Panel damage repair', 'Inverter replacement', 'Wiring fault rectification', 'Storm/lightning damage fix'],
  },
  {
    icon: <TrendingUp size={28} />,
    title: 'System Upgrade & Expansion',
    desc: 'Scale up your existing solar system with additional panels, battery storage, or a newer inverter to meet growing energy needs.',
    tag: 'Upgrades & Expansion',
    color: '#00C9A7',
    points: ['Capacity addition (panels/kW)', 'Battery storage integration', 'Inverter upgrade & replacement', 'System re-audit & optimisation'],
  },
]

const amcPlans = [
  {
    name: 'Basic',
    price: '₹3,999',
    period: '/year',
    color: '#00A3E0',
    features: [
      '2 scheduled visits/year',
      'Panel cleaning (2x)',
      'Visual inspection',
      'Email support',
      '48-hr emergency response',
      'Performance report (annual)',
    ],
    notIncluded: ['Parts replacement', 'Priority support', 'Real-time monitoring'],
  },
  {
    name: 'Standard',
    price: '₹7,499',
    period: '/year',
    color: '#FFB800',
    popular: true,
    features: [
      '4 scheduled visits/year',
      'Panel cleaning (4x)',
      'Inverter diagnostics',
      'Phone + WhatsApp support',
      '24-hr emergency response',
      'Monthly performance reports',
      'Minor parts replacement (free)',
    ],
    notIncluded: ['Real-time monitoring app', 'Battery service'],
  },
  {
    name: 'Premium',
    price: '₹13,999',
    period: '/year',
    color: '#00C9A7',
    features: [
      '6 scheduled visits/year',
      'Panel cleaning (monthly)',
      'Inverter + battery service',
      '24/7 dedicated support',
      'Same-day emergency response',
      'Real-time monitoring app',
      'All parts replacement (free)',
      'DISCOM & net meter support',
      'Annual performance audit',
    ],
    notIncluded: [],
  },
]

const processSteps = [
  { step: '01', title: 'Book a Service', desc: 'Call, WhatsApp, or fill the form. Our team confirms your slot within 2 hours.', icon: <PhoneCall size={22} /> },
  { step: '02', title: 'Site Visit & Diagnosis', desc: 'Certified technician visits, inspects the full system, and identifies issues.', icon: <ClipboardList size={22} /> },
  { step: '03', title: 'Service & Repair', desc: 'All maintenance, cleaning, or repairs done on-site with genuine parts.', icon: <Wrench size={22} /> },
  { step: '04', title: 'Report & Sign-off', desc: 'Detailed service report shared digitally. You approve before we leave.', icon: <CheckCircle2 size={22} /> },
]

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

export default function AfterInstallationServicePage() {
  const { openModal } = useModal()
  const [activeTab, setActiveTab] = useState('all')

  const filtered = activeTab === 'all' ? services : services.filter(s =>
    activeTab === 'amc' ? ['AMC (Annual Maintenance Contract)', 'Preventive Maintenance'].includes(s.title) :
    activeTab === 'repair' ? ['Emergency Repair', 'Inverter & Battery Service'].includes(s.title) :
    ['Performance Monitoring', 'Panel Cleaning', 'Net Meter & DISCOM Support', 'System Upgrade & Expansion'].includes(s.title)
  )

  return (
    <main className="pt-16">

      {/* Hero */}
      <section className="relative py-24 px-5 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #FFB800 0%, transparent 60%)' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div {...fadeUp}>
            <span className="inline-block text-xs font-space font-bold px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(255,184,0,0.12)', color: '#FF8C00', border: '1px solid rgba(255,184,0,0.3)' }}>
              Post-Installation Services
            </span>
            <h1 className="font-orbitron font-black text-4xl md:text-5xl text-navy leading-tight mb-5">
              Your Solar Journey <br /><span className="glow-text">Doesn't End at Installation</span>
            </h1>
            <p className="text-slate-500 font-space text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              We provide complete after-sales support — maintenance, AMC, monitoring, emergency repair, and more — to keep your solar system performing at 100% for 25+ years.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button onClick={openModal} className="flex items-center gap-2 px-7 py-3 rounded-xl font-space font-bold text-white transition-all hover:scale-105 border-none cursor-pointer" style={{ background: '#FF7A00' }}>
                Book a Service <ArrowRight size={18} />
              </button>
              <a href="tel:+919999999999" className="flex items-center gap-2 px-7 py-3 rounded-xl font-space font-bold text-navy border border-gray-200 hover:bg-slate-50 transition-all">
                <PhoneCall size={18} /> Call Now
              </a>
            </div>
          </motion.div>
        </div>
        <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="max-w-4xl mx-auto mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          {[
            { val: '500+', label: 'Systems Maintained' },
            { val: '24 Hr', label: 'Emergency Response' },
            { val: '99.2%', label: 'System Uptime' },
            { val: '25 Yr', label: 'System Lifespan' },
          ].map(s => (
            <div key={s.label} className="text-center p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <div className="font-orbitron font-black text-2xl text-orange">{s.val}</div>
              <div className="text-slate-400 font-space text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-5" style={{ background: '#f8faff' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-10">
            <span className="section-tag">What We Offer</span>
            <h2 className="section-title mt-2">Complete <span className="glow-text">After-Sales Services</span></h2>
            <p className="text-slate-500 font-space text-base mt-4 max-w-xl mx-auto">Everything your solar system needs after installation — under one roof.</p>
          </motion.div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {[
              { key: 'all', label: 'All Services' },
              { key: 'amc', label: 'AMC & Maintenance' },
              { key: 'repair', label: 'Repair & Inverter' },
              { key: 'support', label: 'Monitoring & Support' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="px-5 py-2 rounded-full font-space font-semibold text-sm transition-all"
                style={activeTab === tab.key
                  ? { background: '#0B1D51', color: '#fff' }
                  : { background: '#fff', color: '#64748b', border: '1px solid #e2e8f0' }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -5 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl"
                  style={{ background: s.color }} />
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}>
                  {React.cloneElement(s.icon, { style: { color: s.color } })}
                </div>
                <h3 className="font-orbitron font-bold text-sm text-navy mb-2">{s.title}</h3>
                <p className="text-slate-500 text-xs font-space leading-relaxed mb-4">{s.desc}</p>
                <ul className="space-y-1.5 mb-4">
                  {s.points.map(p => (
                    <li key={p} className="flex items-start gap-2 text-xs font-space text-slate-600">
                      <CheckCircle2 size={13} className="mt-0.5 shrink-0" style={{ color: s.color }} />
                      {p}
                    </li>
                  ))}
                </ul>
                <span className="inline-block text-xs font-space font-bold px-3 py-1 rounded-full"
                  style={{ background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}30` }}>
                  {s.tag}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AMC Plans */}
      <section className="py-20 px-5" style={{ background: '#fff' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="section-tag">AMC Plans</span>
            <h2 className="section-title mt-2">Choose Your <span className="glow-text">Maintenance Plan</span></h2>
            <p className="text-slate-500 font-space text-base mt-4 max-w-xl mx-auto">Transparent pricing. No hidden charges. Cancel anytime.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {amcPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl p-7 border-2 flex flex-col ${plan.popular ? 'shadow-2xl scale-105' : 'border-gray-100'}`}
                style={plan.popular ? { borderColor: plan.color, background: '#fffdf0' } : { background: '#f8faff' }}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-space font-bold text-white"
                    style={{ background: plan.color }}>
                    Most Popular
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="font-orbitron font-black text-xl text-navy">{plan.name}</h3>
                  <div className="flex items-end gap-1 mt-2">
                    <span className="font-orbitron font-black text-3xl" style={{ color: plan.color }}>{plan.price}</span>
                    <span className="text-slate-400 font-space text-sm mb-1">{plan.period}</span>
                  </div>
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
                <button
                  onClick={openModal}
                  className="w-full py-3 rounded-xl font-space font-bold text-sm transition-all hover:opacity-90"
                  style={plan.popular
                    ? { background: plan.color, color: '#fff' }
                    : { background: `${plan.color}15`, color: plan.color, border: `1px solid ${plan.color}40` }}
                >
                  Get {plan.name} Plan
                </button>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-slate-400 font-space text-sm mt-6">* Prices are indicative. Final quote based on system size & location.</p>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-20 px-5" style={{ background: '#f8faff' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="section-tag">How It Works</span>
            <h2 className="section-title mt-2">Our <span className="glow-text">Service Process</span></h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: '#0B1D5110', border: '1px solid #0B1D5120' }}>
                  {React.cloneElement(step.icon, { style: { color: '#0B1D51' } })}
                </div>
                <div className="font-orbitron font-black text-3xl mb-2" style={{ color: '#FFB80040' }}>{step.step}</div>
                <h3 className="font-orbitron font-bold text-sm text-navy mb-2">{step.title}</h3>
                <p className="text-slate-500 font-space text-xs leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Service Matters */}
      <section className="py-16 px-5" style={{ background: '#fff' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-10">
            <span className="section-tag">Why It Matters</span>
            <h2 className="section-title mt-2">Neglected Solar = <span className="glow-text">Lost Money</span></h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <Sun size={22} />, color: '#FFB800', title: 'Dust reduces output by 25–30%', desc: 'Unclean panels lose significant generation every month. Regular cleaning pays for itself.' },
              { icon: <Zap size={22} />, color: '#FF7A00', title: 'Inverter faults go undetected', desc: 'Without monitoring, a faulty inverter can silently waste weeks of generation.' },
              { icon: <BatteryWarning size={22} />, color: '#00C9A7', title: 'Battery degradation is preventable', desc: 'Proper servicing extends battery life by 3–5 years, saving ₹50,000+.' },
              { icon: <FileText size={22} />, color: '#00A3E0', title: 'Service records improve resale value', desc: 'Well-documented maintenance history increases property and system resale value significantly.' },
              { icon: <IndianRupee size={22} />, color: '#00C9A7', title: 'Net meter errors cost you money', desc: 'Billing discrepancies go unnoticed without periodic DISCOM reconciliation.' },
              { icon: <ShieldAlert size={22} />, color: '#EF4444', title: 'Safety risks from loose wiring', desc: 'Thermal imaging and wiring checks prevent fire hazards and system failures.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                  {React.cloneElement(item.icon, { style: { color: item.color } })}
                </div>
                <div>
                  <h4 className="font-space font-bold text-sm text-navy mb-1">{item.title}</h4>
                  <p className="text-slate-500 font-space text-xs leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-5 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <Clock size={40} className="mx-auto mb-4 text-orange" />
            <h2 className="font-orbitron font-black text-3xl md:text-4xl text-navy mb-4">
              Book Your Solar Service <span className="glow-text">Today</span>
            </h2>
            <p className="text-slate-500 font-space text-base mb-8 max-w-xl mx-auto">
              Don't wait for a breakdown. Schedule a free health check for your solar system and keep it running at peak performance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button onClick={openModal} className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-space font-bold text-white hover:scale-105 transition-all border-none cursor-pointer" style={{ background: '#FF7A00' }}>
                Book Free Health Check <ArrowRight size={18} />
              </button>
              <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-space font-bold text-navy border border-gray-200 hover:bg-white transition-all">
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
