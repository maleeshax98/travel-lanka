"use client";

import Image from "next/image";
import landmarks from "@/data/landmarks.json";
import MapMarker from "./MapMarker";
import { useState } from "react";
import LandmarkModal from "./LandmarkModal";

export default function SriLankaMap() {
  const [selected, setSelected] = useState<any>(landmarks.landmarks[2]);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // subtle rotation
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto z-10 perspective-[1200px]"
         onMouseMove={handleMouseMove}
         onMouseLeave={handleMouseLeave}
    >
      <div 
        className="relative transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: "preserve-3d"
        }}
      >
        {/* MAP IMAGE */}
        <Image
          src="/map/srilanka-map.png"
          alt="Sri Lanka Map"
          width={800}
          height={1000}
          className="w-full h-auto drop-shadow-2xl"
        />

        {/* MARKERS */}
        {landmarks.landmarks.map((landmark) => (
          <MapMarker
            key={landmark.id}
            landmark={landmark}
            onClick={() => setSelected(landmark)}
          />
        ))}
      </div>

      {/* MODAL */}
      <LandmarkModal
        landmark={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
