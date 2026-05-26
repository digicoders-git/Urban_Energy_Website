import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, User, Phone, Mail, MapPin, IndianRupee, MessageSquare, Send, 
  Award, Gift, ChevronDown, Zap, Copy, Check, LogOut, Plus, Search, Filter, Calendar,
  Wallet, QrCode
} from 'lucide-react'

export default function ReferrerDashboard({ referrer, token, onLogout, API }) {
  const [referrals, setReferrals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)
  
  // Submit Referral Form State
  const [showReferModal, setShowReferModal] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [form, setForm] = useState({
    refereeName: '',
    refereePhone: '',
    refereeEmail: '',
    refereeCity: '',
    refereeBill: '',
    refereeType: 'residential',
    refereeMessage: ''
  })

  // Table Search and Filter States
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const fetchReferrals = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API}/referrers/my-referrals`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setReferrals(data)
      } else {
        setError('Failed to fetch referrals.')
      }
    } catch {
      setError('Connection error. Could not sync dashboard.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReferrals()
  }, [])

  const handleCopyLink = () => {
    const link = `${window.location.origin}/refer-now?ref=${referrer.referralCode}`
    navigator.clipboard.writeText(link)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referrer.referralCode)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const handleFormChange = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (!form.refereeName || !form.refereePhone || !form.refereeCity) {
      return setSubmitError('Please fill all required fields.')
    }
    setSubmitError('')
    setSubmitLoading(true)

    try {
      const res = await fetch(`${API}/referrals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          referrerId: referrer.id,
          referrerName: referrer.name,
          referrerPhone: referrer.phone,
          refereeName: form.refereeName.trim(),
          refereePhone: form.refereePhone.trim(),
          refereeEmail: form.refereeEmail.trim(),
          refereeCity: form.refereeCity.trim(),
          refereeBill: form.refereeBill ? Number(form.refereeBill) : 0,
          refereeType: form.refereeType,
          refereeMessage: form.refereeMessage.trim()
        })
      })

      if (res.ok) {
        setSubmitSuccess(true)
        setForm({
          refereeName: '',
          refereePhone: '',
          refereeEmail: '',
          refereeCity: '',
          refereeBill: '',
          refereeType: 'residential',
          refereeMessage: ''
        })
        fetchReferrals()
        setTimeout(() => {
          setSubmitSuccess(false)
          setShowReferModal(false)
        }, 3000)
      } else {
        const data = await res.json()
        setSubmitError(data.message || 'Something went wrong.')
      }
    } catch {
      setSubmitError('Connection error. Please try again.')
    } finally {
      setSubmitLoading(false)
    }
  }

  // Calculate quick metrics based on list
  const totalCount = referrals.length
  const pendingCount = referrals.filter(r => r.status === 'New' || r.status === 'Contacted').length
  const convertedCount = referrals.filter(r => r.status === 'Converted' || r.status === 'Paid').length
  const totalEarnings = referrals.filter(r => r.status === 'Paid').reduce((sum, r) => sum + (r.commission || 0), 0)

  // Filter & search referrals list
  const filteredReferrals = referrals.filter(r => {
    const query = search.toLowerCase()
    const matchesSearch = 
      r.refereeName.toLowerCase().includes(query) ||
      r.refereeCity.toLowerCase().includes(query) ||
      r.refereePhone.includes(query)
    
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusStyle = (status) => {
    switch (status) {
      case 'New':
        return { bg: 'bg-orange/10', text: 'text-orange', border: 'border-orange/20' }
      case 'Contacted':
        return { bg: 'bg-solarsky/10', text: 'text-solarsky', border: 'border-solarsky/20' }
      case 'Converted':
        return { bg: 'bg-yellow-500/10', text: 'text-yellow-600', border: 'border-yellow-500/20' }
      case 'Paid':
        return { bg: 'bg-green-500/10', text: 'text-green-600', border: 'border-green-500/20' }
      default:
        return { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200' }
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-6 border-b border-slate-100">
        <div>
          <span className="text-orange text-xs font-space font-extrabold uppercase tracking-widest bg-orange/15 px-3 py-1 rounded-full">
            Referrer Dashboard
          </span>
          <h1 className="font-orbitron text-3xl font-black text-navy mt-2">
            Welcome back, <span className="text-orange">{referrer.name}</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
            <MapPin size={14} className="text-slate-400" /> {referrer.city} &bull; Referrer ID: <span className="font-mono font-bold text-navy">{referrer.referralCode}</span>
          </p>
        </div>
        
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 font-outfit font-bold text-sm transition-all shadow-sm hover:shadow-red-50 cursor-pointer"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 mb-10">
        
        {/* ── QUICK METRICS GRID (Left 8 cols) ── */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm shadow-slate-100/50">
              <span className="text-xs font-bold text-slate-400 uppercase font-space">Total Referrals</span>
              <div className="font-orbitron text-2xl font-black text-navy mt-1">{totalCount}</div>
            </div>

             

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm shadow-slate-100/50">
              <span className="text-xs font-bold text-slate-400 uppercase font-space">Completed Referrals</span>
              <div className="font-orbitron text-2xl font-black text-yellow-500 mt-1">{convertedCount}</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-orange/10 shadow-sm shadow-orange/5 bg-gradient-to-br from-white to-orange/5">
              <span className="text-xs font-bold text-orange uppercase font-space">Total Earnings</span>
              <div className="font-orbitron text-2xl font-black text-green-600 mt-1 flex items-center">
                <IndianRupee size={20} className="stroke-[2.5]" />
                {totalEarnings.toLocaleString('en-IN')}
              </div>
            </div>

          </div>

          {/* ── SHARE CARD ── */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-2 text-center md:text-left">
              <h3 className="font-outfit font-black text-xl text-navy">Invite Friends & Earn Rewards</h3>
              <p className="text-slate-400 text-sm max-w-md">
                Share your unique code or referral link. For every successful conversion, get handsome payouts directly to your linked account details.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-2 px-5 py-3.5 bg-orange hover:bg-orange-dark text-white rounded-xl font-outfit font-bold text-sm shadow-lg shadow-orange/20 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                {copiedLink ? <Check size={16} /> : <Copy size={16} />}
                {copiedLink ? 'Link Copied!' : 'Copy Referral Link'}
              </button>
              <button
                onClick={handleCopyCode}
                className="flex items-center justify-center gap-2 px-5 py-3.5 border border-slate-200 text-navy hover:bg-slate-50 rounded-xl font-mono font-bold text-sm transition-all cursor-pointer"
              >
                {copiedCode ? <Check size={16} /> : <Copy size={16} />}
                Code: {referrer.referralCode}
              </button>
            </div>
          </div>

        </div>

        {/* ── ACTION COLUMN (Right 4 cols) ── */}
        <div className="lg:col-span-4 flex flex-col justify-stretch gap-6">
          <button
            onClick={() => setShowReferModal(true)}
            className="flex-1 w-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-navy to-slate-900 text-white rounded-2xl p-8 hover:shadow-xl shadow-navy/20 border-none cursor-pointer group transition-all relative overflow-hidden"
            style={{ minHeight: '160px' }}
          >
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange/10 rounded-full blur-3xl pointer-events-none group-hover:bg-orange/20 transition-all duration-300" />
            <div className="w-14 h-14 bg-white/10 text-orange rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus size={32} />
            </div>
            <div className="text-center">
              <h3 className="font-orbitron font-extrabold text-xl">Refer Someone Now</h3>
              <p className="text-white/60 text-xs mt-1">Submit friend's installation details directly</p>
            </div>
          </button>

          {/* ── PAYOUT CREDENTIALS CARD ── */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-600 flex items-center justify-center">
                <Wallet size={16} />
              </div>
              <div>
                <h3 className="font-outfit font-black text-sm text-navy uppercase tracking-wider">Payout Credentials</h3>
                <p className="text-[10px] text-slate-400">Where you receive your rewards</p>
              </div>
            </div>

            <div className="space-y-4">
              {referrer.upiId ? (
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-space">Linked UPI ID</div>
                  <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-xs font-mono font-bold text-navy truncate pr-2">{referrer.upiId}</span>
                    <span className="bg-green-500/15 border border-green-500/20 text-green-600 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">Active</span>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-400 italic">No UPI ID linked.</div>
              )}

              {referrer.hasQrCode ? (
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-space">Linked QR Code</div>
                  <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img 
                        src={`${API}/referrers/qrcode/${referrer.id || referrer._id}`} 
                        alt="QR Code" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-navy">QR Code Active</div>
                      <div className="text-[9px] text-slate-400">Available for scan</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-400 italic font-outfit">No QR Code uploaded.</div>
              )}

              {!referrer.upiId && !referrer.hasQrCode && (
                <div className="text-xs text-slate-500 bg-orange/5 border border-orange/10 p-3 rounded-xl">
                  ⚠️ No payout details linked. Please contact support to set up your UPI/QR to receive commissions!
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* ── REFERRALS HISTORY TABLE ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        
        {/* Table Controls */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-slate-50/50">
          <h2 className="font-orbitron font-bold text-lg text-navy uppercase tracking-wider">
            Referrals History
          </h2>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search friend or city..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange bg-white text-navy font-outfit"
              />
            </div>
            
            {/* Filter Dropdown */}
            <div className="relative flex items-center">
              <Filter className="absolute left-3 text-slate-400 pointer-events-none" size={14} />
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="pl-9 pr-8 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange bg-white text-navy font-outfit appearance-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Converted">Converted</option>
                <option value="Paid">Paid</option>
              </select>
              <ChevronDown className="absolute right-3 text-slate-400 pointer-events-none" size={14} />
            </div>
          </div>
        </div>

        {/* Table Body */}
        {loading ? (
          <div className="py-20 text-center text-slate-400 font-outfit">Loading your referrals...</div>
        ) : filteredReferrals.length === 0 ? (
          <div className="py-20 text-center text-slate-400 font-outfit space-y-2">
            <Gift className="mx-auto text-slate-300" size={32} />
            <p>No referrals found matching filter parameters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold uppercase text-slate-400 bg-slate-50/20">
                  <th className="py-4 px-6">Referee Name</th>
                  <th className="py-4 px-6">Location</th>
                  <th className="py-4 px-6">Type</th>
                  <th className="py-4 px-6">Date Submitted</th>
                  <th className="py-4 px-6">Commission</th>
                  <th className="py-4 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredReferrals.map(r => {
                  const statusInfo = getStatusStyle(r.status)
                  return (
                    <tr key={r._id} className="hover:bg-slate-50/50 transition-colors font-outfit text-navy">
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-bold">{r.refereeName}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{r.refereePhone}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-medium">{r.refereeCity}</td>
                      <td className="py-4 px-6">
                        <span className="capitalize px-2.5 py-1 bg-slate-100 rounded-md text-xs font-bold text-slate-600 border border-slate-200/50">
                          {r.refereeType}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-400">
                        <span className="flex items-center gap-1.5 text-xs">
                          <Calendar size={13} /> {new Date(r.createdAt).toLocaleDateString('en-IN')}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-bold text-green-600 flex items-center">
                          <IndianRupee size={12} className="stroke-[2.5]" />
                          {(r.commission || 0).toLocaleString('en-IN')}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* ── REFER MODAL ── */}
      <AnimatePresence>
        {showReferModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReferModal(false)}
              className="fixed inset-0 z-40 bg-navy/50 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ type: 'spring', damping: 20, stiffness: 350 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden pointer-events-auto relative">
                {/* Decorative gradient background */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-orange/8 rounded-full blur-3xl pointer-events-none" />
                
                {/* Header */}
                <div className="relative px-8 py-7 border-b border-slate-100 bg-gradient-to-r from-orange/8 via-transparent to-transparent">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="w-12 h-12 bg-gradient-to-br from-orange/20 to-orange/10 rounded-xl flex items-center justify-center shadow-sm"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Gift size={24} className="text-orange" />
                      </motion.div>
                      <div>
                        <h3 className="font-orbitron font-bold text-lg text-navy">Refer a Friend</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Share the opportunity</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowReferModal(false)}
                      className="text-slate-300 hover:text-slate-600 text-3xl leading-none border-none bg-none cursor-pointer transition-colors hover:bg-slate-100 w-10 h-10 flex items-center justify-center rounded-lg"
                    >
                      ×
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="p-8 max-h-[calc(90vh-140px)] overflow-y-auto">
                  {submitSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center justify-center text-center py-12 space-y-6"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                        className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-50 text-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-200/50"
                      >
                        <Check size={40} className="stroke-[2.5]" />
                      </motion.div>
                      <div>
                        <h4 className="font-orbitron text-xl font-bold text-navy">Success!</h4>
                        <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                          Your friend's details have been recorded. Our team will contact them within 24 hours.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-5">
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange transition-colors" size={18} />
                        <input
                          required
                          type="text"
                          placeholder="Friend's Name *"
                          value={form.refereeName}
                          onChange={(e) => handleFormChange('refereeName', e.target.value)}
                          className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 text-navy font-outfit transition-all hover:border-slate-300"
                        />
                      </div>

                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange transition-colors" size={18} />
                        <input
                          required
                          type="tel"
                          placeholder="Phone Number *"
                          value={form.refereePhone}
                          onChange={(e) => handleFormChange('refereePhone', e.target.value)}
                          className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 text-navy font-outfit transition-all hover:border-slate-300"
                        />
                      </div>

                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange transition-colors" size={18} />
                        <input
                          type="email"
                          placeholder="Email (Optional)"
                          value={form.refereeEmail}
                          onChange={(e) => handleFormChange('refereeEmail', e.target.value)}
                          className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 text-navy font-outfit transition-all hover:border-slate-300"
                        />
                      </div>

                      <div className="relative group">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange transition-colors" size={18} />
                        <input
                          required
                          type="text"
                          placeholder="City *"
                          value={form.refereeCity}
                          onChange={(e) => handleFormChange('refereeCity', e.target.value)}
                          className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 text-navy font-outfit transition-all hover:border-slate-300"
                        />
                      </div>

                      <div className="relative group">
                        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange transition-colors" size={18} />
                        <input
                          type="number"
                          placeholder="Monthly Bill (₹)"
                          value={form.refereeBill}
                          onChange={(e) => handleFormChange('refereeBill', e.target.value)}
                          className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 text-navy font-outfit transition-all hover:border-slate-300"
                        />
                      </div>

                      <div className="relative group">
                        <Zap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange transition-colors" size={18} />
                        <select
                          value={form.refereeType}
                          onChange={(e) => handleFormChange('refereeType', e.target.value)}
                          className="w-full pl-12 pr-10 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 bg-white text-navy font-outfit cursor-pointer appearance-none transition-all hover:border-slate-300"
                        >
                          <option value="residential">Residential</option>
                          <option value="commercial">Commercial</option>
                          <option value="society">Society</option>
                          <option value="off grid">Off Grid</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                      </div>

                      <div className="relative group">
                        <MessageSquare className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-orange transition-colors" size={18} />
                        <textarea
                          placeholder="Notes (Optional)"
                          rows={2}
                          value={form.refereeMessage}
                          onChange={(e) => handleFormChange('refereeMessage', e.target.value)}
                          className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 text-navy font-outfit resize-none transition-all hover:border-slate-300"
                        />
                      </div>

                      {submitError && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-xl text-red-700 text-xs font-semibold border border-red-200 bg-red-50/70 flex items-start gap-2"
                        >
                          <span className="text-base mt-0.5">⚠</span>
                          <span>{submitError}</span>
                        </motion.div>
                      )}

                      <button
                        type="submit"
                        disabled={submitLoading}
                        className="w-full py-3.5 rounded-xl font-outfit flex items-center justify-center gap-2 font-bold text-sm text-white bg-gradient-to-r from-orange to-orange-dark hover:shadow-xl shadow-orange/30 disabled:opacity-60 transition-all border-none cursor-pointer mt-6 hover:-translate-y-0.5 active:translate-y-0"
                      >
                        {submitLoading ? 'Submitting...' : <> <Send size={16} /> Submit Referral </>}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  )
}
