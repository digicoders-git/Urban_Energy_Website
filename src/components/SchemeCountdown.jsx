import React, { useState, useEffect } from 'react'

export default function SchemeCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 315,
    hours: 17,
    minutes: 34,
    seconds: 56
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2027-03-31T23:59:59').getTime()
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="w-full bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 py-16 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-200 bg-opacity-60 p-2 rounded-full">
              <svg className="w-6 h-6 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5H4v8a2 2 0 002 2h8a2 2 0 002-2V7h-2v1a1 1 0 11-2 0V7H8v1a1 1 0 11-2 0V7z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
            TIME LEFT TO GET BENEFIT OF SCHEME
          </h2>
          <p className="text-lg text-blue-700">
            Scheme closes on <span className="font-semibold text-blue-900">31 March 2027</span>
          </p>
        </div>

        {/* Countdown Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
          {/* Days */}
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 backdrop-blur-md rounded-xl p-4 md:p-8 text-center border border-blue-300 border-opacity-60 hover:border-opacity-100 transition-all hover:shadow-lg hover:shadow-blue-300/50">
            <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2 font-mono">
              {String(timeLeft.days).padStart(3, '0')}
            </div>
            <div className="text-blue-700 text-xs md:text-sm font-semibold uppercase tracking-wider">
              Days
            </div>
          </div>

          {/* Hours */}
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 backdrop-blur-md rounded-xl p-4 md:p-8 text-center border border-blue-300 border-opacity-60 hover:border-opacity-100 transition-all hover:shadow-lg hover:shadow-blue-300/50">
            <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2 font-mono">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="text-blue-700 text-xs md:text-sm font-semibold uppercase tracking-wider">
              Hours
            </div>
          </div>

          {/* Minutes */}
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 backdrop-blur-md rounded-xl p-4 md:p-8 text-center border border-blue-300 border-opacity-60 hover:border-opacity-100 transition-all hover:shadow-lg hover:shadow-blue-300/50">
            <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2 font-mono">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="text-blue-700 text-xs md:text-sm font-semibold uppercase tracking-wider">
              Mins
            </div>
          </div>

          {/* Seconds */}
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 backdrop-blur-md rounded-xl p-4 md:p-8 text-center border border-blue-300 border-opacity-60 hover:border-opacity-100 transition-all hover:shadow-lg hover:shadow-blue-300/50">
            <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2 font-mono">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="text-blue-700 text-xs md:text-sm font-semibold uppercase tracking-wider">
              Secs
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
