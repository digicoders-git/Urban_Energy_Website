import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-5 pt-16 bg-navy">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="text-orange font-outfit font-black text-9xl mb-4">404</div>
        <h1 className="text-white font-outfit font-bold text-3xl mb-4">Page Not Found</h1>
        <p className="text-white/60 text-lg mb-8">
          Yeh page exist nahi karta. Wapas home par chalte hain.
        </p>
        <Link
          to="/"
          className="inline-block bg-orange hover:bg-orange/90 text-white font-outfit font-bold px-8 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 no-underline"
        >
          Home Par Jao
        </Link>
      </motion.div>
    </main>
  )
}
