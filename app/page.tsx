import SriLankaMap from '@/components/SriLankaMap'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import DestinationList from '@/components/Home/TrendingDestinations/DestinationList'
import AboutSriLanka from '@/components/Home/AboutSriLanka/AboutSriLanka'
import Activities from '@/components/Home/Activities/Activities'
import VlogSection from '@/components/Home/VlogSection'
import Footer from '@/components/Footer'
import React from 'react'
import TrendingDestinations from '@/components/Home/TrendingDestinations/TrendingDestinations'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#FDFDFD] flex flex-col font-sans">
      <Navigation />
      
      <main className="w-full max-w-7xl mx-auto min-h-screen grid grid-cols-1 lg:grid-cols-2 px-6">
        {/* Left Side: Hero Section */}
        <div className="order-1 md:order-1 flex justify-center lg:justify-end items-center lg:-mr-12 ">
          <HeroSection />
        </div>

        {/* Right Side: 3D Map */}
        <div className="order-2 md:order-2 flex justify-center lg:justify-start flex-col items-center relative w-full h-full lg:-ml-12">
          <SriLankaMap />
        </div>
      </main>

      {/* <DestinationList />
       */}
      <TrendingDestinations />
      
      {/* 3rd Section: About Sri Lanka */}
      <AboutSriLanka />

      {/* 4th Section: Activities */}
      <Activities />

      {/* 5th Section: Vlog Section */}
      <VlogSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}