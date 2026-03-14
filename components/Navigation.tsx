"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import navData from "@/data/sampledata.json";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  return (
    <nav className="w-full flex items-center justify-between lg:justify-center py-6 px-6 lg:px-8 absolute top-0 z-50 left-0 bg-transparent">
      {/* Mobile Menu Button */}
      <div className="lg:hidden flex items-center z-50 w-full justify-start">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="text-gray-800 hover:text-blue-600 focus:outline-none transition-colors"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden lg:flex items-center space-x-8 text-sm font-medium text-gray-700">
        {navData.navigation.map((item, idx) => (
          <li 
            key={idx} 
            className="relative flex items-center cursor-pointer hover:text-blue-600 transition whitespace-nowrap py-2"
            onMouseEnter={() => setActiveDropdown(idx)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            {item.label}
            {item.hasDropdown && <ChevronDown size={14} className="ml-1" />}

            {/* Desktop Dropdown items */}
            {item.hasDropdown && activeDropdown === idx && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-48 bg-white/90 backdrop-blur-lg rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] py-3 overflow-hidden border border-white/50 z-50">
                <ul className="flex flex-col">
                  {item.subItems?.map((subItem, subIdx) => (
                    <li key={subIdx} className="px-5 py-2 hover:bg-blue-50 hover:text-blue-600 text-gray-700 transition-colors text-sm">
                      {subItem}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile Navigation overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-md flex flex-col items-start pt-24 pb-8 px-8 lg:hidden z-40 overflow-y-auto">
          <ul className="flex flex-col space-y-2 w-full text-lg font-medium text-gray-800">
            {navData.navigation.map((item, idx) => (
              <li key={idx} className="flex flex-col w-full border-b border-gray-100 pb-2 mb-4">
                <div 
                  className="flex justify-between items-center cursor-pointer hover:text-blue-600 transition w-full"
                  onClick={() => setActiveDropdown(activeDropdown === idx ? null : idx)}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown 
                      size={20} 
                      className={`transition-transform duration-300 ${activeDropdown === idx ? "rotate-180" : ""}`} 
                    />
                  )}
                </div>
                
                {/* Mobile Dropdown items */}
                {item.hasDropdown && activeDropdown === idx && (
                  <ul className="flex flex-col mt-3 pl-4 space-y-3 overflow-hidden">
                    {item.subItems?.map((subItem, subIdx) => (
                      <li key={subIdx} className="text-gray-600 hover:text-blue-600 text-base transition-colors">
                        {subItem}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

