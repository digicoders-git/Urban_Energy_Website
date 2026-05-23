import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, User, Phone, Mail, MapPin, IndianRupee, MessageSquare, Send, 
  Award, Gift, ChevronDown, Zap, Lock, LogIn, Sparkles, Check
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
                    type="tel"
                    placeholder="Registered Mobile Number *"
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
        </motion.div>

      </div>
    </section>
  )
}
