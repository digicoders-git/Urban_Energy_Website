import React from 'react'
import Hero from '../components/Hero'
import SolarCalculator from '../components/SolarCalculator'
import Services from '../components/Services'
import WhyUs from '../components/WhyUs'
import Process from '../components/Process'
import Dashboard from '../components/Dashboard'
import Projects from '../components/Projects'
import SubsidyCalc from '../components/SubsidyCalc'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <SolarCalculator />
      <Services />
      <WhyUs />
      <Process />
      <Dashboard />
      <Projects />
      <SubsidyCalc />
      <Testimonials />
      <FAQ />
      <Contact />
    </main>
  )
}
