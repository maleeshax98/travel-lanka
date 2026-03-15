"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Caveat } from "next/font/google";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function AboutSriLanka() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const starRef = useRef<HTMLDivElement>(null);

  const paragraphText =
    "If you read the whole book but skipped the chapter on Sri Lanka, dear reader, you just missed the climax. On an atlas, Sri Lanka might appear as a small mango-shaped dot in South Asia, almost unnoticeable. However, its biodiversity astonishes the world. Claiming that centuries of colonization by the Portuguese, Dutch, and British eroded or altered Sri Lankan cultural glory is sheer folly. Enriched is the better term. The resulting cultural diversity is truly remarkable.";

  const words = paragraphText.split(" ");

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // --- Floating map animation (continuous) ---
      if (mapRef.current) {
        gsap.to(mapRef.current, {
          y: -18,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // --- Floating SVG animations ---
      const floatEls = sectionRef.current.querySelectorAll(".float-svg");
      floatEls.forEach((el, i) => {
        gsap.to(el, {
          y: "random(-25, 25)",
          x: "random(-15, 15)",
          rotation: "random(-12, 12)",
          duration: "random(4, 7)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.6,
        });
      });

      // --- Rotating SVG animations ---
      const rotEls = sectionRef.current.querySelectorAll(".rotate-svg");
      rotEls.forEach((el, i) => {
        gsap.to(el, {
          rotation: i % 2 === 0 ? 360 : -360,
          duration: 25,
          repeat: -1,
          ease: "linear",
        });
      });

      // --- Scroll-triggered text entrance animations ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Map entrance
      if (mapRef.current) {
        tl.fromTo(
          mapRef.current,
          { opacity: 0, scale: 0.85, x: -60 },
          { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: "power3.out" }
        );
      }

      // Subtitle
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.8"
        );
      }

      // Main heading
      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        );
      }

      // Paragraph appears (dim) as part of the entrance timeline
      if (paragraphRef.current) {
        tl.fromTo(
          paragraphRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        );
      }

      // Scroll-scrubbed word highlight: pins using a dedicated wrapper to avoid conflict
      const wordEls = paragraphRef.current?.querySelectorAll(".word");
      if (wordEls && wordEls.length > 0 && pinWrapperRef.current) {
        gsap.to(wordEls, {
          color: "#111827",
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: pinWrapperRef.current,
            start: "top top",
            end: "+=1800",
            pin: true,
            pinSpacing: true,
            scrub: 0.5,
          },
        });
      }

      // Star at bottom
      if (starRef.current) {
        tl.fromTo(
          starRef.current,
          { opacity: 0, scale: 0, rotation: -90 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(2)",
          },
          "-=0.2"
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#FDFDFD]"
    >
      {/* Pin wrapper - this div gets pinned independently */}
      <div ref={pinWrapperRef} className="relative w-full py-20 md:py-32 lg:py-40 ">
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Dashed circle */}
        <svg
          className="float-svg absolute top-[8%] right-[8%] w-28 h-28 text-blue-200/40"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="50" cy="50" r="42" strokeDasharray="6 6" />
          <circle cx="50" cy="50" r="28" strokeDasharray="4 8" />
        </svg>

        {/* Wavy lines */}
        <svg
          className="float-svg absolute bottom-[15%] right-[12%] w-36 h-36 text-emerald-200/40"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M5,40 Q25,20 45,40 T85,40" strokeLinecap="round" />
          <path d="M5,55 Q25,35 45,55 T85,55" strokeLinecap="round" />
          <path d="M5,70 Q25,50 45,70 T85,70" strokeLinecap="round" />
        </svg>

        {/* Rotating hexagon */}
        <svg
          className="rotate-svg absolute top-[35%] left-[3%] w-20 h-20 text-orange-200/40"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" />
        </svg>

        {/* Dots cluster */}
        <svg
          className="float-svg absolute top-[65%] right-[30%] w-16 h-16 text-blue-300/30"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <circle cx="20" cy="20" r="5" />
          <circle cx="50" cy="15" r="3" />
          <circle cx="80" cy="25" r="4" />
          <circle cx="35" cy="50" r="4" />
          <circle cx="65" cy="55" r="3" />
          <circle cx="20" cy="80" r="3" />
          <circle cx="75" cy="80" r="5" />
        </svg>

        {/* Cross lines */}
        <svg
          className="float-svg absolute bottom-[25%] left-[15%] w-14 h-14 text-sky-200/50"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="8 6"
        >
          <line x1="10" y1="10" x2="90" y2="90" />
          <line x1="10" y1="90" x2="90" y2="10" />
        </svg>

        {/* Rotating dashed circle bottom-right */}
        <svg
          className="rotate-svg absolute bottom-[8%] right-[5%] w-24 h-24 text-indigo-200/30"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="50" cy="50" r="40" strokeDasharray="3 7" />
        </svg>

        {/* Small floating dots */}
        <div className="float-svg absolute top-[20%] left-[40%] w-3 h-3 bg-orange-300/30 rounded-full" />
        <div className="float-svg absolute top-[50%] right-[20%] w-4 h-4 bg-blue-300/25 rounded-full" />
        <div className="float-svg absolute bottom-[35%] left-[55%] w-2 h-2 bg-emerald-400/35 rounded-full" />
      </div>

      {/* --- Main Content Grid --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center">
        {/* LEFT: Floating Map */}
        <div
          ref={mapRef}
          className="flex justify-center lg:justify-end items-center opacity-0"
        >
          <div className="relative w-full max-w-[500px]">
            <Image
              src="/Assets/Images/intro-sri-lanka.png"
              alt="Sri Lanka Island"
              width={500}
              height={650}
              className="w-full h-auto drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* RIGHT: Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-center px-2 lg:px-6">
          {/* Subtitle */}
          <h3
            ref={subtitleRef}
            className={`${caveat.className} text-3xl md:text-4xl lg:text-[38px] font-semibold text-gray-800 mb-3 opacity-0`}
          >
            The Pearl Of The Indian Ocean
          </h3>

          {/* Main Heading */}
          <h2
            ref={headingRef}
            className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 leading-[1.2] mb-8 max-w-md opacity-0"
          >
            Get The Best Travel Experience in Sri Lanka
          </h2>

          {/* Paragraph with word-level animation */}
          <p
            ref={paragraphRef}
            className="text-base md:text-lg lg:text-[17px] leading-[1.8] text-gray-700 font-medium max-w-lg"
          >
            {words.map((word, i) => (
              <span
                key={i}
                className="word inline-block mr-[0.28em]"
                style={{ opacity: 0.2, color: "#9CA3AF" }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* --- Bottom Center Star --- */}
      <div
        ref={starRef}
        className="flex justify-center mt-16 opacity-0"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="#6B7280"
        >
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </div>
      </div>
    </section>
  );
}