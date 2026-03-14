"use client";

import { MapPin } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MapMarker({ landmark, onClick }: any) {
  const rippleRef = useRef(null);

  useEffect(() => {
    gsap.to(rippleRef.current, {
      scale: 2,
      opacity: 0,
      duration: 1.5,
      repeat: -1,
      ease: "power1.out",
    });
  }, []);

  return (
    <div
      onClick={onClick}
      className="absolute cursor-pointer group"
      style={{
        top: landmark.coordinates.top,
        left: landmark.coordinates.left,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* ripple */}
      <div
        ref={rippleRef}
        className="absolute w-10 h-10 rounded-full bg-blue-500 opacity-70"
      />

      {/* glow */}
      <div className="absolute w-10 h-10 rounded-full bg-blue-400 blur-md opacity-60" />

      {/* pin */}
      <div className="relative flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-lg group-hover:scale-110 transition">
        <MapPin size={16} className="text-blue-600" />
      </div>
    </div>
  );
}
