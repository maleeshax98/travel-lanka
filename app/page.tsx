import SriLankaMap from '@/components/SriLankaMap'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import React from 'react'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#FDFDFD] flex flex-col font-sans">
      <Navigation />
      
      <main className="w-full max-w-7xl mx-auto min-h-screen grid grid-cols-1 lg:grid-cols-2 px-6">
        {/* Left Side: Hero Section */}
        <div className="order-2 md:order-1 flex justify-center lg:justify-end items-center lg:-mr-12 mt-[-230] md:mt-0">
          <HeroSection />
        </div>

        {/* Right Side: 3D Map */}
        <div className="order-1 md:order-2 flex justify-center lg:justify-start flex-col items-center relative w-full h-full lg:-ml-12">
          <SriLankaMap />
        </div>
      </main>

      {/* Add extra space at the bottom just to test scrolling */}
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <h2 className="text-4xl text-gray-400 font-medium">Scroll down for more content...</h2>
      </div>
    </div>
  )
}