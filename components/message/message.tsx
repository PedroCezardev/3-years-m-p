"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Componente para quebrar as palavras e letras com overflow-hidden individual para cada letra
const SplitText = ({ text }: { text: string }) => {
  return (
    <span className="inline-flex flex-wrap gap-x-[0.26em] gap-y-1 sm:gap-y-2">
      {text.split(" ").map((word, wordIdx) => (
        <span
          key={wordIdx}
          className="inline-flex overflow-hidden py-1 -my-1 sm:py-1.5 sm:-my-1.5"
        >
          {word.split("").map((char, charIdx) => (
            <span
              key={charIdx}
              className="char inline-block translate-y-[120%] opacity-0 origin-bottom-left transition-colors"
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
};

const Message = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const chars = gsap.utils.toArray<HTMLElement>(".char");

      gsap.fromTo(
        chars,
        {
          y: "120%",
          opacity: 0,
          rotateZ: 6,
        },
        {
          y: "0%",
          opacity: 1,
          rotateZ: 0,
          ease: "power3.out",
          stagger: 0.010,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
            end: "center 45%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="bg-[#2C0000] min-h-screen w-full flex flex-col justify-between relative overflow-hidden select-none py-8 sm:py-12 md:py-16"
    >

      {/* Main Content: Centered container, Left-aligned text in Cormorant Garamond */}
      <div className="flex-1 flex items-center justify-center w-full px-6 sm:px-16 md:px-28 my-12 sm:my-16">
        <div className="max-w-7xl w-full text-left space-y-8 sm:space-y-12">
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white/95 leading-relaxed sm:leading-relaxed md:leading-relaxed tracking-wide">
            <SplitText text="Esses últimos anos foram muito especiais para mim pelo simples fato de ter você ao meu lado." />
          </h2>

          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-6xl font-normal text-white/95 leading-relaxed sm:leading-relaxed md:leading-relaxed tracking-wide">
            <SplitText text="Desejo todas as melhores coisas para o nosso 3º ano de relacionamento!" />
          </h2>
        </div>
      </div>

      {/* Optional bottom spacing balance */}
      <div className="h-4 sm:h-8" />
    </section>
  );
};

export default Message;
