import React from 'react'
import { motion } from 'framer-motion'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const vals = [320, 290, 410, 480, 520, 490, 380, 430, 470, 510, 440, 500]
const maxVal = Math.max(...vals)

const metrics = [
  { label: "Today's Generation", val: '18', unit: 'kWh', delta: '↑ 12% vs yesterday' },
  { label: 'Monthly Savings', val: '₹4,820', unit: '', delta: '↑ 23% vs last month' },
  { label: 'System Efficiency', val: '94', unit: '%', delta: 'Optimal performance' },
  { label: 'CO₂ Offset', val: '2.4', unit: 'T', delta: '↑ This year' },
]

export default function Dashboard() {
  return (
    <section id="dashboard" className="py-10 sm:py-12 px-4 sm:px-5 bg-slate-50">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="section-tag">Live Dashboard</span>
          <h2 className="section-title">
            Smart Energy <span className="text-orange">Monitoring</span>
          </h2>
          <p className="text-slate-500 mt-3 max-w-lg mx-auto">
            Track your solar production in real-time from anywhere via the Urban Energy app.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-5 sm:p-8 relative overflow-hidden"
          style={{ background: '#0B1F3A' }}
        >
          {/* Glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '-25%', right: '-5%', width: 400, height: 400,
              background: 'radial-gradient(circle, rgba(255,122,0,0.15) 0%, transparent 70%)',
            }}
          />

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-7 relative z-10">
            <h3 className="font-outfit font-bold text-lg sm:text-xl text-white">
              ⚡ Energy Dashboard — Sample View
            </h3>
            <span className="flex items-center gap-2 text-green-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-live" />
              Live Data
            </span>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-7 relative z-10">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-4 sm:p-5"
                style={{ background: 'rgba(255,255,255,0.07)' }}
              >
                <div className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-2">
                  {m.label}
                </div>
                <div className="font-outfit font-black text-white text-2xl sm:text-3xl">
                  {m.val}
                  <span className="text-sm sm:text-lg text-white/40 ml-1">{m.unit}</span>
                </div>
                <div className="text-green-400 text-xs font-semibold mt-1">{m.delta}</div>
              </motion.div>
            ))}
          </div>

          {/* Bar Chart */}
          <div
            className="rounded-2xl p-4 sm:p-6 relative z-10"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            <div className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-4">
              Monthly Production (kWh)
            </div>

            {/* Scrollable chart */}
            <div className="overflow-x-auto">
              <div className="flex items-end gap-2 h-24 sm:h-28 min-w-[500px]">
                {vals.map((v, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${Math.round((v / maxVal) * 100)}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.6 }}
                    className="flex-1 rounded-t-md cursor-pointer hover:opacity-80 transition-opacity"
                    title={`${months[i]}: ${v} kWh`}
                    style={{
                      background: i === new Date().getMonth()
                        ? 'linear-gradient(180deg,#FFC107,#FF7A00)'
                        : 'rgba(255,122,0,0.4)',
                      minWidth: 20,
                    }}
                  />
                ))}
              </div>

              {/* Months */}
              <div className="flex justify-between mt-2 min-w-[500px]">
                {months.map((m) => (
                  <span key={m} className="text-white/30 text-[10px] sm:text-xs text-center flex-1">
                    {m}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}