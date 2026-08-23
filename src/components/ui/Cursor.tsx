"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
      });

      gsap.to(follower, {
        x: clientX,
        y: clientY,
        duration: 0.3,
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest("a, button")) {
        gsap.to(follower, {
          scale: 3,
          backgroundColor: "rgba(245, 185, 66, 0.1)",
          borderColor: "rgba(245, 185, 66, 0.5)",
          duration: 0.3,
        });
      }

      const productCard = target.closest("[data-cursor]");
      if (productCard) {
        const text = productCard.getAttribute("data-cursor");
        setCursorText(text || "");
        gsap.to(follower, {
          scale: 4,
          backgroundColor: "#F5B942",
          borderColor: "#F5B942",
          duration: 0.3,
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest("a, button")) {
        gsap.to(follower, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(255, 255, 255, 0.2)",
          duration: 0.3,
        });
      }

      if (target.closest("[data-cursor]")) {
        setCursorText("");
        gsap.to(follower, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(255, 255, 255, 0.2)",
          duration: 0.3,
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white/20 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-[5px] font-black uppercase tracking-tighter text-black overflow-hidden whitespace-nowrap"
      >
        {cursorText}
      </div>
    </>
  );
};

export default Cursor;
