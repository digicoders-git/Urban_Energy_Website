import React, { useState } from 'react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    initials: 'RK',
    name: 'Rajesh Kumar',
    role: 'Homeowner, Lucknow',
    stars: 5,
    text: 'My electricity bill dropped from ₹5,200 to just ₹400 a month...',
  },
  {
    initials: 'PS',
    name: 'Priya Sharma',
    role: 'Factory Owner, Kanpur',
    stars: 5,
    text: 'We installed 50 kW at our factory...',
  },
  {
    initials: 'AM',
    name: 'Arjun Mehta',
    role: 'Resident, Delhi NCR',
    stars: 5,
    text: 'The subsidy documentation was handled...',
  },
  {
    initials: 'SK',
    name: 'Sandeep Kumar',
    role: 'Business Owner',
    stars: 5,
    text: 'Installation was smooth and savings are real...',
  },
  {
    initials: 'PS',
    name: 'Priya Sharma',
    role: 'Factory Owner, Kanpur',
    stars: 5,
    text: 'We installed 50 kW at our factory...',
  },
  {
    initials: 'AM',
    name: 'Arjun Mehta',
    role: 'Resident, Delhi NCR',
    stars: 5,
    text: 'The subsidy documentation was handled...',
  }
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)

  const maxIndex = testimonials.length - 3

  const next = () => {
    if (index < maxIndex) setIndex(index + 1)
  }

  const prev = () => {
    if (index > 0) setIndex(index - 1)
  }

  return (
    <section id="testimonials" className="py-14 px-5 bg-slate-50">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-tag">Testimonials</span>
          <h2 className="section-title">
            What Our <span className="text-orange">Customers Say</span>
          </h2>
        </motion.div>

        {/* ✅ Slider instead of grid */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: `-${index * (100 / 3)}%` }}
            transition={{ duration: 0.5 }}
          >
            {testimonials.map((t, i) => (
              <div key={t.name} className="min-w-[calc(100%/3)]">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white border border-gray-100 rounded-2xl p-7 relative overflow-hidden hover:shadow-xl h-full"
                >
                  <div className="absolute top-4 right-6 text-7xl font-black text-orange/10">
                    "
                  </div>

                  <div className="text-yellow mb-3">{'★'.repeat(t.stars)}</div>
                  <p className="text-slate-500 text-sm italic mb-6">{t.text}</p>

                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ background: 'linear-gradient(135deg, #FF7A00, #FFC107)' }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-bold text-navy text-sm">{t.name}</div>
                      <div className="text-slate-400 text-xs">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          
          <button
            onClick={prev}
            disabled={index === 0}
            className="px-4 py-2 btn-primary bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {/* numbers (optional but adjusted) */}
          {[...Array(testimonials.length - 2)].map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-9 h-9 rounded-full ${
                index === i ? 'bg-orange text-white' : 'bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={next}
            disabled={index === maxIndex}
            className="px-4 btn-primary py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>
    </section>
  )
}