import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp } from "react-icons/fa";
export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href="https://wa.me/919452516904"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 300 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="fixed bottom-7 right-7 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl no-underline hidden md:flex"
      style={{
        background: '#25D366',
        boxShadow: '0 8px 24px rgba(37,211,102,0.4)',
      }}
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={40} color="white" />
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-16 bg-white text-navy text-xs font-outfit font-bold px-3 py-1.5 rounded-lg whitespace-nowrap"
            style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}
          >
            Chat with us
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  )
}
