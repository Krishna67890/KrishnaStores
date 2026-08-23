import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const revealText = (element: string | HTMLElement) => {
  gsap.from(element, {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
    stagger: 0.1,
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
    },
  });
};

export const fadeUp = (element: string | HTMLElement, delay: number = 0) => {
  gsap.from(element, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    delay,
    ease: "power3.out",
    scrollTrigger: {
      trigger: element,
      start: "top 90%",
    },
  });
};

export const imageReveal = (element: string | HTMLElement) => {
  gsap.from(element, {
    scale: 1.2,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
    },
  });
};

export const magneticButton = (element: HTMLElement) => {
  const xTo = gsap.quickTo(element, "x", { duration: 0.3, ease: "power3.out" });
  const yTo = gsap.quickTo(element, "y", { duration: 0.3, ease: "power3.out" });

  element.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = element.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    xTo(x * 0.3);
    yTo(y * 0.3);
  });

  element.addEventListener("mouseleave", () => {
    xTo(0);
    yTo(0);
  });
};
