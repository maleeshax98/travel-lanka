"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

export default function LandmarkModal({ landmark, onClose }: any) {
  return (
    <AnimatePresence>
      {landmark && (
        <motion.div
          className="fixed right-10 top-1/2 -translate-y-1/2 w-80 bg-white/80 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl p-5 z-50 flex flex-col"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 50, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 bg-white/50 hover:bg-white rounded-full text-gray-800 transition shadow-sm z-10"
          >
            <X size={16} />
          </button>
          
          <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 shadow-inner">
            <Image
              src={landmark.image_thumb}
              alt={landmark.name}
              fill
              className="object-cover"
            />
          </div>

          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">
            {landmark.category}
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
            {landmark.name}
          </h2>

          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            {landmark.description}
          </p>

          <button
            onClick={onClose}
            className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-lg shadow-md shadow-blue-500/30 transition text-sm"
          >
            View Details
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
