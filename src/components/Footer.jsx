import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../public/urbanlogo.png'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";

const footerLinks = {
  Services: [
    { label: 'Residential Solar', to: '/offering/homes' },
    { label: 'Commercial Solar', to: '/offering/commercial' },
    { label: 'Housing Societies', to: '/offering/housing-societies' },
    { label: 'On-Grid Solar', to: '/solar/on-grid' },
    { label: 'Off-Grid Solar', to: '/solar/off-grid' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Projects', to: '/projects' },
    { label: 'Blog', to: '/blog' },
    { label: 'Careers', to: '/careers' },
    { label: 'Refer Now', to: '/refer-now' },
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
  { icon: <FaMapMarkerAlt size={16} />, label: 'Address', val: <>KH-3/283/124, Vistarit Area Part-2, Khargapur,<br />Sector-6, Gomti Nagar Extension,<br />Lucknow</> },
  { icon: <FaPhoneAlt size={16} />, label: 'Phone', val: '+91 8960-68-6060' },
  { icon: <FaEnvelope size={16} />, label: 'Email', val: 'support@vaulixsolar.in' },
  { icon: <FaClock size={16} />, label: 'Hours', val: 'Mon – Sat: 9 AM – 7 PM' },
]

const socials = [
  { icon: <FaFacebookF size={16} /> },
  { icon: <FaLinkedinIn size={16} /> },
  { icon: <FaTwitter size={16} /> },
  { icon: <FaYoutube size={16} /> },
]

export default function Footer() {
  return (
    <footer className="text-slate-700 relative overflow-hidden pt-16 pb-0 px-5 bg-white border-t border-gray-200">

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ── Top Grid ── */}
        <div className="grid gap-10 pb-12 border-b border-gray-200 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4 no-underline">
              <img src={Logo} className="w-28 h-28 md:-ml-6 object-contain" alt="VAULIX™ SOLAR ENERGY" />
              {/* <span className="font-orbitron font-black text-navy text-lg">
                Vaulix <span className="glow-text">Solar</span>
              </span> */}
            </Link>
            <p className="text-sm leading-relaxed mb-5 text-slate-500">
              Powering a Brighter Future. India's trusted solar partner for residential and
              commercial installations.
            </p>

            {/* Socials */}
            <div className="flex gap-2 mt-4">
              {socials.map((s, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold cursor-pointer transition-all duration-200 hover:bg-orange hover:text-white"
                  style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#64748b' }}
                >
                  {s.icon}
                </div>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([cat, links]) => (
            <div key={cat}>
              <h4 className="font-outfit font-bold text-[11px] uppercase tracking-widest text-slate-400 mb-4">
                {cat}
              </h4>
              <ul className="flex flex-col gap-2.5 list-none">
                {links.map((l) => (
                  <li key={l.label} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full flex-shrink-0 bg-orange/50" />
                    <Link
                      to={l.to}
                      className="text-sm no-underline transition-colors duration-200 text-slate-500 hover:text-orange"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Contact Strip ── */}
        <div className="py-7 border-b border-gray-200">
          <div className="flex flex-wrap gap-7">
            {contactInfo.map((c) => (
              <div key={c.label} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                  style={{ background: 'rgba(255,122,0,0.08)', border: '1px solid rgba(255,122,0,0.15)' }}
                >
                  {React.cloneElement(c.icon, { className: "text-orange" })}
                </div>
                <div>
                  <div className="font-outfit font-bold text-[10px] uppercase tracking-widest text-slate-400">
                    {c.label}
                  </div>
                  <div className="text-sm font-medium mt-0.5 text-slate-600">
                    {c.val}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="py-5 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            © 2025 VAULIX™ ENERGIES LLP. All rights reserved.
          </span>
          {/* <a
            href="https://digicoders.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm flex items-center gap-1 no-underline transition-colors hover:opacity-80"
            style={{ color: '#FF7A00', fontWeight: 500 }}
          >
            Crafted By DigiCoders
          </a> */}
        </div>
      </div>
    </footer>
  )
}
