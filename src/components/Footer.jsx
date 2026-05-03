import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../public/urbanlogo.png'

const footerLinks = {
  Services: [
    { label: 'Residential Solar', to: '/services' },
    { label: 'Commercial Solar', to: '/services' },
    { label: 'Rooftop EPC', to: '/services' },
    { label: 'AMC & O&M', to: '/services' },
    { label: 'Off-Grid Systems', to: '/services' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Projects', to: '/projects' },
    { label: 'Blog', to: '/' },
    { label: 'Careers', to: '/contact' },
    { label: 'Contact', to: '/contact' },
  ],
  Resources: [
    { label: 'Subsidy Guide', to: '/calculator' },
    { label: 'Solar Calculator', to: '/calculator' },
    { label: 'Net Metering', to: '/faq' },
    { label: 'MNRE Schemes', to: '/faq' },
    { label: 'FAQ', to: '/faq' },
  ],
}

const contactInfo = [
  { icon: '📍', label: 'Address', val: 'Lucknow, Uttar Pradesh – 226001' },
  { icon: '📞', label: 'Phone', val: '+91 98000 12345' },
  { icon: '✉️', label: 'Email', val: 'hello@urbanenergy.in' },
  { icon: '⏰', label: 'Hours', val: 'Mon – Sat: 9 AM – 7 PM' },
]

const trustBadges = [
  'MNRE Empanelled',
  'DISCOM Certified',
  'PM Surya Ghar Partner',
  '25-Year Panel Warranty',
  'ISO 9001:2015',
]

const socials = ['f', 'in', 'X', 'yt']

export default function Footer() {
  return (
    <footer
      className="text-white relative overflow-hidden pt-16 pb-0 px-5"
      style={{ background: '#0B1F3A' }}
    >
      {/* Glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-72 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 20% 100%, rgba(255,122,0,0.07) 0%, transparent 70%)',
        }}
      />
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ── Top Grid ── */}
        <div
          className="grid gap-10 pb-12"
          style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          {/* Brand + Newsletter */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4 no-underline">
              <img src={Logo} className="w-9 object-contain" alt="Urban Energy" />
              <span className="font-outfit font-black text-white text-lg">
                Urban <span className="text-orange">Energy</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Powering a Brighter Future. India's trusted solar partner for residential and
              commercial installations since 2015.
            </p>

            {/* Newsletter */}
            <div
              className="font-outfit font-bold text-[10px] uppercase tracking-widest mb-2"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              Get Solar Updates
            </div>
            <div
              className="flex overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px' }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 bg-white/5 border-none outline-none px-3 py-2.5 text-sm text-white placeholder:text-white/30"
              />
              <button
                className="px-4 text-xs font-outfit font-bold text-white border-none cursor-pointer transition-opacity hover:opacity-80"
                style={{ background: '#FF7A00' }}
              >
                Subscribe
              </button>
            </div>

            {/* Socials */}
            <div className="flex gap-2 mt-4">
              {socials.map((s, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold cursor-pointer transition-all duration-200 hover:bg-orange"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([cat, links]) => (
            <div key={cat}>
              <h4
                className="font-outfit font-bold text-[11px] uppercase tracking-widest text-white mb-4"
              >
                {cat}
              </h4>
              <ul className="flex flex-col gap-2.5 list-none">
                {links.map((l) => (
                  <li key={l.label} className="flex items-center gap-2">
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: 'rgba(255,122,0,0.45)' }}
                    />
                    <Link
                      to={l.to}
                      className="text-sm no-underline transition-colors duration-200 hover:text-orange"
                      style={{ color: 'rgba(255,255,255,0.45)' }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Contact + Trust Strip ── */}
        <div
          className="py-7"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex flex-wrap gap-7">
            {contactInfo.map((c) => (
              <div key={c.label} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                  style={{
                    background: 'rgba(255,122,0,0.1)',
                    border: '1px solid rgba(255,122,0,0.2)',
                  }}
                >
                  {c.icon}
                </div>
                <div>
                  <div
                    className="font-outfit font-bold text-[10px] uppercase tracking-widest"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                  >
                    {c.label}
                  </div>
                  <div
                    className="text-sm font-medium mt-0.5"
                    style={{ color: 'rgba(255,255,255,0.75)' }}
                  >
                    {c.val}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3 mt-5">
            {trustBadges.map((b) => (
              <div
                key={b}
                className="flex items-center gap-2 rounded-lg px-3 py-1.5"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: '#4ade80' }}
                />
                <span
                  className="font-outfit font-semibold text-[11px]"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {b}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="py-5 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            © 2025 Urban Energy Pvt. Ltd. All rights reserved.
          </span>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((t) => (
              <Link
                key={t}
                to="/"
                className="text-xs no-underline transition-colors hover:text-orange"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                {t}
              </Link>
            ))}
          </div>
          <span className="text-[11px] flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.2)' }}>
            🇮🇳 Made in India
          </span>
        </div>
      </div>
    </footer>
  )
}