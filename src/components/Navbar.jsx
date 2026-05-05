import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '../../public/urbanlogo.png'
const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Calculator', to: '/calculator' },
  { label: 'Blogs', to: '/blog' },
  { label: 'Projects', to: '/projects' },
  { label: 'Services', to: '/services' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy/98 shadow-2xl' : 'bg-navy/90'
      } bg-navy`}
    >
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 no-underline">
          <img src={Logo} className='w-12 object-contain' alt="" />
          <span className="font-outfit mt-5 font-black text-white text-xl tracking-tight">
            Urban <span className="text-orange">Energy</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-7 list-none">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                to={l.to}
                className={`no-underline text-md font-bold transition-colors duration-200 ${
                  location.pathname === l.to
                    ? 'text-orange'
                    : 'text-white/75 hover:text-orange'
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to="/contact"
          className="hidden md:inline-block bg-orange hover:bg-orange/90 text-white font-outfit font-bold text-sm px-6 py-2.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 no-underline"
        >
          Free Quote
        </Link>
        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1 bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-navy/98 border-t border-white/10 overflow-hidden"
          >
            <div className="px-5 py-4 flex flex-col gap-3">
              {links.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  className={`no-underline text-base font-medium py-1 transition-colors ${
                    location.pathname === l.to
                      ? 'text-orange'
                      : 'text-white/80 hover:text-orange'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="btn-primary mt-2 text-center"
              >
                Get Free Quote
              </Link>
             
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
