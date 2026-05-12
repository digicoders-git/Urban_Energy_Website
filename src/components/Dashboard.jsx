import React from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

const chartData = [
  { month: 'Jan', value: 320 },
  { month: 'Feb', value: 290 },
  { month: 'Mar', value: 410 },
  { month: 'Apr', value: 480 },
  { month: 'May', value: 520 },
  { month: 'Jun', value: 490 },
  { month: 'Jul', value: 380 },
  { month: 'Aug', value: 430 },
  { month: 'Sep', value: 470 },
  { month: 'Oct', value: 510 },
  { month: 'Nov', value: 440 },
  { month: 'Dec', value: 500 },
];

const metrics = [
  { label: "Today's Generation", val: '18', unit: 'kWh', delta: '↑ 12% vs yesterday' },
  { label: 'Monthly Savings', val: '₹4,820', unit: '', delta: '↑ 23% vs last month' },
  { label: 'System Efficiency', val: '94', unit: '%', delta: 'Optimal performance' },
  { label: 'CO₂ Offset', val: '2.4', unit: 'T', delta: '↑ This year' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-xl shadow-2xl border border-gray-100 backdrop-blur-md font-jakarta">
        <p className="text-navy/60 text-xs font-bold uppercase mb-1">{label}</p>
        <p className="text-navy text-xl font-extrabold">{payload[0].value} <span className="text-xs text-gray-400 font-medium">kWh</span></p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  return (
    <section id="dashboard" className="py-20 px-5 bg-slate-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-tag">Live Analytics</span>
          <h2 className="font-jakarta text-4xl md:text-5xl font-extrabold text-navy tracking-tight">
            Elite Smart <span className="text-solarsky">Monitoring</span>
          </h2>
          <p className="text-navy/50 font-medium mt-4 max-w-xl mx-auto">
            Industry-leading real-time analytics delivered through our responsive 24/7 tracking dashboard.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="rounded-[40px] p-6 md:p-10 relative overflow-hidden shadow-2xl shadow-navy/10 border border-white/10"
          style={{ background: 'linear-gradient(165deg, #112378 0%, #081348 100%)' }}
        >
          {/* High-end Glowing Accents */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-solarsky/20 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-orange/10 blur-[100px] pointer-events-none" />

          {/* Header & Data Status */}
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div>
              <h3 className="font-jakarta font-bold text-xl text-white">System Performance</h3>
              <p className="text-white/40 text-sm mt-0.5">Live data sync across entire grid</p>
            </div>
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 text-xs px-3 py-1.5 rounded-full font-bold tracking-wide uppercase animate-pulse">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
              Active
            </div>
          </div>

          {/* Metric Micro-Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 relative z-10">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.07] transition-colors"
              >
                <div className="text-white/40 text-[10px] md:text-xs uppercase tracking-widest font-bold mb-2">{m.label}</div>
                <div className="font-jakarta font-extrabold text-white text-2xl md:text-3xl leading-none flex items-baseline gap-1">
                  {m.val}
                  {m.unit && <span className="text-sm font-medium text-white/30">{m.unit}</span>}
                </div>
                <div className="text-green-400 text-[10px] md:text-xs font-bold mt-3 flex items-center gap-1 opacity-90">{m.delta}</div>
              </motion.div>
            ))}
          </div>

          {/* Chart Engine */}
          <div className="h-[320px] w-full relative z-10 bg-white/[0.02] border border-white/[0.05] rounded-3xl p-4 md:p-6 overflow-hidden">
            <div className="absolute top-5 left-6 flex items-center gap-2 z-10">
               <span className="text-white/60 text-sm font-bold">Monthly Production</span>
               <span className="bg-solarsky/20 text-solarsky text-[10px] px-2 py-0.5 rounded-md font-bold border border-solarsky/30">FY 2025</span>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 50, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00A3E0" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#00A3E0" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: 600 }} 
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#00A3E0" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorVal)" 
                  animationDuration={2000}
                  activeDot={{ r: 6, fill: '#ffffff', stroke: '#00A3E0', strokeWidth: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

        </motion.div>
      </div>
    </section>
  );
}