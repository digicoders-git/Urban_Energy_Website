import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '../../public/urbanlogo.png'
import { useModal } from '../context/ModalContext'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  {
    label: 'Our Offering',
    dropdown: [
      { label: 'Homes', to: '/offering/homes' },
      { label: 'Commercial', to: '/offering/commercial' },
      { label: 'Housing Societies', to: '/offering/housing-societies' },
    ],
  },
  {
    label: 'Solar Solution',
    dropdown: [
      { label: 'Off-Grid Solar', to: '/solar/off-grid' },
      { label: 'On Grid Solar', to: '/solar/on-grid' },
      { label: 'After Installation Services', to: '/services/after-installation' },
    ],
  },
  {
    label: 'More',
    dropdown: [
      { label: 'Solar Calculator', to: '/calculator' },
      { label: 'Careers', to: '/careers' },
    ],
  },
  { label: 'Blog', to: '/blog' },
  { label: 'Partner', to: '/become-a-partner' },
  { label: 'Contact Us', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { openQuoteModal } = useModal()

  const handleNav = (to) => {
    setMenuOpen(false)
    setActiveDropdown(null)
    window.scrollTo({ top: 0, behavior: 'instant' })
    navigate(to)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setActiveDropdown(null)
  }, [location])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg shadow-navy/10' : 'bg-white/95 backdrop-blur-md border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 no-underline group">
          <img src={Logo} className="w-12 object-contain group-hover:scale-105 transition-transform" alt="" />
          <span className="font-orbitron font-black text-navy text-lg tracking-tight">
            Urban <span className="glow-text">Energy</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {navLinks.map((link) =>
            link.dropdown ? (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="no-underline text-sm font-space font-bold text-navy hover:text-orange transition-colors duration-200 bg-transparent border-none cursor-pointer">
                  {link.label} ▾
                </button>
                <AnimatePresence>
                  {activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 min-w-[200px]"
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="block px-4 py-2 text-sm font-space font-bold text-navy hover:text-orange hover:bg-gray-50 no-underline transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className={`no-underline text-sm font-space font-bold transition-colors duration-200 ${
                    location.pathname === link.to ? 'text-orange' : 'text-navy hover:text-orange'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        <button
          onClick={openQuoteModal}
          className="hidden md:inline-block text-white font-space font-bold text-sm px-6 py-3 rounded-full shadow-md transition-all duration-200 hover:-translate-y-0.5 border-none cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #FFB800, #FF7A00)', boxShadow: '0 4px 20px rgba(255,122,0,0.35)' }}
        >
          Get Free Quote
        </button>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1 bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-navy rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-navy rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-navy rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
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
            className="md:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.label}>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                      className="w-full text-left text-base font-semibold text-navy/80 hover:text-navy py-1 bg-transparent border-none cursor-pointer"
                    >
                      {link.label} {activeDropdown === link.label ? '▴' : '▾'}
                    </button>
                    {activeDropdown === link.label && (
                      <div className="pl-4 mt-2 flex flex-col gap-2">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => handleNav(item.to)}
                            className="text-sm font-bold text-navy hover:text-orange no-underline"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => handleNav(link.to)}
                    className={`no-underline text-base font-semibold py-1 transition-colors ${
                      location.pathname === link.to ? 'text-solarsky' : 'text-navy/80 hover:text-navy'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <button 
                onClick={() => {
                  setMenuOpen(false);
                  openQuoteModal();
                }}
                className="btn-primary mt-2 w-full text-center rounded-full py-3 font-bold border-none cursor-pointer text-white"
                style={{ background: 'linear-gradient(135deg, #FFB800, #FF7A00)' }}
              >
                Get Free Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
