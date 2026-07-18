"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeaderProps {
  leftText?: string;
  rightText?: string;
  className?: string;
}

export default function SectionHeader({
  leftText = "18/07/2023",
  rightText = "Mari & Pedro",
  className = "",
}: SectionHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!headerRef.current) return;

      gsap.from(headerRef.current, {
        y: -25,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: headerRef }
  );

  return (
    <header
      ref={headerRef}
      className={`flex justify-between items-center w-full px-6 sm:px-12 md:px-20 max-w-8xl mx-auto ${className}`}
    >
      <span className="font-parisienne text-2xl sm:text-2xl md:text-3xl text-white/90 tracking-wide select-none">
        {leftText}
      </span>
      <span className="font-parisienne text-2xl sm:text-2xl md:text-3xl text-white/90 tracking-wide select-none">
        {rightText}
      </span>
    </header>
  );
}
