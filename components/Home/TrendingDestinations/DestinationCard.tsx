import { ArrowRight, MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
interface DestinationCardProps {
  title: string;
  location: string;
  image: string;
  className?: string;
}

function DestinationCard({ title, location, image, className = "" }: DestinationCardProps) {
  return (
    <div>
        <div className={`destination-card cursor-pointer relative group overflow-hidden rounded-3xl w-full ${className}`}>
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Dark Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 flex items-end justify-between">
        <div className="flex flex-col text-white">
          <h3 className="text-2xl font-bold mb-1">{title}</h3>
          <div className="flex items-center text-sm text-gray-200">
            <MapPin size={14} className="mr-1" />
            {location}
          </div>
        </div>
        
        {/* Explore Button / Arrow Icon */}
        <button className="bg-transparent border-2 border-white/80 hover:bg-white hover:text-black hover:border-white text-white rounded-full p-2 transition-all duration-300">
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
    </div>
  )
}

export default DestinationCard