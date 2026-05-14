import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../public/urbanlogo.png'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock,FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
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
  {
    icon: <FaMapMarkerAlt size={16} />,
    label: 'Address',
    val: 'Lucknow, Uttar Pradesh – 226001'
  },
  {
    icon: <FaPhoneAlt size={16} />,
    label: 'Phone',
    val: '+91 98000 12345'
  },
  {
    icon: <FaEnvelope size={16} />,
    label: 'Email',
    val: 'hello@urbanenergy.in'
  },
  {
    icon: <FaClock size={16} />,
    label: 'Hours',
    val: 'Mon – Sat: 9 AM – 7 PM'
  },
];
const trustBadges = [
  'MNRE Empanelled',
  'DISCOM Certified',
  'PM Surya Ghar Partner',
  'Tier-1 Certified Components',
  'ISO 9001:2015',
]

const socials = [
  { icon: <FaFacebookF size={16} /> },
  { icon: <FaLinkedinIn size={16} /> },
  { icon: <FaTwitter size={16} /> },
  { icon: <FaYoutube size={16} /> },
];

export default function Footer() {
  return (
    <footer
      className="text-white relative overflow-hidden pt-16 pb-0 px-5"
      style={{ background: '#112378' }}
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
  className="grid gap-10 pb-12 border-b border-white/10 
  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
>
          {/* Brand + Newsletter */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4 no-underline">
              <img src={Logo} className="w-9 object-contain" alt="Urban Energy" />
              <span className="font-orbitron font-black text-white text-lg">
                Urban <span className="glow-text">Energy</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.85)' }}>
              Powering a Brighter Future. India's trusted solar partner for residential and
              commercial installations.
            </p>

           

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
                  {React.cloneElement(s.icon, {
  className: "text-white/60 group-hover:text-orange transition"
})}
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
                      style={{ color: 'rgba(255,255,255,0.85)' }}
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
                  {React.cloneElement(c.icon, {
  className: "text-orange group-hover:scale-110 transition"
})}
                </div>
                <div>
                  <div
                    className="font-outfit font-bold text-[10px] uppercase tracking-widest"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
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

        </div>
        {/* ── Bottom Bar ── */}
        <div className="py-5 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>
            © 2025 Urban Energy Pvt. Ltd. All rights reserved.
          </span>

  <a
  href="https://digicoders.in"
  target="_blank"
  rel="noopener noreferrer"
  className="text-sm flex items-center gap-1 no-underline transition-colors hover:opacity-80"
  style={{ color: '#FF7A00', fontWeight: 500 }}
>
  Crafted By DigiCoders
</a>

</div>
      </div>
    </footer>
  )
}