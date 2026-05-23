import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Leaf, DollarSign, Zap, ArrowRight, Building, Home, School, BatteryCharging } from 'lucide-react'
import { Link } from 'react-router-dom'

const showcaseData = {
  Residential: {
    icon: Home,
    title: 'High-Performance Residential Rooftops',
    subtitle: 'Lucknow, Kanpur & Prayagraj region setups',
    description: 'Our residential solar setups are engineered to maximize energy yield even in partial shade conditions. Featuring tier-1 Monoperc panels and high-efficiency smart inverters with real-time app monitoring.',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80',
    stats: [
      { label: 'Avg Capacity', val: '5 kW - 10 kW' },
      { label: 'Monthly Savings', val: '₹4,500 - ₹9,500' },
      { label: 'CO₂ Offset / Year', val: '4.8 Tons' }
    ],
    features: ['Premium Tier-1 Modules', 'Smart Mobile App Integration', 'Optimized Rooftop Design']
  },
  Commercial: {
    icon: Building,
    title: 'Industrial & Commercial Power Plants',
    subtitle: 'Kanpur Industrial Zone & Noida SEZ systems',
    description: 'Engineered for high-demand industrial units, factories, and commercial complexes. Our setups help reduce peak demand charges, utilize accelerated depreciation benefits, and dramatically lower operational expenditures.',
    image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80',
    stats: [
      { label: 'Avg Capacity', val: '50 kW - 250 kW' },
      { label: 'Annual Savings', val: '₹6L - ₹32L' },
      { label: 'CO₂ Offset / Year', val: '120 Tons' }
    ],
    features: ['Peak Shaving Performance', 'Zero-Export Device Configuration', 'Bifacial Technology Integration']
  },
  Societies: {
    icon: School,
    title: 'Housing Societies & Institutions',
    subtitle: 'Agra & Lucknow township setups',
    description: 'Providing shared solar infrastructure for common area lighting, water pumps, lifts, and residential clubs. Features net-metering configurations designed for maximum community compliance and mutual savings benefits.',
    image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=800&q=80',
    stats: [
      { label: 'Avg Capacity', val: '20 kW - 100 kW' },
      { label: 'Monthly Savings', val: '₹18,000 - ₹90,000' },
      { label: 'CO₂ Offset / Year', val: '45 Tons' }
    ],
    features: ['Common Utility Billing Offsetting', 'Community Generation Portal', 'Advanced Structural Mounting']
  },
  OffGrid: {
    icon: BatteryCharging,
    title: 'Off-Grid & Hybrid Battery Backup Solutions',
    subtitle: 'Rural areas & agricultural farm systems',
    description: 'Perfect for areas with unstable grids or farm owners wanting absolute energy independence. Includes advanced lithium-ferro-phosphate (LFP) battery storage systems that deliver 24/7 continuous green power.',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    stats: [
      { label: 'Avg Capacity', val: '3 kW - 15 kW' },
      { label: 'Battery Reserve', val: '4 Hours - 12 Hours' },
      { label: 'Grid Independence', val: '100%' },
      { label: 'System Lifespan', val: '15+ Years' }
    ],
    features: ['Lithium-LFP Smart Battery Bank', 'Uninterrupted Pure Sine Wave Output', 'Rugged All-Weather Enclosure']
  }
}

export default function ProjectShowcase() {
  const [activeTab, setActiveTab] = useState('Residential')

  const activeData = showcaseData[activeTab]
  const IconComponent = activeData.icon

  return (
    <section className="py-20 px-5 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Visual background enhancements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-solarsky/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-solarsky/15 border border-solarsky/20 text-solarsky px-4 py-1.5 rounded-full text-xs font-space font-bold uppercase tracking-widest mb-4">
            Solar Solutions
          </span>
          <h2 className="font-orbitron text-3xl md:text-5xl font-black text-navy leading-tight">
            Smarter Solar <span className="text-orange">Solutions</span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto font-outfit">
            Explore our state-of-the-art completed configurations. Select a category below to view detailed savings metrics and technical specifications.
          </p>
        </motion.div>

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {Object.keys(showcaseData).map((tab) => {
            const TabIcon = showcaseData[tab].icon
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-full font-outfit font-bold text-sm transition-all duration-300 cursor-pointer border-none shadow-sm ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-orange to-orange/90 shadow-md shadow-orange/20 scale-105'
                    : 'text-navy bg-white hover:bg-slate-50 border border-slate-100'
                }`}
              >
                <TabIcon size={16} />
                {tab.replace(/([A-Z])/g, ' $1').trim()}
              </button>
            )
          })}
        </div>

        {/* Dynamic Display Panel */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden min-h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center"
            >
              {/* Info Column */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs text-orange font-space font-bold uppercase tracking-widest flex items-center gap-2">
                    <IconComponent size={14} /> {activeTab} Division
                  </span>
                  <h3 className="font-orbitron text-2xl sm:text-3xl font-black text-navy mt-2 leading-tight">
                    {activeData.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 font-medium italic">{activeData.subtitle}</p>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed font-outfit">
                  {activeData.description}
                </p>

                {/* Features Grid */}
                <div className="grid sm:grid-cols-3 gap-3">
                  {activeData.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl p-3">
                      <ShieldCheck size={14} className="text-green-500 flex-shrink-0" />
                      <span className="text-[11px] font-bold text-navy leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Stats list */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100">
                  {activeData.stats.map((st) => (
                    <div key={st.label} className="min-w-[110px] sm:min-w-0">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-space">
                        {st.label}
                      </div>
                      <div className="font-orbitron font-black text-navy text-lg sm:text-xl mt-1 leading-none whitespace-nowrap">
                        {st.val}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Media Column */}
              <div className="lg:col-span-5 relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-100 shadow-md relative group">
                  <img
                    src={activeData.image}
                    alt={activeData.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent pointer-events-none" />
                </div>
                
                {/* Floating Decorative card */}
                <div className="absolute -bottom-4 -left-4 bg-navy text-white rounded-xl p-4 shadow-lg flex items-center gap-3 border border-white/10 max-w-[200px]">
                  <Leaf className="text-green-400 flex-shrink-0" size={24} />
                  <div>
                    <div className="text-[9px] text-white/50 uppercase tracking-widest font-bold font-space">Environmental Impact</div>
                    <div className="text-xs font-bold font-outfit mt-0.5">Carbon footprint reduced immediately.</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Page CTA */}
        <div className="mt-16 text-center">
          <Link
            to="/refer-now"
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white font-outfit font-black px-10 py-4 rounded-full shadow-lg shadow-orange/30 transition-all duration-300 hover:-translate-y-1 no-underline text-center"
          >
            Start My Project Journey <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
