"use client";

import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import { Caveat } from "next/font/google";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DestinationCard from "./DestinationCard";
import getImageURL from "@/libs/sanity";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: 'swap',
});

export interface Destination {
  _id: string;
  name: string;
  location: string;
  slug: { current: string };
  mainImage: any;
  publishedAt: string;
}

export default function DestinationList({ destinations = [] }: { destinations?: Destination[] }) {
  console.log(destinations)
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textFillRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Split-Text style staggering lines entrance
    if (textContainerRef.current) {
      const lines = gsap.utils.toArray('.anim-line') as HTMLElement[];
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });

      // Subtitle fade in slightly before
      if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );
      }

      // Staggered lines entrance
      if (lines.length > 0) {
        tl.fromTo(lines,
          { opacity: 0, y: 50, rotateX: -20 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
          "-=0.3"
        );
      }
    }

    // Continuous floating background animations
    const floatElements = gsap.utils.toArray('.floating-bg') as HTMLElement[];
    floatElements.forEach((el, i) => {
      gsap.to(el, {
        y: "random(-30, 30)",
        x: "random(-30, 30)",
        rotation: "random(-15, 15)",
        duration: "random(4, 8)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.5,
      });
    });

    // Continuous rotate animations for CTA SVGs
    const rotateElements = gsap.utils.toArray('.rotate-bg') as HTMLElement[];
    rotateElements.forEach((el, i) => {
      gsap.to(el, {
        rotation: i % 2 === 0 ? 360 : -360,
        duration: 20,
        repeat: -1,
        ease: "linear",
      });
    });

    // Cards Entrance Animation
    if (cardsContainerRef.current) {
      const cards = gsap.utils.toArray('.destination-card') as HTMLElement[];
      const ctaBlock = cardsContainerRef.current.querySelector('.cta-block');
      
      const elementsToAnimate = [...cards];
      if (ctaBlock) elementsToAnimate.push(ctaBlock as HTMLElement);

      gsap.from(elementsToAnimate, {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full flex flex-col items-center py-20 relative overflow-hidden z-0">
      
      {/* --- Floating Background Elements --- */}
      <div className="absolute inset-0 pointer-events-none z-[-1]">
        {/* Soft Blobs */}
        <div className="floating-bg absolute top-[10%] left-[-5%] w-72 h-72 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="floating-bg absolute top-[50%] right-[-10%] w-96 h-96 bg-emerald-50/50 rounded-full blur-3xl delay-1000" />
        <div className="floating-bg absolute bottom-[10%] left-[20%] w-80 h-80 bg-orange-50/40 rounded-full blur-3xl delay-2000" />

        {/* Abstract SVG Lines */}
        <svg className="floating-bg absolute top-[15%] right-[15%] w-24 h-24 text-blue-200/60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10,50 Q30,10 50,50 T90,50" strokeLinecap="round" />
          <path d="M10,60 Q30,20 50,60 T90,60" strokeLinecap="round" />
        </svg>

        <svg className="floating-bg absolute top-[40%] left-[10%] w-32 h-32 text-emerald-200/50" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="50" cy="50" r="40" strokeDasharray="5,5" />
          <circle cx="50" cy="50" r="30" strokeDasharray="5,5" />
        </svg>

        <svg className="floating-bg absolute bottom-[25%] right-[20%] w-20 h-20 text-orange-200/60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5">
           <line x1="10" y1="10" x2="90" y2="90" />
           <line x1="10" y1="90" x2="90" y2="10" />
        </svg>
        
        {/* Tiny Floating Dots */}
        <div className="floating-bg absolute top-[25%] left-[40%] w-3 h-3 bg-blue-400/30 rounded-full" />
        <div className="floating-bg absolute top-[60%] right-[30%] w-4 h-4 bg-orange-400/30 rounded-full" />
        <div className="floating-bg absolute bottom-[15%] left-[60%] w-2 h-2 bg-emerald-400/40 rounded-full" />
      </div>

      {/* Clean Staggered Header Section */}
      <div ref={textContainerRef} className="w-full flex flex-col items-center justify-center relative mb-16 px-4" style={{ perspective: "1000px" }}>
        <h2 ref={subtitleRef} className={`${caveat.className} text-4xl lg:text-5xl font-semibold mb-6 flex items-center gap-2 text-black`}>
          Destination List
          <span className="text-2xl mt-1">✨</span>
        </h2>
        
        <h3 className="text-4xl lg:text-6xl font-black leading-tight max-w-4xl text-center text-black flex flex-col gap-2">
          <span className="anim-line block will-change-transform origin-bottom">Explore The Beautiful Places</span>
          <span className="anim-line block text-[#3B82F6] will-change-transform origin-bottom">Around Sri Lanka</span>
        </h3>
      </div>

      {/* Grid Layout */}
      <div ref={cardsContainerRef} className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto px-6 pb-20 pt-10">
        
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {/* Top Left Card */}
          {destinations[0] && (
            <DestinationCard 
              title={destinations[0].name}
              location={destinations[0].location}
              image={getImageURL(destinations[0].mainImage) || "https://placehold.co/600x400"}
              className="h-[280px]"
            />
          )}
          
          {/* Middle Left Card */}
          {destinations[1] && (
            <DestinationCard 
              title={destinations[1].name}
              location={destinations[1].location}
              image={getImageURL(destinations[1].mainImage) || "https://placehold.co/600x400"}
              className="h-[280px]"
            />
          )}

          {/* Bottom Left Call To Action */}
          <div className="cta-block h-[280px] bg-[#3B82F6] rounded-3xl p-8 flex flex-col justify-center items-center text-center text-white relative overflow-hidden group">
             {/* Decorative Background Elements */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
             <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/30 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

             {/* Decorative SVGs */}
             <svg className="rotate-bg absolute top-[-10%] right-[-5%] w-32 h-32 text-white/10" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
               <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" />
             </svg>
             
             <svg className="rotate-bg absolute bottom-[-15%] left-[5%] w-40 h-40 text-blue-300/20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5">
               <circle cx="50" cy="50" r="45" />
               <circle cx="50" cy="50" r="35" />
             </svg>

             {/* Little Star SVGs */}
             <svg className="absolute top-[20%] left-[15%] w-6 h-6 text-orange-300/60 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
             </svg>

             <span className="text-orange-400 font-semibold mb-2 relative z-10 text-lg transition-transform duration-500 group-hover:-translate-y-1">
               More than 200 Destinations
             </span>
             <h4 className="text-4xl font-bold mb-8 relative z-10 transition-transform duration-500 delay-75 group-hover:-translate-y-1">
               Explore All Destinations
             </h4>
             <button className="flex items-center gap-2 bg-[#FF8C38] hover:bg-orange-500 text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-500 delay-150 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 relative z-10">
               <ArrowRight size={16} /> Explore
             </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6 h-full">
          {/* Top Right Card (Taller) */}
          {destinations[2] && (
            <DestinationCard 
              title={destinations[2].name}
              location={destinations[2].location}
              image={getImageURL(destinations[2].mainImage) || "https://placehold.co/600x400"}
              className="h-[432px]" // Height to match roughly Top Left + Half of Middle Left
            />
          )}
          
          {/* Bottom Right Card (Taller) */}
          {destinations[3] && (
            <DestinationCard 
              title={destinations[3].name}
              location={destinations[3].location}
              image={getImageURL(destinations[3].mainImage) || "https://placehold.co/600x400"}
              className="h-[432px]" // Height to match roughly Half of Middle Left + Bottom CTA + gaps
            />
          )}
        </div>
        
      </div>
    </section>
  );
}
