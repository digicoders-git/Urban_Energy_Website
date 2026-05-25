import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, User, Phone, Mail, MapPin, IndianRupee, MessageSquare, Send, 
  Award, Gift, ChevronDown, Zap, Lock, LogIn, Sparkles, Check, ArrowLeft
} from 'lucide-react'
import ReferrerDashboard from './ReferrerDashboard'

const API = import.meta.env.VITE_API_URL

export default function Refer() {
  // Check URL query parameters for referral code (?ref=CODE)
  const queryParams = new URLSearchParams(window.location.search)
  const urlRefCode = queryParams.get('ref')

  // Authentication State
  const [referrer, setReferrer] = useState(null)
  const [token, setToken] = useState('')
  const [authMode, setAuthMode] = useState('login') // 'login' or 'register'
  
  // Login Form
  const [loginForm, setLoginForm] = useState({ phone: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  // Register Form
  const [registerForm, setRegisterForm] = useState({ name: '', phone: '', email: '', city: '', password: '' })
  const [registerError, setRegisterError] = useState('')
  const [registerLoading, setRegisterLoading] = useState(false)

  // Referee Form (Lead submitted by a friend clicking link)
  const [refereeForm, setRefereeForm] = useState({
    refereeName: '',
    refereePhone: '',
    refereeEmail: '',
    refereeCity: '',
    refereeBill: '',
    refereeType: 'residential',
    refereeMessage: ''
  })
  const [refereeSubmitted, setRefereeSubmitted] = useState(false)
  const [refereeLoading, setRefereeLoading] = useState(false)
  const [refereeError, setRefereeError] = useState('')

  // Forgot Password State
  const [forgotMode, setForgotMode] = useState(false)
  const [forgotStep, setForgotStep] = useState(1) // 1: Send OTP, 2: Reset Password, 3: Success
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotOtp, setForgotOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [forgotLoading, setForgotLoading] = useState(false)
  const [forgotError, setForgotError] = useState('')
  const [forgotSuccessMessage, setForgotSuccessMessage] = useState('')

  // Check localStorage on load
  useEffect(() => {
    const savedToken = localStorage.getItem('referrerToken')
    const savedReferrer = localStorage.getItem('referrerUser')
    if (savedToken && savedReferrer) {
      setToken(savedToken)
      setReferrer(JSON.parse(savedReferrer))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('referrerToken')
    localStorage.removeItem('referrerUser')
    setToken('')
    setReferrer(null)
  }

  // Handle Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    if (!loginForm.phone || !loginForm.password) {
      return setLoginError('Please fill all fields.')
    }
    setLoginError('')
    setLoginLoading(true)

    try {
      const res = await fetch(`${API}/referrers/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: loginForm.phone.trim(),
          password: loginForm.password
        })
      })

      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('referrerToken', data.token)
        localStorage.setItem('referrerUser', JSON.stringify(data.referrer))
        setToken(data.token)
        setReferrer(data.referrer)
      } else {
        setLoginError(data.message || 'Invalid credentials.')
      }
    } catch {
      setLoginError('Server connection error. Please try again.')
    } finally {
      setLoginLoading(false)
    }
  }

  // Handle Register
  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    if (!registerForm.name || !registerForm.phone || !registerForm.city || !registerForm.password) {
      return setRegisterError('Please fill all required fields.')
    }
    if (registerForm.password.length < 6) {
      return setRegisterError('Password must be at least 6 characters.')
    }
    setRegisterError('')
    setRegisterLoading(true)

    try {
      const res = await fetch(`${API}/referrers/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: registerForm.name.trim(),
          phone: registerForm.phone.trim(),
          email: registerForm.email.trim(),
          city: registerForm.city.trim(),
          password: registerForm.password
        })
      })

      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('referrerToken', data.token)
        localStorage.setItem('referrerUser', JSON.stringify(data.referrer))
        setToken(data.token)
        setReferrer(data.referrer)
      } else {
        setRegisterError(data.message || 'Registration failed.')
      }
    } catch {
      setRegisterError('Server connection error. Please try again.')
    } finally {
      setRegisterLoading(false)
    }
  }

  // Handle Request Password Reset OTP
  const handleSendOtp = async (e) => {
    e.preventDefault()
    if (!forgotEmail) {
      return setForgotError('Please enter your registered email address.')
    }
    setForgotError('')
    setForgotLoading(true)

    try {
      const res = await fetch(`${API}/referrers/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail.trim() })
      })

      const data = await res.json()
      if (res.ok) {
        setForgotSuccessMessage(data.message)
        setForgotStep(2)
      } else {
        setForgotError(data.message || 'Failed to send OTP. Please try again.')
      }
    } catch {
      setForgotError('Server connection error. Please try again.')
    } finally {
      setForgotLoading(false)
    }
  }

  // Handle Verify OTP & Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (!forgotOtp || !newPassword || !confirmPassword) {
      return setForgotError('Please fill all fields.')
    }
    if (forgotOtp.length !== 6) {
      return setForgotError('Please enter a valid 6-digit OTP.')
    }
    if (newPassword.length < 6) {
      return setForgotError('Password must be at least 6 characters long.')
    }
    if (newPassword !== confirmPassword) {
      return setForgotError('Passwords do not match.')
    }
    setForgotError('')
    setForgotLoading(true)

    try {
      const res = await fetch(`${API}/referrers/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: forgotEmail.trim(),
          otp: forgotOtp.trim(),
          newPassword
        })
      })

      const data = await res.json()
      if (res.ok) {
        setForgotSuccessMessage(data.message)
        setForgotStep(3)
      } else {
        setForgotError(data.message || 'Verification or password reset failed.')
      }
    } catch {
      setForgotError('Server connection error. Please try again.')
    } finally {
      setForgotLoading(false)
    }
  }

  // Handle Referee Submission
  const handleRefereeSubmit = async (e) => {
    e.preventDefault()
    if (!refereeForm.refereeName || !refereeForm.refereePhone || !refereeForm.refereeCity) {
      return setRefereeError('Please fill all required fields.')
    }
    setRefereeError('')
    setRefereeLoading(true)

    try {
      const res = await fetch(`${API}/referrals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          referrerCode: urlRefCode,
          refereeName: refereeForm.refereeName.trim(),
          refereePhone: refereeForm.refereePhone.trim(),
          refereeEmail: refereeForm.refereeEmail.trim(),
          refereeCity: refereeForm.refereeCity.trim(),
          refereeBill: refereeForm.refereeBill ? Number(refereeForm.refereeBill) : 0,
          refereeType: refereeForm.refereeType,
          refereeMessage: refereeForm.refereeMessage.trim()
        })
      })

      if (res.ok) {
        setRefereeSubmitted(true)
        setRefereeForm({
          refereeName: '',
          refereePhone: '',
          refereeEmail: '',
          refereeCity: '',
          refereeBill: '',
          refereeType: 'residential',
          refereeMessage: ''
        })
      } else {
        const data = await res.json()
        setRefereeError(data.message || 'Something went wrong.')
      }
    } catch {
      setRefereeError('Connection error. Please try again.')
    } finally {
      setRefereeLoading(false)
    }
  }

  // ── CASE A: REFERRAL CODE DETECTED IN URL (FRIEND LEAD SIGNUP) ──
  if (urlRefCode && !referrer) {
    return (
      <section className="min-h-screen py-20 px-5 bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-orange/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-solarsky/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl w-full grid lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Banner Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6 lg:pr-6"
          >
            <span className="inline-flex items-center gap-2 bg-orange/15 border border-orange/20 text-orange px-4 py-1.5 rounded-full text-xs font-space font-bold uppercase tracking-widest">
              <Gift size={14} className="animate-bounce" /> Recommended for You
            </span>
            <h2 className="font-orbitron text-4xl lg:text-5xl font-black text-navy leading-tight">
              Go Solar with <br/>
              <span style={{ background: 'linear-gradient(90deg,#FF7A00,#FFB800)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Your Friend
              </span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              Your friend has recommended <strong>VAULIX™ SOLAR ENERGY</strong> to you! Fill out the quick request form to schedule a free premium solar design consultation and receive tailored savings estimates.
            </p>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange flex-shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-outfit font-bold text-navy text-sm">Special Referral Reward</h4>
                  <p className="text-slate-400 text-xs mt-0.5">Your inquiry is secured under your friend's unique referral ID <span className="font-mono font-bold text-navy">{urlRefCode}</span>.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl shadow-slate-200/50"
          >
            {refereeSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-5"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <Check size={36} />
                </div>
                <h3 className="font-orbitron text-2xl font-bold text-navy">Thank You!</h3>
                <p className="text-slate-500 max-w-sm mx-auto">
                  Your solar inquiry has been received. Our tech design team will contact you within 24 hours to present a customized solar feasibility report.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleRefereeSubmit} className="space-y-6">
                
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <div className="w-2 h-5 bg-orange rounded-full" />
                  <h3 className="font-orbitron text-base font-bold text-navy uppercase tracking-wider">Your Details</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      required
                      type="text"
                      placeholder="Your Full Name *"
                      value={refereeForm.refereeName}
                      onChange={(e) => setRefereeForm({ ...refereeForm, refereeName: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange text-navy font-outfit"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      required
                      type="tel"
                      placeholder="Your Phone Number *"
                      value={refereeForm.refereePhone}
                      onChange={(e) => setRefereeForm({ ...refereeForm, refereePhone: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange text-navy font-outfit"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="email"
                      placeholder="Your Email Address"
                      value={refereeForm.refereeEmail}
                      onChange={(e) => setRefereeForm({ ...refereeForm, refereeEmail: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange text-navy font-outfit"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      required
                      type="text"
                      placeholder="Your City *"
                      value={refereeForm.refereeCity}
                      onChange={(e) => setRefereeForm({ ...refereeForm, refereeCity: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange text-navy font-outfit"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="number"
                      placeholder="Monthly Electricity Bill (₹)"
                      value={refereeForm.refereeBill}
                      onChange={(e) => setRefereeForm({ ...refereeForm, refereeBill: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange text-navy font-outfit"
                    />
                  </div>
                  <div className="relative">
                    <Zap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <select
                      value={refereeForm.refereeType}
                      onChange={(e) => setRefereeForm({ ...refereeForm, refereeType: e.target.value })}
                      className="w-full pl-11 pr-10 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange bg-white text-navy font-outfit cursor-pointer appearance-none"
                    >
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="society">Society</option>
                      <option value="off grid">Off Grid</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                  </div>
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 text-slate-400" size={16} />
                  <textarea
                    placeholder="Specific requests, roof area details, or query details (Optional)"
                    rows={3}
                    value={refereeForm.refereeMessage}
                    onChange={(e) => setRefereeForm({ ...refereeForm, refereeMessage: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange text-navy font-outfit resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={refereeLoading}
                  className="w-full py-4 rounded-xl font-outfit flex items-center justify-center gap-2 font-bold text-lg text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange/30 disabled:opacity-60 border-none cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #FF7A00, #ff9500)' }}
                >
                  {refereeLoading ? 'Submitting...' : <> Submit Solar Request <Send size={16} /> </>}
                </button>

                {refereeError && (
                  <div className="text-center py-3 px-4 rounded-xl text-red-700 font-semibold text-sm border border-red-200 bg-red-50/50">
                    ⚠ {refereeError}
                  </div>
                )}
              </form>
            )}
          </motion.div>

        </div>
      </section>
    )
  }

  // ── CASE B: LOGGED IN REFERRER (SHOW DASHBOARD) ──
  if (referrer && token) {
    return (
      <section className="min-h-screen pt-20 pb-12 bg-slate-50">
        <ReferrerDashboard 
          referrer={referrer} 
          token={token} 
          onLogout={handleLogout} 
          API={API} 
        />
      </section>
    )
  }

  // ── CASE C: LOGIN / REGISTRATION PORTAL (TABBED INTERFACE) ──
  return (
    <section className="min-h-screen py-20 px-5 bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-solarsky/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl w-full grid lg:grid-cols-12 gap-10 items-center relative z-10">
        
        {/* Banner Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-6 lg:pr-6"
        >
          <span className="inline-flex items-center gap-2 bg-orange/15 border border-orange/20 text-orange px-4 py-1.5 rounded-full text-xs font-space font-bold uppercase tracking-widest">
            <Gift size={14} className="animate-bounce" /> Referral Program
          </span>
          <h2 className="font-orbitron text-4xl lg:text-5xl font-black text-navy leading-tight">
            Refer & Earn <br/>
            <span style={{ background: 'linear-gradient(90deg,#FF7A00,#FFB800)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Commissions
            </span>
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            Welcome to the <strong>VAULIX™ Solar Energy Referral Network</strong>. Register as a partner, share clean solar energy, and unlock direct commission rewards of up to ₹5,000 per successful installation!
          </p>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange flex-shrink-0">
                <Sparkles size={20} />
              </div>
              <div>
                <h4 className="font-outfit font-bold text-navy text-sm">Real-time Dashboard</h4>
                <p className="text-slate-400 text-xs mt-0.5">Track your referrals, lead progression, and rewards live.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange flex-shrink-0">
                <Users size={20} />
              </div>
              <div>
                <h4 className="font-outfit font-bold text-navy text-sm">Dedicated Team Support</h4>
                <p className="text-slate-400 text-xs mt-0.5">Our support cell coordinates everything within 24 hours.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Auth Forms Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl shadow-slate-200/50"
        >
          {forgotMode ? (
            <AnimatePresence mode="wait">
              {forgotStep === 1 && (
                <motion.form
                  key="forgot-step-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={handleSendOtp}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <button
                      type="button"
                      onClick={() => setForgotMode(false)}
                      className="text-slate-400 hover:text-navy transition-colors bg-transparent border-none cursor-pointer p-1"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <h3 className="font-orbitron text-base font-bold text-navy uppercase tracking-wider">
                      Forgot Password
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 font-outfit leading-relaxed">
                    Please enter your registered email address. We will send you a secure 6-digit One-Time Password (OTP) to reset your password.
                  </p>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      required
                      type="email"
                      placeholder="Registered Email Address *"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange text-navy font-outfit"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full py-4 rounded-xl font-outfit flex items-center justify-center gap-2 font-bold text-lg text-white hover:shadow-xl shadow-orange/30 disabled:opacity-60 border-none cursor-pointer animate-pulse"
                    style={{ background: 'linear-gradient(135deg, #FF7A00, #ff9500)' }}
                  >
                    {forgotLoading ? 'Sending OTP...' : <> Send Reset OTP <Send size={16} /> </>}
                  </button>

                  {forgotError && (
                    <div className="text-center py-2.5 px-4 rounded-xl text-red-700 font-semibold text-xs border border-red-200 bg-red-50/50">
                      ⚠ {forgotError}
                    </div>
                  )}

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setForgotMode(false)}
                      className="text-xs text-slate-400 hover:text-navy font-outfit border-none bg-transparent cursor-pointer transition-colors hover:underline"
                    >
                      Back to Login
                    </button>
                  </div>
                </motion.form>
              )}

              {forgotStep === 2 && (
                <motion.form
                  key="forgot-step-2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onSubmit={handleResetPassword}
                  className="space-y-5"
                >
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <button
                      type="button"
                      onClick={() => setForgotStep(1)}
                      className="text-slate-400 hover:text-navy transition-colors bg-transparent border-none cursor-pointer p-1"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <h3 className="font-orbitron text-base font-bold text-navy uppercase tracking-wider">
                      Verify & Reset
                    </h3>
                  </div>

                  {forgotSuccessMessage && (
                    <div className="text-center py-2 px-3 rounded-lg text-green-700 font-semibold text-xs border border-green-200 bg-green-50/50 animate-bounce">
                      ✓ {forgotSuccessMessage}
                    </div>
                  )}

                  <p className="text-xs text-slate-500 font-outfit leading-relaxed">
                    An OTP was sent to <strong>{forgotEmail}</strong>. Enter it below along with your new password.
                  </p>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      required
                      type="text"
                      maxLength={6}
                      placeholder="6-Digit OTP *"
                      value={forgotOtp}
                      onChange={(e) => setForgotOtp(e.target.value.replace(/\D/g, ''))}
                      className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange text-navy font-outfit tracking-[8px] font-black text-center"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      required
                      type="password"
                      placeholder="New Secure Password *"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange text-navy font-outfit"
                    />
                    <div className="text-[10px] text-slate-400 mt-1 pl-2">Minimum 6 characters.</div>
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      required
                      type="password"
                      placeholder="Confirm New Password *"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange text-navy font-outfit"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full py-4 rounded-xl font-outfit flex items-center justify-center gap-2 font-bold text-lg text-white hover:shadow-xl shadow-orange/30 disabled:opacity-60 border-none cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #FF7A00, #ff9500)' }}
                  >
                    {forgotLoading ? 'Resetting Password...' : <> Reset Password <Check size={16} /> </>}
                  </button>

                  {forgotError && (
                    <div className="text-center py-2.5 px-4 rounded-xl text-red-700 font-semibold text-xs border border-red-200 bg-red-50/50">
                      ⚠ {forgotError}
                    </div>
                  )}

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setForgotStep(1)}
                      className="text-xs text-slate-400 hover:text-navy font-outfit border-none bg-transparent cursor-pointer transition-colors hover:underline"
                    >
                      Resend OTP / Back
                    </button>
                  </div>
                </motion.form>
              )}

              {forgotStep === 3 && (
                <motion.div
                  key="forgot-step-3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-10 space-y-6"
                >
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-md shadow-green-100/50">
                    <Check size={32} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-orbitron text-xl font-bold text-navy">Success!</h3>
                    <p className="text-slate-500 font-outfit text-sm max-w-xs mx-auto">
                      Your password has been successfully reset. You can now use your new password to sign in.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotMode(false)
                      setForgotStep(1)
                      setAuthMode('login')
                      setForgotEmail('')
                      setForgotOtp('')
                      setNewPassword('')
                      setConfirmPassword('')
                      setForgotSuccessMessage('')
                    }}
                    className="px-8 py-3 rounded-xl font-outfit font-bold text-sm text-white hover:shadow-xl shadow-orange/30 border-none cursor-pointer transition-transform hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(135deg, #FF7A00, #ff9500)' }}
                  >
                    Back to Login
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex border-b border-slate-100 mb-8 p-1 bg-slate-50 rounded-2xl">
                <button
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 py-3 text-center rounded-xl font-outfit font-bold text-sm transition-all border-none cursor-pointer ${authMode === 'login' ? 'bg-white text-navy shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Partner Login
                </button>
                <button
                  onClick={() => setAuthMode('register')}
                  className={`flex-1 py-3 text-center rounded-xl font-outfit font-bold text-sm transition-all border-none cursor-pointer ${authMode === 'register' ? 'bg-white text-navy shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Register as Referrer
                </button>
              </div>

              {/* Form Content */}
              <AnimatePresence mode="wait">
                {authMode === 'login' ? (
                  <motion.form
                    key="login"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    onSubmit={handleLoginSubmit}
                    className="space-y-6"
                  >
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        required
                        type="text"
                        placeholder="Registered Mobile or Email *"
                        value={loginForm.phone}
                        onChange={(e) => setLoginForm({ ...loginForm, phone: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange text-navy font-outfit"
                      />
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        required
                        type="password"
                        placeholder="Password *"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange text-navy font-outfit"
                      />
                    </div>

                    <div className="flex justify-end -mt-3">
                      <button
                        type="button"
                        onClick={() => {
                          setForgotMode(true)
                          setForgotStep(1)
                          setForgotError('')
                          setForgotSuccessMessage('')
                        }}
                        className="text-xs text-orange hover:text-orange-600 font-bold font-outfit border-none bg-transparent cursor-pointer transition-colors hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={loginLoading}
                      className="w-full py-4 rounded-xl font-outfit flex items-center justify-center gap-2 font-bold text-lg text-white hover:shadow-xl shadow-orange/30 disabled:opacity-60 border-none cursor-pointer"
                      style={{ background: 'linear-gradient(135deg, #FF7A00, #ff9500)' }}
                    >
                      {loginLoading ? 'Signing In...' : <> Sign In <LogIn size={16} /> </>}
                    </button>

                    {loginError && (
                      <div className="text-center py-2.5 px-4 rounded-xl text-red-700 font-semibold text-xs border border-red-200 bg-red-50/50">
                        ⚠ {loginError}
                      </div>
                    )}
                  </motion.form>
                ) : (
                  <motion.form
                    key="register"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    onSubmit={handleRegisterSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                          required
                          type="text"
                          placeholder="Your Full Name *"
                          value={registerForm.name}
                          onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange text-navy font-outfit"
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                          required
                          type="tel"
                          placeholder="Mobile Number *"
                          value={registerForm.phone}
                          onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange text-navy font-outfit"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                          type="email"
                          placeholder="Email Address (Optional)"
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange text-navy font-outfit"
                        />
                      </div>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                          required
                          type="text"
                          placeholder="City *"
                          value={registerForm.city}
                          onChange={(e) => setRegisterForm({ ...registerForm, city: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange text-navy font-outfit"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        required
                        type="password"
                        placeholder="Create Secure Password *"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange text-navy font-outfit"
                      />
                      <div className="text-[10px] text-slate-400 mt-1 pl-2">Minimum 6 characters. Use alphanumeric password.</div>
                    </div>

                    <button
                      type="submit"
                      disabled={registerLoading}
                      className="w-full py-4 rounded-xl font-outfit flex items-center justify-center gap-2 font-bold text-lg text-white hover:shadow-xl shadow-orange/30 disabled:opacity-60 border-none cursor-pointer"
                      style={{ background: 'linear-gradient(135deg, #FF7A00, #ff9500)' }}
                    >
                      {registerLoading ? 'Creating Account...' : <> Create Account <Check size={16} /> </>}
                    </button>

                    {registerError && (
                      <div className="text-center py-2.5 px-4 rounded-xl text-red-700 font-semibold text-xs border border-red-200 bg-red-50/50">
                        ⚠ {registerError}
                      </div>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </>
          )}
        </motion.div>

      </div>
    </section>
  )
}
