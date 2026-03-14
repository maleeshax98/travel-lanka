"use client";

import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] as const
    } 
  }
};

export default function HeroSection() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl px-12 pt-16 flex flex-col justify-center h-screen z-10 relative"
    >
      {/* Title */}
      <motion.h1 
        variants={itemVariants}
        className="text-6xl md:text-7xl lg:text-8xl font-black text-black leading-none mb-4 lg:mb-6 tracking-tighter"
      >
        Sri Lanka
      </motion.h1>

      {/* Description */}
      <motion.p 
        variants={itemVariants}
        className="text-gray-600 text-xs md:text-sm leading-relaxed mb-6 lg:mb-8 max-w-lg"
      >
        Sri Lanka, officially the Democratic Socialist Republic of Sri Lanka, formerly known as Ceylon, is an island country in South Asia. It is located in the Indian Ocean, southwest of the Bay of Bengal, and is separated from India by the Gulf of Mannar and the Palk Strait.
      </motion.p>

      {/* Explore Button */}
      <motion.button 
        variants={itemVariants}
        className="flex items-center gap-2 bg-[#3B82F6] hover:bg-blue-600 text-white px-5 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-medium w-max shadow-md shadow-blue-500/30 transition-all mb-10 lg:mb-16"
      >
        <ArrowRight size={16} /> Explore
      </motion.button>

      {/* Agoda Section */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col gap-4 max-w-lg"
      >
        <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-3 md:gap-0">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900">Hotels, resorts, hostels & more</h3>
            <p className="text-[10px] md:text-xs text-gray-500">Get the best prices on 2,000,000+ properties, worldwide</p>
          </div>
          <Image src="/Assets/Images/Agoda_transparent_logo.png" alt="Agoda" width={80} height={32} className="object-contain md:w-[100px] md:h-[40px]" />
        </div>

        {/* Search Form */}
        <div className="flex flex-col gap-3 mt-2">
          {/* Destination */}
          <div className="flex flex-col border border-gray-200 rounded-md p-2 bg-white">
            <span className="text-[10px] text-gray-500 uppercase font-semibold">Destination name</span>
            <input type="text" placeholder="Enter a destination or property" className="outline-none text-sm w-full bg-transparent mt-1" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Check In */}
            <div className="flex flex-col border border-gray-200 rounded-md p-2 bg-white relative">
              <span className="text-[10px] text-gray-500 uppercase font-semibold">Check In</span>
              <div className="flex items-center justify-between mt-1">
                 <input type="text" placeholder="26 Mar, Th" className="outline-none text-sm w-full bg-transparent" />
                 <CalendarDays size={16} className="text-blue-500 absolute right-2 bottom-3" />
              </div>
            </div>

            {/* Check Out */}
            <div className="flex flex-col border border-gray-200 rounded-md p-2 bg-white relative">
              <span className="text-[10px] text-gray-500 uppercase font-semibold">Check Out</span>
              <div className="flex items-center justify-between mt-1">
                 <input type="text" placeholder="28 Mar, Sa" className="outline-none text-sm w-full bg-transparent" />
                 <CalendarDays size={16} className="text-blue-500 absolute right-2 bottom-3" />
              </div>
            </div>
          </div>

          {/* Search Button */}
          <button className="bg-[#4192FF] hover:bg-blue-500 text-white w-full py-3 rounded-md text-sm font-semibold transition mt-1">
            Search
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
