'use client'

import { useLenis } from './lib/useLenis'
import Cursor from './components/ui/Cursor'
import PageIntro from './components/ui/PageIntro'
import ScrollProgress from './components/ui/ScrollProgress'
import Navbar from './components/sections/Navbar'
import Hero from './components/sections/Hero'
import MachinePaths from './components/sections/MachinePaths'
import BrandHistory from './components/sections/BrandHistory'
import ProductSpotlight from './components/sections/ProductSpotlight'
import ProductAdvantage from './components/sections/ProductAdvantage'
import InquiryPath from './components/sections/InquiryPath'
import KnowledgeHub from './components/sections/KnowledgeHub'
import ProductGuidance from './components/sections/ProductGuidance'
import Footer from './components/sections/Footer'

/* Hidden for now — sections after Product Guidance (NOT SURE WHAT YOUR MACHINE NEEDS?)
import Performance from './components/sections/Performance'
import WhyChooseUs from './components/sections/WhyChooseUs'
import EngineVisualization from './components/sections/EngineVisualization'
import Technology from './components/sections/Technology'
import Products from './components/sections/Products'
import OilFlow from './components/sections/OilFlow'
import DedicatedService from './components/sections/DedicatedService'
import MotorsportSlider from './components/sections/MotorsportSlider'
import Racing from './components/sections/Racing'
import FinalCTA from './components/sections/FinalCTA'
*/

export default function App() {
  useLenis()

  return (
    <>
      <PageIntro />
      <ScrollProgress />
      <Cursor />
      <div className="grain" aria-hidden />
      <Navbar />
      <main>
        <Hero />
        <MachinePaths />
        <BrandHistory />
        <ProductSpotlight />
        <ProductAdvantage />
        <InquiryPath />
        <KnowledgeHub />
        <ProductGuidance />
        {/* Hidden for now — restore when ready to show sections below Product Guidance
        <Performance />
        <MotorsportSlider />
        <WhyChooseUs />
        <EngineVisualization />
        <Technology />
        <Products />
        <OilFlow />
        <DedicatedService />
        <Racing />
        <FinalCTA />
        */}
      </main>
      <Footer />
    </>
  )
}
