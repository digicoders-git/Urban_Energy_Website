import React, { useState, useEffect } from 'react'
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

  // ✅ responsive cards count
  const getCardsPerView = () => {
    if (window.innerWidth < 640) return 1
    if (window.innerWidth < 1024) return 2
    return 3
  }

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView())

  // ✅ resize listener
  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView())
      setIndex(0) // reset to avoid overflow
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = testimonials.length - cardsPerView

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

        {/* Slider */}
        <div className="overflow-hidden px-2">
          <motion.div
            className="flex "
            animate={{ x: `-${index * (100 / cardsPerView)}%` }}
            transition={{ duration: 0.5 }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="min-w-full sm:min-w-[50%] lg:min-w-[33.33%] px-3"
              >
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

  {/* Prev */}
  <button
    onClick={prev}
    disabled={index === 0}
    className="px-4 py-2 btn-primary bg-gray-200 rounded disabled:opacity-50"
  >
    Prev
  </button>

  {/* Dots */}
  <div className="flex items-center gap-2">
    {[...Array(maxIndex + 1)].map((_, i) => (
      <button
        key={i}
        onClick={() => setIndex(i)}
        className={`transition-all duration-300 rounded-full ${
          index === i
            ? 'w-6 h-2 bg-orange'
            : 'w-2 h-2 bg-gray-300'
        }`}
      />
    ))}
  </div>

  {/* Next */}
  <button
    onClick={next}
    disabled={index === maxIndex}
    className="px-4 py-2 btn-primary bg-gray-200 rounded disabled:opacity-50"
  >
    Next
  </button>

</div>
      </div>
    </section>
  )
}