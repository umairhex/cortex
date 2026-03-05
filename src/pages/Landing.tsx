import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/shared/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Stats } from "@/components/landing/Stats";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

gsap.registerPlugin(ScrollTrigger);

const HERO_BG =
  "https://images.unsplash.com/photo-1638272181967-7d3772a91265?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function Landing() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".parallax-bg", {
        yPercent: 40,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(".hero-content", {
        opacity: 0,
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "center center",
          end: "bottom top",
          scrub: 1,
        },
      });

      return () => {};
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-background overflow-hidden">
      <Navbar />
      <Hero heroBg={HERO_BG} />
      <Features />
      <Stats heroBg={HERO_BG} />
      <CTA />
      <Footer />
    </div>
  );
}
