"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/header/section-header";

gsap.registerPlugin(ScrollTrigger);

const Letter = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Animação de entrada do título
      gsap.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
        },
      });

      // Animação do texto da carta (esquerda)
      gsap.from(textRef.current, {
        x: -50,
        opacity: 0,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
      });

      // Animação do celular/vídeo (direita)
      gsap.from(phoneRef.current, {
        x: 50,
        opacity: 0,
        scale: 0.95,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: phoneRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="bg-[#2C0000] min-h-screen w-full flex flex-col justify-between relative overflow-hidden select-none py-8 sm:py-12 md:py-12"
    >
      {/* Reusable SectionHeader */}
      <SectionHeader leftText="Mari & Pedro" rightText="18/07/2026" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-6 sm:px-12 md:px-20 my-12 sm:my-16 max-w-7xl mx-auto">
        {/* Title */}
        <h2
          ref={titleRef}
          className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white tracking-wide drop-shadow-sm text-center mb-12 sm:mb-16 md:mb-38"
        >
          Como não te amar:
        </h2>

        {/* Two columns: Declaration Letter (Left) and Phone Video (Right) */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 sm:gap-14 lg:gap-16">
          {/* Left: Romantic Love Letter Text in Parisienne */}
          <div
            ref={textRef}
            className="w-full lg:w-1/2 text-left space-y-6 sm:space-y-8 max-w-2xl px-2"
          >
            <p className="font-parisienne text-2xl sm:text-3xl md:text-4xl text-white/95 leading-relaxed sm:leading-relaxed drop-shadow-sm">
              Cada dia ao seu lado é um presente que Deus me deu, construindo memórias que levarei para sempre no meu coração.
            </p>
            <p className="font-parisienne text-2xl sm:text-3xl md:text-4xl text-white/95 leading-relaxed sm:leading-relaxed drop-shadow-sm">
              O seu sorriso ilumina qualquer momento e a sua presença transforma o comum em extraordinário. Você é o meu porto seguro e a minha maior alegria.
            </p>
            <p className="font-parisienne text-2xl sm:text-3xl md:text-4xl text-white/95 leading-relaxed sm:leading-relaxed drop-shadow-sm">
              Obrigado por ser essa mulher incrível, carinhosa e parceira. Que venham muitos outros anos, histórias maravilhosas e conquistas juntos. Eu te Amão Grandão Infinitão!
            </p>
          </div>

          {/* Right: Vertical Phone Aspect Frame with Looping Video */}
          <div
            ref={phoneRef}
            className="w-full lg:w-1/2 flex justify-center items-center py-4"
          >
            {/* Phone Container */}
            <div className="w-[260px] sm:w-[300px] md:w-[340px] aspect-[8/16] bg-black rounded-[2.8rem] sm:rounded-[3.2rem] border-[6px] sm:border-[8px] border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative overflow-hidden flex flex-col items-center justify-center group">
              
              {/* Looping Video */}
              <video
                src="/video-letter.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center z-10 transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              {/* Fallback displayed if /video-letter.mp4 is not yet inside public folder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-[#2C0000] to-black z-0">
                <span className="font-parisienne text-2xl sm:text-3xl text-white/80 mb-3">
                  Vídeo Especial ❤️
                </span>
                <span className="font-cormorant text-xs sm:text-sm text-white/60 uppercase tracking-[0.15em] leading-relaxed">
                  Adicione o seu vídeo vertical em
                  <br />
                  <strong className="text-white/90 lowercase">/public/video-letter.mp4</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-6 sm:h-12" />
    </section>
  );
};

export default Letter;
