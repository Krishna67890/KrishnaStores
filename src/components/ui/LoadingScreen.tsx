"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    const duration = hasVisited ? 1.5 : 2.5;

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("hasVisited", "true");
        onComplete();
      },
    });

    // Counter animation
    const counterObj = { value: 0 };
    tl.to(counterObj, {
      value: 100,
      duration: duration,
      ease: "power2.inOut",
      onUpdate: () => setCounter(Math.floor(counterObj.value)),
    });

    // Text animations
    tl.fromTo(textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      0.2
    );

    tl.fromTo(taglineRef.current?.querySelectorAll("span"),
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.2, ease: "power2.out" },
      0.5
    );

    // Exit animation
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut",
    }, "+=0.2");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-[#080808] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="flex flex-col items-center gap-8">
        <div ref={textRef} className="text-2xl md:text-4xl font-black font-display tracking-[0.4em] uppercase text-white">
          KRISHNA<span className="text-accent">STORES</span>
        </div>

        <div ref={taglineRef} className="flex gap-4 text-[10px] md:text-xs font-black tracking-[0.5em] text-white/30 uppercase">
          <span>LEARN.</span>
          <span>PLAY.</span>
          <span>BUILD.</span>
        </div>

        <div ref={progressRef} className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="text-6xl md:text-8xl font-black font-display text-white/5 lining-nums">
            {counter.toString().padStart(2, '0')}
          </span>
          <div className="w-40 h-[1px] bg-white/10 mt-4 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-accent transition-all duration-100 ease-linear"
              style={{ width: `${counter}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
