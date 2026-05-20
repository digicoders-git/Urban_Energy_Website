import React from 'react'
import Hero from '../components/Hero'
import SchemeCountdown from '../components/SchemeCountdown'
import SolarFactsTicker from '../components/SolarFactsTicker'
import SolarCalculator from '../components/SolarCalculator'
import Services from '../components/Services'
import WhyUs from '../components/WhyUs'
import Process from '../components/Process'
import ServicePlans from '../components/ServicePlans'
import SubsidyCalc from '../components/SubsidyCalc'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <SchemeCountdown />
      <SolarFactsTicker />
      <SolarCalculator />
      <Services />
      <WhyUs />
      <ServicePlans />
      <Process />

      <SubsidyCalc />
      <Testimonials />
      <FAQ />
      <Contact />
    </main>
  )
}
