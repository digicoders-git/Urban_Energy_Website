import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'

const API = import.meta.env.VITE_API_URL

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading]           = useState(true)
  const [index, setIndex]               = useState(0)
  const [paused, setPaused]             = useState(false)

  useEffect(() => {
    fetch(`${API}/reviews/published`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length) {
          setTestimonials(data.map(r => ({
            initials: r.initials || r.name[0].toUpperCase(),
            name:     r.name,
            role:     r.role || '',
            stars:    r.stars,
            text:     r.review,
          })))
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const getCardsPerView = () => {
    if (window.innerWidth < 640)  return 1
    if (window.innerWidth < 1024) return 2
    return 3
  }

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView)

  useEffect(() => {
    const onResize = () => { setCardsPerView(getCardsPerView()); setIndex(0) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const maxIndex = Math.max(0, testimonials.length - cardsPerView)

  useEffect(() => {
    if (paused || testimonials.length === 0) return
    const t = setInterval(() => setIndex(p => (p >= maxIndex ? 0 : p + 1)), 3000)
    return () => clearInterval(t)
  }, [paused, maxIndex, testimonials.length])

  const next = () => setIndex(p => (p >= maxIndex ? 0 : p + 1))
  const prev = () => setIndex(p => (p <= 0 ? maxIndex : p - 1))

  return (
    <section id="testimonials" className="py-14 px-5 bg-slate-50">
      <div className="max-w-6xl mx-auto">

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
          <Link to="/review"
            className="inline-flex items-center gap-2 mt-5 px-6 py-2.5 rounded-full font-outfit font-bold text-sm text-white transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg,#FF7A00,#ff9500)', boxShadow: '0 4px 16px rgba(255,122,0,0.25)' }}>
            <Star size={14} fill="white" /> Share Your Experience
          </Link>
        </motion.div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
            Loading reviews...
          </div>
        ) : testimonials.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8', fontSize: 14 }}>
            No reviews published yet.
          </div>
        ) : (
          <>
            <div
              className="overflow-hidden px-2"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <motion.div
                className="flex"
                animate={{ x: `-${index * (100 / cardsPerView)}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                {testimonials.map((t, i) => (
                  <div key={i} className="min-w-full sm:min-w-[50%] lg:min-w-[33.33%] px-3">
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="bg-white border border-gray-100 rounded-2xl p-7 relative overflow-hidden hover:shadow-xl h-full"
                    >
                      <div className="absolute top-4 right-6 text-7xl font-black text-orange/10">"</div>
                      <div className="text-orange mb-3">{'★'.repeat(t.stars)}</div>
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

            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={prev}
                className="px-5 py-2 rounded-full font-bold text-sm transition-all"
                style={{ background: 'linear-gradient(135deg, #FFB800, #FF7A00)', color: 'white' }}
              >
                ← Prev
              </button>

              <div className="flex items-center gap-2">
                {[...Array(maxIndex + 1)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`transition-all duration-300 rounded-full ${
                      index === i ? 'w-6 h-2 bg-orange' : 'w-2 h-2 bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="px-5 py-2 rounded-full font-bold text-sm transition-all"
                style={{ background: 'linear-gradient(135deg, #FFB800, #FF7A00)', color: 'white' }}
              >
                Next →
              </button>
            </div>
          </>
        )}

      </div>
    </section>
  )
}
