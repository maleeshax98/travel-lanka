"use client";

import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";

interface ActivityCardProps {
  name: string;
  activityName: string;
  district: string;
  image: string;
  description: string;
  variant?: "hero" | "compact";
  className?: string;
}

export default function ActivityCard({
  name,
  activityName,
  district,
  image,
  description,
  variant = "hero",
  className = "",
}: ActivityCardProps) {
  const isHero = variant === "hero";

  return (
    <div
      className={`activity-card group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1 ${
        isHero ? "h-[480px] lg:h-full" : "h-[260px]"
      } ${className}`}
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes={isHero ? "(max-width: 768px) 100vw, 55vw" : "(max-width: 768px) 100vw, 45vw"}
      />

      {/* Gradient Overlay */}
      <div
        className={`absolute inset-0 ${
          isHero
            ? "bg-linear-to-t from-black/80 via-black/30 to-transparent"
            : "bg-linear-to-t from-black/75 via-black/25 to-transparent"
        } transition-opacity duration-500 group-hover:from-black/90`}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
        {/* District Badge */}
        <div className="flex items-center gap-1.5 mb-2 transition-transform duration-500 group-hover:-translate-y-1">
          <MapPin size={14} className="text-orange-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-300">
            {district}
          </span>
        </div>

        {/* Location Name */}
        <h4
          className={`font-bold text-white leading-tight mb-2 transition-transform duration-500 group-hover:-translate-y-1 ${
            isHero ? "text-2xl lg:text-3xl" : "text-xl"
          }`}
        >
          {name}
        </h4>

        {/* Description */}
        <p
          className={`text-white/80 leading-relaxed transition-all duration-500 group-hover:text-white group-hover:-translate-y-1 ${
            isHero
              ? "text-sm lg:text-base line-clamp-3"
              : "text-xs lg:text-sm line-clamp-2"
          }`}
        >
          {description}
        </p>

        {/* More Info Button - Improved Visibility */}
        <div className="mt-4 flex items-center justify-between transition-all duration-500">
          <div className="flex items-center gap-2 text-white font-bold translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
            <span className="text-xs lg:text-sm tracking-wide">Explore Location</span>
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:bg-white/40 group-hover:scale-110">
              <ArrowRight size={14} />
            </div>
          </div>
          
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:opacity-0 transition-opacity">
            <ArrowRight size={16} />
          </div>
        </div>
      </div>

      {/* Top-right shine effect on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-bl-full" />
          
    </div>
  );
}
