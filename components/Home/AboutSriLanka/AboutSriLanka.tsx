"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Caveat } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const STORY_TEXT = 
  "If you read the whole book but skipped the chapter on Sri Lanka, dear reader, you just missed the climax. On an atlas, Sri Lanka might appear as a small mango-shaped dot in South Asia, almost unnoticeable. However, its biodiversity astonishes the world. Enriched by centuries of history, the resulting cultural diversity is truly remarkable.";

export default function AboutSriLanka() {
  const containerRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  // Industrial fix for page height changes on mount
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  useGSAP(() => {
    const words = storyRef.current?.querySelectorAll(".story-word");
    if (!words || !containerRef.current) return;

    // 1. Create the Master Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top", // Starts pinning when top of section hits top of viewport
        end: "+=2500",    // The "scroll distance" for the entire experience
        scrub: 0.8,       // Slightly less than 1 for more responsiveness
        pin: true,        // IMPORTANT: Pins the section
        pinSpacing: true, // IMPORTANT: Pushes subsequent sections down
        anticipatePin: 1, // Reduces 'jumping' on fast scrolls
        invalidateOnRefresh: true, // Recalculates if window is resized
      },
    });

    // 2. PHASE 1: Sequential Word Highlight
    tl.to(words, {
      opacity: 1,
      color: "#111827",
      stagger: 0.1,
      ease: "power1.inOut",
    });

    // 3. PHASE 2: Transition out the Story, Reveal the Grid
    tl.to(storyRef.current, {
      opacity: 0,
      y: -30,
      scale: 0.98,
      duration: 1,
    }, "+=0.3"); // Small delay so the last word is readable

    tl.fromTo(gridRef.current, 
      { opacity: 0, visibility: "hidden", y: 40 },
      { opacity: 1, visibility: "visible", y: 0, duration: 1 },
      "<" // Start exactly when the story begins to fade
    );

    // 4. PHASE 3: Detail Entrance (The Map and the Headlines)
    tl.from(mapRef.current, {
      x: -60,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out"
    }, "-=0.2");

    tl.from(textContentRef.current?.children || [], {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out"
    }, "<0.2");

    // Continuous floating map (doesn't care about scroll)
    gsap.to(mapRef.current, {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen flex flex-col items-center justify-center bg-[#FDFDFD] overflow-hidden"
    >
      {/* STORY CONTAINER (Phase 1)
          Centered large text. 
      */}
      <div 
        ref={storyRef} 
        className="absolute inset-0 z-20 flex items-center justify-center px-6 md:px-16 lg:px-24"
      >
        <p className="max-w-6xl text-center text-2xl md:text-4xl lg:text-5xl font-bold leading-[1.3] text-gray-300">
          {STORY_TEXT.split(" ").map((word, i) => (
            <span key={i} className="story-word inline-block mr-[0.3em] opacity-10 transition-colors">
              {word}
            </span>
          ))}
        </p>
      </div>

      {/* FINAL GRID (Phase 2)
          Responsive 2-column layout. 
      */}
      <div 
        ref={gridRef} 
        className="invisible absolute inset-0 z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center content-center"
      >
        {/* Map Visual */}
        <div ref={mapRef} className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[320px] md:max-w-[420px]">
            <Image
              src="/Assets/Images/intro-sri-lanka.png"
              alt="Sri Lanka Map"
              width={500}
              height={650}
              className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] object-contain"
              priority
            />
          </div>
        </div>

        {/* Text Details */}
        <div ref={textContentRef} className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <span className={`${caveat.className} text-2xl md:text-3xl text-orange-600 mb-2`}>
            A Journey Through Time
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Discover the Heart <br className="hidden md:block" /> of Sri Lanka
          </h2>
          <div className="w-16 h-1 bg-orange-500 mb-6 rounded-full" />
          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-md">
            From the sacred peaks to the azure coast, Sri Lanka offers more than just a destination; 
            it offers a profound connection to nature and a legacy of island hospitality.
          </p>
          <button className="mt-8 px-10 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-black/5">
            Book Your Journey
          </button>
        </div>
      </div>

      {/* Subtle Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-blue-100 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-orange-100 rounded-full blur-3xl" />
      </div>
    </section>
  );
}