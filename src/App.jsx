import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ScrolltoTop from './components/ScrollTop'
import QuoteModal from './components/QuoteModal'
import { ModalProvider } from './context/ModalContext'

import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import HomesPage from './pages/HomesPage'
import CommercialPage from './pages/CommercialPage'
import HousingSocietiesPage from './pages/HousingSocietiesPage'
import OffGridSolarPage from './pages/OffGridSolarPage'
import OnGridSolarPage from './pages/OnGridSolarPage'
import BlogPage from './pages/BlogPage'
import ReferPage from './pages/ReferPage'
import CalculatorPage from './pages/CalculatorPage'
import PartnerPage from './pages/PartnerPage'
import CareersPage from './pages/CareersPage'
import ProjectsPage from './pages/ProjectsPage'
import FAQPage from './pages/FAQPage'
import ReviewPage from './pages/ReviewPage'
import NotFound from './pages/NotFound'
import AfterInstallationServicePage from './pages/AfterInstallationServicePage'

export default function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <ScrolltoTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/offering/homes" element={<HomesPage />} />
          <Route path="/offering/commercial" element={<CommercialPage />} />
          <Route path="/offering/housing-societies" element={<HousingSocietiesPage />} />
          <Route path="/solar/off-grid" element={<OffGridSolarPage />} />
          <Route path="/solar/on-grid" element={<OnGridSolarPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/refer-now" element={<ReferPage />} />
          <Route path="/contact" element={<ReferPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/become-a-partner" element={<PartnerPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/services/after-installation" element={<AfterInstallationServicePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        {/* <WhatsAppButton /> */}
        <QuoteModal />
      </BrowserRouter>
    </ModalProvider>
  )
}
