import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

import Home from './pages/Home'
import CalculatorPage from './pages/CalculatorPage'
import ServicesPage from './pages/ServicesPage'
import ProjectsPage from './pages/ProjectsPage'
import FAQPage from './pages/FAQPage'
import ContactPage from './pages/ContactPage'
import NotFound from './pages/NotFound'
import About from './pages/AboutPage'
import AdminPanel from './pages/AdminPanel'

// 👉 Layout component
function Layout({ children }) {
  const location = useLocation()

  const hideLayout = location.pathname.startsWith('/AdminPanel')

  return (
    <>
      {!hideLayout && <Navbar />}
      
      {children}

      {!hideLayout && <Footer />}
      {!hideLayout && <WhatsAppButton />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* 👇 Admin without navbar/footer */}
          <Route path="/adminpanel" element={<AdminPanel />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}