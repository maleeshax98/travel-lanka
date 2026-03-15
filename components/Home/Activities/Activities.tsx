"use client";

import { useRef, useState, useEffect } from "react";
import { Caveat } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import activityData from "@/data/activityData.json";
import ActivityCard from "./ActivityCard";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const icons: Record<string, string> = {
  "Surfing & Swimming": "🏄",
  "Camping": "⛺",
  "Diving & Snorkeling": "🤿",
  "Mountain & Hill Hiking": "🥾",
  "Paragliding Tours": "🪂",
  "Wildlife Safari": "🦁",
  "Whale Watching": "🐋",
  "Yoga & Meditation Retreats": "🧘",
};

export default function Activities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  const activities = activityData.activities;
  const currentActivity = activities[activeTab];

  useGSAP(() => {
    // Header Animation
    if (headerRef.current) {
      const headerLines = headerRef.current.querySelectorAll(".header-line");
      gsap.from(headerLines, {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Tabs Animation
    if (tabsRef.current) {
      gsap.from(tabsRef.current.children, {
        x: 20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: tabsRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Floating Background Elements (Reusing project pattern)
    const floatEls = containerRef.current?.querySelectorAll(".floating-decor");
    floatEls?.forEach((el, i) => {
      gsap.to(el, {
        y: "random(-20, 20)",
        x: "random(-15, 15)",
        rotation: "random(-10, 10)",
        duration: "random(4, 7)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.5,
      });
    });

    // Rotating elements
    const rotEls = containerRef.current?.querySelectorAll(".rotating-decor");
    rotEls?.forEach((el, i) => {
      gsap.to(el, {
        rotation: i % 2 === 0 ? 360 : -360,
        duration: 25,
        repeat: -1,
        ease: "linear",
      });
    });

    // Floating Main CTA Animation
    gsap.to(".floating-cta", {
      y: -15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: containerRef });

  // Animation when tab changes
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current.children, 
        { 
          opacity: 0, 
          y: 30,
          scale: 0.98,
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.6, 
          stagger: 0.15, 
          ease: "power3.out" 
        }
      );
    }
  }, [activeTab]);

  return (
    <section ref={containerRef} className="w-full py-24 bg-[#FDFDFD] relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="floating-decor absolute top-[15%] left-[5%] w-64 h-64 bg-blue-50/50 rounded-full blur-3xl" />
        <div className="floating-decor absolute bottom-[10%] right-[5%] w-80 h-80 bg-orange-50/40 rounded-full blur-3xl" />
        
        {/* Abstract SVGs */}
        <svg className="floating-decor absolute top-[10%] right-[10%] w-32 h-32 text-blue-200/40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="50" cy="50" r="45" strokeDasharray="5 5" />
          <circle cx="50" cy="50" r="30" strokeDasharray="3 7" />
        </svg>

        <svg className="rotating-decor absolute bottom-[15%] left-[8%] w-24 h-24 text-emerald-200/40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M50,5 L95,25 L95,75 L50,95 L5,75 L5,25 Z" />
        </svg>

        <svg className="floating-decor absolute top-[40%] left-[2%] w-16 h-16 text-orange-200/30" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="20" cy="20" r="4" />
          <circle cx="50" cy="40" r="3" />
          <circle cx="80" cy="15" r="5" />
          <circle cx="35" cy="75" r="4" />
          <circle cx="70" cy="85" r="3" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-block">
            <h3 className={`${caveat.className} header-line text-4xl lg:text-5xl font-semibold mb-4 text-[#FF8C38]`}>
              Things To Do ✈️
            </h3>
            <div className="h-1 w-full bg-linear-to-r from-orange-400/0 via-orange-400 to-orange-400/0 rounded-full mb-4 opacity-50" />
          </div>
          <h2 className="header-line text-4xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6">
            Unforgettable <span className="text-blue-600">Adventures</span> Await
          </h2>
          <p className="header-line max-w-2xl mx-auto text-gray-500 text-lg lg:text-xl font-medium leading-relaxed">
            From the misty mountains to the goldens coasts, discover the diverse experiences 
            that make Sri Lanka a true tropical paradise.
          </p>
        </div>


        {/* Categories Tabs */}
       
        <div className="">
            <div className="flex  flex-wrap gap-2">
            {activities.map((activity, index) => (
            <button
              key={activity.name}
              onClick={() => setActiveTab(index)}
              className={`shrink-0 flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border-2 ${
                activeTab === index
                  ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-600/20 scale-105"
                  : "bg-white border-blue-100 text-gray-600 hover:border-blue-300 hover:bg-blue-50/50"
              }`}
            >
              <span className="text-xl">{icons[activity.name] || "🏝️"}</span>
              {activity.name}
            </button>
          ))}
          </div>

        {/* New Layout Content */}
        <div ref={contentRef} className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Activity Info & Description */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
                <span className="text-blue-600 text-xl">{icons[currentActivity.name] || "🏝️"}</span>
                <span className="text-blue-700 font-bold text-sm uppercase tracking-wider">{currentActivity.name}</span>
              </div>
              
              <h3 className="text-4xl lg:text-5xl font-black text-gray-900 leading-[1.1]">
                Explore <span className="text-blue-600 font-serif italic font-medium">{currentActivity.name}</span> in Paradise
              </h3>
              
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed font-medium">
                {currentActivity.description}
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-700 font-bold bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  Family Friendly
                </div>
                <div className="flex items-center gap-2 text-gray-700 font-bold bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  Expert Guides
                </div>
                <div className="flex items-center gap-2 text-gray-700 font-bold bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Best Value
                </div>
              </div>
            </div>

            {/* More Info Button integrated here */}
            <div className="pt-4">
              <button className="group relative flex items-center gap-4 bg-gray-900 text-white px-10 py-5 rounded-2xl shadow-2xl transition-all duration-300 hover:bg-black hover:scale-[1.02] active:scale-95">
                <div className="flex flex-col items-start text-left">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-black mb-1">Detailed Guide</span>
                  <span className="font-bold text-lg">More info on {currentActivity.name}</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </div>
                
                {/* Decorative background glow */}
                <div className="absolute -bottom-2 -right-2 w-full h-full bg-blue-600/10 rounded-2xl -z-10 group-hover:bg-blue-600/20 transition-all duration-300" />
              </button>
            </div>
          </div>

          {/* Right: Featured Locations Grid */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center justify-between">
              <h4 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                Featured Locations
                <span className="h-1 w-12 bg-blue-600 rounded-full" />
              </h4>
              <p className="text-sm font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-lg">Best Spots ({currentActivity.locations.length})</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {currentActivity.locations.map((location, idx) => (
                <ActivityCard
                  key={location.name}
                  variant={idx === 0 ? "hero" : "compact"}
                  name={location.name}
                  activityName={currentActivity.name}
                  district={location.district}
                  image={location.image}
                  description={idx === 0 ? "Experience the world-renowned charm of this iconic location." : "A hidden gem waiting to be discovered."}
                  className={idx === 0 ? "sm:col-span-1" : ""}
                />
              ))}
              
              {/* Optional: Add a call to action if few locations */}
              <div className="sm:col-span-1 bg-linear-to-br from-blue-50 to-white border border-blue-100 rounded-3xl p-8 flex flex-col justify-center items-center text-center group/more">
                <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-3xl mb-4 group-hover/more:scale-110 transition-transform duration-500">
                  ✨
                </div>
                <h5 className="font-bold text-gray-900 mb-2">Want more spots?</h5>
                <p className="text-gray-500 text-sm mb-6">Explore our full directory of 150+ adventure locations island-wide.</p>
                <button className="text-blue-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                  Browse All <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
          </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
