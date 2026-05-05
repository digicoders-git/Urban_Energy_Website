import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    q: 'How much does a solar system cost in India?',
    a: 'A typical 3 kW on-grid system costs between ₹1.2–1.8 lakhs before subsidy. After the PM Surya Ghar subsidy of up to ₹78,000, your net cost can be as low as ₹42,000–1 lakh depending on your city and system type.',
  },
  {
    q: 'How long does installation take?',
    a: 'Most residential installations are completed within 1–2 working days after site survey and design approval. The net metering connection from DISCOM may take an additional 2–4 weeks depending on your utility provider.',
  },
  {
    q: 'What is net metering and how does it benefit me?',
    a: 'Net metering allows you to export excess solar energy back to the grid and receive credits on your electricity bill. During sunny hours, your panels generate more than you use — this surplus is credited. At night, you draw from the grid, offset by your daytime credits.',
  },
  {
    q: 'Do solar panels work during monsoon or cloudy days?',
    a: 'Yes! Solar panels generate electricity even on cloudy or rainy days, typically at 20–40% of peak output. Annual production estimates already account for seasonal weather patterns, so your ROI projections are accurate.',
  },
  {
    q: 'What maintenance do solar panels require?',
    a: 'Solar panels are extremely low-maintenance. Periodic cleaning (once a month in dusty areas) and an annual health check-up are typically all that\'s needed. Our AMC plans cover all monitoring, cleaning, and maintenance for complete peace of mind.',
  },
  {
    q: 'What warranties do you provide?',
    a: 'We provide a 25-year performance warranty and 10-year product warranty on panels, a 5-year warranty on inverters, and a 1-year workmanship warranty on all installations. We also assist with warranty claims throughout the product life.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)
 
  return (
    <section id="faq" className="py-12 px-5 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-tag">FAQ</span>
          <h2 className="section-title">
            Frequently Asked <span className="text-orange">Questions</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                open === i ? 'border-orange/30 shadow-md shadow-orange/5' : 'border-gray-100'
              }`}
            >
              
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center px-6 py-5 text-left bg-white hover:bg-slate-50 transition-colors"
              >
                <span className="font-outfit font-semibold text-navy text-base pr-4">{faq.q}</span>
              <motion.span
            animate={{ rotate: open === i ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
            style={{
                 background: open === i ? '#FF7A00' : 'rgba(255,122,0,0.1)',
              color: open === i ? '#fff' : '#FF7A00',
            }}
          >
  {open === i ? <FiMinus size={16} /> : <FiPlus size={16} />}
</motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-6 pb-5 text-slate-500 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
                
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
